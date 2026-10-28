import { Card } from "@/components/ui/Card";
import type { ActivityItem } from "@/types/admin";

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <Card className="self-start p-6">
      <h2 className="text-xl font-semibold">Recent activity</h2>
      {items.length === 0 ? (
        <p className="mt-5 text-muted">
          Nothing yet. Messages, subscribers and applications appear here.
        </p>
      ) : (
        <ul className="mt-5 space-y-3 text-[0.95rem]">
          {items.map((a, i) => (
            <li key={`${a.text}-${i}`} className="flex justify-between gap-4">
              <span>{a.text}</span>
              <span className="shrink-0 text-muted">{a.when}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
