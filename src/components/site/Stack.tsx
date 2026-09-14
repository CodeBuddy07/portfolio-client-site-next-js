import {
  siNextdotjs, siReact, siTypescript, siTailwindcss, siExpo,
  siNestjs, siNodedotjs, siExpress, siSocketdotio, siStripe, siOpenai, siZod,
  siPostgresql, siPrisma, siMongodb, siRedis,
  siDocker, siNginx, siGithubactions, siVercel, siCloudflare,
} from "simple-icons";
import { Section } from "./primitives";
import { Stagger, StaggerItem } from "@/components/motion";

type Icon = { title: string; path: string; hex: string };

// Several brand marks are black; give those a light hover colour on the dark canvas.
const tone = (i: Icon, override?: string): Icon => ({ ...i, hex: override ?? (["000000", "010101", "1C2024", "2D3748"].includes(i.hex) ? "F4F4F5" : i.hex) });

const groups: { name: string; items: Icon[] }[] = [
  { name: "Front end", items: [tone(siNextdotjs), tone(siReact), tone(siTypescript), tone(siTailwindcss), tone(siExpo)] },
  { name: "Back end", items: [tone(siNestjs), tone(siNodedotjs), tone(siExpress), tone(siSocketdotio), tone(siStripe), tone(siOpenai, "10A37F"), tone(siZod)] },
  { name: "Data", items: [tone(siPostgresql), tone(siPrisma, "5A67D8"), tone(siMongodb), tone(siRedis)] },
  { name: "Infrastructure", items: [tone(siDocker), tone(siNginx), tone(siGithubactions), tone(siVercel), tone(siCloudflare)] },
];

function Tile({ icon }: { icon: Icon }) {
  return (
    <div
      className="group relative flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface px-3 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      style={{ ["--brand" as string]: `#${icon.hex}` }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--brand) 45%, transparent), 0 0 32px -8px color-mix(in srgb, var(--brand) 55%, transparent)" }}
      />
      <svg viewBox="0 0 24 24" className="h-8 w-8 fill-ink-3 transition-colors duration-300 group-hover:fill-[var(--brand)]" role="img" aria-label={icon.title}>
        <path d={icon.path} />
      </svg>
      <span className="text-[12px] text-ink-2 transition-colors group-hover:text-ink">{icon.title}</span>
    </div>
  );
}

export function Stack() {
  return (
    <Section
      id="stack"
      eyebrow="Stack"
      title="The tools I reach for."
      lede="Deliberately short. I'd rather be fluent in these than list forty logos."
    >
      <div className="space-y-10">
        {groups.map((g) => (
          <div key={g.name}>
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3">{g.name}</h3>
            <Stagger className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7" step={0.04}>
              {g.items.map((i) => (
                <StaggerItem key={i.title}>
                  <Tile icon={i} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        ))}
      </div>
    </Section>
  );
}
