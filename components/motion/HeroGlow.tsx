"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

/** Two soft glows behind the hero: they drift on their own and parallax as you scroll (GSAP). */
export function HeroGlow() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap.to(".glow-a", {
          x: 60,
          y: 40,
          duration: 7,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
        gsap.to(".glow-b", {
          x: -50,
          y: -30,
          duration: 9,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        gsap.to(root.current, {
          yPercent: 30,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      },
      root,
    );

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="glow-a absolute -left-24 top-10 size-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="glow-b absolute -right-20 top-40 size-96 rounded-full bg-accent/10 blur-3xl" />
    </div>
  );
}
