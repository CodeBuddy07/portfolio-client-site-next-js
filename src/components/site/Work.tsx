import { featuredProjects, projects } from "@/content/projects";
import { ArrowIcon, ButtonLink, Section } from "./primitives";
import { ProjectCard } from "./ProjectCard";

export function Work() {
  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title="Products that are live, not mockups."
      lede={`Six of the ${projects.length} products I've shipped with CodeMines. Every one has a real client, a real deadline and a link you can open.`}
      aside={
        <ButtonLink href="/work" variant="secondary" className="shrink-0">
          All {projects.length} projects <ArrowIcon />
        </ButtonLink>
      }
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {featuredProjects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} priority={i < 2} />
        ))}
      </div>
    </Section>
  );
}
