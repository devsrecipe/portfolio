export type Industry = {
  slug: string;
  number: string;
  name: string;
  pain: string;
  build: string[];
  linkLabel: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
};

export type StoryStatus = "completed" | "in-progress" | "draft";

export type StoryResult = { value: string; label: string };

export type Story = {
  slug: string;
  client: string;
  title: string;
  industry: string;
  country: string;
  status: StoryStatus;
  summary: string;
  problemShort: string;
  builtShort: string;
  resultShort: string;
  whereItStands: string;
  timeline: string;
  team: string;
  platforms: string;
  liveSince: string;
  heroLabel: string;
  results: StoryResult[];
  problem: string;
  problemQuote: string;
  features: { name: string; description: string }[];
  screenshots: string[];
  phases: { name: string; duration: string; note: string }[];
  tech: string[];
  quote: { text: string; name: string; role: string };
  publishedAt: string;
};

export type Post = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  dateIso: string;
  searchTitle: string;
  body: { heading: string; text: string }[];
};

export type Job = {
  slug: string;
  title: string;
  location: string;
  remote: boolean;
  type: string;
  employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACTOR";
  level: string;
  openUntil: string;
  openUntilIso: string;
  postedIso: string;
  about: string;
  responsibilities: string[];
  requirements: string[];
  offer: string[];
  cvMaxMb: number;
  /** Applications are deleted automatically this many months after they arrive. */
  retentionMonths: number;
  replyPromise: string;
};

export type FaqItem = { question: string; answer: string };

export type TeamMember = { name: string; role: string; photoLabel: string };

export type AutomationScenario = {
  id: string;
  tab: string;
  title: string;
  inputs: { title: string; meta: string }[];
  outputs: { title: string; meta: string }[];
  handled: string[];
};

export type ApplicationStatus = "new" | "shortlisted" | "not-a-fit";
