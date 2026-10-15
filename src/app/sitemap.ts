import { DATA } from "@/data/resume";
import { PROJECT_CASE_STUDIES } from "@/data/project-case-studies";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries: MetadataRoute.Sitemap = Object.keys(PROJECT_CASE_STUDIES).map((slug) => ({
    url: `${DATA.url}/projects/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    {
      url: DATA.url,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...projectEntries,
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
