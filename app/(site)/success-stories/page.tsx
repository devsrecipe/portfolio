import type { Metadata } from "next";
import { SectionHeading } from "@/components/site/SectionHeading";
import { StoryCard } from "@/components/site/StoryCard";
import { CTASection } from "@/components/site/CTASection";
import { getStories } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Success stories",
  description:
    "Problems we solved and what changed: finished projects with real results, and builds in progress with where they stand today.",
  path: "/success-stories",
});

export default async function StoriesPage() {
  const stories = await getStories();
  return (
    <>
      <section className="container-x py-16">
        <SectionHeading
          as="h1"
          eyebrow="Success stories"
          title="Problems we solved, and what changed."
          intro="Finished projects show real results. Projects still being built show exactly where they stand today."
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story, i) => (
            <li key={story.slug}>
              <StoryCard story={story} index={i} />
            </li>
          ))}
        </ul>
      </section>
      <CTASection
        title="Facing the same problem?"
        text="Tell us how you work today. We will tell you honestly what software can fix."
      />
    </>
  );
}
