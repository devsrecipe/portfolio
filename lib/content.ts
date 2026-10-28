import { cacheLife, cacheTag } from "next/cache";
import { allSolutions, industries } from "@/content/industries";
import { jobs } from "@/content/jobs";
import { posts } from "@/content/posts";
import { stories } from "@/content/stories";

/*
 * Content accessors. Each is cached and tagged, so swapping the `content/`
 * files for a CMS or database later only changes the bodies of these functions,
 * and `revalidateTag("posts")` etc. refreshes pages on demand.
 */

export async function getIndustries() {
  "use cache";
  cacheLife("days");
  cacheTag("industries");
  return industries;
}

export async function getSolutions() {
  "use cache";
  cacheLife("days");
  cacheTag("industries");
  return allSolutions;
}

export async function getSolution(slug: string) {
  "use cache";
  cacheLife("days");
  cacheTag("industries");
  return allSolutions.find((s) => s.slug === slug) ?? null;
}

export async function getStories() {
  "use cache";
  cacheLife("hours");
  cacheTag("stories");
  return stories.filter((s) => s.status !== "draft");
}

export async function getStory(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("stories");
  return stories.find((s) => s.slug === slug && s.status !== "draft") ?? null;
}

export async function getPosts() {
  "use cache";
  cacheLife("hours");
  cacheTag("posts");
  return posts;
}

export async function getPost(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("posts");
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getJobs() {
  "use cache";
  cacheLife("hours");
  cacheTag("jobs");
  return jobs;
}

export async function getJob(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("jobs");
  return jobs.find((j) => j.slug === slug) ?? null;
}
