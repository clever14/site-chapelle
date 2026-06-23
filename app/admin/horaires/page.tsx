import { getHoraires, getExceptions } from "@/lib/queries";
import {
  creerHoraire, supprimerHoraire, creerException, supprimerException,
} from "@/lib/actions";

const TYPES: { val: string; label: string }[] = [
  { val: "messe", label: "Messe" },
  { val: "confession", label: "Confession" },
  { val: "adoration", label: "Adoration" },
  { val: "permanence", label: "Permanence" },
];

export default async function AdminHoraires() {
  const [horaires, exceptions] = await Promise.all([getHoraires(), getExceptions()]);

  return (
    <div>
      <h1 className="mb-8 font-display text-[30px] font-semibold text-marial">Horaires</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Formulaires */}
        <div className="space-y-6">
          <form action={creerHoraire} className="card space-y-4 p-6">
            <h2 className="font-display text-[20px] font-semibold text-encre">Ajouter un horaire</h2>
            <select name="type" className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or">
              {TYPES.map((t) => <option key={t.val} value={t.val}>{t.label}</option>)}
            </select>
            <input name="jour" required placeholder="Jour (ex. Dimanche)" className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
            <input name="heure" required placeholder="Heure (ex. 07h00 · 09h00)" className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
            <input name="note" placeholder="Note (facultatif)" className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-[14px] text-encre">
                <input type="checkbox" name="est_dimanche" /> Mettre en évidence (dimanche)
              </label>
              <input name="ordre" type="number" defaultValue={0} className="w-20 rounded-field border border-bord-2 bg-carte px-3 py-2 text-[14px] outline-none focus:border-or" placeholder="Ordre" />
            </div>
            <button type="submit" className="btn-or w-full">Ajouter</button>
          </form>

          <form action={creerException} className="card space-y-4 p-6">
            <h2 className="font-display text-[20px] font-semibold text-encre">Changement exceptionnel</h2>
            <textarea name="texte" required rows={2} placeholder="Ex. Dimanche 29 : messe unique à 09h00" className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
            <button type="submit" className="btn-outline w-full">Ajouter l'avis</button>
          </form>
        </div>

        {/* Listes */}
        <div className="space-y-3">
          {horaires.map((h) => (
            <div key={h.id} className="card flex items-center justify-between gap-3 p-4">
              <div>
                <p className="font-body font-semibold text-encre">
                  {h.jour} · <span className="text-attenue">{h.heure}</span>
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-mono">{h.type}{h.est_dimanche ? " · à la une" : ""}</p>
              </div>
              <form action={supprimerHoraire}>
                <input type="hidden" name="id" value={h.id} />
                <button className="shrink-0 rounded-field border border-bord-3 px-2.5 py-1.5 text-[12px] text-bordeaux hover:border-bordeaux">🗑</button>
              </form>
            </div>
          ))}

          {exceptions.length > 0 && (
            <div className="card p-4">
              <p className="eyebrow mb-3 text-bordeaux">Avis exceptionnels</p>
              {exceptions.map((x) => (
                <div key={x.id} className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-[14px] text-attenue">{x.texte}</span>
                  <form action={supprimerException}>
                    <input type="hidden" name="id" value={x.id} />
                    <button className="shrink-0 text-[12px] text-bordeaux">✕</button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
