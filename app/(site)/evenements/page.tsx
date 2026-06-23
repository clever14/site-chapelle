import PageBanner from "@/components/page-banner";
import { getEvenements } from "@/lib/queries";
import { pastilleDate } from "@/lib/format";

export default async function EvenementsPage() {
  const evenements = await getEvenements();
  return (
    <>
      <PageBanner eyebrow="Agenda paroissial" titre="Événements" />
      <section className="container-x py-12">
        <div className="space-y-6">
          {evenements.map((e) => {
            const p = pastilleDate(e.date_debut);
            return (
              <article key={e.id} className="card flex flex-col gap-5 p-5 sm:flex-row sm:items-center">
                {e.image_url && (
                  <img src={e.image_url} alt={e.titre} className="h-32 w-full shrink-0 rounded-field object-cover sm:h-24 sm:w-32" />
                )}
                <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-field bg-bordeaux text-white">
                  <span className="font-display text-[26px] font-bold leading-none">{p.jour}</span>
                  <span className="font-mono text-[10px] tracking-[0.14em]">{p.mois}</span>
                </div>
                <div className="flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mono">
                    {e.heure_texte} · {e.lieu} · {e.categorie}
                  </p>
                  <h3 className="my-1 font-display text-[22px] font-semibold text-encre">{e.titre}</h3>
                  <p className="text-[14px] text-attenue">{e.description}</p>
                </div>
                {e.inscription
                  ? <button className="btn-or shrink-0">S'inscrire</button>
                  : <button className="btn-outline shrink-0">Détails</button>}
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
