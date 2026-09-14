"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Project, ProjectKind } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/utils";

const filters: { key: ProjectKind | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "web", label: "SaaS & platforms" },
  { key: "ecommerce", label: "E-commerce" },
  { key: "mobile", label: "Mobile" },
  { key: "marketing", label: "Marketing sites" },
];

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [kind, setKind] = useState<ProjectKind | "all">("all");
  const list = kind === "all" ? projects : projects.filter((p) => p.kind === kind);
  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
        {filters.map((f) => {
          const n = f.key === "all" ? projects.length : projects.filter((p) => p.kind === f.key).length;
          return (
            <button
              key={f.key}
              role="tab"
              aria-selected={kind === f.key}
              onClick={() => setKind(f.key)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                kind === f.key ? "border-ink bg-ink text-canvas" : "border-line text-ink-2 hover:border-line-strong hover:text-ink"
              )}
            >
              {f.label} <span className={cn("ml-1 font-mono text-[11px]", kind === f.key ? "text-canvas/70" : "text-ink-3")}>{n}</span>
            </button>
          );
        })}
      </div>
      <motion.div layout className="grid gap-6 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={p} priority={i < 2} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
