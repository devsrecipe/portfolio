import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/site/SectionHeading";
import { content } from "@/content";
import { getJobs } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const { page } = content.careers;

export const metadata: Metadata = buildMetadata({ ...page.seo, path: "/careers" });

export default function CareersPage() {
  return (
    <section className="container-x py-16">
      <SectionHeading
        as="h1"
        eyebrow={page.eyebrow}
        title={page.title}
        intro={page.intro}
      />
      <ul className="mt-12 max-w-3xl divide-y divide-border rounded-3xl border border-border bg-surface">
        {getJobs().map((job) => (
          <li key={job.slug}>
            <Link
              href={`/careers/${job.slug}`}
              className="flex items-center justify-between gap-4 p-6 hover:bg-surface-2"
            >
              <span>
                <span className="block text-lg font-semibold">{job.title}</span>
                <span className="block text-sm text-muted">
                  {job.location} · {job.type}
                </span>
              </span>
              <span aria-hidden>→</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
