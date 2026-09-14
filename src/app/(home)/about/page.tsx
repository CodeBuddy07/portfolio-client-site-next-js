import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/content/site";
import { CTA } from "@/components/site/CTA";
import { Stack } from "@/components/site/Stack";
import { ArrowIcon, ButtonLink, Container, Eyebrow, Section } from "@/components/site/primitives";
import { education, testimonial } from "@/content/documents";
import { Reveal, Words } from "@/components/motion";

export const metadata: Metadata = {
  title: "About",
  description: "Product engineer and co-founder of CodeMines, Dhaka. Three years, 81 repositories, 1,660 commits — multi-tenant SaaS, financial ERPs, and mobile apps in production.",
};

const timeline = [
  ["2023", "Started building for the web — HTML, CSS, then JavaScript and the first React apps. By June, first paid work: a salaried contract at Alpha Media, an IPTV business, maintaining their platform and building the IPTV Business Management System on top of it."],
  ["2024", "Finished the Alpha Media contract in February and went independent. A tradespeople marketplace, a healthcare e-commerce store, and a blood-donor network for Feni District — the last one is still running and still the only bilingual donor platform the district has."],
  ["2025", "Joined SparkTech Agency in June as a full-stack developer: NestJS, Prisma and PostgreSQL became the default, with React Native, AWS video delivery, Redis and BullMQ on production products. Shipped four React Native apps through App Store review, a VC modelling SaaS, an e-commerce store on Stripe. 72 pull requests reviewed and merged."],
  ["2026", "Completed the CS diploma in May. SparkTech ended in June; formed CodeMines with former colleagues the same month. Multi-tenant retail POS SaaS with ORM-level tenant isolation. A wholesale ERP with integer money, FIFO costing and a double-entry ledger. A four-surface product suite with runbooks as GitHub Actions. Started a BSc in CSE at BUBT."],
];

export default function AboutPage() {
  return (
    <>
      <div className="pt-32 md:pt-40">
        <Container>
          <Eyebrow className="mb-4">About</Eyebrow>
          <Words as="h1" text="I build the whole thing, then I keep it running." className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl" />
        </Container>
      </div>

      <Section>
        <div className="grid gap-12 md:grid-cols-[minmax(0,320px)_1fr] md:gap-16">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-surface md:sticky md:top-24">
            <Image src="/ruhul-amin.jpg" alt={site.name} fill sizes="(min-width: 768px) 320px, 100vw" className="object-cover object-top" priority />
          </Reveal>
          <Reveal delay={0.1} className="max-w-2xl space-y-5 text-[17px] leading-relaxed text-ink-2">
            <p>
              I&apos;m Ruhul, a product engineer and co-founder of{" "}
              <a href={site.studio.url} target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
                CodeMines
              </a>
              , a small product studio in Dhaka. Before that: a year at SparkTech Agency, a stretch of independent product work, and eight months on contract keeping an IPTV business&apos;s systems running. Over the last three years I&apos;ve put {site.stats.commits.toLocaleString()} commits into {site.stats.repos} repositories — most of them products that real businesses run their day on: a multi-tenant point-of-sale SaaS, a wholesale ERP with real accounting underneath, a jobs marketplace, a shared-housing platform, and mobile apps that went through App Store and Play Store review.
            </p>
            <p>
              I work across the whole stack in TypeScript — Next.js and React on the front, NestJS and Node behind it, PostgreSQL or MongoDB underneath, React Native when it needs to be in someone&apos;s pocket — and I own the deployment too: Docker, nginx, GitHub Actions, a VPS when Vercel isn&apos;t the right answer. I&apos;d rather be the person who can take a product from a brief to a running system than the person who does one layer of it well.
            </p>
            <p>
              The thing I care most about is the gap between &ldquo;it works&rdquo; and &ldquo;it&apos;s correct&rdquo;. Money that rounds. Tenants that leak. History that gets edited. Those are the bugs that cost businesses trust, and they don&apos;t show up in a demo. So I design against them from the start — integer money, isolation the ORM enforces, ledgers you can only append to — and I write down what a system deliberately doesn&apos;t claim.
            </p>
            <p>
              I use AI coding tools every day, as an agent rather than autocomplete: reading unfamiliar code, reproducing a bug, drafting the test that pins it. I don&apos;t ship a change I can&apos;t explain line by line. I&apos;m in Dhaka (GMT+6), which overlaps US mornings and EU afternoons, and I work asynchronously by default — written updates, small reviewable diffs, a clear note on what changed and what I deliberately left alone.
            </p>
            <dl className="grid grid-cols-1 gap-4 border-t border-line pt-6 text-sm sm:grid-cols-3">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">Currently</dt>
                <dd className="mt-1 text-ink">Co-founder &amp; product engineer, CodeMines</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">Based in</dt>
                <dd className="mt-1 text-ink">Dhaka · GMT+6</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">Studying</dt>
                <dd className="mt-1 text-ink">BSc CSE, BUBT · Diploma CST, 2026</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </Section>

      <Section eyebrow="From a client" title="The only testimonial I've asked for so far.">
        <figure className="grid gap-6 rounded-2xl border border-line bg-surface p-8 md:grid-cols-[auto_1fr] md:items-center md:gap-8 md:p-10">
          <Image src={testimonial.photo} alt={testimonial.name} width={96} height={96} className="h-20 w-20 rounded-full object-cover md:h-24 md:w-24" />
          <div>
            <blockquote className="text-lg leading-relaxed text-ink md:text-xl">&ldquo;{testimonial.text}&rdquo;</blockquote>
            <figcaption className="mt-4 text-sm text-ink-3">
              <span className="font-medium text-ink">{testimonial.name}</span> — {testimonial.title}
            </figcaption>
          </div>
        </figure>
      </Section>

      <Section eyebrow="Timeline" title="Three years, in shipping terms.">
        <ol className="relative border-l border-line pl-8">
          {timeline.map(([y, t], i) => (
            <Reveal key={y} delay={i * 0.06} as="li" className="relative pb-10 last:pb-0">
              <span className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-canvas bg-signal" aria-hidden />
              <p className="font-mono text-xs text-ink-3">{y}</p>
              <p className="mt-2 max-w-2xl text-[16px] leading-relaxed text-ink-2">{t}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Education" title="Credentials." lede="Diploma completed in May 2026; the degree runs alongside the work.">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
          <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
            {education.map((e) => (
              <li key={e.school} className="grid gap-2 p-6 md:grid-cols-[180px_1fr]">
                <span className="font-mono text-xs text-ink-3">{e.period}</span>
                <span>
                  <span className="block font-semibold text-ink">{e.award}</span>
                  <span className="block text-sm text-ink-2">{e.school}</span>
                </span>
              </li>
            ))}
          </ul>
          <ButtonLink href="/resume" variant="secondary" className="shrink-0">
            Resume &amp; CV <ArrowIcon />
          </ButtonLink>
        </div>
      </Section>

      <Stack />
      <CTA />
    </>
  );
}
