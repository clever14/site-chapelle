"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { seDeconnecter } from "@/lib/actions";

const LIENS = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/actualites", label: "Actualités" },
  { href: "/admin/evenements", label: "Événements" },
  { href: "/admin/galerie", label: "Galerie" },
  { href: "/admin/horaires", label: "Horaires" },
  { href: "/admin/clerge", label: "Clergé" },
  { href: "/admin/conseil", label: "Conseil paroissial" },
  { href: "/admin/mouvements", label: "Mouvements" },
  { href: "/admin/livre-d-or", label: "Livre d'or", badgeKey: "moderation" },
  { href: "/admin/dons", label: "Dons" },
  { href: "/admin/utilisateurs", label: "Utilisateurs" },
];

export default function AdminSidebar({ moderation = 0 }: { moderation?: number }) {
  const pathname = usePathname();
  const actif = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <aside className="flex w-[230px] shrink-0 flex-col bg-marial-dark text-white">
      <div className="flex items-center gap-3 px-6 py-5">
        <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-or">
          <img src="/logo-jeanne.png" alt="Sainte Jeanne d'Arc" className="h-full w-full object-cover" />
        </span>
        <span className="font-display text-[16px] font-semibold">Administration</span>
      </div>

      <nav className="flex-1 px-3 py-2">
        {LIENS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`mb-1 flex items-center justify-between rounded-field px-3 py-2.5 text-[14px] transition-colors ${
              actif(l.href) ? "bg-white/10 text-or" : "text-white/80 hover:bg-white/5"
            }`}
          >
            {l.label}
            {l.badgeKey === "moderation" && moderation > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-bordeaux px-1.5 text-[11px] font-bold text-white">
                {moderation}
              </span>
            )}
          </Link>
        ))}
      </nav>

      <div className="space-y-1 border-t border-white/10 px-3 py-4">
        <Link href="/" className="block rounded-field px-3 py-2 text-[13px] text-white/70 hover:bg-white/5">
          ← Voir le site
        </Link>
        <form action={seDeconnecter}>
          <button type="submit" className="w-full rounded-field px-3 py-2 text-left text-[13px] text-bordeaux hover:bg-white/5">
            Se déconnecter
          </button>
        </form>
      </div>
    </aside>
  );
}
