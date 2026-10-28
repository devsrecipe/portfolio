"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { sendContact } from "@/lib/actions";
import { initialFormState } from "@/types/forms";

type Props = { businessTypes: readonly string[]; budgetRanges: readonly string[] };

export function ContactForm({ businessTypes, budgetRanges }: Props) {
  const [state, action, pending] = useActionState(sendContact, initialFormState);
  const err = state.errors ?? {};

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-3xl border border-border bg-surface p-8">
        <h3 className="text-2xl font-bold">Message sent</h3>
        <p className="mt-2 text-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form
      action={action}
      noValidate
      className="rounded-3xl border border-border bg-surface p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="c-name" error={err.name}>
          <Input
            id="c-name"
            name="name"
            defaultValue={state.values?.name}
            autoComplete="name"
            required
            aria-invalid={Boolean(err.name)}
            aria-describedby={err.name ? "c-name-error" : undefined}
          />
        </Field>
        <Field label="Work email" htmlFor="c-email" error={err.email}>
          <Input
            id="c-email"
            name="email"
            defaultValue={state.values?.email}
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(err.email)}
            aria-describedby={err.email ? "c-email-error" : undefined}
          />
        </Field>
        <Field label="Business type" htmlFor="c-type" error={err.businessType}>
          <Select
            id="c-type"
            name="businessType"
            defaultValue={state.values?.businessType ?? businessTypes[0]}
          >
            {businessTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
        </Field>
        <Field label="Budget range" htmlFor="c-budget" error={err.budget}>
          <Select
            id="c-budget"
            name="budget"
            defaultValue={state.values?.budget ?? budgetRanges[0]}
          >
            {budgetRanges.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
        </Field>
      </div>
      <Field
        label="What do you need?"
        htmlFor="c-message"
        error={err.message}
        className="mt-5"
      >
        <Textarea
          id="c-message"
          name="message"
          defaultValue={state.values?.message}
          rows={5}
          required
          aria-invalid={Boolean(err.message)}
          aria-describedby={err.message ? "c-message-error" : undefined}
        />
      </Field>
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={pending}
        className="mt-6 w-full"
      >
        {pending ? "Sending…" : "Send message"}
      </Button>
      {state.status === "error" && state.message ? (
        <p role="alert" className="mt-3 text-sm text-accent">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
