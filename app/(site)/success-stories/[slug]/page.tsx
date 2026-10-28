import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Placeholder } from "@/components/ui/Placeholder";
import { content } from "@/content";
import { getStories, getStory } from "@/lib/content";
import { buildMetadata, storyArticleLd } from "@/lib/seo";

const t = content.stories.labels;

export function generateStaticParams() {
  return getStories().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/success-stories/[slug]">): Promise<Metadata> {
  const story = getStory((await params).slug);
  if (!story) return {};
  return buildMetadata({
    title: `${story.client} case study: ${story.industry}`.slice(0, 60),
    description: story.summary.slice(0, 160),
    path: `/success-stories/${story.slug}`,
    type: "article",
  });
}

export default async function StoryPage({
  params,
}: PageProps<"/success-stories/[slug]">) {
  const story = getStory((await params).slug);
  if (!story) notFound();

  const stories = getStories();
  const next =
    stories[(stories.findIndex((s) => s.slug === story.slug) + 1) % stories.length];
  const path = `/success-stories/${story.slug}`;
  const done = story.status === "completed";
  const meta = [
    [t.timeline, story.timeline],
    [t.team, story.team],
    [t.platforms, story.platforms],
    [t.liveSince, story.liveSince],
  ];

  return (
    <>
      <JsonLd data={storyArticleLd(story)} />
      <article>
        <header className="container-x pb-12 pt-10">
          <Breadcrumbs
            crumbs={[
              { name: "Home", path: "/" },
              { name: content.stories.page.eyebrow, path: "/success-stories" },
              { name: story.title, path },
            ]}
          />
          <Link
            href="/success-stories"
            className="mt-8 inline-block text-sm font-semibold text-primary"
          >
            {t.back}
          </Link>
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge>[{story.industry}]</Badge>
            <Badge>{story.country}</Badge>
            <Badge variant={done ? "success" : "warning"}>
              {done ? t.completed : t.inProgress}
            </Badge>
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            {story.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">{story.summary}</p>
          <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-6 md:grid-cols-4">
            {meta.map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs text-muted">{label}</dt>
                <dd className="mt-1 font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="container-x">
          <Placeholder
            label={story.heroLabel}
            tone="primary"
            className="h-80 rounded-3xl sm:h-[28rem]"
          />
        </div>

        <section aria-labelledby="results-title" className="container-x py-16">
          <h2 id="results-title" className="eyebrow">
            {t.results}
          </h2>
          <ul className="mt-5 grid gap-4 md:grid-cols-3">
            {story.results.map((r, i) => (
              <li key={`${r.value}-${i}`}>
                <Card className="h-full p-6">
                  <p className="text-4xl font-bold text-primary sm:text-5xl">{r.value}</p>
                  <p className="mt-3 text-sm text-muted">{r.label}</p>
                </Card>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-surface py-16">
          <div className="container-x space-y-16">
            <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
              <div>
                <p className="font-mono text-xs text-primary">01</p>
                <h2 className="mt-2 text-3xl font-bold">{t.problemTitle}</h2>
              </div>
              <div>
                <p className="text-lg">{story.problem}</p>
                <blockquote className="mt-5 rounded-2xl bg-ground p-5 text-lg">
                  “{story.problemQuote}”
                </blockquote>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
              <div>
                <p className="font-mono text-xs text-primary">02</p>
                <h2 className="mt-2 text-3xl font-bold">{t.builtTitle}</h2>
              </div>
              <ul className="grid gap-4 sm:grid-cols-3">
                {story.features.map((f, i) => (
                  <li key={`${f.name}-${i}`}>
                    <Card className="h-full rounded-2xl bg-ground p-5">
                      <h3 className="font-semibold">{f.name}</h3>
                      <p className="mt-2 text-sm text-muted">{f.description}</p>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="inside-title" className="container-x py-16">
          <h2 id="inside-title" className="eyebrow">
            {t.inside}
          </h2>
          <ul className="mt-5 grid gap-4 md:grid-cols-2">
            {story.screenshots.map((label, i) => (
              <li key={`${label}-${i}`}>
                <Placeholder label={label} className="h-64 rounded-2xl" />
              </li>
            ))}
          </ul>
        </section>

        <section className="container-x grid gap-12 pb-16 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">{t.cameTogether}</h2>
            <ol className="mt-6 space-y-5 border-l border-border pl-6">
              {story.phases.map((p) => (
                <li key={p.name}>
                  <p className="font-semibold">
                    {p.name} · {p.duration}
                  </p>
                  <p className="text-sm text-muted">{p.note}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="text-3xl font-bold">{t.builtWith}</h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {story.tech.map((tech, i) => (
                <li
                  key={`${tech}-${i}`}
                  className="rounded-xl border border-border bg-surface px-4 py-2 font-mono text-sm"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="container-x pb-16">
          <figure className="rounded-3xl bg-primary p-8 text-ground sm:p-10">
            <blockquote className="text-2xl font-bold leading-snug sm:text-3xl">
              “{story.quote.text}”
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-4">
              <span aria-hidden className="size-12 rounded-full bg-ground/25" />
              <span>
                <span className="block font-semibold">{story.quote.name}</span>
                <span className="block text-sm">{story.quote.role}</span>
              </span>
            </figcaption>
          </figure>
        </section>
      </article>

      <CTASection
        secondary={{
          href: `/success-stories/${next.slug}`,
          label: content.cta.nextStoryLabel,
        }}
      />
    </>
  );
}
