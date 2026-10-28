import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  as: Tag = "h2",
  className,
}: Props) {
  return (
    <div className={cn("reveal max-w-3xl", className)}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <Tag
        id={id}
        className="mt-3 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl"
      >
        {title}
      </Tag>
      {intro ? <p className="mt-5 max-w-2xl text-lg text-muted">{intro}</p> : null}
    </div>
  );
}
