"use client";

import { useState, useTransition } from "react";
import { envoyerMessage } from "@/lib/actions";

export default function ContactForm() {
  const [envoye, setEnvoye] = useState(false);
  const [pending, start] = useTransition();

  if (envoye) {
    return (
      <div className="card flex h-full flex-col items-center justify-center p-10 text-center">
        <span className="mb-3 text-[40px]">✓</span>
        <h2 className="mb-2 font-display text-[24px] font-semibold text-marial">Message envoyé</h2>
        <p className="text-[15px] text-attenue">Merci, nous vous répondrons dès que possible.</p>
      </div>
    );
  }

  return (
    <form
      action={(fd) => start(async () => { await envoyerMessage(fd); setEnvoye(true); })}
      className="card p-7"
    >
      <h2 className="mb-6 font-display text-[24px] font-semibold text-marial">Envoyer un message</h2>
      <div className="space-y-4">
        <input name="nom" required placeholder="Nom" className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
        <input name="email" type="email" placeholder="Email" className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
        <input name="telephone" placeholder="Téléphone" className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
        <select name="objet" className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or">
          <option value="">Objet du message</option>
          <option>Demande de sacrement</option>
          <option>Intention de messe</option>
          <option>Autre</option>
        </select>
        <textarea name="message" required placeholder="Message" rows={5} className="w-full rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
        <button type="submit" disabled={pending} className="btn-marial w-full disabled:opacity-60">
          {pending ? "Envoi…" : "Envoyer"}
        </button>
      </div>
    </form>
  );
}
