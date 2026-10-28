import { cn } from "@/lib/utils";
import { compareTable } from "@/content/site";

export function CompareTable() {
  const { columns, rows } = compareTable;
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[40rem] border-separate border-spacing-0 text-left">
        <caption className="sr-only">
          Devs Recipe compared with a typical agency and a freelance marketplace
        </caption>
        <thead>
          <tr>
            <td className="w-[34%]" />
            {columns.map((col, i) => (
              <th
                key={col}
                scope="col"
                className={cn(
                  "px-4 py-3 text-sm font-semibold",
                  i === 0 ? "rounded-t-2xl bg-primary text-ground" : "text-muted",
                )}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={row.feature}>
              <th scope="row" className="border-t border-border py-4 pr-4 font-semibold">
                {row.feature}
              </th>
              {row.values.map((value, i) => (
                <td
                  key={`${row.feature}-${i}`}
                  className={cn(
                    "border-t px-4 py-4",
                    i === 0
                      ? cn(
                          "border-border bg-surface-2 font-medium",
                          r === rows.length - 1 && "rounded-b-2xl",
                        )
                      : "border-border text-muted",
                  )}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
