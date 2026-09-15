import Link from "next/link";
import { ArrowIcon, Section } from "./primitives";
import { Stagger, StaggerItem } from "@/components/motion";

export const capabilities = [
  {
    n: "01",
    slug: "saas",
    title: "SaaS and web platforms",
    body: "Multi-tenant products with real permission models, billing, reporting and the operational back office behind them. NestJS and PostgreSQL behind Next.js.",
    items: ["Tenant isolation enforced at the ORM", "Permissions over roles", "Stripe, S3, Redis, BullMQ, Socket.IO", "Swagger, e2e tests, stable error contracts"],
    proof: "multi-tenant-retail-saas",
  },
  {
    n: "02",
    slug: "erp",
    title: "ERPs and financial systems",
    body: "Inventory, sales, purchasing and accounting where the numbers have to reconcile. Integer money, lot costing, double-entry ledgers, append-only history.",
    items: ["Money as a value object, never a float", "FIFO / landed-cost inventory", "Ledgers an auditor can replay", "Multi-currency purchasing"],
    proof: "wholesale-garments-erp",
  },
  {
    n: "03",
    slug: "mobile",
    title: "Mobile apps, through store review",
    body: "React Native and Expo apps that ship (maps, payments, real-time, on-device ML) and the backends they talk to. Five on the App Store and Play Store.",
    items: ["Expo / NativeWind", "Stripe React Native, maps, push", "Live camera and TensorFlow pipelines", "App Store and Play Store submission"],
    proof: "momentum-activity",
  },
  {
    n: "04",
    slug: "ops",
    title: "Deployment and operations",
    body: "The part after shipping. Docker images to GHCR, SSH deploys to a VPS behind nginx, GitHub Actions for CI, and runbooks as workflows so production can be diagnosed without me.",
    items: ["GitHub Actions CI/CD", "Docker, nginx, VPS provisioning", "Vercel for front ends", "Diagnostics and data repair as one-click workflows"],
    proof: "messbuddy",
  },
];

export function Capabilities() {
  return (
    <Section
      id="capabilities"
      eyebrow="What I build"
      title="Four kinds of product, end to end."
      lede="Each one links to a case study where I did exactly that."
    >
      <Stagger className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
        {capabilities.map((c) => (
          <StaggerItem key={c.n} className="bg-surface">
            <article className="flex h-full flex-col p-8">
              <span className="font-mono text-xs text-signal">{c.n}</span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-ink">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">{c.body}</p>
              <ul className="mt-6 flex flex-col gap-2 border-t border-line pt-6 text-sm text-ink-2">
                {c.items.map((it) => (
                  <li key={it} className="flex gap-3">
                    <span className="mt-[9px] h-px w-3 shrink-0 bg-ink-3" aria-hidden />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <Link href={`/work/${c.proof}`} className="mt-6 inline-flex items-center gap-1 text-sm text-ink-3 transition-colors hover:text-ink">
                See it in a case study <ArrowIcon />
              </Link>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
