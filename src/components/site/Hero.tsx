import { site } from "@/content/site";
import { ArrowIcon, ButtonLink, Container } from "./primitives";
import { Counter, Magnetic, Words } from "@/components/motion";
import { HeroShell } from "./HeroShell";

const proof = [
  { value: site.stats.commits, suffix: "", label: "commits shipped since 2024" },
  { value: site.stats.productsShipped, suffix: "", label: "products in production" },
  { value: site.stats.storeApps, suffix: "", label: "apps on the App Store and Play Store" },
  { value: 24, suffix: "h", label: "typical reply time · GMT+6" },
];

export function Hero() {
  return (
    <HeroShell className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      <Container className="relative">
        <div className="rise rise-1 mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-ink-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
          </span>
          {site.availability} · {site.responseTime.toLowerCase()}
        </div>

        <Words
          text={site.headline}
          className="max-w-4xl text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.03em] text-ink sm:text-6xl md:text-7xl"
          delay={0.1}
        />

        <div className="rise rise-3 mt-7 max-w-2xl text-lg leading-relaxed text-ink-2 md:text-xl">
          <p>
            Multi-tenant SaaS, financial ERPs, real-time platforms and mobile apps — designed, shipped and operated
            in production. Product engineer and co-founder of{" "}
            <a href={site.studio.url} target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
              {site.studio.name}
            </a>
            .
          </p>
        </div>

        <div className="rise rise-4 mt-10 flex flex-wrap items-center gap-3">
          <Magnetic>
            <ButtonLink href="/work" size="lg">
              See the work <ArrowIcon />
            </ButtonLink>
          </Magnetic>
          <Magnetic>
            <ButtonLink href="/systems" variant="secondary" size="lg">
              How I build systems
            </ButtonLink>
          </Magnetic>
        </div>

        <div className="rise rise-4 mt-20 border-t border-line pt-8">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4">
            {proof.map((p) => (
              <div key={p.label}>
                <dd className="mb-1 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                  <Counter value={p.value} suffix={p.suffix} />
                </dd>
                <dt className="text-sm text-ink-3">{p.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </HeroShell>
  );
}
