import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { ArrowIcon, Chip, Eyebrow } from "./primitives";
import { Tilt } from "@/components/motion";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, priority = false, className, large = false }: { project: Project; priority?: boolean; className?: string; large?: boolean }) {
  const store = project.links.appStore ? "App Store" : project.links.playStore ? "Play Store" : project.confidential ? "Confidential" : null;
  return (
    <Tilt className={cn("group h-full rounded-2xl", className)}>
      <Link
        href={`/work/${project.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-line-strong"
      >
        <div className={cn("relative overflow-hidden border-b border-line bg-surface-2", "aspect-[16/10]")}>
          <Image
            src={project.image.src}
            alt={`${project.name} — ${project.category}`}
            fill
            sizes={large ? "(min-width: 1024px) 1152px, 100vw" : "(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"}
            priority={priority}
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center justify-between gap-4">
            <Eyebrow>{project.category}</Eyebrow>
            {store && <span className="font-mono text-[11px] text-ink-3">{store}</span>}
          </div>
          <h3 className={cn("mt-3 font-semibold tracking-tight text-ink", large ? "text-2xl" : "text-xl")}>{project.name}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-2">{project.tagline}</p>
          <div className="mt-5 flex items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 3).map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 text-sm text-ink-3 transition-colors group-hover:text-ink">
              Case study <ArrowIcon className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </Tilt>
  );
}
