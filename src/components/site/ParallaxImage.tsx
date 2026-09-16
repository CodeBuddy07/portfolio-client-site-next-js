"use client";

import { useRef } from "react";
import Image, { type ImageProps } from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/** next/image that drifts a few percent as it scrolls through the viewport. */
export function ParallaxImage({ className, amount = 8, alt, fit = "cover", ...img }: ImageProps & { amount?: number; fit?: "cover" | "contain" }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  // amount 0 = no drift and no overscan, so exact-ratio artwork (the architecture diagrams) is never cropped.
  const still = amount === 0;
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={reduce || still ? undefined : { y }} className={still ? "absolute inset-0" : "absolute inset-[-10%]"}>
        <Image {...img} alt={alt} fill className={fit === "cover" ? "object-cover object-top" : "object-contain p-[12%]"} />
      </motion.div>
    </div>
  );
}
