import type { MetadataRoute } from "next";
import { getJobs, getPosts, getSolutions, getStories } from "@/lib/content";
import { absoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [solutions, stories, posts, jobs] = await Promise.all([
    getSolutions(),
    getStories(),
    getPosts(),
    getJobs(),
  ]);

  const entry = (path: string, lastModified?: string): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(path),
    ...(lastModified ? { lastModified } : {}),
  });

  return [
    entry("/"),
    entry("/success-stories"),
    entry("/blog"),
    entry("/careers"),
    entry("/privacy"),
    ...solutions.map((s) => entry(`/solutions/${s.slug}`)),
    ...stories.map((s) => entry(`/success-stories/${s.slug}`, s.publishedAt)),
    ...posts.map((p) => entry(`/blog/${p.slug}`, p.dateIso)),
    ...jobs.map((j) => entry(`/careers/${j.slug}`, j.postedIso)),
  ];
}
