import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { content, formMessages } from "@/content";
import { NewsletterForm } from "./NewsletterForm";

const colTitle = "text-sm font-semibold text-ink";
const colLink = "text-sm text-muted hover:text-ink";

export function Footer() {
  const { site, solutions, forms } = content;
  const { footer } = site;
  return (
    <footer className="theme-dark border-t border-border bg-ground">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr_1.6fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted">{site.tagline}</p>
        </div>

        <nav aria-label={footer.industriesTitle}>
          <h2 className={colTitle}>{footer.industriesTitle}</h2>
          <ul className="mt-3 space-y-2">
            {[...solutions.industries, solutions.startup].map((s) => (
              <li key={s.slug}>
                <Link href={`/solutions/${s.slug}`} className={colLink}>
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={footer.companyTitle}>
          <h2 className={colTitle}>{footer.companyTitle}</h2>
          <ul className="mt-3 space-y-2">
            {footer.companyLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className={colLink}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className={colLink}>
                {footer.privacyLabel}
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className={colTitle}>{footer.contactTitle}</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>{site.contact.email}</li>
            <li>{site.contact.whatsapp}</li>
            <li>{site.contact.linkedin}</li>
          </ul>
        </div>

        <div>
          <h2 className={colTitle}>{forms.newsletter.title}</h2>
          <p className="mt-3 text-sm text-muted">{forms.newsletter.text}</p>
          <NewsletterForm
            config={forms.newsletter}
            messages={formMessages}
            contactEmail={site.contact.email}
          />
        </div>
      </div>
    </footer>
  );
}
