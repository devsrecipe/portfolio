"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import type { SiteContent } from "@/types";
import { FormError } from "./FormError";
import { useFormService, type FormMessages } from "./useFormService";

type Props = {
  config: SiteContent["forms"]["newsletter"];
  messages: FormMessages;
  contactEmail: string;
};

export function NewsletterForm({ config, messages, contactEmail }: Props) {
  const { status, error, sending, onSubmit } = useFormService(config.endpoint, messages);

  if (status === "success") {
    return (
      <p role="status" className="mt-4 text-sm text-success">
        {config.successText}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-4">
      <input type="hidden" name="_subject" value="New newsletter subscriber" />
      <div className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          {config.emailLabel}
        </label>
        <Input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder={config.placeholder}
          className="h-11 min-w-0 flex-1"
        />
        <Button type="submit" size="sm" disabled={sending}>
          {sending ? messages.sending : config.submit}
        </Button>
      </div>
      <FormError message={error} email={contactEmail} className="mt-2" />
    </form>
  );
}
