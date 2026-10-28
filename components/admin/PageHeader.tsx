import type { ReactNode } from "react";

export function PageHeader({
  title,
  actions,
  note = "Sample data",
}: {
  title: string;
  actions?: ReactNode;
  note?: string;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-sm text-muted">{note}</p>
        <h1 className="mt-1 text-4xl font-bold tracking-tight">{title}</h1>
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </header>
  );
}
