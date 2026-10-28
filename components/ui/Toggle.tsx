"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function Toggle({ label, defaultOn }: { label: string; defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => setOn((v) => !v)}
      className={cn(
        "relative h-6 w-10 rounded-full transition-colors",
        on ? "bg-primary" : "bg-surface-2 ring-1 ring-border",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 size-5 rounded-full transition-all",
          on ? "left-[1.1rem] bg-ground" : "left-0.5 bg-muted",
        )}
      />
    </button>
  );
}
