import PageBanner from "@/components/page-banner";
import HorairesClient from "@/components/horaires-client";
import { getHoraires, getExceptions } from "@/lib/queries";

export default async function HorairesPage() {
  const [horaires, exceptions] = await Promise.all([getHoraires(), getExceptions()]);
  return (
    <>
      <PageBanner
        eyebrow="Vie liturgique"
        titre="Horaires"
        sous="Mis à jour régulièrement par l'administration de la chapelle."
      />
      <HorairesClient horaires={horaires} exceptions={exceptions} />
    </>
  );
}
