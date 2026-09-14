import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { ArrowIcon, Chip, Eyebrow } from "./primitives";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, priority = false, className }: { project: Project; priority?: boolean; className?: string }) {
  const store = project.links.appStore ? "App Store" : project.links.playStore ? "Play Store" : null;
  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-line-strong",
        className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface-2">
        <Image
          src={project.image.src}
          alt={`${project.name} — ${project.category}`}
          fill
          sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-4">
          <Eyebrow>{project.category}</Eyebrow>
          {store && <span className="font-mono text-[11px] text-ink-3">{store}</span>}
        </div>
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-ink">{project.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-2">{project.tagline}</p>
        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 3).map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
          <span className="inline-flex items-center gap-1 text-sm text-ink-3 transition-colors group-hover:text-ink">
            Case study <ArrowIcon className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
