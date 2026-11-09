"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState, type ReactNode } from "react";
import { EASE_OUT } from "@/components/motion/ease";

/**
 * Sticky header that slips away while you scroll down and returns the moment
 * you scroll up. Transparent over the hero; gains a blurred cream backing and a
 * hairline once the page has moved.
 */
export function SmartHeader({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 12);
    // Small moves (trackpad jitter) don't toggle it.
    if (Math.abs(y - previous) < 4) return;
    setHidden(y > 180 && y > previous);
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      data-scrolled={scrolled}
      className="sticky top-0 z-40 border-b border-transparent transition-[background-color,border-color] duration-500 data-[scrolled=true]:border-border data-[scrolled=true]:bg-ground/80 data-[scrolled=true]:backdrop-blur-xl"
    >
      {children}
    </motion.header>
  );
}
