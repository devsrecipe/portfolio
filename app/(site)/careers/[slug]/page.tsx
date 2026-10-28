import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { ApplyForm } from "@/components/site/ApplyForm";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { content, formMessages } from "@/content";
import { getJob, getJobs } from "@/lib/content";
import { buildMetadata, jobPostingLd } from "@/lib/seo";
import { fill } from "@/lib/utils";

const { labels, page } = content.careers;

export function generateStaticParams() {
  return getJobs().map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/careers/[slug]">): Promise<Metadata> {
  const job = getJob((await params).slug);
  if (!job) return {};
  return buildMetadata({
    title: `${job.title}, ${job.type}`,
    description:
      `Apply for the ${job.title} role at ${content.site.name}. ${job.type}, ${job.location}.`.slice(
        0,
        160,
      ),
    path: `/careers/${job.slug}`,
  });
}

function BulletSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h2 className="text-2xl font-bold">{title}</h2>
      <ul className="mt-3 list-disc space-y-1.5 pl-6 text-muted marker:text-primary">
        {items.map((item, i) => (
          <li key={`${item}-${i}`}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default async function RolePage({ params }: PageProps<"/careers/[slug]">) {
  const job = getJob((await params).slug);
  if (!job) notFound();

  return (
    <>
      <JsonLd data={jobPostingLd(job)} />
      <div className="container-x py-12">
        <div className="flex items-center justify-between gap-4">
          <Breadcrumbs
            crumbs={[
              { name: "Home", path: "/" },
              { name: page.eyebrow, path: "/careers" },
              { name: job.title, path: `/careers/${job.slug}` },
            ]}
          />
          <Link href="/careers" className="text-sm font-semibold text-primary">
            {labels.back}
          </Link>
        </div>

        <div className="mt-10 grid items-start gap-12 lg:grid-cols-[1.2fr_1fr]">
          <article className="space-y-8">
            <header>
              <p className="eyebrow">{page.eyebrow}</p>
              <h1 className="mt-3 font-display text-6xl tracking-[-0.015em]">{job.title}</h1>
              <div className="mt-5 flex flex-wrap gap-2">
                <Badge>{job.location}</Badge>
                <Badge>{job.type}</Badge>
                <Badge>{job.level}</Badge>
                <Badge variant="success">
                  {fill(labels.openUntil, { date: job.openUntil })}
                </Badge>
              </div>
            </header>
            <section>
              <h2 className="text-2xl font-bold">{labels.about}</h2>
              <p className="mt-3 text-muted">{job.about}</p>
            </section>
            <BulletSection title={labels.responsibilities} items={job.responsibilities} />
            <BulletSection title={labels.requirements} items={job.requirements} />
            <BulletSection title={labels.offer} items={job.offer} />
          </article>

          <aside
            aria-label={content.forms.application.title}
            className="lg:sticky lg:top-28"
          >
            <ApplyForm
              job={job}
              config={content.forms.application}
              messages={formMessages}
              contactEmail={content.site.contact.email}
              privacyLabel={content.site.footer.privacyLabel}
            />
          </aside>
        </div>
      </div>
    </>
  );
}
