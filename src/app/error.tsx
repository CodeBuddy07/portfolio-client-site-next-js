"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="site flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3">Something broke</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink">That page didn&apos;t render.</h1>
      <p className="mt-3 max-w-md text-sm text-ink-2">It&apos;s logged. Try again, or head back home.</p>
      <div className="mt-8 flex gap-3">
        <button onClick={reset} className="inline-flex h-11 items-center rounded-full bg-ink px-5 text-sm font-medium text-canvas hover:bg-white">
          Try again
        </button>
        <Link href="/" className="inline-flex h-11 items-center rounded-full border border-line-strong px-5 text-sm text-ink hover:bg-surface-2">
          Home
        </Link>
      </div>
    </div>
  );
}
