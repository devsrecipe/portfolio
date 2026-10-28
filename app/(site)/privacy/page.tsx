import type { Metadata } from "next";
import { content } from "@/content";
import { buildMetadata } from "@/lib/seo";

const { privacy } = content;

export const metadata: Metadata = buildMetadata({ ...privacy.seo, path: "/privacy" });

export default function PrivacyPage() {
  return (
    <article className="container-x max-w-3xl py-16">
      <h1 className="text-5xl font-bold tracking-tight">{privacy.title}</h1>
      <div className="mt-10 space-y-8">
        {privacy.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-2xl font-bold">{s.heading}</h2>
            <p className="mt-3 text-muted">{s.text}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
