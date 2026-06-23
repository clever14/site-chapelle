import ImageUpload from "@/components/image-upload";
import { getActualites } from "@/lib/queries";
import {
  creerActualite, supprimerActualite, basculerStatutActualite,
} from "@/lib/actions";

const CATS = ["Vie paroissiale", "Annonces", "Caté", "Solidarité"];

export default async function AdminActualites() {
  const actualites = await getActualites({ adminAll: true });

  return (
    <div>
      <h1 className="mb-8 font-display text-[30px] font-semibold text-marial">Actualités</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Formulaire */}
        <form action={creerActualite} className="card h-fit space-y-4 p-6">
          <h2 className="font-display text-[20px] font-semibold text-encre">Nouvelle actualité</h2>
          <input name="titre" required placeholder="Titre" className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
          <textarea name="extrait" placeholder="Extrait (résumé court)" rows={2} className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
          <textarea name="contenu" placeholder="Contenu complet" rows={4} className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
          <select name="categorie" className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or">
            <option value="">Catégorie…</option>
            {CATS.map((c) => <option key={c}>{c}</option>)}
          </select>

          <div>
            <label className="eyebrow mb-2 block">Visuel à la une</label>
            <ImageUpload />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-[14px] text-encre">
              <input type="checkbox" name="a_la_une" /> À la une
            </label>
            <select name="statut" className="rounded-field border border-bord-2 bg-carte px-3 py-2 text-[14px] outline-none focus:border-or">
              <option value="brouillon">Brouillon</option>
              <option value="publie">Publié</option>
            </select>
          </div>

          <button type="submit" className="btn-or w-full">Enregistrer</button>
        </form>

        {/* Liste */}
        <div className="space-y-3">
          {actualites.map((a) => (
            <div key={a.id} className="card flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="truncate font-body font-semibold text-encre">{a.titre}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-mono">{a.categorie ?? "—"}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className={`pill text-[11px] ${a.statut === "publie" ? "bg-[#e3f0e6] text-[#1f7a44]" : "bg-panneau-1 text-[#8a6d22]"}`}>
                  {a.statut === "publie" ? "Publié" : "Brouillon"}
                </span>
                <form action={basculerStatutActualite}>
                  <input type="hidden" name="id" value={a.id} />
                  <input type="hidden" name="statut" value={a.statut === "publie" ? "brouillon" : "publie"} />
                  <button className="rounded-field border border-bord-3 px-2.5 py-1.5 text-[12px] hover:border-or" title="Changer le statut">↻</button>
                </form>
                <form action={supprimerActualite}>
                  <input type="hidden" name="id" value={a.id} />
                  <button className="rounded-field border border-bord-3 px-2.5 py-1.5 text-[12px] text-bordeaux hover:border-bordeaux">🗑</button>
                </form>
              </div>
            </div>
          ))}
          {actualites.length === 0 && <p className="text-[14px] text-attenue2">Aucune actualité.</p>}
        </div>
      </div>
    </div>
  );
}
