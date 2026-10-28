import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";

type Props = {
  title: string;
  text: string;
  secondary?: { href: string; label: string };
  children?: ReactNode;
};

/** Dark band with a primary call and an optional outlined link ("Facing the same problem?"). */
export function CTASection({ title, text, secondary }: Props) {
  return (
    <section className="border-t border-border bg-surface">
      <div className="container-x flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <p className="mt-2 max-w-xl text-muted">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/#contact" variant="inverse">
            Book a 30 minute call
          </ButtonLink>
          {secondary ? (
            <ButtonLink href={secondary.href} variant="secondary">
              {secondary.label}
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </section>
  );
}
