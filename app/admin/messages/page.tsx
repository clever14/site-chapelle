import { getMessages } from "@/lib/queries";
import { marquerMessageTraite, supprimerMessage } from "@/lib/actions";

export default async function AdminMessages() {
  const messages = await getMessages();
  const nouveaux = messages.filter((m) => !m.traite);
  const traites = messages.filter((m) => m.traite);

  function Carte({ m }: { m: (typeof messages)[number] }) {
    return (
      <div className={`card p-5 ${!m.traite ? "border-or" : ""}`}>
        <div className="mb-2 flex items-start justify-between gap-3">
          <div>
            <p className="font-body font-semibold text-encre">{m.nom}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-mono">
              {m.objet ?? "Message"} · {new Date(m.cree_le).toLocaleDateString("fr-FR")}
            </p>
          </div>
          {!m.traite && <span className="pill bg-or/20 text-[11px] text-marial-dark">Nouveau</span>}
        </div>
        <p className="mb-3 text-[14px] text-attenue">{m.message}</p>
        <div className="mb-4 flex flex-wrap gap-x-5 gap-y-1 text-[13px]">
          {m.email && <a href={`mailto:${m.email}`} className="text-marial hover:text-or">{m.email}</a>}
          {m.telephone && <a href={`tel:${m.telephone}`} className="text-marial hover:text-or">{m.telephone}</a>}
        </div>
        <div className="flex gap-2">
          {!m.traite && (
            <form action={marquerMessageTraite}>
              <input type="hidden" name="id" value={m.id} />
              <button className="btn bg-[#1faa54] px-4 py-2 text-[13px] text-white hover:bg-[#178f46]">Marquer traité</button>
            </form>
          )}
          <form action={supprimerMessage}>
            <input type="hidden" name="id" value={m.id} />
            <button className="btn-outline px-4 py-2 text-[13px] text-bordeaux">Supprimer</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-2 font-display text-[30px] font-semibold text-marial">Messages reçus</h1>
      <p className="mb-8 text-[14px] text-attenue2">Demandes envoyées depuis la page Contact</p>

      {nouveaux.length > 0 && (
        <>
          <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-bordeaux">
            Nouveaux ({nouveaux.length})
          </h2>
          <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {nouveaux.map((m) => <Carte key={m.id} m={m} />)}
          </div>
        </>
      )}

      <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-mono">Traités</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {traites.map((m) => <Carte key={m.id} m={m} />)}
        {traites.length === 0 && <p className="text-[14px] text-attenue2">Aucun message traité.</p>}
      </div>
    </div>
  );
}
