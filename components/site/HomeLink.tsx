"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { scrollToTop } from "@/components/motion/SmoothScroll";

/**
 * Link to the home page. Already on the home page, it glides back to the top
 * instead (a plain link to "/" does nothing there, or only drops a #hash).
 */
export function HomeLink({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  const pathname = usePathname();
  return (
    <Link
      href="/"
      aria-label={label}
      className={className}
      onClick={(e) => {
        if (pathname !== "/" || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        if (location.hash) history.replaceState(history.state, "", "/");
        scrollToTop();
      }}
    >
      {children}
    </Link>
  );
}
