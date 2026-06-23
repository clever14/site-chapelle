"use client";

import { useState } from "react";
import type { Horaire, HoraireException } from "@/lib/types";

const ONGLETS: { cle: Horaire["type"]; label: string }[] = [
  { cle: "messe", label: "Messes" },
  { cle: "confession", label: "Confessions" },
  { cle: "adoration", label: "Adoration" },
  { cle: "permanence", label: "Permanences" },
];

function telechargerIcs() {
  const now = new Date();
  const dim = new Date(now);
  dim.setDate(now.getDate() + ((7 - now.getDay()) % 7 || 7));
  dim.setHours(9, 0, 0, 0);
  const fin = new Date(dim);
  fin.setHours(10, 0, 0, 0);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Chapelle Sainte Jeanne d'Arc//FR",
    "BEGIN:VEVENT", `UID:${Date.now()}@chapelle-jeannedarc.ci`, `DTSTAMP:${fmt(now)}`,
    `DTSTART:${fmt(dim)}`, `DTEND:${fmt(fin)}`,
    "SUMMARY:Messe dominicale - Chapelle Sainte Jeanne d'Arc",
    "LOCATION:Djibi Village, Abidjan", "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "messe-chapelle.ics";
  a.click();
  URL.revokeObjectURL(url);
}

export default function HorairesClient({
  horaires,
  exceptions,
}: {
  horaires: Horaire[];
  exceptions: HoraireException[];
}) {
  const [actif, setActif] = useState<Horaire["type"]>("messe");
  const lignes = horaires.filter((h) => h.type === actif).sort((a, b) => a.ordre - b.ordre);

  return (
    <section className="container-x py-12">
      <div className="mb-8 flex flex-wrap gap-1 border-b border-bord-2">
        {ONGLETS.map((o) => (
          <button
            key={o.cle}
            onClick={() => setActif(o.cle)}
            className={`relative px-4 py-3 font-body text-[15px] font-semibold transition-colors ${
              actif === o.cle ? "text-marial" : "text-attenue2 hover:text-marial"
            }`}
          >
            {o.label}
            {actif === o.cle && <span className="absolute -bottom-px left-0 h-[3px] w-full bg-or" />}
          </button>
        ))}
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-bord-1 bg-panneau-1/50">
              <th className="px-5 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-mono">Jour</th>
              <th className="px-5 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-mono">Heure</th>
              <th className="px-5 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-mono">Type · Note</th>
            </tr>
          </thead>
          <tbody>
            {lignes.map((l) => (
              <tr key={l.id} className={`border-b border-bord-1 last:border-0 ${l.est_dimanche ? "bg-panneau-3" : ""}`}>
                <td className={`px-5 py-4 font-body font-semibold ${l.est_dimanche ? "text-bordeaux" : "text-encre"}`}>{l.jour}</td>
                <td className={`px-5 py-4 ${l.est_dimanche ? "text-bordeaux" : "text-encre"}`}>{l.heure}</td>
                <td className="px-5 py-4 text-[14px] text-attenue">{l.note}</td>
              </tr>
            ))}
            {lignes.length === 0 && (
              <tr><td colSpan={3} className="px-5 py-8 text-center text-attenue2">Aucun horaire pour cette catégorie.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {actif === "messe" && (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button onClick={telechargerIcs} className="btn-or">+ Ajouter à mon calendrier</button>
          <button className="btn-outline">Recevoir les rappels</button>
        </div>
      )}

      {exceptions.length > 0 && (
        <div className="mt-10 rounded-card border-l-4 border-or bg-panneau-4 p-5">
          <p className="mb-2 font-body font-semibold text-bordeaux">⚠ Changements exceptionnels</p>
          <ul className="space-y-1 text-[14px] text-attenue">
            {exceptions.map((c) => <li key={c.id}>{c.texte}</li>)}
          </ul>
        </div>
      )}
    </section>
  );
}
