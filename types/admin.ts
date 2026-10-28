import type { ApplicationStatus } from "./index";

/** Serializable shapes passed from admin server pages to client components. */

export type AdminApplicant = {
  id: string;
  jobSlug: string;
  name: string;
  email: string;
  phone: string;
  profile: string;
  why: string;
  note: string;
  status: ApplicationStatus;
  applied: string;
  cvName: string;
  cvSize: string;
};

export type AdminJobOption = { slug: string; title: string; count: number };

export type AttentionItem = {
  tone: "primary" | "warning" | "neutral";
  title: string;
  note: string;
};

export type ActivityItem = { text: string; when: string };
