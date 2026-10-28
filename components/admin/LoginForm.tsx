"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";
import { signIn } from "@/lib/actions";
import { initialFormState } from "@/types/forms";

export function LoginForm() {
  const [state, action, pending] = useActionState(signIn, initialFormState);
  const err = state.errors ?? {};

  return (
    <form action={action} noValidate className="mt-6 space-y-4">
      <Field label="Email" htmlFor="l-email" error={err.email}>
        <Input
          id="l-email"
          name="email"
          defaultValue={state.values?.email}
          type="email"
          autoComplete="username"
          required
          aria-invalid={Boolean(err.email)}
          aria-describedby={err.email ? "l-email-error" : undefined}
        />
      </Field>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-baseline justify-between">
          <label htmlFor="l-password" className="text-sm font-semibold">
            Password
          </label>
          <Link
            href="/admin/forgot-password"
            className="text-sm font-semibold text-primary"
          >
            Forgot password?
          </Link>
        </div>
        <Input
          id="l-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={Boolean(err.password)}
          aria-describedby={err.password ? "l-password-error" : undefined}
        />
        {err.password ? (
          <p id="l-password-error" role="alert" className="text-sm text-accent">
            {err.password}
          </p>
        ) : null}
      </div>
      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? "Signing in…" : "Sign in"}
      </Button>
      {state.status === "error" && !state.errors ? (
        <p role="alert" className="text-center text-sm text-accent">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
