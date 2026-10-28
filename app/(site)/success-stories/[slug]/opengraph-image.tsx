import { getStories, getStory } from "@/lib/content";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Devs Recipe success story";

export async function generateStaticParams() {
  const stories = await getStories();
  return stories.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = await getStory(slug);
  return renderOg(story?.title ?? "Success story", "Success story");
}
