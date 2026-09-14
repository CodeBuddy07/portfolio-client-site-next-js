import Link from "next/link";
import { Hero } from "@/components/site/Hero";
import { Work } from "@/components/site/Work";
import { Capabilities } from "@/components/site/Capabilities";
import { WritingTeaser } from "@/components/site/WritingList";
import { CTA } from "@/components/site/CTA";
import { SystemDiagram } from "@/components/site/SystemDiagram";
import { ArrowIcon, ButtonLink, Section } from "@/components/site/primitives";
import { Reveal } from "@/components/motion";
import { systems } from "@/content/systems";
import { site } from "@/content/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  worksFor: { "@type": "Organization", name: site.studio.name, url: site.studio.url },
  sameAs: [site.socials.github, site.socials.linkedin, site.socials.upwork],
  address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
  knowsAbout: ["Next.js", "NestJS", "React Native", "TypeScript", "PostgreSQL", "MongoDB", "Node.js", "Multi-tenant SaaS", "ERP"],
};

const steps = [
  ["Discovery", "What the product has to do, who pays, what breaks if it's wrong."],
  ["Architecture", "Data model, boundaries, the security model, what's deliberately out of scope."],
  ["Build", "Small reviewable diffs, tests that run against a real database, written updates."],
  ["Ship", "CI to a real environment, store submission, a runbook you can operate without me."],
];

export default function HomePage() {
  const featured = systems[0];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <Hero />
      <Work />

      <Section
        id="systems"
        eyebrow="How I build"
        title="Click through a real system."
        lede={`${featured.title}. Every node is something that exists in production code today.`}
        aside={
          <ButtonLink href="/systems" variant="secondary" className="shrink-0">
            More systems <ArrowIcon />
          </ButtonLink>
        }
      >
        <Reveal>
          <SystemDiagram system={featured} />
        </Reveal>
      </Section>

      <Capabilities />

      <Section
        eyebrow="Process"
        title="How a project runs with me."
        lede="Four stages, each with something you can hold in your hand at the end."
        aside={
          <ButtonLink href="/process" variant="secondary" className="shrink-0">
            The full process <ArrowIcon />
          </ButtonLink>
        }
      >
        <ol className="grid gap-6 md:grid-cols-4">
          {steps.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.08} as="li" className="rounded-2xl border border-line bg-surface p-6">
              <span className="font-mono text-xs text-signal">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{d}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <WritingTeaser />

      <Section eyebrow="About" title="Co-founder of CodeMines. Engineer first.">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-2xl text-lg leading-relaxed text-ink-2">
            Three years of shipping products end to end — a contract at an IPTV business, independent product work, a year at SparkTech Agency, and now CodeMines, the studio I co-founded: {site.stats.commits.toLocaleString()} commits across {site.stats.repos} repositories, most of it multi-tenant SaaS, financial systems and mobile apps that real businesses run on. I work in TypeScript across the whole stack, I measure before I change things, and I don&apos;t ship code I can&apos;t explain line by line.
          </p>
          <Link href="/about" className="inline-flex items-center gap-1 text-sm text-ink-2 hover:text-ink">
            More about me <ArrowIcon />
          </Link>
        </div>
      </Section>

      <CTA />
    </>
  );
}
