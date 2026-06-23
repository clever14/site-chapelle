"use client";

import { useState } from "react";
import Placeholder from "@/components/placeholder";
import type { Actualite } from "@/lib/types";

const CATS = ["Toutes", "Vie paroissiale", "Annonces", "Caté", "Solidarité"];

export default function ActualitesClient({ items }: { items: Actualite[] }) {
  const [cat, setCat] = useState("Toutes");
  const [q, setQ] = useState("");

  const liste = items.filter(
    (a) =>
      (cat === "Toutes" || a.categorie === cat) &&
      (q === "" || a.titre.toLowerCase().includes(q.toLowerCase())),
  );
  const aLaUne = liste.find((a) => a.a_la_une);
  const autres = liste.filter((a) => a !== aLaUne);

  return (
    <section className="container-x py-12">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher une actualité…"
          className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 text-[15px] outline-none focus:border-or md:max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`pill ${cat === c ? "bg-marial text-white" : "border border-bord-3 bg-carte text-encre"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {aLaUne && (
        <article className="card mb-10 grid grid-cols-1 overflow-hidden md:grid-cols-2">
          <Placeholder label="À la une" rounded="rounded-none" className="h-60 w-full md:h-full" />
          <div className="p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mono">
              {aLaUne.publie_le} · {aLaUne.categorie}
            </p>
            <h2 className="my-3 font-display text-[28px] font-semibold text-marial">{aLaUne.titre}</h2>
            <p className="text-[15px] leading-relaxed text-attenue">{aLaUne.extrait}</p>
          </div>
        </article>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {autres.map((a) => (
          <article key={a.id} className="card overflow-hidden">
            <Placeholder rounded="rounded-none" className="h-40 w-full" />
            <div className="p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mono">
                {a.publie_le} · {a.categorie}
              </p>
              <h3 className="my-2 font-display text-[20px] font-semibold text-encre">{a.titre}</h3>
              <p className="text-[14px] text-attenue">{a.extrait}</p>
            </div>
          </article>
        ))}
      </div>

      {liste.length === 0 && (
        <p className="py-12 text-center text-attenue2">Aucune actualité ne correspond à votre recherche.</p>
      )}
    </section>
  );
}
