import Navbar from "@/components/navbar";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { DottedCanvas } from "@/components/dotted-canvas";
import { ShootingStars } from "@/components/shooting-stars";
import { SpiderCanvas } from "@/components/spider-canvas";
import { ThemeProvider } from "@/components/theme-provider";
import { TopNav } from "@/components/top-nav";
import { ClickShockwave } from "@/components/click-shockwave";
import { RoundedCanvasFrame } from "@/components/rounded-canvas-frame";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans, Fraunces as FontSerif } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = FontSerif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: "Ritik Singh - Full Stack AI Engineer",
    template: `%s | Ritik Singh`,
  },
  description: DATA.description,
  icons: {
    icon: [
      { url: "/me.png", sizes: "any" },
      { url: "/me.png", type: "image/png" },
    ],
    shortcut: "/me.png",
    apple: "/me.png",
  },
  openGraph: {
    title: "Ritik Singh - Full Stack AI Engineer",
    description: DATA.description,
    url: DATA.url,
    siteName: "Ritik Singh",
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
    title: "Ritik Singh - Full Stack AI Engineer",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-clip">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased pt-20 sm:pt-24 pb-24 sm:pb-32 overflow-x-clip",
          fontSans.variable,
          fontSerif.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange={true}>
          <TooltipProvider delayDuration={0}>
            <SmoothScrollProvider>
              <DottedCanvas />
              <ShootingStars />
              <TopNav />
              <div className="relative z-10 w-full max-w-2xl mx-auto px-6">
                {children}
              </div>
              <Navbar />
              <ScrollToTop />
              <SpiderCanvas />
              <ClickShockwave />
              <RoundedCanvasFrame />
            </SmoothScrollProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
