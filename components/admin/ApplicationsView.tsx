"use client";

import { useState, useTransition } from "react";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Field";
import { saveApplicationNote, setApplicationStatus } from "@/lib/admin-actions";
import { cn } from "@/lib/utils";
import type { ApplicationStatus } from "@/types";
import type { AdminApplicant, AdminJobOption } from "@/types/admin";

const statusLabel: Record<ApplicationStatus, string> = {
  new: "New",
  shortlisted: "Shortlisted",
  "not-a-fit": "Not a fit",
};

const statusBadge: Record<ApplicationStatus, BadgeVariant> = {
  new: "new",
  shortlisted: "success",
  "not-a-fit": "neutral",
};

function profileHref(profile: string) {
  return /^https?:\/\//.test(profile) ? profile : `https://${profile}`;
}

function ApplicantPanel({
  applicant,
  jobTitle,
  retentionMonths,
  onStatus,
}: {
  applicant: AdminApplicant;
  jobTitle: string;
  retentionMonths: number;
  onStatus: (status: ApplicationStatus) => void;
}) {
  const [note, setNote] = useState(applicant.note);
  const [noteState, setNoteState] = useState<"idle" | "saving" | "saved">("idle");
  const [, startTransition] = useTransition();

  function saveNote() {
    if (note === applicant.note && noteState === "idle") return;
    setNoteState("saving");
    startTransition(async () => {
      await saveApplicationNote(applicant.id, note);
      setNoteState("saved");
    });
  }

  return (
    <Card className="p-6 sm:p-7">
      <h2 className="text-2xl font-bold">{applicant.name}</h2>
      <p className="mt-1 text-sm text-muted">
        {jobTitle} · applied {applicant.applied.toLowerCase()}
      </p>

      <dl className="mt-5 space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Email</dt>
          <dd>
            <a href={`mailto:${applicant.email}`} className="hover:text-primary">
              {applicant.email}
            </a>
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Phone</dt>
          <dd>{applicant.phone}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Profile</dt>
          <dd className="min-w-0 truncate">
            <a
              href={profileHref(applicant.profile)}
              className="text-primary underline"
              target="_blank"
              rel="noreferrer noopener"
            >
              {applicant.profile.replace(/^https?:\/\//, "")}
            </a>
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-border p-4">
        <div className="min-w-0">
          <p className="truncate font-semibold">{applicant.cvName}</p>
          <p className="text-sm text-muted">{applicant.cvSize}</p>
        </div>
        <a
          href={`/admin/applications/${applicant.id}/cv`}
          className="font-semibold text-primary hover:text-primary-hover"
        >
          Download
        </a>
      </div>

      <h3 className="mt-5 text-sm font-semibold">Why this role</h3>
      <p className="mt-1 whitespace-pre-line text-sm">
        {applicant.why || <span className="text-muted">No note added.</span>}
      </p>

      <div className="mt-5 flex items-baseline justify-between">
        <label htmlFor={`note-${applicant.id}`} className="text-sm font-semibold">
          Private team note
        </label>
        <span role="status" className="text-xs text-muted">
          {noteState === "saving" ? "Saving…" : noteState === "saved" ? "Saved" : ""}
        </span>
      </div>
      <Textarea
        id={`note-${applicant.id}`}
        rows={3}
        value={note}
        onChange={(e) => {
          setNote(e.target.value);
          setNoteState("idle");
        }}
        onBlur={saveNote}
        className="mt-1.5"
      />

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Button
          size="sm"
          aria-pressed={applicant.status === "shortlisted"}
          onClick={() => onStatus("shortlisted")}
        >
          Shortlist
        </Button>
        <Button
          variant="secondary"
          size="sm"
          aria-pressed={applicant.status === "not-a-fit"}
          onClick={() => onStatus("not-a-fit")}
        >
          Not a fit
        </Button>
      </div>
      <p className="mt-4 text-sm text-muted">
        Applications are deleted automatically after {retentionMonths} months, matching
        the consent the applicant gave.
      </p>
    </Card>
  );
}

type Props = {
  applicants: AdminApplicant[];
  jobOptions: AdminJobOption[];
  retentionMonths: Record<string, number>;
};

export function ApplicationsView({ applicants, jobOptions, retentionMonths }: Props) {
  const [list, setList] = useState(applicants);
  const [jobSlug, setJobSlug] = useState(
    jobOptions.find((j) => j.count > 0)?.slug ?? jobOptions[0]?.slug ?? "",
  );
  const rows = list.filter((a) => a.jobSlug === jobSlug);
  const [selectedId, setSelectedId] = useState(rows[0]?.id ?? "");
  const [, startTransition] = useTransition();

  const selected = rows.find((a) => a.id === selectedId) ?? rows[0];
  const jobTitle = jobOptions.find((j) => j.slug === jobSlug)?.title ?? "";

  function setStatus(status: ApplicationStatus) {
    if (!selected) return;
    const id = selected.id;
    // Optimistic: update the row now, persist in the background.
    setList((current) => current.map((a) => (a.id === id ? { ...a, status } : a)));
    startTransition(() => setApplicationStatus(id, status));
  }

  return (
    <>
      <div className="flex items-center gap-3 sm:justify-end">
        <label htmlFor="job-select" className="text-sm font-semibold">
          Job
        </label>
        <select
          id="job-select"
          value={jobSlug}
          onChange={(e) => {
            setJobSlug(e.target.value);
            setSelectedId("");
          }}
          className="h-11 rounded-xl border border-border bg-surface-2 px-3"
        >
          {jobOptions.map((j) => (
            <option key={j.slug} value={j.slug}>
              {j.title} · {j.count}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 grid items-start gap-6 xl:grid-cols-[1.2fr_1fr]">
        <Card className="overflow-x-auto">
          <table className="w-full min-w-[30rem] text-left">
            <caption className="sr-only">Applicants for {jobTitle}</caption>
            <thead className="text-sm text-muted">
              <tr className="border-b border-border">
                <th scope="col" className="px-5 py-4 font-medium">
                  Applicant
                </th>
                <th scope="col" className="px-3 py-4 font-medium">
                  Applied
                </th>
                <th scope="col" className="px-5 py-4 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-5 py-10 text-center text-muted">
                    No applications for this role yet. They appear here as soon as someone
                    applies on the careers page.
                  </td>
                </tr>
              ) : null}
              {rows.map((a) => {
                const active = a.id === selected?.id;
                return (
                  <tr
                    key={a.id}
                    className={cn(
                      "border-b border-border last:border-0",
                      active
                        ? "bg-primary-soft shadow-[inset_3px_0_0_var(--color-primary)]"
                        : "hover:bg-surface-2",
                    )}
                  >
                    <th scope="row" className="px-5 py-4 text-left">
                      <button
                        type="button"
                        onClick={() => setSelectedId(a.id)}
                        aria-pressed={active}
                        className="text-left"
                      >
                        <span className="block font-semibold">{a.name}</span>
                        <span className="block text-sm font-normal text-muted">
                          {a.email}
                        </span>
                      </button>
                    </th>
                    <td className="px-3 py-4 text-muted">{a.applied}</td>
                    <td className="px-5 py-4">
                      <Badge variant={statusBadge[a.status]}>
                        {statusLabel[a.status]}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>

        {selected ? (
          <ApplicantPanel
            key={selected.id}
            applicant={selected}
            jobTitle={jobTitle}
            retentionMonths={retentionMonths[selected.jobSlug] ?? 6}
            onStatus={setStatus}
          />
        ) : null}
      </div>
    </>
  );
}
