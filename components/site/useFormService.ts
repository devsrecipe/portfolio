"use client";

import { useState, type FormEvent } from "react";

export type FormMessages = {
  /** Shown when the endpoint in site-content.json is still empty. */
  notConfigured: string;
  error: string;
  sending: string;
};

type Status = "idle" | "sending" | "success" | "error";

/**
 * Posts a form to a hosted form service (Formspree, Getform, Basin…) from the
 * browser. Browser validation (`required`, `type="email"`…) runs first;
 * `validate` can add extra checks and return an error message.
 */
export function useFormService(
  endpoint: string,
  messages: FormMessages,
  validate?: (data: FormData) => string | null,
) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const problem = validate?.(data) ?? (endpoint ? null : messages.notConfigured);
    if (problem) {
      setError(problem);
      setStatus("error");
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`Form service answered ${response.status}`);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setError(messages.error);
      setStatus("error");
    }
  }

  return { status, error, sending: status === "sending", onSubmit };
}
