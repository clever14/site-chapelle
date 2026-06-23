import PageBanner from "@/components/page-banner";
import Placeholder from "@/components/placeholder";
import { CLERGE, MOUVEMENTS, PILIERS_MISSION } from "@/lib/seed";

export default function LaChapellePage() {
  return (
    <>
      <PageBanner eyebrow="Notre identité" titre="La Chapelle" sous="Histoire, mission et communauté" />

      <section id="histoire" className="container-x py-16">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="mb-4 font-display text-[30px] font-semibold text-marial">Histoire</h2>
            <p className="text-[16px] leading-relaxed text-attenue">
              Fondée pour servir les fidèles de Djibi Village, la Chapelle Sainte Jeanne d'Arc
              est devenue un lieu de prière, de rencontre et de solidarité au fil des années.
            </p>
          </div>
          <Placeholder label="Photo · histoire de la chapelle" className="h-72 w-full" />
        </div>
      </section>

      <section id="mission" className="bg-panneau-2/40 py-16">
        <div className="container-x">
          <h2 className="mb-8 font-display text-[30px] font-semibold text-marial">Notre mission</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {PILIERS_MISSION.map((p) => (
              <div key={p.titre} className="card p-6">
                <h3 className="mb-2 font-display text-[22px] font-semibold text-bordeaux">{p.titre}</h3>
                <p className="text-[15px] text-attenue">{p.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="clerge" className="container-x py-16">
        <h2 className="mb-8 font-display text-[30px] font-semibold text-marial">Le clergé</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {CLERGE.map((m) => (
            <div key={m.id} className="card flex flex-col items-center p-6 text-center">
              <Placeholder rounded="rounded-full" className="mb-4 h-24 w-24" />
              <h3 className="font-display text-[19px] font-semibold text-encre">{m.nom}</h3>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-mono">{m.fonction}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="mouvements" className="container-x pb-16">
        <h2 className="mb-6 font-display text-[30px] font-semibold text-marial">Mouvements & groupes</h2>
        <div className="flex flex-wrap gap-3">
          {MOUVEMENTS.map((m) => (
            <span key={m} className="pill border border-bord-3 bg-carte text-encre">{m}</span>
          ))}
        </div>
      </section>

      <section id="sainte-jeanne" className="bg-marial py-20 text-center text-white">
        <div className="container-x">
          <p className="eyebrow mb-4 text-or/90">Notre sainte patronne</p>
          <h2 className="mb-6 font-display text-[34px] font-semibold">Sainte Jeanne d'Arc</h2>
          <p className="mx-auto max-w-2xl font-display text-[24px] italic text-or">
            « Les hommes d'armes batailleront et Dieu donnera la victoire. »
          </p>
        </div>
      </section>
    </>
  );
}
