import Link from "next/link";
import ImageUpload from "@/components/image-upload";
import { getEvenements } from "@/lib/queries";
import { creerEvenement, supprimerEvenement } from "@/lib/actions";
import { dateLongue } from "@/lib/format";

export default async function AdminEvenements() {
  const evenements = await getEvenements();
  return (
    <div>
      <h1 className="mb-8 font-display text-[30px] font-semibold text-marial">Événements</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <form action={creerEvenement} className="card h-fit space-y-4 p-6">
          <h2 className="font-display text-[20px] font-semibold text-encre">Nouvel événement</h2>
          <input name="titre" required placeholder="Titre" className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
          <textarea name="description" placeholder="Description" rows={3} className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
          <input name="lieu" placeholder="Lieu" className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
          <div className="grid grid-cols-2 gap-3">
            <input name="date_debut" type="datetime-local" className="rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
            <input name="heure_texte" placeholder="Heure (ex. 09h00)" className="rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
          </div>
          <input name="categorie" placeholder="Catégorie" className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
          <div>
            <label className="eyebrow mb-2 block">Image de l'événement</label>
            <ImageUpload />
          </div>
          <label className="flex items-center gap-2 text-[14px] text-encre">
            <input type="checkbox" name="inscription" /> Inscription possible
          </label>
          <button type="submit" className="btn-or w-full">Enregistrer</button>
        </form>

        <div className="space-y-3">
          {evenements.map((e) => (
            <div key={e.id} className="card flex items-center gap-3 p-4">
              {e.image_url
                ? <img src={e.image_url} alt="" className="h-12 w-12 shrink-0 rounded-field object-cover" />
                : <div className="placeholder-rayed h-12 w-12 shrink-0 rounded-field" />}
              <div className="min-w-0 flex-1">
                <p className="truncate font-body font-semibold text-encre">{e.titre}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-mono">
                  {dateLongue(e.date_debut)} · {e.heure_texte}
                </p>
              </div>
              <Link href={`/admin/evenements/${e.id}`} className="shrink-0 rounded-field border border-bord-3 px-2.5 py-1.5 text-[12px] hover:border-or">✎</Link>
              <form action={supprimerEvenement}>
                <input type="hidden" name="id" value={e.id} />
                <button className="shrink-0 rounded-field border border-bord-3 px-2.5 py-1.5 text-[12px] text-bordeaux hover:border-bordeaux">🗑</button>
              </form>
            </div>
          ))}
          {evenements.length === 0 && <p className="text-[14px] text-attenue2">Aucun événement.</p>}
        </div>
      </div>
    </div>
  );
}
