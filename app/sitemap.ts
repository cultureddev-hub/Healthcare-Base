import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://samuihomeclinic.com";

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...getAllSlugs().map((slug) => ({
      url: `${base}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
