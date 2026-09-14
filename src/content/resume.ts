import { site } from "./site";

export const resume = {
  name: site.name,
  title: "Product Engineer · Co-founder, CodeMines",
  location: "Dhaka, Bangladesh · GMT+6",
  email: site.email,
  phone: "+880 1317-947541",
  site: "ruhulcodes.com",
  github: "github.com/CodeBuddy07",
  linkedin: "linkedin.com/in/codebuddy07",
  pdf: "/Ruhul-Amin-CV.pdf",
  summary:
    "Product engineer who designs, builds and operates whole software products — multi-tenant SaaS, financial ERPs, real-time platforms and mobile apps. Three years of shipping across Alpha Media, SparkTech Agency and CodeMines, the studio I co-founded: 1,660 commits across 81 repositories, 15 products in production, 5 apps on the App Store and Play Store. TypeScript end to end.",
  experience: [
    {
      org: "CodeMines",
      role: "Co-founder & Product Engineer",
      period: "Jul 2026 — present",
      where: "Dhaka",
      bullets: [
        "Formed the studio with former colleagues immediately after SparkTech; I own architecture, back end and deployment across our products.",
        "Architected and built a multi-tenant retail ERP/POS SaaS (NestJS 11, Prisma 7, PostgreSQL 16, Redis): tenant isolation enforced by a Prisma extension, permission-based guards, Argon2id, refresh-token family revocation, e2e tests against a real database.",
        "Built a wholesale-garments ERP with real accounting semantics: integer money value object, FIFO lot costing with landed cost, double-entry ledger, append-only history, per-shipment FX.",
        "Backend lead on MessBuddy (API, web, mobile, super-admin) with operational runbooks shipped as GitHub Actions.",
        "Built codemines.studio (Next.js + MongoDB CMS). Deployment end to end: Docker images to GHCR, SSH deploys to VPS behind nginx, GitHub Actions CI.",
      ],
    },
    {
      org: "SparkTech Agency",
      role: "Full Stack Developer",
      period: "Jun 2024 — Jun 2026",
      where: "Dhaka",
      bullets: [
        "Architected production applications on NestJS, React Native and AWS, including S3/CDN video delivery.",
        "Shipped four React Native apps through App Store review — Momentum, Hop Across America, HRlynx, ChatterBee — and FaceSculpt AI (real-time on-device face detection) to the Play Store.",
        "Built TermSheetGenie (VC modelling SaaS: three-phase simulation engine, five-role access), Berzerker Furrey Comics (Next.js + NestJS + Stripe storefront), MealBox and JobsiteX (marketplace with Stripe, BullMQ, Socket.IO).",
        "JWT/OAuth2 authentication with role-based access control; event-driven back ends on Redis and BullMQ; REST APIs with webhook integrations, retries and idempotency keys.",
      ],
    },
    {
      org: "Alpha Media",
      role: "Full Stack Developer (contract)",
      period: "Jun 2023 — Feb 2024",
      where: "IPTV business · salaried contract",
      bullets: [
        "Maintained the company's existing systems and built new ones alongside them.",
        "Built the IPTV Business Management System: accounting, subscriptions, customer records and reporting for an IPTV provider (React, TanStack Query, Recharts; Express, TypeScript, MongoDB, Zod, JWT).",
      ],
    },
    {
      org: "Independent",
      role: "Full-stack developer",
      period: "2023 — 2024",
      where: "Remote",
      bullets: [
        "Trade People — tradespeople marketplace (React, Express, MongoDB).",
        "Feni Blood Line — verified-donor platform serving Feni District since 2023; bilingual, live emergency requests.",
        "MediMart — healthcare e-commerce (Next.js, Express, MongoDB).",
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
    { school: "Bangladesh University of Business and Technology (BUBT)", award: "BSc in Computer Science and Engineering", period: "2026 — 2030 (expected)" },
    { school: "Dhaka Polytechnic Institute", award: "Diploma in Computer Science and Technology", period: "Completed May 2026" },
    { school: "Thakurgaon Govt. Boys' High School", award: "Secondary School Certificate (Science) — GPA 5.00 / 5.00", period: "2021" },
  ],
  certifications: [
    { name: "Advanced Web Development, Level 2", issuer: "Programming Hero", year: "2025" },
    { name: "Complete Web Development", issuer: "Programming Hero", year: "2022" },
  ],
  languages: "Bangla (native) · English (fluent) · Hindi (conversational) · German (A2, working toward B2)",
} as const;
