import type { StoryStatus } from "@/types";

export const adminNav = [
  { label: "Overview", href: "/admin" },
  { label: "Success stories", href: "/admin/success-stories" },
  { label: "Blog", href: "/admin/blog" },
  { label: "Jobs", href: "/admin/jobs" },
  { label: "Applications", href: "/admin/applications" },
  { label: "Messages", href: "/admin/messages" },
  { label: "Subscribers", href: "/admin/subscribers" },
  { label: "Settings", href: "/admin/settings" },
] as const;

export type AdminStory = {
  id: string;
  title: string;
  industry: string;
  status: StoryStatus;
  updated: string;
  stale?: string;
  onHomepage: boolean;
};

export const adminStories: AdminStory[] = [
  {
    id: "s1",
    title: "Diagnostic center: paper reports to online delivery",
    industry: "Diagnostic centers",
    status: "completed",
    updated: "Oct 2",
    onHomepage: true,
  },
  {
    id: "s2",
    title: "Clinic appointment app",
    industry: "Clinics and doctors",
    status: "completed",
    updated: "Yesterday",
    onHomepage: true,
  },
  {
    id: "s3",
    title: "School management system",
    industry: "Schools",
    status: "in-progress",
    updated: "Aug 31",
    stale: "No update in 45 days",
    onHomepage: true,
  },
  {
    id: "s4",
    title: "Restaurant ordering and kitchen display",
    industry: "Food and restaurants",
    status: "in-progress",
    updated: "Oct 11",
    onHomepage: false,
  },
  {
    id: "s5",
    title: "Retail POS for a chain of outlets",
    industry: "FMCG and retail",
    status: "draft",
    updated: "Oct 14",
    onHomepage: false,
  },
];

/** The design shows counts for the whole library (8), while the table lists a sample of rows. */
export const storyFilterCounts = {
  all: 8,
  completed: 5,
  "in-progress": 2,
  draft: 1,
} as const;

export type AdminPost = {
  id: string;
  title: string;
  category: string;
  status: "Published" | "Draft";
  updated: string;
};

export const adminPosts: AdminPost[] = [
  {
    id: "pos-system-cost-small-shop",
    title: "How much does a POS system cost for a small shop?",
    category: "FMCG and retail",
    status: "Draft",
    updated: "2 minutes ago",
  },
  {
    id: "move-orders-off-whatsapp",
    title: "When to move your orders off WhatsApp",
    category: "Food and restaurants",
    status: "Published",
    updated: "Oct 9",
  },
  {
    id: "clinic-software-checklist",
    title: "A checklist before you buy clinic software",
    category: "Clinics and doctors",
    status: "Published",
    updated: "Sep 27",
  },
];

export const blogCategories = [
  "Ecommerce stores",
  "Food and restaurants",
  "Travel and tours",
  "Clinics and doctors",
  "Diagnostic centers",
  "Schools",
  "Pet businesses",
  "FMCG and retail",
];
