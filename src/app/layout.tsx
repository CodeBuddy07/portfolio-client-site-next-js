import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { site } from "@/content/site";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Full-stack engineer`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Ruhul Amin",
    "full-stack developer",
    "Next.js developer",
    "NestJS",
    "React Native developer",
    "TypeScript",
    "PostgreSQL",
    "freelance developer",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Full-stack engineer`,
    description: site.description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Full-stack engineer`,
    description: site.description,
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased">
        {/* Scroll reveals set opacity:0 inline for motion to animate from; without JS, show everything. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
        <Toaster richColors position="top-center" theme="dark" />
      </body>
    </html>
  );
}
