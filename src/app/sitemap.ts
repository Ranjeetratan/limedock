import type { MetadataRoute } from "next";
import { getEntrySlugs } from "@/lib/directories";
import { getPosts } from "@/lib/massblogger";
import { absoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/directories"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/law-firms"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/real-estate"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/privacy"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/terms"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/llms.txt"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: absoluteUrl("/llms-full.txt"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  const directoryRoutes: MetadataRoute.Sitemap = getEntrySlugs().map(
    (slug) => ({
      url: absoluteUrl(`/directories/${slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })
  );

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPosts();
    blogRoutes = posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.updatedAt
        ? new Date(post.updatedAt)
        : post.createdAt
          ? new Date(post.createdAt)
          : now,
      changeFrequency: "monthly" as const,
      priority: 0.55,
    }));
  } catch {
    blogRoutes = [];
  }

  return [...staticRoutes, ...directoryRoutes, ...blogRoutes];
}
