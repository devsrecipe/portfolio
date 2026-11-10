"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/Field";
import { fill } from "@/lib/utils";
import type { Job, SiteContent } from "@/types";
import { FormError } from "./FormError";
import { FormHiddenFields } from "./FormHiddenFields";
import { useFormService, type FormMessages } from "./useFormService";

const CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

type Props = {
  job: Pick<Job, "title" | "cvMaxMb" | "retention" | "replyPromise">;
  config: SiteContent["forms"]["application"];
  messages: FormMessages;
  contactEmail: string;
  privacyLabel: string;
};

export function ApplyForm({ job, config, messages, contactEmail, privacyLabel }: Props) {
  const { labels } = config;

  function checkCv(data: FormData): string | null {
    const cv = data.get("cv");
    if (!(cv instanceof File) || cv.size === 0) return null; // `required` handles a missing file
    if (!CV_TYPES.includes(cv.type)) return config.cvTypeError;
    if (cv.size > job.cvMaxMb * 1024 * 1024) {
      return fill(config.cvSizeError, { maxMb: job.cvMaxMb });
    }
    return null;
  }

  const { status, error, sending, onSubmit, onInvalid } = useFormService(
    config.endpoint,
    messages,
    checkCv,
  );

  if (status === "success") {
    return (
      <div role="status" className="rounded-3xl border border-border bg-surface p-8">
        <h2 className="text-2xl font-bold">{config.successTitle}</h2>
        <p className="mt-2 text-muted">{config.successText}</p>
        <p className="mt-4 text-sm text-muted">{job.replyPromise}</p>
      </div>
    );
  }

  return (
    <form
      action={config.endpoint || undefined}
      method="post"
      onSubmit={onSubmit}
      onInvalidCapture={onInvalid}
      className="space-y-5 rounded-3xl border border-border bg-surface p-6 sm:p-8"
    >
      <h2 className="text-2xl font-bold">{config.title}</h2>
      <input type="hidden" name="job" value={job.title} />
      <FormHiddenFields form="Applications" subject={`New application: ${job.title}`} />

      <Field label={labels.name} htmlFor="a-name">
        <Input id="a-name" name="name" autoComplete="name" required />
      </Field>
      <Field label={labels.email} htmlFor="a-email">
        <Input id="a-email" name="email" type="email" autoComplete="email" required />
      </Field>
      <Field label={labels.phone} htmlFor="a-phone">
        <Input id="a-phone" name="phone" type="tel" autoComplete="tel" required />
      </Field>
      <Field label={labels.profile} htmlFor="a-profile">
        <Input id="a-profile" name="profile" type="url" placeholder="https://" required />
      </Field>

      <Field label={labels.cv} htmlFor="a-cv">
        <div className="rounded-xl border border-dashed border-border bg-surface-2 p-4 text-center">
          <p className="font-semibold text-primary">{labels.cvPick}</p>
          <p className="mt-1 text-sm text-muted">
            {fill(labels.cvHint, { maxMb: job.cvMaxMb })}
          </p>
          <input
            id="a-cv"
            name="cv"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            required
            className="mt-3 block w-full text-sm text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-1.5 file:font-semibold file:text-ground"
          />
        </div>
      </Field>

      <Field label={labels.why} hint={labels.optional} htmlFor="a-why">
        <Textarea id="a-why" name="why" rows={4} />
      </Field>

      <div className="flex items-start gap-3">
        <input
          id="a-consent"
          name="consent"
          type="checkbox"
          value="yes"
          required
          className="mt-1 size-4 accent-primary"
        />
        <label htmlFor="a-consent" className="text-sm text-muted">
          {fill(config.consent, { retention: job.retention })}{" "}
          <Link href="/privacy" className="text-primary underline">
            {privacyLabel}
          </Link>
        </label>
      </div>

      <Button type="submit" size="lg" disabled={sending} className="w-full">
        {sending ? messages.sending : labels.submit}
      </Button>
      <FormError message={error} email={contactEmail} />
      <p className="text-sm text-muted">{job.replyPromise}</p>
    </form>
  );
}
