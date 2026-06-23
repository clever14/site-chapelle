import PageBanner from "@/components/page-banner";
import ActualitesClient from "@/components/actualites-client";
import { getActualites } from "@/lib/queries";

export default async function ActualitesPage() {
  const items = await getActualites();
  return (
    <>
      <PageBanner eyebrow="Vie de la communauté" titre="Actualités" />
      <ActualitesClient items={items} />
    </>
  );
}
