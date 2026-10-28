import { z } from "zod";
import raw from "./site-content.json";
import { contentSchema, type SiteContent } from "./schema";

/*
 * All website text and data lives in content/site-content.json.
 * Edit that file; this module validates it once and exposes it typed.
 */

function load(): SiteContent {
  const parsed = contentSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(
      `content/site-content.json is not valid:\n${z.prettifyError(parsed.error)}`,
    );
  }
  return parsed.data;
}

export const content = load();

/** Form texts shared by every form, passed to client components as props. */
export const formMessages = {
  notConfigured: content.forms.notConfigured,
  error: content.forms.error,
  sending: content.forms.sending,
};
