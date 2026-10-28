import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy policy",
  description:
    "How Devs Recipe collects, uses and deletes the personal data you send us through our forms.",
  path: "/privacy",
});

const sections = [
  {
    heading: "What we collect",
    text: "[List the data collected through the contact form, newsletter signup and job applications.]",
  },
  {
    heading: "How long we keep it",
    text: "[Retention periods. Job applications are deleted automatically after the period the applicant agreed to.]",
  },
  {
    heading: "Your rights",
    text: "[How to ask for access, correction or deletion of your data, and who to contact.]",
  },
];

export default function PrivacyPage() {
  return (
    <article className="container-x max-w-3xl py-16">
      <h1 className="text-5xl font-bold tracking-tight">Privacy policy</h1>
      <div className="mt-10 space-y-8">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-2xl font-bold">{s.heading}</h2>
            <p className="mt-3 text-muted">{s.text}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
