import PageBanner from "@/components/page-banner";
import ContactForm from "@/components/contact-form";
import { CONTACT } from "@/lib/seed";

export default function ContactPage() {
  return (
    <>
      <PageBanner eyebrow="Nous écrire" titre="Contact" />
      <section className="container-x py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <ContactForm />
          <div className="space-y-4">
            <div className="card p-6">
              <p className="eyebrow mb-2">Adresse</p>
              <p className="text-[15px] text-attenue">{CONTACT.adresse}</p>
            </div>
            <div className="card p-6">
              <p className="eyebrow mb-2">Téléphone</p>
              <p className="mb-3 text-[15px] text-attenue">{CONTACT.telephone}</p>
              <div className="flex gap-3">
                <a href={`tel:${CONTACT.telephone}`} className="btn-outline">Appeler</a>
                <a href="#" className="btn flex-1 bg-[#1faa54] text-white hover:bg-[#178f46]">WhatsApp</a>
              </div>
            </div>
            <div className="card p-6">
              <p className="eyebrow mb-2">Email & réseaux</p>
              <p className="text-[15px] text-attenue">{CONTACT.email}</p>
            </div>
          </div>
        </div>
        <div className="card mt-10 overflow-hidden">
          <iframe
            title="Localisation de la Chapelle Sainte Jeanne d'Arc"
            src="https://www.google.com/maps?q=5.4601241,-3.9732605&z=16&output=embed"
            className="h-[340px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
