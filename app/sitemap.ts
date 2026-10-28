import type { MetadataRoute } from "next";
import { getJobs, getPosts, getSolutions, getStories } from "@/lib/content";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
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
    ...getSolutions().map((s) => entry(`/solutions/${s.slug}`)),
    ...getStories().map((s) => entry(`/success-stories/${s.slug}`, s.publishedAt)),
    ...getPosts().map((p) => entry(`/blog/${p.slug}`, p.dateIso)),
    ...getJobs().map((j) => entry(`/careers/${j.slug}`, j.postedIso)),
  ];
}
