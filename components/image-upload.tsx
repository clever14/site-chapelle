"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { SUPABASE_CONFIGURED } from "@/lib/supabase/config";

export default function ImageUpload({ name = "image_url" }: { name?: string }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setErr("");

    if (!SUPABASE_CONFIGURED) {
      setErr("Mode démo : l'upload sera actif une fois Supabase branché.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const chemin = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("medias").upload(chemin, file, { upsert: false });
      if (error) throw error;
      const { data } = supabase.storage.from("medias").getPublicUrl(chemin);
      setUrl(data.publicUrl);
    } catch {
      setErr("Échec de l'upload. Vérifiez le bucket « medias ».");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-field border-2 border-dashed border-bord-3 bg-panneau-1/40 px-4 py-8 text-center transition-colors hover:border-or">
        <input type="file" accept="image/*" onChange={onFile} className="hidden" />
        {loading ? (
          <span className="text-[14px] text-attenue">Envoi en cours…</span>
        ) : url ? (
          <span className="text-[14px] text-[#1f7a44]">✓ Image téléversée</span>
        ) : (
          <>
            <span className="mb-1 text-[24px]">⬆</span>
            <span className="text-[14px] text-attenue">Glisser-déposer ou cliquer pour choisir une image</span>
          </>
        )}
      </label>
      {err && <p className="mt-2 text-[12px] text-bordeaux">{err}</p>}
      <input type="hidden" name={name} value={url} />
    </div>
  );
}
