"use client";

import { Card } from "@/components/ui/Card";
import { Field, Input, Textarea } from "@/components/ui/Field";
import { cn } from "@/lib/utils";

export const TITLE_LIMIT = 60;
export const DESCRIPTION_LIMIT = 160;

type Props = {
  domain: string;
  slug: string;
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
};

function Counter({ id, length, limit }: { id: string; length: number; limit: number }) {
  const over = length > limit;
  return (
    <span
      id={id}
      className={cn("text-sm font-medium", over ? "text-accent" : "text-success")}
    >
      {length} / {limit}
      <span className="sr-only">{over ? " characters, too long" : " characters"}</span>
    </span>
  );
}

/** Live search-title / description counters with a rendered SERP snippet. */
export function GooglePreview({
  domain,
  slug,
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: Props) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold">Google preview</h2>

      <div className="mt-4 space-y-4">
        <Field
          label="Search title"
          htmlFor="seo-title"
          className="[&>label]:flex [&>label]:justify-between"
        >
          <div className="relative">
            <Input
              id="seo-title"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              aria-describedby="seo-title-count"
              className={cn(title.length > TITLE_LIMIT && "border-accent")}
            />
          </div>
          <div className="text-right">
            <Counter id="seo-title-count" length={title.length} limit={TITLE_LIMIT} />
          </div>
        </Field>

        <Field label="Search description" htmlFor="seo-desc">
          <Textarea
            id="seo-desc"
            rows={4}
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            aria-describedby="seo-desc-count"
            className={cn(description.length > DESCRIPTION_LIMIT && "border-accent")}
          />
          <div className="text-right">
            <Counter
              id="seo-desc-count"
              length={description.length}
              limit={DESCRIPTION_LIMIT}
            />
          </div>
        </Field>
      </div>

      <div className="mt-4 rounded-xl bg-surface-2 p-4">
        <p className="truncate text-xs text-muted">
          {domain} › blog › {slug}
        </p>
        <p className="mt-1 text-lg leading-snug text-primary">
          {title.slice(0, TITLE_LIMIT + 5) || "Search title"}
        </p>
        <p className="mt-1 text-sm text-muted">
          {description.slice(0, DESCRIPTION_LIMIT) ||
            "The search description appears here as Google would show it."}
        </p>
      </div>
    </Card>
  );
}
