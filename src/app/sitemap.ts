import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.romainmailliu.com/",
      lastModified: new Date("2026-04-30"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://www.romainmailliu.com/production-documentaire",
      lastModified: new Date("2026-04-30"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.romainmailliu.com/offre-tech-ia",
      lastModified: new Date("2026-04-30"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
