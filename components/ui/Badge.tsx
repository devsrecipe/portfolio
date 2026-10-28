import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "new" | "success" | "warning" | "neutral" | "primary";

const variants: Record<BadgeVariant, string> = {
  new: "bg-primary-soft text-primary",
  primary: "bg-primary text-ground",
  success: "bg-success-soft text-success",
  warning: "bg-accent-soft text-accent",
  neutral: "bg-surface-2 text-muted",
};

export function Badge({
  variant = "neutral",
  className,
  children,
}: {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
