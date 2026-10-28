"use server";

import { createHash, randomBytes } from "node:crypto";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSessionToken, SESSION_COOKIE, SESSION_HOURS } from "@/lib/auth";
import { getJob } from "@/lib/content";
import { collections } from "@/lib/db";
import { env } from "@/lib/env";
import { sendMail } from "@/lib/mail";
import { hashPassword, verifyPassword } from "@/lib/password";
import { ensureAdminSeed } from "@/lib/seed";
import {
  applicationSchema,
  contactSchema,
  fieldErrors,
  forgotPasswordSchema,
  loginSchema,
  newsletterSchema,
  resetPasswordSchema,
  validateCv,
} from "@/lib/validation";
import type { FormState } from "@/types/forms";

const RESET_MINUTES = 60;
const SERVER_ERROR: FormState = {
  status: "error",
  message: "Something went wrong on our side. Please try again in a moment.",
};

function text(data: FormData, key: string): string {
  const value = data.get(key);
  return typeof value === "string" ? value : "";
}

/* React resets a form after its action runs. On failure, send back what was typed
   (never passwords or files) so the form can refill itself. */
function keepValues(data: FormData, keys: string[], state: FormState): FormState {
  if (state.status !== "error") return state;
  return { ...state, values: Object.fromEntries(keys.map((k) => [k, text(data, k)])) };
}

const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");

/* ---------- Public forms ---------- */

async function sendContactImpl(_prev: FormState, data: FormData): Promise<FormState> {
  const parsed = contactSchema.safeParse({
    name: text(data, "name"),
    email: text(data, "email"),
    businessType: text(data, "businessType"),
    budget: text(data, "budget"),
    message: text(data, "message"),
  });
  if (!parsed.success) return fieldErrors(parsed.error);

  try {
    const { contacts } = await collections();
    await contacts.insertOne({
      _id: new ObjectId(),
      ...parsed.data,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("[contact]", error);
    return SERVER_ERROR;
  }
  return {
    status: "success",
    message: "Thanks. A founder will reply to you personally.",
  };
}

async function subscribeImpl(_prev: FormState, data: FormData): Promise<FormState> {
  const parsed = newsletterSchema.safeParse({ email: text(data, "email") });
  if (!parsed.success) return fieldErrors(parsed.error);

  try {
    const { subscribers } = await collections();
    const email = parsed.data.email.toLowerCase();
    // Subscribing twice is not an error: keep the original signup date.
    await subscribers.updateOne(
      { email },
      { $setOnInsert: { email, source: "Footer form", createdAt: new Date() } },
      { upsert: true },
    );
  } catch (error) {
    console.error("[subscribe]", error);
    return SERVER_ERROR;
  }
  return { status: "success", message: "You are subscribed. Thank you." };
}

async function submitApplicationImpl(
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
  const cvValue = data.get("cv");
  const cv = cvValue instanceof File ? cvValue : null;
  const cvError = validateCv(cv, job?.cvMaxMb ?? 5);

  if (!parsed.success || cvError || !cv || !job) {
    const base = parsed.success
      ? { status: "error" as const, errors: {} }
      : fieldErrors(parsed.error);
    return {
      status: "error",
      message: job
        ? "Please fix the highlighted fields."
        : "This role is no longer open.",
      errors: { ...base.errors, ...(cvError ? { cv: cvError } : {}) },
    };
  }

  try {
    const { applications, cvs } = await collections();
    const upload = cvs.openUploadStream(cv.name, {
      metadata: { contentType: cv.type, jobSlug: job.slug },
    });
    await new Promise<void>((resolve, reject) => {
      upload.once("finish", () => resolve());
      upload.once("error", reject);
      cv.arrayBuffer().then((buf) => upload.end(Buffer.from(buf)), reject);
    });

    const now = new Date();
    const consentUntil = new Date(now);
    consentUntil.setMonth(consentUntil.getMonth() + job.retentionMonths);

    const { jobSlug, name, email, phone, profile, why } = parsed.data;
    await applications.insertOne({
      _id: new ObjectId(),
      jobSlug,
      name,
      email: email.toLowerCase(),
      phone,
      profile,
      why: why ?? "",
      status: "new",
      note: "",
      cv: { fileId: upload.id, filename: cv.name, contentType: cv.type, size: cv.size },
      consentUntil,
      createdAt: now,
    });
  } catch (error) {
    console.error("[application]", error);
    return SERVER_ERROR;
  }
  return { status: "success", message: "Application sent. Thank you for applying." };
}

/* ---------- Admin auth ---------- */

async function startSession(adminId: string) {
  (await cookies()).set(SESSION_COOKIE, await createSessionToken(adminId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_HOURS * 60 * 60,
  });
}

async function signInImpl(_prev: FormState, data: FormData): Promise<FormState> {
  const parsed = loginSchema.safeParse({
    email: text(data, "email"),
    password: text(data, "password"),
  });
  if (!parsed.success) return fieldErrors(parsed.error);

  let adminId: string;
  try {
    await ensureAdminSeed();
    const { admins } = await collections();
    const admin = await admins.findOne({ email: parsed.data.email.toLowerCase() });
    const ok = admin
      ? await verifyPassword(parsed.data.password, admin.passwordHash)
      : false;
    if (!admin || !ok) {
      return { status: "error", message: "That email and password do not match." };
    }
    adminId = admin._id.toHexString();
  } catch (error) {
    console.error("[sign in]", error);
    return SERVER_ERROR;
  }

  await startSession(adminId);
  redirect("/admin");
}

export async function signOut(): Promise<void> {
  (await cookies()).delete({ name: SESSION_COOKIE, path: "/" });
  redirect("/admin/login");
}

async function requestPasswordResetImpl(
  _prev: FormState,
  data: FormData,
): Promise<FormState> {
  const parsed = forgotPasswordSchema.safeParse({ email: text(data, "email") });
  if (!parsed.success) return fieldErrors(parsed.error);

  // Same answer whether or not the email exists, so the form can't be used to find admins.
  const done: FormState = {
    status: "success",
    message: `If that email belongs to an admin, a reset link is on its way. It works for ${RESET_MINUTES} minutes.`,
  };

  try {
    await ensureAdminSeed();
    const { admins, passwordResets } = await collections();
    const admin = await admins.findOne({ email: parsed.data.email.toLowerCase() });
    if (!admin) return done;

    const token = randomBytes(32).toString("hex");
    const now = new Date();
    await passwordResets.deleteMany({ adminId: admin._id });
    await passwordResets.insertOne({
      _id: new ObjectId(),
      adminId: admin._id,
      tokenHash: sha256(token),
      expiresAt: new Date(now.getTime() + RESET_MINUTES * 60 * 1000),
      createdAt: now,
    });

    const link = new URL(`/admin/reset-password?token=${token}`, env.siteUrl).toString();
    await sendMail({
      to: admin.email,
      subject: "Reset your Devs Recipe admin password",
      text: `Someone asked to reset the password for ${admin.email}.\n\nOpen this link within ${RESET_MINUTES} minutes to choose a new one:\n${link}\n\nIf it wasn't you, ignore this email. Your password stays the same.`,
      html: `<p>Someone asked to reset the password for <strong>${admin.email}</strong>.</p><p><a href="${link}">Choose a new password</a> (the link works for ${RESET_MINUTES} minutes).</p><p>If it wasn't you, ignore this email. Your password stays the same.</p>`,
    });
  } catch (error) {
    console.error("[forgot password]", error);
    return SERVER_ERROR;
  }
  return done;
}

export async function resetPassword(
  _prev: FormState,
  data: FormData,
): Promise<FormState> {
  const parsed = resetPasswordSchema.safeParse({
    token: text(data, "token"),
    password: text(data, "password"),
    confirm: text(data, "confirm"),
  });
  if (!parsed.success) return fieldErrors(parsed.error);

  try {
    const { admins, passwordResets } = await collections();
    const reset = await passwordResets.findOneAndDelete({
      tokenHash: sha256(parsed.data.token),
      expiresAt: { $gt: new Date() },
    });
    if (!reset) {
      return {
        status: "error",
        message: "This reset link has expired or was already used. Ask for a new one.",
      };
    }
    // Bumping passwordChangedAt signs out every existing session (see lib/session.ts).
    await admins.updateOne(
      { _id: reset.adminId },
      {
        $set: {
          passwordHash: await hashPassword(parsed.data.password),
          passwordChangedAt: new Date(),
        },
      },
    );
  } catch (error) {
    console.error("[reset password]", error);
    return SERVER_ERROR;
  }
  return {
    status: "success",
    message: "Your password is updated. Sign in with the new one.",
  };
}

/* ---------- Exported actions ---------- */

export async function sendContact(prev: FormState, data: FormData): Promise<FormState> {
  return keepValues(
    data,
    ["name", "email", "businessType", "budget", "message"],
    await sendContactImpl(prev, data),
  );
}

export async function subscribe(prev: FormState, data: FormData): Promise<FormState> {
  return keepValues(data, ["email"], await subscribeImpl(prev, data));
}

export async function submitApplication(
  prev: FormState,
  data: FormData,
): Promise<FormState> {
  return keepValues(
    data,
    ["name", "email", "phone", "profile", "why", "consent"],
    await submitApplicationImpl(prev, data),
  );
}

export async function signIn(prev: FormState, data: FormData): Promise<FormState> {
  return keepValues(data, ["email"], await signInImpl(prev, data));
}

export async function requestPasswordReset(
  prev: FormState,
  data: FormData,
): Promise<FormState> {
  return keepValues(data, ["email"], await requestPasswordResetImpl(prev, data));
}
