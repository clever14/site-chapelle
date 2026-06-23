"use client";

import { useState } from "react";
import Placeholder from "@/components/placeholder";
import type { Album } from "@/lib/types";

const THEMES = ["Tous", "Messes", "Fêtes", "Baptêmes", "Pèlerinages"];

export default function GalerieClient({ albums }: { albums: Album[] }) {
  const [theme, setTheme] = useState("Tous");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const liste = albums.filter((a) => theme === "Tous" || a.theme === theme);

  return (
    <section className="container-x py-12">
      <div className="mb-8 flex flex-wrap gap-2">
        {THEMES.map((t) => (
          <button key={t} onClick={() => setTheme(t)}
            className={`pill ${theme === t ? "bg-marial text-white" : "border border-bord-3 bg-carte text-encre"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {liste.map((a) => (
          <button key={a.id} onClick={() => setLightbox(a.titre)} className="card group relative overflow-hidden text-left">
            <Placeholder rounded="rounded-none" className="aspect-[4/3] w-full" />
            <div className="bg-gradient-to-t from-black/60 to-transparent p-3">
              <p className="font-display text-[16px] font-semibold text-white">{a.titre}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/80">Album</p>
            </div>
          </button>
        ))}
        {liste.length === 0 && <p className="col-span-full py-8 text-center text-attenue2">Aucun album pour ce thème.</p>}
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6" onClick={() => setLightbox(null)}>
          <div className="max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <Placeholder rounded="rounded-card" className="h-[60vh] w-full" />
            <div className="mt-4 flex items-center justify-between text-white">
              <p className="font-display text-[20px]">{lightbox}</p>
              <button onClick={() => setLightbox(null)} className="btn-or">Fermer</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
