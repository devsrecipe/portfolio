"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/*
 * Line-art illustrations that sit behind a section, drift slower than the page
 * (parallax) and play a small story as the section scrolls past. Every scene is
 * drawn in its finished state and animated with `from`, so reduced motion simply
 * shows the finished picture.
 */

export type SceneName = "rocket" | "relay" | "key" | "gears" | "seat" | "plug";

type Scene = {
  viewBox: string;
  art: ReactNode;
  play: (tl: gsap.core.Timeline, q: (s: string) => Element[]) => void;
};

const line = { fill: "none", stroke: "currentColor", strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** The `</>` bowl from the brand mark, drawn into a 48x48 box. */
function Mark({ x, y, size, className }: { x: number; y: number; size: number; className?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size / 48})`} className={className}>
      <path d="M5 27h38a19 19 0 0 1-38 0Z" fill="currentColor" />
      <path d="M17 6l-7 7 7 7M31 6l7 7-7 7M27 4l-6 18" {...line} strokeWidth={3.2} />
    </g>
  );
}

function gear(cx: number, cy: number, r: number, teeth: number, depth: number) {
  const steps = teeth * 4;
  const radii = [r, r + depth, r + depth, r];
  const pts = Array.from({ length: steps }, (_, i) => {
    const a = (i / steps) * Math.PI * 2;
    const rr = radii[i % 4];
    return `${(cx + rr * Math.cos(a)).toFixed(1)} ${(cy + rr * Math.sin(a)).toFixed(1)}`;
  });
  return `M${pts.join("L")}Z`;
}

function Person({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g {...line}>
      <circle cx={cx} cy={cy - 7} r={8} />
      <path d={`M${cx - 14} ${cy + 16}a14 12 0 0 1 28 0`} />
    </g>
  );
}

const scenes: Record<SceneName, Scene> = {
  rocket: {
    viewBox: "0 0 400 400",
    art: (
      <>
        <g className="text-ink/15">
          <path d="M200 340V380" {...line} strokeDasharray="4 10" />
          {[[60, 80], [330, 60], [80, 260], [350, 220], [40, 170], [300, 330]].map(([x, y]) => (
            <circle key={`${x}-${y}`} className="star" cx={x} cy={y} r={3} fill="currentColor" />
          ))}
        </g>
        <g className="rocket">
          <path className="flame text-primary" d="M178 258Q200 340 222 258Z" fill="currentColor" />
          <g className="text-ink/25" {...line}>
            <path d="M200 60C240 100 250 160 245 240H155C150 160 160 100 200 60Z" />
            <path d="M155 196 118 262 157 246M245 196 282 262 243 246" />
            <rect x={174} y={240} width={52} height={16} rx={4} />
          </g>
          <circle cx={200} cy={150} r={22} className="text-primary" {...line} />
        </g>
      </>
    ),
    play: (tl, q) => {
      gsap.to(q(".flame"), { scaleY: 0.7, svgOrigin: "200 258", duration: 0.18, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(q(".star"), { opacity: 0.2, duration: 1.2, repeat: -1, yoyo: true, stagger: 0.3 });
      tl.from(q(".rocket"), { y: 140, rotate: -8, transformOrigin: "50% 100%", ease: "none" });
    },
  },

  relay: {
    viewBox: "0 0 420 175",
    art: (
      <>
        <g className="text-ink/15" {...line}>
          {[10, 160, 310].map((x) => (
            <rect key={x} x={x} y={40} width={100} height={100} rx={20} />
          ))}
          <path d="M120 90h28m-8-8 8 8-8 8M270 90h28m-8-8 8 8-8 8" />
          <path d="M60 162H360" strokeDasharray="2 10" />
          {/* idea, build, finish */}
          <circle cx={60} cy={84} r={13} />
          <path d="M53 104h14M55 112h10" />
          <path d="M346 116V66M346 68h26l-7 9 7 9h-26" />
        </g>
        <Mark x={186} y={66} size={48} className="text-ink/15" />
        {[10, 160, 310].map((x, i) => (
          <rect key={x} className={`lit lit-${i} text-primary`} x={x} y={40} width={100} height={100} rx={20} {...line} />
        ))}
        <circle className="baton text-primary" cx={360} cy={162} r={9} fill="currentColor" />
      </>
    ),
    play: (tl, q) => {
      tl.from(q(".baton"), { x: -300, ease: "none", duration: 3 })
        .from(q(".lit-0"), { opacity: 0, duration: 0.3 }, 0)
        .from(q(".lit-1"), { opacity: 0, duration: 0.3 }, 1.4)
        .from(q(".lit-2"), { opacity: 0, duration: 0.3 }, 2.7);
    },
  },

  key: {
    viewBox: "0 0 400 340",
    art: (
      <>
        <defs>
          {/* The key is cut off at the keyhole, so its tip disappears into it. */}
          <clipPath id="scene-key-clip">
            <rect x={-200} y={0} width={500} height={340} />
          </clipPath>
        </defs>
        {/* Short left leg pops free; the long right leg stays seated in the body. */}
        <g className="shackle">
          <path d="M260 180V130a40 40 0 0 1 80 0V222" {...line} strokeWidth={8} className="text-ink/25" />
          <path d="M260 180V130a40 40 0 0 1 80 0V222" {...line} strokeWidth={8} className="unlocked text-primary" />
        </g>
        <rect x={235} y={170} width={130} height={120} rx={20} {...line} className="fill-ground text-ink/25" />
        <rect x={235} y={170} width={130} height={120} rx={20} {...line} className="unlocked fill-primary/10 text-primary" />
        <g className="text-ink/25" fill="currentColor">
          <circle cx={300} cy={222} r={10} />
          <path d="M295 226h10l4 26h-18Z" />
        </g>
        <g className="unlocked text-primary" fill="currentColor">
          <circle cx={300} cy={222} r={10} />
          <path d="M295 226h10l4 26h-18Z" />
        </g>
        <g clipPath="url(#scene-key-clip)">
          <g className="key text-primary" {...line} strokeWidth={6}>
            <circle cx={160} cy={222} r={32} />
            <circle cx={160} cy={222} r={11} />
            <path d="M192 222H336M306 222v20M322 222v14" />
          </g>
        </g>
      </>
    ),
    play: (tl, q) => {
      tl.from(q(".key"), { x: -120, ease: "power1.inOut", duration: 2 })
        // Quarter turn: the head goes edge-on.
        .to(q(".key"), { scaleY: 0.35, svgOrigin: "160 222", duration: 0.4, ease: "power2.inOut" })
        .from(q(".unlocked"), { opacity: 0, duration: 0.6 }, "<0.2")
        // Lifts until the short left leg clears the body; the long right leg stays seated.
        .fromTo(q(".shackle"), { y: 0 }, { y: -36, duration: 0.6, ease: "back.out(2)" }, "<");
    },
  },

  gears: {
    viewBox: "0 0 400 340",
    art: (
      <>
        <g className="gear-a text-ink/20">
          <path d={gear(160, 200, 90, 12, 18)} {...line} />
          <circle cx={160} cy={200} r={52} {...line} />
          <Person cx={160} cy={196} />
        </g>
        <g className="gear-b text-primary">
          <path d={gear(297, 121, 50, 7, 18)} {...line} />
          <circle cx={297} cy={121} r={30} {...line} />
        </g>
        <Mark x={281} y={105} size={32} className="text-primary" />
      </>
    ),
    play: (tl, q) => {
      tl.fromTo(q(".gear-a"), { rotate: -120, svgOrigin: "160 200" }, { rotate: 60, ease: "none" }, 0).fromTo(
        q(".gear-b"),
        { rotate: (120 * 12) / 7, svgOrigin: "297 121" },
        { rotate: (-60 * 12) / 7, ease: "none" },
        0,
      );
    },
  },

  seat: {
    viewBox: "0 0 400 280",
    art: (
      <>
        <g className="text-ink/20">
          <rect x={20} y={60} width={360} height={170} rx={28} {...line} />
          {[85, 165, 245].map((x) => (
            <g key={x} className="member">
              <circle cx={x} cy={130} r={32} {...line} />
              <Person cx={x} cy={128} />
              <path d={`M${x - 20} 192h40`} {...line} />
            </g>
          ))}
          <circle cx={325} cy={130} r={32} {...line} strokeDasharray="6 8" />
          <path d="M305 192h40" {...line} />
        </g>
        <g className="filled text-primary">
          <circle cx={325} cy={130} r={32} {...line} fill="currentColor" fillOpacity={0.15} />
          <Mark x={307} y={110} size={36} />
        </g>
      </>
    ),
    play: (tl, q) => {
      tl.from(q(".member"), { opacity: 0.3, y: 10, stagger: 0.3, duration: 0.6 }).from(q(".filled"), {
        scale: 0,
        svgOrigin: "325 130",
        opacity: 0,
        duration: 0.8,
        ease: "back.out(2)",
      });
    },
  },

  plug: {
    viewBox: "0 0 400 320",
    art: (
      <>
        <g className="text-ground/30" {...line} strokeWidth={5}>
          <rect x={244} y={130} width={120} height={120} rx={28} />
          <path d="M286 172v18M322 172v18" strokeWidth={9} />
        </g>
        <g className="plug text-ground/45" {...line} strokeWidth={5}>
          <path d="M118 190C50 190 70 300 -10 300" />
          <rect x={118} y={150} width={92} height={80} rx={20} />
          <path d="M210 172h34M210 208h34" strokeWidth={9} />
        </g>
        <path
          className="bolt text-ground/60"
          d="M312 40 288 90h22l-14 44 40-58h-24l14-36Z"
          fill="currentColor"
        />
      </>
    ),
    play: (tl, q) => {
      tl.from(q(".plug"), { x: -110, ease: "power1.out", duration: 2 }).from(q(".bolt"), {
        opacity: 0,
        scale: 0.4,
        svgOrigin: "312 87",
        duration: 0.6,
        ease: "back.out(3)",
      });
    },
  },
};

/**
 * Put inside a `relative isolate overflow-hidden` section. `className` places and
 * sizes the art, for example "right-0 top-16 w-[420px]".
 */
export function SceneBackdrop({ scene, className }: { scene: SceneName; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const { viewBox, art, play } = scenes[scene];

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const section = el.parentElement;
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const q = gsap.utils.selector(el);
        gsap.fromTo(
          el,
          { yPercent: 25 },
          {
            yPercent: -25,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
        const tl = gsap.timeline({
          // Fully played once the art has travelled 70% of the way up the viewport.
          scrollTrigger: { trigger: el, start: "top bottom", end: "top 30%", scrub: 0.8 },
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
      className={cn("pointer-events-none absolute -z-10 hidden opacity-60 lg:block", className)}
    >
      <svg viewBox={viewBox} className="h-auto w-full overflow-visible">
        {art}
      </svg>
    </div>
  );
}
