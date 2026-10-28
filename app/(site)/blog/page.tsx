import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/site/SectionHeading";
import { getPosts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Plain answers to the questions buyers ask before they commission software: costs, timelines and what to check first.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <section className="container-x py-16">
      <SectionHeading
        as="h1"
        eyebrow="Blog"
        title="From the blog"
        intro="Plain answers to the questions buyers ask before they commission software."
      />
      <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="block h-full rounded-3xl border border-border bg-surface p-6 hover:border-primary"
            >
              <p className="text-xs text-muted">
                [{post.category}] · [{post.date}]
              </p>
              <h2 className="mt-3 text-xl font-semibold">{post.title}</h2>
              <p className="mt-2 text-sm text-muted">{post.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
