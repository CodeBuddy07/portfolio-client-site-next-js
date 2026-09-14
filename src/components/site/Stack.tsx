import { Section } from "./primitives";

const groups = [
  { name: "Front end", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "React Native", "Expo"] },
  { name: "Back end", items: ["NestJS", "Node.js", "REST APIs", "JWT / Passport", "Stripe", "OpenAI"] },
  { name: "Data", items: ["PostgreSQL", "MongoDB", "Prisma", "Redis"] },
  { name: "Infrastructure", items: ["Docker", "Nginx / VPS", "GitHub Actions", "Vercel", "AWS S3", "Cloudflare"] },
];

export function Stack() {
  return (
    <Section
      id="stack"
      eyebrow="Stack"
      title="The tools I reach for."
      lede="Deliberately short. I'd rather be fluent in these than list forty logos."
    >
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((g) => (
          <div key={g.name}>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3">{g.name}</h3>
            <ul className="mt-4 flex flex-col divide-y divide-line border-y border-line">
              {g.items.map((it) => (
                <li key={it} className="py-2.5 text-[15px] text-ink">
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
