import { SplitHeading } from "@/components/motion/SplitHeading";

type Part = { text: string; highlight?: boolean };

/** Full-width H1 whose lines rise from behind a mask on load. The highlighted word is in the primary colour. */
export function HeroHeadline({ id, parts }: { id: string; parts: Part[] }) {
  return (
    <SplitHeading
      as="h1"
      id={id}
      onLoad
      delay={0.15}
      className="mt-8 text-balance font-display text-[clamp(2.75rem,5.6vw,6.25rem)] font-bold leading-[0.98] tracking-[-0.045em]"
    >
      {parts.map((part, i) => (
        <span key={i} className={part.highlight ? "text-primary" : undefined}>
          {part.text}{" "}
        </span>
      ))}
    </SplitHeading>
  );
}
