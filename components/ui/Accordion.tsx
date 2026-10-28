import type { FaqItem } from "@/types";

/** Native <details>: works without JavaScript. */
export function Accordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item) => (
        <details key={item.question} className="group py-5">
          <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-semibold">
            {item.question}
            <span
              aria-hidden
              className="text-xl text-primary transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-prose text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
