"use client";

import { useState, type FormEvent } from "react";

export type FormMessages = {
  /** Shown when the endpoint in site-content.json is still empty. */
  notConfigured: string;
  error: string;
  sending: string;
  /** Shown when the browser blocks a submit (missing or invalid field). */
  invalid: string;
};

type Status = "idle" | "sending" | "success" | "error";

/** A Google Apps Script web app (integrations/google-sheets) rather than a form service. */
const APPS_SCRIPT = /^https:\/\/script\.google\.com\/macros\/s\//;

async function toBase64(file: File) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}

/**
 * Apps Script only reads url-encoded fields, so files travel as base64 in
 * `<name>_name`, `<name>_type` and `<name>_data`; the script saves them to Drive.
 */
async function toAppsScriptBody(data: FormData) {
  const body = new URLSearchParams();
  for (const [key, value] of data.entries()) {
    if (typeof value === "string") body.append(key, value);
    else if (value.size > 0) {
      body.append(`${key}_name`, value.name);
      body.append(`${key}_type`, value.type || "application/octet-stream");
      body.append(`${key}_data`, await toBase64(value));
    }
  }
  return body;
}

/**
 * Posts a form from the browser, either to a hosted form service (Formspree,
 * Getform, Basin…) or to the Google Sheets script in integrations/google-sheets.
 * Browser validation (`required`, `type="email"`…) runs first; `validate` can
 * add extra checks and return an error message.
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

    // Spam trap (see FormHiddenFields). Autofill or a password manager can fill it for a
    // real person too, so never drop the message: send it with a visible flag instead.
    if (data.get("_gotcha")) {
      data.delete("_gotcha");
      data.set("spamCheck", "Trap field was filled: possibly spam");
    }

    const problem = validate?.(data) ?? (endpoint ? null : messages.notConfigured);
    if (problem) {
      setError(problem);
      setStatus("error");
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const appsScript = APPS_SCRIPT.test(endpoint);
      const response = appsScript
        ? await fetch(endpoint, { method: "POST", body: await toAppsScriptBody(data) })
        : await fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      const result: { ok?: boolean } | null = await response.json().catch(() => null);
      // Google answers a broken or outdated script with an HTML error page and status 200,
      // so for Apps Script only an explicit { ok: true } from our script counts as saved.
      const saved = appsScript ? result?.ok === true : response.ok && result?.ok !== false;
      if (!saved) throw new Error(`Form endpoint answered ${response.status}`);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setError(messages.error);
      setStatus("error");
    }
  }

  /** The browser blocked the submit (required, minLength, type="email"…): say so visibly. */
  function onInvalid() {
    setError(messages.invalid);
    setStatus("error");
  }

  return { status, error, sending: status === "sending", onSubmit, onInvalid };
}
