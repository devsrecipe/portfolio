import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { content } from "@/content";
import type { Industry } from "@/types";

export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <Card className="lift spotlight-card flex h-full flex-col p-6">
      <p className="font-mono text-xs text-primary">{industry.number}</p>
      <h3 className="mt-4 text-xl font-semibold">{industry.name}</h3>
      <p className="mt-3 text-[1.02rem] leading-snug">“{industry.pain}”</p>
      <p className="eyebrow mt-4 font-sans font-semibold">
        {content.home.industries.buildLabel}
      </p>
      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm marker:text-muted">
        {industry.build.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Link
        href={`/solutions/${industry.slug}`}
        className="mt-auto pt-6 text-sm font-semibold text-primary hover:text-primary-hover"
      >
        {industry.linkLabel} →
      </Link>
    </Card>
  );
}
