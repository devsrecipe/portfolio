# Devs Recipe

Marketing site and admin panel for Devs Recipe. Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4. Palette A · Midnight Kitchen.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # type check, lint-clean production build
npm run start
```

Admin lives at `/admin`. It is protected by `proxy.ts` (Next 16's name for middleware) and is `noindex` and disallowed in `robots.txt`.
Demo sign in, overridable with env vars `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`:

- email `admin@devsrecipe.local`
- password `change-me`

Set `NEXT_PUBLIC_SITE_URL` to the production origin so canonicals, sitemap and Open Graph URLs are correct.

## Where to edit

| What | Where |
| --- | --- |
| Colours (only place hex values live) | `app/globals.css` |
| Copy, nav, compare table, process steps | `content/site.ts` |
| Industries / solution pages | `content/industries.ts` |
| Success stories | `content/stories.ts` |
| Blog posts | `content/posts.ts` |
| Jobs | `content/jobs.ts` |
| FAQ, team, hero demo scenarios | `content/faq.ts`, `content/team.ts`, `content/automation.ts` |
| Admin sample data | `content/admin.ts` |

Bracketed placeholders such as `[Client name]` are content, not code. Fill them in the `content/` files.
Public pages read content through `lib/content.ts`, where each getter is cached and tagged (`posts`, `stories`, `jobs`, `industries`). Swap those function bodies for a CMS or database and call `revalidateTag` to refresh pages.

## Fonts

Self-hosted through `next/font/google`, `display: swap`:

- **Hanken Grotesk** for headings and body (closest to the geometric grotesk in the designs)
- **JetBrains Mono** for small uppercase labels, bracketed placeholders and code-like text

## Notes

- Forms (contact, newsletter, job application, sign in) use Server Actions with Zod validation. They validate and show success states, but do not store anything yet: see the `TODO` comments in `lib/actions.ts`.
- `lib/og.tsx`, `app/icon.tsx` and `app/apple-icon.tsx` repeat the palette as `rgb()` values because `ImageResponse` cannot read CSS variables.
- Admin auth is a demo. Replace `lib/auth.ts` with a real session provider before going live, and check the session in server code as well as in `proxy.ts`.
