"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const A4_W = 794; // 210mm at 96dpi

/**
 * Renders children at true A4 width and scales the whole stack of sheets to
 * fit its container on screen. In print the scale is removed and each sheet
 * maps to exactly one page (see globals.css @media print).
 */
export function PaperScaler({ children }: { children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [h, setH] = useState(0);
  useEffect(() => {
    const o = outer.current, i = inner.current;
    if (!o || !i) return;
    const measure = () => {
      const s = Math.min(1, o.clientWidth / A4_W);
      setScale(s);
      setH(i.offsetHeight * s);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(o);
    ro.observe(i);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={outer} className="paper-scaler w-full" style={{ height: h || undefined }}>
      <div ref={inner} className="paper-scaled origin-top-left" style={{ transform: `scale(${scale})`, width: A4_W }}>
        {children}
      </div>
    </div>
  );
}

export function Sheet({ children, page, total }: { children: ReactNode; page: number; total: number }) {
  return (
    <section className="sheet" aria-label={`Page ${page} of ${total}`}>
      {children}
      {total > 1 && <span className="sheet-foot">Ruhul Amin · Page {page} of {total}</span>}
    </section>
  );
}
