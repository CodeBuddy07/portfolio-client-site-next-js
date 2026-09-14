import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { Container, Eyebrow } from "@/components/site/primitives";
import { ProjectCard } from "@/components/site/ProjectCard";

export const metadata: Metadata = {
  title: "Work",
  description: `All ${projects.length} products I've shipped — web platforms, e-commerce and mobile apps, each with a live link.`,
};

export default function WorkPage() {
  return (
    <div className="pt-32 pb-24 md:pt-40 md:pb-32">
      <Container>
        <Eyebrow className="mb-4">Work</Eyebrow>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          {projects.length} products, all in production.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-2">
          Web platforms, e-commerce and mobile apps shipped with CodeMines. Every case study links to the live product
          or the store listing.
        </p>
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} priority={i < 2} />
          ))}
        </div>
      </Container>
    </div>
  );
}
