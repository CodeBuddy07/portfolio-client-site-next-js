import { featuredProjects, projects } from "@/content/projects";
import { ArrowIcon, ButtonLink, Section } from "./primitives";
import { ProjectCard } from "./ProjectCard";
import { Stagger, StaggerItem } from "@/components/motion";

export function Work() {
  const [a, b, ...rest] = featuredProjects;
  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title="Systems in production, not mockups."
      lede={`Six of the ${projects.length} products I've built. Every one has a real client, real money moving through it, and either a link you can open or a reason it's confidential.`}
      aside={
        <ButtonLink href="/work" variant="secondary" className="shrink-0">
          All {projects.length} projects <ArrowIcon />
        </ButtonLink>
      }
    >
      <Stagger className="grid gap-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <StaggerItem><ProjectCard project={a} priority large /></StaggerItem>
          <StaggerItem><ProjectCard project={b} priority large /></StaggerItem>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {rest.map((p) => (
            <StaggerItem key={p.slug}><ProjectCard project={p} /></StaggerItem>
          ))}
        </div>
      </Stagger>
    </Section>
  );
}
