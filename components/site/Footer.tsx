import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { industries, startupSolution } from "@/content/industries";
import { footerCompanyLinks, site } from "@/content/site";
import { NewsletterForm } from "./NewsletterForm";

const colTitle = "text-sm font-semibold text-ink";
const colLink = "text-sm text-muted hover:text-ink";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr_1.6fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted">{site.tagline}</p>
        </div>

        <nav aria-label="Industries">
          <h2 className={colTitle}>Industries</h2>
          <ul className="mt-3 space-y-2">
            {[...industries, startupSolution].map((s) => (
              <li key={s.slug}>
                <Link href={`/solutions/${s.slug}`} className={colLink}>
                  {s.slug === "startup-mvp"
                    ? s.name
                    : s.name.replace("Ecommerce stores", "Ecommerce")}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className={colTitle}>Company</h2>
          <ul className="mt-3 space-y-2">
            {footerCompanyLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className={colLink}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className={colLink}>
                Privacy policy
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className={colTitle}>Contact</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>{site.contact.email}</li>
            <li>{site.contact.whatsapp}</li>
            <li>{site.contact.linkedin}</li>
          </ul>
        </div>

        <div>
          <h2 className={colTitle}>Get updates</h2>
          <p className="mt-3 text-sm text-muted">
            New success stories and articles, about once a month.
          </p>
          <NewsletterForm />
        </div>
      </div>
    </footer>
  );
}
