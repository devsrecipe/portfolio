import { getJob, getJobs } from "@/lib/content";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Devs Recipe open role";

export async function generateStaticParams() {
  const jobs = await getJobs();
  return jobs.map((j) => ({ slug: j.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getJob(slug);
  return renderOg(job?.title ?? "Careers", "We are hiring");
}
