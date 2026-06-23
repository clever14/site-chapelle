"use client";

import { useState, useTransition } from "react";
import { envoyerTemoignage } from "@/lib/actions";

export default function TemoignageForm() {
  const [envoye, setEnvoye] = useState(false);
  const [pending, start] = useTransition();

  return (
    <div className="card mx-auto max-w-xl p-7">
      <h2 className="mb-5 font-display text-[24px] font-semibold text-marial">Laisser un témoignage</h2>
      {envoye ? (
        <p className="rounded-field bg-panneau-3 p-4 text-center text-[15px] text-bordeaux">
          Merci ! Votre témoignage sera publié après modération.
        </p>
      ) : (
        <form
          action={(fd) => start(async () => { await envoyerTemoignage(fd); setEnvoye(true); })}
          className="space-y-4"
        >
          <input name="nom" required placeholder="Nom" className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
          <input name="email" type="email" placeholder="Email (non publié)" className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
          <textarea name="texte" required placeholder="Votre message" rows={4} className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
          <button type="submit" disabled={pending} className="btn-or w-full disabled:opacity-60">
            {pending ? "Envoi…" : "Envoyer mon témoignage"}
          </button>
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.12em] text-mono">Publié après modération</p>
        </form>
      )}
    </div>
  );
}
