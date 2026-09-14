import type { Metadata } from "next";
import Image from "next/image";
import { ParallaxImage } from "@/components/site/ParallaxImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adjacentProjects, getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { ArrowIcon, ButtonLink, Chip, Container, Eyebrow } from "@/components/site/primitives";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.tagline,
    openGraph: { title: p.title, description: p.tagline, images: [{ url: p.image.src }] },
  };
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <ButtonLink href={href} external variant="secondary">
      {children} <ArrowIcon className="-rotate-45" />
    </ButtonLink>
  );
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const { prev, next } = adjacentProjects(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    description: p.tagline,
    author: { "@type": "Person", name: site.name, url: site.url },
    dateCreated: String(p.year),
    image: `${site.url}${p.image.src}`,
  };

  return (
    <article className="pt-32 pb-24 md:pt-40 md:pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container>
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-ink-3">
          <Link href="/work" className="hover:text-ink">Work</Link>
          <span aria-hidden>/</span>
          <span className="text-ink-2">{p.name}</span>
        </nav>

        <Eyebrow className="mb-4">{p.category} · {p.year}</Eyebrow>
        <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">{p.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 md:text-xl">{p.tagline}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          {p.liveStatus === "live" && p.links.live && <ExternalLink href={p.links.live}>Visit live site</ExternalLink>}
          {p.links.appStore && <ExternalLink href={p.links.appStore}>App Store</ExternalLink>}
          {p.links.playStore && <ExternalLink href={p.links.playStore}>Play Store</ExternalLink>}
          {p.links.github && <ExternalLink href={p.links.github}>Source</ExternalLink>}
          {p.liveStatus === "offline" && (
            <span className="inline-flex h-11 items-center rounded-full border border-dashed border-line-strong px-5 text-sm text-ink-3">
              Live site temporarily offline
            </span>
          )}
          {p.confidential && (
            <span className="inline-flex h-11 items-center rounded-full border border-dashed border-line-strong px-5 text-sm text-ink-3">
              Client code is private — this describes the engineering
            </span>
          )}
        </div>

        <ParallaxImage
          src={p.image.src}
          alt={`${p.name} — ${p.category}`}
          priority
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="mt-14 aspect-[16/10] rounded-2xl border border-line bg-surface md:mt-16"
        />

        <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-line py-8 md:grid-cols-4">
          {[
            ["Client", p.client],
            ["Industry", p.industry],
            ["My role", p.role],
            ["Year", String(p.year)],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">{k}</dt>
              <dd className="mt-1.5 text-[15px] text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 grid gap-16 md:grid-cols-[minmax(0,1fr)_280px] md:gap-20">
          <div className="space-y-16">
            <section>
              <Eyebrow className="mb-4">Overview</Eyebrow>
              <p className="text-lg leading-relaxed text-ink-2">{p.summary}</p>
            </section>
            <section>
              <Eyebrow className="mb-4">The problem</Eyebrow>
              <p className="text-lg leading-relaxed text-ink-2">{p.challenge}</p>
            </section>
            <section>
              <Eyebrow className="mb-4">What I built</Eyebrow>
              <ul className="space-y-4">
                {p.built.map((b) => (
                  <li key={b} className="flex gap-4 text-[17px] leading-relaxed text-ink-2">
                    <span className="mt-[13px] h-px w-4 shrink-0 bg-signal" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <Eyebrow className="mb-6">Outcome</Eyebrow>
              <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                {p.results.map((r) => (
                  <div key={r.label} className="bg-surface p-6">
                    <p className="text-2xl font-semibold tracking-tight text-ink">{r.value}</p>
                    <p className="mt-1 text-sm text-ink-2">{r.label}</p>
                  </div>
                ))}
              </div>
            </section>
            {p.gallery && p.gallery.length > 0 && (
              <section>
                <Eyebrow className="mb-6">Screens</Eyebrow>
                <div className="grid gap-4">
                  {p.gallery.map((g) => (
                    <figure key={g.src} className="overflow-hidden rounded-2xl border border-line bg-surface">
                      <Image src={g.src} alt={g.alt} width={1440} height={900} sizes="(min-width: 1024px) 760px, 100vw" className="h-auto w-full" />
                      <figcaption className="border-t border-line px-4 py-2 text-xs text-ink-3">{g.alt}</figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )}
            {p.engineering && (
              <section>
                <Eyebrow className="mb-6">Engineering decisions</Eyebrow>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {p.engineering.map((e) => (
                    <li key={e} className="rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink">
                      {e}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {p.quote && (
              <figure className="rounded-2xl border border-line bg-surface p-8">
                <blockquote className="text-lg leading-relaxed text-ink">&ldquo;{p.quote.text}&rdquo;</blockquote>
                <figcaption className="mt-4 text-sm text-ink-3">— {p.quote.from}</figcaption>
              </figure>
            )}
          </div>

          <aside className="md:sticky md:top-24 md:self-start">
            <Eyebrow className="mb-4">Built with</Eyebrow>
            <div className="flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
            <div className="mt-10 rounded-2xl border border-line bg-surface p-6">
              <p className="text-sm text-ink">Have something like this?</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">
                Tell me what it is and what&apos;s in the way. I reply within 24 hours.
              </p>
              <ButtonLink href="/#contact" className="mt-5 w-full">
                Start a conversation <ArrowIcon />
              </ButtonLink>
            </div>
          </aside>
        </div>

        <nav className="mt-24 grid gap-4 border-t border-line pt-8 sm:grid-cols-2" aria-label="More work">
          {prev ? (
            <Link href={`/work/${prev.slug}`} className="group rounded-2xl border border-line p-6 transition-colors hover:border-line-strong">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">Previous</span>
              <span className="mt-2 flex items-center gap-2 text-lg font-semibold text-ink"><ArrowIcon className="rotate-180" />{prev.name}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/work/${next.slug}`} className="group rounded-2xl border border-line p-6 text-right transition-colors hover:border-line-strong">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">Next</span>
              <span className="mt-2 flex items-center justify-end gap-2 text-lg font-semibold text-ink">{next.name}<ArrowIcon /></span>
            </Link>
          ) : <span />}
        </nav>
      </Container>
    </article>
  );
}
