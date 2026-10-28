import type { Metadata } from "next";
import { Suspense } from "react";
import { ActivityFeed } from "@/components/admin/ActivityFeed";
import { AttentionList } from "@/components/admin/AttentionList";
import { LoadingBlock } from "@/components/admin/LoadingBlock";
import { PageHeader } from "@/components/admin/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { StatCard } from "@/components/ui/StatCard";
import { getOverview } from "@/lib/admin-data";

export const metadata: Metadata = { title: "Overview" };

async function OverviewData() {
  const { stats, attention, activity } = await getOverview();
  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <li key={stat.label}>
            <StatCard {...stat} />
          </li>
        ))}
      </ul>
      <div className="grid gap-6 xl:grid-cols-[1.1fr_1fr]">
        <AttentionList items={attention} />
        <ActivityFeed items={activity} />
      </div>
    </>
  );
}

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Overview"
        note="Live data"
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
      <Suspense fallback={<LoadingBlock />}>
        <OverviewData />
      </Suspense>
    </div>
  );
}
