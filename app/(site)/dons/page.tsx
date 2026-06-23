import PageBanner from "@/components/page-banner";
import DonForm from "@/components/don-form";

const MOTIFS = ["Quête & dîme", "Construction", "Solidarité"];

export default function DonsPage() {
  return (
    <>
      <PageBanner eyebrow="Participer à la vie de la chapelle" titre="Faire un don" />
      <section className="container-x py-12">
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {MOTIFS.map((m) => (
            <div key={m} className="card p-6">
              <h3 className="mb-2 font-display text-[20px] font-semibold text-bordeaux">{m}</h3>
              <p className="text-[14px] text-attenue">Soutenez la communauté selon votre intention.</p>
            </div>
          ))}
        </div>
        <DonForm />
      </section>
    </>
  );
}
