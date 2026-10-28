import type { Metadata } from "next";
import { ActivityFeed } from "@/components/admin/ActivityFeed";
import { AttentionList } from "@/components/admin/AttentionList";
import { PageHeader } from "@/components/admin/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { StatCard } from "@/components/ui/StatCard";
import { overviewStats } from "@/content/admin";

export const metadata: Metadata = { title: "Overview" };

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Good afternoon"
        actions={
          <>
            <ButtonLink href="/admin/blog/new" variant="secondary" size="sm">
              New blog post
            </ButtonLink>
            <ButtonLink href="/admin/success-stories" variant="secondary" size="sm">
              New success story
            </ButtonLink>
            <ButtonLink href="/admin/jobs" size="sm">
              Post a job
            </ButtonLink>
          </>
        }
      />
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overviewStats.map((stat) => (
          <li key={stat.label}>
            <StatCard {...stat} />
          </li>
        ))}
      </ul>
      <div className="grid gap-6 xl:grid-cols-[1.1fr_1fr]">
        <AttentionList />
        <ActivityFeed />
      </div>
    </div>
  );
}
