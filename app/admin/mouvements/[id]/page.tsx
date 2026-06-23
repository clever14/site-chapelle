import Link from "next/link";
import { getMouvements } from "@/lib/queries";
import { modifierMouvement } from "@/lib/actions";
import { notFound } from "next/navigation";

export default async function EditMouvement({ params }: { params: { id: string } }) {
  const items = await getMouvements();
  const m = items.find((x) => x.id === params.id);
  if (!m) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/mouvements" className="mb-4 inline-block text-[14px] text-attenue2 hover:text-marial">← Retour</Link>
      <h1 className="mb-6 font-display text-[30px] font-semibold text-marial">Modifier le mouvement</h1>

      <form action={modifierMouvement} className="card space-y-4 p-6">
        <input type="hidden" name="id" value={m.id} />
        <input name="nom" required defaultValue={m.nom} className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
        <textarea name="description" rows={2} defaultValue={m.description ?? ""} placeholder="Description" className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />

        <div className="rounded-field border border-bord-1 bg-panneau-1/40 p-3">
          <p className="eyebrow mb-2">Président</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <input name="president_nom" defaultValue={m.president_nom ?? ""} placeholder="Nom" className="rounded-field border border-bord-2 bg-carte px-3 py-2 outline-none focus:border-or" />
            <input name="president_contact" defaultValue={m.president_contact ?? ""} placeholder="Téléphone / email" className="rounded-field border border-bord-2 bg-carte px-3 py-2 outline-none focus:border-or" />
          </div>
        </div>

        <div className="rounded-field border border-bord-1 bg-panneau-1/40 p-3">
          <p className="eyebrow mb-2">Secrétaire</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <input name="secretaire_nom" defaultValue={m.secretaire_nom ?? ""} placeholder="Nom" className="rounded-field border border-bord-2 bg-carte px-3 py-2 outline-none focus:border-or" />
            <input name="secretaire_contact" defaultValue={m.secretaire_contact ?? ""} placeholder="Téléphone / email" className="rounded-field border border-bord-2 bg-carte px-3 py-2 outline-none focus:border-or" />
          </div>
        </div>

        <input name="ordre" type="number" defaultValue={m.ordre} className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
        <button type="submit" className="btn-or w-full">Enregistrer les modifications</button>
      </form>
    </div>
  );
}
