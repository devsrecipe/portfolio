"use client";

import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: "0.6em", rotateX: -40 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] },
  },
};

type Part = { text: string; highlight?: boolean };

/** H1 whose words rise in one by one. The highlighted word gets an underline that draws in. */
export function HeroHeadline({ id, parts }: { id: string; parts: Part[] }) {
  return (
    <motion.h1
      id={id}
      variants={container}
      initial="hidden"
      animate="show"
      style={{ perspective: 600 }}
      className="mt-6 text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl"
    >
      {parts.flatMap((part, p) =>
        part.text.split(" ").map((w, i) => (
          <motion.span
            key={`${p}-${i}`}
            variants={word}
            className={
              part.highlight
                ? "relative mr-[0.25em] inline-block text-primary"
                : "mr-[0.25em] inline-block"
            }
          >
            {w}
            {part.highlight ? (
              <motion.span
                aria-hidden
                className="absolute inset-x-0 -bottom-1 h-1 origin-left rounded-full bg-accent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
              />
            ) : null}
          </motion.span>
        )),
      )}
    </motion.h1>
  );
}
