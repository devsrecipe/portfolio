import type { Applicant, StoryStatus } from "@/types";

export const adminUser = { name: "[Admin name]" };

export const adminNav = [
  { label: "Overview", href: "/admin" },
  { label: "Success stories", href: "/admin/success-stories" },
  { label: "Blog", href: "/admin/blog" },
  { label: "Jobs", href: "/admin/jobs" },
  { label: "Applications", href: "/admin/applications", badge: "3" },
  { label: "Subscribers", href: "/admin/subscribers" },
  { label: "Settings", href: "/admin/settings" },
] as const;

export const overviewStats = [
  { label: "New applications", value: "3", note: "Waiting for review" },
  { label: "Subscribers", value: "48", note: "+6 this week" },
  { label: "Success stories", value: "7", note: "5 completed · 2 in progress" },
  { label: "Blog posts", value: "4", note: "1 draft" },
];

export const attention = [
  {
    tone: "primary",
    title: "3 new applications for Senior React Developer",
    note: "Oldest one arrived 2 days ago",
  },
  {
    tone: "warning",
    title: '"School management system" has not been updated in 45 days',
    note: "Visitors see it as in progress. Add an update or mark it completed.",
  },
  {
    tone: "neutral",
    title: 'Job "UI Designer" closes in 3 days',
    note: "It will hide from the careers page automatically.",
  },
] as const;

export const recentActivity = [
  { text: 'Published blog post "How much does a POS system cost?"', when: "Today" },
  { text: 'Marked "Clinic appointment app" as completed', when: "Yesterday" },
  { text: "New subscriber from the footer form", when: "Yesterday" },
  { text: 'Opened job "Senior React Developer"', when: "Oct 9" },
];

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

export const applicants: Applicant[] = [
  {
    id: "a1",
    name: "Sara Malik",
    email: "sara.malik@example.com",
    phone: "+00 000 000 000",
    profile: "github.com/saramalik",
    applied: "2 days ago",
    status: "new",
    jobSlug: "senior-react-developer",
    cvName: "Sara_Malik_CV.pdf",
    cvSize: "PDF · 312 KB",
    why: "[The applicant's note from the apply form appears here.]",
  },
  {
    id: "a2",
    name: "Daniel Ortiz",
    email: "d.ortiz@example.com",
    phone: "+00 000 000 001",
    profile: "github.com/dortiz",
    applied: "Yesterday",
    status: "new",
    jobSlug: "senior-react-developer",
    cvName: "Daniel_Ortiz_CV.pdf",
    cvSize: "PDF · 280 KB",
    why: "[The applicant's note from the apply form appears here.]",
  },
  {
    id: "a3",
    name: "Tanvir Hasan",
    email: "tanvir.h@example.com",
    phone: "+00 000 000 002",
    profile: "github.com/tanvirh",
    applied: "Today",
    status: "new",
    jobSlug: "senior-react-developer",
    cvName: "Tanvir_Hasan_CV.docx",
    cvSize: "Word · 190 KB",
    why: "[The applicant's note from the apply form appears here.]",
  },
  {
    id: "a4",
    name: "Lena Fischer",
    email: "lena.f@example.com",
    phone: "+00 000 000 003",
    profile: "github.com/lenaf",
    applied: "Oct 8",
    status: "shortlisted",
    jobSlug: "senior-react-developer",
    cvName: "Lena_Fischer_CV.pdf",
    cvSize: "PDF · 402 KB",
    why: "[The applicant's note from the apply form appears here.]",
  },
  {
    id: "a5",
    name: "Omar Khalid",
    email: "omar.k@example.com",
    phone: "+00 000 000 004",
    profile: "github.com/omark",
    applied: "Oct 6",
    status: "not-a-fit",
    jobSlug: "senior-react-developer",
    cvName: "Omar_Khalid_CV.pdf",
    cvSize: "PDF · 221 KB",
    why: "[The applicant's note from the apply form appears here.]",
  },
];

export const adminJobs = [
  {
    slug: "senior-react-developer",
    title: "Senior React Developer",
    status: "Open",
    closes: "[date]",
    applicants: 5,
  },
  {
    slug: "ui-designer",
    title: "UI Designer",
    status: "Open",
    closes: "In 3 days",
    applicants: 0,
  },
];

export const subscribers = [
  { email: "owner@shop.example", joined: "Today", source: "Footer form" },
  { email: "hello@clinic.example", joined: "Yesterday", source: "Footer form" },
  { email: "ops@tours.example", joined: "Oct 12", source: "Footer form" },
  { email: "founder@startup.example", joined: "Oct 9", source: "Blog" },
];
