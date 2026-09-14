import { site } from "./site";

export const resume = {
  name: site.name,
  title: "Product Engineer",
  location: "Dhaka, Bangladesh · GMT+6",
  email: site.email,
  site: "ruhulcodes.com",
  github: "github.com/CodeBuddy07",
  linkedin: "linkedin.com/in/codebuddy07",
  pdf: "/Ruhul-Amin-CV.pdf",
  summary:
    "Product engineer who designs, builds and operates whole software products — multi-tenant SaaS, financial ERPs, real-time platforms and mobile apps. Two years at CodeMines: 1,660 commits across 81 repositories, 15 products in production, 5 apps on the App Store and Play Store. TypeScript end to end.",
  experience: [
    {
      org: "CodeMines",
      role: "Product Engineer",
      period: "2025 — present",
      where: "Dhaka",
      bullets: [
        "Architected and built a multi-tenant retail ERP/POS SaaS (NestJS 11, Prisma 7, PostgreSQL 16, Redis): tenant isolation enforced by a Prisma extension, permission-based guards, Argon2id, refresh-token family revocation, e2e tests against a real database.",
        "Built a wholesale-garments ERP with real accounting semantics: integer money value object, FIFO lot costing with landed cost, double-entry ledger, append-only history, per-shipment FX.",
        "Backend lead on MessBuddy (API, web, mobile, super-admin) and JobsiteX (marketplace with Stripe, BullMQ, Socket.IO); shipped operational runbooks as GitHub Actions.",
        "Shipped four React Native apps through App Store review — Momentum, Hop Across America, HRlynx, ChatterBee — and FaceSculpt AI (real-time on-device face detection) to the Play Store.",
        "Built TermSheetGenie (VC modelling SaaS with a three-phase simulation engine and five-role access), Berzerker Furrey Comics (Next.js + NestJS + Stripe storefront) and MealBox.",
        "Own deployment: Docker images to GHCR, SSH deploys to VPS behind nginx, GitHub Actions CI. Built codemines.studio (Next.js + MongoDB CMS).",
      ],
    },
    {
      org: "Independent",
      role: "Full-stack developer",
      period: "2024",
      where: "Remote",
      bullets: [
        "Trade People — tradespeople marketplace (React, Express, MongoDB).",
        "IPTV Business Management System — accounting, subscriptions and customer management for IPTV providers.",
        "Feni Blood Line — verified-donor platform serving Feni District since 2023; bilingual, live emergency requests.",
      ],
    },
  ],
  skills: [
    { group: "Front end", items: "Next.js, React, TypeScript, Tailwind CSS, React Native, Expo" },
    { group: "Back end", items: "NestJS, Node.js, Express, REST, JWT / Passport, Zod, Socket.IO, BullMQ, Stripe, OpenAI" },
    { group: "Data", items: "PostgreSQL, Prisma, MongoDB, Redis" },
    { group: "Infrastructure", items: "Docker, nginx, VPS, GitHub Actions, Vercel, AWS S3, Cloudflare" },
    { group: "Practice", items: "Multi-tenant architecture, financial data modelling, API design, e2e testing, AI-assisted engineering" },
  ],
  education: [
    { school: "Dhaka Polytechnic Institute", award: "Diploma in Computer Science and Technology", period: "2022 — 2026 (expected)" },
    { school: "Thakurgaon Govt. Boys' High School", award: "Secondary School Certificate (Science) — GPA 5.00 / 5.00", period: "2021" },
  ],
} as const;
