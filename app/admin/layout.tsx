import AdminSidebar from "@/components/admin-sidebar";
import { getTemoignages, usingSeed } from "@/lib/queries";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const temoignages = await getTemoignages({ adminAll: true });
  const enAttente = temoignages.filter((t) => t.statut === "en_attente").length;

  return (
    <div className="flex min-h-screen bg-creme">
      <AdminSidebar moderation={enAttente} />

      <div className="flex-1">
        {usingSeed() && (
          <div className="bg-or/20 px-6 py-2 text-center text-[13px] text-marial-dark">
            Mode démo — données d'exemple. Ajoutez vos variables Supabase pour activer l'enregistrement réel.
          </div>
        )}
        <div className="p-6 md:p-8">{children}</div>
      </div>
    </div>
  );
}
