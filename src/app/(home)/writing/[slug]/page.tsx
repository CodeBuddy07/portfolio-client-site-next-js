import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/content/writing";
import { getProject } from "@/content/projects";
import { site } from "@/content/site";
import { ArticleBody } from "@/components/site/Article";
import { CTA } from "@/components/site/CTA";
import { ArrowIcon, Chip, Container, Eyebrow } from "@/components/site/primitives";
import { Words } from "@/components/motion";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return { title: a.title, description: a.summary, openGraph: { type: "article", title: a.title, description: a.summary, publishedTime: a.date } };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const project = a.related ? getProject(a.related) : undefined;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: a.title,
    description: a.summary,
    datePublished: a.date,
    author: { "@type": "Person", name: site.name, url: site.url },
  };
  return (
    <>
      <article className="pt-32 pb-24 md:pt-40 md:pb-32">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Container className="max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-ink-3">
            <Link href="/writing" className="hover:text-ink">Writing</Link>
            <span aria-hidden>/</span>
            <span className="text-ink-2">{a.title}</span>
          </nav>
          <Eyebrow className="mb-4">
            {new Date(a.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · {a.readingMinutes} min read
          </Eyebrow>
          <Words as="h1" text={a.title} className="text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-5xl" />
          <p className="rise rise-3 mt-6 text-xl leading-relaxed text-ink-2">{a.summary}</p>
          <div className="rise rise-4 mt-6 flex flex-wrap gap-2">
            {a.tags.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
          <div className="mt-14">
            <ArticleBody body={a.body} />
          </div>
          {project && (
            <Link href={`/work/${project.slug}`} className="group mt-16 flex items-center justify-between rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-line-strong">
              <span>
                <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">The product this comes from</span>
                <span className="mt-1 block text-lg font-semibold text-ink">{project.name}</span>
              </span>
              <ArrowIcon className="text-ink-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </Container>
      </article>
      <CTA />
    </>
  );
}
