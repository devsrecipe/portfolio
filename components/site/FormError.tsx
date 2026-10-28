import { cn } from "@/lib/utils";

/** Error line under a form, with the contact email as a fallback. */
export function FormError({
  message,
  email,
  className,
}: {
  message: string;
  email: string;
  className?: string;
}) {
  if (!message) return null;
  const isAddress = email.includes("@");
  return (
    <p role="alert" className={cn("text-sm text-accent", className)}>
      {message}{" "}
      {isAddress ? (
        <a href={`mailto:${email}`} className="font-semibold underline">
          {email}
        </a>
      ) : null}
    </p>
  );
}
