"use client";

import React, { useRef } from "react";
import { DATA } from "@/data/resume";
import { DiwaliCrackers } from "@/components/diwali-crackers";

export function FooterSignature() {
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const fullName = "Ritik Singh";

  return (
    <footer className="relative left-1/2 -translate-x-1/2 w-screen max-w-[100vw] overflow-hidden select-none cursor-default mt-6 sm:mt-10 pt-4 pb-6 sm:pb-10 text-center">
      {/* Subtle festive Diwali indicator pill */}
      <div className="relative z-10 flex items-center justify-center gap-2 mb-2 sm:mb-3">
        <span className="text-amber-500/80 text-[11px] sm:text-xs">🪔</span>
        <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.28em] text-amber-500/70 dark:text-amber-400/80 uppercase font-medium">
          Shubh Deepawali
        </span>
        <span className="text-amber-500/80 text-[11px] sm:text-xs">✨</span>
      </div>

      {/* Giant Editorial Serif Signature matching reference image */}
      <div className="relative z-10 w-full flex justify-center items-center">
        <h1
          ref={nameRef}
          className="group relative inline-block font-serif font-light text-[13.5vw] sm:text-[13vw] md:text-[12.5vw] lg:text-[11.5vw] tracking-[-0.04em] leading-[0.88] whitespace-nowrap select-none cursor-pointer"
        >
          {/* Base Layer: Subtle signature in default quiet translucent tone */}
          <span className="bg-gradient-to-b from-foreground/[0.18] via-foreground/[0.10] to-foreground/[0.02] dark:from-white/[0.18] dark:via-white/[0.09] dark:to-white/[0.02] bg-clip-text text-transparent inline-block">
            {fullName}
          </span>

          {/* Smooth Festive Glow Layer: Fades in/out with 700ms luxurious ease and smooth wave */}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-300 via-rose-500 to-amber-500 dark:from-amber-400 dark:via-yellow-300 dark:via-orange-400 dark:to-amber-400 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out pointer-events-none inline-block animate-diwali-shimmer drop-shadow-[0_0_24px_rgba(245,158,11,0.22)]"
          >
            {fullName}
          </span>

          {/* Diwali Crackers Canvas: Attached exclusively to the Ritik Singh characters */}
          <DiwaliCrackers targetRef={nameRef} />
        </h1>
      </div>

      {/* Footer Navigation Links: Direct External URLs opened in New Tab */}
      <nav aria-label="Quick Links" className="relative z-10 mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-mono text-muted-foreground/80">
        <a
          href={DATA.contact.social.GitHub.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500 transition-colors"
        >
          GitHub
        </a>
        <span className="text-muted-foreground/40">·</span>
        <a
          href={DATA.contact.social.LinkedIn.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500 transition-colors"
        >
          LinkedIn
        </a>
        <span className="text-muted-foreground/40">·</span>
        <a
          href={DATA.contact.social.WhatsApp.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500 transition-colors"
        >
          Book a Call
        </a>
        <span className="text-muted-foreground/40">·</span>
        <button
          type="button"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("open-ai-chat"));
            }
          }}
          className="hover:text-blue-500 transition-colors cursor-pointer"
        >
          Talk with AI Assistant
        </button>
      </nav>

      {/* Subtle minimal copyright tagline */}
      <p className="mt-2.5 sm:mt-3 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-muted-foreground/40 uppercase">
        © {new Date().getFullYear()} {fullName} · CRAFTED WITH PASSION
      </p>
    </footer>
  );
}
