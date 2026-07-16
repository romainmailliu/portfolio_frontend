import { MetadataRoute } from "next";
import { getProfileSlugs } from "../data/offre-v2-content";

const BASE_URL = "https://www.romainmailliu.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-16");

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
    {
      url: `${BASE_URL}/offre`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
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
