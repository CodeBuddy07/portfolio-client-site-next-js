"use client";

import { useRef, type ReactNode } from "react";
import { NetworkCanvas } from "./NetworkCanvas";

/** Hero wrapper that owns the canvas host ref; content renders above it. */
export function HeroShell({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  return (
    <section ref={ref} className={className}>
      <div className="grid-dots pointer-events-none absolute inset-0" aria-hidden />
      <NetworkCanvas hostRef={ref} />
      {children}
    </section>
  );
}
