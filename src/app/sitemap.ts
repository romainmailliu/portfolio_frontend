import { MetadataRoute } from "next";
import { getProfileSlugs } from "../data/offre-content";

const BASE_URL = "https://www.romainmailliu.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-04");

  const profilePages: MetadataRoute.Sitemap = getProfileSlugs().map(
    (slug) => ({
      url: `${BASE_URL}/offre/${slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  return [
    {
      url: `${BASE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...profilePages,
    {
      url: `${BASE_URL}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/production-documentaire`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
