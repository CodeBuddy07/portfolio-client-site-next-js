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
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
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
            {/* Optional: enable React Query Devtools in dev */}
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </TanstackQueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
