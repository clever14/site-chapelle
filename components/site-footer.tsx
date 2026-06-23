import Link from "next/link";
import { RESUME_MESSES } from "@/lib/horaires";
import { CONTACT } from "@/lib/seed";

export default function SiteFooter() {
  return (
    <footer className="bg-marial-dark text-white/85">
      <div className="container-x grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Identité */}
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-or font-display font-bold text-or">
              JA
            </span>
            <span className="font-display text-[17px] font-semibold text-white">
              Sainte Jeanne d'Arc
            </span>
          </div>
          <p className="text-[14px] leading-relaxed text-white/70">
            {CONTACT.adresse}
            <br />
            {CONTACT.telephone}
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="eyebrow mb-4 text-or">Navigation</h4>
          <ul className="space-y-2 text-[14px]">
            {[
              ["/la-chapelle", "La Chapelle"],
              ["/horaires", "Horaires"],
              ["/actualites", "Actualités"],
              ["/evenements", "Événements"],
              ["/galerie", "Galerie"],
              ["/contact", "Contact"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="transition-colors hover:text-or">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Horaires */}
        <div>
          <h4 className="eyebrow mb-4 text-or">Horaires des messes</h4>
          <ul className="space-y-2 text-[14px] text-white/70">
            {RESUME_MESSES.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>

        {/* Rester en lien */}
        <div>
          <h4 className="eyebrow mb-4 text-or">Rester en lien</h4>
          <p className="mb-4 text-[14px] text-white/70">
            Suivez la vie de la communauté.
          </p>
          <div className="flex gap-2">
            {["f", "ig", "yt"].map((r) => (
              <span
                key={r}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 font-mono text-[12px] text-white/80"
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-[13px] text-white/60 sm:flex-row">
          <span>© {new Date().getFullYear()} Chapelle Sainte Jeanne d'Arc</span>
          <div className="flex gap-5">
            <Link href="/livre-d-or" className="hover:text-or">
              Livre d'or
            </Link>
            <Link href="/connexion" className="hover:text-or">
              Espace administration
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
