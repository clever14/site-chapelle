"use client";

import { useEffect, useState } from "react";
import { prochaineMesse, RESUME_MESSES, type ProchaineMesse } from "@/lib/horaires";

export default function ProchaineMesseBanner() {
  const [pm, setPm] = useState<ProchaineMesse | null>(null);

  useEffect(() => {
    setPm(prochaineMesse());
    const id = setInterval(() => setPm(prochaineMesse()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-marial text-white">
      <div className="container-x flex flex-col gap-6 py-7 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-or text-or">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </div>
          <div>
            <p className="eyebrow text-or/90">Prochaine messe</p>
            <p className="font-display text-[26px] font-semibold leading-tight">
              {pm ? pm.libelleComplet : "Chargement…"}
            </p>
            {pm && <p className="text-[14px] text-white/70">{pm.delta}</p>}
          </div>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {RESUME_MESSES.map((l) => (
            <li key={l} className="flex items-center gap-2 text-[14px] text-white/85">
              <span className="h-1.5 w-1.5 rounded-full bg-or" />
              {l}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
