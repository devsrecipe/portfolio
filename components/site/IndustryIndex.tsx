"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import Link from "next/link";
import { useState, type PointerEvent } from "react";
import { EASE_OUT } from "@/components/motion/ease";
import { IndustryIcon } from "@/components/site/IndustryIcon";
import type { Industry } from "@/types";

const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const row: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE_OUT } },
};

/**
 * Editorial index of industries: one large row each. On hover a row fills from
 * the bottom, its name slides and a terracotta preview card follows the cursor
 * (springs), swapping to that industry's icon and build list. The preview is
 * only for fine pointers; touch and keyboard users get plain links.
 */
export function IndustryIndex({ industries }: { industries: Industry[] }) {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });

  function move(e: PointerEvent<HTMLUListElement>) {
    const box = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - box.left);
    y.set(e.clientY - box.top);
  }

  const current = active === null ? null : industries[active];

  return (
    <div className="relative">
      <motion.ul
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -80px 0px" }}
        onPointerMove={move}
        onPointerLeave={() => setActive(null)}
        className="border-t border-border"
      >
        {industries.map((industry, i) => (
          <motion.li
            key={industry.slug}
            variants={row}
            onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
            className="border-b border-border"
          >
            <Link
              href={`/solutions/${industry.slug}`}
              className="group relative isolate grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 py-6 before:absolute before:inset-0 before:-z-10 before:origin-bottom before:scale-y-0 before:bg-surface before:transition-transform before:duration-700 before:ease-(--ease-out) hover:before:scale-y-100 sm:py-7 lg:grid-cols-[5rem_minmax(0,1fr)_minmax(0,24rem)_3.5rem] lg:gap-x-8 lg:py-9"
            >
              <span className="self-start pt-2 font-mono text-xs text-muted transition-colors duration-500 group-hover:text-primary lg:self-center lg:pt-0 lg:pl-4 lg:text-sm">
                {industry.number}
              </span>
              <span className="min-w-0">
                <span className="block font-display text-[clamp(1.75rem,3.4vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.035em] transition-[translate,color] duration-700 ease-(--ease-out) group-hover:translate-x-3 group-hover:text-primary">
                  {industry.name}
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-muted lg:hidden">
                  {industry.pain}
                </span>
              </span>
              <span className="hidden text-[0.95rem] leading-relaxed text-muted lg:line-clamp-2">
                {industry.pain}
              </span>
              <span
                aria-hidden
                className="grid size-11 place-items-center rounded-full border border-border transition-all duration-500 ease-(--ease-out) group-hover:border-primary group-hover:bg-primary group-hover:text-ground lg:mr-4 lg:size-12"
              >
                <svg
                  viewBox="0 0 16 16"
                  className="size-4 -rotate-45 transition-transform duration-500 ease-(--ease-out) group-hover:rotate-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 8h12M9 3l5 5-5 5" />
                </svg>
              </span>
            </Link>
          </motion.li>
        ))}
      </motion.ul>

      {/* Cursor-following preview (desktop, fine pointer only). */}
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none absolute left-0 top-0 z-10 hidden [@media(hover:hover)_and_(pointer:fine)]:lg:block"
      >
        <motion.div
          initial={false}
          animate={{ scale: current ? 1 : 0.6, opacity: current ? 1 : 0, rotate: current ? -4 : 6 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="w-72 -translate-y-1/2 translate-x-8 overflow-hidden rounded-[1.75rem] bg-primary p-6 text-ground shadow-[0_30px_60px_-20px_rgba(28,23,20,0.45)]"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {current ? (
              <motion.div
                key={current.slug}
                initial={{ y: 48, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -48, opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
              >
                <div className="flex items-start justify-between">
                  <span className="grid size-16 place-items-center rounded-2xl bg-ground/15">
                    <IndustryIcon slug={current.slug} className="size-8" />
                  </span>
                  <span className="font-mono text-xs opacity-70">{current.number}</span>
                </div>
                <p className="mt-6 font-mono text-[0.65rem] uppercase tracking-[0.14em] opacity-70">
                  What we build
                </p>
                <ul className="mt-3 space-y-1.5 text-sm font-medium">
                  {current.build.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden className="opacity-60">
                        —
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
