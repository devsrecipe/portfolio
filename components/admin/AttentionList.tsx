import { Card } from "@/components/ui/Card";
import { attention } from "@/content/admin";
import { cn } from "@/lib/utils";

const tones = {
  primary: { row: "bg-primary-soft", dot: "bg-primary" },
  warning: { row: "bg-accent-soft", dot: "bg-accent" },
  neutral: { row: "bg-surface-2", dot: "bg-muted" },
};

export function AttentionList() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold">Needs your attention</h2>
      <ul className="mt-5 space-y-3">
        {attention.map((item) => (
          <li
            key={item.title}
            className={cn("flex gap-3 rounded-xl p-4", tones[item.tone].row)}
          >
            <span
              aria-hidden
              className={cn("mt-2 size-2.5 shrink-0 rounded-full", tones[item.tone].dot)}
            />
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-muted">{item.note}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
