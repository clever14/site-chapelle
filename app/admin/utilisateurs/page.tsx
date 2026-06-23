import { getProfils } from "@/lib/queries";
import { changerRole } from "@/lib/actions";

const ROLES = [
  { val: "admin", label: "Administrateur" },
  { val: "editeur", label: "Éditeur" },
  { val: "moderateur", label: "Modérateur" },
];

export default async function AdminUtilisateurs() {
  const profils = await getProfils();
  return (
    <div>
      <h1 className="mb-2 font-display text-[30px] font-semibold text-marial">Utilisateurs</h1>
      <p className="mb-8 text-[14px] text-attenue2">
        Créez les comptes dans Supabase → Authentication → Users, puis ajustez le rôle ici.
      </p>

      <div className="card overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-bord-1 bg-panneau-1/50 font-mono text-[10px] uppercase tracking-[0.14em] text-mono">
              <th className="px-5 py-3">Membre</th>
              <th className="px-5 py-3">Rôle</th>
              <th className="px-5 py-3">État</th>
            </tr>
          </thead>
          <tbody>
            {profils.map((p) => (
              <tr key={p.id} className="border-b border-bord-1 last:border-0">
                <td className="px-5 py-3 font-semibold text-encre">{p.nom}</td>
                <td className="px-5 py-3">
                  <form action={changerRole} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={p.id} />
                    <select name="role" defaultValue={p.role} className="rounded-field border border-bord-2 bg-carte px-3 py-1.5 text-[13px] outline-none focus:border-or">
                      {ROLES.map((r) => <option key={r.val} value={r.val}>{r.label}</option>)}
                    </select>
                    <button className="rounded-field border border-bord-3 px-3 py-1.5 text-[12px] hover:border-or">OK</button>
                  </form>
                </td>
                <td className="px-5 py-3">
                  <span className="inline-flex items-center gap-2 text-[13px] text-attenue">
                    <span className={`h-2 w-2 rounded-full ${p.actif ? "bg-[#1faa54]" : "bg-bord-3"}`} />
                    {p.actif ? "Actif" : "Inactif"}
                  </span>
                </td>
              </tr>
            ))}
            {profils.length === 0 && (
              <tr><td colSpan={3} className="px-5 py-8 text-center text-attenue2">Aucun utilisateur.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
