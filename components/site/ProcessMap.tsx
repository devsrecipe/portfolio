"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import type { SiteContent } from "@/types";

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
  const [activeStation, setActiveStation] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Native Framer Motion scroll tracking over the pinned container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const orbLeft = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = latest < 0.25 ? 0 : latest < 0.55 ? 1 : latest < 0.85 ? 2 : 3;
    setActiveStation(idx);
    setIsCompleted(latest >= 0.95);
  });

  const jumpToStation = (idx: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const startY = scrollTop + rect.top;
    const totalScroll = containerRef.current.offsetHeight - window.innerHeight;
    const fractions = [0.05, 0.35, 0.68, 0.96];
    const targetY = startY + totalScroll * fractions[idx];

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  return (
    <div ref={containerRef} className="relative h-[240vh] bg-ground select-none">
      {/* Sticky Viewport Frame — perfectly sized to never overflow into next section */}
      <div className="sticky top-20 min-h-[calc(100vh-5rem)] flex flex-col justify-center py-6 lg:py-8 container-x">
        {/* Subtle Architectural Grid */}
        <div
          className="pointer-events-none absolute -inset-6 rounded-3xl opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--color-primary) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />

        {/* Section Heading — Pure Hanken Grotesk Sans Font (Matching Logo) */}
        <div className="max-w-3xl mb-4">
          {eyebrow && (
            <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink leading-tight">
              {title}
            </h2>
          )}
          {intro && (
            <p className="mt-1.5 text-xs sm:text-sm text-muted leading-relaxed max-w-2xl">
              {intro}
            </p>
          )}
        </div>

        {/* Flight Path Metadata Strip */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/70 bg-surface/80 px-4 py-2 backdrop-blur-md shadow-xs">
          <div className="flex items-center gap-2">
            <span className="flex size-2 rounded-full bg-primary animate-ping" />
            <span className="text-xs font-bold tracking-wide text-ink uppercase">
              Project Flight Path
            </span>
            <span className="text-border">·</span>
            <span className="text-xs text-muted">
              4 Milestones from Idea to Live Production
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="rounded-full border border-primary/30 bg-primary-soft px-2.5 py-0.5 text-xs font-semibold text-primary">
              Timeline: 4–6 Weeks
            </span>
            <span className="text-xs text-muted">
              Active: Milestone 0{activeStation + 1}
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* DESKTOP VIEW: Scroll-Driven Connected Highway Map        */}
        {/* ======================================================== */}
        <div className="relative z-10 mt-5 hidden lg:block">
          {/* Continuous Highway Transit Track (Col 1 center to Col 4 center = 75% span) */}
          <div className="relative mb-3">
            {/* Background Rail */}
            <div className="absolute left-[12.5%] w-[75%] top-3.5 h-0.5 bg-border/70" />

            {/* Active Scroll Fill Rail (Driven by Framer Motion scrollYProgress) */}
            <div className="absolute left-[12.5%] w-[75%] top-3.5 h-0.5 overflow-hidden">
              <motion.div
                className="h-full w-full bg-gradient-to-r from-primary via-accent to-primary shadow-sm shadow-primary"
                style={{ scaleX, transformOrigin: "left center" }}
              />
            </div>

            {/* Animated Energy Pulse (Synchronously follows scroll position) */}
            <div className="absolute left-[12.5%] w-[75%] top-3.5 pointer-events-none">
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 -ml-2 size-3.5 rounded-full bg-primary shadow-lg shadow-primary"
                style={{ left: orbLeft }}
              >
                <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
              </motion.div>
            </div>

            {/* 4 Waypoint Buttons centered on each column */}
            <div className="grid grid-cols-4 gap-4">
              {STATIONS.map((st, idx) => {
                const isSelected = activeStation === idx;
                const isPassed = activeStation >= idx;

                return (
                  <div key={st.step} className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => jumpToStation(idx)}
                      className="group flex flex-col items-center focus:outline-none cursor-pointer"
                      aria-label={`Jump to Milestone ${st.step}: ${st.name}`}
                    >
                      {/* Waypoint Interchange Node */}
                      <div
                        className={`flex size-7 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                          isSelected
                            ? "border-primary bg-primary text-ground scale-125 shadow-lg shadow-primary/40 ring-4 ring-primary/20"
                            : isPassed
                              ? "border-primary/60 bg-surface text-primary"
                              : "border-border bg-surface-2 text-muted group-hover:border-primary/50 group-hover:text-ink"
                        }`}
                      >
                        <span className="text-xs font-bold">{st.step}</span>
                      </div>

                      {/* Vertical connector stem dropping into card */}
                      <div
                        className={`h-4 w-0.5 transition-colors duration-300 ${
                          isSelected
                            ? "bg-primary"
                            : isPassed
                              ? "bg-primary/40"
                              : "bg-border/60"
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4 Journey Station Cards (Compact, Balanced, Unified Sans Font) */}
          <div className="grid grid-cols-4 gap-4 pt-1">
            {STATIONS.map((st, idx) => {
              const isSelected = activeStation === idx;
              const stepData = steps[idx];

              return (
                <div
                  key={st.step}
                  onClick={() => jumpToStation(idx)}
                  className={`group relative flex flex-col justify-between rounded-2xl p-5 cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? "border-2 border-primary bg-surface shadow-2xl shadow-primary/15 -translate-y-2 ring-1 ring-primary/30"
                      : "border border-border/70 bg-surface/80 hover:border-primary/40 hover:bg-surface hover:-translate-y-1 shadow-sm"
                  }`}
                >
                  <div>
                    {/* Header: Node Icon + Timing Capsule */}
                    <div className="flex items-center justify-between gap-2">
                      <div
                        className={`flex size-9 items-center justify-center rounded-xl border transition-all duration-300 ${
                          isSelected
                            ? "border-primary bg-primary text-ground scale-105 shadow-md shadow-primary/25"
                            : "border-primary/25 bg-primary-soft text-primary group-hover:scale-105 group-hover:border-primary"
                        }`}
                      >
                        <StationIcon index={idx} className="size-4.5" />
                      </div>
                      <span className="rounded-full border border-border/70 bg-surface-2 px-2 py-0.5 text-[11px] text-muted">
                        {st.timing}
                      </span>
                    </div>

                    {/* Checkpoint Tag */}
                    <p className="mt-3.5 text-[10px] font-bold tracking-wider text-primary/80 uppercase">
                      {st.checkpoint}
                    </p>

                    {/* Station Name */}
                    <h3 className="mt-0.5 text-lg font-bold tracking-tight text-ink">
                      {st.name}
                    </h3>

                    {/* 1-Sentence Punchline */}
                    <p className="mt-2 text-xs leading-relaxed text-muted group-hover:text-ink/90 transition-colors">
                      {stepData?.text || st.punchline}
                    </p>
                  </div>

                  {/* Card Footer: Verified Deliverable */}
                  <div className="mt-4 border-t border-border/60 pt-3">
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
                      <span className="truncate">{st.deliverable}</span>
                    </div>

                    {/* Progress Indicator Accent */}
                    <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-border/40">
                      <div
                        className={`h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                          isSelected ? "w-full" : "w-2 group-hover:w-full"
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
        <div className="relative z-10 mt-6 space-y-4 lg:hidden">
          {STATIONS.map((st, idx) => {
            const isSelected = activeStation === idx;
            const stepData = steps[idx];

            return (
              <div
                key={st.step}
                onClick={() => setActiveStation(idx)}
                className={`relative flex gap-4 rounded-2xl p-4 sm:p-5 transition-all duration-300 ${
                  isSelected
                    ? "border-2 border-primary bg-surface shadow-xl shadow-primary/10"
                    : "border border-border/70 bg-surface/80"
                }`}
              >
                {/* Vertical Route Connection Line */}
                {idx < STATIONS.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute left-[30px] top-[68px] bottom-[-20px] w-0.5 border-l-2 border-dashed border-primary/40"
                  />
                )}

                {/* Station Node Icon */}
                <div className="relative z-10 flex flex-col items-center shrink-0">
                  <div
                    className={`flex size-11 items-center justify-center rounded-xl border transition-all ${
                      isSelected
                        ? "border-primary bg-primary text-ground scale-105 shadow-md shadow-primary/25"
                        : "border-primary/30 bg-primary-soft text-primary"
                    }`}
                  >
                    <StationIcon index={idx} className="size-4.5" />
                  </div>
                  <span className="mt-1.5 text-xs font-bold text-primary">
                    {st.step}
                  </span>
                </div>

                {/* Station Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="text-[10px] font-bold tracking-wider text-primary/80 uppercase">
                      {st.checkpoint}
                    </span>
                    <span className="rounded-full border border-border/70 bg-surface-2 px-2 py-0.5 text-[10px] text-muted">
                      {st.timing}
                    </span>
                  </div>

                  <h3 className="mt-0.5 text-lg font-bold tracking-tight text-ink">
                    {st.name}
                  </h3>

                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-muted">
                    {stepData?.text || st.punchline}
                  </p>

                  <div className="mt-3 flex items-center gap-1.5 pt-2.5 border-t border-border/50 text-xs font-semibold text-accent">
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
        <div className="relative z-10 mt-4 rounded-xl border border-primary/20 bg-primary-soft/40 px-4 py-2 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-accent animate-pulse" />
              <span className="text-muted uppercase tracking-wider text-[11px] font-medium">
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
              <span className="text-xs text-muted">
                {!isCompleted ? (
                  <span className="inline-flex items-center gap-1 text-primary font-medium">
                    <span>Scroll to navigate</span>
                    <svg
                      className="size-3 animate-bounce"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 5v14M19 12l-7 7-7-7" />
                    </svg>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                    <span>Journey complete · Next section</span>
                    <svg
                      className="size-3 animate-bounce"
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
              <span className="rounded-md border border-border/70 bg-surface-2 px-2.5 py-0.5 text-xs text-primary font-bold">
                {activeStation + 1}/4
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
