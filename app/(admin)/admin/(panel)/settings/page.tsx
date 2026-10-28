import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Field, Input } from "@/components/ui/Field";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Settings" />
      <Card className="max-w-2xl p-6 sm:p-8">
        <form className="space-y-5">
          <Field label="Site name" htmlFor="s-name">
            <Input id="s-name" defaultValue={site.name} />
          </Field>
          <Field label="Contact email" htmlFor="s-email">
            <Input id="s-email" type="email" defaultValue={site.contact.email} />
          </Field>
          <Field label="Reply time promise" htmlFor="s-reply">
            <Input id="s-reply" defaultValue={site.replyNote} />
          </Field>
          <Button type="submit">Save settings</Button>
        </form>
      </Card>
    </div>
  );
}
