import type { Metadata } from "next";
import Link from "next/link";
import { HeroGlow } from "@/components/motion/HeroGlow";
import { HeroHeadline } from "@/components/motion/HeroHeadline";
import { Magnetic } from "@/components/motion/Magnetic";
import { Marquee } from "@/components/motion/Marquee";
import { Parallax } from "@/components/motion/Parallax";
import {
  Reveal,
  StaggerItem,
  StaggerList,
  StaggerOrderedList,
} from "@/components/motion/Reveal";
import { SceneBackdrop } from "@/components/motion/SceneBackdrop";
import { ScrubLine } from "@/components/motion/ScrubLine";
import { Spotlight } from "@/components/motion/Spotlight";
import { TiltCard } from "@/components/motion/TiltCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { AutomationDemo } from "@/components/site/AutomationDemo";
import { CompareTable } from "@/components/site/CompareTable";
import { ContactForm } from "@/components/site/ContactForm";
import { FitPuzzle } from "@/components/site/FitPuzzle";
import { IndustryCard } from "@/components/site/IndustryCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { StoryCard } from "@/components/site/StoryCard";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Placeholder } from "@/components/ui/Placeholder";
import { content, formMessages } from "@/content";
import { getIndustries, getJobs, getPosts, getStories } from "@/lib/content";
import { buildMetadata, faqLd, organizationLd, websiteLd } from "@/lib/seo";
import { fill } from "@/lib/utils";

const { home, site, forms } = content;

export const metadata: Metadata = buildMetadata({ ...home.seo, path: "/" });

const textLink = "text-sm font-semibold text-primary hover:text-primary-hover";

export default function HomePage() {
  const stories = getStories();
  const completed = stories.filter((s) => s.status === "completed").length;
  const inProgress = stories.filter((s) => s.status === "in-progress").length;
  const featured = home.stories.featured
    .map((slug) => stories.find((s) => s.slug === slug))
    .filter((s) => s !== undefined);
  const { hero } = home;

  return (
    <>
      <JsonLd data={[organizationLd(), websiteLd(), faqLd(home.faq.items)]} />

      {/* Hero */}
      <div className="relative">
        <HeroGlow />
        <section
          aria-labelledby="hero-title"
          className="container-x grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-28"
        >
          <div>
            <p className="eyebrow">{hero.eyebrow}</p>
            <HeroHeadline
              id="hero-title"
              parts={[
                { text: hero.headline.before },
                { text: hero.headline.highlight, highlight: true },
                { text: hero.headline.after },
              ]}
            />
            <Reveal delay={0.5}>
              <p className="mt-8 max-w-xl text-lg text-muted">{hero.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Magnetic>
                  <ButtonLink href={hero.primaryCta.href} size="lg">
                    {hero.primaryCta.label}
                  </ButtonLink>
                </Magnetic>
                <Magnetic>
                  <ButtonLink href={hero.secondaryCta.href} variant="secondary" size="lg">
                    {hero.secondaryCta.label}
                  </ButtonLink>
                </Magnetic>
              </div>
              <p className="mt-5 text-sm text-muted">{hero.note}</p>
            </Reveal>
          </div>
          <Reveal delay={0.35}>
            <AutomationDemo data={home.automation} />
          </Reveal>
        </section>
      </div>

      {/* Trusted by */}
      <section aria-label={home.trustedBy.label} className="border-y border-border">
        <div className="container-x flex items-center gap-6 py-7">
          <p className="shrink-0 text-sm font-semibold">{home.trustedBy.label}</p>
          <Marquee items={home.trustedBy.items} />
        </div>
      </section>

      {/* Team fit */}
      <section aria-labelledby="fit-title" className="container-x py-24 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <SectionHeading
            id="fit-title"
            eyebrow={home.fit.eyebrow}
            title={home.fit.title}
            intro={home.fit.intro}
          />
          <FitPuzzle data={home.fit} />
        </div>
      </section>

      {/* Industries */}
      <section
        id="solutions"
        aria-labelledby="industries-title"
        className="container-x scroll-mt-24 py-24 lg:py-32"
      >
        <SectionHeading
          id="industries-title"
          eyebrow={home.industries.eyebrow}
          title={home.industries.title}
          intro={home.industries.intro}
          scrubIntro
        />
        <Spotlight>
          <StaggerList
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.07}
          >
            {getIndustries().map((industry) => (
              <StaggerItem key={industry.slug}>
                <IndustryCard industry={industry} />
              </StaggerItem>
            ))}
          </StaggerList>
        </Spotlight>
        <div className="mt-6 flex flex-col gap-6 rounded-3xl border border-border bg-surface p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow">{home.industries.startup.eyebrow}</p>
            <p className="mt-2 max-w-xl text-2xl font-bold leading-snug">
              {home.industries.startup.text}
            </p>
          </div>
          <ButtonLink href={home.industries.startup.cta.href} variant="inverse" size="lg">
            {home.industries.startup.cta.label}
          </ButtonLink>
        </div>
      </section>

      {/* Process */}
      <section
        id="process"
        aria-labelledby="process-title"
        className="theme-dark relative isolate scroll-mt-24 overflow-hidden bg-ground py-24 lg:py-32"
      >
        <div className="container-x relative">
          <SceneBackdrop scene="relay" className="right-6 -top-6 w-[320px]" />
          <SectionHeading
            id="process-title"
            eyebrow={home.process.eyebrow}
            title={home.process.title}
          />
          <div className="mt-10">
            <ScrubLine />
          </div>
          <StaggerOrderedList className="mt-8 grid gap-5 md:grid-cols-3">
            {home.process.steps.map((step, i, steps) => (
              <StaggerItem
                key={step.name}
                className={
                  i === steps.length - 1 && steps.length % 3 === 1
                    ? "md:col-span-3"
                    : undefined
                }
              >
                <Card className="lift h-full bg-ground p-6">
                  <p className="font-mono text-xs uppercase text-primary">{step.step}</p>
                  <h3 className="mt-3 text-xl font-semibold">{step.name}</h3>
                  <p className="mt-2 text-muted">{step.text}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerOrderedList>
        </div>
      </section>

      {/* Success stories */}
      <section aria-labelledby="stories-title" className="container-x relative isolate py-24 lg:py-32">
        <SceneBackdrop scene="key" className="right-6 top-10 w-[320px]" />
        <SectionHeading
          id="stories-title"
          eyebrow={home.stories.eyebrow}
          title={home.stories.title}
          intro={home.stories.intro}
          scrubIntro
        />
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Badge variant="success" className="px-4 py-1.5 text-sm">
            {fill(home.stories.completedLabel, { count: completed })}
          </Badge>
          <Badge variant="warning" className="px-4 py-1.5 text-sm">
            {fill(home.stories.inProgressLabel, { count: inProgress })}
          </Badge>
          <Link href={home.stories.allLink.href} className={`ml-auto ${textLink}`}>
            {home.stories.allLink.label} →
          </Link>
        </div>
        <StaggerList className="mt-8 grid gap-6 md:grid-cols-3" stagger={0.12}>
          {featured.map((story, i) => (
            <StaggerItem key={story.slug}>
              <TiltCard>
                <StoryCard story={story} index={i} />
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerList>
        <figure className="mt-8 rounded-3xl border border-border bg-surface p-8">
          <blockquote className="font-display text-3xl italic leading-snug sm:text-4xl">“{home.stories.quote.text}”</blockquote>
          <figcaption className="mt-5 flex items-center gap-4">
            <span aria-hidden className="size-11 rounded-full bg-surface-2" />
            <span>
              <span className="block font-semibold">{home.stories.quote.name}</span>
              <span className="block text-sm text-muted">{home.stories.quote.role}</span>
            </span>
          </figcaption>
        </figure>
      </section>

      {/* Compare */}
      <section
        aria-labelledby="compare-title"
        className="border-y border-border bg-surface py-24 lg:py-32"
      >
        <div className="container-x">
          <SectionHeading
            id="compare-title"
            eyebrow={home.compare.eyebrow}
            title={home.compare.title}
          />
          <div className="mt-12">
            <CompareTable />
          </div>
        </div>
      </section>

      {/* Team — hidden for now
      <section aria-labelledby="team-title" className="container-x py-24 lg:py-32">
        <SectionHeading
          id="team-title"
          eyebrow={home.team.eyebrow}
          title={home.team.title}
        />
        <StaggerList className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.12}>
          {home.team.members.map((member, i) => (
            <StaggerItem key={`${member.name}-${i}`}>
              <Parallax className="aspect-4/5 rounded-3xl">
                <Placeholder label={member.photoLabel} className="h-full" />
              </Parallax>
              <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
              <p className="mt-1 text-sm text-muted">{member.role}</p>
            </StaggerItem>
          ))}
        </StaggerList>
      </section>
      */}

      {/* Blog + roles */}
      <section
        aria-label={`${home.blog.title} · ${home.roles.title}`}
        className="bg-surface py-20"
      >
        <div className="container-x grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-display text-4xl tracking-[-0.015em]">{home.blog.title}</h2>
              <Link href={home.blog.allLink.href} className={textLink}>
                {home.blog.allLink.label} →
              </Link>
            </div>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2">
              {getPosts()
                .slice(0, home.blog.count)
                .map((post) => (
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
              <h2 className="font-display text-4xl tracking-[-0.015em]">{home.roles.title}</h2>
              <Link href={home.roles.allLink.href} className={textLink}>
                {home.roles.allLink.label} →
              </Link>
            </div>
            <ul className="mt-6 divide-y divide-border rounded-3xl border border-border bg-ground">
              {getJobs()
                .slice(0, home.roles.count)
                .map((job) => (
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
      <section aria-labelledby="faq-title" className="container-x py-24 lg:py-32">
        <div className="mx-auto max-w-3xl">
          <h2 id="faq-title" className="mb-8 font-display text-5xl tracking-[-0.015em]">
            {home.faq.title}
          </h2>
          <Accordion items={home.faq.items} />
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        aria-labelledby="contact-title"
        className="theme-dark relative isolate scroll-mt-20 overflow-hidden bg-ground py-24 lg:py-32"
      >
        <div className="container-x relative grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
          <SceneBackdrop scene="plug" className="-bottom-24 left-6 w-[340px] lg:-bottom-32" />
          <div>
            <h2
              id="contact-title"
              className="font-display text-6xl leading-[1.02] tracking-[-0.015em]"
            >
              {home.contact.title}
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted">{home.contact.text}</p>
            <div className="mt-8 flex items-center gap-4">
              <span aria-hidden className="size-14 rounded-full bg-surface-2" />
              <p>
                <span className="block font-semibold">{site.founder.name}</span>
                <span className="block text-sm text-muted">{site.founder.role}</span>
              </p>
            </div>
            <Link
              href={home.contact.calendar.href}
              className="mt-8 inline-flex h-12 items-center rounded-full border border-ink-border px-6 font-semibold hover:bg-surface-2"
            >
              {home.contact.calendar.label}
            </Link>
          </div>
          <ContactForm
            config={forms.contact}
            messages={formMessages}
            contactEmail={site.contact.email}
          />
        </div>
      </section>
    </>
  );
}
