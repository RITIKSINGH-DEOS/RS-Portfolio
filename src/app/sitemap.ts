import { DATA } from "@/data/resume";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: DATA.url,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${DATA.url}/github`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${DATA.url}/linkedin`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${DATA.url}/book-a-call`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${DATA.url}/talk-with-ai`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.80,
    },
  ];
}
