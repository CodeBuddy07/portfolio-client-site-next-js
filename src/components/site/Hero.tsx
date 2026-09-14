import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { ArrowIcon, ButtonLink, Container } from "./primitives";

const storeCount = projects.filter((p) => p.links.appStore || p.links.playStore).length;

const proof = [
  { value: String(projects.length), label: "shipped products" },
  { value: String(storeCount), label: "on the App Store / Play Store" },
  { value: "24h", label: "typical reply time" },
  { value: "GMT+6", label: site.overlap },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="grid-dots pointer-events-none absolute inset-0" aria-hidden />
      <Container className="relative">
        <div className="rise rise-1 mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-ink-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
          </span>
          {site.availability} · {site.responseTime.toLowerCase()}
        </div>

        <h1 className="rise rise-2 max-w-4xl text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.03em] text-ink sm:text-6xl md:text-7xl">
          I build web and mobile products that ship.
        </h1>

        <p className="rise rise-3 mt-7 max-w-2xl text-lg leading-relaxed text-ink-2 md:text-xl">
          Full-stack engineer at{" "}
          <a href={site.studio.url} target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
            {site.studio.name}
          </a>
          . Next.js, NestJS, React Native and PostgreSQL — {projects.length} products live across the web,
          App Store and Play Store, and a habit of diagnosing before I write code.
        </p>

        <div className="rise rise-4 mt-10 flex flex-wrap items-center gap-3">
          <ButtonLink href="/#work" size="lg">
            See the work <ArrowIcon />
          </ButtonLink>
          <ButtonLink href="/#contact" variant="secondary" size="lg">
            Start a conversation
          </ButtonLink>
        </div>

        <dl className="rise rise-4 mt-20 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-line pt-8 md:grid-cols-4">
          {proof.map((p) => (
            <div key={p.label}>
              <dt className="order-2 text-sm text-ink-3">{p.label}</dt>
              <dd className="order-1 mb-1 text-2xl font-semibold tracking-tight text-ink md:text-3xl">{p.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
