import { z } from "zod";
import type { FormState } from "@/types/forms";

export const CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Enter a valid work email."),
  businessType: z.string().trim().min(1, "Choose a business type."),
  budget: z.string().trim().min(1, "Choose a budget range."),
  message: z.string().trim().min(10, "Tell us a little more, at least 10 characters."),
});

export const newsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Enter your email address."),
  password: z.string().min(1, "Enter your password."),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Enter your email address."),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(32, "This reset link is not valid."),
    password: z.string().min(8, "Use at least 8 characters."),
    confirm: z.string(),
  })
  .refine((v) => v.password === v.confirm, {
    path: ["confirm"],
    message: "The two passwords do not match.",
  });

export const applicationSchema = z.object({
  jobSlug: z.string().min(1),
  name: z.string().trim().min(2, "Please enter your full name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().min(5, "Enter a phone number."),
  profile: z.string().trim().url("Enter a full link, starting with https://"),
  why: z.string().trim().max(2000, "Keep this under 2000 characters.").optional(),
  consent: z.literal("on", { message: "Please agree so we can keep your application." }),
});

/** Turns a failed zod parse into a field → message map for the form. */
export function fieldErrors(error: z.ZodError): FormState {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    errors[key] ??= issue.message;
  }
  return { status: "error", message: "Please fix the highlighted fields.", errors };
}

export function validateCv(file: File | null, maxMb: number): string | null {
  if (!file || file.size === 0) return "Attach your CV as a PDF or Word file.";
  if (!(CV_TYPES as readonly string[]).includes(file.type))
    return "The CV must be a PDF or Word file.";
  if (file.size > maxMb * 1024 * 1024) return `The CV must be ${maxMb} MB or smaller.`;
  return null;
}
