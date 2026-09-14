import Image from "next/image";
import { site } from "@/content/site";
import { Section } from "./primitives";

export function About() {
  return (
    <Section id="about" eyebrow="About" title="Engineer first. Diagnostician by habit.">
      <div className="grid gap-12 md:grid-cols-[minmax(0,320px)_1fr] md:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-surface md:sticky md:top-24">
          <Image
            src="/ProfileImage.jpg"
            alt={`${site.name}`}
            fill
            sizes="(min-width: 768px) 320px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="max-w-2xl space-y-5 text-[17px] leading-relaxed text-ink-2">
          <p>
            I&apos;m Ruhul, a full-stack engineer at{" "}
            <a href={site.studio.url} target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
              CodeMines
            </a>
            , a small product studio in Dhaka. Over the last two years we&apos;ve taken ten products from brief to
            production — web platforms, e-commerce, and mobile apps now live on the App Store and Play Store — and
            I&apos;ve been hands-on across the stack on all of them.
          </p>
          <p>
            The thing I care most about is the gap between &ldquo;it works on my machine&rdquo; and &ldquo;it works for
            your customers&rdquo;. So before I write code on an existing product I measure it: what the bundle actually
            ships, where the requests go, which query is doing the damage. The fix is usually smaller than people expect
            once you know where to look.
          </p>
          <p>
            I work in TypeScript end to end — Next.js and React on the front, NestJS and Node behind it, PostgreSQL or
            MongoDB underneath, React Native when it needs to be in someone&apos;s pocket. I use AI coding tools every
            day as an agent, not autocomplete, and I don&apos;t ship a change I can&apos;t explain line by line.
          </p>
          <p>
            I&apos;m in Dhaka (GMT+6), which overlaps US mornings and EU afternoons. I work asynchronously by default:
            written updates, small reviewable diffs, and a clear note on what changed and what I deliberately left alone.
          </p>
          <dl className="grid grid-cols-1 gap-4 border-t border-line pt-6 text-sm sm:grid-cols-3">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">Currently</dt>
              <dd className="mt-1 text-ink">Engineer, CodeMines</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">Based in</dt>
              <dd className="mt-1 text-ink">Dhaka · GMT+6</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">Studying</dt>
              <dd className="mt-1 text-ink">CS diploma, Dhaka Polytechnic</dd>
            </div>
          </dl>
        </div>
      </div>
    </Section>
  );
}
