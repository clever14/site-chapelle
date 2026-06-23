import Link from "next/link";
import ImageUpload from "@/components/image-upload";
import { getActualites } from "@/lib/queries";
import { modifierActualite } from "@/lib/actions";
import { notFound } from "next/navigation";

const CATS = ["Vie paroissiale", "Annonces", "Caté", "Solidarité"];

export default async function EditActualite({ params }: { params: { id: string } }) {
  const items = await getActualites({ adminAll: true });
  const a = items.find((x) => x.id === params.id);
  if (!a) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/actualites" className="mb-4 inline-block text-[14px] text-attenue2 hover:text-marial">← Retour</Link>
      <h1 className="mb-6 font-display text-[30px] font-semibold text-marial">Modifier l'actualité</h1>

      <form action={modifierActualite} className="card space-y-4 p-6">
        <input type="hidden" name="id" value={a.id} />
        <input name="titre" required defaultValue={a.titre} className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
        <textarea name="extrait" rows={2} defaultValue={a.extrait ?? ""} placeholder="Extrait" className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
        <textarea name="contenu" rows={4} defaultValue={a.contenu ?? ""} placeholder="Contenu" className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
        <select name="categorie" defaultValue={a.categorie ?? ""} className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or">
          <option value="">Catégorie…</option>
          {CATS.map((c) => <option key={c}>{c}</option>)}
        </select>

        <div>
          <label className="eyebrow mb-2 block">Visuel à la une</label>
          {a.image_url && <img src={a.image_url} alt="" className="mb-2 h-32 w-full rounded-field object-cover" />}
          <ImageUpload />
          <p className="mt-1 text-[12px] text-attenue2">Laisser vide pour conserver l'image actuelle.</p>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-[14px] text-encre">
            <input type="checkbox" name="a_la_une" defaultChecked={a.a_la_une} /> À la une
          </label>
          <select name="statut" defaultValue={a.statut} className="rounded-field border border-bord-2 bg-carte px-3 py-2 text-[14px] outline-none focus:border-or">
            <option value="brouillon">Brouillon</option>
            <option value="publie">Publié</option>
          </select>
        </div>

        <button type="submit" className="btn-or w-full">Enregistrer les modifications</button>
      </form>
    </div>
  );
}
