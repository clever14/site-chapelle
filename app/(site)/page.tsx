import Link from "next/link";
import Placeholder from "@/components/placeholder";
import ProchaineMesseBanner from "@/components/prochaine-messe-banner";
import { getEvenements, getActualites, getAlbums } from "@/lib/queries";
import { pastilleDate } from "@/lib/format";

export default async function AccueilPage() {
  const [evenements, actualites, albums] = await Promise.all([
    getEvenements(),
    getActualites(),
    getAlbums(),
  ]);

  const prochains = evenements.slice(0, 3);
  const actus = actualites.filter((a) => a.statut === "publie").slice(0, 4);
  const apercuGalerie = [...albums, ...albums].slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative">
        <Placeholder label="Photo · façade de la chapelle" rounded="rounded-none" className="h-[460px] w-full md:h-[560px]" />
        <div className="absolute inset-0 bg-creme/55" />
        <div className="absolute inset-0 flex items-center">
          <div className="container-x text-center">
            <p className="eyebrow mb-4 text-bordeaux">Djibi Village · Abidjan</p>
            <h1 className="mx-auto max-w-3xl font-display text-[42px] font-semibold leading-[1.05] text-marial md:text-[62px]">
              Bienvenue à la Chapelle
            </h1>
            <div className="mx-auto my-6 h-[2px] w-24 bg-or" />
            <p className="mx-auto mb-8 max-w-xl text-[17px] text-attenue">
              Une communauté de prière et de fraternité au cœur de Djibi Village.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/horaires" className="btn-or">Horaires des messes</Link>
              <Link href="/contact" className="btn-outline bg-carte">Nous trouver</Link>
            </div>
          </div>
        </div>
      </section>

      <ProchaineMesseBanner />

      {/* ÉVÉNEMENTS */}
      <section className="container-x py-16 md:py-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="eyebrow mb-2">Agenda</p>
            <h2 className="font-display text-[32px] font-semibold text-marial md:text-[36px]">Prochains événements</h2>
          </div>
          <Link href="/evenements" className="hidden text-[14px] font-semibold text-marial hover:text-or sm:inline">Tout voir →</Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {prochains.map((e) => {
            const p = pastilleDate(e.date_debut);
            return (
              <article key={e.id} className="card overflow-hidden">
                <div className="relative">
                  <Placeholder label={e.categorie ?? "Événement"} rounded="rounded-none" className="h-44 w-full" />
                  <div className="absolute left-4 top-4 flex flex-col items-center rounded-field bg-bordeaux px-3 py-1.5 text-white">
                    <span className="font-display text-[20px] font-bold leading-none">{p.jour}</span>
                    <span className="font-mono text-[10px] tracking-[0.15em]">{p.mois}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="mb-2 font-display text-[20px] font-semibold text-encre">{e.titre}</h3>
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-mono">
                    {e.heure_texte} · {e.lieu}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ACTUALITÉS + GALERIE */}
      <section className="bg-panneau-2/40">
        <div className="container-x grid grid-cols-1 gap-12 py-16 lg:grid-cols-2 md:py-20">
          <div>
            <p className="eyebrow mb-2">Vie de la communauté</p>
            <h2 className="mb-6 font-display text-[30px] font-semibold text-marial">Actualités récentes</h2>
            <ul className="space-y-4">
              {actus.map((a) => (
                <li key={a.id}>
                  <Link href="/actualites" className="flex gap-4 rounded-card p-2 transition-colors hover:bg-carte">
                    <Placeholder rounded="rounded-field" className="h-16 w-20 shrink-0" />
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mono">
                        {a.publie_le} · {a.categorie}
                      </p>
                      <p className="font-body font-semibold text-encre">{a.titre}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-2">En images</p>
            <h2 className="mb-6 font-display text-[30px] font-semibold text-marial">Galerie</h2>
            <div className="grid grid-cols-3 gap-3">
              {apercuGalerie.map((a, i) => (
                <Placeholder key={`${a.id}-${i}`} rounded="rounded-field" className="aspect-square w-full" />
              ))}
            </div>
            <Link href="/galerie" className="mt-5 inline-block text-[14px] font-semibold text-marial hover:text-or">
              Voir toute la galerie →
            </Link>
          </div>
        </div>
      </section>

      {/* NOUS TROUVER */}
      <section className="container-x py-16 md:py-20">
        <p className="eyebrow mb-2">Localisation</p>
        <h2 className="mb-6 font-display text-[30px] font-semibold text-marial">Nous trouver</h2>
        <div className="card overflow-hidden">
          <Placeholder label="Carte Google Maps · Djibi Village" rounded="rounded-none" className="h-[340px] w-full" />
        </div>
      </section>
    </>
  );
}
