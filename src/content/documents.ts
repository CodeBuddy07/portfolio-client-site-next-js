import { site } from "./site";

export const person = {
  name: "Ruhul Amin",
  title: "Full Stack Developer · Product Engineer & Co-founder, CodeMines",
  shortTitle: "Product Engineer",
  location: "Dhaka, Bangladesh · GMT+6",
  email: site.email,
  phone: "+880 1317-947541",
  site: "ruhulcodes.com",
  github: "github.com/CodeBuddy07",
  linkedin: "linkedin.com/in/codebuddy07",
  photo: "/ruhul-amin.jpg",
};

export const files = {
  resume: "/Ruhul-Amin-Resume.pdf",
  cv: "/Ruhul-Amin-CV.pdf",
};

export type Role = { org: string; role: string; period: string; where: string; bullets: string[] };

const codemines: Role = {
  org: "CodeMines",
  role: "Co-founder & Product Engineer",
  period: "Jul 2026 – present",
  where: "Dhaka",
  bullets: [
    "Formed the studio with former colleagues immediately after SparkTech; own architecture, back end and deployment across our products.",
    "Architected a multi-tenant retail ERP/POS SaaS (NestJS 11, Prisma 7, PostgreSQL 16, Redis): tenant isolation enforced by a Prisma extension, permission-based guards, Argon2id, refresh-token family revocation, e2e tests against a real database.",
    "Built a wholesale-garments ERP with real accounting semantics: integer money value object, FIFO lot costing with landed cost, double-entry ledger, append-only history, per-shipment FX.",
    "Backend lead on MessBuddy (API, web, mobile, super-admin) with operational runbooks shipped as GitHub Actions.",
    "Built codemines.studio (Next.js + MongoDB CMS). Deployment: Docker images to GHCR, SSH deploys to a VPS behind nginx, GitHub Actions CI.",
  ],
};

const sparktech: Role = {
  org: "SparkTech Agency",
  role: "Full Stack Developer",
  period: "Jun 2025 – Jun 2026",
  where: "Dhaka",
  bullets: [
    "Architected production applications on NestJS, React Native and AWS, including S3/CDN video delivery.",
    "Shipped four React Native apps through App Store review (Momentum, Hop Across America, HRlynx, ChatterBee) and FaceSculpt AI (real-time on-device face detection) to the Play Store.",
    "Built TermSheetGenie (VC modelling SaaS: three-phase simulation engine, five-role access), Berzerker Furrey Comics (Next.js + NestJS + Stripe storefront), MealBox and JobsiteX (marketplace with Stripe, BullMQ, Socket.IO).",
    "JWT/OAuth2 authentication with role-based access control; event-driven back ends on Redis and BullMQ; REST APIs with webhooks, retries and idempotency keys.",
  ],
};

const independent: Role = {
  org: "Independent",
  role: "Full Stack Developer",
  period: "Mar 2024 – May 2025",
  where: "Remote",
  bullets: [
    "Trade People: tradespeople marketplace (React, Express, MongoDB).",
    "Feni Blood Line: verified-donor platform serving Feni District since 2023; bilingual, live emergency requests.",
    "MediMart: healthcare e-commerce (Next.js, Express, MongoDB).",
  ],
};

const alphaMedia: Role = {
  org: "Alpha Media",
  role: "Full Stack Developer (contract)",
  period: "Jun 2023 – Feb 2024",
  where: "Remote · Dubai-based IPTV business",
  bullets: [
    "Maintained the company's existing systems and built new ones alongside them.",
    "Built the IPTV Business Management System: accounting, subscriptions, customer records and reporting (React, TanStack Query, Recharts; Express, TypeScript, MongoDB, Zod, JWT).",
  ],
};

export const skills = [
  { group: "Front end", items: "Next.js, React, TypeScript, Tailwind CSS, React Native, Expo" },
  { group: "Back end", items: "NestJS, Node.js, Express, REST, JWT / Passport, Zod, Socket.IO, BullMQ, Stripe, OpenAI" },
  { group: "Data", items: "PostgreSQL, Prisma, MongoDB, Redis" },
  { group: "Infrastructure", items: "Docker, nginx, VPS, GitHub Actions, Vercel, AWS S3, Cloudflare" },
  { group: "Practice", items: "Multi-tenant architecture, financial data modelling, API design, e2e testing, AI-assisted engineering" },
];

export const education = [
  { school: "Bangladesh University of Business and Technology (BUBT)", award: "BSc in Computer Science and Engineering", period: "2026 – 2030 (expected)" },
  { school: "Dhaka Polytechnic Institute", award: "Diploma in Computer Science and Technology", period: "2021 – 2026" },
  { school: "Thakurgaon Govt. Boys' High School", award: "Secondary School Certificate (Science), GPA 5.00 / 5.00", period: "2021" },
];

export const certifications = [
  { name: "Advanced Web Development, Level 2", issuer: "Programming Hero", year: "2025" },
  { name: "Complete Web Development", issuer: "Programming Hero", year: "2022" },
];

export const languages = "Bangla (native) · English (fluent) · Hindi (conversational) · German (A2, working toward B2)";

export const testimonial = {
  name: "Md Mustafijur Rahman",
  title: "CEO, Alpha Media",
  photo: "/testimonials/mustafijur-rahman.jpg",
  text: "Ruhul Amin did a great job with our website, very professional and extremely helpful. Moreover, it was very easy to reach out to him and get fast responses along with feedback on any content and the development of the website.",
};

// ---- One-page resume: the same facts, cut to what a first read needs. ----
export const resumeDoc = {
  summary:
    "Full stack developer who designs, builds and operates whole software products: multi-tenant SaaS, financial ERPs, real-time platforms and mobile apps. Three years across Alpha Media, SparkTech Agency and CodeMines, the studio I co-founded: 1,660 commits, 15 products in production, 5 apps on the App Store and Play Store. TypeScript end to end.",
  experience: [
    { ...codemines, bullets: [codemines.bullets[1], codemines.bullets[2], codemines.bullets[3]] },
    { ...sparktech, bullets: [sparktech.bullets[1], sparktech.bullets[2], sparktech.bullets[3]] },
    { ...alphaMedia, bullets: [alphaMedia.bullets[1]] },
  ],
  products: [
    ["Retail ERP / POS SaaS", "multi-tenant, NestJS + Prisma + PostgreSQL, ORM-level tenant isolation", "2026"],
    ["Wholesale Garments ERP", "integer money, FIFO costing, double-entry ledger", "2026"],
    ["TermSheetGenie", "VC modelling SaaS with a three-phase simulation engine", "2026"],
    ["Momentum · HRlynx · ChatterBee · Hop Across America", "React Native apps on the App Store", "2025"],
  ],
  skills: skills.slice(0, 4),
};

// ---- Two-page CV: the full record. ----
export const cvDoc = {
  summary: resumeDoc.summary,
  experience: [codemines, sparktech, independent, alphaMedia],
  products: [
    ["Retail ERP / POS SaaS", "Multi-tenant point-of-sale SaaS for small shops. Tenant isolation enforced by a Prisma extension; permission catalogue; Argon2id; refresh-token family revocation; e2e tests.", "2026", "confidential"],
    ["Wholesale Garments ERP", "Integer money value object (OMR baisa), FIFO lot costing with landed cost, double-entry ledger, append-only history, per-shipment FX.", "2026", "confidential"],
    ["TermSheetGenie", "VC and investment management SaaS: three-phase simulation engine (SAFEs, priced rounds, debt), live cap tables, five roles, 2FA.", "2026", "termsheetgenie.com"],
    ["MessBuddy", "Shared-housing platform: NestJS API, Next.js web, React Native app, super-admin; runbooks as GitHub Actions.", "2026", ""],
    ["JobsiteX", "Jobs marketplace: NestJS + Prisma API with Stripe, BullMQ, Socket.IO; React Native app with maps and in-app payments.", "2026", ""],
    ["Berzerker Furrey Comics", "Comic-book storefront: Next.js + NestJS + PostgreSQL, Stripe checkout, transactional email, admin inventory.", "2025", ""],
    ["Feni Blood Line", "Verified blood-donor platform for Feni District, bilingual, live emergency requests; serving the district since 2023.", "2026", "fenibloodline.com"],
    ["Momentum · Hop Across America · HRlynx · ChatterBee", "Four React Native apps shipped through App Store review; FaceSculpt AI (on-device face detection) on the Play Store.", "2025", "App Store / Play Store"],
    ["SMS Gateway Agent", "Backend-free Android agent (Kotlin + React Native): rules → processors → offline queue → webhooks.", "2026", ""],
  ],
  skills,
  references: [{ name: testimonial.name, title: testimonial.title, note: "Contact details available on request" }],
};
