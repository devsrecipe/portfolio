"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.2, 0.7, 0.2, 1] as const;
const viewport = { once: true, margin: "0px 0px -80px 0px" } as const;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

/** Fades and lifts its children in once, when they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.6, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

type ListProps = { children: ReactNode; className?: string; stagger?: number };

function listVariants(stagger: number): Variants {
  return { hidden: {}, show: { transition: { staggerChildren: stagger } } };
}

/** `<ul>` whose `StaggerItem` children animate in one after another. */
export function StaggerList({ children, className, stagger = 0.08 }: ListProps) {
  return (
    <motion.ul
      className={className}
      variants={listVariants(stagger)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {children}
    </motion.ul>
  );
}

export function StaggerOrderedList({ children, className, stagger = 0.1 }: ListProps) {
  return (
    <motion.ol
      className={className}
      variants={listVariants(stagger)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {children}
    </motion.ol>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.li className={className} variants={itemVariants}>
      {children}
    </motion.li>
  );
}
