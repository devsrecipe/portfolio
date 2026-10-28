"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

/** A line that draws left to right as its section scrolls through the viewport (GSAP scrub). */
export function ScrubLine() {
  const track = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap.fromTo(
          fill.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: track.current,
              start: "top 85%",
              end: "top 35%",
              scrub: 0.6,
            },
          },
        );
      },
      track,
    );

    return () => mm.revert();
  }, []);

  return (
    <div ref={track} aria-hidden className="h-px w-full bg-border">
      <div ref={fill} className="h-px origin-left bg-primary" />
    </div>
  );
}
