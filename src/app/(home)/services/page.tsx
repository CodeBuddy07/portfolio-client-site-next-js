import type { Metadata } from "next";
import Link from "next/link";
import { capabilities } from "@/components/site/Capabilities";
import { getProject } from "@/content/projects";
import { CTA } from "@/components/site/CTA";
import { ArrowIcon, Container, Eyebrow, Section } from "@/components/site/primitives";
import { Reveal, Stagger, StaggerItem, Words } from "@/components/motion";

export const metadata: Metadata = {
  title: "Services",
  description: "SaaS and web platforms, ERPs and financial systems, mobile apps through store review, and deployment and operations. How I work and what you get.",
};

const engagement = [
  ["Fixed-scope build", "A defined product or feature set, priced as a whole, delivered in milestones you approve. Best when the spec is clear.", "Most new products"],
  ["Retained engineering", "A monthly block of hours for an evolving product: features, fixes, operations. Best once something is live and growing.", "Most ongoing work"],
  ["Architecture and audit", "A written review of an existing system (data model, security model, performance, deployment) with concrete recommendations you can act on with or without me.", "Before a rewrite or a scale-up"],
];

const faqs = [
  ["How do you price?", "Fixed-scope work is quoted as a whole after discovery, with milestones. Retained work is a monthly hour block at an hourly rate. I say what things cost before I start, and I say when something is going to cost more than you'd expect."],
  ["Do you work alone or with a team?", "I co-founded CodeMines, a small product studio. For most engagements it's me end to end; for larger builds I bring design and a second engineer from the studio."],
  ["What about timezone?", "I'm in Dhaka (GMT+6), which overlaps US mornings and EU afternoons. I work asynchronously by default, with written updates and reviewable diffs, and take calls in the overlap."],
  ["Who owns the code?", "You do, from the first commit. Everything lives in your repositories and your infrastructure. There is nothing you need me for that I haven't written down."],
  ["Do you use AI tools?", "Every day, as an agent rather than autocomplete: reading unfamiliar code, reproducing bugs, writing the first draft of tests. I don't ship a change I can't explain line by line, and neither does it."],
];

export default function ServicesPage() {
  return (
    <>
      <div className="pt-32 md:pt-40">
        <Container>
          <Eyebrow className="mb-4">Services</Eyebrow>
          <Words as="h1" text="Whole products, built and run." className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl" />
          <p className="rise rise-3 mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">Four kinds of work, three ways to engage, and straight answers to the questions people actually ask.</p>
        </Container>
      </div>

      <Section eyebrow="What I build" title="Four kinds of product.">
        <div className="space-y-px overflow-hidden rounded-2xl border border-line bg-line">
          {capabilities.map((c) => {
            const proof = getProject(c.proof);
            return (
              <Reveal key={c.n} className="grid gap-6 bg-surface p-8 md:grid-cols-[100px_1fr_1fr] md:gap-10 md:p-10">
                <span className="font-mono text-sm text-signal">{c.n}</span>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-ink">{c.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{c.body}</p>
                  {proof && (
                    <Link href={`/work/${proof.slug}`} className="mt-5 inline-flex items-center gap-1 text-sm text-ink-3 hover:text-ink">
                      Proof: {proof.name} <ArrowIcon />
                    </Link>
                  )}
                </div>
                <ul className="flex flex-col gap-2 text-sm text-ink-2 md:border-l md:border-line md:pl-10">
                  {c.items.map((it) => (
                    <li key={it} className="flex gap-3">
                      <span className="mt-[9px] h-px w-3 shrink-0 bg-ink-3" aria-hidden />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Engagement" title="Three ways to work together.">
        <Stagger className="grid gap-6 md:grid-cols-3">
          {engagement.map(([t, d, fit]) => (
            <StaggerItem key={t} className="flex flex-col rounded-2xl border border-line bg-surface p-8">
              <h3 className="text-xl font-semibold tracking-tight text-ink">{t}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-2">{d}</p>
              <p className="mt-6 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">Fits · {fit}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section eyebrow="Questions" title="The ones people actually ask.">
        <dl className="divide-y divide-line border-y border-line">
          {faqs.map(([q, a]) => (
            <Reveal key={q} className="grid gap-3 py-7 md:grid-cols-[1fr_2fr] md:gap-10">
              <dt className="text-lg font-semibold tracking-tight text-ink">{q}</dt>
              <dd className="text-[15px] leading-relaxed text-ink-2">{a}</dd>
            </Reveal>
          ))}
        </dl>
      </Section>

      <CTA />
    </>
  );
}
