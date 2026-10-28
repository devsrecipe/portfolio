import type { Story } from "@/types";

const detail = {
  country: "[Country]",
  timeline: "[X weeks]",
  team: "[X people]",
  platforms: "[Web, iOS, Android]",
  liveSince: "[Month and year]",
  heroLabel: "[Main product screenshot or short screen recording]",
  results: [
    {
      value: "[X%]",
      label: "[What this number measures, for example: less time per order]",
    },
    {
      value: "[X hours]",
      label: "[What this number measures, for example: manual work saved each week]",
    },
    {
      value: "[X]",
      label:
        "[What this number measures, for example: orders handled in the first month]",
    },
  ],
  problem:
    "[What was going wrong before, told in the client's own words. Which tasks were done by hand, what it cost them in time or money, and what they had tried before. Three to five sentences.]",
  problemQuote: "[A short quote from the client describing the pain before.]",
  features: [
    {
      name: "[Feature name]",
      description: "[What it does for the client, one sentence]",
    },
    {
      name: "[Feature name]",
      description: "[What it does for the client, one sentence]",
    },
    {
      name: "[Feature name]",
      description: "[What it does for the client, one sentence]",
    },
    {
      name: "[Feature name]",
      description: "[What it does for the client, one sentence]",
    },
  ],
  screenshots: ["[Admin panel screenshot]", "[Customer facing screen]"],
  phases: [
    {
      name: "Discover",
      duration: "[weeks 1 to 2]",
      note: "[What you learned about how the client works]",
    },
    {
      name: "Design",
      duration: "[weeks]",
      note: "[What the client saw and approved before coding]",
    },
    { name: "Build", duration: "[weeks]", note: "[How often the client saw progress]" },
    {
      name: "Launch",
      duration: "[date]",
      note: "[How the switch from the old way went]",
    },
  ],
  tech: ["[Technology]", "[Technology]", "[Technology]", "[Technology]"],
  quote: {
    text: "[The client's quote about the result and about working with the team.]",
    name: "[Client name]",
    role: "[Role, Company, Country]",
  },
} satisfies Partial<Story>;

export const stories: Story[] = [
  {
    ...detail,
    slug: "diagnostic-center-paper-reports-to-online-delivery",
    client: "[Client name]",
    title: "[Client name]: [what we built]",
    industry: "Diagnostic centers",
    status: "completed",
    summary:
      "[Two sentences: who the client is, and what they can do now that they could not do before.]",
    problemShort: "[The client's problem in one sentence]",
    builtShort: "[The system in one sentence]",
    resultShort: "[One real number, for example: order handling time down X%]",
    whereItStands: "",
    publishedAt: "2026-10-02",
  },
  {
    ...detail,
    slug: "school-management-system",
    client: "[Client name]",
    title: "[Client name]: [what we are building]",
    industry: "Schools",
    status: "in-progress",
    summary:
      "[Two sentences: who the client is, and what they will be able to do once the system is live.]",
    problemShort: "[The client's problem in one sentence]",
    builtShort: "[The system in one sentence]",
    resultShort: "",
    whereItStands: "[What is live now, and the planned launch month]",
    publishedAt: "2026-08-31",
  },
  {
    ...detail,
    slug: "clinic-appointment-app",
    client: "[Client name]",
    title: "[Client name]: [what we built]",
    industry: "Clinics and doctors",
    status: "completed",
    summary:
      "[Two sentences: who the client is, and what they can do now that they could not do before.]",
    problemShort: "[The client's problem in one sentence]",
    builtShort: "[The system in one sentence]",
    resultShort: "[One real number the client agreed to share]",
    whereItStands: "",
    publishedAt: "2026-10-12",
  },
  {
    ...detail,
    slug: "restaurant-ordering-and-kitchen-display",
    client: "[Client name]",
    title: "[Client name]: restaurant ordering and kitchen display",
    industry: "Food and restaurants",
    status: "in-progress",
    summary:
      "[Two sentences: who the client is, and what they will be able to do once the system is live.]",
    problemShort: "[The client's problem in one sentence]",
    builtShort: "[The system in one sentence]",
    resultShort: "",
    whereItStands: "[What is live now, and the planned launch month]",
    publishedAt: "2026-10-11",
  },
];

export const storyClientQuote = {
  text: "[A real client quote about working with you.]",
  name: "[Client name]",
  role: "[Role, Company, Country]",
};
