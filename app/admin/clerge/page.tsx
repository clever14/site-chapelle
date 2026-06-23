import Link from "next/link";
import ImageUpload from "@/components/image-upload";
import { getClerge } from "@/lib/queries";
import { creerClerge, supprimerClerge } from "@/lib/actions";

export default async function AdminClerge() {
  const membres = await getClerge();
  return (
    <div>
      <h1 className="mb-8 font-display text-[30px] font-semibold text-marial">Clergé</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <form action={creerClerge} className="card h-fit space-y-4 p-6">
          <h2 className="font-display text-[20px] font-semibold text-encre">Ajouter un membre</h2>
          <input name="nom" required placeholder="Nom (ex. Père Jean-Baptiste Koffi)" className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
          <input name="fonction" placeholder="Fonction (ex. Curé de la chapelle)" className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
          <div>
            <label className="eyebrow mb-2 block">Photo</label>
            <ImageUpload name="photo_url" />
          </div>
          <input name="ordre" type="number" defaultValue={0} placeholder="Ordre d'affichage" className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
          <button type="submit" className="btn-or w-full">Enregistrer</button>
        </form>

        <div className="space-y-3">
          {membres.map((m) => (
            <div key={m.id} className="card flex items-center justify-between gap-3 p-4">
              <div className="flex items-center gap-3">
                {m.photo_url
                  ? <img src={m.photo_url} alt={m.nom} className="h-12 w-12 rounded-full object-cover" />
                  : <div className="placeholder-rayed h-12 w-12 rounded-full" />}
                <div>
                  <p className="font-body font-semibold text-encre">{m.nom}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-mono">{m.fonction ?? "—"}</p>
                </div>
              </div>
              <Link href={`/admin/clerge/${m.id}`} className="shrink-0 rounded-field border border-bord-3 px-2.5 py-1.5 text-[12px] hover:border-or">✎</Link>
              <form action={supprimerClerge}>
                <input type="hidden" name="id" value={m.id} />
                <button className="shrink-0 rounded-field border border-bord-3 px-2.5 py-1.5 text-[12px] text-bordeaux hover:border-bordeaux">🗑</button>
              </form>
            </div>
          ))}
          {membres.length === 0 && <p className="text-[14px] text-attenue2">Aucun membre.</p>}
        </div>
      </div>
    </div>
  );
}
