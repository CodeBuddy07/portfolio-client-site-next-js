import { site } from "@/content/site";
import { ArrowIcon, ButtonLink, Container } from "./primitives";
import { Magnetic, Reveal } from "@/components/motion";

export function CTA({ title = "Have a product to build, or one that needs to work better?", body }: { title?: string; body?: string }) {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <Container>
        <Reveal className="rounded-3xl border border-line bg-surface p-10 md:p-16">
          <div className="grid items-end gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-[2.5rem] md:leading-[1.1]">{title}</h2>
              <p className="mt-4 max-w-xl text-lg text-ink-2">
                {body ?? `Two or three sentences is enough. I'll come back with what I'd do, how long it takes and what it costs.`}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Magnetic>
                <ButtonLink href="/contact" size="lg">
                  Start a conversation <ArrowIcon />
                </ButtonLink>
              </Magnetic>
              <ButtonLink href={`mailto:${site.email}`} variant="secondary" size="lg">
                Email me
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
