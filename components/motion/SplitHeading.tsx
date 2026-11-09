"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useEffect, useRef, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

type Props = {
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
  className?: string;
  children: ReactNode;
  /** Seconds to wait before the lines rise. */
  delay?: number;
  /** Play on page load instead of when scrolled into view (for the hero). */
  onLoad?: boolean;
};

/**
 * Heading whose lines rise one by one from behind a mask (GSAP SplitText).
 * Lines are measured after fonts load and re-split on resize (autoSplit), so
 * breaks stay correct at every width. Reduced motion shows it straight away.
 */
export function SplitHeading({ as: Tag = "h2", id, className, children, delay = 0, onLoad }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      let alive = true;
      let split: SplitText | undefined;
      document.fonts.ready.then(() => {
        if (!alive) return;
        split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => {
            gsap.set(el, { visibility: "visible" });
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.15,
              ease: "expo.out",
              stagger: 0.09,
              delay,
              scrollTrigger: onLoad ? undefined : { trigger: el, start: "top 88%", once: true },
            });
          },
        });
      });
      return () => {
        alive = false;
        split?.revert();
      };
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(el, { visibility: "visible" });
    });

    return () => mm.revert();
  }, [delay, onLoad]);

  return (
    <Tag ref={ref} id={id} data-split="" className={className}>
      {children}
    </Tag>
  );
}
