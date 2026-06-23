import Link from "next/link";
import ImageUpload from "@/components/image-upload";
import { getEvenements } from "@/lib/queries";
import { modifierEvenement } from "@/lib/actions";
import { notFound } from "next/navigation";

export default async function EditEvenement({ params }: { params: { id: string } }) {
  const items = await getEvenements();
  const e = items.find((x) => x.id === params.id);
  if (!e) notFound();

  // valeur compatible input datetime-local (YYYY-MM-DDTHH:mm)
  const dt = e.date_debut ? new Date(e.date_debut).toISOString().slice(0, 16) : "";

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/evenements" className="mb-4 inline-block text-[14px] text-attenue2 hover:text-marial">← Retour</Link>
      <h1 className="mb-6 font-display text-[30px] font-semibold text-marial">Modifier l'événement</h1>

      <form action={modifierEvenement} className="card space-y-4 p-6">
        <input type="hidden" name="id" value={e.id} />
        <input name="titre" required defaultValue={e.titre} className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
        <textarea name="description" rows={3} defaultValue={e.description ?? ""} placeholder="Description" className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
        <input name="lieu" defaultValue={e.lieu ?? ""} placeholder="Lieu" className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
        <div className="grid grid-cols-2 gap-3">
          <input name="date_debut" type="datetime-local" defaultValue={dt} className="rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
          <input name="heure_texte" defaultValue={e.heure_texte ?? ""} placeholder="Heure (ex. 09h00)" className="rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
        </div>
        <input name="categorie" defaultValue={e.categorie ?? ""} placeholder="Catégorie" className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />

        <div>
          <label className="eyebrow mb-2 block">Image de l'événement</label>
          {e.image_url && <img src={e.image_url} alt="" className="mb-2 h-32 w-full rounded-field object-cover" />}
          <ImageUpload />
          <p className="mt-1 text-[12px] text-attenue2">Laisser vide pour conserver l'image actuelle.</p>
        </div>

        <label className="flex items-center gap-2 text-[14px] text-encre">
          <input type="checkbox" name="inscription" defaultChecked={e.inscription} /> Inscription possible
        </label>

        <button type="submit" className="btn-or w-full">Enregistrer les modifications</button>
      </form>
    </div>
  );
}
