import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="container-x flex min-h-dvh flex-col items-start justify-center gap-6 py-20">
      <Link href="/" aria-label="Devs Recipe home">
        <Logo />
      </Link>
      <p className="eyebrow">Error 404</p>
      <h1 className="max-w-2xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
        This page is not on the menu.
      </h1>
      <p className="max-w-xl text-lg text-muted">
        The page you were looking for has moved or never existed. Head back home or see
        our work.
      </p>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/success-stories" variant="secondary">
          See our work
        </ButtonLink>
      </div>
    </main>
  );
}
