import Link from "next/link";
import { getMouvements } from "@/lib/queries";
import { creerMouvement, supprimerMouvement } from "@/lib/actions";

export default async function AdminMouvements() {
  const mouvements = await getMouvements();
  return (
    <div>
      <h1 className="mb-8 font-display text-[30px] font-semibold text-marial">Mouvements & groupes</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <form action={creerMouvement} className="card h-fit space-y-4 p-6">
          <h2 className="font-display text-[20px] font-semibold text-encre">Ajouter un mouvement</h2>
          <input name="nom" required placeholder="Nom du mouvement (ex. Légion de Marie)" className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
          <textarea name="description" rows={2} placeholder="Description (facultatif)" className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />

          <div className="rounded-field border border-bord-1 bg-panneau-1/40 p-3">
            <p className="eyebrow mb-2">Président</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <input name="president_nom" placeholder="Nom" className="rounded-field border border-bord-2 bg-carte px-3 py-2 outline-none focus:border-or" />
              <input name="president_contact" placeholder="Téléphone / email" className="rounded-field border border-bord-2 bg-carte px-3 py-2 outline-none focus:border-or" />
            </div>
          </div>

          <div className="rounded-field border border-bord-1 bg-panneau-1/40 p-3">
            <p className="eyebrow mb-2">Secrétaire</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <input name="secretaire_nom" placeholder="Nom" className="rounded-field border border-bord-2 bg-carte px-3 py-2 outline-none focus:border-or" />
              <input name="secretaire_contact" placeholder="Téléphone / email" className="rounded-field border border-bord-2 bg-carte px-3 py-2 outline-none focus:border-or" />
            </div>
          </div>

          <input name="ordre" type="number" defaultValue={0} placeholder="Ordre d'affichage" className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
          <button type="submit" className="btn-or w-full">Enregistrer</button>
        </form>

        <div className="space-y-3">
          {mouvements.map((m) => (
            <div key={m.id} className="card p-5">
              <div className="mb-2 flex items-start justify-between gap-3">
                <h3 className="font-display text-[19px] font-semibold text-encre">{m.nom}</h3>
                <Link href={`/admin/mouvements/${m.id}`} className="shrink-0 rounded-field border border-bord-3 px-2.5 py-1.5 text-[12px] hover:border-or">✎</Link>
                <form action={supprimerMouvement}>
                  <input type="hidden" name="id" value={m.id} />
                  <button className="shrink-0 rounded-field border border-bord-3 px-2.5 py-1.5 text-[12px] text-bordeaux hover:border-bordeaux">🗑</button>
                </form>
              </div>
              {m.description && <p className="mb-3 text-[14px] text-attenue">{m.description}</p>}
              <div className="grid grid-cols-1 gap-2 text-[13px] sm:grid-cols-2">
                {m.president_nom && (
                  <div className="rounded-field bg-panneau-1/50 px-3 py-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-mono">Président</span>
                    <p className="text-encre">{m.president_nom}</p>
                    {m.president_contact && <p className="text-attenue">{m.president_contact}</p>}
                  </div>
                )}
                {m.secretaire_nom && (
                  <div className="rounded-field bg-panneau-1/50 px-3 py-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-mono">Secrétaire</span>
                    <p className="text-encre">{m.secretaire_nom}</p>
                    {m.secretaire_contact && <p className="text-attenue">{m.secretaire_contact}</p>}
                  </div>
                )}
              </div>
            </div>
          ))}
          {mouvements.length === 0 && <p className="text-[14px] text-attenue2">Aucun mouvement.</p>}
        </div>
      </div>
    </div>
  );
}
