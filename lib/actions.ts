"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
import { SUPABASE_CONFIGURED } from "./supabase/config";

function guard() {
  if (!SUPABASE_CONFIGURED) {
    throw new Error("Supabase n'est pas configuré (mode démo). Ajoutez les variables d'environnement.");
  }
}

function str(fd: FormData, k: string) {
  const v = fd.get(k);
  return typeof v === "string" ? v.trim() : "";
}
function bool(fd: FormData, k: string) {
  return fd.get(k) === "on" || fd.get(k) === "true";
}

/* ---------------- AUTH ---------------- */
export async function seDeconnecter() {
  if (SUPABASE_CONFIGURED) {
    const s = createClient();
    await s.auth.signOut();
  }
  redirect("/connexion");
}

/* ---------------- ACTUALITÉS ---------------- */
export async function creerActualite(fd: FormData) {
  guard();
  const s = createClient();
  await s.from("actualites").insert({
    titre: str(fd, "titre"),
    extrait: str(fd, "extrait") || null,
    contenu: str(fd, "contenu") || null,
    categorie: str(fd, "categorie") || null,
    image_url: str(fd, "image_url") || null,
    statut: str(fd, "statut") || "brouillon",
    a_la_une: bool(fd, "a_la_une"),
    publie_le: str(fd, "statut") === "publie" ? new Date().toISOString().slice(0, 10) : null,
  });
  revalidatePath("/admin/actualites");
  revalidatePath("/actualites");
}

export async function supprimerActualite(fd: FormData) {
  guard();
  const s = createClient();
  await s.from("actualites").delete().eq("id", str(fd, "id"));
  revalidatePath("/admin/actualites");
  revalidatePath("/actualites");
}

export async function basculerStatutActualite(fd: FormData) {
  guard();
  const s = createClient();
  const id = str(fd, "id");
  const nouveau = str(fd, "statut") === "publie" ? "publie" : "brouillon";
  await s.from("actualites").update({
    statut: nouveau,
    publie_le: nouveau === "publie" ? new Date().toISOString().slice(0, 10) : null,
  }).eq("id", id);
  revalidatePath("/admin/actualites");
  revalidatePath("/actualites");
}

/* ---------------- ÉVÉNEMENTS ---------------- */
export async function creerEvenement(fd: FormData) {
  guard();
  const s = createClient();
  await s.from("evenements").insert({
    titre: str(fd, "titre"),
    description: str(fd, "description") || null,
    lieu: str(fd, "lieu") || null,
    date_debut: str(fd, "date_debut") || new Date().toISOString(),
    heure_texte: str(fd, "heure_texte") || null,
    categorie: str(fd, "categorie") || null,
    inscription: bool(fd, "inscription"),
  });
  revalidatePath("/admin/evenements");
  revalidatePath("/evenements");
}

export async function supprimerEvenement(fd: FormData) {
  guard();
  const s = createClient();
  await s.from("evenements").delete().eq("id", str(fd, "id"));
  revalidatePath("/admin/evenements");
  revalidatePath("/evenements");
}

/* ---------------- HORAIRES ---------------- */
export async function creerHoraire(fd: FormData) {
  guard();
  const s = createClient();
  await s.from("horaires").insert({
    type: str(fd, "type") || "messe",
    jour: str(fd, "jour"),
    heure: str(fd, "heure"),
    note: str(fd, "note") || null,
    est_dimanche: bool(fd, "est_dimanche"),
    ordre: Number(str(fd, "ordre") || "0"),
  });
  revalidatePath("/admin/horaires");
  revalidatePath("/horaires");
}

export async function supprimerHoraire(fd: FormData) {
  guard();
  const s = createClient();
  await s.from("horaires").delete().eq("id", str(fd, "id"));
  revalidatePath("/admin/horaires");
  revalidatePath("/horaires");
}

export async function creerException(fd: FormData) {
  guard();
  const s = createClient();
  await s.from("horaires_exceptions").insert({ texte: str(fd, "texte"), actif: true });
  revalidatePath("/admin/horaires");
  revalidatePath("/horaires");
}

export async function supprimerException(fd: FormData) {
  guard();
  const s = createClient();
  await s.from("horaires_exceptions").delete().eq("id", str(fd, "id"));
  revalidatePath("/admin/horaires");
  revalidatePath("/horaires");
}

/* ---------------- GALERIE ---------------- */
export async function creerAlbum(fd: FormData) {
  guard();
  const s = createClient();
  await s.from("albums").insert({
    titre: str(fd, "titre"),
    theme: str(fd, "theme") || null,
    couverture_url: str(fd, "couverture_url") || null,
  });
  revalidatePath("/admin/galerie");
  revalidatePath("/galerie");
}

export async function supprimerAlbum(fd: FormData) {
  guard();
  const s = createClient();
  await s.from("albums").delete().eq("id", str(fd, "id"));
  revalidatePath("/admin/galerie");
  revalidatePath("/galerie");
}

/* ---------------- LIVRE D'OR (modération) ---------------- */
export async function modererTemoignage(fd: FormData) {
  guard();
  const s = createClient();
  await s.from("temoignages").update({ statut: str(fd, "statut") }).eq("id", str(fd, "id"));
  revalidatePath("/admin/livre-d-or");
  revalidatePath("/livre-d-or");
}

export async function supprimerTemoignage(fd: FormData) {
  guard();
  const s = createClient();
  await s.from("temoignages").delete().eq("id", str(fd, "id"));
  revalidatePath("/admin/livre-d-or");
  revalidatePath("/livre-d-or");
}

/* ---------------- UTILISATEURS ---------------- */
export async function changerRole(fd: FormData) {
  guard();
  const s = createClient();
  await s.from("profils").update({ role: str(fd, "role") }).eq("id", str(fd, "id"));
  revalidatePath("/admin/utilisateurs");
}

/* ---------------- FORMULAIRES PUBLICS ---------------- */
export async function envoyerTemoignage(fd: FormData) {
  if (!SUPABASE_CONFIGURED) return; // mode démo : ignoré silencieusement
  const s = createClient();
  await s.from("temoignages").insert({
    nom: str(fd, "nom"),
    email: str(fd, "email") || null,
    texte: str(fd, "texte"),
    statut: "en_attente",
  });
  revalidatePath("/livre-d-or");
}

export async function envoyerMessage(fd: FormData) {
  if (!SUPABASE_CONFIGURED) return;
  const s = createClient();
  await s.from("messages_contact").insert({
    nom: str(fd, "nom"),
    email: str(fd, "email") || null,
    telephone: str(fd, "telephone") || null,
    objet: str(fd, "objet") || null,
    message: str(fd, "message"),
  });
}

export async function enregistrerDon(fd: FormData) {
  if (!SUPABASE_CONFIGURED) return;
  const s = createClient();
  await s.from("dons").insert({
    montant: Number(str(fd, "montant") || "0"),
    motif: str(fd, "motif") || null,
    moyen: str(fd, "moyen") || null,
    nom: str(fd, "nom") || null,
    contact: str(fd, "contact") || null,
    statut: "en_attente",
  });
}

/* ---------------- CLERGÉ ---------------- */
export async function creerClerge(fd: FormData) {
  guard();
  const s = createClient();
  await s.from("clerge").insert({
    nom: str(fd, "nom"),
    fonction: str(fd, "fonction") || null,
    photo_url: str(fd, "photo_url") || null,
    ordre: Number(str(fd, "ordre") || "0"),
  });
  revalidatePath("/admin/clerge");
  revalidatePath("/la-chapelle");
}

export async function supprimerClerge(fd: FormData) {
  guard();
  const s = createClient();
  await s.from("clerge").delete().eq("id", str(fd, "id"));
  revalidatePath("/admin/clerge");
  revalidatePath("/la-chapelle");
}

/* ---------------- CONSEIL PAROISSIAL ---------------- */
export async function creerConseil(fd: FormData) {
  guard();
  const s = createClient();
  await s.from("conseil_paroissial").insert({
    nom: str(fd, "nom"),
    fonction: str(fd, "fonction") || null,
    photo_url: str(fd, "photo_url") || null,
    ordre: Number(str(fd, "ordre") || "0"),
  });
  revalidatePath("/admin/conseil");
  revalidatePath("/la-chapelle");
}

export async function supprimerConseil(fd: FormData) {
  guard();
  const s = createClient();
  await s.from("conseil_paroissial").delete().eq("id", str(fd, "id"));
  revalidatePath("/admin/conseil");
  revalidatePath("/la-chapelle");
}

/* ---------------- MOUVEMENTS ---------------- */
export async function creerMouvement(fd: FormData) {
  guard();
  const s = createClient();
  await s.from("mouvements").insert({
    nom: str(fd, "nom"),
    description: str(fd, "description") || null,
    president_nom: str(fd, "president_nom") || null,
    president_contact: str(fd, "president_contact") || null,
    secretaire_nom: str(fd, "secretaire_nom") || null,
    secretaire_contact: str(fd, "secretaire_contact") || null,
    ordre: Number(str(fd, "ordre") || "0"),
  });
  revalidatePath("/admin/mouvements");
  revalidatePath("/la-chapelle");
}

export async function supprimerMouvement(fd: FormData) {
  guard();
  const s = createClient();
  await s.from("mouvements").delete().eq("id", str(fd, "id"));
  revalidatePath("/admin/mouvements");
  revalidatePath("/la-chapelle");
}
