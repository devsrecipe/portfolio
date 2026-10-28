"use client";

import { gsap } from "gsap";
import { useEffect, useRef, type ReactNode } from "react";

/** Wrapper that pulls its child slightly toward the cursor (GSAP quickTo). */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;

    const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    function move(e: PointerEvent) {
      const box = el!.getBoundingClientRect();
      x((e.clientX - (box.left + box.width / 2)) * strength);
      y((e.clientY - (box.top + box.height / 2)) * strength);
    }
    function leave() {
      x(0);
      y(0);
    }

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return (
    <span ref={ref} className="inline-block">
      {children}
    </span>
  );
}
