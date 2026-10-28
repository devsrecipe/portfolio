import { getSolution, getSolutions } from "@/lib/content";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Devs Recipe solution";

export function generateStaticParams() {
  const solutions = getSolutions();
  return solutions.map((s) => ({ industry: s.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry } = await params;
  const solution = getSolution(industry);
  return renderOg(solution?.seoTitle ?? "Devs Recipe", "Solutions");
}
