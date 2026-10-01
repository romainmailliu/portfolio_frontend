import { MetadataRoute } from "next";
import { getProfileSlugs } from "../data/offre-content";

const BASE_URL = "https://www.romainmailliu.com";

/**
 * Date de dernière modification réelle de chaque page, à mettre à jour quand
 * son contenu change. Google ignore un `lastModified` identique partout, et
 * ne lit ni `changeFrequency` ni `priority`.
 */
const LAST_MODIFIED = {
  home: "2026-10-01",
  siteVitrine: "2026-10-01",
  offre: "2026-09-30",
  contact: "2026-10-01",
  productionDocumentaire: "2026-08-21",
  legal: "2026-09-30",
  associations: "2026-10-01",
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const profilePages: MetadataRoute.Sitemap = getProfileSlugs().map((slug) => ({
    url: `${BASE_URL}/offre/${slug}`,
    lastModified: LAST_MODIFIED.offre,
  }));

  return [
    { url: `${BASE_URL}/`, lastModified: LAST_MODIFIED.home },
    {
      url: `${BASE_URL}/site-vitrine`,
      lastModified: LAST_MODIFIED.siteVitrine,
    },
    ...profilePages,
    {
      url: `${BASE_URL}/associations`,
      lastModified: LAST_MODIFIED.associations,
    },
    { url: `${BASE_URL}/contact`, lastModified: LAST_MODIFIED.contact },
    {
      url: `${BASE_URL}/production-documentaire`,
      lastModified: LAST_MODIFIED.productionDocumentaire,
    },
    { url: `${BASE_URL}/mentions-legales`, lastModified: LAST_MODIFIED.legal },
    {
      url: `${BASE_URL}/politique-de-confidentialite`,
      lastModified: LAST_MODIFIED.legal,
    },
  ];
}
