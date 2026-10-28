"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { GooglePreview } from "@/components/admin/GooglePreview";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Field, Input, Select } from "@/components/ui/Field";
import { blogCategories } from "@/content/admin";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  slug: string;
  category: string;
  body: string;
  searchTitle: string;
  searchDescription: string;
};

type ToolbarAction = { label: string; before: string; after?: string; aria: string };

const toolbar: ToolbarAction[] = [
  { label: "B", before: "**", after: "**", aria: "Bold" },
  { label: "I", before: "_", after: "_", aria: "Italic" },
  { label: "H2", before: "\n## ", aria: "Heading 2" },
  { label: "H3", before: "\n### ", aria: "Heading 3" },
  { label: "List", before: "\n- ", aria: "List" },
  { label: "Link", before: "[", after: "](https://)", aria: "Link" },
  { label: "Image", before: "\n![Alt text](", after: ")", aria: "Image" },
  { label: "Quote", before: "\n> ", aria: "Quote" },
];

export function BlogEditor(props: Props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  const [category, setCategory] = useState(props.category || blogCategories[0]);
  const [searchTitle, setSearchTitle] = useState(props.searchTitle);
  const [searchDescription, setSearchDescription] = useState(props.searchDescription);
  const [preview, setPreview] = useState(false);
  const [saved, setSaved] = useState<string>("Draft · saved 2 minutes ago");
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  function apply(action: ToolbarAction) {
    const el = bodyRef.current;
    if (!el) return;
    const { selectionStart: start, selectionEnd: end } = el;
    const selected = body.slice(start, end);
    const next =
      body.slice(0, start) +
      action.before +
      selected +
      (action.after ?? "") +
      body.slice(end);
    setBody(next);
    requestAnimationFrame(() => {
      el.focus();
      const cursor = start + action.before.length + selected.length;
      el.setSelectionRange(cursor, cursor);
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link href="/admin/blog" className="text-sm font-semibold text-primary">
            ← All posts
          </Link>
          <p className="mt-1 text-sm text-muted" role="status">
            {saved}
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            size="sm"
            aria-pressed={preview}
            onClick={() => setPreview((p) => !p)}
          >
            {preview ? "Edit" : "Preview"}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setSaved("Draft · saved just now")}
          >
            Save draft
          </Button>
          <Button size="sm" onClick={() => setSaved("Published")}>
            Publish
          </Button>
        </div>
      </div>

      <div className="grid items-start gap-6 xl:grid-cols-[1.9fr_1fr]">
        <Card className="p-6 sm:p-8">
          <label htmlFor="post-title" className="sr-only">
            Post title
          </label>
          <input
            id="post-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            className="w-full bg-transparent text-3xl font-bold tracking-tight placeholder:text-muted focus-visible:outline-none sm:text-4xl"
          />
          <p className="mt-3 font-mono text-sm text-muted">
            {site.domain}/blog/<span className="text-ink">{props.slug}</span>
          </p>

          <div
            role="toolbar"
            aria-label="Formatting"
            className="mt-6 flex flex-wrap gap-1 rounded-xl border border-border p-1.5"
          >
            {toolbar.map((action) => (
              <button
                key={action.label}
                type="button"
                aria-label={action.aria}
                onClick={() => apply(action)}
                disabled={preview}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-semibold hover:bg-surface-2 disabled:opacity-40",
                  action.label === "I" && "italic",
                )}
              >
                {action.label}
              </button>
            ))}
          </div>

          {preview ? (
            <pre className="mt-6 min-h-80 whitespace-pre-wrap font-sans text-lg leading-relaxed">
              {body}
            </pre>
          ) : (
            <>
              <label htmlFor="post-body" className="sr-only">
                Post body
              </label>
              <textarea
                id="post-body"
                ref={bodyRef}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={14}
                className="mt-6 min-h-80 w-full resize-y bg-transparent text-lg leading-relaxed placeholder:text-muted focus-visible:outline-none"
              />
            </>
          )}
          <div className="mt-4 flex h-36 items-center justify-center rounded-xl bg-surface-2 font-mono text-sm text-muted">
            [Image inside the post]
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold">Publishing</h2>
            <div className="mt-4 space-y-4">
              <Field label="Category" htmlFor="post-category">
                <Select
                  id="post-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {blogCategories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Publish date" htmlFor="post-date">
                <Input id="post-date" defaultValue="Publish now" />
              </Field>
              <div>
                <p className="text-sm font-semibold">Cover image</p>
                <label
                  htmlFor="post-cover"
                  className="mt-1.5 flex h-24 cursor-pointer items-center justify-center rounded-xl border border-dashed border-border font-semibold text-primary hover:bg-surface-2"
                >
                  Upload image
                  <input
                    id="post-cover"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
          </Card>

          <GooglePreview
            domain={site.domain}
            slug={props.slug}
            title={searchTitle}
            description={searchDescription}
            onTitleChange={setSearchTitle}
            onDescriptionChange={setSearchDescription}
          />
        </div>
      </div>
    </div>
  );
}
