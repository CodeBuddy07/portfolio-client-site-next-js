"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { System } from "@/content/systems";
import { cn } from "@/lib/utils";

const NODE_H = 88;

export function SystemDiagram({ system }: { system: System }) {
  const [active, setActive] = useState(system.nodes[0].id);
  const reduce = useReducedMotion();
  const node = system.nodes.find((n) => n.id === active)!;
  const byId = Object.fromEntries(system.nodes.map((n) => [n.id, n]));
  // Fit the viewBox to the nodes with a small margin so the drawing fills its column.
  const PAD = 24;
  const minX = Math.min(...system.nodes.map((n) => n.x)) - PAD;
  const minY = Math.min(...system.nodes.map((n) => n.y)) - PAD;
  const maxX = Math.max(...system.nodes.map((n) => n.x + (n.w ?? 260))) + PAD;
  const maxY = Math.max(...system.nodes.map((n) => n.y + NODE_H)) + PAD;
  const vb = `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;

  const edgePath = (from: string, to: string) => {
    const a = byId[from];
    const b = byId[to];
    const aw = a.w ?? 260;
    const bw = b.w ?? 260;
    const sameRow = Math.abs(a.y - b.y) < 10;
    if (sameRow) {
      const x1 = a.x + aw, y1 = a.y + NODE_H / 2, x2 = b.x, y2 = b.y + NODE_H / 2;
      return { d: `M${x1} ${y1} L${x2} ${y2}`, mx: (x1 + x2) / 2, my: y1 };
    }
    const sameCol = Math.abs(a.x - b.x) < 10;
    if (sameCol) {
      const x1 = a.x + aw / 2, y1 = a.y + NODE_H, x2 = b.x + bw / 2, y2 = b.y;
      return { d: `M${x1} ${y1} L${x2} ${y2}`, mx: x1, my: (y1 + y2) / 2 };
    }
    const x1 = a.x + aw / 2, y1 = a.y + NODE_H, x2 = b.x + bw / 2, y2 = b.y;
    const cy = (y1 + y2) / 2;
    return { d: `M${x1} ${y1} C ${x1} ${cy}, ${x2} ${cy}, ${x2} ${y2}`, mx: (x1 + x2) / 2, my: cy };
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
      <div className="flex min-w-0 flex-col justify-center overflow-hidden rounded-2xl border border-line bg-surface p-4 md:p-6">
        <svg viewBox={vb} className="h-auto w-full" role="group" aria-label={system.title}>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10z" fill="#8a8a94" />
            </marker>
          </defs>
          {system.edges.map((e, i) => {
            const p = edgePath(e.from, e.to);
            const lit = active === e.from || active === e.to;
            return (
              <g key={`${e.from}-${e.to}`}>
                <motion.path
                  d={p.d}
                  fill="none"
                  stroke={lit ? "#f4f4f5" : "#5a5a63"}
                  strokeWidth={lit ? 2.5 : 1.5}
                  markerEnd="url(#arrow)"
                  initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                />
                {e.label && (
                  <g>
                    <rect x={p.mx - 96} y={p.my - 16} width={192} height={32} rx={16} fill="#101013" stroke="rgba(255,255,255,0.1)" />
                    <text x={p.mx} y={p.my + 5} textAnchor="middle" fontSize={14} fontFamily="ui-monospace, Menlo, monospace" fill="#c4c4cc">
                      {e.label}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
          {system.nodes.map((n, i) => {
            const w = n.w ?? 260;
            const isActive = n.id === active;
            return (
              <motion.g
                key={n.id}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                aria-label={`${n.label}${n.sub ? ` — ${n.sub}` : ""}`}
                onClick={() => setActive(n.id)}
                onKeyDown={(ev) => (ev.key === "Enter" || ev.key === " ") && (ev.preventDefault(), setActive(n.id))}
                className="cursor-pointer outline-none"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <rect
                  x={n.x}
                  y={n.y}
                  width={w}
                  height={NODE_H}
                  rx={18}
                  fill={isActive ? "#1c1c21" : "#17171b"}
                  stroke={isActive ? "#ef4444" : n.accent ? "rgba(239,68,68,0.45)" : "rgba(255,255,255,0.14)"}
                  strokeWidth={isActive ? 2.5 : 1.5}
                />
                <text x={n.x + w / 2} y={n.y + (n.sub ? 40 : 52)} textAnchor="middle" fontSize={24} fontWeight={600} fontFamily="ui-sans-serif, system-ui" fill="#f4f4f5">
                  {n.label}
                </text>
                {n.sub && (
                  <text x={n.x + w / 2} y={n.y + 66} textAnchor="middle" fontSize={15} fontFamily="ui-monospace, Menlo, monospace" fill="#8a8a94">
                    {n.sub}
                  </text>
                )}
              </motion.g>
            );
          })}
        </svg>
        <div className="mt-4 flex flex-wrap gap-2 lg:hidden">
          {system.nodes.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => setActive(n.id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs transition-colors",
                n.id === active ? "border-signal text-ink" : "border-line text-ink-2 hover:border-line-strong"
              )}
            >
              {n.label}
            </button>
          ))}
        </div>
      </div>

      <div className="min-w-0 rounded-2xl border border-line bg-surface p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={node.id}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-signal">{node.label}</p>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-ink">{node.detail.heading}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{node.detail.body}</p>
            {node.detail.code && (
              <pre className="mt-5 overflow-x-auto rounded-xl border border-line bg-canvas p-4 font-mono text-[12.5px] leading-relaxed text-ink-2">
                <code>{node.detail.code}</code>
              </pre>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
