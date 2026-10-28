"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { LogoMark } from "@/components/brand/Logo";
import type { SiteContent } from "@/types";

gsap.registerPlugin(ScrollTrigger);

/*
 * Both pieces share one viewBox (-10 -70 420 340) and the same seam curve at x=200,
 * so the knob on the left piece fills the socket in the right piece exactly.
 */
const VIEWBOX = "-10 -70 420 340";
const LEFT_PIECE =
  "M18 0H82C84-16 62-6 62-30C62-52 82-58 100-58S138-52 138-30C138-6 116-16 118 0H200" +
  "V82C216 84 206 62 230 62C252 62 258 82 258 100S252 138 230 138C206 138 216 116 200 118" +
  "V200H18Q0 200 0 182V18Q0 0 18 0Z";
const RIGHT_PIECE =
  "M200 0H382Q400 0 400 18V182Q400 200 382 200H318C316 216 338 206 338 230C338 252 318 258 300 258" +
  "S262 252 262 230C262 206 284 216 282 200H200V118C216 116 206 138 230 138C252 138 258 118 258 100" +
  "S252 62 230 62C206 62 216 84 200 82Z";

function TeamIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden className="size-9 sm:size-11">
      <path
        d="M24 4v3M13 8l2 2M35 8l-2 2M19 18a5 5 0 1 1 10 0c0 2-1 3-2 4h-6c-1-1-2-2-2-4Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="31" r="4" fill="currentColor" />
      <circle cx="36" cy="31" r="4" fill="currentColor" />
      <circle cx="24" cy="29" r="5" fill="currentColor" />
      <path d="M4 44a8 8 0 0 1 16 0M28 44a8 8 0 0 1 16 0M14 44a10 10 0 0 1 20 0Z" fill="currentColor" />
    </svg>
  );
}

/** Two puzzle pieces that slide in from either side and snap together when scrolled into view. */
export function FitPuzzle({ data }: { data: SiteContent["home"]["fit"] }) {
  const root = useRef<HTMLDivElement>(null);
  const left = useRef<HTMLDivElement>(null);
  const right = useRef<HTMLDivElement>(null);
  const flash = useRef<HTMLDivElement>(null);
  const badge = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const pieces = [left.current, right.current];
        let landed = false;
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
          onComplete: () => {
            landed = true;
            gsap.to(root.current, { y: -8, duration: 2.4, ease: "sine.inOut", repeat: -1, yoyo: true });
          },
        });

        tl.from(left.current, {
          xPercent: -22,
          y: 30,
          rotate: -12,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
        })
          .from(
            right.current,
            { xPercent: 22, y: -30, rotate: 12, opacity: 0, duration: 1.1, ease: "power3.out" },
            "<",
          )
          // The "click" as the knob seats in the socket.
          .to(pieces, { scale: 1.035, duration: 0.12, ease: "power2.out" })
          .to(pieces, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.45)" })
          .fromTo(
            flash.current,
            { opacity: 0.9, scale: 0.4 },
            { opacity: 0, scale: 1.8, duration: 0.8, ease: "power2.out" },
            "<",
          )
          .from(
            badge.current,
            { y: 24, scale: 0.85, opacity: 0, duration: 0.6, ease: "back.out(2)" },
            "<0.1",
          );

        // Once seated, hovering eases the pieces apart a little; leaving snaps them back.
        const apart = gsap
          .timeline({ paused: true })
          .to(left.current, { xPercent: -3, rotate: -2, duration: 0.4, ease: "power2.out" })
          .to(right.current, { xPercent: 3, rotate: 2, duration: 0.4, ease: "power2.out" }, "<");
        const open = () => {
          if (landed) apart.play();
        };
        const close = () => {
          if (landed) apart.reverse();
        };
        const el = root.current;
        el?.addEventListener("pointerenter", open);
        el?.addEventListener("pointerleave", close);
        return () => {
          el?.removeEventListener("pointerenter", open);
          el?.removeEventListener("pointerleave", close);
        };
      },
      root,
    );
    return () => mm.revert();
  }, []);

  const piece = "absolute inset-0 will-change-transform";
  const label =
    "absolute top-[20.6%] flex h-[58.8%] w-[47.6%] flex-col items-center justify-center gap-3 px-[4%] text-center text-sm font-bold leading-snug sm:text-lg";

  return (
    <div className="mx-auto w-full max-w-xl">
      <div ref={root} className="relative aspect-[420/340]">
        <div
          aria-hidden
          className="absolute inset-[10%] rounded-full bg-primary/20 blur-3xl"
        />

        <div ref={left} className={piece}>
          <svg viewBox={VIEWBOX} aria-hidden className="size-full overflow-visible drop-shadow-[0_20px_28px_rgba(28,23,20,0.22)]">
            <path d={LEFT_PIECE} className="fill-ink" />
          </svg>
          <div className={`${label} left-[2.4%] pr-[7%] text-ground`}>
            <span className="text-primary">
              <TeamIcon />
            </span>
            <p>{data.yours}</p>
            <span aria-hidden className="h-0.5 w-8 rounded-full bg-primary" />
          </div>
        </div>

        <div ref={right} className={piece}>
          <svg viewBox={VIEWBOX} aria-hidden className="size-full overflow-visible drop-shadow-[0_20px_28px_rgba(196,70,30,0.28)]">
            <defs>
              <linearGradient id="fit-ours" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="var(--color-primary)" />
                <stop offset="1" stopColor="var(--color-primary-hover)" />
              </linearGradient>
            </defs>
            <path d={RIGHT_PIECE} fill="url(#fit-ours)" />
          </svg>
          <div className={`${label} left-[50%] pl-[14.5%] text-ground`}>
            <LogoMark className="size-9 sm:size-11" />
            <p>{data.ours}</p>
            <span aria-hidden className="h-0.5 w-8 rounded-full bg-ground" />
          </div>
        </div>

        <div
          ref={flash}
          aria-hidden
          className="pointer-events-none absolute left-[49%] top-[50%] size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-0 blur-xl"
        />
      </div>

      <p
        ref={badge}
        className="mx-auto -mt-2 w-fit rounded-full border border-border bg-ground px-8 py-3 font-display text-3xl shadow-[0_12px_30px_-12px_rgba(28,23,20,0.25)] sm:text-4xl"
      >
        {data.badge.before} <span className="italic text-primary">{data.badge.highlight}</span>
      </p>
    </div>
  );
}
