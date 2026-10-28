"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminCredentials, SESSION_COOKIE, sessionToken } from "@/lib/auth";
import { getJob } from "@/lib/content";
import {
  applicationSchema,
  contactSchema,
  fieldErrors,
  loginSchema,
  newsletterSchema,
  validateCv,
} from "@/lib/validation";
import type { FormState } from "@/types/forms";

function text(data: FormData, key: string): string {
  const value = data.get(key);
  return typeof value === "string" ? value : "";
}

export async function sendContact(_prev: FormState, data: FormData): Promise<FormState> {
  const parsed = contactSchema.safeParse({
    name: text(data, "name"),
    email: text(data, "email"),
    businessType: text(data, "businessType"),
    budget: text(data, "budget"),
    message: text(data, "message"),
  });
  if (!parsed.success) return fieldErrors(parsed.error);

  // TODO: forward to email / CRM once a backend is connected.
  return {
    status: "success",
    message: "Thanks. A founder will reply to you personally.",
  };
}

export async function subscribe(_prev: FormState, data: FormData): Promise<FormState> {
  const parsed = newsletterSchema.safeParse({ email: text(data, "email") });
  if (!parsed.success) return fieldErrors(parsed.error);

  // TODO: store the subscriber once a backend is connected.
  return { status: "success", message: "You are subscribed. Thank you." };
}

export async function submitApplication(
  _prev: FormState,
  data: FormData,
): Promise<FormState> {
  const parsed = applicationSchema.safeParse({
    jobSlug: text(data, "jobSlug"),
    name: text(data, "name"),
    email: text(data, "email"),
    phone: text(data, "phone"),
    profile: text(data, "profile"),
    why: text(data, "why") || undefined,
    consent: text(data, "consent"),
  });
  const job = await getJob(text(data, "jobSlug"));
  const cv = data.get("cv");
  const cvError = validateCv(cv instanceof File ? cv : null, job?.cvMaxMb ?? 5);

  if (!parsed.success || cvError) {
    const base = parsed.success
      ? { status: "error" as const, errors: {} }
      : fieldErrors(parsed.error);
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      errors: { ...base.errors, ...(cvError ? { cv: cvError } : {}) },
    };
  }

  // TODO: store the application and CV once a backend is connected.
  return { status: "success", message: "Application sent. Thank you for applying." };
}

export async function signIn(_prev: FormState, data: FormData): Promise<FormState> {
  const parsed = loginSchema.safeParse({
    email: text(data, "email"),
    password: text(data, "password"),
  });
  if (!parsed.success) return fieldErrors(parsed.error);

  const creds = adminCredentials();
  if (parsed.data.email !== creds.email || parsed.data.password !== creds.password) {
    return { status: "error", message: "That email and password do not match." };
  }

  const jar = await cookies();
  jar.set(SESSION_COOKIE, await sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 8,
  });
  redirect("/admin");
}

export async function signOut(): Promise<void> {
  const jar = await cookies();
  jar.delete({ name: SESSION_COOKIE, path: "/admin" });
  redirect("/admin/login");
}
