"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * The brand name set edge to edge across the footer. Its font size is fitted to
 * the container on every resize; the letters rise one by one from behind a mask
 * when the footer scrolls into view (GSAP SplitText).
 */
export function FooterWordmark({ text }: { text: string }) {
  const box = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = word.current;
    const container = box.current;
    if (!el || !container) return;

    // Measure at 100px, then scale so the word spans the container exactly.
    const fit = () => {
      el.style.fontSize = "100px";
      const width = el.scrollWidth;
      if (width) el.style.fontSize = `${(100 * container.clientWidth) / width}px`;
    };
    const observer = new ResizeObserver(fit);
    document.fonts.ready.then(fit);
    observer.observe(container);

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      let alive = true;
      let split: SplitText | undefined;
      document.fonts.ready.then(() => {
        if (!alive) return;
        fit();
        split = SplitText.create(el, { type: "chars", mask: "chars" });
        gsap.from(split.chars, {
          yPercent: 105,
          duration: 1.3,
          ease: "expo.out",
          stagger: 0.045,
          scrollTrigger: { trigger: container, start: "top 92%", once: true },
        });
      });
      return () => {
        alive = false;
        split?.revert();
      };
    });

    return () => {
      observer.disconnect();
      mm.revert();
    };
  }, []);

  return (
    <div ref={box} aria-hidden className="select-none overflow-hidden">
      <p
        ref={word}
        className="w-max whitespace-nowrap font-display font-bold leading-none tracking-[-0.055em] text-ink [mask-image:linear-gradient(to_bottom,black_40%,transparent_92%)]"
      >
        {text}
      </p>
    </div>
  );
}
