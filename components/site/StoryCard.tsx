import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { content } from "@/content";
import type { Story } from "@/types";

export function StoryCard({ story }: { story: Story; index?: number }) {
  const t = content.stories.labels;
  const done = story.status === "completed";

  return (
    <Card className="group lift spotlight-card relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-surface/90 p-6 sm:p-7 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-surface hover:shadow-2xl hover:shadow-primary/10">
      <div>
        {/* Top Badges Row */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="rounded-full border border-border/70 bg-surface-2/80 px-2.5 py-0.5 text-xs font-medium text-muted">
              {story.industry}
            </span>
            <span className="rounded-full border border-border/70 bg-surface-2/80 px-2.5 py-0.5 text-xs font-medium text-muted">
              {story.country}
            </span>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              done
                ? "border border-success/30 bg-success-soft text-success"
                : "border border-accent/30 bg-accent-soft text-accent"
            }`}
          >
            <span
              className={`size-1.5 rounded-full ${
                done ? "bg-success" : "bg-accent animate-pulse"
              }`}
            />
            {done ? t.completed : t.inProgress}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-5 text-xl font-bold tracking-tight text-ink transition-colors duration-200 group-hover:text-primary">
          {story.title}
        </h3>

        {/* Headline Result / Progress Callout */}
        {done && story.resultShort ? (
          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-primary/20 bg-primary-soft p-3.5 text-sm font-semibold text-primary">
            <svg
              className="size-4 shrink-0"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 12 12 4M12 4H6M12 4v6" />
            </svg>
            <span className="truncate">{story.resultShort}</span>
          </div>
        ) : story.whereItStands ? (
          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-accent/20 bg-accent-soft p-3.5 text-xs font-medium text-accent">
            <span className="size-1.5 shrink-0 rounded-full bg-accent animate-pulse" />
            <span className="truncate">{story.whereItStands}</span>
          </div>
        ) : null}

        {/* System Summary */}
        <p className="mt-4 text-sm leading-relaxed text-muted transition-colors duration-200 group-hover:text-ink/90">
          {story.builtShort}
        </p>
      </div>

      {/* Action Footer Link */}
      <div className="mt-6 border-t border-border/50 pt-5">
        <Link
          href={`/success-stories/${story.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
        >
          <span>{done ? t.readStory : t.followBuild}</span>
          <span
            className="inline-block transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </Link>
      </div>
    </Card>
  );
}
