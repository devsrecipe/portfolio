import { Card } from "./Card";

export function StatCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <Card className="p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 text-4xl font-bold">{value}</p>
      <p className="mt-2 text-sm text-muted">{note}</p>
    </Card>
  );
}
