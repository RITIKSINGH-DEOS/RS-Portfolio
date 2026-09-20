import { DesktopSpideySides } from "@/components/desktop-spidey-sides";
import Navbar from "@/components/navbar";
import { SpiderBackground3D } from "@/components/spider-background-3d";
import { SpiderCanvas } from "@/components/spider-canvas";
import { ThemeProvider } from "@/components/theme-provider";
import { TopNav } from "@/components/top-nav";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: DATA.name,
    description: DATA.description,
    url: DATA.url,
    siteName: DATA.name,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: DATA.name,
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto pt-5 sm:pt-8 pb-24 sm:pb-32 px-6 overflow-x-hidden",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange={false}>
          <TooltipProvider delayDuration={0}>
            <SpiderBackground3D />
            <DesktopSpideySides />
            <div className="relative z-10 w-full max-w-2xl mx-auto">
              <TopNav />
              {children}
            </div>
            <Navbar />
            <SpiderCanvas />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
