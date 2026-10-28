# Devs Recipe

Portfolio website for Devs Recipe. Next.js 16 (App Router), TypeScript, Tailwind CSS v4. Palette A · Midnight Kitchen.

It is a fully static site: no database, no admin panel, no server code. Every page is generated at build time from one JSON file.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # checks the content, then builds every page
npm run start
```

`.env` holds a single setting, `NEXT_PUBLIC_SITE_URL`: the public address of the site, used for canonical URLs, the sitemap and Open Graph images. See `.env.example`.

## Editing the website: `content/site-content.json`

All text and data on the site lives in **`content/site-content.json`**. Edit it, save, and the dev server updates. For production, rebuild.

| Section of the JSON | What it controls |
| --- | --- |
| `site` | Name, tagline, contact details, founder, **navbar links** (`site.nav`), footer |
| `home` | Every homepage section, in order: hero, automation demo, trusted by, industries, process, featured stories, compare table, team, blog / roles teasers, FAQ, contact |
| `forms` | Contact, newsletter and job-application forms: labels, messages and **endpoints** |
| `solutions` | The industry pages at `/solutions/<slug>` (plus `startup` for the MVP page) |
| `stories` | Success stories list and detail pages. Set `"status": "draft"` to hide one |
| `blog` | Blog list and posts |
| `careers` | Careers list and role pages |
| `cta` | The "Facing the same problem?" band at the bottom of inner pages |
| `privacy`, `notFound` | Privacy policy and 404 page |

Tips:

- To **add** a story, post, job or industry, copy an existing entry in its list and change it. Its `slug` becomes the URL.
- Text like `"Open until {date}"` or `"[{count}] completed"` has placeholders in `{}` that the site fills in. Keep them.
- Bracketed text such as `[Client name]` is placeholder copy waiting for real content.
- **The JSON is checked on every build** against `content/schema.ts`. If something is missing or wrong, `npm run build` stops and names the exact field, for example:

  ```
  ✖ Invalid option: expected one of "completed"|"in-progress"|"draft"
    → at stories.items[1].status
  ✖ Too big: expected string to have <=60 characters
    → at solutions.industries[0].seoTitle
  ```

  (Search titles are limited to 60 characters and descriptions to 160, so Google shows them in full.)

## Forms

There is no backend, so the three forms (contact, newsletter, job application) post straight from the browser to a hosted form service such as [Formspree](https://formspree.io), Getform or Basin.

1. Create a form at the service and copy its endpoint URL, e.g. `https://formspree.io/f/abcdwxyz`.
2. Paste it into `forms.contact.endpoint`, `forms.newsletter.endpoint` and `forms.application.endpoint` in the JSON. You can use one endpoint for all three or a separate one for each.
3. Rebuild.

While an endpoint is empty, that form shows "This form is not connected yet", with the contact email as a fallback.
The job application sends a CV file. On Formspree, **file uploads need a paid plan**. Check your service's limits.

## Fonts

Self-hosted through `next/font/google`, `display: swap`:

- **Hanken Grotesk** for headings and body
- **JetBrains Mono** for small uppercase labels and bracketed placeholders

## Animation

All motion lives in `components/motion/`:

- **Framer Motion:** `Reveal` and `Stagger*` (scroll-in reveals), `HeroHeadline` (word by word), `ScrollProgress` (top bar), and the sliding tab pill and node transitions in `AutomationDemo`. `MotionProvider` makes them honour `prefers-reduced-motion`.
- **GSAP + ScrollTrigger:** `HeroGlow`, `ScrubLine`, `ScrubText`, `Parallax`, `Marquee` and `Magnetic`.
- **Lenis:** `SmoothScroll` eases wheel scrolling and anchor links, driven by GSAP's ticker so ScrollTrigger stays in sync. Add `data-lenis-prevent` to any element that must keep native scrolling.
- **Pointer effects:** `TiltCard` (story cards) and `Spotlight` (industry cards).

## Code map

| Folder | What's in it |
| --- | --- |
| `content/` | `site-content.json` (the content), `schema.ts` (its rules), `index.ts` (loads and checks it) |
| `app/(site)/` | The pages |
| `components/site/` | Page sections, cards and forms |
| `components/motion/` | Animations |
| `components/ui/` | Buttons, badges, inputs and other basics |
| `lib/` | Content lookups, SEO / structured data, Open Graph images, helpers |

- Colours are defined only in `app/globals.css`. `lib/og.tsx`, `app/icon.tsx` and `app/apple-icon.tsx` repeat them as `rgb()` values because `ImageResponse` cannot read CSS variables.
