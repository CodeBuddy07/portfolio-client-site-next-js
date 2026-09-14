import Link from "next/link";

export default function NotFound() {
  return (
    <div className="site flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3">404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink">That page doesn&apos;t exist.</h1>
      <Link href="/" className="mt-8 inline-flex h-11 items-center rounded-full bg-ink px-5 text-sm font-medium text-canvas hover:bg-white">
        Back home
      </Link>
    </div>
  );
}
