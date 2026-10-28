import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/site/SectionHeading";
import { getJobs } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Careers",
  description:
    "Open roles at Devs Recipe. Join a small team of engineers and designers who build software for real businesses.",
  path: "/careers",
});

export default async function CareersPage() {
  const jobs = await getJobs();
  return (
    <section className="container-x py-16">
      <SectionHeading
        as="h1"
        eyebrow="Careers"
        title="Open roles"
        intro="Join a small team of engineers and designers who build software for real businesses."
      />
      <ul className="mt-12 max-w-3xl divide-y divide-border rounded-3xl border border-border bg-surface">
        {jobs.map((job) => (
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
