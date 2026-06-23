import { getTemoignages } from "@/lib/queries";
import { modererTemoignage, supprimerTemoignage } from "@/lib/actions";

const STATUTS: Record<string, { label: string; classe: string }> = {
  en_attente: { label: "En attente", classe: "bg-panneau-1 text-[#8a6d22]" },
  approuve: { label: "Approuvé", classe: "bg-[#e3f0e6] text-[#1f7a44]" },
  masque: { label: "Masqué", classe: "bg-bord-2 text-attenue" },
};

export default async function AdminLivreDOr() {
  const temoignages = await getTemoignages({ adminAll: true });
  const enAttente = temoignages.filter((t) => t.statut === "en_attente");
  const autres = temoignages.filter((t) => t.statut !== "en_attente");

  return (
    <div>
      <h1 className="mb-2 font-display text-[30px] font-semibold text-marial">Livre d'or</h1>
      <p className="mb-8 text-[14px] text-attenue2">Modération des témoignages</p>

      {enAttente.length > 0 && (
        <>
          <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-bordeaux">
            File de modération ({enAttente.length})
          </h2>
          <div className="mb-10 space-y-3">
            {enAttente.map((t) => (
              <div key={t.id} className="card border-or p-5">
                <p className="mb-1 font-body font-semibold text-encre">{t.nom}</p>
                <p className="mb-4 text-[15px] italic text-attenue">« {t.texte} »</p>
                <div className="flex flex-wrap gap-2">
                  <form action={modererTemoignage}>
                    <input type="hidden" name="id" value={t.id} />
                    <input type="hidden" name="statut" value="approuve" />
                    <button className="btn bg-[#1faa54] px-4 py-2 text-[13px] text-white hover:bg-[#178f46]">Approuver</button>
                  </form>
                  <form action={modererTemoignage}>
                    <input type="hidden" name="id" value={t.id} />
                    <input type="hidden" name="statut" value="masque" />
                    <button className="btn-outline px-4 py-2 text-[13px]">Masquer</button>
                  </form>
                  <form action={supprimerTemoignage}>
                    <input type="hidden" name="id" value={t.id} />
                    <button className="btn px-4 py-2 text-[13px] text-bordeaux">Supprimer</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-mono">Tous les témoignages</h2>
      <div className="space-y-3">
        {autres.map((t) => (
          <div key={t.id} className="card flex items-center justify-between gap-3 p-4">
            <div className="min-w-0">
              <p className="font-body font-semibold text-encre">{t.nom}</p>
              <p className="truncate text-[14px] text-attenue">{t.texte}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className={`pill text-[11px] ${STATUTS[t.statut].classe}`}>{STATUTS[t.statut].label}</span>
              {t.statut === "masque" && (
                <form action={modererTemoignage}>
                  <input type="hidden" name="id" value={t.id} />
                  <input type="hidden" name="statut" value="approuve" />
                  <button className="rounded-field border border-bord-3 px-2.5 py-1.5 text-[12px] hover:border-or">Réafficher</button>
                </form>
              )}
              <form action={supprimerTemoignage}>
                <input type="hidden" name="id" value={t.id} />
                <button className="rounded-field border border-bord-3 px-2.5 py-1.5 text-[12px] text-bordeaux hover:border-bordeaux">🗑</button>
              </form>
            </div>
          </div>
        ))}
        {autres.length === 0 && <p className="text-[14px] text-attenue2">Aucun témoignage publié.</p>}
      </div>
    </div>
  );
}
