export default function PageBanner({
  eyebrow,
  titre,
  sous,
}: {
  eyebrow: string;
  titre: string;
  sous?: string;
}) {
  return (
    <section className="bg-marial text-white">
      <div className="container-x py-12">
        <p className="eyebrow mb-3 text-or/90">{eyebrow}</p>
        <h1 className="font-display text-[40px] font-semibold md:text-[46px]">{titre}</h1>
        {sous && <p className="mt-2 text-[14px] text-white/70">{sous}</p>}
      </div>
    </section>
  );
}
