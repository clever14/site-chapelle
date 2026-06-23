"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/la-chapelle", label: "La Chapelle" },
  { href: "/horaires", label: "Horaires" },
  { href: "/actualites", label: "Actualités" },
  { href: "/evenements", label: "Événements" },
  { href: "/galerie", label: "Galerie" },
  { href: "/contact", label: "Contact" },
];

function Medaillon() {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-or bg-marial-dark">
      <img src="/logo-jeanne.png" alt="Sainte Jeanne d'Arc" className="h-full w-full object-cover" />
    </span>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 bg-marial text-white shadow-card">
      <div className="container-x flex h-[68px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Medaillon />
          <span className="font-display text-[19px] font-semibold leading-tight">
            <span className="hidden sm:inline">Chapelle Sainte Jeanne d'Arc</span>
            <span className="sm:hidden">Ste Jeanne d'Arc</span>
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative font-body text-[15px] transition-colors hover:text-or ${
                isActive(item.href) ? "text-or" : "text-white/90"
              }`}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute -bottom-1.5 left-0 h-[2px] w-full bg-or" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/dons" className="hidden btn-or sm:inline-flex">
            Soutenir
          </Link>

          {/* Hamburger mobile */}
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-field lg:hidden"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-[18px] w-[22px]">
              <span
                className={`absolute left-0 h-[2px] w-full bg-white transition-all ${
                  open ? "top-2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-2 h-[2px] w-full bg-white transition-opacity ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-[2px] w-full bg-white transition-all ${
                  open ? "top-2 -rotate-45" : "top-4"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Panneau mobile */}
      {open && (
        <div className="border-t border-white/10 bg-marial-dark lg:hidden">
          <nav className="container-x flex flex-col py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`border-b border-white/5 py-3 font-body text-[16px] ${
                  isActive(item.href) ? "text-or" : "text-white/90"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/dons"
              onClick={() => setOpen(false)}
              className="btn-or mt-4 mb-2"
            >
              Soutenir
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
