import type { Metadata } from "next";
import { content } from "@/content";
import type { FaqItem, Job, Post, Story } from "@/types";
import { absoluteUrl } from "./utils";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
};

/** Unique title, description, canonical and social tags for one page. */
export function buildMetadata({
  title,
  description,
  path,
  type = "website",
}: MetaInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type, siteName: content.site.name },
    twitter: { card: "summary_large_image", title, description },
  };
}

type Crumb = { name: string; path: string };

export function breadcrumbLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: content.site.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icon"),
    description: content.site.description,
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: content.site.name,
    url: absoluteUrl("/"),
  };
}

export function faqLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  };
}

export function articleLd(input: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    mainEntityOfPage: absoluteUrl(input.path),
    author: { "@type": "Organization", name: content.site.name },
    publisher: {
      "@type": "Organization",
      name: content.site.name,
      logo: absoluteUrl("/icon"),
    },
  };
}

export const postArticleLd = (post: Post) =>
  articleLd({
    headline: post.title,
    description: post.summary,
    path: `/blog/${post.slug}`,
    datePublished: post.dateIso,
  });

export const storyArticleLd = (story: Story) =>
  articleLd({
    headline: story.title,
    description: story.summary,
    path: `/success-stories/${story.slug}`,
    datePublished: story.publishedAt,
  });

export function jobPostingLd(job: Job) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: [job.about, ...job.responsibilities, ...job.requirements].join(" "),
    datePosted: job.postedIso,
    validThrough: job.openUntilIso,
    employmentType: job.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: content.site.name,
      sameAs: absoluteUrl("/"),
    },
    ...(job.remote
      ? {
          jobLocationType: "TELECOMMUTE",
          applicantLocationRequirements: { "@type": "Country", name: "[Country]" },
        }
      : { jobLocation: { "@type": "Place", address: job.location } }),
  };
}

export function serviceLd(input: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: { "@type": "Organization", name: content.site.name, url: absoluteUrl("/") },
  };
}
