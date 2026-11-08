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

/** H1 whose words rise in one by one. The highlighted word is set in italic in the primary colour. */
export function HeroHeadline({ id, parts }: { id: string; parts: Part[] }) {
  return (
    <motion.h1
      id={id}
      variants={container}
      initial="hidden"
      animate="show"
      style={{ perspective: 600 }}
      className="mt-6 font-display text-[3.25rem] font-bold leading-[1.04] tracking-[-0.03em] sm:text-6xl lg:text-[4.5rem]"
    >
      {parts.flatMap((part, p) =>
        part.text.split(" ").map((w, i) => (
          <motion.span
            key={`${p}-${i}`}
            variants={word}
            className={
              part.highlight
                ? "mr-[0.25em] inline-block text-primary"
                : "mr-[0.25em] inline-block"
            }
          >
            {w}
          </motion.span>
        )),
      )}
    </motion.h1>
  );
}
