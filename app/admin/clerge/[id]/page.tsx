import Link from "next/link";
import ImageUpload from "@/components/image-upload";
import { getClerge } from "@/lib/queries";
import { modifierClerge } from "@/lib/actions";
import { notFound } from "next/navigation";

export default async function EditClerge({ params }: { params: { id: string } }) {
  const items = await getClerge();
  const m = items.find((x) => x.id === params.id);
  if (!m) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/clerge" className="mb-4 inline-block text-[14px] text-attenue2 hover:text-marial">← Retour</Link>
      <h1 className="mb-6 font-display text-[30px] font-semibold text-marial">Modifier le membre</h1>

      <form action={modifierClerge} className="card space-y-4 p-6">
        <input type="hidden" name="id" value={m.id} />
        <input name="nom" required defaultValue={m.nom} className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
        <input name="fonction" defaultValue={m.fonction ?? ""} placeholder="Fonction" className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
        <div>
          <label className="eyebrow mb-2 block">Photo</label>
          {m.photo_url && <img src={m.photo_url} alt="" className="mb-2 h-24 w-24 rounded-full object-cover" />}
          <ImageUpload name="photo_url" />
          <p className="mt-1 text-[12px] text-attenue2">Laisser vide pour conserver la photo actuelle.</p>
        </div>
        <input name="ordre" type="number" defaultValue={m.ordre} className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
        <button type="submit" className="btn-or w-full">Enregistrer les modifications</button>
      </form>
    </div>
  );
}
