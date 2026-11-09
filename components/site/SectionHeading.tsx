import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { ScrubText } from "@/components/motion/ScrubText";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  /** Light the intro up word by word as it scrolls into view. */
  scrubIntro?: boolean;
  id?: string;
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  scrubIntro,
  id,
  as: Tag = "h2",
  className,
}: Props) {
  const introClass = "mt-5 max-w-2xl text-lg text-muted";
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
      ) : null}
      <SplitHeading
        as={Tag}
        id={id}
        className="mt-4 font-display text-[clamp(2.25rem,4.6vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.035em]"
      >
        {title}
      </SplitHeading>
      {intro && scrubIntro ? (
        <ScrubText text={intro} className={cn(introClass, "text-ink")} />
      ) : intro ? (
        <Reveal delay={0.1}>
          <p className={introClass}>{intro}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
