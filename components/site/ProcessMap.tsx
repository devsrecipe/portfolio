"use client";

import { useState } from "react";
import type { SiteContent } from "@/types";

type Step = SiteContent["home"]["process"]["steps"][number];

const STATIONS = [
  {
    stepNumber: "01",
    label: "DISCOVERY BASECAMP",
    timing: "Week 1",
    deliverable: "System Blueprint & Scope",
    commitment: "1–2 hrs discovery call",
    artifact: "Interactive Architecture Doc",
    coords: "23.81° N, 90.41° E",
  },
  {
    stepNumber: "02",
    label: "PROTOTYPING STUDIO",
    timing: "Week 2",
    deliverable: "Clickable Figma Prototype",
    commitment: "Click & approve screens",
    artifact: "Design System & UI Specs",
    coords: "Milestone // Alpha",
  },
  {
    stepNumber: "03",
    label: "SPRINT FORGE",
    timing: "Weeks 3–6",
    deliverable: "Weekly Working Demos",
    commitment: "Friday live demo review",
    artifact: "Production Codebase & CI/CD",
    coords: "Sprint Cadence // Active",
  },
  {
    stepNumber: "04",
    label: "LAUNCHPAD & CARE",
    timing: "Launch & Beyond",
    deliverable: "30-Day Fix Guarantee",
    commitment: "Zero downtime rollout",
    artifact: "Full Code Ownership & Keys",
    coords: "Production // Verified",
  },
];

function StationIcon({ index, className }: { index: number; className?: string }) {
  switch (index) {
    case 0:
      // Discover: Radar scanner / Target
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
          <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.25" />
          <path d="m14 10 4-4" />
        </svg>
      );
    case 1:
      // Design: Canvas & Pen
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
          <circle cx="14" cy="15" r="2" fill="currentColor" />
          <path d="m14 15 4 4" />
        </svg>
      );
    case 2:
      // Build: Terminal / Code
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
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      );
    case 3:
    default:
      // Launch: Rocket
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
          <path
            d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"
            fill="currentColor"
            fillOpacity="0.15"
          />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      );
  }
}

export function ProcessMap({ steps }: { steps: Step[] }) {
  const [activeStation, setActiveStation] = useState<number>(0);

  // Winding SVG path for desktop horizontal map
  // Start: (80, 200) -> S1 (200, 200) -> S2 (460, 90) -> S3 (720, 200) -> S4 (980, 90) -> End: (1080, 90)
  const desktopPathD =
    "M 60,190 C 130,190 150,190 200,190 C 310,190 350,90 460,90 C 580,90 610,190 720,190 C 830,190 870,90 980,90 L 1060,90";

  return (
    <div className="relative mt-8 w-full overflow-hidden rounded-3xl border border-border/80 bg-[#120e0c]/90 p-5 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10">
      {/* Background Architectural Grid Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #e8673a 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Top Ambient Glow Blurs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -right-20 size-72 rounded-full bg-accent/15 blur-3xl"
      />

      {/* Map Header / HUD Navigation */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div className="flex items-center gap-3">
          <span className="relative flex size-3">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-3 rounded-full bg-primary" />
          </span>
          <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
            Interactive Project Roadmap
          </span>
          <span className="hidden sm:inline-block text-border">|</span>
          <span className="hidden sm:inline-block font-mono text-xs text-muted/80">
            Click any milestone to inspect
          </span>
        </div>

        {/* Milestone Quick Selectors */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {steps.map((step, idx) => {
            const isCurrent = activeStation === idx;
            return (
              <button
                key={step.name}
                type="button"
                onClick={() => setActiveStation(idx)}
                className={`group flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs font-semibold transition-all duration-300 ${
                  isCurrent
                    ? "border border-primary bg-primary text-ground shadow-md shadow-primary/25"
                    : "border border-border/70 bg-surface-2/80 text-muted hover:border-primary/40 hover:text-ink"
                }`}
              >
                <span
                  className={`size-1.5 rounded-full ${
                    isCurrent ? "bg-ground" : "bg-primary group-hover:scale-125"
                  }`}
                />
                <span>0{idx + 1}</span>
                <span className="hidden md:inline">{step.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* DESKTOP VIEW: Continuous Horizontal Winding Journey Map */}
      {/* ======================================================== */}
      <div className="relative z-10 mt-8 hidden lg:block">
        {/* SVG Journey Track Canvas */}
        <svg
          viewBox="0 0 1140 280"
          className="w-full h-auto overflow-visible select-none"
          aria-hidden="true"
        >
          <defs>
            {/* Glowing path gradient */}
            <linearGradient id="trail-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e8673a" stopOpacity="0.3" />
              <stop offset="35%" stopColor="#e8673a" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#f2b25c" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#3DD68C" stopOpacity="1" />
            </linearGradient>

            {/* Glowing comet filter */}
            <filter id="glow-orb" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Dashed Terrain Guide */}
          <path
            d={desktopPathD}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="3"
            strokeDasharray="6 8"
            strokeLinecap="round"
          />

          {/* Dynamic Illuminated Energy Beam */}
          <path
            d={desktopPathD}
            fill="none"
            stroke="url(#trail-gradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="opacity-90"
          />

          {/* Traveling Energy Orb (Comet) that cruises along the path continuously */}
          <g>
            <circle r="6" fill="#f2b25c" filter="url(#glow-orb)">
              <animateMotion
                dur="7s"
                repeatCount="indefinite"
                path={desktopPathD}
                keyPoints="0;1"
                keyTimes="0;1"
              />
            </circle>
            <circle r="3" fill="#ffffff">
              <animateMotion
                dur="7s"
                repeatCount="indefinite"
                path={desktopPathD}
                keyPoints="0;1"
                keyTimes="0;1"
              />
            </circle>
          </g>

          {/* Station Coordinates & Waypoint Nodes on the SVG Track */}
          {[
            { cx: 200, cy: 190, idx: 0 },
            { cx: 460, cy: 90, idx: 1 },
            { cx: 720, cy: 190, idx: 2 },
            { cx: 980, cy: 90, idx: 3 },
          ].map(({ cx, cy, idx }) => {
            const isSelected = activeStation === idx;
            return (
              <g
                key={idx}
                className="cursor-pointer transition-transform duration-300"
                onClick={() => setActiveStation(idx)}
              >
                {/* Outer Ping on Active */}
                {isSelected && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r="24"
                    fill="none"
                    stroke="#e8673a"
                    strokeWidth="1.5"
                    className="animate-ping opacity-50"
                  />
                )}
                {/* Station Halo */}
                <circle
                  cx={cx}
                  cy={cy}
                  r="18"
                  fill="#1f1915"
                  stroke={isSelected ? "#e8673a" : "var(--color-border)"}
                  strokeWidth={isSelected ? "3" : "2"}
                  className="transition-all duration-300"
                />
                {/* Inner Core */}
                <circle
                  cx={cx}
                  cy={cy}
                  r="8"
                  fill={isSelected ? "#e8673a" : "#3a3029"}
                  className="transition-all duration-300"
                />
                <circle cx={cx} cy={cy} r="3" fill="#ffffff" />
              </g>
            );
          })}
        </svg>

        {/* 4 Interactive Map Station Cards (Positioned in synchronized rhythm) */}
        <div className="grid grid-cols-4 gap-5 pt-4">
          {steps.map((step, idx) => {
            const isSelected = activeStation === idx;
            const meta = STATIONS[idx];

            return (
              <div
                key={step.name}
                onClick={() => setActiveStation(idx)}
                className={`group relative flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "border-2 border-primary bg-surface shadow-2xl shadow-primary/15 -translate-y-2"
                    : "border border-border/70 bg-surface/70 hover:border-primary/40 hover:bg-surface hover:-translate-y-1"
                }`}
              >
                <div>
                  {/* Card Header: Node Icon + Step Capsule */}
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className={`flex size-11 items-center justify-center rounded-2xl border transition-all duration-300 ${
                        isSelected
                          ? "border-primary bg-primary text-ground scale-105 shadow-md shadow-primary/20"
                          : "border-primary/25 bg-primary-soft text-primary group-hover:border-primary group-hover:scale-105"
                      }`}
                    >
                      <StationIcon index={idx} className="size-5" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="rounded-full border border-border/70 bg-surface-2 px-2.5 py-0.5 font-mono text-[10px] text-muted">
                        {meta.timing}
                      </span>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-semibold tracking-wider ${
                          isSelected
                            ? "border-primary/40 bg-primary-soft text-primary"
                            : "border-border/60 bg-surface-2 text-muted"
                        }`}
                      >
                        {meta.stepNumber}
                      </span>
                    </div>
                  </div>

                  {/* Stage Label */}
                  <p className="mt-4 font-mono text-[10px] font-bold tracking-widest text-primary/80 uppercase">
                    {meta.label}
                  </p>

                  {/* Title */}
                  <h3 className="mt-1 text-2xl font-bold tracking-tight text-ink">
                    {step.name}
                  </h3>

                  {/* 1-Sentence Punchline Description */}
                  <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-muted group-hover:text-ink/90 transition-colors">
                    {step.text}
                  </p>
                </div>

                {/* Card Footer: Verified Deliverable */}
                <div className="mt-6 border-t border-border/60 pt-3.5">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <svg
                        className="size-2.5"
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
                    </span>
                    <span className="font-semibold text-accent leading-tight">
                      {meta.deliverable}
                    </span>
                  </div>

                  {/* Progress Indicator Accent */}
                  <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-border/40">
                    <div
                      className={`h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ${
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
      {/* MOBILE / TABLET VIEW: Vertical Winding Journey Trail     */}
      {/* ======================================================== */}
      <div className="relative z-10 mt-6 space-y-6 lg:hidden">
        {steps.map((step, idx) => {
          const isSelected = activeStation === idx;
          const meta = STATIONS[idx];

          return (
            <div
              key={step.name}
              onClick={() => setActiveStation(idx)}
              className={`relative flex gap-4 rounded-3xl p-5 sm:p-6 transition-all duration-300 ${
                isSelected
                  ? "border-2 border-primary bg-surface shadow-xl shadow-primary/10"
                  : "border border-border/70 bg-surface/80"
              }`}
            >
              {/* Vertical Trail Connection Line */}
              {idx < steps.length - 1 && (
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
                  0{idx + 1}
                </span>
              </div>

              {/* Station Details */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span className="font-mono text-[10px] font-bold tracking-wider text-primary/80 uppercase">
                    {meta.label}
                  </span>
                  <span className="rounded-full border border-border/70 bg-surface-2 px-2.5 py-0.5 font-mono text-[10px] text-muted">
                    {meta.timing}
                  </span>
                </div>

                <h3 className="mt-1 text-xl font-bold tracking-tight text-ink">
                  {step.name}
                </h3>

                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted">
                  {step.text}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-border/50 text-xs">
                  <span className="inline-flex items-center gap-1 font-semibold text-accent">
                    <svg className="size-3.5 shrink-0" viewBox="0 0 16 16" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{meta.deliverable}</span>
                  </span>
                  <span className="text-border">·</span>
                  <span className="font-mono text-[11px] text-muted/80">
                    {meta.commitment}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* Interactive Milestone Inspector / Detail HUD (Bottom)    */}
      {/* ======================================================== */}
      <div className="relative z-10 mt-8 rounded-2xl border border-primary/20 bg-primary-soft/50 p-5 sm:p-6 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-ground font-mono text-sm font-bold shadow-md">
              0{activeStation + 1}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-primary uppercase">
                  Active Focus: {steps[activeStation]?.name} Phase
                </span>
                <span className="text-border">·</span>
                <span className="font-mono text-xs text-muted">
                  {STATIONS[activeStation]?.timing}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-ink">
                {steps[activeStation]?.text}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="rounded-xl border border-border/70 bg-surface-2 px-3 py-2 text-xs">
              <span className="block font-mono text-[10px] text-muted uppercase">Primary Artifact</span>
              <span className="font-semibold text-ink">{STATIONS[activeStation]?.artifact}</span>
            </div>
            <div className="rounded-xl border border-border/70 bg-surface-2 px-3 py-2 text-xs">
              <span className="block font-mono text-[10px] text-muted uppercase">Client Rhythm</span>
              <span className="font-semibold text-accent">{STATIONS[activeStation]?.commitment}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

