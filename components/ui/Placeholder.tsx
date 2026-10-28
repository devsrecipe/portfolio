import { cn } from "@/lib/utils";

type Tone = "neutral" | "primary" | "accent" | "success";

const tones: Record<Tone, string> = {
  neutral: "bg-surface-2 text-muted",
  primary: "bg-primary-soft text-primary",
  accent: "bg-accent-soft text-accent",
  success: "bg-success-soft text-success",
};

/** Image placeholder that keeps the bracketed label from the design. */
export function Placeholder({
  label,
  className,
  tone = "neutral",
}: {
  label: string;
  className?: string;
  tone?: Tone;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "flex items-center justify-center font-mono text-sm",
        tones[tone],
        className,
      )}
    >
      {label}
    </div>
  );
}
