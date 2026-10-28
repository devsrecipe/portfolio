import type { Industry } from "@/types";

export const industries: Industry[] = [
  {
    slug: "ecommerce",
    number: "01",
    name: "Ecommerce stores",
    pain: "Losing sales because your store is slow or hard to manage?",
    build: [
      "Custom storefront and checkout",
      "Inventory and order admin",
      "Multi vendor marketplaces",
    ],
    linkLabel: "Ecommerce solutions",
    seoTitle: "Custom Ecommerce Development",
    seoDescription:
      "Custom storefronts, checkout, inventory and multi vendor marketplaces for online stores that have outgrown their template.",
    intro: "A fast storefront and an admin your team can run without a developer.",
  },
  {
    slug: "food-and-restaurants",
    number: "02",
    name: "Food and restaurants",
    pain: "Giving delivery apps a big cut of every order?",
    build: [
      "Online ordering and table reservations",
      "Kitchen display and POS links",
      "Loyalty and repeat orders",
    ],
    linkLabel: "Food solutions",
    seoTitle: "Restaurant Ordering and Booking Software",
    seoDescription:
      "Direct online ordering, table reservations and kitchen display systems that keep the margin that delivery apps take.",
    intro: "Take orders and bookings directly, and send them straight to the kitchen.",
  },
  {
    slug: "travel-and-tours",
    number: "03",
    name: "Travel and tours",
    pain: "Still confirming bookings over WhatsApp and spreadsheets?",
    build: [
      "Tour and activity booking engine",
      "Live availability calendar",
      "Deposits and online payments",
    ],
    linkLabel: "Travel solutions",
    seoTitle: "Tour and Activity Booking Software",
    seoDescription:
      "Booking engines with live availability, deposits and online payments for tour operators and travel businesses.",
    intro: "Let guests book and pay online while your calendar stays correct.",
  },
  {
    slug: "clinics-and-doctors",
    number: "04",
    name: "Clinics and doctors",
    pain: "Patients waiting, files missing, prescriptions hard to read?",
    build: [
      "Online appointment booking",
      "Patient records and history",
      "Digital prescriptions and test orders",
    ],
    linkLabel: "Clinic solutions",
    seoTitle: "Clinic Management and Appointment Software",
    seoDescription:
      "Appointment booking, patient records and digital prescriptions for clinics and doctors who want less paperwork.",
    intro: "Shorter waiting rooms and records that are always where you need them.",
  },
  {
    slug: "diagnostic-centers",
    number: "05",
    name: "Diagnostic centers",
    pain: "Reports delayed because results still live on paper?",
    build: [
      "Test booking and sample tracking",
      "Lab reports sent to patients online",
      "Billing and accounts",
    ],
    linkLabel: "Diagnostic solutions",
    seoTitle: "Diagnostic Center and Lab Report Software",
    seoDescription:
      "Test booking, sample tracking and online report delivery for diagnostic centers moving off paper.",
    intro: "From sample to report, tracked and delivered to the patient online.",
  },
  {
    slug: "schools",
    number: "06",
    name: "Schools",
    pain: "Fees, attendance and results spread across registers and Excel?",
    build: [
      "Admissions and student records",
      "Attendance and class schedules",
      "Fees, exams and report cards",
    ],
    linkLabel: "School solutions",
    seoTitle: "School Management Software",
    seoDescription:
      "Admissions, attendance, fees and report cards in one system for schools replacing registers and spreadsheets.",
    intro: "One place for students, classes, fees and results.",
  },
  {
    slug: "pet-businesses",
    number: "07",
    name: "Pet businesses",
    pain: "Running the shop and the grooming bookings in two different places?",
    build: [
      "Online pet shop",
      "Grooming and care bookings",
      "Pet profiles and reminders",
    ],
    linkLabel: "Pet business solutions",
    seoTitle: "Pet Shop and Grooming Booking Software",
    seoDescription:
      "An online pet shop, grooming bookings and pet profiles with reminders, managed from one admin.",
    intro: "Sell products and book care from the same system.",
  },
  {
    slug: "fmcg-and-retail",
    number: "08",
    name: "FMCG and retail",
    pain: "Not sure what stock you have until someone counts it?",
    build: [
      "ERP for stock, purchasing and accounts",
      "POS for shops and outlets",
      "Distributor order management",
    ],
    linkLabel: "Retail solutions",
    seoTitle: "ERP and POS Software for Retail and FMCG",
    seoDescription:
      "Stock, purchasing, POS and distributor ordering for FMCG and retail businesses that need to see inventory live.",
    intro: "Know what you have, what you sold and what to reorder.",
  },
];

export const startupSolution: Industry = {
  slug: "startup-mvp",
  number: "09",
  name: "Startup MVP",
  pain: "Launching something new and need a first version real users can pay for?",
  build: [
    "Scoped first version in weeks",
    "Payments and accounts from day one",
    "A codebase you can grow",
  ],
  linkLabel: "Talk about your MVP",
  seoTitle: "MVP Development for Startups",
  seoDescription:
    "We build first versions that real users can pay for: scoped tightly, shipped fast and ready to grow.",
  intro: "Launching something new? We build first versions that real users can pay for.",
};

export const allSolutions: Industry[] = [...industries, startupSolution];
