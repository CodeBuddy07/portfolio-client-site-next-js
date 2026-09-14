import type { Metadata } from "next";
import { resume } from "@/content/resume";
import { projects } from "@/content/projects";
import Image from "next/image";
import { ArrowIcon, ButtonLink, Container, Eyebrow } from "@/components/site/primitives";

export const metadata: Metadata = {
  title: "CV",
  description: "Ruhul Amin — product engineer. CV as a web page, with a PDF download.",
};

const featured = projects.filter((p) => p.featured);

export default function ResumePage() {
  return (
    <div className="pt-28 pb-24 md:pt-36 md:pb-32 print:pt-0 print:pb-0">
      <Container className="max-w-3xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <Eyebrow>Curriculum vitae</Eyebrow>
          <div className="flex gap-2">
            <ButtonLink href={resume.pdf} variant="secondary" className="h-9 px-4" external>
              Download PDF <ArrowIcon className="-rotate-45" />
            </ButtonLink>
          </div>
        </div>

        <article className="cv rounded-2xl border border-line bg-surface p-8 md:p-12 print:rounded-none print:border-0 print:bg-white print:p-0">
          <header className="flex flex-col gap-4 border-b border-line pb-6 md:flex-row md:items-end md:justify-between print:border-black/20">
            <div className="flex items-center gap-5">
              <Image src="/ruhul-amin.jpg" alt="" width={88} height={110} className="h-[110px] w-[88px] rounded-xl object-cover object-top" priority />
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-ink print:text-black">{resume.name}</h1>
                <p className="mt-1 text-lg text-ink-2 print:text-black/70">{resume.title}</p>
              </div>
            </div>
            <ul className="text-sm text-ink-2 md:text-right print:text-black/70">
              <li>{resume.location}</li>
              <li><a href={`mailto:${resume.email}`} className="hover:text-ink">{resume.email}</a> · {resume.phone}</li>
              <li><a href={`https://${resume.site}`} className="hover:text-ink">{resume.site}</a> · <a href={`https://${resume.github}`} className="hover:text-ink">{resume.github}</a></li>
              <li><a href={`https://${resume.linkedin}`} className="hover:text-ink">{resume.linkedin}</a></li>
            </ul>
          </header>

          <section className="mt-6">
            <p className="text-[15px] leading-relaxed text-ink-2 print:text-black/80">{resume.summary}</p>
          </section>

          <section className="mt-8">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3 print:text-black/50">Experience</h2>
            {resume.experience.map((e) => (
              <div key={e.org + e.period} className="cv-row mt-5 grid gap-2 md:grid-cols-[150px_1fr]">
                <div className="text-sm text-ink-3 print:text-black/50">
                  <p>{e.period}</p>
                  <p>{e.where}</p>
                </div>
                <div>
                  <p className="font-semibold text-ink print:text-black">{e.role} · {e.org}</p>
                  <ul className="mt-2 space-y-1.5 text-[14px] leading-relaxed text-ink-2 print:text-black/80">
                    {e.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="mt-[10px] h-px w-3 shrink-0 bg-ink-3 print:bg-black/40" aria-hidden />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </section>

          <section className="mt-8">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3 print:text-black/50">Selected products</h2>
            <ul className="mt-4 grid gap-x-8 gap-y-2 text-[14px] sm:grid-cols-2">
              {featured.map((p) => (
                <li key={p.slug} className="text-ink-2 print:text-black/80">
                  <span className="font-medium text-ink print:text-black">{p.name}</span> — {p.category}, {p.year}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3 print:text-black/50">Skills</h2>
            <dl className="cv-row mt-4 grid gap-2 text-[14px] md:grid-cols-[150px_1fr]">
              {resume.skills.map((s) => (
                <div key={s.group} className="contents">
                  <dt className="text-ink-3 print:text-black/50">{s.group}</dt>
                  <dd className="text-ink-2 print:text-black/80">{s.items}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-8">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3 print:text-black/50">Languages</h2>
            <p className="mt-3 text-[14px] text-ink-2 print:text-black/80">{resume.languages}</p>
          </section>

          <section className="mt-8">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3 print:text-black/50">Education</h2>
            <ul className="mt-4 space-y-3 text-[14px]">
              {resume.education.map((e) => (
                <li key={e.school} className="cv-row grid gap-1 md:grid-cols-[150px_1fr]">
                  <span className="text-ink-3 print:text-black/50">{e.period}</span>
                  <span>
                    <span className="font-medium text-ink print:text-black">{e.award}</span>
                    <span className="text-ink-2 print:text-black/70"> — {e.school}</span>
                  </span>
                </li>
              ))}
            </ul>
            <ul className="mt-4 space-y-1 text-[14px]">
              {resume.certifications.map((c) => (
                <li key={c.name} className="cv-row grid gap-1 md:grid-cols-[150px_1fr]">
                  <span className="text-ink-3 print:text-black/50">{c.year}</span>
                  <span className="text-ink-2 print:text-black/80"><span className="font-medium text-ink print:text-black">{c.name}</span> — {c.issuer}</span>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </Container>
    </div>
  );
}
