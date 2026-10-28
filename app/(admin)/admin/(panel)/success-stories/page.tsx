import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { StoriesTable } from "@/components/admin/StoriesTable";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Success stories" };

export default function AdminStoriesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Success stories"
        actions={
          <ButtonLink href="/admin/success-stories" size="sm">
            New story
          </ButtonLink>
        }
      />
      <StoriesTable />
    </div>
  );
}
