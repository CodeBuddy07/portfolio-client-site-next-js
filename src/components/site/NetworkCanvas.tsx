"use client";

import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; born: number };

const LINK = 120;
const ATTRACT = 200;
const MAX = 180;

/**
 * A hand-written constellation: points drift, link when near, lean toward the
 * cursor, and a click on empty hero space spawns a burst. Pauses when the hero
 * is off-screen or the tab is hidden; draws one static frame under
 * prefers-reduced-motion. ~3 kB, no dependencies.
 */
export function NetworkCanvas({ hostRef }: { hostRef: React.RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    let w = 0, h = 0, dpr = 1;
    let pts: P[] = [];
    let mouse: { x: number; y: number } | null = null;
    let raf = 0;
    let running = false;

    const seed = () => {
      const n = Math.min(MAX, Math.round((w * h) / 16000));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        born: -1e9,
      }));
    };

    const resize = () => {
      const r = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (pts.length === 0) seed();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        if (!reduce) {
          if (mouse) {
            const dx = mouse.x - p.x, dy = mouse.y - p.y;
            const d = Math.hypot(dx, dy);
            if (d < ATTRACT && d > 1) {
              const f = (1 - d / ATTRACT) * 0.012;
              p.vx += (dx / d) * f;
              p.vy += (dy / d) * f;
            }
          }
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.995;
          p.vy *= 0.995;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
          p.x = Math.max(0, Math.min(w, p.x));
          p.y = Math.max(0, Math.min(h, p.y));
        }
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          if (Math.abs(dx) > LINK || Math.abs(dy) > LINK) continue;
          const d = Math.hypot(dx, dy);
          if (d > LINK) continue;
          ctx.strokeStyle = `rgba(255,255,255,${(1 - d / LINK) * 0.12})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      for (const p of pts) {
        const age = t - p.born;
        const fresh = age < 900 ? 1 - age / 900 : 0;
        ctx.fillStyle = fresh > 0 ? `rgba(239,68,68,${0.35 + fresh * 0.65})` : "rgba(255,255,255,0.45)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, fresh > 0 ? 1.6 + fresh * 1.4 : 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      if (!running) return;
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: MouseEvent) => {
      const r = host.getBoundingClientRect();
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => (mouse = null);
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, textarea, label")) return;
      const r = host.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const now = performance.now();
      for (let i = 0; i < 10; i++) {
        const ang = (i / 10) * Math.PI * 2 + Math.random() * 0.4;
        const sp = 0.8 + Math.random() * 1.2;
        pts.push({ x, y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, born: now });
      }
      if (pts.length > MAX) pts.splice(0, pts.length - MAX);
      if (reduce) draw(now);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver(([en]) => (en.isIntersecting ? start() : stop()), { threshold: 0.05 });
    io.observe(host);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    if (fine) {
      host.addEventListener("mousemove", onMove, { passive: true });
      host.addEventListener("mouseleave", onLeave);
    }
    host.addEventListener("click", onClick);
    if (reduce) draw(0);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      host.removeEventListener("mousemove", onMove);
      host.removeEventListener("mouseleave", onLeave);
      host.removeEventListener("click", onClick);
    };
  }, [hostRef]);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0" />;
}
