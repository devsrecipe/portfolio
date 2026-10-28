import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-ground hover:bg-primary-hover",
  secondary: "border border-ink-border text-ink hover:bg-surface-2",
  ghost: "text-ink hover:bg-surface-2",
  inverse: "bg-ink text-ground hover:bg-ink/90",
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
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    sizes[size],
    extra,
  );
}

type CommonProps = { variant?: Variant; size?: Size };

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...props} />
  );
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return <Link className={buttonClasses(variant, size, className)} {...props} />;
}
