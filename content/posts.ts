import type { Post } from "@/types";

const body = [
  {
    heading: "",
    text: "[Opening paragraph that answers the question in the title directly. Buyers who search a question want the answer first.]",
  },
  {
    heading: "[Section heading]",
    text: "[Body text written in the editor. Headings, lists, images and links come from the toolbar above.]",
  },
];

export const posts: Post[] = [
  {
    slug: "pos-system-cost-small-shop",
    title: "How much does a POS system cost for a small shop?",
    summary: "[Short summary]",
    category: "FMCG and retail",
    date: "Oct 18",
    dateIso: "2026-10-18",
    searchTitle: "POS System Cost for a Small Shop",
    body,
  },
  {
    slug: "move-orders-off-whatsapp",
    title: "When to move your orders off WhatsApp",
    summary: "[Short summary]",
    category: "Food and restaurants",
    date: "Oct 9",
    dateIso: "2026-10-09",
    searchTitle: "Move Orders Off WhatsApp",
    body,
  },
  {
    slug: "clinic-software-checklist",
    title: "A checklist before you buy clinic software",
    summary: "[Short summary]",
    category: "Clinics and doctors",
    date: "Sep 27",
    dateIso: "2026-09-27",
    searchTitle: "Clinic Software Buying Checklist",
    body,
  },
];
