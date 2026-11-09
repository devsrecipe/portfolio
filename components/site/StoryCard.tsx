import Link from "next/link";
import { content } from "@/content";
import type { Story } from "@/types";

/**
 * Editorial story column: no box, just a hairline that fills with the primary
 * colour on hover, a quiet meta line, the title and the one result that matters.
 * The whole column is the link.
 */
export function StoryCard({ story }: { story: Story; index?: number }) {
  const t = content.stories.labels;
  const done = story.status === "completed";
  const highlight = done ? story.resultShort : story.whereItStands;

  return (
    <Link
      href={`/success-stories/${story.slug}`}
      className="group relative flex h-full flex-col pt-7 focus-visible:outline-offset-8"
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-border" />
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-700 ease-(--ease-out) group-hover:scale-x-100"
      />

      <p className="flex flex-wrap items-center gap-x-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
        <span>{story.industry}</span>
        <span aria-hidden>·</span>
        <span>{story.country}</span>
        <span aria-hidden>·</span>
        <span className={done ? "text-success" : "text-accent"}>
          {done ? t.completed : t.inProgress}
        </span>
      </p>

      <h3 className="mt-5 font-display text-2xl font-bold leading-[1.15] tracking-[-0.025em] transition-colors duration-500 group-hover:text-primary sm:text-[1.7rem]">
        {story.title}
      </h3>

      {highlight ? (
        <p className="mt-5 text-[0.95rem] font-semibold leading-snug text-primary">{highlight}</p>
      ) : null}

      <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{story.builtShort}</p>

      <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold">
        <span className="btn-roll">
          <span>{done ? t.readStory : t.followBuild}</span>
        </span>
        <span aria-hidden className="btn-arrow">
          <span>→</span>
        </span>
      </span>
    </Link>
  );
}
