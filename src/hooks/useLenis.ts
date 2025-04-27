"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export const useLenis = () => {
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.05, // more smooth, more bouncy
            touchMultiplier: 3,
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            // ❌ NO direction
            // ❌ NO gestureDirection
        });

        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);
};
