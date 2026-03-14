"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useSkills } from "@/Tanstack/Skills/useSkills";
import { ISkill } from "@/app/api/_models/SkillModel";
import Title from "@/components/Shared/Title";

// ─── Hex Geometry (pointy-top tessellation) ───────────────────────────────────
const W = 82;
const H = 94;
const R = 39;
const ROW_STEP = H * 1;
const COL_STEP = W - 1;

function hexPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30);
    return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  }).join(" ");
}
const HEX_PTS = hexPoints(W / 2, H / 2, R);

// ─── Hex alpha helper ─────────────────────────────────────────────────────────
// Converts a hex color to rgba with given opacity — used for the outer glow
function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return `rgba(220,38,38,${alpha})`;
  return `rgba(${r},${g},${b},${alpha})`;
}

// ─── Single Hex Cell ──────────────────────────────────────────────────────────
function HexCell({ skill }: { skill: ISkill }) {
  const glow = skill.color || "#dc2626";
  const glowAlpha = hexToRgba(glow, 0.22);
  const cls = `hx-${skill._id}`;

  // Black SVG icons need invert to be visible on dark bg
  const needsInvert =
    skill.name.toLowerCase().includes("next") ||
    skill.name.toLowerCase().includes("express");

  return (
    <div
      className={`group ${cls}`}
      style={{ width: W, height: H, position: "absolute", cursor: "default" }}
    >
      <style>{`
        .${cls}:hover svg.hex-svg {
          filter: drop-shadow(0 0 10px ${glow}) drop-shadow(0 0 22px ${glowAlpha});
        }
        .${cls}:hover .hpoly {
          fill: ${glow}16;
          stroke: ${glow};
          stroke-width: 1.5px;
        }
      `}</style>

      {/* Hexagon border */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        className="hex-svg"
        style={{
          display: "block",
          transition: "filter 0.35s ease",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <polygon
          points={HEX_PTS}
          fill="rgba(255,255,255,0.022)"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
          className="hpoly"
          style={{ transition: "fill 0.35s, stroke 0.35s" }}
        />
      </svg>

      {/* Icon */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ paddingBottom: 4 }}
      >
        {/* glow blob behind icon */}
        <div
          className="absolute w-8 h-8 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"
          style={{ background: glow }}
        />
        <Image
          src={skill.iconURL}
          alt={skill.name}
          width={38}
          height={38}
          unoptimized
          className={`relative transition-transform duration-300 group-hover:scale-110 select-none ${needsInvert ? "invert" : ""
            }`}
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Hover name tooltip — pill style matching Skill section */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
        style={{ transition: "opacity 0.2s", zIndex: 5 }}
      >
        <span
          className="font-mono font-bold"
          style={{
            fontSize: "9px",
            letterSpacing: "0.08em",
            color: "#fff",
            background: "rgba(12,10,9,0.92)",
            border: "1px solid rgba(220,38,38,0.45)",
            padding: "3px 10px",
            borderRadius: "9999px",
            whiteSpace: "nowrap",
            boxShadow: "0 0 14px rgba(220,38,38,0.25)",
            backdropFilter: "blur(4px)",
          }}
        >
          {skill.name}
        </span>
      </div>
    </div>
  );
}

// ─── Hex Skeleton (loading state) ────────────────────────────────────────────
function HexSkeleton({ x, y }: { x: number; y: number }) {
  return (
    <div style={{ position: "absolute", left: x, top: y, width: W, height: H }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        style={{ display: "block" }}
      >
        <polygon
          points={HEX_PTS}
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
          className="animate-pulse"
        />
      </svg>
    </div>
  );
}

// ─── TechStack Section ────────────────────────────────────────────────────────
const TechStack = () => {
  const containerRef = useRef(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  const { data: skills, isLoading } = useSkills();

  // Filter visible, sort by order field ascending
  const visibleSkills: ISkill[] = (skills ?? [])
    .filter((s: ISkill) => s.visible)
    .sort((a: ISkill, b: ISkill) => (a.order ?? 0) - (b.order ?? 0));

  // Repeat 4× for seamless infinite scroll
  const repeated: ISkill[] = Array.from({ length: 4 }, () => visibleSkills).flat();

  // Pair into columns of 2 for honeycomb offset layout
  const pairs: [ISkill, ISkill][] = [];
  for (let i = 0; i < repeated.length; i += 2) {
    pairs.push([repeated[i], repeated[(i + 1) % repeated.length]]);
  }

  const totalW = pairs.length * COL_STEP + W;
  const gridH = Math.round(H + ROW_STEP + H * 0.5 + 16);
  const halfW = Math.round(totalW / 2);

  // Skeleton grid dimensions (same as live grid)
  const SKELETON_COLS = 20;

  return (
    <section
      id="tech-stack"
      className="bg-[#0c0a09] shadow-[0px_0px_65px_65px_#0c0a09] relative py-24 w-full overflow-hidden"
      ref={containerRef}
    >
      {/* Keyframe injected once */}
      <style>{`
        @keyframes techMarch {
          from { transform: translateX(0); }
          to   { transform: translateX(-${halfW}px); }
        }
      `}</style>

      {/* Ambient blobs — identical to Skill section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/4 left-1/3 w-96 h-96 rounded-full bg-red-600/5 filter blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-blue-600/5 filter blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <Title
        eyebrow="tools & technologies"
        title="TECH STACK"
        highlight="STACK"
        description="Technologies I use to build fast, scalable, and production-ready full-stack applications"
      />



      {/* ── Honeycomb Marquee — full bleed ── */}
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* Fade masks — exactly matches section bg */}
        <div
          className="pointer-events-none absolute top-0 bottom-0 left-0 z-10"
          style={{
            width: 160,
            background: "linear-gradient(90deg, #0c0a09 20%, transparent)",
          }}
        />
        <div
          className="pointer-events-none absolute top-0 bottom-0 right-0 z-10"
          style={{
            width: 160,
            background: "linear-gradient(-90deg, #0c0a09 20%, transparent)",
          }}
        />

        {/* Loading skeleton */}
        {isLoading && (
          <div
            style={{
              position: "relative",
              width: "100%",
              height: gridH,
              overflow: "hidden",
            }}
          >
            {Array.from({ length: SKELETON_COLS }, (_, ci) => {
              const isOdd = ci % 2 === 1;
              const x = ci * COL_STEP;
              return [0, 1].map((ri) => {
                const y = isOdd
                  ? Math.round(H * 0.5 + ri * ROW_STEP)
                  : ri * ROW_STEP;
                return (
                  <HexSkeleton key={`sk-${ci}-${ri}`} x={x} y={y} />
                );
              });
            })}
          </div>
        )}

        {/* Live honeycomb track */}
        {!isLoading && visibleSkills.length > 0 && (
          <div
            ref={trackRef}
            style={{
              position: "relative",
              width: totalW,
              height: gridH,
              animation: "techMarch 50s linear infinite",
            }}
            onMouseEnter={() => {
              if (trackRef.current)
                trackRef.current.style.animationPlayState = "paused";
            }}
            onMouseLeave={() => {
              if (trackRef.current)
                trackRef.current.style.animationPlayState = "running";
            }}
          >
            {pairs.map((pair, ci) => {
              const isOdd = ci % 2 === 1;
              const x = ci * COL_STEP;
              return pair.map((skill, ri) => {
                const y = isOdd
                  ? Math.round(H * 0.5 + ri * ROW_STEP)
                  : ri * ROW_STEP;
                return (
                  <div
                    key={`${ci}-${ri}-${skill._id}`}
                    style={{ position: "absolute", left: x, top: y }}
                  >
                    <HexCell skill={skill} />
                  </div>
                );
              });
            })}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default TechStack;