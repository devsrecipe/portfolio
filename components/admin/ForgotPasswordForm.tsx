"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";
import { requestPasswordReset } from "@/lib/actions";
import { initialFormState } from "@/types/forms";

export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(requestPasswordReset, initialFormState);
  const err = state.errors ?? {};

  if (state.status === "success") {
    return (
      <div role="status" className="mt-6 space-y-4">
        <p className="rounded-xl bg-success-soft p-4 text-success">{state.message}</p>
        <Link
          href="/admin/login"
          className="block text-center font-semibold text-primary"
        >
          ← Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="mt-6 space-y-4">
      <Field label="Email" htmlFor="f-email" error={err.email}>
        <Input
          id="f-email"
          name="email"
          defaultValue={state.values?.email}
          type="email"
          autoComplete="username"
          required
          aria-invalid={Boolean(err.email)}
          aria-describedby={err.email ? "f-email-error" : undefined}
        />
      </Field>
      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? "Sending…" : "Send reset link"}
      </Button>
      {state.status === "error" && !state.errors ? (
        <p role="alert" className="text-center text-sm text-accent">
          {state.message}
        </p>
      ) : null}
      <Link
        href="/admin/login"
        className="block text-center text-sm font-semibold text-primary"
      >
        ← Back to sign in
      </Link>
    </form>
  );
}
