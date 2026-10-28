"use client";

import { useState } from "react";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Field";
import { applicants as initial, adminJobs } from "@/content/admin";
import { cn } from "@/lib/utils";
import type { Applicant, ApplicationStatus } from "@/types";

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

function ApplicantPanel({
  applicant,
  jobTitle,
  onStatus,
}: {
  applicant: Applicant;
  jobTitle: string;
  onStatus: (status: ApplicationStatus) => void;
}) {
  return (
    <Card className="p-6 sm:p-7">
      <h2 className="text-2xl font-bold">{applicant.name}</h2>
      <p className="mt-1 text-sm text-muted">
        {jobTitle} · applied {applicant.applied}
      </p>

      <dl className="mt-5 space-y-2 text-sm">
        {[
          ["Email", applicant.email],
          ["Phone", applicant.phone],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4">
            <dt className="text-muted">{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Profile</dt>
          <dd>
            <a
              href={`https://${applicant.profile}`}
              className="text-primary underline"
              rel="noreferrer"
            >
              {applicant.profile}
            </a>
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-border p-4">
        <div>
          <p className="font-semibold">{applicant.cvName}</p>
          <p className="text-sm text-muted">{applicant.cvSize}</p>
        </div>
        <a
          href="#download"
          className="font-semibold text-primary hover:text-primary-hover"
        >
          Download
        </a>
      </div>

      <h3 className="mt-5 text-sm font-semibold">Why this role</h3>
      <p className="mt-1 text-sm">{applicant.why}</p>

      <label
        htmlFor={`note-${applicant.id}`}
        className="mt-5 block text-sm font-semibold"
      >
        Private team note
      </label>
      <Textarea id={`note-${applicant.id}`} rows={3} className="mt-1.5" />

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Button size="sm" onClick={() => onStatus("shortlisted")}>
          Shortlist
        </Button>
        <Button variant="secondary" size="sm" onClick={() => onStatus("not-a-fit")}>
          Not a fit
        </Button>
      </div>
      <p className="mt-4 text-sm text-muted">
        Applications are deleted automatically after [X months], matching the consent the
        applicant gave.
      </p>
    </Card>
  );
}

export function ApplicationsView() {
  const [list, setList] = useState<Applicant[]>(initial);
  const [selectedId, setSelectedId] = useState(initial[0].id);
  const [jobSlug, setJobSlug] = useState(adminJobs[0].slug);

  const rows = list.filter((a) => a.jobSlug === jobSlug);
  const selected = rows.find((a) => a.id === selectedId) ?? rows[0];
  const jobTitle = adminJobs.find((j) => j.slug === jobSlug)?.title ?? "";

  function setStatus(status: ApplicationStatus) {
    if (!selected) return;
    setList((current) =>
      current.map((a) => (a.id === selected.id ? { ...a, status } : a)),
    );
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
          onChange={(e) => setJobSlug(e.target.value)}
          className="h-11 rounded-xl border border-border bg-surface-2 px-3"
        >
          {adminJobs.map((j) => (
            <option key={j.slug} value={j.slug}>
              {j.title} · {j.applicants}
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
                  <td colSpan={3} className="px-5 py-8 text-center text-muted">
                    No applications yet.
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
            onStatus={setStatus}
          />
        ) : null}
      </div>
    </>
  );
}
