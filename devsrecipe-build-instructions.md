# Devs Recipe — Build Instructions for the Coding Agent

You are building the **Devs Recipe** website and admin panel in **Next.js (App Router, latest stable) + TypeScript + Tailwind CSS**.

The attached screenshots are the source of truth for **layout, spacing, typography, components and copy**. Reproduce them as closely as possible. The **only** thing that changes is the color: the screenshots use a light/electric-blue look, but this build must use **Palette A · Midnight Kitchen** (dark, premium, warm) defined below.

Before writing code, look at every screenshot carefully and list each section and component you see. Then build.

---

## 1. Color palette — A · Midnight Kitchen

### Core brand colors (from the palette board — use these exact values)

| Token        | Hex       | Role                                                        |
|--------------|-----------|-------------------------------------------------------------|
| `ground`     | `#0F1115` | Page background (dark)                                      |
| `ink`        | `#F3F1EC` | Main text, headings, outlined-button text and borders       |
| `primary`    | `#FF6A3D` | Primary buttons, active nav item, links, focus ring         |
| `accent`     | `#FFB547` | Tags/pills (e.g. "Ecommerce · Food · Travel"), highlights, badges |
| `muted`      | `#8B909A` | Secondary text, captions, labels, placeholders              |

### Derived support colors (not on the board — derived from it so the UI works)

| Token          | Hex       | Role                                                    |
|----------------|-----------|---------------------------------------------------------|
| `surface`      | `#171A20` | Cards, panels, table bodies, admin sidebar              |
| `surface-2`    | `#1E222A` | Inputs, hover rows, nested cards, image placeholders    |
| `border`       | `#2A2F38` | Card borders, table dividers, input borders             |
| `primary-hover`| `#FF8259` | Hover state of primary buttons                          |
| `primary-soft` | `rgba(255,106,61,0.12)` | Selected row, active tab background, "New" badge bg |
| `accent-soft`  | `rgba(255,181,71,0.14)` | "In progress" / warning rows and badges bg  |
| `success`      | `#3DD68C` | "Completed", "Shortlisted", good SEO counter            |
| `success-soft` | `rgba(61,214,140,0.14)` | Success badge background                  |

### Contrast rules (must follow — keeps WCAG AA)

- **Text on `primary` and `accent` buttons/pills is `ground` (#0F1115), never white.** White on #FF6A3D fails AA.
- Body text is `ink` on `ground`/`surface`. Secondary text is `muted`.
- Outlined secondary buttons ("See our work", "Save draft"): transparent background, `ink` text, 1px `ink`/40% border.
- Mapping from the screenshots: every electric blue (#3A3AF4) element → `primary`; every teal element → `accent` (or `success` where it means "done/positive"); every white card → `surface`; light grey page bg → `ground`; dark navy sections/sidebar → `surface` (or `ground` with a `border`), so dark-on-dark sections still read as separate blocks.

### Implementation

Define the palette **once** as CSS variables and expose them to Tailwind. No hex values anywhere else in the codebase.

```css
/* app/globals.css (Tailwind v4) */
@import "tailwindcss";

@theme {
  --color-ground: #0F1115;
  --color-ink: #F3F1EC;
  --color-primary: #FF6A3D;
  --color-primary-hover: #FF8259;
  --color-accent: #FFB547;
  --color-muted: #8B909A;
  --color-surface: #171A20;
  --color-surface-2: #1E222A;
  --color-border: #2A2F38;
  --color-success: #3DD68C;
}

html { color-scheme: dark; }
body { background: var(--color-ground); color: var(--color-ink); }
```

(If the project uses Tailwind v3, put the same values in `tailwind.config.ts` under `theme.extend.colors`.)

---

## 2. Brand

- **Logo:** concept **01 · Code Bowl** — a bowl with a `</>` code symbol above it, wordmark `devsrecipe` in lowercase bold. Build it as an inline SVG React component (`components/brand/Logo.tsx`) using `currentColor`, with a mark-only variant for the favicon and small sizes (48 / 32 / 16 px). On this dark theme: mark in `primary`, wordmark in `ink`.
- **Admin login** shows the logo plus a small "Admin" pill (`primary-soft` bg, `primary` text).
- **Fonts:** match the screenshots — a geometric grotesk sans for headings/body and a monospace for small uppercase labels ("THE RESULTS", "STEP 1", placeholders like `[Image inside the post]`). Load both with `next/font` (self-hosted, `display: swap`). Choose the closest available Google fonts and note your choice in the README.

---

## 3. Pages to build

### Public site — route group `app/(site)/`

1. **Home** `/` — every section in the long homepage screenshot, in order:
   - Sticky header: logo, nav (Solutions, Work, Process, Blog, Careers), "Book a call" primary button.
   - Hero: eyebrow, H1 "We help businesses cut costs and automate their operations, so they move faster." (the word "automate" highlighted/underlined in `primary`), paragraph, "Book a 30 minute call" + "See our work", reply-time note. Right side: the interactive "Example automation" card with industry tabs (Restaurant, Store, Tours, Clinic, Diagnostics, School, Pet care, Retail) — switching tabs swaps the flow diagram and the "handled automatically" list. This is a small Client Component; everything around it stays a Server Component.
   - "Trusted by" logo strip.
   - "Industries we serve" — 8 industry cards (number, name, quote of the pain, "What we build" bullets, link) + "For startups" MVP banner.
   - "Our recipe, in four steps" — Discover, Design, Build, Launch and support.
   - "Success stories" — filter chips, 3 story cards (completed / in progress), client quote.
   - "Compare before you choose" table (Devs Recipe vs Typical agency vs Freelance marketplace).
   - "Real engineers, real names" team grid.
   - "From the blog" + "Open roles" side by side.
   - FAQ "Questions buyers ask us" — accordion using `<details>/<summary>` (works without JS).
   - Contact block "Tell us what you want to sell or book." with form (Name, Work email, Business type, Budget range, What do you need, Send message).
   - Footer: industries, company links, contact, newsletter signup.
2. **Success stories list** `/success-stories` and **story detail** `/success-stories/[slug]` — detail matches the story screenshot: tags, H1, summary, meta row (Timeline, Team, Platforms, Live since), hero media, 3 result stat cards, "01 The problem" with quote, "02 What we built" feature cards, "Inside the product" screenshots, "How it came together" timeline, "Built with" tech chips, big client quote block, "Facing the same problem?" CTA band with "Next story".
3. **Industry / solution pages** `/solutions/[industry]` — one per industry card (these are key SEO landing pages).
4. **Blog** `/blog` and `/blog/[slug]`.
5. **Careers** `/careers` and **role page** `/careers/[slug]` — matches the role screenshot: role title, chips (location, type, level, "Open until [date]"), About the role / What you will do / What we look for / What we offer, and the sticky "Apply for this role" form (full name, email, phone, profile link, CV upload PDF/Word with size limit, optional "Why this role?", consent checkbox with retention period and privacy link, "Send application", reply promise).
6. **Privacy policy** `/privacy`.
7. Custom `not-found.tsx` in the same style.

### Admin panel — route group `app/(admin)/admin/`

Left sidebar (logo, Overview, Success stories, Blog, Jobs, Applications with count badge in `accent`, Subscribers, Settings; admin name + Sign out at bottom). Active item = `primary` background with `ground` text.

1. **Sign in** `/admin/login` — centered card, "Only invited team members can sign in. There is no public sign up.", email, password, "Forgot password?", Sign in button.
2. **Overview** `/admin` — greeting, 4 stat cards, "Needs your attention" list (warning items use `accent-soft`), "Recent activity", quick action buttons.
3. **Success stories** `/admin/success-stories` — filter chips (All / Completed / In progress / Draft with counts), table with inline status dropdown, "No update in 45 days" warning row, "On homepage" toggles, "New story" button.
4. **Blog editor** `/admin/blog/[id]` — title, slug preview, toolbar (B, I, H2, H3, List, Link, Image, Quote), body, Preview / Save draft / Publish. Right panel: category, publish date, cover image upload, **Google preview** with live search-title counter (/60) and description counter (/160) that turns `accent` when too long, plus a rendered SERP snippet.
5. **Applications** `/admin/applications` — job selector, applicant table with status badges (New = `primary-soft`, Shortlisted = `success-soft`, Not a fit = `surface-2`/`muted`), detail panel with contact info, CV download, "Why this role", private team note, Shortlist / Not a fit buttons, auto-deletion notice.
6. Jobs, Subscribers, Settings — same shell, simple tables/forms in the same style.

All admin routes: protected by `middleware.ts` (redirect to `/admin/login`), and **never indexed** (see SEO).

Keep all bracketed placeholders from the screenshots (e.g. `[Client name]`, `[X weeks]`) as content in the data files, not hard-coded in components, so they can be filled in later. Admin screens use typed sample data until a backend is connected.

---

## 4. SEO requirements (high priority)

- **Server Components by default.** Only interactive pieces (`"use client"`) are client components. All public content must be in the initial HTML.
- **Static generation:** public pages are statically generated; dynamic routes use `generateStaticParams`. Use ISR/revalidation for blog, stories and jobs.
- **Metadata API:** root `metadata` in `app/layout.tsx` with `metadataBase`, title template `"%s | Devs Recipe"`, default description, Open Graph, Twitter card. Every page exports `metadata` or `generateMetadata` with a unique title (≤60 chars), description (≤160 chars), canonical URL (`alternates.canonical`) and OG image.
- **OG images:** `opengraph-image.tsx` per key route (dark `ground` bg, `ink` title, `primary` accent, logo).
- **Structured data (JSON-LD)** via a small `<JsonLd />` component:
  - `Organization` + `WebSite` on home
  - `FAQPage` for the FAQ section
  - `Article` (+ `BreadcrumbList`) for blog posts and success stories
  - `JobPosting` for each role page (title, description, datePosted, validThrough, employmentType, jobLocation / `jobLocationType: TELECOMMUTE` when remote)
  - `Service` for industry/solution pages
- `app/sitemap.ts` generated from content (home, solutions, stories, blog, careers, roles, privacy). `app/robots.ts` allows the site and disallows `/admin`.
- Admin layout sets `robots: { index: false, follow: false }`.
- **Semantic HTML:** one `<h1>` per page, ordered headings, `<header> <nav> <main> <section> <article> <footer>`, real `<a>` via `next/link`, descriptive link text, `alt` on every image, labels on every form field.
- **Performance / Core Web Vitals:** `next/image` with width/height and `priority` on the hero only; `next/font`; no layout shift; minimal client JS; lazy-load below-the-fold media. Target Lighthouse ≥ 95 on Performance, Accessibility, Best Practices and SEO.
- Clean, lowercase, hyphenated slugs (e.g. `/blog/pos-system-cost-small-shop`). Breadcrumbs on detail pages.
- `lang="en"` on `<html>`, favicon + `apple-icon` from the logo mark, `manifest.ts`.

---

## 5. Code structure

```
app/
  (site)/
    layout.tsx               # public header + footer
    page.tsx                 # home
    solutions/[industry]/page.tsx
    success-stories/page.tsx
    success-stories/[slug]/page.tsx
    blog/page.tsx
    blog/[slug]/page.tsx
    careers/page.tsx
    careers/[slug]/page.tsx
    privacy/page.tsx
  (admin)/admin/
    layout.tsx               # sidebar shell, noindex
    login/page.tsx
    page.tsx                 # overview
    success-stories/page.tsx
    blog/page.tsx
    blog/[id]/page.tsx
    jobs/page.tsx
    applications/page.tsx
    subscribers/page.tsx
    settings/page.tsx
  layout.tsx                 # html, fonts, root metadata
  globals.css                # palette tokens
  sitemap.ts
  robots.ts
  manifest.ts
  opengraph-image.tsx
  not-found.tsx
components/
  ui/          # Button, Badge, Card, Input, Textarea, Select, Toggle, Table, Tabs, Accordion, StatCard
  brand/       # Logo, LogoMark
  site/        # Header, Footer, Hero, AutomationDemo, IndustryCard, StoryCard, CompareTable, CTASection, ContactForm
  admin/       # Sidebar, AttentionList, ActivityFeed, StoriesTable, BlogEditor, GooglePreview, ApplicantTable, ApplicantPanel
  seo/         # JsonLd
content/       # typed data: industries.ts, stories.ts, posts.ts, jobs.ts, faq.ts, team.ts, site.ts
lib/
  seo.ts       # buildMetadata(), JSON-LD builders
  utils.ts     # cn() etc.
types/         # shared TypeScript types
middleware.ts  # protects /admin
```

Rules:
- TypeScript strict mode. No `any`.
- Components are small and single-purpose; variants (Button `primary | secondary | ghost`, Badge `new | success | warning | neutral`) via a variant map, not duplicated markup.
- Content lives in `content/`, never inline in components, so a CMS or database can replace it later without touching UI.
- Forms use Server Actions with validation (e.g. Zod), accessible error messages, and a success state. CV upload validates type (PDF/Word) and size.
- ESLint + Prettier configured; no unused code; meaningful names; short comments only where the intent isn't obvious.
- Fully responsive (mobile first). Check 375px, 768px, 1280px, 1440px. Admin sidebar collapses to a drawer on mobile.
- Visible focus states (`primary` ring), keyboard-navigable tabs, accordion, dropdowns and toggles; respect `prefers-reduced-motion`.

---

## 6. Definition of done

1. Every screenshot is reproduced section by section, recolored with Palette A only.
2. `grep` finds no hex colors outside `globals.css`.
3. `npm run build` passes with no type or lint errors.
4. Every public page has unique metadata, canonical, OG image and the right JSON-LD (validate with Google's Rich Results Test).
5. `/sitemap.xml` and `/robots.txt` are correct; `/admin` is noindex and disallowed.
6. Lighthouse ≥ 95 in all four categories on home, a story page and a role page.
7. A short README explains how to run the project, where to edit content, and which fonts were chosen.
