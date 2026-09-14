import { Section } from "./primitives";

const capabilities = [
  {
    n: "01",
    title: "Ship a product from spec to store",
    body:
      "Web and mobile, end to end: auth, payments, admin surfaces, the API underneath, and the release itself. The ten products on this site went from brief to production this way.",
    items: ["Next.js + NestJS web platforms", "React Native / Expo apps to App Store and Play Store", "Stripe, JWT/2FA, role-based access, S3 uploads", "PostgreSQL and MongoDB data models that survive growth"],
  },
  {
    n: "02",
    title: "Fix what's slow, broken or stuck",
    body:
      "I diagnose before I code. Bundle and request waterfalls, N+1 queries, hydration errors, a button that never calls the API — reproduce it, find the layer that's actually failing, make the smallest correct change.",
    items: ["Performance audits with numbers, not opinions", "Bug triage on codebases I didn't write", "Upgrades and migrations without a rewrite", "Written findings you can act on even if you don't hire me"],
  },
  {
    n: "03",
    title: "Keep it running",
    body:
      "Deployment and operations for the thing after it ships: CI/CD, containers, a VPS behind Nginx when Vercel isn't the right answer, monitoring and the boring maintenance that keeps a product alive.",
    items: ["GitHub Actions pipelines", "Docker, Nginx, VPS provisioning", "Vercel and cloud deployments", "Ongoing maintenance and support"],
  },
];

export function Capabilities() {
  return (
    <Section
      id="capabilities"
      eyebrow="What I do"
      title="Three things, done properly."
      lede="Most engagements are one of these. Some are all three."
    >
      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
        {capabilities.map((c) => (
          <article key={c.n} className="flex flex-col bg-surface p-8">
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
          </article>
        ))}
      </div>
    </Section>
  );
}
