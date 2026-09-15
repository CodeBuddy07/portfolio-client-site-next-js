import Link from "next/link";
import { articles } from "@/content/writing";
import { ArrowIcon, ButtonLink, Eyebrow, Section } from "./primitives";
import { Stagger, StaggerItem } from "@/components/motion";

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function ArticleRow({ a }: { a: (typeof articles)[number] }) {
  return (
    <Link href={`/writing/${a.slug}`} className="group grid gap-3 border-t border-line py-7 md:grid-cols-[160px_1fr_auto] md:items-baseline">
      <span className="font-mono text-xs text-ink-3">{fmt(a.date)} · {a.readingMinutes} min</span>
      <span>
        <span className="block text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-white">{a.title}</span>
        <span className="mt-1.5 block max-w-2xl text-[15px] leading-relaxed text-ink-2">{a.summary}</span>
      </span>
      <span className="inline-flex items-center gap-1 text-sm text-ink-3 transition-colors group-hover:text-ink">
        Read <ArrowIcon className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export function WritingTeaser() {
  return (
    <Section
      id="writing"
      eyebrow="Writing"
      title="Decisions, explained."
      lede="Engineering notes from real products. The code is private; the thinking isn't."
      aside={
        <ButtonLink href="/writing" variant="secondary" className="shrink-0">
          All writing <ArrowIcon />
        </ButtonLink>
      }
    >
      <Stagger className="border-b border-line">
        {articles.slice(0, 3).map((a) => (
          <StaggerItem key={a.slug}>
            <ArticleRow a={a} />
          </StaggerItem>
        ))}
      </Stagger>
      <Eyebrow className="sr-only">Writing</Eyebrow>
    </Section>
  );
}
