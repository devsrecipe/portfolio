"use client";

import { useState } from "react";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Toggle } from "@/components/ui/Toggle";
import { adminStories, storyFilterCounts, type AdminStory } from "@/content/admin";
import { cn } from "@/lib/utils";
import type { StoryStatus } from "@/types";

type Filter = "all" | StoryStatus;

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "completed", label: "Completed" },
  { key: "in-progress", label: "In progress" },
  { key: "draft", label: "Draft" },
];

const statusLabel: Record<StoryStatus, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  draft: "Draft",
};

const statusBadge: Record<StoryStatus, BadgeVariant> = {
  completed: "success",
  "in-progress": "warning",
  draft: "neutral",
};

export function StoriesTable() {
  const [filter, setFilter] = useState<Filter>("all");
  const [rows, setRows] = useState<AdminStory[]>(adminStories);

  const visible = filter === "all" ? rows : rows.filter((r) => r.status === filter);

  function setStatus(id: string, status: StoryStatus) {
    setRows((current) => current.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  return (
    <div className="space-y-5">
      <div role="group" aria-label="Filter stories" className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const count = storyFilterCounts[f.key];
          const on = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(f.key)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold",
                on ? "border-ink bg-ink text-ground" : "border-border hover:bg-surface-2",
              )}
            >
              {f.label} · {count}
            </button>
          );
        })}
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full min-w-[44rem] text-left text-[0.95rem]">
          <caption className="sr-only">Success stories</caption>
          <thead className="text-sm text-muted">
            <tr className="border-b border-border">
              <th scope="col" className="px-5 py-4 font-medium">
                Story
              </th>
              <th scope="col" className="px-3 py-4 font-medium">
                Industry
              </th>
              <th scope="col" className="px-3 py-4 font-medium">
                Status
              </th>
              <th scope="col" className="px-3 py-4 font-medium">
                Last updated
              </th>
              <th scope="col" className="px-5 py-4 font-medium">
                On homepage
              </th>
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <tr
                key={row.id}
                className={cn(
                  "border-b border-border last:border-0",
                  row.stale ? "bg-accent-soft" : "hover:bg-surface-2",
                )}
              >
                <th scope="row" className="px-5 py-4 text-left font-semibold">
                  {row.title}
                  {row.stale ? (
                    <span className="mt-0.5 block text-sm font-normal text-accent">
                      {row.stale}
                    </span>
                  ) : null}
                </th>
                <td className="px-3 py-4">{row.industry}</td>
                <td className="px-3 py-4">
                  {row.status === "draft" ? (
                    <Badge variant={statusBadge[row.status]}>
                      {statusLabel[row.status]}
                    </Badge>
                  ) : (
                    <>
                      <label htmlFor={`status-${row.id}`} className="sr-only">
                        Status for {row.title}
                      </label>
                      <select
                        id={`status-${row.id}`}
                        value={row.status}
                        onChange={(e) => setStatus(row.id, e.target.value as StoryStatus)}
                        className={cn(
                          "rounded-full border-0 px-3 py-1 text-xs font-semibold",
                          row.status === "completed"
                            ? "bg-success-soft text-success"
                            : "bg-accent-soft text-accent",
                        )}
                      >
                        <option value="completed">Completed</option>
                        <option value="in-progress">In progress</option>
                      </select>
                    </>
                  )}
                </td>
                <td className="px-3 py-4 text-muted">{row.updated}</td>
                <td className="px-5 py-4">
                  <Toggle
                    label={`Show ${row.title} on homepage`}
                    defaultOn={row.onHomepage}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <p className="text-sm text-muted">
        Change a status right in the table. A story marked Completed asks for its result
        numbers and client quote before it can be published.
      </p>
    </div>
  );
}
