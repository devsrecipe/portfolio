"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export type SceneName = "relay" | "key" | "plug";

type Scene = {
  viewBox: string;
  art: ReactNode;
  play: (tl: gsap.core.Timeline, q: (s: string) => Element[]) => void;
};

const line = { fill: "none", stroke: "currentColor", strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Mark({ x, y, size, className }: { x: number; y: number; size: number; className?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size / 48})`} className={className}>
      <path d="M5 27h38a19 19 0 0 1-38 0Z" fill="currentColor" />
      <path d="M17 6l-7 7 7 7M31 6l7 7-7 7M27 4l-6 18" {...line} strokeWidth={3.2} />
    </g>
  );
}

const scenes: Record<SceneName, Scene> = {
  relay: {
    viewBox: "0 0 540 175",
    art: (
      <>
        <g className="text-ink/15" {...line}>
          {[10, 145, 280, 415].map((x) => (
            <rect key={x} x={x} y={40} width={90} height={90} rx={18} />
          ))}
          <path d="M102 85h38m-8-8 8 8-8 8M237 85h38m-8-8 8 8-8 8M372 85h38m-8-8 8 8-8 8" />
          <path d="M55 152H460" strokeDasharray="2 10" />
          <circle cx={55} cy={80} r={12} />
          <path d="M48 98h14M50 105h10" />
          <path d="M178 72l24 24M194 66l8 8-4 4-8-8zM172 102l10-4-6-6z" />
          <path d="M450 110V64M450 66h24l-6 8 6 8h-24" />
        </g>
        <Mark x={302} y={62} size={44} className="text-ink/15" />
        {[10, 145, 280, 415].map((x, i) => (
          <rect key={x} className={`lit lit-${i} text-primary`} x={x} y={40} width={90} height={90} rx={18} {...line} />
        ))}
        <circle className="baton text-primary" cx={460} cy={152} r={8} fill="currentColor" />
      </>
    ),
    play: (tl, q) => {
      tl.fromTo(q(".baton"), { x: -405 }, { x: 0, ease: "power1.inOut", duration: 2.2 })
        .fromTo(q(".lit-0"), { opacity: 0 }, { opacity: 1, duration: 0.25 }, 0.1)
        .fromTo(q(".lit-1"), { opacity: 0 }, { opacity: 1, duration: 0.25 }, 0.8)
        .fromTo(q(".lit-2"), { opacity: 0 }, { opacity: 1, duration: 0.25 }, 1.5)
        .fromTo(q(".lit-3"), { opacity: 0 }, { opacity: 1, duration: 0.25 }, 2.0);

      gsap.to(q(".baton"), {
        x: "+=16",
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.3,
      });
    },
  },

  key: {
    viewBox: "0 0 400 340",
    art: (
      <>
        <defs>
          <clipPath id="scene-key-clip">
            <rect x={-200} y={0} width={500} height={340} />
          </clipPath>
        </defs>
        <g className="shackle">
          <path d="M260 180V130a40 40 0 0 1 80 0V222" {...line} strokeWidth={8} className="text-ink/25" />
          <path d="M260 180V130a40 40 0 0 1 80 0V222" {...line} strokeWidth={8} className="unlocked opacity-0 text-primary transition-opacity" />
        </g>
        <rect x={235} y={170} width={130} height={120} rx={20} {...line} className="fill-ground text-ink/25" />
        <rect x={235} y={170} width={130} height={120} rx={20} {...line} className="unlocked opacity-0 fill-primary/10 text-primary transition-opacity" />
        <g className="text-ink/25" fill="currentColor">
          <circle cx={300} cy={222} r={10} />
          <path d="M295 226h10l4 26h-18Z" />
        </g>
        <g className="unlocked opacity-0 text-primary transition-opacity" fill="currentColor">
          <circle cx={300} cy={222} r={10} />
          <path d="M295 226h10l4 26h-18Z" />
        </g>
        <g clipPath="url(#scene-key-clip)">
          <g className="key opacity-0 text-primary" {...line} strokeWidth={6}>
            <circle cx={160} cy={222} r={32} />
            <circle cx={160} cy={222} r={11} />
            <path d="M192 222H336M306 222v20M322 222v14" />
          </g>
        </g>
      </>
    ),
    play: (tl, q) => {
      // 1. Key slides smoothly from left directly into the keyhole (0.55s)
      tl.fromTo(
        q(".key"),
        { x: -120, opacity: 0 },
        { x: 0, opacity: 1, ease: "power2.out", duration: 0.55 }
      )
        // 2. Key turns 90 degrees inside the lock (0.32s)
        .to(q(".key"), { scaleY: 0.2, svgOrigin: "300 222", duration: 0.16, ease: "power2.inOut" })
        .to(q(".key"), { scaleY: 1, svgOrigin: "300 222", duration: 0.16, ease: "power2.out" })
        // 3. Lock illuminates and shackle pops open with a crisp mechanical click! (0.4s)
        .to(q(".unlocked"), { opacity: 1, duration: 0.15 }, "-=0.08")
        .to(
          q(".shackle"),
          { y: -36, duration: 0.4, ease: "back.out(2.4)" },
          "-=0.1"
        );
    },
  },

  plug: {
    viewBox: "0 0 400 320",
    art: (
      <>
        <g className="plug text-ink/30" {...line} strokeWidth={5}>
          <path d="M130 190C86 190 70 236 96 262S74 316 20 312" />
          <path d="M224 174h34M224 206h34" strokeWidth={9} />
          <path d="M218 148 172 149C146 150 130 160 130 176V204C130 220 146 230 172 231L218 232" className="fill-ground" />
          <ellipse cx={218} cy={190} rx={10} ry={42} className="face fill-ground" />
        </g>
        <g className="socket text-ink/30" {...line} strokeWidth={5}>
          <path d="M306 190C350 190 366 236 340 262S362 316 416 312" />
          <path d="M218 148 264 149C290 150 306 160 306 176V204C306 220 290 230 264 231L218 232" className="fill-ground" />
          <ellipse cx={218} cy={190} rx={10} ry={42} className="face fill-ground" />
          <path d="M218 151V229" className="seam opacity-0" />
          <g className="face" fill="currentColor" stroke="none">
            <ellipse cx={218} cy={174} rx={3.5} ry={6} />
            <ellipse cx={218} cy={206} rx={3.5} ry={6} />
          </g>
        </g>
        <g className="spark opacity-0 text-primary" fill="currentColor">
          <path d="M226 74 210 104h12l-8 28 24-36h-13l9-22Z" />
          <path d="M226 254 210 284h12l-8 28 24-36h-13l9-22Z" />
        </g>
      </>
    ),
    play: (tl, q) => {
      // 1. Magnetic pull: plug & socket slide together rapidly (0.45s)
      tl.fromTo(
        q(".plug"),
        { x: -65, opacity: 0.3 },
        { x: 0, opacity: 1, ease: "power3.in", duration: 0.45 }
      )
        .fromTo(
          q(".socket"),
          { x: 65, opacity: 0.3 },
          { x: 0, opacity: 1, ease: "power3.in", duration: 0.45 },
          "<"
        )
        // 2. Contact: straight seam joins (0.08s)
        .to(q(".face"), { opacity: 0, duration: 0.08 }, "-=0.06")
        .to(q(".seam"), { opacity: 1, duration: 0.08 }, "<")
        // 3. ELECTRIC BURST! High-voltage sparks explode (0.3s)
        .fromTo(
          q(".spark"),
          { opacity: 0, scale: 0.2, svgOrigin: "218 190" },
          { opacity: 1, scale: 1.2, svgOrigin: "218 190", duration: 0.3, ease: "back.out(3.2)" }
        )
        .to(q(".spark"), { scale: 1, duration: 0.15 });
    },
  },
};

export function SceneBackdrop({ scene, className }: { scene: SceneName; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const artRef = useRef<SVGGElement>(null);
  const { viewBox, art, play } = scenes[scene];

  useEffect(() => {
    const el = root.current;
    const artEl = artRef.current;
    if (!el || !artEl) return;
    const section = el.closest("section") || el.parentElement;
    const mm = gsap.matchMedia();

    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const q = gsap.utils.selector(el);

        // Gentle Parallax Drift on inner SVG art group (preserves root position stability)
        if (section) {
          gsap.fromTo(
            artEl,
            { y: 16 },
            {
              y: -16,
              ease: "none",
              scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.8 },
            },
          );
        }

        // Story animation triggers right when THIS illustration scrolls comfortably into view (top 72%)
        // Reverses cleanly when scrolled back up, plays forward again on scroll down!
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        });
        play(tl, q);
      },
      root,
    );

    return () => mm.revert();
  }, [play]);

  return (
    <div
      ref={root}
      aria-hidden
      className={cn("pointer-events-none absolute -z-10 opacity-70 block", className)}
    >
      <svg viewBox={viewBox} className="h-auto w-full overflow-visible">
        <g ref={artRef}>{art}</g>
      </svg>
    </div>
  );
}
