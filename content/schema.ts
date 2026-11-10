import { z } from "zod";

/*
 * Shape of content/site-content.json. The JSON is checked against this at build
 * time, so a typo or a missing field fails `npm run build` with the exact path
 * (for example "stories.items.2.status") instead of breaking a page quietly.
 */

const text = z.string();
const link = z.object({ label: text, href: text });
const seo = z.object({ title: text.max(60), description: text.max(160) });
const section = { eyebrow: text, title: text };

export const industrySchema = z.object({
  slug: text,
  number: text,
  name: text,
  pain: text,
  build: z.array(text),
  linkLabel: text,
  seoTitle: text.max(60),
  seoDescription: text.max(160),
  intro: text,
});

export const storySchema = z.object({
  slug: text,
  client: text,
  title: text,
  industry: text,
  country: text,
  /** "draft" stories are hidden from the site. */
  status: z.enum(["completed", "in-progress", "draft"]),
  summary: text,
  problemShort: text,
  builtShort: text,
  resultShort: text,
  whereItStands: text,
  timeline: text,
  team: text,
  platforms: text,
  liveSince: text,
  heroLabel: text,
  results: z.array(z.object({ value: text, label: text })),
  problem: text,
  problemQuote: text,
  features: z.array(z.object({ name: text, description: text })),
  screenshots: z.array(text),
  phases: z.array(z.object({ name: text, duration: text, note: text })),
  tech: z.array(text),
  quote: z.object({ text, name: text, role: text }),
  publishedAt: z.iso.date(),
});

export const postSchema = z.object({
  slug: text,
  title: text,
  summary: text,
  category: text,
  date: text,
  dateIso: z.iso.date(),
  searchTitle: text.max(60),
  body: z.array(z.object({ heading: text, text })),
});

export const jobSchema = z.object({
  slug: text,
  title: text,
  location: text,
  remote: z.boolean(),
  type: text,
  employmentType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACTOR"]),
  level: text,
  openUntil: text,
  openUntilIso: z.iso.date(),
  postedIso: z.iso.date(),
  about: text,
  responsibilities: z.array(text),
  requirements: z.array(text),
  offer: z.array(text),
  cvMaxMb: z.number().positive(),
  retention: text,
  replyPromise: text,
});

export const faqItemSchema = z.object({ question: text, answer: text });
export const teamMemberSchema = z.object({ name: text, role: text, photoLabel: text });

/**
 * One business in the home page showcase (components/site/IndustryShowcase).
 * `visual.kind` picks which mini UI is drawn; `items`, `labels`, `note` and
 * `badge` fill it (see components/site/ShowcaseVisual for what each kind shows).
 */
export const showcaseCategorySchema = z.object({
  id: text,
  /** Industry slug for the icon; omit for "Others". */
  slug: text.optional(),
  /** Short name for the progress bar and chips. */
  nav: text,
  name: text,
  headline: text,
  problems: z.array(text).length(3),
  fixes: z.array(text).length(3),
  example: text,
  link,
  visual: z.object({
    kind: z.enum(["shop", "kitchen", "calendar", "queue", "report", "school", "pet", "stock", "blocks"]),
    title: text,
    items: z
      .array(
        z.object({
          label: text,
          meta: text.optional(),
          state: z.enum(["done", "alert", "active", "muted"]).optional(),
        }),
      )
      .min(1),
    labels: z.array(text).optional(),
    note: z.object({ title: text, text }),
    badge: z.object({ value: text, label: text }),
  }),
});

/** A form-service endpoint (e.g. Formspree). Empty = form shows "not connected yet". */
const endpoint = z.union([z.literal(""), z.url()]);

export const contentSchema = z.object({
  site: z.object({
    name: text,
    domain: text,
    tagline: text,
    description: text.max(160),
    defaultTitle: text,
    contact: z.object({
      email: text,
      whatsapp: text,
      linkedin: text,
      instagram: text.optional(),
      facebook: text.optional(),
    }),
    founder: z.object({ name: text, role: text }),
    nav: z.array(link),
    bookCall: link,
    footer: z.object({
      industriesTitle: text,
      companyTitle: text,
      companyLinks: z.array(link),
      privacyLabel: text,
      contactTitle: text,
    }),
  }),

  forms: z.object({
    notConfigured: text,
    error: text,
    sending: text,
    /** Shown when the browser blocks a submit because a field is missing or invalid. */
    invalid: text,
    contact: z.object({
      endpoint,
      labels: z.object({
        name: text,
        email: text,
        businessType: text,
        budget: text,
        message: text,
        submit: text,
      }),
      businessTypes: z.array(text).min(1),
      budgetRanges: z.array(text).min(1),
      successTitle: text,
      successText: text,
    }),
    newsletter: z.object({
      endpoint,
      title: text,
      text,
      emailLabel: text,
      placeholder: text,
      submit: text,
      successText: text,
    }),
    application: z.object({
      endpoint,
      title: text,
      labels: z.object({
        name: text,
        email: text,
        phone: text,
        profile: text,
        cv: text,
        cvPick: text,
        cvHint: text,
        why: text,
        optional: text,
        submit: text,
      }),
      consent: text,
      cvTypeError: text,
      cvSizeError: text,
      successTitle: text,
      successText: text,
    }),
  }),

  home: z.object({
    seo,
    hero: z.object({
      eyebrow: text,
      headline: z.object({ before: text, highlight: text, after: text }),
      intro: text,
      primaryCta: link,
      secondaryCta: link,
      note: text,
    }),
    showcase: z.object({
      ...section,
      intro: text,
      navLabel: text,
      problemsLabel: text,
      fixesLabel: text,
      exampleLabel: text,
      swipeHint: text,
      categories: z.array(showcaseCategorySchema).min(2),
    }),
    trustedBy: z.object({
      label: text,
      /** `logo` is a 400x100 image under public/, for example "/clients/acme.png". */
      items: z.array(z.object({ name: text, logo: text })),
    }),
    fit: z.object({
      ...section,
      intro: text,
      yours: text,
      ours: text,
      badge: z.object({ before: text, highlight: text }),
    }),
    industries: z.object({
      ...section,
      intro: text,
      buildLabel: text,
      startup: z.object({ eyebrow: text, text, cta: link }),
    }),
    process: z.object({
      ...section,
      intro: text,
      /** Label before each step's outcome, e.g. "You get". */
      outcomeLabel: text,
      steps: z
        .array(z.object({ step: text, name: text, timing: text, text, outcome: text }))
        .length(4),
    }),
    stories: z.object({
      ...section,
      intro: text,
      featured: z.array(text),
      completedLabel: text,
      inProgressLabel: text,
      allLink: link,
      quote: z.object({ text, name: text, role: text }),
    }),
    compare: z.object({
      ...section,
      intro: text,
      caption: text,
      /** First column is Devs Recipe and is highlighted. */
      columns: z.array(text).length(3),
      /** Text for each verdict mark, in the legend and for screen readers. */
      verdicts: z.object({ yes: text, partly: text, no: text }),
      note: text,
      rows: z.array(
        z.object({
          question: text,
          answers: z
            .array(z.object({ verdict: z.enum(["yes", "partly", "no"]), text }))
            .length(3),
        }),
      ),
    }),
    team: z.object({ ...section, members: z.array(teamMemberSchema) }),
    blog: z.object({ title: text, count: z.number().int().min(0), allLink: link }),
    roles: z.object({ title: text, count: z.number().int().min(0), allLink: link }),
    faq: z.object({ title: text, items: z.array(faqItemSchema) }),
    contact: z.object({ title: text, text, calendar: link }),
  }),

  cta: z.object({ title: text, text, primary: link, nextStoryLabel: text }),

  solutions: z.object({
    page: z.object({
      eyebrow: text,
      breadcrumb: text,
      primaryCta: link,
      buildTitle: text,
      relatedTitle: text,
    }),
    industries: z.array(industrySchema),
    startup: industrySchema,
  }),

  stories: z.object({
    page: z.object({ seo, ...section, intro: text }),
    labels: z.record(
      z.enum([
        "completed",
        "inProgress",
        "projectScreenshot",
        "buildScreenshot",
        "problem",
        "built",
        "building",
        "result",
        "whereItStands",
        "readStory",
        "followBuild",
        "back",
        "timeline",
        "team",
        "platforms",
        "liveSince",
        "results",
        "problemTitle",
        "builtTitle",
        "inside",
        "cameTogether",
        "builtWith",
      ]),
      text,
    ),
    items: z.array(storySchema),
  }),

  blog: z.object({
    page: z.object({ seo, ...section, intro: text }),
    posts: z.array(postSchema),
  }),

  careers: z.object({
    page: z.object({ seo, ...section, intro: text }),
    labels: z.object({
      back: text,
      openUntil: text,
      about: text,
      responsibilities: text,
      requirements: text,
      offer: text,
    }),
    jobs: z.array(jobSchema),
  }),

  privacy: z.object({
    seo,
    title: text,
    sections: z.array(z.object({ heading: text, text })),
  }),

  notFound: z.object({
    eyebrow: text,
    title: text,
    text,
    primary: link,
    secondary: link,
  }),
});

export type SiteContent = z.infer<typeof contentSchema>;
