import ImageUpload from "@/components/image-upload";
import { getAlbums } from "@/lib/queries";
import { creerAlbum, supprimerAlbum } from "@/lib/actions";

const THEMES = ["Messes", "Fêtes", "Baptêmes", "Pèlerinages"];

export default async function AdminGalerie() {
  const albums = await getAlbums();
  return (
    <div>
      <h1 className="mb-8 font-display text-[30px] font-semibold text-marial">Galerie</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <form action={creerAlbum} className="card h-fit space-y-4 p-6">
          <h2 className="font-display text-[20px] font-semibold text-encre">Nouvel album</h2>
          <input name="titre" required placeholder="Titre de l'album" className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
          <select name="theme" className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or">
            <option value="">Thème…</option>
            {THEMES.map((t) => <option key={t}>{t}</option>)}
          </select>
          <div>
            <label className="eyebrow mb-2 block">Image de couverture</label>
            <ImageUpload name="couverture_url" />
          </div>
          <button type="submit" className="btn-or w-full">Créer l'album</button>
        </form>

        <div className="grid grid-cols-2 gap-3">
          {albums.map((a) => (
            <div key={a.id} className="card overflow-hidden">
              <div className="placeholder-rayed aspect-[4/3] w-full" />
              <div className="flex items-center justify-between p-3">
                <div className="min-w-0">
                  <p className="truncate font-body text-[14px] font-semibold text-encre">{a.titre}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-mono">{a.theme ?? "—"}</p>
                </div>
                <form action={supprimerAlbum}>
                  <input type="hidden" name="id" value={a.id} />
                  <button className="shrink-0 text-[12px] text-bordeaux">🗑</button>
                </form>
              </div>
            </div>
          ))}
          {albums.length === 0 && <p className="text-[14px] text-attenue2">Aucun album.</p>}
        </div>
      </div>
    </div>
  );
}
