import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { content } from "@/content";

export default function NotFound() {
  const { notFound, site } = content;
  return (
    <main className="container-x flex min-h-dvh flex-col items-start justify-center gap-6 py-20">
      <Link href="/" aria-label={`${site.name} home`}>
        <Logo />
      </Link>
      <p className="eyebrow">{notFound.eyebrow}</p>
      <h1 className="max-w-2xl font-display text-6xl leading-[1.02] tracking-[-0.015em] sm:text-7xl">
        {notFound.title}
      </h1>
      <p className="max-w-xl text-lg text-muted">{notFound.text}</p>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href={notFound.primary.href}>{notFound.primary.label}</ButtonLink>
        <ButtonLink href={notFound.secondary.href} variant="secondary">
          {notFound.secondary.label}
        </ButtonLink>
      </div>
    </main>
  );
}
