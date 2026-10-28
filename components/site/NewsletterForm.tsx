"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { subscribe } from "@/lib/actions";
import { initialFormState } from "@/types/forms";

export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribe, initialFormState);

  return (
    <form action={action} noValidate className="mt-4">
      <div className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <Input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          aria-invalid={Boolean(state.errors?.email)}
          aria-describedby="newsletter-status"
          className="h-11 min-w-0 flex-1"
        />
        <Button type="submit" size="sm" disabled={pending}>
          Subscribe
        </Button>
      </div>
      <p
        id="newsletter-status"
        role="status"
        className={
          state.status === "error"
            ? "mt-2 text-sm text-accent"
            : "mt-2 text-sm text-success"
        }
      >
        {state.errors?.email ?? state.message}
      </p>
    </form>
  );
}
