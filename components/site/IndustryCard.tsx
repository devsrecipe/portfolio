import Link from "next/link";
import { IndustryIcon } from "@/components/site/IndustryIcon";
import type { Industry } from "@/types";

export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <Link
      href={`/solutions/${industry.slug}`}
      className="group lift spotlight-card relative flex h-full flex-col rounded-3xl border border-border bg-surface p-6 sm:p-7 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {/* Top Header: Industry Icon & Number Badge */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary-soft text-primary shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-primary group-hover:bg-primary group-hover:text-ground group-hover:shadow-md group-hover:shadow-primary/20">
          <IndustryIcon
            slug={industry.slug}
            className="size-6 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <span className="rounded-full border border-border/70 bg-surface-2/80 px-2.5 py-0.5 font-mono text-xs font-semibold tracking-wider text-muted/80">
          {industry.number}
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-5 text-xl font-bold tracking-tight text-ink transition-colors duration-200 group-hover:text-primary">
        {industry.name}
      </h3>

      {/* Simple, clear description */}
      <p className="mt-2.5 text-sm leading-relaxed text-muted">
        {industry.pain}
      </p>

      {/* Solution Capabilities Pills */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {industry.build.map((item) => (
          <span
            key={item}
            className="inline-flex items-center rounded-lg border border-border/60 bg-surface-2/60 px-2.5 py-1 text-xs font-medium text-muted transition-colors duration-200 group-hover:border-primary/25 group-hover:text-ink"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Action CTA link */}
      <div className="mt-auto pt-6 flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:text-primary-hover">
        <span>{industry.linkLabel}</span>
        <span
          className="inline-block transition-transform duration-200 group-hover:translate-x-1.5"
          aria-hidden="true"
        >
          →
        </span>
      </div>
    </Link>
  );
}
