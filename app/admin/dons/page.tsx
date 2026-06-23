import { getDons } from "@/lib/queries";

const STATUTS: Record<string, string> = {
  en_attente: "bg-panneau-1 text-[#8a6d22]",
  confirme: "bg-[#e3f0e6] text-[#1f7a44]",
  echoue: "bg-panneau-4 text-bordeaux",
};

export default async function AdminDons() {
  const dons = await getDons();
  const total = dons.filter((d) => d.statut === "confirme").reduce((s, d) => s + d.montant, 0);

  return (
    <div>
      <h1 className="mb-2 font-display text-[30px] font-semibold text-marial">Dons</h1>
      <p className="mb-8 text-[14px] text-attenue2">
        Total confirmé : <span className="font-semibold text-marial">{total.toLocaleString("fr-FR")} FCFA</span>
      </p>

      <div className="card overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-bord-1 bg-panneau-1/50 font-mono text-[10px] uppercase tracking-[0.14em] text-mono">
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Montant</th>
              <th className="px-5 py-3">Motif</th>
              <th className="px-5 py-3">Moyen</th>
              <th className="px-5 py-3">Statut</th>
            </tr>
          </thead>
          <tbody>
            {dons.map((d) => (
              <tr key={d.id} className="border-b border-bord-1 last:border-0">
                <td className="px-5 py-3 text-[13px] text-attenue">{new Date(d.cree_le).toLocaleDateString("fr-FR")}</td>
                <td className="px-5 py-3 font-semibold text-encre">{d.montant.toLocaleString("fr-FR")} F</td>
                <td className="px-5 py-3 text-[14px] text-attenue">{d.motif ?? "—"}</td>
                <td className="px-5 py-3 text-[14px] text-attenue">{d.moyen ?? "—"}</td>
                <td className="px-5 py-3">
                  <span className={`pill text-[11px] ${STATUTS[d.statut] ?? ""}`}>{d.statut}</span>
                </td>
              </tr>
            ))}
            {dons.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-8 text-center text-attenue2">Aucun don enregistré.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
