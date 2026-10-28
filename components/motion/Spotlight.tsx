"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

/**
 * Tracks the mouse across a group of `.spotlight-card` children and gives each one
 * the pointer position (--x / --y) relative to itself, so a glow follows the cursor
 * across every card at once.
 */
export function Spotlight({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      ref.current?.querySelectorAll<HTMLElement>(".spotlight-card").forEach((card) => {
        const box = card.getBoundingClientRect();
        card.style.setProperty("--x", `${clientX - box.left}px`);
        card.style.setProperty("--y", `${clientY - box.top}px`);
      });
    });
  }

  function onLeave() {
    cancelAnimationFrame(frame.current);
    ref.current?.querySelectorAll<HTMLElement>(".spotlight-card").forEach((card) => {
      card.style.removeProperty("--x");
      card.style.removeProperty("--y");
    });
  }

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={className}>
      {children}
    </div>
  );
}
