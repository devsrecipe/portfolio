import type { Metadata } from "next";
import { ApplicationsView } from "@/components/admin/ApplicationsView";
import { PageHeader } from "@/components/admin/PageHeader";

export const metadata: Metadata = { title: "Applications" };

export default function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Applications" />
      <ApplicationsView />
    </div>
  );
}
