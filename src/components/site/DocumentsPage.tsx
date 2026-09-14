import Link from "next/link";
import { files } from "@/content/documents";
import { ArrowIcon, ButtonLink, Container, Eyebrow } from "./primitives";
import { PaperScaler } from "./Paper";
import { CVDocument, ResumeDocument } from "./Documents";
import { cn } from "@/lib/utils";

export function DocumentsPage({ doc }: { doc: "resume" | "cv" }) {
  return (
    <div className="pt-28 pb-24 md:pt-36 md:pb-32 print:pt-0 print:pb-0">
      <Container className="max-w-[860px]">
        <div className="doc-toolbar mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <div>
            <Eyebrow>Documents</Eyebrow>
            <div className="mt-3 inline-flex rounded-full border border-line bg-surface p-1" role="tablist">
              <Link href="/resume" role="tab" aria-selected={doc === "resume"} className={cn("rounded-full px-4 py-1.5 text-sm transition-colors", doc === "resume" ? "bg-ink text-canvas" : "text-ink-2 hover:text-ink")}>
                Resume · 1 page
              </Link>
              <Link href="/cv" role="tab" aria-selected={doc === "cv"} className={cn("rounded-full px-4 py-1.5 text-sm transition-colors", doc === "cv" ? "bg-ink text-canvas" : "text-ink-2 hover:text-ink")}>
                CV · 2 pages
              </Link>
            </div>
          </div>
          <ButtonLink href={doc === "resume" ? files.resume : files.cv} variant="secondary" className="h-9 px-4" external>
            Download {doc === "resume" ? "resume" : "CV"} PDF <ArrowIcon className="-rotate-45" />
          </ButtonLink>
        </div>
        <p className="mb-6 text-sm text-ink-3 print:hidden">
          {doc === "resume"
            ? "The one-page version: what a first read needs. No photo, ATS-friendly."
            : "The full record on two pages, with photo — the format expected in Bangladesh and most of Europe."}
        </p>
        <PaperScaler>{doc === "resume" ? <ResumeDocument /> : <CVDocument />}</PaperScaler>
      </Container>
    </div>
  );
}
