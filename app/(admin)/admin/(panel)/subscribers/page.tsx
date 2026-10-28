import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { Card } from "@/components/ui/Card";
import { subscribers } from "@/content/admin";

export const metadata: Metadata = { title: "Subscribers" };

export default function SubscribersPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Subscribers" />
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
            {subscribers.map((s) => (
              <tr
                key={s.email}
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
    </div>
  );
}
