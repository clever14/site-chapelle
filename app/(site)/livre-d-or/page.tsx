import PageBanner from "@/components/page-banner";
import TemoignageForm from "@/components/temoignage-form";
import { getTemoignages } from "@/lib/queries";

export default async function LivreDOrPage() {
  const temoignages = await getTemoignages();
  return (
    <>
      <PageBanner eyebrow="Vos témoignages" titre="Livre d'or" sous="Publié après modération" />
      <section className="container-x py-12">
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {temoignages.map((t) => (
            <div key={t.id} className="card p-6">
              <span className="font-display text-[40px] leading-none text-or">&ldquo;</span>
              <p className="mb-4 text-[15px] italic text-attenue">{t.texte}</p>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-marial font-display font-bold text-white">
                  {t.nom.charAt(0)}
                </span>
                <span className="font-body font-semibold text-encre">{t.nom}</span>
              </div>
            </div>
          ))}
        </div>
        <TemoignageForm />
      </section>
    </>
  );
}
