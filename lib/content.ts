import { content } from "@/content";

/*
 * Lookups over content/site-content.json. Pages are generated statically at
 * build time, so editing the JSON and rebuilding updates the whole site.
 */

const { industries, startup } = content.solutions;
const allSolutions = [...industries, startup];
const publishedStories = content.stories.items.filter((s) => s.status !== "draft");

export const getIndustries = () => industries;
export const getSolutions = () => allSolutions;
export const getSolution = (slug: string) =>
  allSolutions.find((s) => s.slug === slug) ?? null;

export const getStories = () => publishedStories;
export const getStory = (slug: string) =>
  publishedStories.find((s) => s.slug === slug) ?? null;

export const getPosts = () => content.blog.posts;
export const getPost = (slug: string) =>
  content.blog.posts.find((p) => p.slug === slug) ?? null;

export const getJobs = () => content.careers.jobs;
export const getJob = (slug: string) =>
  content.careers.jobs.find((j) => j.slug === slug) ?? null;
