import Image from "next/image";
import { person, resumeDoc, cvDoc, education, certifications, languages, type Role } from "@/content/documents";
import { Sheet } from "./Paper";

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="doc-h">{children}</h2>;
}

function Header({ withPhoto }: { withPhoto: boolean }) {
  return (
    <header className="doc-header">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="doc-name">{person.name}</h1>
          <p className="doc-title">{person.title}</p>
          <p className="doc-contact">
            {person.location} · {person.email} · {person.phone}
          </p>
          <p className="doc-contact">
            {person.site} · {person.github} · {person.linkedin}
          </p>
        </div>
        {withPhoto && (
          <Image src={person.photo} alt="" width={96} height={120} className="doc-photo" priority />
        )}
      </div>
    </header>
  );
}

function RoleBlock({ r, compact = false }: { r: Role; compact?: boolean }) {
  return (
    <div className="doc-role">
      <div className="doc-role-meta">
        <span>{r.period}</span>
        <span>{r.where}</span>
      </div>
      <div>
        <p className="doc-role-title">
          {r.role} <span className="doc-role-org">· {r.org}</span>
        </p>
        <ul className={compact ? "doc-list compact" : "doc-list"}>
          {r.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SkillsBlock({ items }: { items: { group: string; items: string }[] }) {
  return (
    <dl className="doc-skills">
      {items.map((s) => (
        <div key={s.group} className="doc-skill-row">
          <dt>{s.group}</dt>
          <dd>{s.items}</dd>
        </div>
      ))}
    </dl>
  );
}

function EducationBlock({ short = false }: { short?: boolean }) {
  return (
    <ul className="doc-edu">
      {(short ? education.slice(0, 2) : education).map((e) => (
        <li key={e.school} className="doc-edu-row">
          <span>{e.period}</span>
          <span>
            <b>{e.award}</b> — {e.school}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** One page. No photo (ATS- and US-safe). */
export function ResumeDocument() {
  return (
    <Sheet page={1} total={1}>
      <div className="doc doc-resume">
        <Header withPhoto={false} />
        <p className="doc-summary">{resumeDoc.summary}</p>

        <H>Experience</H>
        {resumeDoc.experience.map((r) => (
          <RoleBlock key={r.org} r={r} compact />
        ))}

        <H>Selected products</H>
        <ul className="doc-products">
          {resumeDoc.products.map(([n, d, y]) => (
            <li key={n}>
              <b>{n}</b> — {d} <span className="doc-muted">({y})</span>
            </li>
          ))}
        </ul>

        <H>Skills</H>
        <SkillsBlock items={resumeDoc.skills} />

        <div className="doc-two">
          <div>
            <H>Education</H>
            <EducationBlock short />
          </div>
          <div>
            <H>Certifications &amp; languages</H>
            <ul className="doc-edu">
              {certifications.map((c) => (
                <li key={c.name} className="doc-edu-row">
                  <span>{c.year}</span>
                  <span>
                    <b>{c.name}</b> — {c.issuer}
                  </span>
                </li>
              ))}
              <li className="doc-edu-row">
                <span>Languages</span>
                <span>{languages}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Sheet>
  );
}

/** Two pages. Photo on page one (expected in Bangladesh and the EU). */
export function CVDocument() {
  const [codemines, sparktech, independent, alphaMedia] = cvDoc.experience;
  return (
    <>
      <Sheet page={1} total={2}>
        <div className="doc doc-cv">
          <Header withPhoto />
          <p className="doc-summary">{cvDoc.summary}</p>
          <H>Experience</H>
          <RoleBlock r={codemines} />
          <RoleBlock r={sparktech} />
          <RoleBlock r={independent} />
          <RoleBlock r={alphaMedia} />
        </div>
      </Sheet>
      <Sheet page={2} total={2}>
        <div className="doc doc-cv">
          <H>Selected products</H>
          <ul className="doc-products cv">
            {cvDoc.products.map(([n, d, y, link]) => (
              <li key={n}>
                <b>{n}</b> <span className="doc-muted">({y}{link ? ` · ${link}` : ""})</span>
                <br />
                {d}
              </li>
            ))}
          </ul>

          <H>Skills</H>
          <SkillsBlock items={cvDoc.skills} />

          <div className="doc-two">
            <div>
              <H>Education</H>
              <EducationBlock />
              <H>Certifications</H>
              <ul className="doc-edu">
                {certifications.map((c) => (
                  <li key={c.name} className="doc-edu-row">
                    <span>{c.year}</span>
                    <span>
                      <b>{c.name}</b> — {c.issuer}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <H>Languages</H>
              <p className="doc-p">{languages}</p>
              <H>References</H>
              <ul className="doc-edu">
                {cvDoc.references.map((r) => (
                  <li key={r.name} className="doc-edu-row single">
                    <span>
                      <b>{r.name}</b> — {r.title}. {r.note}.
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Sheet>
    </>
  );
}
