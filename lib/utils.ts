import clsx, { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

export function absoluteUrl(path = "/"): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://devsrecipe.com";
  return new URL(path, base).toString();
}
