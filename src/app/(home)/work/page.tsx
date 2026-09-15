import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { Container, Eyebrow } from "@/components/site/primitives";
import { WorkGrid } from "@/components/site/WorkGrid";
import { CTA } from "@/components/site/CTA";
import { Words } from "@/components/motion";

export const metadata: Metadata = {
  title: "Work",
  description: `${projects.length} products in production: SaaS platforms, ERPs, e-commerce and mobile apps.`,
};

export default function WorkPage() {
  return (
    <>
      <div className="pt-32 pb-16 md:pt-40">
        <Container>
          <Eyebrow className="mb-4">Work</Eyebrow>
          <Words as="h1" text={`${projects.length} products, all in production.`} className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl" />
          <p className="rise rise-3 mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">SaaS platforms, financial systems, e-commerce and mobile apps. Some link to a live product or a store listing; the confidential ones describe the engineering instead of the client.</p>
        </Container>
      </div>
      <Container className="pb-24 md:pb-32">
        <WorkGrid projects={projects} />
      </Container>
      <CTA />
    </>
  );
}
