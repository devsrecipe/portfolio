import type { Metadata } from "next";
import { Suspense } from "react";
import { ApplicationsView } from "@/components/admin/ApplicationsView";
import { LoadingBlock } from "@/components/admin/LoadingBlock";
import { PageHeader } from "@/components/admin/PageHeader";
import { jobs } from "@/content/jobs";
import { getApplications } from "@/lib/admin-data";

export const metadata: Metadata = { title: "Applications" };

async function ApplicationsData() {
  const { applicants, jobOptions } = await getApplications();
  return (
    <ApplicationsView
      applicants={applicants}
      jobOptions={jobOptions}
      retentionMonths={Object.fromEntries(jobs.map((j) => [j.slug, j.retentionMonths]))}
    />
  );
}

export default function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Applications" note="Live data" />
      <Suspense fallback={<LoadingBlock />}>
        <ApplicationsData />
      </Suspense>
    </div>
  );
}
