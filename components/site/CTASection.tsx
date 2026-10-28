import { ButtonLink } from "@/components/ui/Button";
import { content } from "@/content";

/** Dark band with a primary call and an optional outlined link ("Facing the same problem?"). */
export function CTASection({
  secondary,
}: {
  secondary?: { href: string; label: string };
}) {
  const { title, text, primary } = content.cta;
  return (
    <section className="border-t border-border bg-surface">
      <div className="container-x flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-4xl tracking-[-0.015em]">{title}</h2>
          <p className="mt-2 max-w-xl text-muted">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={primary.href} variant="inverse">
            {primary.label}
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
