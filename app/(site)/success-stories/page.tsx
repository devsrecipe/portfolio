import type { Metadata } from "next";
import { CTASection } from "@/components/site/CTASection";
import { SectionHeading } from "@/components/site/SectionHeading";
import { StoryCard } from "@/components/site/StoryCard";
import { content } from "@/content";
import { getStories } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const { page } = content.stories;

export const metadata: Metadata = buildMetadata({
  ...page.seo,
  path: "/success-stories",
});

export default function StoriesPage() {
  return (
    <>
      <section className="container-x py-16">
        <SectionHeading
          as="h1"
          eyebrow={page.eyebrow}
          title={page.title}
          intro={page.intro}
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {getStories().map((story, i) => (
            <li key={story.slug}>
              <StoryCard story={story} index={i} />
            </li>
          ))}
        </ul>
      </section>
      <CTASection />
    </>
  );
}
