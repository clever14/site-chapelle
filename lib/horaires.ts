// lib/horaires.ts
// Planning des messes + calcul dynamique de la "prochaine messe".
// 0 = Dimanche ... 6 = Samedi (convention JS Date.getDay()).

export type Creneau = { jour: number; heure: string; type?: string };

// Planning hebdomadaire des messes
export const MESSES: Creneau[] = [
  { jour: 0, heure: "07:00", type: "Messe dominicale" },
  { jour: 0, heure: "09:00", type: "Messe des familles" },
  { jour: 0, heure: "18:00", type: "Messe du soir" },
  { jour: 1, heure: "06:30", type: "Messe" },
  { jour: 2, heure: "06:30", type: "Messe" },
  { jour: 3, heure: "06:30", type: "Messe" },
  { jour: 4, heure: "06:30", type: "Messe" },
  { jour: 5, heure: "06:30", type: "Messe" },
  { jour: 6, heure: "18:00", type: "Messe anticipée" },
];

const JOURS = [
  "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi",
];

export type ProchaineMesse = {
  date: Date;
  heure: string;
  type?: string;
  libelleJour: string; // "Aujourd'hui" | "Demain" | "Mardi"...
  libelleComplet: string; // "Demain · 07h00"
  delta: string; // "dans 12 h environ"
};

function hhmm(heure: string) {
  const [h, m] = heure.split(":").map(Number);
  return { h, m };
}

/** Calcule la prochaine messe à partir d'un instant donné (par défaut: maintenant). */
export function prochaineMesse(from: Date = new Date()): ProchaineMesse {
  for (let offset = 0; offset < 8; offset++) {
    const jour = new Date(from);
    jour.setDate(from.getDate() + offset);
    const dow = jour.getDay();

    const creneauxDuJour = MESSES
      .filter((c) => c.jour === dow)
      .map((c) => {
        const { h, m } = hhmm(c.heure);
        const d = new Date(jour);
        d.setHours(h, m, 0, 0);
        return { ...c, date: d };
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    for (const c of creneauxDuJour) {
      if (c.date.getTime() > from.getTime()) {
        return formate(c.date, c.heure, c.type, from, offset, dow);
      }
    }
  }
  // Fallback (ne devrait pas arriver)
  const d = new Date(from);
  return formate(d, "07:00", "Messe", from, 0, d.getDay());
}

function formate(
  date: Date,
  heure: string,
  type: string | undefined,
  from: Date,
  offset: number,
  dow: number,
): ProchaineMesse {
  let libelleJour: string;
  if (offset === 0) libelleJour = "Aujourd'hui";
  else if (offset === 1) libelleJour = "Demain";
  else libelleJour = JOURS[dow];

  const heureFmt = heure.replace(":", "h");
  const libelleComplet = `${libelleJour} · ${heureFmt}`;

  const diffMs = date.getTime() - from.getTime();
  const diffH = Math.round(diffMs / (1000 * 60 * 60));
  let delta: string;
  if (diffH < 1) {
    const diffMin = Math.max(1, Math.round(diffMs / (1000 * 60)));
    delta = `dans ${diffMin} min environ`;
  } else if (diffH < 24) {
    delta = `dans ${diffH} h environ`;
  } else {
    const diffJ = Math.round(diffH / 24);
    delta = diffJ <= 1 ? "dans environ 1 jour" : `dans ${diffJ} jours environ`;
  }

  return { date, heure: heureFmt, type, libelleJour, libelleComplet, delta };
}

// Résumé court pour le bandeau d'accueil
export const RESUME_MESSES = [
  "Lun–Ven · 06h30",
  "Sam · 18h00",
  "Dim · 07h · 09h · 18h",
];

// Tableaux d'horaires détaillés (page Horaires)
export const HORAIRES_MESSES = [
  { jour: "Lundi", heure: "06h30", note: "Messe" },
  { jour: "Mardi", heure: "06h30", note: "Messe" },
  { jour: "Mercredi", heure: "06h30", note: "Messe" },
  { jour: "Jeudi", heure: "06h30", note: "Messe" },
  { jour: "Vendredi", heure: "06h30", note: "Messe" },
  { jour: "Samedi", heure: "18h00", note: "Messe anticipée du dimanche" },
  { jour: "Dimanche", heure: "07h00 · 09h00 · 18h00", note: "Messes dominicales", dimanche: true },
];

export const HORAIRES_CONFESSIONS = [
  { jour: "Mercredi", heure: "17h00 – 18h00", note: "Sur demande aussi" },
  { jour: "Samedi", heure: "16h30 – 17h45", note: "Avant la messe anticipée" },
];

export const HORAIRES_ADORATION = [
  { jour: "Jeudi", heure: "19h00 – 20h00", note: "Adoration du Saint-Sacrement" },
  { jour: "1er Vendredi", heure: "18h00 – 21h00", note: "Veillée d'adoration" },
];

export const HORAIRES_PERMANENCES = [
  { jour: "Mardi", heure: "09h00 – 12h00", note: "Secrétariat paroissial" },
  { jour: "Jeudi", heure: "15h00 – 18h00", note: "Accueil du curé (sur rendez-vous)" },
];

export const CHANGEMENTS_EXCEPTIONNELS = [
  "Dimanche 29 juin : messe unique à 09h00 (fête patronale).",
];
