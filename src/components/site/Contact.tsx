"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { site } from "@/content/site";
import { useCreateEmail } from "@/Tanstack/Emails/useCreateEmail";
import { ArrowIcon, Button, Section } from "./primitives";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Please tell me your name."),
  email: z.string().email("That email doesn't look right."),
  message: z.string().min(20, "A couple of sentences helps me reply usefully."),
});
type Values = z.infer<typeof schema>;

const field =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-[15px] text-ink placeholder:text-ink-3 transition-colors focus:border-line-strong focus:outline-none focus:ring-2 focus:ring-signal/40";

export function Contact() {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "" },
  });
  const { mutate, isPending } = useCreateEmail();

  const onSubmit = (values: Values) => {
    mutate(values, {
      onSuccess: () => {
        toast.success("Got it — I'll reply within 24 hours.");
        form.reset();
      },
      onError: () => toast.error("That didn't send. Email me directly instead."),
    });
  };

  const err = form.formState.errors;

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Tell me what's broken, or what you want to build."
      lede="Two or three sentences is enough. I reply within 24 hours with a straight answer — including whether I'm the right person for it."
    >
      <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-16">
        <div className="space-y-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3">Email</p>
            <a href={`mailto:${site.email}`} className="mt-2 block text-lg text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
              {site.email}
            </a>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3">Elsewhere</p>
            <ul className="mt-2 flex flex-col gap-2 text-[15px]">
              <li><a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="text-ink-2 hover:text-ink">WhatsApp</a></li>
              <li><a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-ink-2 hover:text-ink">LinkedIn</a></li>
              <li><a href={site.socials.github} target="_blank" rel="noopener noreferrer" className="text-ink-2 hover:text-ink">GitHub</a></li>
              <li><a href={site.socials.upwork} target="_blank" rel="noopener noreferrer" className="text-ink-2 hover:text-ink">Upwork</a></li>
            </ul>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-5 text-sm leading-relaxed text-ink-2">
            <p className="text-ink">How a first conversation usually goes</p>
            <p className="mt-2">
              You describe the product or the problem. I ask a few questions, look at whatever you can share — a URL, a
              repo, a screenshot — and come back with what I&apos;d do, roughly how long it takes, and what it costs.
              No pitch deck.
            </p>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm text-ink-2">Name</span>
              <input {...form.register("name")} className={cn(field, err.name && "border-signal")} placeholder="Your name" autoComplete="name" />
              {err.name && <span className="text-xs text-signal">{err.name.message}</span>}
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm text-ink-2">Email</span>
              <input {...form.register("email")} type="email" className={cn(field, err.email && "border-signal")} placeholder="you@company.com" autoComplete="email" />
              {err.email && <span className="text-xs text-signal">{err.email.message}</span>}
            </label>
          </div>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm text-ink-2">What are you working on?</span>
            <textarea
              {...form.register("message")}
              rows={6}
              className={cn(field, "resize-y", err.message && "border-signal")}
              placeholder="What it is, what's wrong or what you need, and any link I can look at."
            />
            {err.message && <span className="text-xs text-signal">{err.message.message}</span>}
          </label>
          <div className="flex items-center justify-between gap-4 pt-2">
            <p className="text-xs text-ink-3">{site.responseTime}.</p>
            <Button type="submit" size="lg" disabled={isPending}>
              {isPending ? "Sending…" : "Send message"} <ArrowIcon />
            </Button>
          </div>
        </form>
      </div>
    </Section>
  );
}
