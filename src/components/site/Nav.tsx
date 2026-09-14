"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/content/site";
import { ButtonLink, Container } from "./primitives";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors",
        scrolled || open ? "border-b border-line bg-canvas/80 backdrop-blur-md" : "border-b border-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} — home`}>
          <Image src="/logo_white.png" alt="" width={22} height={22} priority className="h-[22px] w-auto" />
          <span className="text-sm font-semibold tracking-tight text-ink">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink-2 transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink href="/#contact" size="md" className="h-9 px-4">
            Let&apos;s talk
          </ButtonLink>
        </nav>

        <button
          type="button"
          className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {open && (
        <div id="mobile-nav" className="border-t border-line bg-canvas md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base text-ink-2 hover:bg-surface hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink href="/#contact" onClick={() => setOpen(false)} className="mt-3">
              Let&apos;s talk
            </ButtonLink>
          </Container>
        </div>
      )}
    </header>
  );
}
