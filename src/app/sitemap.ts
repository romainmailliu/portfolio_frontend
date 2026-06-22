import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-06-22");

  return [
    {
      url: "https://www.romainmailliu.com/",
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://www.romainmailliu.com/contact",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.romainmailliu.com/production-documentaire",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
