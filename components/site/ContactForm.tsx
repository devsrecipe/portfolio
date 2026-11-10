"use client";

import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import type { SiteContent } from "@/types";
import { FormError } from "./FormError";
import { FormHiddenFields } from "./FormHiddenFields";
import { useFormService, type FormMessages } from "./useFormService";

type Props = {
  config: SiteContent["forms"]["contact"];
  messages: FormMessages;
  contactEmail: string;
};

export function ContactForm({ config, messages, contactEmail }: Props) {
  const { status, error, sending, onSubmit, onInvalid, reset } = useFormService(config.endpoint, messages);
  const { labels } = config;

  if (status === "success") {
    return (
      <div role="status" className="rounded-3xl border border-border bg-surface p-8">
        <h3 className="text-2xl font-bold">{config.successTitle}</h3>
        <p className="mt-2 text-muted">{config.successText}</p>
        <Button variant="secondary" className="mt-6" onClick={reset}>
          {config.sendAnother}
        </Button>
      </div>
    );
  }

  return (
    <form
      action={config.endpoint || undefined}
      method="post"
      onSubmit={onSubmit}
      onInvalidCapture={onInvalid}
      className="rounded-3xl border border-border bg-surface p-6 sm:p-8"
    >
      <FormHiddenFields form="Contact" subject="New message from the website" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={labels.name} htmlFor="c-name">
          <Input id="c-name" name="name" autoComplete="name" required />
        </Field>
        <Field label={labels.email} htmlFor="c-email">
          <Input id="c-email" name="email" type="email" autoComplete="email" required />
        </Field>
        <Field label={labels.phone} htmlFor="c-phone">
          <Input id="c-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required />
        </Field>
        <Field label={labels.country} htmlFor="c-country">
          <Input id="c-country" name="country" autoComplete="country-name" required />
        </Field>
        {/* Unchecked sends nothing, so the sheet shows "Yes" or stays empty. */}
        <label htmlFor="c-whatsapp" className="flex cursor-pointer items-center gap-3 text-sm sm:col-span-2">
          <input
            id="c-whatsapp"
            name="whatsappAvailable"
            type="checkbox"
            value="Yes"
            className="size-4 cursor-pointer accent-primary"
          />
          {labels.whatsapp}
        </label>
        <Field label={labels.businessType} htmlFor="c-type">
          <Select id="c-type" name="businessType" defaultValue={config.businessTypes[0]}>
            {config.businessTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
        </Field>
        <Field label={labels.budget} htmlFor="c-budget">
          <Select id="c-budget" name="budget" defaultValue={config.budgetRanges[0]}>
            {config.budgetRanges.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
        </Field>
      </div>
      <Field label={labels.message} htmlFor="c-message" className="mt-5">
        <Textarea id="c-message" name="message" rows={5} required minLength={10} />
      </Field>
      <Button type="submit" size="lg" disabled={sending} className="mt-6 w-full">
        {sending ? messages.sending : labels.submit}
      </Button>
      <FormError message={error} email={contactEmail} className="mt-3" />
    </form>
  );
}
