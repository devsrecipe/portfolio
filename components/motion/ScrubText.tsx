"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/** Paragraph whose words light up one by one as it scrolls through the viewport (GSAP scrub). */
export function ScrubText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap.fromTo(
          ".scrub-word",
          { opacity: 0.15 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              end: "bottom 45%",
              scrub: true,
            },
          },
        );
      },
      ref,
    );
    return () => mm.revert();
  }, []);

  return (
    <p ref={ref} className={cn(className)}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="scrub-word">
          {word}{" "}
        </span>
      ))}
    </p>
  );
}
