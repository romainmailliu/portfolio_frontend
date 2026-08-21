import type { Metadata } from "next";

type OpenGraph = NonNullable<Metadata["openGraph"]>;

const defaultImages = [{ url: "/opengraph-image", width: 1200, height: 630 }];

/**
 * Un bloc `openGraph` déclaré au niveau d'une page **remplace entièrement**
 * celui hérité du layout racine : `type`, `locale`, `siteName` et l'image
 * générée par `src/app/opengraph-image.tsx` disparaissent silencieusement.
 *
 * Passer par ce helper plutôt que d'écrire l'objet à la main : les quatre
 * champs sont réinjectés à chaque fois.
 */
export function pageOpenGraph({
  title,
  description,
  url,
  images = defaultImages,
}: {
  title: string;
  description: string;
  url: string;
  images?: OpenGraph["images"];
}): OpenGraph {
  return {
    type: "website",
    locale: "fr_FR",
    siteName: "Romain Mailliu",
    title,
    description,
    url,
    images,
  };
}
