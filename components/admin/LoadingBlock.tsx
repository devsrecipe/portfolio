/** Placeholder shown while an admin page's live data loads. */
export function LoadingBlock({ label = "Loading…" }: { label?: string }) {
  return (
    <div
      role="status"
      className="h-48 animate-pulse rounded-3xl border border-border bg-surface p-6 text-muted"
    >
      {label}
    </div>
  );
}
