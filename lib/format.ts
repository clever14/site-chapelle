// lib/format.ts
const MOIS = ["JAN", "FÉV", "MAR", "AVR", "MAI", "JUIN", "JUIL", "AOÛ", "SEP", "OCT", "NOV", "DÉC"];
const MOIS_LONG = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

export function pastilleDate(iso: string) {
  const d = new Date(iso);
  return {
    jour: String(d.getDate()).padStart(2, "0"),
    mois: MOIS[d.getMonth()],
  };
}

export function dateLongue(iso: string) {
  const d = new Date(iso);
  return `${d.getDate()} ${MOIS_LONG[d.getMonth()]} ${d.getFullYear()}`;
}
