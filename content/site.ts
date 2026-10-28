export const site = {
  name: "Devs Recipe",
  domain: "yourdomain.com",
  tagline: "Software for businesses that sell, serve and book.",
  description:
    "Devs Recipe builds ordering, booking and operations software for shops, restaurants, clinics, schools and startups. Talk to the engineers who build it.",
  replyNote: "[Reply time promise, for example: we reply within one business day]",
  contact: { email: "[Email]", whatsapp: "[WhatsApp]", linkedin: "[LinkedIn]" },
  calendarUrl: "/#contact",
  founder: { name: "[Founder name]", role: "[Role]" },
} as const;

export const navLinks = [
  { label: "Solutions", href: "/#solutions" },
  { label: "Work", href: "/success-stories" },
  { label: "Process", href: "/#process" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
] as const;

export const footerCompanyLinks = [
  { label: "Success stories", href: "/success-stories" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/#contact" },
] as const;

export const trustedBy = [
  "[Client logo]",
  "[Client logo]",
  "[Client logo]",
  "[Client logo]",
  "[Review rating, for example Clutch or Upwork]",
] as const;

export const processSteps = [
  {
    step: "Step 1",
    name: "Discover",
    text: "We learn how your business takes orders today and where money leaks.",
  },
  {
    step: "Step 2",
    name: "Design",
    text: "You see and click through the screens before any code is written.",
  },
  {
    step: "Step 3",
    name: "Build",
    text: "[Your demo rhythm, for example: a working demo every week].",
  },
  {
    step: "Step 4",
    name: "Launch and support",
    text: "[Your support offer after launch, for example: 30 days of fixes included].",
  },
] as const;

export const compareTable = {
  columns: ["Devs Recipe", "Typical agency", "Freelance marketplace"],
  rows: [
    {
      feature: "Specialized in orders and bookings",
      values: ["Yes", "Usually generalist", "Depends on the person"],
    },
    {
      feature: "You talk to the people who build it",
      values: ["[Confirm]", "Through a manager", "Yes, one person"],
    },
    { feature: "You own all the code", values: ["[Confirm]", "Varies", "Varies"] },
    {
      feature: "Support after launch",
      values: ["[Confirm]", "Extra contract", "Often ends at delivery"],
    },
  ],
} as const;

export const businessTypes = [
  "Ecommerce store",
  "Food and restaurants",
  "Travel and tours",
  "Clinic or doctor",
  "Diagnostic center",
  "School",
  "Pet business",
  "FMCG and retail",
  "Startup MVP",
  "Other",
] as const;

export const budgetRanges = [
  "[Range A]",
  "[Range B]",
  "[Range C]",
  "Not sure yet",
] as const;
