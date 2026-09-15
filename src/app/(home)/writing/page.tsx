import type { Metadata } from "next";
import { articles } from "@/content/writing";
import { ArticleRow } from "@/components/site/WritingList";
import { CTA } from "@/components/site/CTA";
import { Container, Eyebrow } from "@/components/site/primitives";
import { Stagger, StaggerItem, Words } from "@/components/motion";

export const metadata: Metadata = {
  title: "Writing",
  description: "Engineering notes from real products: money models, tenant isolation, shipping mobile apps. The code is private; the thinking isn't.",
};

export default function WritingPage() {
  return (
    <>
      <div className="pt-32 pb-8 md:pt-40">
        <Container>
          <Eyebrow className="mb-4">Writing</Eyebrow>
          <Words as="h1" text="Decisions, explained." className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl" />
          <p className="rise rise-3 mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">Notes from systems I&apos;ve built, with the real code where I can show it. Written for engineers and for the people who hire them.</p>
        </Container>
      </div>
      <Container className="pb-24 md:pb-32">
        <Stagger className="border-b border-line">
          {articles.map((a) => (
            <StaggerItem key={a.slug}>
              <ArticleRow a={a} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
      <CTA />
    </>
  );
}
