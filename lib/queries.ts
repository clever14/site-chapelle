// lib/queries.ts — lectures côté serveur.
// Si Supabase n'est pas configuré (ou en cas d'erreur), renvoie les données d'exemple (seed).
import { createClient } from "./supabase/server";
import { SUPABASE_CONFIGURED } from "./supabase/config";
import {
  SEED_ACTUALITES, SEED_EVENEMENTS, SEED_HORAIRES, SEED_EXCEPTIONS,
  SEED_ALBUMS, SEED_TEMOIGNAGES, SEED_DONS, SEED_PROFILS,
  SEED_CLERGE, SEED_CONSEIL, SEED_MOUVEMENTS, SEED_MESSAGES,
} from "./seed";
import type {
  Actualite, Evenement, Horaire, HoraireException,
  Album, Temoignage, Don, Profil,
} from "./types";

async function safe<T>(seed: T, run: () => Promise<T>): Promise<T> {
  if (!SUPABASE_CONFIGURED) return seed;
  try {
    return await run();
  } catch {
    return seed;
  }
}

export const usingSeed = () => !SUPABASE_CONFIGURED;

export function getActualites(opts?: { adminAll?: boolean }) {
  return safe<Actualite[]>(SEED_ACTUALITES, async () => {
    const s = createClient();
    let q = s.from("actualites").select("*").order("publie_le", { ascending: false, nullsFirst: false });
    if (!opts?.adminAll) q = q.eq("statut", "publie");
    const { data, error } = await q;
    if (error) throw error;
    return data as Actualite[];
  });
}

export function getEvenements() {
  return safe<Evenement[]>(SEED_EVENEMENTS, async () => {
    const s = createClient();
    const { data, error } = await s.from("evenements").select("*").order("date_debut", { ascending: true });
    if (error) throw error;
    return data as Evenement[];
  });
}

export function getHoraires() {
  return safe<Horaire[]>(SEED_HORAIRES, async () => {
    const s = createClient();
    const { data, error } = await s.from("horaires").select("*").order("ordre", { ascending: true });
    if (error) throw error;
    return data as Horaire[];
  });
}

export function getExceptions() {
  return safe<HoraireException[]>(SEED_EXCEPTIONS, async () => {
    const s = createClient();
    const { data, error } = await s.from("horaires_exceptions").select("*").eq("actif", true);
    if (error) throw error;
    return data as HoraireException[];
  });
}

export function getAlbums() {
  return safe<Album[]>(SEED_ALBUMS, async () => {
    const s = createClient();
    const { data, error } = await s.from("albums").select("*").order("cree_le", { ascending: false });
    if (error) throw error;
    return data as Album[];
  });
}

export function getTemoignages(opts?: { adminAll?: boolean }) {
  return safe<Temoignage[]>(SEED_TEMOIGNAGES, async () => {
    const s = createClient();
    let q = s.from("temoignages").select("*").order("cree_le", { ascending: false });
    if (!opts?.adminAll) q = q.eq("statut", "approuve");
    const { data, error } = await q;
    if (error) throw error;
    return data as Temoignage[];
  });
}

export function getDons() {
  return safe<Don[]>(SEED_DONS, async () => {
    const s = createClient();
    const { data, error } = await s.from("dons").select("*").order("cree_le", { ascending: false });
    if (error) throw error;
    return data as Don[];
  });
}

export function getProfils() {
  return safe<Profil[]>(SEED_PROFILS, async () => {
    const s = createClient();
    const { data, error } = await s.from("profils").select("*").order("cree_le", { ascending: true });
    if (error) throw error;
    return data as Profil[];
  });
}

export function getClerge() {
  return safe(SEED_CLERGE, async () => {
    const s = createClient();
    const { data, error } = await s.from("clerge").select("*").order("ordre", { ascending: true });
    if (error) throw error;
    return data as typeof SEED_CLERGE;
  });
}

export function getConseil() {
  return safe(SEED_CONSEIL, async () => {
    const s = createClient();
    const { data, error } = await s.from("conseil_paroissial").select("*").order("ordre", { ascending: true });
    if (error) throw error;
    return data as typeof SEED_CONSEIL;
  });
}

export function getMouvements() {
  return safe(SEED_MOUVEMENTS, async () => {
    const s = createClient();
    const { data, error } = await s.from("mouvements").select("*").order("ordre", { ascending: true });
    if (error) throw error;
    return data as typeof SEED_MOUVEMENTS;
  });
}

export function getMessages() {
  return safe(SEED_MESSAGES, async () => {
    const s = createClient();
    const { data, error } = await s.from("messages_contact").select("*").order("cree_le", { ascending: false });
    if (error) throw error;
    return data as typeof SEED_MESSAGES;
  });
}
