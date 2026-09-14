import type { Metadata } from "next";
import Link from "next/link";
import { systems } from "@/content/systems";
import { getProject } from "@/content/projects";
import { SystemDiagram } from "@/components/site/SystemDiagram";
import { CTA } from "@/components/site/CTA";
import { ArrowIcon, Container, Eyebrow } from "@/components/site/primitives";
import { Reveal, Words } from "@/components/motion";

export const metadata: Metadata = {
  title: "Systems",
  description: "Interactive walkthroughs of the architecture behind products I've shipped — tenant isolation, money models, and what makes them safe.",
};

export default function SystemsPage() {
  return (
    <>
      <div className="pt-32 md:pt-40">
        <Container>
          <Eyebrow className="mb-4">Systems</Eyebrow>
          <Words as="h1" text="The architecture behind the products." className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl" />
          <p className="rise rise-3 mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
              The code for most of this is private — it belongs to the businesses that run on it. The design isn&apos;t. Each diagram below is a real system in production; click any node to see what it does and why it&apos;s there.
            </p>
        </Container>
      </div>

      {systems.map((s, i) => {
        const project = getProject(s.project);
        return (
          <section key={s.slug} id={s.slug} className={`scroll-mt-24 py-20 md:py-28 ${i > 0 ? "border-t border-line" : ""}`}>
            <Container>
              <Reveal className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <Eyebrow className="mb-3">{s.eyebrow}</Eyebrow>
                  <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">{s.title}</h2>
                  <p className="mt-3 text-base text-ink-2">{s.intro}</p>
                </div>
                {project && (
                  <Link href={`/work/${project.slug}`} className="inline-flex shrink-0 items-center gap-1 text-sm text-ink-3 hover:text-ink">
                    Case study: {project.name} <ArrowIcon />
                  </Link>
                )}
              </Reveal>
              <Reveal>
                <SystemDiagram system={s} />
              </Reveal>
            </Container>
          </section>
        );
      })}

      <CTA title="Building something with the same shape?" body="If your product has tenants, money, or both, the decisions above are the ones that matter. I'm happy to talk through yours before anything is built." />
    </>
  );
}
