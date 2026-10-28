import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const control =
  "w-full rounded-xl border border-border bg-surface-2 px-4 text-ink placeholder:text-muted focus-visible:border-primary focus-visible:outline-primary aria-[invalid=true]:border-accent";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(control, "h-12", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(control, "min-h-28 py-3", className)} {...props} />;
}

export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <select className={cn(control, "h-12", className)} {...props}>
      {children}
    </select>
  );
}

type FieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
};

/** Label + control + accessible error message. */
export function Field({ label, htmlFor, error, hint, children, className }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-ink">
        {label}
        {hint ? <span className="ml-2 font-normal text-muted">{hint}</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="text-sm text-accent">
          {error}
        </p>
      ) : null}
    </div>
  );
}
