import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/site/SectionHeading";
import { content } from "@/content";
import { getPosts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const { page } = content.blog;

export const metadata: Metadata = buildMetadata({ ...page.seo, path: "/blog" });

export default function BlogPage() {
  return (
    <section className="container-x py-16">
      <SectionHeading
        as="h1"
        eyebrow={page.eyebrow}
        title={page.title}
        intro={page.intro}
      />
      <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {getPosts().map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="lift block h-full rounded-3xl border border-border bg-surface p-6"
            >
              <p className="text-xs font-medium text-muted">
                <span className="text-primary">{post.category}</span> · {post.date}
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
