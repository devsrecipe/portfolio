import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { LoadingBlock } from "@/components/admin/LoadingBlock";
import { PageHeader } from "@/components/admin/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getJobsWithCounts } from "@/lib/admin-data";

export const metadata: Metadata = { title: "Jobs" };

async function JobsTable() {
  const rows = await getJobsWithCounts();
  return (
    <Card className="overflow-x-auto">
      <table className="w-full min-w-[34rem] text-left">
        <caption className="sr-only">Jobs</caption>
        <thead className="text-sm text-muted">
          <tr className="border-b border-border">
            <th scope="col" className="px-5 py-4 font-medium">
              Role
            </th>
            <th scope="col" className="px-3 py-4 font-medium">
              Status
            </th>
            <th scope="col" className="px-3 py-4 font-medium">
              Closes
            </th>
            <th scope="col" className="px-5 py-4 font-medium">
              Applicants
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((job) => (
            <tr
              key={job.slug}
              className="border-b border-border last:border-0 hover:bg-surface-2"
            >
              <th scope="row" className="px-5 py-4 text-left font-semibold">
                <Link href={`/careers/${job.slug}`} className="hover:text-primary">
                  {job.title}
                </Link>
              </th>
              <td className="px-3 py-4">
                <Badge variant={job.open ? "success" : "neutral"}>
                  {job.open ? "Open" : "Closed"}
                </Badge>
              </td>
              <td className="px-3 py-4 text-muted">{job.closes}</td>
              <td className="px-5 py-4">
                <Link href="/admin/applications" className="hover:text-primary">
                  {job.total}
                  {job.fresh > 0 ? (
                    <span className="ml-2 text-accent">({job.fresh} new)</span>
                  ) : null}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

export default function AdminJobsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Jobs"
        note="Roles from content/jobs.ts · applicant counts are live"
      />
      <Suspense fallback={<LoadingBlock />}>
        <JobsTable />
      </Suspense>
    </div>
  );
}
