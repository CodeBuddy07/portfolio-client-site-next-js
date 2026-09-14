import type { Metadata } from "next";
import { CTA } from "@/components/site/CTA";
import { Container, Eyebrow, Section } from "@/components/site/primitives";
import { Reveal, Words } from "@/components/motion";

export const metadata: Metadata = {
  title: "Process",
  description: "How a project runs with me: discovery, architecture, build, ship, operate — and what you hold in your hand at the end of each stage.",
};

const stages = [
  {
    n: "01",
    title: "Discovery",
    time: "Days, not weeks",
    body: "Before anything is designed I want to know what the product has to do, who pays for it, and what breaks if it's wrong. For an ERP that's 'what happens when an invoice is corrected'; for a marketplace it's 'who holds the money and when'. Most expensive mistakes are made here, so this is where I ask the awkward questions.",
    deliver: ["A one-page brief we both agree on", "The list of things that are deliberately out of scope", "A rough size and cost, with the assumptions written down"],
  },
  {
    n: "02",
    title: "Architecture",
    time: "One to two weeks for a new product",
    body: "The data model, the boundaries between services, the security model, and how money moves. I write this down before I write code, because a diagram is cheaper to change than a schema with data in it. You get to see the shape of the thing and push back.",
    deliver: ["Data model and ERD", "Security and permissions model — who can see what, and how that's enforced", "Deployment plan: where it runs, how it ships, what it costs to host"],
  },
  {
    n: "03",
    title: "Build",
    time: "Milestones you approve",
    body: "Small, reviewable diffs. Tests that run against a real database, not mocks. Written updates at the end of every working day so you never have to ask where things are. You see working software early — a staging environment from the first milestone — and I'd rather hear 'that's not what I meant' in week two than week ten.",
    deliver: ["Staging environment from milestone one", "Daily written updates", "Tests, lint, type-check and CI green on every merge"],
  },
  {
    n: "04",
    title: "Ship",
    time: "Planned, not hoped for",
    body: "Production deploys through CI, not from a laptop. Store submission for mobile, with the review notes and screenshots done. A runbook that says how to deploy, roll back, read the logs and fix the three most likely things to go wrong — written so someone who isn't me can follow it.",
    deliver: ["CI/CD pipeline to your infrastructure", "App Store / Play Store submission", "A runbook and a handover call"],
  },
  {
    n: "05",
    title: "Operate",
    time: "Ongoing, if you want it",
    body: "The part most engagements forget. Monitoring, backups, dependency updates, the occasional 2am incident. I can stay on retained hours, or hand over cleanly — everything is in your repos, your accounts, your infrastructure, with nothing that only lives in my head.",
    deliver: ["Retained hours, or a clean handover", "Diagnostics you can run yourself", "Your code, your infrastructure, your keys"],
  },
];

const principles = [
  ["Measure before changing", "On an existing product I look at what the bundle actually ships, where the requests go and which query is slow before I touch anything. The fix is usually smaller than people expect once you know where to look."],
  ["Smallest correct diff", "I don't refactor broadly, invent abstractions or touch files outside the ticket. Wide diffs are how you get a regression two screens away."],
  ["Say what you didn't do", "Every handover says what changed and what I deliberately left alone. Anything I noticed out of scope goes in a note, not in the diff."],
  ["Write it down", "Architecture, decisions, runbooks. If it's only in a conversation it doesn't exist."],
];

export default function ProcessPage() {
  return (
    <>
      <div className="pt-32 md:pt-40">
        <Container>
          <Eyebrow className="mb-4">Process</Eyebrow>
          <Words as="h1" text="How a project runs with me." className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl" />
          <p className="rise rise-3 mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">Five stages. Each one ends with something you can hold in your hand — a document, a staging URL, a pipeline, a runbook — so you always know where you are.</p>
        </Container>
      </div>

      <Section>
        <ol className="space-y-6">
          {stages.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05} as="li" className="grid gap-6 rounded-2xl border border-line bg-surface p-8 md:grid-cols-[120px_1fr_1fr] md:gap-10 md:p-10">
              <div>
                <span className="font-mono text-sm text-signal">{s.n}</span>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">{s.time}</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-ink">{s.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{s.body}</p>
              </div>
              <div className="md:border-l md:border-line md:pl-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">You get</p>
                <ul className="mt-3 flex flex-col gap-2 text-sm text-ink-2">
                  {s.deliver.map((d) => (
                    <li key={d} className="flex gap-3">
                      <span className="mt-[9px] h-px w-3 shrink-0 bg-signal" aria-hidden />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Principles" title="Four habits that shape all of it.">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {principles.map(([t, d]) => (
            <Reveal key={t} className="bg-surface p-8">
              <h3 className="text-lg font-semibold tracking-tight text-ink">{t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTA />
    </>
  );
}
