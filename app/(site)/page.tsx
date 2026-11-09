import type { Metadata } from "next";
import Link from "next/link";
import { HeroGlow } from "@/components/motion/HeroGlow";
import { HeroHeadline } from "@/components/motion/HeroHeadline";
import { Magnetic } from "@/components/motion/Magnetic";
// import { Marquee } from "@/components/motion/Marquee"; // Trusted by is hidden for now
import {
  Reveal,
  StaggerItem,
  StaggerList,
} from "@/components/motion/Reveal";
import { SceneBackdrop } from "@/components/motion/SceneBackdrop";
import { ScrubText } from "@/components/motion/ScrubText";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { CompareTable } from "@/components/site/CompareTable";
import { ContactForm } from "@/components/site/ContactForm";
import { FitPuzzle } from "@/components/site/FitPuzzle";
import { IndustryIndex } from "@/components/site/IndustryIndex";
import { IndustryShowcase } from "@/components/site/IndustryShowcase";
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
        <section aria-labelledby="hero-title" className="container-x pb-20 pt-14 lg:pb-28 lg:pt-20">
          {/* Editorial hero: one full-width statement, then the pitch and the calls to action. */}
          <Reveal>
            <p className="eyebrow">{hero.eyebrow}</p>
          </Reveal>
          <HeroHeadline
            id="hero-title"
            parts={[
              { text: hero.headline.before },
              { text: hero.headline.highlight, highlight: true },
              { text: hero.headline.after },
            ]}
          />
          <Reveal
            delay={0.7}
            className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-10 border-t border-border pt-10 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16"
          >
            <p className="max-w-xl text-lg leading-relaxed text-muted lg:text-xl">{hero.intro}</p>
            <div className="lg:text-right">
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Magnetic>
                  <ButtonLink href={hero.primaryCta.href} size="lg" arrow>
                    {hero.primaryCta.label}
                  </ButtonLink>
                </Magnetic>
                <Magnetic>
                  <ButtonLink href={hero.secondaryCta.href} variant="secondary" size="lg">
                    {hero.secondaryCta.label}
                  </ButtonLink>
                </Magnetic>
              </div>
              <p className="mt-5 flex items-center gap-2 text-sm text-muted lg:justify-end">
                <span aria-hidden className="size-1.5 rounded-full bg-success" />
                {hero.note}
              </p>
            </div>
          </Reveal>
        </section>
      </div>

      {/* Trusted by: hidden until real client logos are added. To restore, uncomment
          this block and the Marquee import at the top.
      <section aria-label={home.trustedBy.label} className="border-y border-border">
        <div className="container-x flex items-center gap-6 py-7">
          <p className="shrink-0 text-sm font-semibold">{home.trustedBy.label}</p>
          <Marquee items={home.trustedBy.items} />
        </div>
      </section>
      */}

      {/* One business at a time: problems and fixes, told by scrolling */}
      <section aria-labelledby="showcase-title" className="pt-24 lg:pt-32">
        <div className="container-x">
          <SectionHeading
            id="showcase-title"
            eyebrow={home.showcase.eyebrow}
            title={home.showcase.title}
            intro={home.showcase.intro}
          />
        </div>
        <div className="mt-12 lg:mt-4">
          <IndustryShowcase data={home.showcase} />
        </div>
      </section>

      {/* Team fit */}
      <section aria-labelledby="fit-title" className="container-x overflow-x-clip py-24 lg:py-32">
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
        <div className="mt-16 lg:mt-20">
          <IndustryIndex industries={getIndustries()} />
        </div>
        <Reveal className="mt-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">{home.industries.startup.eyebrow}</p>
            <p className="mt-4 max-w-2xl font-display text-3xl font-bold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
              {home.industries.startup.text}
            </p>
          </div>
          <ButtonLink href={home.industries.startup.cta.href} variant="inverse" size="lg" arrow>
            {home.industries.startup.cta.label}
          </ButtonLink>
        </Reveal>
      </section>

      {/* Process (Scroll-Driven Pinned Journey Map) */}
      <section
        id="process"
        aria-labelledby="process-title"
        className="theme-dark relative isolate scroll-mt-20 bg-ground"
      >
        <ProcessMap data={home.process} />
      </section>

      {/* Success stories */}
      <section
        id="stories"
        aria-labelledby="stories-title"
        className="container-x relative isolate overflow-hidden py-24 lg:py-32"
      >
        <SceneBackdrop
          scene="key"
          className="right-(--gutter) top-16 w-[280px] max-lg:hidden sm:w-[320px] lg:top-20"
        />
        <SectionHeading
          id="stories-title"
          eyebrow={home.stories.eyebrow}
          title={home.stories.title}
          intro={home.stories.intro}
          scrubIntro
        />
        <Reveal className="mt-10 flex flex-wrap items-baseline justify-between gap-4 font-mono text-xs uppercase tracking-[0.12em] text-muted">
          <p>
            <span className="text-success">{fill(home.stories.completedLabel, { count: completed })}</span>
            <span aria-hidden className="mx-3">/</span>
            <span className="text-accent">{fill(home.stories.inProgressLabel, { count: inProgress })}</span>
          </p>
          <Link href={home.stories.allLink.href} className="link-underline text-ink">
            {home.stories.allLink.label} →
          </Link>
        </Reveal>
        <StaggerList className="mt-12 grid gap-x-10 gap-y-14 md:grid-cols-3" stagger={0.12}>
          {featured.map((story, i) => (
            <StaggerItem key={story.slug}>
              <StoryCard story={story} index={i} />
            </StaggerItem>
          ))}
        </StaggerList>

        {/* Pull quote: the words light up as it scrolls through. */}
        <figure className="mt-28 grid gap-10 border-t border-border pt-14 lg:mt-36 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-16">
          <Reveal>
            <span aria-hidden className="block font-display text-[7rem] font-bold leading-[0.7] text-primary">
              “
            </span>
          </Reveal>
          <div>
            <blockquote>
              <ScrubText
                text={home.stories.quote.text}
                className="font-display text-[clamp(1.6rem,2.8vw,2.75rem)] font-semibold leading-[1.2] tracking-[-0.025em] text-ink"
              />
            </blockquote>
            <figcaption className="mt-10 flex flex-wrap items-end justify-between gap-6">
              <p>
                <span className="block font-semibold">{home.stories.quote.name}</span>
                <span className="mt-1 block text-sm text-muted">{home.stories.quote.role}</span>
              </p>
              <Link
                href="/success-stories/dudu-car-electric-taxi-booking-app"
                className="link-underline text-sm font-semibold text-primary"
              >
                Read the DUDU Car case study →
              </Link>
            </figcaption>
          </div>
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
            intro={home.compare.intro}
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
        <StaggerList className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-3" stagger={0.12}>
          {home.team.members.map((member, i) => {
            const [roleTitle, roleDesc] = member.role.split(" · ");
            return (
              <StaggerItem key={`${member.name}-${i}`} className="group relative pt-7">
                <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-border" />
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-700 ease-(--ease-out) group-hover:scale-x-100"
                />
                <p className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-6 font-display text-[clamp(1.6rem,2.4vw,2.25rem)] font-bold leading-[1.08] tracking-[-0.03em]">
                  {member.name}
                </h3>
                <p className="mt-3 text-sm font-semibold text-primary">{roleTitle}</p>
                {roleDesc ? <p className="mt-1.5 text-[0.95rem] text-muted">{roleDesc}</p> : null}
              </StaggerItem>
            );
          })}
        </StaggerList>
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
                      className="group block h-full border-t border-border pt-5"
                    >
                      <p className="text-xs font-medium text-muted">
                        <span className="text-primary">{post.category}</span> · {post.date}
                      </p>
                      <h3 className="mt-3 text-lg font-semibold leading-snug transition-colors duration-500 group-hover:text-primary">{post.title}</h3>
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
          <SplitHeading
            id="faq-title"
            className="mb-10 font-display text-[clamp(2.25rem,4.6vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.035em]"
          >
            {home.faq.title}
          </SplitHeading>
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
              <SplitHeading
                id="contact-title"
                className="font-display text-[clamp(2.75rem,5vw,5rem)] font-bold leading-[1] tracking-[-0.04em]"
              >
                {home.contact.title}
              </SplitHeading>
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
