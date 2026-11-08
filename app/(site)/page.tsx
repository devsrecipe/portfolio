import type { Metadata } from "next";
import Link from "next/link";
import { HeroGlow } from "@/components/motion/HeroGlow";
import { HeroHeadline } from "@/components/motion/HeroHeadline";
import { Magnetic } from "@/components/motion/Magnetic";
import { Marquee } from "@/components/motion/Marquee";
import {
  Reveal,
  StaggerItem,
  StaggerList,
} from "@/components/motion/Reveal";
import { SceneBackdrop } from "@/components/motion/SceneBackdrop";
import { Spotlight } from "@/components/motion/Spotlight";
import { TiltCard } from "@/components/motion/TiltCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { AutomationDemo } from "@/components/site/AutomationDemo";
import { CompareTable } from "@/components/site/CompareTable";
import { ContactForm } from "@/components/site/ContactForm";
import { FitPuzzle } from "@/components/site/FitPuzzle";
import { IndustryCard } from "@/components/site/IndustryCard";
import { ProcessMap } from "@/components/site/ProcessMap";
import { SectionHeading } from "@/components/site/SectionHeading";
import { StoryCard } from "@/components/site/StoryCard";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
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

      {/* Process (Scroll-Driven Pinned Journey Map) */}
      <section
        id="process"
        aria-labelledby="process-title"
        className="theme-dark relative isolate scroll-mt-20 bg-ground"
      >
        <ProcessMap
          steps={home.process.steps}
          eyebrow={home.process.eyebrow}
          title={home.process.title}
          intro="An architectural project roadmap from day one. You always know exactly what station your software is at, what gets tested on Friday, and when it goes live."
        />
      </section>

      {/* Success stories */}
      <section
        id="stories"
        aria-labelledby="stories-title"
        className="container-x relative isolate overflow-hidden py-24 lg:py-32"
      >
        <SceneBackdrop
          scene="key"
          className="right-6 top-16 w-[280px] sm:w-[320px] lg:top-20 lg:right-12"
        />
        <SectionHeading
          id="stories-title"
          eyebrow={home.stories.eyebrow}
          title={home.stories.title}
          intro={home.stories.intro}
          scrubIntro
        />
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success-soft px-4 py-1.5 text-sm font-semibold text-success shadow-sm">
              <span className="size-2 rounded-full bg-success" />
              <span>{fill(home.stories.completedLabel, { count: completed })}</span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-4 py-1.5 text-sm font-semibold text-accent shadow-sm">
              <span className="size-2 rounded-full bg-accent animate-pulse" />
              <span>{fill(home.stories.inProgressLabel, { count: inProgress })}</span>
            </span>
          </div>
          <Link
            href={home.stories.allLink.href}
            className="group ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover"
          >
            <span>{home.stories.allLink.label}</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
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
        <figure className="relative mt-10 overflow-hidden rounded-3xl border border-border/80 bg-surface/90 p-8 sm:p-10 shadow-lg backdrop-blur-sm">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 size-60 rounded-full bg-primary/10 blur-3xl"
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1 text-accent" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, idx) => (
                <svg
                  key={idx}
                  className="size-5 fill-current"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 font-mono text-xs font-semibold text-ink">5.0 / 5.0</span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 font-mono text-xs font-medium text-primary">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              Verified Client · Electric Mobility App
            </span>
          </div>

          <blockquote className="mt-6 font-display text-2xl sm:text-3xl lg:text-4xl italic leading-snug tracking-tight text-ink">
            “{home.stories.quote.text}”
          </blockquote>

          <figcaption className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-border/60 pt-6">
            <div className="flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-primary-soft font-mono text-sm font-bold text-primary shadow-sm">
                DC
              </div>
              <div>
                <span className="block text-base font-bold text-ink">
                  {home.stories.quote.name}
                </span>
                <span className="block text-sm text-muted">
                  {home.stories.quote.role}
                </span>
              </div>
            </div>
            <Link
              href="/success-stories/dudu-car-electric-taxi-booking-app"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover"
            >
              <span>Explore DUDU Car case study</span>
              <span>→</span>
            </Link>
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

      {/* Team */}
      <section aria-labelledby="team-title" className="container-x py-24 lg:py-32">
        <SectionHeading
          id="team-title"
          eyebrow={home.team.eyebrow}
          title={home.team.title}
          intro="Talk and work directly with the founders and engineers who architect your software. No account managers, no telephone game."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {home.team.members.map((member, i) => {
            const initials = member.name
              .split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map((n) => n[0])
              .join("");
            const [roleTitle, roleDesc] = member.role.split(" · ");

            return (
              <div
                key={`${member.name}-${i}`}
                className="group lift spotlight-card relative flex flex-col justify-between rounded-3xl border border-border/80 bg-surface/90 p-7 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex size-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary-soft font-mono text-lg font-bold text-primary shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-ground">
                      {initials}
                    </div>
                    <span className="rounded-full border border-border/60 bg-surface-2/80 px-2.5 py-1 font-mono text-[11px] font-semibold text-muted">
                      Dhaka, BD · GMT+6
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold tracking-tight text-ink group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-primary">
                    {roleTitle}
                  </p>
                  {roleDesc ? (
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">
                      {roleDesc}
                    </p>
                  ) : null}
                </div>

                <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted">
                  <span className="inline-flex items-center gap-1.5 text-accent font-medium">
                    <span className="size-1.5 rounded-full bg-accent" />
                    Core Leadership
                  </span>
                  <span className="font-mono text-[11px]">Devs Recipe</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Blog + roles */}
      <section
        aria-label={`${home.blog.title} · ${home.roles.title}`}
        className="bg-surface py-20"
      >
        <div className="container-x grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.02em]">{home.blog.title}</h2>
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
                      <p className="text-xs font-medium text-muted">
                        <span className="text-primary">{post.category}</span> · {post.date}
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
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.02em]">{home.roles.title}</h2>
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
          <h2 id="faq-title" className="mb-8 font-display text-4xl sm:text-5xl font-bold tracking-[-0.02em]">
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
          <div className="flex flex-col justify-between h-full">
            <div>
              <h2
                id="contact-title"
                className="font-display text-5xl sm:text-6xl font-bold leading-[1.04] tracking-[-0.025em]"
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

            <div className="mt-16 w-56 sm:w-64 opacity-50">
              <SceneBackdrop scene="plug" className="relative w-full" />
            </div>
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
