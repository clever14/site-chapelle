import PageBanner from "@/components/page-banner";
import GalerieClient from "@/components/galerie-client";
import { getAlbums } from "@/lib/queries";

export default async function GaleriePage() {
  const albums = await getAlbums();
  return (
    <>
      <PageBanner eyebrow="En images" titre="Galerie" />
      <GalerieClient albums={albums} />
    </>
  );
}
