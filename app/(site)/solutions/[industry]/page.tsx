import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { StoryCard } from "@/components/site/StoryCard";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getSolution, getSolutions, getStories } from "@/lib/content";
import { buildMetadata, serviceLd } from "@/lib/seo";

export async function generateStaticParams() {
  const solutions = await getSolutions();
  return solutions.map((s) => ({ industry: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/solutions/[industry]">): Promise<Metadata> {
  const { industry } = await params;
  const solution = await getSolution(industry);
  if (!solution) return {};
  return buildMetadata({
    title: solution.seoTitle,
    description: solution.seoDescription,
    path: `/solutions/${solution.slug}`,
  });
}

export default async function SolutionPage({
  params,
}: PageProps<"/solutions/[industry]">) {
  const { industry } = await params;
  const solution = await getSolution(industry);
  if (!solution) notFound();

  const path = `/solutions/${solution.slug}`;
  const related = (await getStories()).filter((s) => s.industry === solution.name);

  return (
    <>
      <JsonLd
        data={serviceLd({
          name: solution.seoTitle,
          description: solution.seoDescription,
          path,
        })}
      />
      <article>
        <header className="container-x py-16">
          <Breadcrumbs
            crumbs={[
              { name: "Home", path: "/" },
              { name: "Solutions", path: "/#solutions" },
              { name: solution.name, path },
            ]}
          />
          <p className="eyebrow mt-10">Solutions · {solution.name}</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight">
            {solution.seoTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">{solution.intro}</p>
          <p className="mt-6 max-w-2xl text-2xl">“{solution.pain}”</p>
          <ButtonLink href="/#contact" size="lg" className="mt-8">
            Book a 30 minute call
          </ButtonLink>
        </header>

        <section aria-labelledby="build-title" className="bg-surface py-20">
          <div className="container-x">
            <h2 id="build-title" className="text-3xl font-bold tracking-tight">
              What we build
            </h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-3">
              {solution.build.map((item) => (
                <li key={item}>
                  <Card className="h-full bg-ground p-6 text-lg font-semibold">
                    {item}
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {related.length > 0 ? (
          <section aria-labelledby="related-title" className="container-x py-20">
            <h2 id="related-title" className="text-3xl font-bold tracking-tight">
              Related success stories
            </h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((story, i) => (
                <li key={story.slug}>
                  <StoryCard story={story} index={i} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
      <CTASection
        title="Facing the same problem?"
        text="Tell us how you work today. We will tell you honestly what software can fix."
      />
    </>
  );
}
