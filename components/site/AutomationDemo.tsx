"use client";

import { motion } from "framer-motion";
import { useRef, useState, type KeyboardEvent } from "react";
import { LogoMark } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";
import type { AutomationScenario } from "@/types";

const rowY = [16.5, 50, 83.5];

function NodeIcon({ done }: { done?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-7 shrink-0 place-items-center rounded-full text-xs",
        done ? "bg-success-soft text-success" : "bg-primary-soft text-primary",
      )}
    >
      {done ? "✓" : "↓"}
    </span>
  );
}

function Node({
  title,
  meta,
  done,
  index,
}: {
  title: string;
  meta: string;
  done?: boolean;
  index: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, x: done ? 24 : -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay: 0.1 + index * 0.1, ease: [0.2, 0.7, 0.2, 1] }}
      whileHover={{ scale: 1.03 }}
      className="flex items-center gap-2.5 rounded-xl border border-border bg-surface-2 p-2.5"
    >
      <NodeIcon done={done} />
      <div className="min-w-0">
        <p className="truncate text-[0.8rem] font-semibold leading-tight">{title}</p>
        <p className="truncate text-[0.68rem] text-muted">{meta}</p>
      </div>
    </motion.li>
  );
}

export function AutomationDemo({ scenarios }: { scenarios: AutomationScenario[] }) {
  const [index, setIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = scenarios[index];

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const last = scenarios.length - 1;
    let next = index;
    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;
    event.preventDefault();
    setIndex(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 shadow-2xl shadow-black/40 sm:p-6">
      <div className="flex items-center justify-between gap-3 font-mono text-[0.7rem] uppercase tracking-widest">
        <p className="flex items-center gap-2 text-ink">
          <span aria-hidden className="size-1.5 rounded-full bg-success" />
          Example automation · {active.title}
        </p>
        <p className="hidden normal-case tracking-normal text-muted sm:block">
          Pick an industry
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Pick an industry"
        className="mt-4 flex flex-wrap gap-2"
      >
        {scenarios.map((s, i) => (
          <button
            key={s.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            id={`demo-tab-${s.id}`}
            aria-selected={i === index}
            aria-controls="demo-panel"
            tabIndex={i === index ? 0 : -1}
            onClick={() => setIndex(i)}
            onKeyDown={onKeyDown}
            className={cn(
              "relative rounded-full border px-3.5 py-1.5 text-[0.8rem] font-medium transition-colors",
              i === index
                ? "border-primary text-ground"
                : "border-border text-ink hover:bg-surface-2",
            )}
          >
            {i === index ? (
              <motion.span
                layoutId="demo-tab-pill"
                aria-hidden
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            ) : null}
            <span className="relative">{s.tab}</span>
          </button>
        ))}
      </div>

      <motion.div
        key={active.id}
        id="demo-panel"
        role="tabpanel"
        aria-labelledby={`demo-tab-${active.id}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mt-6 flex justify-between font-mono text-[0.65rem] uppercase tracking-widest text-muted">
          <span>Comes in</span>
          <span>Gets done</span>
        </div>

        <div className="relative mt-3 [background-image:radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:16px_16px]">
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 size-full"
          >
            {rowY.map((y, i) => (
              <g key={y} fill="none" stroke="var(--color-border)" strokeWidth="1.5">
                <path
                  vectorEffect="non-scaling-stroke"
                  d={`M33 ${y} C 42 ${y}, 42 50, 50 50`}
                />
                <path
                  vectorEffect="non-scaling-stroke"
                  d={`M67 ${y} C 58 ${y}, 58 50, 50 50`}
                />
                <path
                  vectorEffect="non-scaling-stroke"
                  className="flow-line"
                  stroke={i === 1 ? "var(--color-primary)" : "var(--color-success)"}
                  d={`M33 ${y} C 42 ${y}, 42 50, 50 50`}
                />
              </g>
            ))}
          </svg>

          <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-x-4 py-2">
            <ul className="flex h-64 flex-col justify-between">
              {active.inputs.map((n, i) => (
                <Node key={n.title} {...n} index={i} />
              ))}
            </ul>
            <div className="flex flex-col items-center gap-2">
              <div className="hub-pulse grid size-16 place-items-center rounded-2xl bg-primary text-ground shadow-lg shadow-primary/30">
                <LogoMark className="size-9" />
              </div>
              <span className="font-mono text-[0.6rem] uppercase tracking-widest text-muted">
                Your system
              </span>
            </div>
            <ul className="flex h-64 flex-col justify-between">
              {active.outputs.map((n, i) => (
                <Node key={n.title} {...n} index={i} done />
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5 border-t border-border pt-4">
          <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">
            Handled automatically
          </p>
          <ol className="mt-2 space-y-1.5">
            {active.handled.map((line, i) => (
              <motion.li
                key={line}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.35 }}
                className="flex gap-3 text-sm"
              >
                <span className="font-mono text-xs leading-5 text-success">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {line}
              </motion.li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-muted">
            An example of the systems we build. Every step above is usually done by hand.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
