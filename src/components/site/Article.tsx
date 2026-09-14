import type { Block } from "@/content/writing";

export function ArticleBody({ body }: { body: Block[] }) {
  return (
    <div className="space-y-6 text-[17px] leading-[1.75] text-ink-2">
      {body.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} className="pt-6 text-2xl font-semibold tracking-tight text-ink">
                {b.text}
              </h2>
            );
          case "p":
            return <p key={i}>{b.text}</p>;
          case "ul":
            return (
              <ul key={i} className="space-y-3">
                {b.items.map((it) => (
                  <li key={it} className="flex gap-4">
                    <span className="mt-[14px] h-px w-4 shrink-0 bg-signal" aria-hidden />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote key={i} className="border-l-2 border-signal pl-6 text-lg italic text-ink">
                {b.text}
              </blockquote>
            );
          case "code":
            return (
              <figure key={i} className="overflow-hidden rounded-2xl border border-line bg-surface">
                {b.caption && (
                  <figcaption className="border-b border-line px-4 py-2 font-mono text-[11px] text-ink-3">{b.caption}</figcaption>
                )}
                <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-ink-2">
                  <code>{b.code}</code>
                </pre>
              </figure>
            );
        }
      })}
    </div>
  );
}
