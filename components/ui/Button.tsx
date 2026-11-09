import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-ground hover:bg-primary-hover",
  secondary: "border border-ink-border text-ink hover:border-ink hover:bg-ink hover:text-ground",
  ghost: "text-ink hover:bg-surface-2",
  inverse: "bg-ink text-ground hover:bg-primary",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
};

export function buttonClasses(
  variant: Variant = "primary",
  size: Size = "md",
  extra?: string,
) {
  return cn(
    "inline-flex items-center justify-center gap-2.5 rounded-full font-semibold transition-colors duration-500 ease-(--ease-out) disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    sizes[size],
    extra,
  );
}

/** Text labels roll up on hover (see .btn-roll in globals.css); anything else renders as is. */
function Label({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      {typeof children === "string" ? (
        <span className="btn-roll">
          <span>{children}</span>
        </span>
      ) : (
        children
      )}
      {arrow ? (
        <span aria-hidden className="btn-arrow">
          <span>→</span>
        </span>
      ) : null}
    </>
  );
}

type CommonProps = { variant?: Variant; size?: Size; arrow?: boolean };

export function Button({
  variant,
  size,
  arrow,
  className,
  type = "button",
  children,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...props}>
      <Label arrow={arrow}>{children}</Label>
    </button>
  );
}

export function ButtonLink({
  variant,
  size,
  arrow,
  className,
  children,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      <Label arrow={arrow}>{children}</Label>
    </Link>
  );
}
