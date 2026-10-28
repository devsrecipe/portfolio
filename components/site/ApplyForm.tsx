"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/Field";
import { submitApplication } from "@/lib/actions";
import { initialFormState } from "@/types/forms";

type Props = {
  jobSlug: string;
  cvMaxMb: number;
  retention: string;
  replyPromise: string;
};

function describedBy(id: string, error?: string) {
  return error ? `${id}-error` : undefined;
}

export function ApplyForm({ jobSlug, cvMaxMb, retention, replyPromise }: Props) {
  const [state, action, pending] = useActionState(submitApplication, initialFormState);
  const err = state.errors ?? {};

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-3xl border border-border bg-surface p-8">
        <h2 className="text-2xl font-bold">Application sent</h2>
        <p className="mt-2 text-muted">{state.message}</p>
        <p className="mt-4 text-sm text-muted">{replyPromise}</p>
      </div>
    );
  }

  return (
    <form
      action={action}
      noValidate
      className="space-y-5 rounded-3xl border border-border bg-surface p-6 sm:p-8"
    >
      <h2 className="text-2xl font-bold">Apply for this role</h2>
      <input type="hidden" name="jobSlug" value={jobSlug} />

      <Field label="Full name" htmlFor="a-name" error={err.name}>
        <Input
          id="a-name"
          name="name"
          defaultValue={state.values?.name}
          autoComplete="name"
          required
          aria-invalid={Boolean(err.name)}
          aria-describedby={describedBy("a-name", err.name)}
        />
      </Field>
      <Field label="Email" htmlFor="a-email" error={err.email}>
        <Input
          id="a-email"
          name="email"
          defaultValue={state.values?.email}
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(err.email)}
          aria-describedby={describedBy("a-email", err.email)}
        />
      </Field>
      <Field label="Phone" htmlFor="a-phone" error={err.phone}>
        <Input
          id="a-phone"
          name="phone"
          defaultValue={state.values?.phone}
          type="tel"
          autoComplete="tel"
          required
          aria-invalid={Boolean(err.phone)}
          aria-describedby={describedBy("a-phone", err.phone)}
        />
      </Field>
      <Field
        label="LinkedIn, GitHub or portfolio link"
        htmlFor="a-profile"
        error={err.profile}
      >
        <Input
          id="a-profile"
          name="profile"
          defaultValue={state.values?.profile}
          type="url"
          placeholder="https://"
          required
          aria-invalid={Boolean(err.profile)}
          aria-describedby={describedBy("a-profile", err.profile)}
        />
      </Field>

      <Field label="CV" htmlFor="a-cv" error={err.cv}>
        <div className="rounded-xl border border-dashed border-border bg-surface-2 p-4 text-center">
          <p className="font-semibold text-primary">Choose a file</p>
          <p className="mt-1 text-sm text-muted">PDF or Word, up to {cvMaxMb} MB</p>
          <input
            id="a-cv"
            name="cv"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            required
            aria-invalid={Boolean(err.cv)}
            aria-describedby={describedBy("a-cv", err.cv)}
            className="mt-3 block w-full text-sm text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-1.5 file:font-semibold file:text-ground"
          />
        </div>
      </Field>

      <Field label="Why this role?" hint="Optional" htmlFor="a-why" error={err.why}>
        <Textarea id="a-why" name="why" defaultValue={state.values?.why} rows={4} />
      </Field>

      <div>
        <div className="flex items-start gap-3">
          <input
            id="a-consent"
            name="consent"
            defaultChecked={state.values?.consent === "on"}
            type="checkbox"
            aria-invalid={Boolean(err.consent)}
            aria-describedby={describedBy("a-consent", err.consent)}
            className="mt-1 size-4 accent-[var(--color-primary)]"
          />
          <label htmlFor="a-consent" className="text-sm text-muted">
            I agree that Devs Recipe may keep my application for {retention} to consider
            me for this and future roles.{" "}
            <Link href="/privacy" className="text-primary underline">
              Privacy policy
            </Link>
          </label>
        </div>
        {err.consent ? (
          <p id="a-consent-error" role="alert" className="mt-1.5 text-sm text-accent">
            {err.consent}
          </p>
        ) : null}
      </div>

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? "Sending…" : "Send application"}
      </Button>
      {state.status === "error" && state.message ? (
        <p role="alert" className="text-sm text-accent">
          {state.message}
        </p>
      ) : null}
      <p className="text-sm text-muted">{replyPromise}</p>
    </form>
  );
}
