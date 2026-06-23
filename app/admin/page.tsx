import Link from "next/link";
import { getActualites, getEvenements, getAlbums, getTemoignages } from "@/lib/queries";

export default async function AdminDashboard() {
  const [actualites, evenements, albums, temoignages] = await Promise.all([
    getActualites({ adminAll: true }),
    getEvenements(),
    getAlbums(),
    getTemoignages({ adminAll: true }),
  ]);

  const aModerer = temoignages.filter((t) => t.statut === "en_attente").length;

  const stats = [
    { label: "Actualités", valeur: actualites.length, href: "/admin/actualites" },
    { label: "Événements", valeur: evenements.length, href: "/admin/evenements" },
    { label: "Albums", valeur: albums.length, href: "/admin/galerie" },
    { label: "À modérer", valeur: aModerer, href: "/admin/livre-d-or", alerte: true },
  ];

  const recents = actualites.slice(0, 5);

  return (
    <div>
      <h1 className="mb-1 font-display text-[30px] font-semibold text-marial">Tableau de bord</h1>
      <p className="mb-8 text-[14px] text-attenue2">Vue d'ensemble de la chapelle</p>

      <div className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}
            className={`card p-5 transition-shadow hover:shadow-cardLg ${s.alerte && s.valeur > 0 ? "border-or" : ""}`}>
            <p className={`font-display text-[34px] font-bold leading-none ${s.alerte && s.valeur > 0 ? "text-or" : "text-marial"}`}>
              {s.valeur}
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-mono">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <h2 className="mb-4 font-display text-[20px] font-semibold text-marial">Contenus récents</h2>
          <ul className="divide-y divide-bord-1">
            {recents.map((a) => (
              <li key={a.id} className="flex items-center justify-between py-3">
                <span className="font-body text-[15px] text-encre">{a.titre}</span>
                <span className={`pill text-[11px] ${
                  a.statut === "publie" ? "bg-[#e3f0e6] text-[#1f7a44]" : "bg-panneau-1 text-[#8a6d22]"
                }`}>
                  {a.statut === "publie" ? "Publié" : "Brouillon"}
                </span>
              </li>
            ))}
            {recents.length === 0 && <li className="py-3 text-[14px] text-attenue2">Aucun contenu.</li>}
          </ul>
        </div>

        <div className="card p-6">
          <h2 className="mb-4 font-display text-[20px] font-semibold text-marial">Actions rapides</h2>
          <div className="space-y-2">
            <Link href="/admin/actualites" className="btn-or w-full">+ Nouvelle actualité</Link>
            <Link href="/admin/evenements" className="btn-outline w-full">+ Nouvel événement</Link>
            <Link href="/admin/galerie" className="btn-outline w-full">+ Nouvel album</Link>
          </div>
        </div>
      </div>

      {/* Bandeau UX — comme la maquette */}
      <div className="mt-6 rounded-card bg-marial p-6 text-white">
        <p className="eyebrow mb-4 text-or/90">UX — Administration</p>
        <div className="grid grid-cols-1 gap-x-10 gap-y-2 text-[14px] text-white/85 md:grid-cols-2">
          <p>› <strong className="text-white">Simplicité avant tout</strong> — pensé pour des responsables non-techniciens.</p>
          <p>› <strong className="text-white">Statuts clairs</strong> — Publié / Brouillon / À modérer.</p>
          <p>› <strong className="text-white">Rôles</strong> — Administrateur, Éditeur, Modérateur.</p>
          <p>› <strong className="text-white">Édition & photos</strong> — modifiez tout, ajoutez vos images.</p>
        </div>
      </div>
    </div>
  );
}
