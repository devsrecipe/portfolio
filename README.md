# Devs Recipe

Marketing site and admin panel for Devs Recipe. Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4. Palette A · Midnight Kitchen.

## Run it

Needs MongoDB (local or Atlas).

```bash
npm install
cp .env.example .env   # then fill in, see below
npm run dev            # http://localhost:3000
npm run build          # type check, lint-clean production build
npm run start
npm run seed           # create the admin, or reset its password, from SEED_ADMIN_*
```

### Environment (`.env`)

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL`, `DB_NAME` | MongoDB connection, e.g. `mongodb://localhost:27017` and `devsrecipe` |
| `ADMIN_SESSION_SECRET` | Signs the admin session cookie. Long and random. Changing it signs everyone out |
| `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD` | Default admin, created automatically the first time the sign-in page is used and no admin exists |
| `NEXT_PUBLIC_SITE_URL` | Public origin, used for canonicals, sitemap, OG images and password-reset links |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` | Sends password-reset emails. With `SMTP_HOST` empty, the reset link is printed in the server terminal instead |

### Admin

Admin lives at `/admin`, is `noindex`, and is disallowed in `robots.txt`.

- Default sign in: `admin@gmail.com` / `123456` (from `.env`). Change it after the first sign in via **Forgot password?**, or change `SEED_ADMIN_PASSWORD` and run `npm run seed`.
- **Forgot password** emails a single-use link that works for 60 minutes. Setting a new password signs the admin out everywhere else.
- `proxy.ts` (Next 16's name for middleware) checks the signed session cookie. Every admin page, action and the CV download re-check the admin against the database.

## Where the data lives

MongoDB database `DB_NAME`:

| Collection | Filled by | Seen in admin |
| --- | --- | --- |
| `admins` | seed / reset password | sign in |
| `contacts` | homepage contact form | Messages |
| `subscribers` | footer newsletter form | Subscribers |
| `applications` + GridFS bucket `cvs` | careers apply form (CV stored in GridFS) | Applications, Overview |
| `password_resets` | forgot password | — |

Applications are deleted automatically after the job's `retentionMonths` (TTL index), matching the consent the applicant gives. Expired reset links are also removed automatically.

Site content (industries, stories, blog posts, jobs) is still edited in `content/`, below. The admin Success stories and Blog screens show sample data until that content moves into the database.

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
| Admin nav, sample stories and blog rows | `content/admin.ts` |

Bracketed placeholders such as `[Client name]` are content, not code. Fill them in the `content/` files.
Public pages read content through `lib/content.ts`, where each getter is cached and tagged (`posts`, `stories`, `jobs`, `industries`). Swap those function bodies for a CMS or database and call `revalidateTag` to refresh pages.

## Fonts

Self-hosted through `next/font/google`, `display: swap`:

- **Hanken Grotesk** for headings and body (closest to the geometric grotesk in the designs)
- **JetBrains Mono** for small uppercase labels, bracketed placeholders and code-like text

## Animation

All motion lives in `components/motion/`:

- **Framer Motion:** `Reveal` and `Stagger*` (scroll-in reveals), `HeroHeadline` (word by word), `ScrollProgress` (top bar), and the sliding tab pill and node transitions in `AutomationDemo`. `MotionProvider` makes them honour `prefers-reduced-motion`.
- **GSAP + ScrollTrigger:** `HeroGlow` (drifting, scroll-parallax glows), `ScrubLine` (line that draws as you scroll), `ScrubText` (words light up as you scroll), `Parallax` (team photos), `Marquee` ("Trusted by" loop) and `Magnetic` (buttons that follow the cursor).
- **Lenis:** `SmoothScroll` eases wheel scrolling and anchor links. It runs on GSAP's ticker so ScrollTrigger stays in sync. Add `data-lenis-prevent` to any element that must keep native scrolling (for example a scrollable modal).
- **Pointer effects:** `TiltCard` (3D tilt + glare on story cards, Framer Motion) and `Spotlight` (cursor glow across the industry cards).

## Notes

- Forms use Server Actions (`lib/actions.ts`) with Zod validation (`lib/validation.ts`). On an error they send back what was typed (never passwords or files), so the fields don't empty.
- `lib/og.tsx`, `app/icon.tsx` and `app/apple-icon.tsx` repeat the palette as `rgb()` values because `ImageResponse` cannot read CSS variables.
- Before going live, add rate limiting to sign in, forgot password and the public forms (for example at your host or a reverse proxy).
