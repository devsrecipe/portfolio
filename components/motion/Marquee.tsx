"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

export type MarqueeItem = { name: string; logo: string };

/**
 * Infinite horizontal loop (GSAP). The list is rendered twice; the copy is hidden
 * from assistive tech. Pauses on hover and stays static for reduced motion.
 */
export function Marquee({
  items,
  speed = 40,
}: {
  items: readonly MarqueeItem[];
  speed?: number;
}) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const el = track.current;
        if (!el) return;
        const tween = gsap.to(el, {
          xPercent: -50,
          ease: "none",
          repeat: -1,
          duration: el.scrollWidth / 2 / speed,
        });
        const pause = () => gsap.to(tween, { timeScale: 0, duration: 0.4 });
        const play = () => gsap.to(tween, { timeScale: 1, duration: 0.4 });
        root.current?.addEventListener("pointerenter", pause);
        root.current?.addEventListener("pointerleave", play);
        return () => {
          root.current?.removeEventListener("pointerenter", pause);
          root.current?.removeEventListener("pointerleave", play);
        };
      },
      root,
    );
    return () => mm.revert();
  }, [speed]);

  // Logo files are 400x100 wordmarks that already include the client's name.
  const renderItems = (prefix: string) =>
    items.map((item, i) => (
      <li key={`${prefix}-${i}`} className="shrink-0 px-4">
        <Image
          src={item.logo}
          alt={item.name}
          width={160}
          height={40}
          className="h-10 w-40 opacity-80 transition-opacity hover:opacity-100"
        />
      </li>
    ));

  return (
    <div
      ref={root}
      className="min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      <div ref={track} className="flex w-max">
        <ul className="flex gap-4 pr-4">{renderItems("a")}</ul>
        <ul aria-hidden className="flex gap-4 pr-4">
          {renderItems("b")}
        </ul>
      </div>
    </div>
  );
}
