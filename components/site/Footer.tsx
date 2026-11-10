import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { FooterWordmark } from "@/components/motion/FooterWordmark";
import { content, formMessages } from "@/content";
import { HomeLink } from "./HomeLink";
import { NewsletterForm } from "./NewsletterForm";

const colTitle = "text-sm font-semibold text-ink";
const colLink = "link-underline text-sm text-muted hover:text-ink";

export function Footer() {
  const { site, solutions, forms } = content;
  const { footer } = site;
  return (
    <footer className="theme-dark border-t border-border bg-ground">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.6fr)]">
        <div>
          <HomeLink label={`${site.name} home`} className="inline-block">
            <Logo />
          </HomeLink>
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
          <ul className="mt-3.5 space-y-2.5 text-sm">
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="group flex items-center gap-2.5 text-muted transition-colors hover:text-ink"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-surface-2 text-muted transition-colors group-hover:border-primary/50 group-hover:bg-primary-soft group-hover:text-primary">
                  <svg
                    className="size-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <span className="truncate">{site.contact.email}</span>
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${site.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 text-muted transition-colors hover:text-ink"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-surface-2 text-muted transition-colors group-hover:border-primary/50 group-hover:bg-primary-soft group-hover:text-primary">
                  <svg
                    className="size-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <span>{site.contact.whatsapp}</span>
              </a>
            </li>
          </ul>

          <div className="mt-5 border-t border-border/60 pt-4">
            <p className="mb-2.5 font-mono text-[10px] font-bold uppercase tracking-wider text-muted/70">
              Follow us
            </p>
            <div className="flex items-center gap-2">
              <a
                href={site.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="group flex size-9 items-center justify-center rounded-xl border border-border/80 bg-surface-2 text-muted shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0a66c2]/60 hover:bg-[#0a66c2]/10 hover:text-[#0a66c2]"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>

              <a
                href={site.contact.instagram ?? "https://www.instagram.com/devsrecipe"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
                className="group flex size-9 items-center justify-center rounded-xl border border-border/80 bg-surface-2 text-muted shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#e4405f]/60 hover:bg-[#e4405f]/10 hover:text-[#e4405f]"
              >
                <svg
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" strokeWidth="2.5" />
                </svg>
              </a>

              <a
                href={site.contact.facebook ?? "https://www.facebook.com/devsrecipe"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook"
                className="group flex size-9 items-center justify-center rounded-xl border border-border/80 bg-surface-2 text-muted shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1877f2]/60 hover:bg-[#1877f2]/10 hover:text-[#1877f2]"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.6 13.77 5.6c1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 3H13.1v6.8c4.56-.93 8-4.96 8-9.8z" />
                </svg>
              </a>
            </div>
          </div>
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

      {/* Signature: the brand name, edge to edge. */}
      <div className="container-x pt-6">
        <FooterWordmark text="devsrecipe" />
      </div>

      <div className="border-t border-border/50 py-6">
        <div className="container-x flex flex-col items-center justify-between gap-4 text-xs text-muted sm:flex-row">
          <p>© 2026 {site.name}. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="inline-block size-1.5 rounded-full bg-success" />
            <span>Available for new projects</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
