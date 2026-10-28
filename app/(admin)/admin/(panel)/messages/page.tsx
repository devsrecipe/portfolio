import type { Metadata } from "next";
import { Suspense } from "react";
import { LoadingBlock } from "@/components/admin/LoadingBlock";
import { PageHeader } from "@/components/admin/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getMessages } from "@/lib/admin-data";

export const metadata: Metadata = { title: "Messages" };

async function MessagesList() {
  const messages = await getMessages();
  if (messages.length === 0) {
    return (
      <Card className="p-10 text-center text-muted">
        No messages yet. Anything sent through the homepage contact form appears here.
      </Card>
    );
  }
  return (
    <ul className="space-y-4">
      {messages.map((m) => (
        <li key={m.id}>
          <Card className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{m.name}</p>
                <a
                  href={`mailto:${m.email}`}
                  className="text-sm text-primary hover:underline"
                >
                  {m.email}
                </a>
              </div>
              <span className="text-sm text-muted">{m.received}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge>{m.businessType}</Badge>
              <Badge variant="warning">{m.budget}</Badge>
            </div>
            <p className="mt-4 whitespace-pre-line">{m.message}</p>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export default function MessagesPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Messages" note="Live data · from the contact form" />
      <Suspense fallback={<LoadingBlock />}>
        <MessagesList />
      </Suspense>
    </div>
  );
}
