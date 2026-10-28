import type { Job } from "@/types";

const shared = {
  cvMaxMb: 5,
  // Shown on the apply form and enforced by a TTL index on applications.
  retentionMonths: 6,
  replyPromise:
    "[Reply promise, for example: we reply to every applicant within 10 days]",
  postedIso: "2026-10-01",
  openUntilIso: "2026-12-31",
  openUntil: "[date]",
  about: "[Two or three sentences on what this person will own and why it matters.]",
  responsibilities: ["[Responsibility]", "[Responsibility]", "[Responsibility]"],
  requirements: [
    "[Skill or experience]",
    "[Skill or experience]",
    "[Skill or experience]",
  ],
  offer: ["[Salary range or benefit]", "[Benefit]", "[Benefit]"],
};

export const jobs: Job[] = [
  {
    ...shared,
    slug: "senior-react-developer",
    title: "Senior React Developer",
    location: "[Remote or office location]",
    remote: true,
    type: "Full time",
    employmentType: "FULL_TIME",
    level: "[Experience level]",
  },
  {
    ...shared,
    slug: "ui-designer",
    title: "UI Designer",
    location: "[Remote or office location]",
    remote: true,
    type: "Full time",
    employmentType: "FULL_TIME",
    level: "[Experience level]",
  },
];
