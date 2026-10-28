import type { Metadata } from "next";
import { Suspense } from "react";
import { LoadingBlock } from "@/components/admin/LoadingBlock";
import { PageHeader } from "@/components/admin/PageHeader";
import { Card } from "@/components/ui/Card";
import { getSubscribers } from "@/lib/admin-data";

export const metadata: Metadata = { title: "Subscribers" };

async function SubscribersTable() {
  const subscribers = await getSubscribers();
  return (
    <Card className="overflow-x-auto">
      <table className="w-full min-w-[26rem] text-left">
        <caption className="sr-only">Newsletter subscribers</caption>
        <thead className="text-sm text-muted">
          <tr className="border-b border-border">
            <th scope="col" className="px-5 py-4 font-medium">
              Email
            </th>
            <th scope="col" className="px-3 py-4 font-medium">
              Joined
            </th>
            <th scope="col" className="px-5 py-4 font-medium">
              Source
            </th>
          </tr>
        </thead>
        <tbody>
          {subscribers.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-5 py-10 text-center text-muted">
                No subscribers yet. Signups from the footer form appear here.
              </td>
            </tr>
          ) : null}
          {subscribers.map((s) => (
            <tr
              key={s.id}
              className="border-b border-border last:border-0 hover:bg-surface-2"
            >
              <th scope="row" className="px-5 py-4 text-left font-semibold">
                {s.email}
              </th>
              <td className="px-3 py-4 text-muted">{s.joined}</td>
              <td className="px-5 py-4 text-muted">{s.source}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

export default function SubscribersPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Subscribers" note="Live data" />
      <Suspense fallback={<LoadingBlock />}>
        <SubscribersTable />
      </Suspense>
    </div>
  );
}
