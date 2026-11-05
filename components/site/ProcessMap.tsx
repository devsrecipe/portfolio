"use client";

import { useState, useEffect } from "react";
import type { SiteContent } from "@/types";

type Step = SiteContent["home"]["process"]["steps"][number];

interface ProcessProps {
  steps: Step[];
}

const STAGES = [
  {
    number: "01",
    phase: "DISCOVER",
    title: "Discover",
    timing: "Week 1",
    punchline:
      "We audit your operations, eliminate bottlenecks, and blueprint the exact software you need.",
    deliverable: "Fixed Architecture Blueprint",
    commitment: "1–2 hr discovery session",
    tagline: "Zero Scope Creep · 100% Fixed Scope",
  },
  {
    number: "02",
    phase: "DESIGN",
    title: "Design",
    timing: "Week 2",
    punchline:
      "You click through interactive prototypes and approve every screen before any code is written.",
    deliverable: "Clickable Figma Prototype",
    commitment: "Click & approve screens",
    tagline: "High-Fidelity UI · Real UX Flows",
  },
  {
    number: "03",
    phase: "BUILD",
    title: "Build",
    timing: "Weeks 3–6",
    punchline:
      "We engineer production code in weekly sprints with working demos you test live every Friday.",
    deliverable: "Weekly Staging Releases",
    commitment: "Friday live demo review",
    tagline: "Production CI/CD · Zero Blindspots",
  },
  {
    number: "04",
    phase: "LAUNCH",
    title: "Launch & Support",
    timing: "Day 30+",
    punchline:
      "We handle seamless live rollout, team onboarding, and back it with 30 days of included fixes.",
    deliverable: "30-Day Fix Guarantee",
    commitment: "Zero-downtime go-live",
    tagline: "Code Ownership · Guaranteed Support",
  },
];

export function ProcessMap({ steps }: ProcessProps) {
  const [activeStage, setActiveStage] = useState(0);
  const [viewMode, setViewMode] = useState<"studio" | "pipeline">("studio");
  const [interactiveTab, setInteractiveTab] = useState<"checkout" | "inventory" | "reports">("checkout");

  // Auto-play through stages smoothly every 7s if not manually paused
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % 4);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const active = STAGES[activeStage];

  return (
    <div
      className="relative mt-12 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ======================================================== */}
      {/* Top Controller Header: Mode Switcher & Energy Bar       */}
      {/* ======================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-border/80 bg-surface/90 p-3 sm:px-5 backdrop-blur-md shadow-lg">
        {/* Left: Active Phase Breadcrumb */}
        <div className="flex items-center gap-3">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary/15 font-mono text-xs font-bold text-primary">
            {active.number}
          </span>
          <div className="flex items-center gap-2 text-xs">
            <span className="font-mono font-semibold tracking-wider text-ink uppercase">
              Phase {active.number}: {active.title}
            </span>
            <span className="text-border">·</span>
            <span className="font-mono text-muted">{active.timing}</span>
          </div>
        </div>

        {/* Center: Stage Stepper Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          {STAGES.map((s, idx) => {
            const isCurrent = activeStage === idx;
            return (
              <button
                key={s.number}
                type="button"
                onClick={() => {
                  setActiveStage(idx);
                  setIsPaused(true);
                }}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  isCurrent
                    ? "bg-primary text-ground font-semibold shadow-sm shadow-primary/30"
                    : "bg-surface-2 text-muted hover:bg-surface-2/80 hover:text-ink"
                }`}
              >
                <span className="font-mono text-[10px] opacity-80">{s.number}</span>
                <span>{s.title}</span>
              </button>
            );
          })}
        </div>

        {/* Right: View Mode Toggle */}
        <div className="flex items-center gap-1 self-end sm:self-auto rounded-xl border border-border/70 bg-surface-2 p-1 text-xs">
          <button
            type="button"
            onClick={() => setViewMode("studio")}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-medium transition-colors ${
              viewMode === "studio"
                ? "bg-surface text-ink shadow-xs"
                : "text-muted hover:text-ink"
            }`}
          >
            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M3 9h18M9 21V9" />
            </svg>
            <span>Studio Console</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("pipeline")}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-medium transition-colors ${
              viewMode === "pipeline"
                ? "bg-surface text-ink shadow-xs"
                : "text-muted hover:text-ink"
            }`}
          >
            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
            <span>4-Stage Flow</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODE 1: STUDIO CONSOLE (Master-Detail Interactive Tour)  */}
      {/* ======================================================== */}
      {viewMode === "studio" && (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1.4fr] items-stretch">
          {/* LEFT: 4 Progressive Step Cards */}
          <div className="space-y-3.5 flex flex-col justify-between">
            {STAGES.map((s, idx) => {
              const isSelected = activeStage === idx;
              const stepData = steps[idx];

              return (
                <div
                  key={s.number}
                  onClick={() => {
                    setActiveStage(idx);
                    setIsPaused(true);
                  }}
                  className={`group relative rounded-2xl p-5 transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "border-2 border-primary bg-surface shadow-xl shadow-primary/10 translate-x-1 sm:translate-x-2"
                      : "border border-border/70 bg-surface/60 hover:border-primary/40 hover:bg-surface"
                  }`}
                >
                  {/* Active Indicator Bar on Left */}
                  {isSelected && (
                    <div className="absolute left-0 top-3 bottom-3 w-1.5 rounded-r-full bg-primary" />
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex size-10 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-bold transition-colors ${
                          isSelected
                            ? "bg-primary text-ground shadow-md shadow-primary/25"
                            : "bg-surface-2 text-muted group-hover:text-ink"
                        }`}
                      >
                        {s.number}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary">
                            {s.phase}
                          </span>
                          <span className="text-border">·</span>
                          <span className="rounded-md border border-border/60 bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-muted">
                            {s.timing}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold tracking-tight text-ink">
                          {s.title}
                        </h3>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-accent shrink-0">
                      <svg className="size-3.5" viewBox="0 0 16 16" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="hidden sm:inline">{s.deliverable}</span>
                    </span>
                  </div>

                  {/* 1-Sentence Punchline */}
                  <p className="mt-3 text-xs sm:text-[13px] leading-relaxed text-muted group-hover:text-ink/90">
                    {stepData?.text || s.punchline}
                  </p>

                  {/* Active progress track */}
                  {isSelected && (
                    <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-border/40">
                      <div className="h-full w-full bg-gradient-to-r from-primary to-accent animate-pulse" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT: High-Tech Live Studio Screen Simulator */}
          <div className="relative flex flex-col rounded-3xl border border-primary/30 bg-surface shadow-2xl overflow-hidden min-h-[460px]">
            {/* Terminal Window Chrome / Header */}
            <div className="flex items-center justify-between border-b border-border/80 bg-surface-2/90 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-red-500/80" />
                <span className="size-3 rounded-full bg-amber-500/80" />
                <span className="size-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-[11px] text-muted">
                  devsrecipe-engine // stage_{active.number}_{active.phase.toLowerCase()}.tsx
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted font-semibold">
                  Live Stage View
                </span>
              </div>
            </div>

            {/* Interactive Screen Body */}
            <div className="flex-1 p-6 flex flex-col justify-between bg-gradient-to-b from-surface to-ground/80">
              {/* STAGE 01: DISCOVER ARCHITECTURE HUD */}
              {activeStage === 0 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest">
                        Discovery & Architecture Blueprint
                      </span>
                      <h4 className="mt-1 text-xl font-bold text-ink">
                        Eliminating Bottlenecks Before Writing Code
                      </h4>
                    </div>
                    <span className="rounded-xl border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-xs font-bold text-primary">
                      Week 1 Scope
                    </span>
                  </div>

                  {/* Operational Flow Diagram */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="rounded-2xl border border-border/80 bg-surface-2 p-3.5 text-center">
                      <span className="font-mono text-[10px] text-muted uppercase">01 · Inputs</span>
                      <p className="mt-1 text-xs font-bold text-ink">Manual Spreadsheets, WhatsApp & Paper</p>
                      <span className="mt-2 inline-block rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-400">
                        High Revenue Leak
                      </span>
                    </div>

                    <div className="rounded-2xl border border-primary/60 bg-primary-soft p-3.5 text-center shadow-md">
                      <span className="font-mono text-[10px] text-primary uppercase font-bold">02 · Recipe Engine</span>
                      <p className="mt-1 text-xs font-bold text-ink">Automated Central Hub Architecture</p>
                      <span className="mt-2 inline-block rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                        100% Streamlined
                      </span>
                    </div>

                    <div className="rounded-2xl border border-border/80 bg-surface-2 p-3.5 text-center">
                      <span className="font-mono text-[10px] text-muted uppercase">03 · Outputs</span>
                      <p className="mt-1 text-xs font-bold text-ink">Real-Time Sync, Dashboards & Zero Lag</p>
                      <span className="mt-2 inline-block rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">
                        Instant Scalability
                      </span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border/70 bg-surface-2/60 p-4">
                    <p className="font-mono text-xs font-semibold text-muted">
                      <span className="text-primary font-bold">Blueprint Output:</span> Guaranteed fixed-timeline deliverable scope. No surprise hourly overages, no vague estimates.
                    </p>
                  </div>
                </div>
              )}

              {/* STAGE 02: DESIGN PROTOTYPE SIMULATOR */}
              {activeStage === 1 && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest">
                        Interactive Figma Prototype
                      </span>
                      <h4 className="mt-1 text-xl font-bold text-ink">
                        Clickable Prototype Before Any Code
                      </h4>
                    </div>
                    <span className="rounded-xl border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs font-bold text-accent">
                      Week 2 Approval
                    </span>
                  </div>

                  {/* Interactive Mini App Frame */}
                  <div className="rounded-2xl border border-border bg-surface-2 p-4 shadow-inner">
                    <div className="flex items-center justify-between border-b border-border/60 pb-3">
                      <span className="text-xs font-bold text-ink">Prototype Simulator // v2.1</span>
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => setInteractiveTab("checkout")}
                          className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                            interactiveTab === "checkout" ? "bg-primary text-ground font-bold" : "bg-surface text-muted"
                          }`}
                        >
                          Checkout UI
                        </button>
                        <button
                          type="button"
                          onClick={() => setInteractiveTab("inventory")}
                          className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                            interactiveTab === "inventory" ? "bg-primary text-ground font-bold" : "bg-surface text-muted"
                          }`}
                        >
                          Inventory POS
                        </button>
                        <button
                          type="button"
                          onClick={() => setInteractiveTab("reports")}
                          className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                            interactiveTab === "reports" ? "bg-primary text-ground font-bold" : "bg-surface text-muted"
                          }`}
                        >
                          Live Analytics
                        </button>
                      </div>
                    </div>

                    <div className="py-4">
                      {interactiveTab === "checkout" && (
                        <div className="flex items-center justify-between rounded-xl border border-border/80 bg-surface p-3">
                          <div>
                            <p className="text-xs font-bold text-ink">1-Click Mobile Checkout</p>
                            <p className="text-[11px] text-muted">Integrated bKash, Nagad & Stripe Gateway</p>
                          </div>
                          <span className="rounded-lg bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-400">
                            Approved ✓
                          </span>
                        </div>
                      )}
                      {interactiveTab === "inventory" && (
                        <div className="flex items-center justify-between rounded-xl border border-border/80 bg-surface p-3">
                          <div>
                            <p className="text-xs font-bold text-ink">Real-time Multi-outlet Stock</p>
                            <p className="text-[11px] text-muted">Auto alerts when SKU hits minimum threshold</p>
                          </div>
                          <span className="rounded-lg bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-400">
                            Approved ✓
                          </span>
                        </div>
                      )}
                      {interactiveTab === "reports" && (
                        <div className="flex items-center justify-between rounded-xl border border-border/80 bg-surface p-3">
                          <div>
                            <p className="text-xs font-bold text-ink">Revenue & Profit Margins</p>
                            <p className="text-[11px] text-muted">Instant CSV export and executive summary</p>
                          </div>
                          <span className="rounded-lg bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-400">
                            Approved ✓
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-muted">
                    <span className="font-semibold text-ink">Zero surprises:</span> You approve the typography, spacing, navigation paths, and buttons before our engineers write a single line of backend logic.
                  </p>
                </div>
              )}

              {/* STAGE 03: BUILD SPRINT TERMINAL */}
              {activeStage === 2 && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest">
                        Weekly Sprint Cadence
                      </span>
                      <h4 className="mt-1 text-xl font-bold text-ink">
                        Working Friday Demos in Your Hands
                      </h4>
                    </div>
                    <span className="rounded-xl border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-xs font-bold text-primary">
                      Weeks 3–6 Sprints
                    </span>
                  </div>

                  {/* Live CI/CD Terminal Output */}
                  <div className="rounded-2xl border border-border/80 bg-black/60 p-4 font-mono text-xs text-emerald-400 shadow-inner space-y-2">
                    <p className="text-muted/70">// Devs Recipe Sprint Engine · Active Build</p>
                    <p className="text-ink">
                      <span className="text-primary font-bold">PASS</span> tests/checkout.spec.ts (14 assertions)
                    </p>
                    <p className="text-ink">
                      <span className="text-primary font-bold">PASS</span> tests/inventory-sync.spec.ts (22 assertions)
                    </p>
                    <p className="text-ink">
                      <span className="text-primary font-bold">PASS</span> tests/security-auth.spec.ts (19 assertions)
                    </p>
                    <div className="pt-2 border-t border-border/40 text-[11px] text-muted">
                      <span>✓ Staging build deployed: </span>
                      <span className="text-accent underline">https://staging.devsrecipe.app/v1.4</span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-primary/30 bg-primary-soft/40 p-4">
                    <p className="text-xs text-ink font-medium">
                      <span className="text-primary font-bold">The Friday Rhythm:</span> Every Friday at 4 PM, you receive a working staging link. You click, test real transactions, and provide immediate feedback.
                    </p>
                  </div>
                </div>
              )}

              {/* STAGE 04: LAUNCH & 30-DAY GUARANTEE */}
              {activeStage === 3 && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest">
                        Zero-Downtime Rollout & Support
                      </span>
                      <h4 className="mt-1 text-xl font-bold text-ink">
                        Guaranteed 30-Day Fixes Included
                      </h4>
                    </div>
                    <span className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-bold text-emerald-400">
                      Day 30+ Guarantee
                    </span>
                  </div>

                  {/* Production Health Metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-border bg-surface-2 p-4">
                      <span className="font-mono text-[10px] text-muted uppercase">Deployment Reliability</span>
                      <p className="mt-1 text-2xl font-bold text-emerald-400">99.99%</p>
                      <p className="text-[11px] text-muted mt-1">Zero-downtime blue/green rollout</p>
                    </div>

                    <div className="rounded-2xl border border-border bg-surface-2 p-4">
                      <span className="font-mono text-[10px] text-muted uppercase">Fix Guarantee Period</span>
                      <p className="mt-1 text-2xl font-bold text-accent">30 Days</p>
                      <p className="text-[11px] text-muted mt-1">Free bug fixes & performance tuning</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-ground font-bold">
                        ✓
                      </span>
                      <div>
                        <p className="text-xs font-bold text-ink">Complete Code & Key Ownership</p>
                        <p className="text-[11px] text-muted">
                          You receive 100% of the repository, deployment credentials, database ownership, and documentation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Console Footer Status Strip */}
              <div className="mt-6 border-t border-border/80 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-muted uppercase tracking-wider text-[11px]">Primary Artifact:</span>
                  <span className="font-bold text-ink">{active.deliverable}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-muted uppercase tracking-wider text-[11px]">Client Time Commitment:</span>
                  <span className="font-semibold text-accent">{active.commitment}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 2: 4-STAGE PANORAMIC FLOW (Connected Bento Rail)    */}
      {/* ======================================================== */}
      {viewMode === "pipeline" && (
        <div className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STAGES.map((s, idx) => {
              const isSelected = activeStage === idx;
              const stepData = steps[idx];

              return (
                <div
                  key={s.number}
                  onClick={() => setActiveStage(idx)}
                  className={`group relative flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "border-2 border-primary bg-surface shadow-2xl shadow-primary/15 -translate-y-2"
                      : "border border-border/70 bg-surface/70 hover:border-primary/40 hover:bg-surface hover:-translate-y-1"
                  }`}
                >
                  <div>
                    {/* Header: Step Number + Timing Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <div
                        className={`flex size-11 items-center justify-center rounded-2xl font-mono text-base font-bold transition-all ${
                          isSelected
                            ? "bg-primary text-ground shadow-md shadow-primary/25 scale-105"
                            : "border border-primary/30 bg-primary-soft text-primary"
                        }`}
                      >
                        {s.number}
                      </div>
                      <span className="rounded-full border border-border/70 bg-surface-2 px-2.5 py-0.5 font-mono text-[10px] text-muted">
                        {s.timing}
                      </span>
                    </div>

                    {/* Phase tag */}
                    <p className="mt-5 font-mono text-[10px] font-bold tracking-widest text-primary/80 uppercase">
                      {s.phase}
                    </p>

                    {/* Stage Name */}
                    <h3 className="mt-1 text-2xl font-bold tracking-tight text-ink">
                      {s.title}
                    </h3>

                    {/* 1-Sentence Punchline */}
                    <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-muted group-hover:text-ink/90">
                      {stepData?.text || s.punchline}
                    </p>
                  </div>

                  {/* Card Bottom Deliverable */}
                  <div className="mt-6 border-t border-border/60 pt-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-accent">
                      <svg className="size-3.5 shrink-0" viewBox="0 0 16 16" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{s.deliverable}</span>
                    </div>

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
      )}
    </div>
  );
}
