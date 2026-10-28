import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd } from "@/lib/seo";

type Crumb = { name: string; path: string };

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          {crumbs.map((crumb, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-ink">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.path} className="hover:text-ink">
                    {crumb.name}
                  </Link>
                )}
                {last ? null : <span aria-hidden>/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
