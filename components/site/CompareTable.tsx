"use client";

import { motion, type Variants } from "framer-motion";
import { LogoMark } from "@/components/brand/Logo";
import { EASE_OUT } from "@/components/motion/ease";
import { content } from "@/content";
import { cn } from "@/lib/utils";

type Compare = typeof content.home.compare;
type Verdict = Compare["rows"][number]["answers"][number]["verdict"];

const rowIn: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};
const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const viewport = { once: true, margin: "0px 0px -80px 0px" } as const;

/** ✓ / ~ / ✕ mark. The word is read out to screen readers; the mark is decorative. */
function Mark({ verdict, label, strong }: { verdict: Verdict; label: string; strong?: boolean }) {
  return (
    <>
      <span
        aria-hidden
        className={cn(
          "grid size-6 shrink-0 place-items-center rounded-full text-[0.7rem] font-bold",
          verdict === "yes" && (strong ? "bg-primary text-ground" : "bg-success-soft text-success"),
          verdict === "partly" && "border border-accent/50 text-accent",
          verdict === "no" && "bg-surface-2 text-muted",
        )}
      >
        {verdict === "yes" ? "✓" : verdict === "partly" ? "~" : "✕"}
      </span>
      <span className="sr-only">{label}: </span>
    </>
  );
}

/**
 * "Compare before you choose": buyer questions down the side, a clear mark plus
 * a short answer for each option. Devs Recipe's column is a raised card.
 * Desktop and tablet get a real table; phones get one card per question.
 */
export function CompareTable() {
  const { columns, rows, caption, verdicts, note } = content.home.compare;

  return (
    <div>
      {/* Tablet and desktop */}
      <motion.table
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="hidden w-full border-separate border-spacing-0 text-left md:table"
      >
        <caption className="sr-only">{caption}</caption>
        <colgroup>
          <col className="w-[34%]" />
          <col className="w-[26%]" />
          <col className="w-[20%]" />
          <col className="w-[20%]" />
        </colgroup>
        <thead>
          <tr>
            <td />
            {columns.map((col, i) => (
              <th
                key={col}
                scope="col"
                className={cn(
                  "px-6 pb-5 pt-6 align-bottom text-sm font-semibold",
                  i === 0 ? "rounded-t-3xl border-x border-t border-border bg-ground" : "text-muted",
                )}
              >
                {i === 0 ? (
                  <span className="flex items-center gap-2.5 text-base text-ink">
                    <LogoMark className="size-6! text-primary" />
                    {col}
                  </span>
                ) : (
                  col
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => {
            const last = r === rows.length - 1;
            return (
              <motion.tr key={row.question} variants={rowIn}>
                <th
                  scope="row"
                  className="border-t border-border py-6 pr-8 align-top font-display text-lg font-bold leading-snug tracking-[-0.02em] lg:text-xl"
                >
                  {row.question}
                </th>
                {row.answers.map((answer, i) => (
                  <td
                    key={columns[i]}
                    className={cn(
                      "px-6 py-6 align-top",
                      i === 0
                        ? cn("border-x border-t border-border bg-ground", last && "rounded-b-3xl border-b")
                        : "border-t border-border",
                    )}
                  >
                    <span className="flex gap-3">
                      <Mark verdict={answer.verdict} label={verdicts[answer.verdict]} strong={i === 0} />
                      <span className={cn("pt-0.5 text-[0.95rem] leading-snug", i === 0 ? "font-medium text-ink" : "text-muted")}>
                        {answer.text}
                      </span>
                    </span>
                  </td>
                ))}
              </motion.tr>
            );
          })}
        </tbody>
      </motion.table>

      {/* Phones: one card per question */}
      <motion.ol variants={list} initial="hidden" whileInView="show" viewport={viewport} className="space-y-5 md:hidden">
        {rows.map((row) => (
          <motion.li key={row.question} variants={rowIn} className="rounded-3xl border border-border bg-ground p-5">
            <h3 className="font-display text-lg font-bold leading-snug tracking-[-0.02em]">{row.question}</h3>
            <dl className="mt-4 space-y-3">
              {row.answers.map((answer, i) => (
                <div
                  key={columns[i]}
                  className={cn("flex gap-3 rounded-2xl p-3", i === 0 ? "bg-primary-soft" : "")}
                >
                  <Mark verdict={answer.verdict} label={verdicts[answer.verdict]} strong={i === 0} />
                  <div className="min-w-0">
                    <dt className={cn("text-xs font-semibold", i === 0 ? "text-primary" : "text-muted")}>{columns[i]}</dt>
                    <dd className={cn("text-sm leading-snug", i === 0 ? "font-medium text-ink" : "text-muted")}>
                      {answer.text}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </motion.li>
        ))}
      </motion.ol>

      {/* Legend and an honest footnote */}
      <div className="mt-8 flex flex-col gap-4 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p className="flex flex-wrap items-center gap-x-5 gap-y-2" aria-hidden>
          {(["yes", "partly", "no"] as const).map((v) => (
            <span key={v} className="flex items-center gap-2">
              <Mark verdict={v} label={verdicts[v]} />
              {verdicts[v]}
            </span>
          ))}
        </p>
        <p className="max-w-md md:text-right">{note}</p>
      </div>
    </div>
  );
}
