"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SiteContent } from "@/types";
import { SectionHeading } from "@/components/site/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

type Step = SiteContent["home"]["process"]["steps"][number];

interface ProcessProps {
  steps: Step[];
  eyebrow?: string;
  title?: string;
  intro?: string;
}

const STATIONS = [
  {
    step: "01",
    checkpoint: "CHECKPOINT 01",
    name: "Discover",
    timing: "Week 1",
    punchline:
      "We audit your operations, eliminate bottlenecks, and blueprint the exact software you need.",
    deliverable: "Fixed Architecture Blueprint",
  },
  {
    step: "02",
    checkpoint: "CHECKPOINT 02",
    name: "Design",
    timing: "Week 2",
    punchline:
      "You click through interactive prototypes and approve every screen before any code is written.",
    deliverable: "Clickable Figma Prototype",
  },
  {
    step: "03",
    checkpoint: "CHECKPOINT 03",
    name: "Build",
    timing: "Weeks 3–6",
    punchline:
      "We engineer production code in weekly sprints with working demos you test live every Friday.",
    deliverable: "Weekly Live Demos",
  },
  {
    step: "04",
    checkpoint: "DESTINATION",
    name: "Launch & Support",
    timing: "Day 30+",
    punchline:
      "We handle seamless live rollout, team onboarding, and back it with 30 days of included fixes.",
    deliverable: "30-Day Fix Guarantee",
  },
];

function StationIcon({ index, className }: { index: number; className?: string }) {
  switch (index) {
    case 0:
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4" opacity="0.6" />
          <polygon points="12 8 15 12 12 16 9 12" fill="currentColor" fillOpacity="0.3" />
        </svg>
      );
    case 1:
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="3" fill="currentColor" fillOpacity="0.12" />
          <path d="M3 9h18M9 21V9" />
          <circle cx="14" cy="15" r="2.5" fill="currentColor" />
          <path d="m14 15 4 4" />
        </svg>
      );
    case 2:
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="m7 8-4 4 4 4M17 8l4 4-4 4M14 4l-4 16" />
        </svg>
      );
    case 3:
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        </svg>
      );
    default:
      return null;
  }
}

export function ProcessMap({ steps, eyebrow, title, intro }: ProcessProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);

  const lineProgressRef = useRef<HTMLDivElement>(null);
  const pulseOrbRef = useRef<HTMLDivElement>(null);

  const cardRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const nodeRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const stemRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const [activeStation, setActiveStation] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (!containerRef.current || !pinnedRef.current) return;

      const cards = cardRefs.map((r) => r.current).filter(Boolean) as HTMLElement[];
      const nodes = nodeRefs.map((r) => r.current).filter(Boolean) as HTMLElement[];
      const stems = stemRefs.map((r) => r.current).filter(Boolean) as HTMLElement[];

      // Initial styles for station 0
      gsap.set(cards[0], { y: -8, borderColor: "#e8673a" });
      gsap.set(nodes[0], { scale: 1.25, backgroundColor: "#e8673a", color: "#16120e", borderColor: "#e8673a" });
      gsap.set(stems[0], { backgroundColor: "#e8673a" });

      // Build pure GPU-driven timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top+=80",
          end: "+=2200",
          pin: pinnedRef.current,
          scrub: 0.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            const idx = p < 0.22 ? 0 : p < 0.52 ? 1 : p < 0.82 ? 2 : 3;
            setActiveStation(idx);
            setIsCompleted(p >= 0.95);
          },
        },
      });

      // 1. Line draws continuously from 0% to 100% across duration 3.0
      tl.fromTo(
        lineProgressRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: "none", transformOrigin: "left center", duration: 3.0 },
        0
      );

      // 2. Pulse orb moves synchronously from 0% to 100% across duration 3.0
      tl.fromTo(
        pulseOrbRef.current,
        { left: "0%" },
        { left: "100%", ease: "none", duration: 3.0 },
        0
      );

      // 3. Stage 1 -> Stage 2 transition at ~t = 0.8
      tl.to(cards[0], { y: 0, borderColor: "rgba(232, 103, 58, 0.25)", duration: 0.2 }, 0.75);
      tl.to(nodes[0], { scale: 1, backgroundColor: "#201a16", color: "#e8673a", borderColor: "rgba(232, 103, 58, 0.4)", duration: 0.2 }, 0.75);
      tl.to(stems[0], { backgroundColor: "rgba(232, 103, 58, 0.4)", duration: 0.2 }, 0.75);

      tl.to(cards[1], { y: -8, borderColor: "#e8673a", duration: 0.2 }, 0.8);
      tl.to(nodes[1], { scale: 1.25, backgroundColor: "#e8673a", color: "#16120e", borderColor: "#e8673a", duration: 0.2 }, 0.8);
      tl.to(stems[1], { backgroundColor: "#e8673a", duration: 0.2 }, 0.8);

      // 4. Stage 2 -> Stage 3 transition at ~t = 1.7
      tl.to(cards[1], { y: 0, borderColor: "rgba(232, 103, 58, 0.25)", duration: 0.2 }, 1.65);
      tl.to(nodes[1], { scale: 1, backgroundColor: "#201a16", color: "#e8673a", borderColor: "rgba(232, 103, 58, 0.4)", duration: 0.2 }, 1.65);
      tl.to(stems[1], { backgroundColor: "rgba(232, 103, 58, 0.4)", duration: 0.2 }, 1.65);

      tl.to(cards[2], { y: -8, borderColor: "#e8673a", duration: 0.2 }, 1.7);
      tl.to(nodes[2], { scale: 1.25, backgroundColor: "#e8673a", color: "#16120e", borderColor: "#e8673a", duration: 0.2 }, 1.7);
      tl.to(stems[2], { backgroundColor: "#e8673a", duration: 0.2 }, 1.7);

      // 5. Stage 3 -> Stage 4 transition at ~t = 2.6
      tl.to(cards[2], { y: 0, borderColor: "rgba(232, 103, 58, 0.25)", duration: 0.2 }, 2.55);
      tl.to(nodes[2], { scale: 1, backgroundColor: "#201a16", color: "#e8673a", borderColor: "rgba(232, 103, 58, 0.4)", duration: 0.2 }, 2.55);
      tl.to(stems[2], { backgroundColor: "rgba(232, 103, 58, 0.4)", duration: 0.2 }, 2.55);

      tl.to(cards[3], { y: -8, borderColor: "#e8673a", duration: 0.2 }, 2.6);
      tl.to(nodes[3], { scale: 1.25, backgroundColor: "#e8673a", color: "#16120e", borderColor: "#e8673a", duration: 0.2 }, 2.6);
      tl.to(stems[3], { backgroundColor: "#e8673a", duration: 0.2 }, 2.6);

      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger === containerRef.current) t.kill();
        });
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  const jumpToStation = (idx: number) => {
    if (!containerRef.current) return;
    const scrollTrigger = ScrollTrigger.getById("process-pin") || ScrollTrigger.getAll().find((t) => t.trigger === containerRef.current);

    if (scrollTrigger) {
      const fractions = [0.05, 0.35, 0.68, 0.96];
      const targetScroll = scrollTrigger.start + (scrollTrigger.end - scrollTrigger.start) * fractions[idx];
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    } else {
      setActiveStation(idx);
    }
  };

  return (
    <div ref={containerRef} className="relative select-none">
      {/* Pinned Viewport Container */}
      <div
        ref={pinnedRef}
        className="flex min-h-[calc(100vh-5rem)] flex-col justify-center py-8 lg:py-12 container-x"
      >
        {/* Subtle Architectural Grid */}
        <div
          className="pointer-events-none absolute -inset-6 rounded-3xl opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--color-primary) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />

        {/* Section Heading */}
        {title && (
          <SectionHeading
            id="process-title"
            eyebrow={eyebrow}
            title={title}
            intro={intro}
            className="mb-6"
          />
        )}

        {/* Flight Path Metadata Strip */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/80 bg-surface/90 px-5 py-3 backdrop-blur-md shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="flex size-2 rounded-full bg-primary animate-ping" />
            <span className="font-mono text-xs font-bold tracking-wider text-ink uppercase">
              Project Flight Path
            </span>
            <span className="text-border">·</span>
            <span className="font-mono text-[11px] text-muted">
              4 Milestones from Idea to Live Production
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="rounded-full border border-primary/30 bg-primary-soft px-3 py-1 font-mono text-[11px] font-semibold text-primary">
              Timeline: 4–6 Weeks
            </span>
            <span className="font-mono text-[11px] text-muted">
              Active: Milestone 0{activeStation + 1}
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* DESKTOP VIEW: Pure GPU-Driven Highway Journey Map        */}
        {/* ======================================================== */}
        <div className="relative z-10 mt-8 hidden lg:block">
          {/* Continuous Highway Transit Track (Col 1 center to Col 4 center) */}
          <div className="relative mb-4">
            {/* Background Rail */}
            <div className="absolute left-[12.5%] w-[75%] top-4 h-0.5 bg-border/80" />

            {/* Active Scroll Fill Rail (GPU scaleX driven) */}
            <div className="absolute left-[12.5%] w-[75%] top-4 h-0.5 overflow-hidden">
              <div
                ref={lineProgressRef}
                className="h-full w-full bg-gradient-to-r from-primary via-accent to-primary shadow-sm shadow-primary"
                style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
              />
            </div>

            {/* Animated Energy Pulse (GPU position driven) */}
            <div className="absolute left-[12.5%] w-[75%] top-4 pointer-events-none">
              <div
                ref={pulseOrbRef}
                className="absolute top-1/2 -translate-y-1/2 -ml-2 size-4 rounded-full bg-primary shadow-lg shadow-primary"
                style={{ left: "0%" }}
              >
                <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
              </div>
            </div>

            {/* 4 Waypoint Buttons centered on each column */}
            <div className="grid grid-cols-4 gap-5">
              {STATIONS.map((st, idx) => (
                <div key={st.step} className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => jumpToStation(idx)}
                    className="group flex flex-col items-center focus:outline-none cursor-pointer"
                    aria-label={`Jump to Milestone ${st.step}: ${st.name}`}
                  >
                    {/* Waypoint Interchange Node */}
                    <div
                      ref={nodeRefs[idx]}
                      className="flex size-8 items-center justify-center rounded-full border-2 border-border bg-surface-2 text-muted shadow-sm transition-shadow duration-200"
                    >
                      <span className="font-mono text-xs font-bold">{st.step}</span>
                    </div>

                    {/* Vertical connector stem dropping into card */}
                    <div
                      ref={stemRefs[idx]}
                      className="h-5 w-0.5 bg-border/60 transition-colors duration-200"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Journey Station Cards */}
          <div className="grid grid-cols-4 gap-5 pt-1">
            {STATIONS.map((st, idx) => {
              const stepData = steps[idx];

              return (
                <div
                  key={st.step}
                  ref={cardRefs[idx]}
                  onClick={() => jumpToStation(idx)}
                  className="group relative flex flex-col justify-between rounded-3xl border border-border/70 bg-surface/80 p-6 cursor-pointer shadow-md transition-shadow duration-300 hover:shadow-xl"
                >
                  <div>
                    {/* Header: Node Icon + Timing Capsule */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex size-11 items-center justify-center rounded-2xl border border-primary/25 bg-primary-soft text-primary transition-all duration-300 group-hover:scale-105 group-hover:border-primary">
                        <StationIcon index={idx} className="size-5" />
                      </div>
                      <span className="rounded-full border border-border/70 bg-surface-2 px-2.5 py-0.5 font-mono text-[10px] text-muted">
                        {st.timing}
                      </span>
                    </div>

                    {/* Checkpoint Tag */}
                    <p className="mt-4 font-mono text-[10px] font-bold tracking-widest text-primary/80 uppercase">
                      {st.checkpoint}
                    </p>

                    {/* Station Name */}
                    <h3 className="mt-1 text-2xl font-bold tracking-tight text-ink">
                      {st.name}
                    </h3>

                    {/* 1-Sentence Punchline */}
                    <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-muted group-hover:text-ink/90 transition-colors">
                      {stepData?.text || st.punchline}
                    </p>
                  </div>

                  {/* Card Footer: Verified Deliverable */}
                  <div className="mt-6 border-t border-border/60 pt-4">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-accent">
                      <svg
                        className="size-3.5 shrink-0"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{st.deliverable}</span>
                    </div>

                    {/* Progress Indicator Accent */}
                    <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-border/40">
                      <div
                        className={`h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                          activeStation >= idx ? "w-full" : "w-2 group-hover:w-full"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* MOBILE / TABLET VIEW: Vertical Transit Route Map        */}
        {/* ======================================================== */}
        <div className="relative z-10 mt-8 space-y-6 lg:hidden">
          {STATIONS.map((st, idx) => {
            const isSelected = activeStation === idx;
            const stepData = steps[idx];

            return (
              <div
                key={st.step}
                onClick={() => setActiveStation(idx)}
                className={`relative flex gap-4 rounded-3xl p-5 sm:p-6 transition-all duration-300 ${
                  isSelected
                    ? "border-2 border-primary bg-surface shadow-xl shadow-primary/10"
                    : "border border-border/70 bg-surface/80"
                }`}
              >
                {/* Vertical Route Connection Line */}
                {idx < STATIONS.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute left-[33px] top-[74px] bottom-[-24px] w-0.5 border-l-2 border-dashed border-primary/40"
                  />
                )}

                {/* Station Node Icon */}
                <div className="relative z-10 flex flex-col items-center shrink-0">
                  <div
                    className={`flex size-12 items-center justify-center rounded-2xl border transition-all ${
                      isSelected
                        ? "border-primary bg-primary text-ground scale-105 shadow-md shadow-primary/25"
                        : "border-primary/30 bg-primary-soft text-primary"
                    }`}
                  >
                    <StationIcon index={idx} className="size-5" />
                  </div>
                  <span className="mt-2 font-mono text-[11px] font-bold text-primary">
                    {st.step}
                  </span>
                </div>

                {/* Station Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="font-mono text-[10px] font-bold tracking-wider text-primary/80 uppercase">
                      {st.checkpoint}
                    </span>
                    <span className="rounded-full border border-border/70 bg-surface-2 px-2.5 py-0.5 font-mono text-[10px] text-muted">
                      {st.timing}
                    </span>
                  </div>

                  <h3 className="mt-1 text-xl font-bold tracking-tight text-ink">
                    {st.name}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted">
                    {stepData?.text || st.punchline}
                  </p>

                  <div className="mt-4 flex items-center gap-1.5 pt-3 border-t border-border/50 text-xs font-semibold text-accent">
                    <svg className="size-3.5 shrink-0" viewBox="0 0 16 16" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{st.deliverable}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* Navigation & Status Strip (Bottom Bar)                   */}
        {/* ======================================================== */}
        <div className="relative z-10 mt-6 rounded-2xl border border-primary/20 bg-primary-soft/40 px-5 py-3.5 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-muted uppercase tracking-wider text-[11px]">
                Active Checkpoint:
              </span>
              <span className="font-bold text-ink">
                Milestone 0{activeStation + 1}: {STATIONS[activeStation]?.name}
              </span>
              <span className="text-border">·</span>
              <span className="font-semibold text-accent">
                {STATIONS[activeStation]?.deliverable}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-muted">
                {!isCompleted ? (
                  <span className="inline-flex items-center gap-1.5 text-primary">
                    <span>Scroll to navigate</span>
                    <svg
                      className="size-3.5 animate-bounce"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 5v14M19 12l-7 7-7-7" />
                    </svg>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <span>Journey complete · Next section</span>
                    <svg
                      className="size-3.5 animate-bounce"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 5v14M19 12l-7 7-7-7" />
                    </svg>
                  </span>
                )}
              </span>
              <span className="rounded-md border border-border/70 bg-surface-2 px-2.5 py-0.5 font-mono text-[10px] text-primary font-bold">
                {activeStation + 1}/4
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
