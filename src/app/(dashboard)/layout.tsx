import { ClerkProvider } from "@clerk/nextjs";

// Admin surface only (dashboard, sign-in, unauthorized). Keeping ClerkProvider
// here means the public site never ships the Clerk SDK. These pages sit behind
// auth and must render per request, never be prerendered at build time.
export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
