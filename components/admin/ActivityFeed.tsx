import { Card } from "@/components/ui/Card";
import { recentActivity } from "@/content/admin";

export function ActivityFeed() {
  return (
    <Card className="self-start p-6">
      <h2 className="text-xl font-semibold">Recent activity</h2>
      <ul className="mt-5 space-y-3 text-[0.95rem]">
        {recentActivity.map((a) => (
          <li key={a.text} className="flex justify-between gap-4">
            <span>{a.text}</span>
            <span className="shrink-0 text-muted">{a.when}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
