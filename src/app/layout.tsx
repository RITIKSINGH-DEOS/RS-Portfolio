import Navbar from "@/components/navbar";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { DottedCanvas } from "@/components/dotted-canvas";
import { ShootingStars } from "@/components/shooting-stars";
import { ThemeProvider } from "@/components/theme-provider";
import { TopNav } from "@/components/top-nav";
import { RoundedCanvasFrame } from "@/components/rounded-canvas-frame";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter as FontSans, Fraunces as FontSerif } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

import { SpiderCanvas } from "@/components/spider-canvas";
import { ClickShockwave } from "@/components/click-shockwave";

const AIChatbot = dynamic(
  () => import("@/components/ai-chatbot").then((mod) => mod.AIChatbot),
  { ssr: false }
);

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontSerif = FontSerif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const fontGreatVibes = localFont({
  src: "../fonts/GreatVibes-Regular.ttf",
  variable: "--font-great-vibes",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: "Ritik Singh - Full Stack AI Engineer",
    template: `%s | Ritik Singh`,
  },
  description: DATA.description,
  keywords: [
    "Ritik Singh",
    "Ritik Singh Portfolio",
    "Ritik Singh AI Engineer",
    "Ritik Singh Full Stack",
    "Ritik Singh Developer",
    "Ritik Singh Lucknow",
    "Full Stack AI Engineer",
    "AI Engineer Portfolio",
  ],
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
    description: DATA.description,
    card: "summary_large_image",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${DATA.url}/#website`,
      "url": DATA.url,
      "name": "Ritik Singh",
      "alternateName": ["Ritik Singh Portfolio", "Ritik Singh AI Engineer"],
      "description": DATA.description,
      "publisher": {
        "@id": `${DATA.url}/#person`,
      },
    },
    {
      "@type": "Person",
      "@id": `${DATA.url}/#person`,
      "name": "Ritik Singh",
      "givenName": "Ritik",
      "familyName": "Singh",
      "url": DATA.url,
      "jobTitle": "Full Stack AI Engineer",
      "sameAs": [
        DATA.contact.social.GitHub.url,
        DATA.contact.social.LinkedIn.url,
        DATA.contact.social.WhatsApp.url,
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${DATA.url}/#sitelinks`,
      "name": "Site Navigation",
      "itemListElement": [
        {
          "@type": "SiteNavigationElement",
          "position": 1,
          "name": "GitHub",
          "description": "Explore Ritik Singh's open-source projects, repositories, and technical contributions.",
          "url": `${DATA.url}/github`,
        },
        {
          "@type": "SiteNavigationElement",
          "position": 2,
          "name": "LinkedIn",
          "description": "Connect with Ritik Singh on LinkedIn. View work experience, skills, and career recommendations.",
          "url": `${DATA.url}/linkedin`,
        },
        {
          "@type": "SiteNavigationElement",
          "position": 3,
          "name": "Book a Call",
          "description": "Schedule a 1-on-1 call or chat with Ritik Singh for projects, hiring, and technical consultations.",
          "url": `${DATA.url}/book-a-call`,
        },
        {
          "@type": "SiteNavigationElement",
          "position": 4,
          "name": "Talk with AI Assistant",
          "description": "Chat live with Ritik Singh's personal AI Assistant powered by Google Gemini to explore projects, skills, and background.",
          "url": `${DATA.url}/talk-with-ai`,
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-clip">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={cn(
          "min-h-screen bg-background font-sans antialiased pt-20 sm:pt-24 pb-24 sm:pb-32 overflow-x-clip",
          fontSans.variable,
          fontSerif.variable,
          fontGreatVibes.variable
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
              <AIChatbot />
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
