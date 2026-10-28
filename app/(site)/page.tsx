import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { AutomationDemo } from "@/components/site/AutomationDemo";
import { CompareTable } from "@/components/site/CompareTable";
import { ContactForm } from "@/components/site/ContactForm";
import { IndustryCard } from "@/components/site/IndustryCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { StoryCard } from "@/components/site/StoryCard";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Placeholder } from "@/components/ui/Placeholder";
import { automationScenarios } from "@/content/automation";
import { faq } from "@/content/faq";
import {
  budgetRanges,
  businessTypes,
  processSteps,
  site,
  trustedBy,
} from "@/content/site";
import { storyClientQuote } from "@/content/stories";
import { team } from "@/content/team";
import { getIndustries, getJobs, getPosts, getStories } from "@/lib/content";
import { buildMetadata, faqLd, organizationLd, websiteLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Software that cuts costs and automates operations",
  description:
    "We build ordering, booking and operations software for shops, restaurants, clinics, schools and startups. Talk to the engineers who build it.",
  path: "/",
});

export default async function HomePage() {
  const [industries, stories, posts, jobs] = await Promise.all([
    getIndustries(),
    getStories(),
    getPosts(),
    getJobs(),
  ]);
  const completed = stories.filter((s) => s.status === "completed").length;
  const inProgress = stories.filter((s) => s.status === "in-progress").length;
  const shown = [
    stories.find((s) => s.slug === "diagnostic-center-paper-reports-to-online-delivery"),
    stories.find((s) => s.slug === "school-management-system"),
    stories.find((s) => s.slug === "clinic-appointment-app"),
  ].filter((s) => s !== undefined);

  return (
    <>
      <JsonLd data={[organizationLd(), websiteLd(), faqLd(faq)]} />

      {/* Hero */}
      <section
        aria-labelledby="hero-title"
        className="container-x grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24"
      >
        <div>
          <p className="eyebrow anim-rise">
            Software and automation for growing businesses
          </p>
          <h1
            id="hero-title"
            className="anim-rise [--d:.1s] mt-6 text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl"
          >
            We help businesses cut costs and{" "}
            <span className="underline-draw text-primary">automate</span> their
            operations, so they move faster.
          </h1>
          <p className="anim-rise [--d:.2s] mt-8 max-w-xl text-lg text-muted">
            Still doing by hand what software could do for you? We build the systems that
            take orders, book appointments and keep records straight, for shops,
            restaurants, clinics, schools and more.
          </p>
          <div className="anim-rise mt-8 flex flex-wrap gap-3 [--d:.3s]">
            <ButtonLink href="/#contact" size="lg">
              Book a 30 minute call
            </ButtonLink>
            <ButtonLink href="/success-stories" variant="secondary" size="lg">
              See our work
            </ButtonLink>
          </div>
          <p className="mt-5 text-sm text-muted">{site.replyNote}</p>
        </div>
        <div className="anim-rise [--d:.25s]">
          <AutomationDemo scenarios={automationScenarios} />
        </div>
      </section>

      {/* Trusted by */}
      <section aria-label="Trusted by" className="border-y border-border">
        <div className="container-x flex flex-wrap items-center gap-4 py-7">
          <p className="mr-4 text-sm font-semibold">Trusted by</p>
          {trustedBy.map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="rounded-lg border border-dashed border-border px-4 py-2.5 text-sm text-muted"
            >
              {label}
            </span>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section
        id="solutions"
        aria-labelledby="industries-title"
        className="container-x scroll-mt-24 py-24"
      >
        <SectionHeading
          id="industries-title"
          eyebrow="Industries we serve"
          title="Different industries. The same problems underneath."
          intro="Manual work, scattered data and slow processes cost every business money. We build the systems that remove them, whether you sell products, book appointments or run a school."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => (
            <li key={industry.slug}>
              <IndustryCard industry={industry} />
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-6 rounded-3xl border border-border bg-surface p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow">For startups</p>
            <p className="mt-2 max-w-xl text-2xl font-bold leading-snug">
              Launching something new? We build first versions that real users can pay
              for.
            </p>
          </div>
          <ButtonLink href="/solutions/startup-mvp" variant="inverse" size="lg">
            Talk about your MVP
          </ButtonLink>
        </div>
      </section>

      {/* Process */}
      <section
        id="process"
        aria-labelledby="process-title"
        className="scroll-mt-24 bg-surface py-24"
      >
        <div className="container-x">
          <SectionHeading
            id="process-title"
            eyebrow="How we work"
            title="Our recipe, in four steps."
          />
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {processSteps.map((step, i) => (
              <li key={step.name} className={i === 3 ? "md:col-span-3" : undefined}>
                <Card className="lift reveal h-full bg-ground p-6">
                  <p className="font-mono text-xs uppercase text-primary">{step.step}</p>
                  <h3 className="mt-3 text-xl font-semibold">{step.name}</h3>
                  <p className="mt-2 text-muted">{step.text}</p>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Success stories */}
      <section aria-labelledby="stories-title" className="container-x py-24">
        <SectionHeading
          id="stories-title"
          eyebrow="Success stories"
          title="Problems we solved, and what changed."
          intro="Finished projects show real results. Projects still being built show exactly where they stand today."
        />
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Badge variant="success" className="px-4 py-1.5 text-sm">
            [{completed}] completed
          </Badge>
          <Badge variant="warning" className="px-4 py-1.5 text-sm">
            [{inProgress}] in progress right now
          </Badge>
          <Link
            href="/success-stories"
            className="ml-auto text-sm font-semibold text-primary hover:text-primary-hover"
          >
            All success stories →
          </Link>
        </div>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {shown.map((story, i) => (
            <li key={story.slug}>
              <StoryCard story={story} index={i} />
            </li>
          ))}
        </ul>
        <figure className="mt-8 rounded-3xl border border-border bg-surface p-8">
          <blockquote className="text-2xl">“{storyClientQuote.text}”</blockquote>
          <figcaption className="mt-5 flex items-center gap-4">
            <span aria-hidden className="size-11 rounded-full bg-surface-2" />
            <span>
              <span className="block font-semibold">{storyClientQuote.name}</span>
              <span className="block text-sm text-muted">{storyClientQuote.role}</span>
            </span>
          </figcaption>
        </figure>
      </section>

      {/* Compare */}
      <section
        aria-labelledby="compare-title"
        className="border-y border-border bg-surface py-24"
      >
        <div className="container-x">
          <SectionHeading
            id="compare-title"
            eyebrow="Why Devs Recipe"
            title="Compare before you choose."
          />
          <div className="mt-12">
            <CompareTable />
          </div>
        </div>
      </section>

      {/* Team */}
      <section aria-labelledby="team-title" className="container-x py-24">
        <SectionHeading
          id="team-title"
          eyebrow="The people"
          title="Real engineers, real names."
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {team.map((member, i) => (
            <li key={`${member.name}-${i}`} className="reveal">
              <Placeholder
                label={member.photoLabel}
                className="aspect-[4/5] rounded-3xl"
              />
              <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
              <p className="mt-1 text-sm text-muted">{member.role}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Blog + roles */}
      <section aria-label="Blog and open roles" className="bg-surface py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-3xl font-bold tracking-tight">From the blog</h2>
              <Link
                href="/blog"
                className="text-sm font-semibold text-primary hover:text-primary-hover"
              >
                All posts →
              </Link>
            </div>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2">
              {posts.slice(0, 2).map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="lift block h-full rounded-3xl border border-border bg-ground p-6"
                  >
                    <p className="text-xs text-muted">
                      [{post.category}] · [{post.date}]
                    </p>
                    <h3 className="mt-3 text-lg font-semibold">{post.title}</h3>
                    <p className="mt-2 text-sm text-muted">{post.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-3xl font-bold tracking-tight">Open roles</h2>
              <Link
                href="/careers"
                className="text-sm font-semibold text-primary hover:text-primary-hover"
              >
                Careers →
              </Link>
            </div>
            <ul className="mt-6 divide-y divide-border rounded-3xl border border-border bg-ground">
              {jobs.slice(0, 2).map((job) => (
                <li key={job.slug}>
                  <Link
                    href={`/careers/${job.slug}`}
                    className="flex items-center justify-between gap-4 p-5 hover:bg-surface-2"
                  >
                    <span>
                      <span className="block font-semibold">{job.title}</span>
                      <span className="block text-sm text-muted">
                        {job.location} · {job.type}
                      </span>
                    </span>
                    <span aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="container-x py-24">
        <div className="mx-auto max-w-3xl">
          <h2 id="faq-title" className="mb-8 text-4xl font-bold tracking-tight">
            Questions buyers ask us
          </h2>
          <Accordion items={faq} />
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        aria-labelledby="contact-title"
        className="scroll-mt-20 bg-primary py-20 text-ground"
      >
        <div className="container-x grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2
              id="contact-title"
              className="text-5xl font-bold leading-[1.02] tracking-tight"
            >
              Tell us what you want to sell or book.
            </h2>
            <p className="mt-6 text-lg">
              You will hear back from a founder, not a sales team.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <span aria-hidden className="size-14 rounded-full bg-ground/25" />
              <p>
                <span className="block font-semibold">{site.founder.name}</span>
                <span className="block text-sm">{site.founder.role}</span>
              </p>
            </div>
            <Link
              href={site.calendarUrl}
              className="mt-8 inline-flex h-12 items-center rounded-full border border-ground px-6 font-semibold hover:bg-ground hover:text-ink"
            >
              Or pick a time on our calendar
            </Link>
          </div>
          <ContactForm businessTypes={businessTypes} budgetRanges={budgetRanges} />
        </div>
      </section>
    </>
  );
}
