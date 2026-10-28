"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";
import { resetPassword } from "@/lib/actions";
import { initialFormState } from "@/types/forms";

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState(resetPassword, initialFormState);
  const err = state.errors ?? {};

  if (state.status === "success") {
    return (
      <div role="status" className="mt-6 space-y-4">
        <p className="rounded-xl bg-success-soft p-4 text-success">{state.message}</p>
        <ButtonLink href="/admin/login" size="lg" className="w-full">
          Sign in
        </ButtonLink>
      </div>
    );
  }

  const tokenProblem =
    err.token ?? (state.status === "error" && !state.errors ? state.message : "");

  return (
    <form action={action} noValidate className="mt-6 space-y-4">
      <input type="hidden" name="token" value={token} />
      <Field
        label="New password"
        htmlFor="r-password"
        hint="At least 8 characters"
        error={err.password}
      >
        <Input
          id="r-password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          aria-invalid={Boolean(err.password)}
          aria-describedby={err.password ? "r-password-error" : undefined}
        />
      </Field>
      <Field label="Repeat new password" htmlFor="r-confirm" error={err.confirm}>
        <Input
          id="r-confirm"
          name="confirm"
          type="password"
          autoComplete="new-password"
          required
          aria-invalid={Boolean(err.confirm)}
          aria-describedby={err.confirm ? "r-confirm-error" : undefined}
        />
      </Field>
      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? "Saving…" : "Save new password"}
      </Button>
      {tokenProblem ? (
        <p role="alert" className="text-center text-sm text-accent">
          {tokenProblem}{" "}
          <Link
            href="/admin/forgot-password"
            className="font-semibold text-primary underline"
          >
            Ask for a new link
          </Link>
        </p>
      ) : null}
    </form>
  );
}
