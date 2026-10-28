import { getStories, getStory } from "@/lib/content";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Devs Recipe success story";

export function generateStaticParams() {
  const stories = getStories();
  return stories.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = getStory(slug);
  return renderOg(story?.title ?? "Success story", "Success story");
}
