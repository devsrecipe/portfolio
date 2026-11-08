import { cn } from "@/lib/utils";

type MarkProps = { className?: string; title?: string };

/** Concept 01 · Code Bowl: a `</>` symbol above a bowl. Uses currentColor. */
export function LogoMark({ className, title }: MarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={cn("size-8", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d="M5 27h38a19 19 0 0 1-38 0Z" fill="currentColor" />
      <path
        d="M17 6l-7 7 7 7M31 6l7 7-7 7M27 4l-6 18"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type LogoProps = { className?: string; markClassName?: string };

export function Logo({ className, markClassName }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={cn("size-8 text-primary", markClassName)} />
      <span className="font-display text-[1.35rem] font-bold tracking-tight text-ink">devsrecipe</span>
    </span>
  );
}
