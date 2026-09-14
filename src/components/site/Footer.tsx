import Link from "next/link";
import { site, nav } from "@/content/site";
import { Container } from "./primitives";

export function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <Container className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">{site.name}</p>
          <p className="mt-1 max-w-xs text-sm leading-relaxed text-ink-3">
            Product engineer · co-founder of{" "}
            <a href={site.studio.url} target="_blank" rel="noopener noreferrer" className="text-ink-2 hover:text-ink">
              {site.studio.name}
            </a>
            . {site.location}.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-16 gap-y-2 text-sm">
          <div className="flex flex-col gap-2">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="text-ink-3 hover:text-ink">
                {n.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <a href={site.socials.github} target="_blank" rel="noopener noreferrer" className="text-ink-3 hover:text-ink">GitHub</a>
            <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-ink-3 hover:text-ink">LinkedIn</a>
            <a href={site.socials.upwork} target="_blank" rel="noopener noreferrer" className="text-ink-3 hover:text-ink">Upwork</a>
            <a href={`mailto:${site.email}`} className="text-ink-3 hover:text-ink">Email</a>
          </div>
        </div>
      </Container>
      <Container className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-3 md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p>{site.location}</p>
      </Container>
    </footer>
  );
}
