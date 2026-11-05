"use client";

import { useState } from "react";
import type { SiteContent } from "@/types";

type Step = SiteContent["home"]["process"]["steps"][number];

interface ProcessProps {
  steps: Step[];
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
    tag: "Blueprint Scope",
  },
  {
    step: "02",
    checkpoint: "CHECKPOINT 02",
    name: "Design",
    timing: "Week 2",
    punchline:
      "You click through interactive prototypes and approve every screen before any code is written.",
    deliverable: "Clickable Figma Prototype",
    tag: "UI Approval",
  },
  {
    step: "03",
    checkpoint: "CHECKPOINT 03",
    name: "Build",
    timing: "Weeks 3–6",
    punchline:
      "We engineer production code in weekly sprints with working demos you test live every Friday.",
    deliverable: "Weekly Live Demos",
    tag: "Friday Demos",
  },
  {
    step: "04",
    checkpoint: "DESTINATION",
    name: "Launch & Support",
    timing: "Day 30+",
    punchline:
      "We handle seamless live rollout, team onboarding, and back it with 30 days of included fixes.",
    deliverable: "30-Day Fix Guarantee",
    tag: "Guaranteed Care",
  },
];

function StationIcon({ index, className }: { index: number; className?: string }) {
  switch (index) {
    case 0:
      // Discover: Compass / Target Waypoint
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
      // Design: Canvas & Precision Pen
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
      // Build: Sprint Terminal / Code
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
      // Launch: Launch Rocket / Destination Flag
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

export function ProcessMap({ steps }: ProcessProps) {
  const [activeStation, setActiveStation] = useState<number>(0);

  return (
    <div className="relative mt-12 select-none">
      {/* Background Architectural Map Matrix */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-3xl opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-primary) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      {/* ======================================================== */}
      {/* MAP HEADER / METADATA STRIP (Behance Style)              */}
      {/* ======================================================== */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/80 bg-surface/90 px-5 py-3 backdrop-blur-md">
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
          <span className="hidden sm:inline font-mono text-[11px] text-muted">
            Active: Milestone 0{activeStation + 1}
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* DESKTOP JOURNEY MAP: Highway Route + Station Pods        */}
      {/* ======================================================== */}
      <div className="relative z-10 mt-8 hidden lg:block">
        {/* Continuous Highway Route Line running across all 4 stations */}
        <div className="relative px-12 pb-6">
          {/* Background route rail */}
          <div className="h-0.5 w-full bg-border/80" />

          {/* Active illuminated path up to current station */}
          <div
            className="absolute left-12 top-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary transition-all duration-500 shadow-sm shadow-primary"
            style={{ width: `${(activeStation / 3) * 100 * 0.76 + 5}%` }}
          />

          {/* Animated energy pulse traveling along the highway */}
          <div
            className="absolute -top-1.5 size-3.5 rounded-full bg-primary shadow-lg shadow-primary transition-all duration-700 ease-out"
            style={{
              left: `calc(3rem + ${(activeStation / 3) * 100 * 0.76}%)`,
            }}
          >
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
          </div>

          {/* 4 Station Waypoint Pins directly on the highway line */}
          <div className="absolute inset-x-12 -top-4 flex justify-between">
            {STATIONS.map((st, idx) => {
              const isSelected = activeStation === idx;
              const isPassed = idx <= activeStation;

              return (
                <button
                  key={st.step}
                  type="button"
                  onClick={() => setActiveStation(idx)}
                  className="group flex flex-col items-center focus:outline-none"
                  aria-label={`Jump to Milestone ${st.step}: ${st.name}`}
                >
                  {/* Waypoint Interchange Node */}
                  <div
                    className={`flex size-8 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isSelected
                        ? "border-primary bg-primary text-ground scale-125 shadow-lg shadow-primary/40 ring-4 ring-primary/20"
                        : isPassed
                          ? "border-primary/60 bg-surface text-primary"
                          : "border-border bg-surface-2 text-muted group-hover:border-primary/50 group-hover:text-ink"
                    }`}
                  >
                    <span className="font-mono text-xs font-bold">{st.step}</span>
                  </div>

                  {/* Vertical connector stem dropping into the card */}
                  <div
                    className={`h-6 w-0.5 transition-colors duration-300 ${
                      isSelected
                        ? "bg-primary"
                        : isPassed
                          ? "bg-primary/40"
                          : "bg-border/60"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* The 4 Journey Station Cards (Directly beneath the highway nodes) */}
        <div className="grid grid-cols-4 gap-5 pt-2">
          {STATIONS.map((st, idx) => {
            const isSelected = activeStation === idx;
            const stepData = steps[idx];

            return (
              <div
                key={st.step}
                onClick={() => setActiveStation(idx)}
                className={`group relative flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "border-2 border-primary bg-surface shadow-2xl shadow-primary/15 -translate-y-2 ring-1 ring-primary/30"
                    : "border border-border/70 bg-surface/80 hover:border-primary/40 hover:bg-surface hover:-translate-y-1"
                }`}
              >
                <div>
                  {/* Card Header: Node Icon + Timing Capsule */}
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className={`flex size-11 items-center justify-center rounded-2xl border transition-all duration-300 ${
                        isSelected
                          ? "border-primary bg-primary text-ground scale-105 shadow-md shadow-primary/25"
                          : "border-primary/25 bg-primary-soft text-primary group-hover:border-primary group-hover:scale-105"
                      }`}
                    >
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

                  {/* 1-Sentence Punchline Description */}
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

                  {/* Active Indicator Bar */}
                  <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-border/40">
                    <div
                      className={`h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ${
                        isSelected ? "w-full" : "w-3 group-hover:w-full"
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
      {/* Route Flight Details Strip (Bottom Clean Bar)            */}
      {/* ======================================================== */}
      <div className="relative z-10 mt-6 rounded-2xl border border-primary/20 bg-primary-soft/40 px-5 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-accent" />
            <span className="font-mono text-muted uppercase tracking-wider text-[11px]">
              Active Checkpoint Deliverable:
            </span>
            <span className="font-bold text-ink">
              {STATIONS[activeStation]?.deliverable}
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
            <span>Guaranteed Timeline:</span>
            <span className="font-semibold text-primary">
              {STATIONS[activeStation]?.timing}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
