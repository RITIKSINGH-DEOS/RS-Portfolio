import { DATA } from "@/data/resume";
import { getBlogPosts } from "@/data/blog";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogUrls: MetadataRoute.Sitemap = [];

  try {
    const posts = await getBlogPosts();
    blogUrls = posts.map((post) => ({
      url: `${DATA.url}/blog/${post.slug}`,
      lastModified: new Date(post.metadata?.publishedAt || new Date()).toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Error reading blog posts for sitemap:", error);
  }

  return [
    {
      url: DATA.url,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${DATA.url}/github`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.95,
    },
    {
      url: `${DATA.url}/linkedin`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.95,
    },
    {
      url: `${DATA.url}/book-a-call`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.95,
    },
    {
      url: `${DATA.url}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    ...blogUrls,
  ];
}
