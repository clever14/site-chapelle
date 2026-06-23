import AncresChapelle from "@/components/ancres-chapelle";
import Placeholder from "@/components/placeholder";
import { CLERGE, MOUVEMENTS, PILIERS_MISSION } from "@/lib/seed";

export default function LaChapellePage() {
  return (
    <>
      {/* Bandeau titre rayé + fil d'Ariane */}
      <section className="placeholder-rayed border-b border-bord-2">
        <div className="container-x py-16 text-center">
          <h1 className="font-display text-[44px] font-semibold text-marial md:text-[52px]">La Chapelle</h1>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-mono">
            Accueil <span className="text-or">›</span> La Chapelle
          </p>
        </div>
      </section>

      {/* Sous-onglets ancres */}
      <AncresChapelle />

      {/* HISTOIRE */}
      <section id="histoire" className="container-x scroll-mt-32 py-16">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <img
            src="/histoire-chapelle.jpeg"
            alt="Parvis de la Chapelle Sainte Jeanne d'Arc, statue de la Vierge Marie"
            className="h-80 w-full rounded-card border border-bord-2 object-cover"
          />
          <div>
            <p className="eyebrow mb-3">Notre histoire</p>
            <h2 className="mb-5 font-display text-[32px] font-semibold text-marial">
              Une présence née de la foi du quartier
            </h2>
            <p className="mb-4 text-[16px] leading-relaxed text-attenue">
              Fondée par les familles catholiques de Djibi Village, la Chapelle Sainte Jeanne d'Arc
              est devenue au fil des années un lieu de rassemblement, de prière et de service.
              D'une simple salle de prière, elle s'est agrandie grâce à la générosité des fidèles.
            </p>
            <p className="text-[16px] leading-relaxed text-attenue">
              Placée sous le patronage de Sainte Jeanne d'Arc, elle puise dans son exemple le
              courage de la foi et l'amour de la communauté.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section id="mission" className="scroll-mt-32 bg-panneau-2/40 py-16">
        <div className="container-x">
          <p className="eyebrow mb-2">Ce qui nous anime</p>
          <h2 className="mb-8 font-display text-[32px] font-semibold text-marial">Notre mission</h2>
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

      {/* CLERGÉ */}
      <section id="clerge" className="container-x scroll-mt-32 py-16">
        <p className="eyebrow mb-2">À votre service</p>
        <h2 className="mb-8 font-display text-[32px] font-semibold text-marial">Le clergé</h2>
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

      {/* MOUVEMENTS */}
      <section id="mouvements" className="scroll-mt-32 bg-panneau-2/40 py-16">
        <div className="container-x">
          <p className="eyebrow mb-2">Vivre sa foi ensemble</p>
          <h2 className="mb-6 font-display text-[32px] font-semibold text-marial">Mouvements & groupes</h2>
          <div className="flex flex-wrap gap-3">
            {MOUVEMENTS.map((m) => (
              <span key={m} className="pill border border-bord-3 bg-carte text-encre">{m}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SAINTE JEANNE D'ARC */}
      <section id="sainte-jeanne" className="scroll-mt-32 py-16">
        <div className="container-x">
          <div className="grid grid-cols-1 overflow-hidden rounded-card bg-marial text-white shadow-cardLg md:grid-cols-2">
            <img
              src="/sainte-jeanne.jpeg"
              alt="Sainte Jeanne d'Arc en armure"
              className="h-72 w-full object-cover object-top md:h-full"
            />
            <div className="p-8 md:p-10">
              <p className="eyebrow mb-3 text-or/90">Notre sainte patronne</p>
              <h2 className="mb-5 font-display text-[34px] font-semibold">Sainte Jeanne d'Arc</h2>
              <p className="mb-6 text-[15px] leading-relaxed text-white/85">
                Jeune fille de foi et de courage, Jeanne d'Arc demeure pour notre communauté
                un modèle de confiance en Dieu et de don de soi. Canonisée en 1920, elle est
                fêtée chaque année le 30 mai.
              </p>
              <p className="font-display text-[22px] italic text-or">
                « Les hommes d'armes batailleront, et Dieu donnera la victoire. »
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
