"use client";

import { useEffect, useState } from "react";

const ANCRES = [
  { id: "histoire", label: "Histoire" },
  { id: "mission", label: "Mission" },
  { id: "clerge", label: "Clergé" },
  { id: "mouvements", label: "Mouvements" },
  { id: "sainte-jeanne", label: "Sainte Jeanne d'Arc" },
];

export default function AncresChapelle() {
  const [actif, setActif] = useState("histoire");

  useEffect(() => {
    const sections = ANCRES.map((a) => document.getElementById(a.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActif(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="sticky top-[68px] z-20 border-b border-bord-1 bg-creme/95 backdrop-blur">
      <div className="container-x flex gap-2 overflow-x-auto py-4">
        {ANCRES.map((a) => (
          <a
            key={a.id}
            href={`#${a.id}`}
            className={`pill shrink-0 whitespace-nowrap ${
              actif === a.id
                ? "bg-marial text-white"
                : "border border-bord-3 bg-carte text-encre hover:border-or"
            }`}
          >
            {a.label}
          </a>
        ))}
      </div>
    </div>
  );
}
