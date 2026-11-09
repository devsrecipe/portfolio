import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { SmartHeader } from "@/components/motion/SmartHeader";
import { ButtonLink } from "@/components/ui/Button";
import { content } from "@/content";

export function Header() {
  const { nav, bookCall, name } = content.site;
  return (
    <SmartHeader>
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Link href="/" aria-label={`${name} home`}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {nav.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="link-underline text-[0.95rem]"
            >
              {link.label}
            </Link>
          ))}
          <ButtonLink href={bookCall.href} size="sm" arrow>
            {bookCall.label}
          </ButtonLink>
        </nav>

        {/* Native <details> menu keeps the mobile nav working without JavaScript. */}
        <details className="group relative md:hidden">
          <summary
            aria-label="Menu"
            className="grid size-11 cursor-pointer place-items-center rounded-full border border-border"
          >
            <span aria-hidden className="text-xl leading-none group-open:hidden">
              ☰
            </span>
            <span aria-hidden className="hidden text-xl leading-none group-open:block">
              ✕
            </span>
          </summary>
          <nav
            aria-label="Mobile"
            className="absolute right-0 top-14 flex w-64 flex-col gap-1 rounded-2xl border border-border bg-surface p-3 shadow-xl"
          >
            {nav.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-lg px-3 py-2.5 hover:bg-surface-2"
              >
                {link.label}
              </Link>
            ))}
            <ButtonLink href={bookCall.href} size="sm" className="mt-2">
              {bookCall.label}
            </ButtonLink>
          </nav>
        </details>
      </div>
    </SmartHeader>
  );
}
