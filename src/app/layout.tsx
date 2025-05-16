import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/Providers/Theme-Provider";
import { ParallaxProviders } from "@/Providers/Parallax-Provider";
import { Saira } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { TanstackQueryProvider } from "@/Providers/TanstackQueryProvider";


const saira = Saira({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});



export const metadata: Metadata = {
  title: "Ruhul Amin",
  description: "Hey there! I'm Ruhul Amin, a passionate web developer with a knack for building fast, modern, and user-friendly web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
  <head>
    <title>Ruhul Amin — Full Stack Developer | ruhulcodes.com</title>

    {/* <!-- Favicon + Apple Icons --> */}
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="theme-color" content="#ffffff" />

    {/* <!-- SEO Meta --> */}
    <meta name="description" content="Ruhul Amin — Full Stack Developer from Dhaka. I build powerful apps with React, Next.js, Node.js & MongoDB." />
    <meta name="keywords" content="Ruhul Amin, Full Stack Developer, React, Next.js, MongoDB, Dhaka Developer, Portfolio" />
    <meta name="author" content="Ruhul Amin" />
    <meta name="robots" content="index, follow" />

    {/* <!-- Open Graph (Facebook, LinkedIn) --> */}
    <meta property="og:title" content="Ruhul Amin — Full Stack Web Developer" />
    <meta property="og:description" content="Check out my portfolio and projects at ruhulcodes.com" />
    <meta property="og:url" content="https://ruhulcodes.com" />
    <meta property="og:image" content="https://ruhulcodes.com/og-image.png" />
    <meta property="og:type" content="website" />

    {/* <!-- Twitter Card --> */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Ruhul Amin — Full Stack Web Developer" />
    <meta name="twitter:description" content="Visit my portfolio: ruhulcodes.com" />
    <meta name="twitter:image" content="https://ruhulcodes.com/og-image.png" />
    
    {/* <!-- Structured Data --> */}
    <script type="application/ld+json">
    {`
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Ruhul Amin",
        "url": "https://ruhulcodes.com",
        "sameAs": [
          "https://github.com/CodeBuddy07",
          "https://linkedin.com/in/codebuddy07",
          "https://www.facebook.com/codebuddy07"
        ],
        "jobTitle": "Full Stack Web Developer",
        "worksFor": {
          "@type": "Organization",
          "name": "ruhulcodes.com"
        },
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "Dhaka Polytechnic Institute"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Moghbazar",
          "addressRegion": "Dhaka",
          "addressCountry": "BD"
        }
      }
    `}
    </script>
  </head>

  <body suppressHydrationWarning className={`${saira.className} antialiased`}>
    <ClerkProvider>
      <TanstackQueryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ParallaxProviders>
            {children}
            <Toaster richColors position="top-center" />
          </ParallaxProviders>
        </ThemeProvider>
        {/* Optional: React Query Devtools */}
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </TanstackQueryProvider>
    </ClerkProvider>
  </body>
</html>

  );
}
