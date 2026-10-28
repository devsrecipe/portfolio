import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Placeholder } from "@/components/ui/Placeholder";
import type { Story } from "@/types";

const tones = ["primary", "accent", "success"] as const;

function Row({ label, children }: { label: string; children: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1 text-[0.95rem]">{children}</p>
    </div>
  );
}

export function StoryCard({ story, index = 0 }: { story: Story; index?: number }) {
  const done = story.status === "completed";
  return (
    <Card className="lift reveal flex h-full flex-col overflow-hidden">
      <Placeholder
        label={done ? "[Project screenshot]" : "[Current build screenshot]"}
        tone={done ? tones[index % 3 === 1 ? 0 : index % 3] : "accent"}
        className="h-48"
      />
      <article className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>[{story.industry}]</Badge>
          <Badge>{story.country}</Badge>
          <Badge variant={done ? "success" : "warning"} className="ml-auto">
            {done ? "Completed" : "In progress"}
          </Badge>
        </div>
        <h3 className="text-xl font-semibold leading-snug">{story.title}</h3>
        <Row label="Problem">{story.problemShort}</Row>
        <Row label={done ? "What we built" : "What we are building"}>
          {story.builtShort}
        </Row>
        {done ? (
          <Row label="Result">{story.resultShort}</Row>
        ) : (
          <Row label="Where it stands">{story.whereItStands}</Row>
        )}
        <Link
          href={`/success-stories/${story.slug}`}
          className="mt-auto pt-2 text-sm font-semibold text-primary hover:text-primary-hover"
        >
          {done ? "Read the full story" : "Follow the build"} →
        </Link>
      </article>
    </Card>
  );
}
