"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { StaggerItem, StaggerOrderedList } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { cn } from "@/lib/utils";
import type { SiteContent } from "@/types";

gsap.registerPlugin(ScrollTrigger);

type Data = SiteContent["home"]["process"];

/** The rail is full at this share of the scroll, so the last step gets time on screen. */
const FILL_END = 0.82;

function StepIcon({ index, className }: { index: number; className?: string }) {
  const paths = [
    // Discover: magnifier
    <>
      <circle key="a" cx="11" cy="11" r="6.5" />
      <path key="b" d="m20 20-4.2-4.2" />
    </>,
    // Design: screen with a cursor
    <>
      <rect key="a" x="3" y="4" width="18" height="13" rx="2.5" />
      <path key="b" d="M3 8.5h18M9 21h6M12 17v4" />
    </>,
    // Build: code brackets
    <path key="a" d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />,
    // Launch: rocket
    <>
      <path key="a" d="M5 15c-1.3 1.1-1.8 4.3-1.8 4.3s3.2-.4 4.3-1.8c.6-.7.6-1.8-.1-2.4a1.9 1.9 0 0 0-2.4-.1Z" />
      <path key="b" d="m12 15-3-3a19 19 0 0 1 1.8-3.5A11.4 11.4 0 0 1 20.5 3.5c0 2.4-.7 6.6-5.3 9.7A19 19 0 0 1 12 15Z" />
    </>,
  ];
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {paths[index]}
    </svg>
  );
}

function Outcome({ label, text, dim }: { label: string; text: string; dim?: boolean }) {
  return (
    <p className={cn("flex items-start gap-2.5 text-sm font-semibold transition-colors duration-500", dim ? "text-muted" : "text-accent")}>
      <span aria-hidden className="mt-px grid size-[1.1rem] shrink-0 place-items-center rounded-full bg-accent-soft text-[0.6rem] text-accent">
        ✓
      </span>
      <span>
        <span className="sr-only">{label}: </span>
        {text}
      </span>
    </p>
  );
}

/**
 * "How we work" in four steps.
 *
 * Desktop: a sticky stage. A single rail fills as you scroll (GSAP scrub) and
 * each step lights up as the fill reaches it; click a step to jump to it.
 * React only re-renders when the active step changes.
 * Phones and tablets: a vertical timeline that simply scrolls, its line drawing
 * down as it passes.
 */
export function ProcessMap({ data }: { data: Data }) {
  const { steps } = data;
  const wrap = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const line = useRef<HTMLSpanElement>(null);
  const timeline = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: wrap.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const p = Math.min(1, self.progress / FILL_END);
          if (fill.current) fill.current.style.transform = `scaleX(${p})`;
          // Node i sits at i / (steps - 1) along the rail.
          let index = 0;
          for (let i = 0; i < steps.length; i++) if (p >= i / (steps.length - 1) - 0.02) index = i;
          if (index !== activeRef.current) {
            activeRef.current = index;
            setActive(index);
          }
        },
      });
      return () => trigger.kill();
    });

    mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        line.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: timeline.current, start: "top 70%", end: "bottom 60%", scrub: 0.6 },
        },
      );
    });

    return () => mm.revert();
  }, [steps.length]);

  /** Scroll to the point where step i is the active one. */
  function jump(i: number) {
    const el = wrap.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const distance = el.offsetHeight - window.innerHeight;
    const share = (i / (steps.length - 1)) * FILL_END;
    window.scrollTo({ top: top + share * distance + 2, behavior: "smooth" });
  }

  // Rendered once per layout; only the desktop copy carries the id the section is labelled by
  // (aria-labelledby still resolves when that copy is hidden on small screens).
  const heading = (id?: string) => (
    <SectionHeading id={id} eyebrow={data.eyebrow} title={data.title} intro={data.intro} />
  );

  return (
    <>
      {/* Desktop: sticky journey */}
      <div ref={wrap} className="relative hidden h-[260vh] lg:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="container-x pb-10 pt-24 [@media(max-height:780px)]:pt-20">
            {heading("process-title")}

            <div className="relative mt-16 [@media(max-height:780px)]:mt-10">
              {/* Rail from the first node to the last (column centres at 12.5% and 87.5%). */}
              <span aria-hidden className="absolute left-[12.5%] right-[12.5%] top-5 h-px bg-border" />
              {/* Inline transform, not the scale-x-0 class: Tailwind v4 scale-* sets the separate
                  `scale` property, which would multiply with the scaleX set while scrolling. */}
              <span
                ref={fill}
                aria-hidden
                style={{ transform: "scaleX(0)" }}
                className="absolute left-[12.5%] right-[12.5%] top-5 h-px origin-left bg-primary"
              />
              <ol className="relative grid grid-cols-4">

              {steps.map((step, i) => {
                const reached = i <= active;
                const current = i === active;
                return (
                  <li key={step.name} className="relative flex">
                    <button
                      type="button"
                      onClick={() => jump(i)}
                      aria-current={current ? "step" : undefined}
                      className="group flex h-full w-full flex-col items-center text-left"
                    >
                      <span
                        className={cn(
                          "relative z-10 grid size-10 place-items-center rounded-full border font-mono text-xs font-semibold transition-all duration-500 ease-(--ease-out)",
                          current && "scale-110 border-primary bg-primary text-ground shadow-[0_0_0_6px_var(--color-primary-soft)]",
                          reached && !current && "border-primary bg-ground text-primary",
                          !reached && "border-border bg-ground text-muted group-hover:border-ink-border group-hover:text-ink",
                        )}
                      >
                        {step.step}
                      </span>

                      <span
                        className={cn(
                          "relative mt-8 flex w-full flex-1 flex-col rounded-3xl p-7 transition-colors duration-500 ease-(--ease-out) xl:p-8 [@media(max-height:780px)]:mt-5 [@media(max-height:780px)]:p-6",
                          current ? "bg-surface" : "group-hover:bg-surface/50",
                        )}
                      >
                        <span
                          aria-hidden
                          className={cn(
                            "absolute inset-x-7 top-0 h-px origin-left bg-primary transition-transform duration-700 ease-(--ease-out) xl:inset-x-8",
                            current ? "scale-x-100" : "scale-x-0",
                          )}
                        />
                        <span className="flex items-center justify-between gap-3">
                          <span
                            className={cn(
                              "grid size-10 place-items-center rounded-xl transition-colors duration-500",
                              current ? "bg-primary text-ground" : "bg-surface-2 text-primary",
                            )}
                          >
                            <StepIcon index={i} className="size-5" />
                          </span>
                          <span className="font-mono text-xs text-muted">{step.timing}</span>
                        </span>
                        <span
                          className={cn(
                            "mt-6 block font-display text-2xl font-bold tracking-[-0.03em] transition-colors duration-500 xl:text-[1.7rem] [@media(max-height:780px)]:mt-4",
                            reached ? "text-ink" : "text-muted",
                          )}
                        >
                          {step.name}
                        </span>
                        <span
                          className={cn(
                            "mt-3 block text-[0.95rem] leading-relaxed transition-colors duration-500",
                            current ? "text-ink/85" : "text-muted",
                          )}
                        >
                          {step.text}
                        </span>
                        <span className="mt-auto block border-t border-border pt-5 [@media(max-height:780px)]:pt-4">
                          <Outcome label={data.outcomeLabel} text={step.outcome} dim={!reached} />
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Phones and tablets: vertical timeline */}
      <div className="container-x py-24 lg:hidden">
        {heading()}
        <div ref={timeline} className="relative mt-14">
          <span aria-hidden className="absolute bottom-6 left-5 top-5 w-px bg-border" />
          <span ref={line} aria-hidden className="absolute bottom-6 left-5 top-5 w-px origin-top bg-primary" />
          <StaggerOrderedList className="space-y-12" stagger={0.12}>
            {steps.map((step, i) => (
              <StaggerItem key={step.name} className="relative pl-16">
                <span className="absolute left-0 top-0 grid size-10 place-items-center rounded-full border border-primary bg-ground font-mono text-xs font-semibold text-primary">
                  {step.step}
                </span>
                <p className="flex items-center gap-3 pt-2">
                  <StepIcon index={i} className="size-5 text-primary" />
                  <span className="font-mono text-xs text-muted">{step.timing}</span>
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-[-0.03em]">{step.name}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/80">{step.text}</p>
                <div className="mt-4">
                  <Outcome label={data.outcomeLabel} text={step.outcome} />
                </div>
              </StaggerItem>
            ))}
          </StaggerOrderedList>
        </div>
      </div>
    </>
  );
}
