import "server-only";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { jobs } from "@/content/jobs";
import { posts } from "@/content/posts";
import { stories } from "@/content/stories";
import type {
  ActivityItem,
  AdminApplicant,
  AdminJobOption,
  AttentionItem,
} from "@/types/admin";
import { collections, type AdminDoc, type ApplicationDoc } from "./db";
import { getAdmin } from "./session";

const DAY = 24 * 60 * 60 * 1000;

/** Request-time only (never at build), and only for a signed-in admin. */
async function guard(): Promise<AdminDoc> {
  await connection();
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}

/** "Today", "Yesterday", "3 days ago", then "Oct 8". */
export function formatWhen(date: Date, now = new Date()): string {
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  ).getTime();
  const days = Math.floor((startOfToday - date.getTime()) / DAY) + 1;
  if (date.getTime() >= startOfToday) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatSize(bytes: number): string {
  return bytes >= 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function fileKind(contentType: string): string {
  return contentType === "application/pdf" ? "PDF" : "Word";
}

function toApplicant(doc: ApplicationDoc): AdminApplicant {
  return {
    id: doc._id.toHexString(),
    jobSlug: doc.jobSlug,
    name: doc.name,
    email: doc.email,
    phone: doc.phone,
    profile: doc.profile,
    why: doc.why,
    note: doc.note,
    status: doc.status,
    applied: formatWhen(doc.createdAt),
    cvName: doc.cv.filename,
    cvSize: `${fileKind(doc.cv.contentType)} · ${formatSize(doc.cv.size)}`,
  };
}

export async function getSidebarData() {
  const admin = await guard();
  const { applications } = await collections();
  return {
    adminName: admin.name || admin.email,
    newApplications: await applications.countDocuments({ status: "new" }),
  };
}

export async function getOverview() {
  await guard();
  const { applications, subscribers, contacts } = await collections();
  const weekAgo = new Date(Date.now() - 7 * DAY);

  const [
    newApps,
    subscriberCount,
    newSubscribers,
    perJob,
    latestApps,
    latestSubs,
    latestContacts,
  ] = await Promise.all([
    applications.countDocuments({ status: "new" }),
    subscribers.countDocuments(),
    subscribers.countDocuments({ createdAt: { $gte: weekAgo } }),
    applications
      .aggregate<{ _id: string; count: number; oldest: Date }>([
        { $match: { status: "new" } },
        {
          $group: { _id: "$jobSlug", count: { $sum: 1 }, oldest: { $min: "$createdAt" } },
        },
      ])
      .toArray(),
    applications.find({}, { sort: { createdAt: -1 }, limit: 5 }).toArray(),
    subscribers.find({}, { sort: { createdAt: -1 }, limit: 5 }).toArray(),
    contacts.find({}, { sort: { createdAt: -1 }, limit: 5 }).toArray(),
  ]);

  const completed = stories.filter((s) => s.status === "completed").length;
  const inProgress = stories.filter((s) => s.status === "in-progress").length;

  const stats = [
    { label: "New applications", value: String(newApps), note: "Waiting for review" },
    {
      label: "Subscribers",
      value: String(subscriberCount),
      note: `+${newSubscribers} this week`,
    },
    {
      label: "Success stories",
      value: String(stories.length),
      note: `${completed} completed · ${inProgress} in progress`,
    },
    { label: "Blog posts", value: String(posts.length), note: "From content/posts.ts" },
  ];

  const attention: AttentionItem[] = [
    ...perJob.map((group) => ({
      tone: "primary" as const,
      title: `${group.count} new application${group.count === 1 ? "" : "s"} for ${
        jobs.find((j) => j.slug === group._id)?.title ?? group._id
      }`,
      note: `Oldest one arrived ${formatWhen(group.oldest).toLowerCase()}`,
    })),
    ...jobs
      .map((job) => ({
        job,
        daysLeft: Math.ceil((Date.parse(job.openUntilIso) - Date.now()) / DAY),
      }))
      .filter(({ daysLeft }) => daysLeft >= 0 && daysLeft <= 7)
      .map(({ job, daysLeft }) => ({
        tone: "warning" as const,
        title: `Job "${job.title}" closes in ${daysLeft} day${daysLeft === 1 ? "" : "s"}`,
        note: "It will hide from the careers page automatically.",
      })),
  ];

  const activity: ActivityItem[] = [
    ...latestApps.map((a) => ({
      at: a.createdAt,
      text: `${a.name} applied for ${jobs.find((j) => j.slug === a.jobSlug)?.title ?? a.jobSlug}`,
    })),
    ...latestSubs.map((s) => ({ at: s.createdAt, text: `New subscriber: ${s.email}` })),
    ...latestContacts.map((c) => ({
      at: c.createdAt,
      text: `Message from ${c.name} (${c.businessType})`,
    })),
  ]
    .sort((a, b) => b.at.getTime() - a.at.getTime())
    .slice(0, 6)
    .map(({ at, text }) => ({ text, when: formatWhen(at) }));

  return { stats, attention, activity };
}

export async function getApplications(): Promise<{
  applicants: AdminApplicant[];
  jobOptions: AdminJobOption[];
}> {
  await guard();
  const { applications } = await collections();
  const docs = await applications.find({}, { sort: { createdAt: -1 } }).toArray();
  const applicants = docs.map(toApplicant);
  return {
    applicants,
    jobOptions: jobs.map((j) => ({
      slug: j.slug,
      title: j.title,
      count: applicants.filter((a) => a.jobSlug === j.slug).length,
    })),
  };
}

export async function getJobsWithCounts() {
  await guard();
  const { applications } = await collections();
  const counts = await applications
    .aggregate<{ _id: string; total: number; fresh: number }>([
      {
        $group: {
          _id: "$jobSlug",
          total: { $sum: 1 },
          fresh: { $sum: { $cond: [{ $eq: ["$status", "new"] }, 1, 0] } },
        },
      },
    ])
    .toArray();
  return jobs.map((job) => {
    const c = counts.find((x) => x._id === job.slug);
    const open = Date.parse(job.openUntilIso) >= Date.now();
    return {
      slug: job.slug,
      title: job.title,
      open,
      closes: new Date(job.openUntilIso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      total: c?.total ?? 0,
      fresh: c?.fresh ?? 0,
    };
  });
}

export async function getSubscribers() {
  await guard();
  const { subscribers } = await collections();
  const docs = await subscribers.find({}, { sort: { createdAt: -1 } }).toArray();
  return docs.map((s) => ({
    id: s._id.toHexString(),
    email: s.email,
    source: s.source,
    joined: formatWhen(s.createdAt),
  }));
}

export async function getMessages() {
  await guard();
  const { contacts } = await collections();
  const docs = await contacts.find({}, { sort: { createdAt: -1 }, limit: 200 }).toArray();
  return docs.map((c) => ({
    id: c._id.toHexString(),
    name: c.name,
    email: c.email,
    businessType: c.businessType,
    budget: c.budget,
    message: c.message,
    received: formatWhen(c.createdAt),
  }));
}
