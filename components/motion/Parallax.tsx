"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/** Clips its child and slides it vertically against the scroll for depth (GSAP scrub). */
export function Parallax({
  children,
  className,
  amount = 10,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap.fromTo(
          inner.current,
          { yPercent: -amount, scale: 1 + amount / 50 },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: {
              trigger: outer.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      },
      outer,
    );
    return () => mm.revert();
  }, [amount]);

  return (
    <div ref={outer} className={cn("overflow-hidden", className)}>
      <div ref={inner} className="h-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
