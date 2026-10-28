import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Placeholder } from "@/components/ui/Placeholder";
import { content } from "@/content";
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
  const t = content.stories.labels;
  const done = story.status === "completed";
  return (
    <Card className="lift flex h-full flex-col overflow-hidden">
      <Placeholder
        label={done ? t.projectScreenshot : t.buildScreenshot}
        tone={done ? tones[index % 3 === 1 ? 0 : index % 3] : "accent"}
        className="h-48"
      />
      <article className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>[{story.industry}]</Badge>
          <Badge>{story.country}</Badge>
          <Badge variant={done ? "success" : "warning"} className="ml-auto">
            {done ? t.completed : t.inProgress}
          </Badge>
        </div>
        <h3 className="text-xl font-semibold leading-snug">{story.title}</h3>
        <Row label={t.problem}>{story.problemShort}</Row>
        <Row label={done ? t.built : t.building}>{story.builtShort}</Row>
        {done ? (
          <Row label={t.result}>{story.resultShort}</Row>
        ) : (
          <Row label={t.whereItStands}>{story.whereItStands}</Row>
        )}
        <Link
          href={`/success-stories/${story.slug}`}
          className="mt-auto pt-2 text-sm font-semibold text-primary hover:text-primary-hover"
        >
          {done ? t.readStory : t.followBuild} →
        </Link>
      </article>
    </Card>
  );
}
