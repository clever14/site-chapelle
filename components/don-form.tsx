"use client";

import { useState, useTransition } from "react";
import { enregistrerDon } from "@/lib/actions";

const MOTIFS = ["Quête & dîme", "Construction", "Solidarité"];
const MONTANTS = ["2 000", "5 000", "10 000", "Autre"];
const PAIEMENTS: { label: string; val: string }[] = [
  { label: "Mobile Money", val: "mobile_money" },
  { label: "Carte", val: "carte" },
  { label: "Virement", val: "virement" },
];

export default function DonForm() {
  const [motif, setMotif] = useState(MOTIFS[0]);
  const [montant, setMontant] = useState(MONTANTS[1]);
  const [paiement, setPaiement] = useState(PAIEMENTS[0].val);
  const [envoye, setEnvoye] = useState(false);
  const [pending, start] = useTransition();

  if (envoye) {
    return (
      <div className="card mx-auto max-w-2xl p-10 text-center">
        <span className="mb-3 block text-[40px]">🙏</span>
        <h2 className="mb-2 font-display text-[26px] font-semibold text-marial">Merci pour votre don</h2>
        <p className="text-[15px] text-attenue">Votre intention a bien été enregistrée. Que Dieu vous bénisse.</p>
      </div>
    );
  }

  return (
    <form
      action={(fd) => {
        fd.set("motif", motif);
        fd.set("montant", montant.replace(/\s/g, "").replace("Autre", "0"));
        fd.set("moyen", paiement);
        start(async () => { await enregistrerDon(fd); setEnvoye(true); });
      }}
      className="card mx-auto max-w-2xl p-7"
    >
      <h2 className="mb-6 font-display text-[26px] font-semibold text-marial">Votre don</h2>

      <label className="eyebrow mb-2 block">Motif</label>
      <div className="mb-6 flex flex-wrap gap-2">
        {MOTIFS.map((m) => (
          <button type="button" key={m} onClick={() => setMotif(m)}
            className={`pill ${motif === m ? "bg-marial text-white" : "border border-bord-3 bg-carte text-encre"}`}>{m}</button>
        ))}
      </div>

      <label className="eyebrow mb-2 block">Montant (FCFA)</label>
      <div className="mb-6 flex flex-wrap gap-2">
        {MONTANTS.map((m) => (
          <button type="button" key={m} onClick={() => setMontant(m)}
            className={`pill ${montant === m ? "bg-or text-marial-dark" : "border border-bord-3 bg-carte text-encre"}`}>{m}</button>
        ))}
      </div>

      <label className="eyebrow mb-2 block">Moyen de paiement</label>
      <div className="mb-4 flex flex-wrap gap-2">
        {PAIEMENTS.map((p) => (
          <button type="button" key={p.val} onClick={() => setPaiement(p.val)}
            className={`pill ${paiement === p.val ? "bg-marial text-white" : "border border-bord-3 bg-carte text-encre"}`}>{p.label}</button>
        ))}
      </div>
      {paiement === "mobile_money" && (
        <div className="mb-6 flex flex-wrap gap-2">
          {["Wave", "Orange", "MTN", "Moov"].map((o) => (
            <span key={o} className="pill border border-bord-3 bg-panneau-1 text-attenue">{o}</span>
          ))}
        </div>
      )}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input name="nom" placeholder="Nom (facultatif)" className="rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
        <input name="contact" placeholder="Téléphone ou email" className="rounded-field border border-bord-2 bg-carte px-4 py-2.5 outline-none focus:border-or" />
      </div>

      <button type="submit" disabled={pending} className="btn-or w-full disabled:opacity-60">
        {pending ? "Traitement…" : `Faire mon don de ${montant} FCFA · sécurisé`}
      </button>
      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-mono">
        Paiement chiffré · reçu automatique · don possible sans compte
      </p>
    </form>
  );
}
