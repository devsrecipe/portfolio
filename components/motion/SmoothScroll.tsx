"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

let instance: Lenis | null = null;

/** Glide back to the top of the page, through Lenis when it is running. */
export function scrollToTop() {
  if (instance) instance.scrollTo(0);
  else {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }
}

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger animations
 * stay in sync with the eased scroll position. Skipped for reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      autoRaf: false,
      // Sections already set scroll-margin-top for the sticky header, which Lenis respects.
      anchors: true,
    });

    instance = lenis;
    const off = lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      if (instance === lenis) instance = null;
      off();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
