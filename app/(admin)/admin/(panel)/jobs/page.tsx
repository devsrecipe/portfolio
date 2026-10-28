import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { adminJobs } from "@/content/admin";

export const metadata: Metadata = { title: "Jobs" };

export default function AdminJobsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Jobs"
        actions={
          <ButtonLink href="/admin/jobs" size="sm">
            Post a job
          </ButtonLink>
        }
      />
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[30rem] text-left">
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
            {adminJobs.map((job) => (
              <tr
                key={job.slug}
                className="border-b border-border last:border-0 hover:bg-surface-2"
              >
                <th scope="row" className="px-5 py-4 text-left font-semibold">
                  {job.title}
                </th>
                <td className="px-3 py-4">
                  <Badge variant="success">{job.status}</Badge>
                </td>
                <td className="px-3 py-4 text-muted">{job.closes}</td>
                <td className="px-5 py-4">{job.applicants}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
