"use client";

import React, { useRef, useState } from "react";
import { DATA } from "@/data/resume";
import { ArrowUpRight, Check, Copy } from "lucide-react";

export function ContactCard() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number; opacity: number }>({
    x: 0,
    y: 0,
    opacity: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(DATA.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative left-1/2 -translate-x-1/2 w-[calc(100%-20px)] max-w-[340px] sm:max-w-5xl sm:w-[90vw] md:w-[86vw] lg:w-[84vw] rounded-2xl sm:rounded-3xl md:rounded-[32px] p-6 sm:p-11 md:p-14 overflow-hidden border border-black/[0.08] dark:border-white/[0.09] bg-card/60 dark:bg-zinc-950/75 backdrop-blur-xl shadow-2xl transition-all duration-300"
    >
      {/* Spider-Man Base Ambient Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 w-[340px] sm:w-[750px] h-[180px] sm:h-[300px] bg-gradient-to-t from-red-600/30 via-red-500/10 to-transparent blur-3xl transition-opacity duration-500"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-16 w-48 sm:w-64 h-48 sm:h-64 bg-blue-600/15 blur-3xl transition-opacity duration-500"
      />

      {/* Interactive Cursor Spider-Sense Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl sm:rounded-3xl md:rounded-[32px] transition-opacity duration-300"
        style={{
          opacity: mousePos.opacity,
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(220, 38, 38, 0.16), rgba(37, 99, 235, 0.12), transparent 70%)`,
        }}
      />

      {/* Subtle Corner Tech Accents (Desktop only) */}
      <div
        aria-hidden="true"
        className="hidden sm:block pointer-events-none absolute top-3.5 left-4 text-[10px] font-mono tracking-widest text-muted-foreground/30 select-none"
      >
        + 01 // CONNECT
      </div>
      <div
        aria-hidden="true"
        className="hidden sm:block pointer-events-none absolute top-3.5 right-4 text-[10px] font-mono tracking-widest text-muted-foreground/30 select-none"
      >
        SPIDER-NET // 2026 +
      </div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-5 sm:space-y-7 max-w-4xl mx-auto pt-1">
        {/* Availability Live Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full border border-emerald-500/25 dark:border-emerald-500/35 bg-emerald-500/10 dark:bg-emerald-500/15 text-[10px] sm:text-[11px] font-mono text-emerald-600 dark:text-emerald-400 select-none shadow-sm transition-transform duration-200 hover:scale-105">
          <span className="relative flex size-1.5 sm:size-2">
            <span className="animate-ping absolute inline-flex size-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex size-1.5 sm:size-2 rounded-full bg-emerald-500"></span>
          </span>
          <span className="tracking-widest uppercase font-semibold">Available for New Projects</span>
        </div>

        {/* Headline with Spider-Verse Gradient Highlight */}
        <h2 className="font-serif font-light text-[17px] sm:text-2xl md:text-[27px] lg:text-[31px] text-foreground leading-[1.32] sm:leading-[1.36] tracking-[-0.025em]">
          <span className="block">
            I Love building AI products, turn random ideas into real projects, and occasionally fight bugs at 2AM.
          </span>
          <span className="block mt-1 sm:mt-1.5">
            Got something cool in mind?{" "}
            <span className="bg-gradient-to-r from-red-500 via-rose-500 to-blue-500 bg-clip-text text-transparent font-normal drop-shadow-sm">
              Let’s build it.
            </span>
          </span>
        </h2>

        {/* Action Buttons: Stacked full-width on mobile, side-by-side on desktop */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 w-full sm:w-auto pt-1">
          {/* Primary Spider-Man Pill Button */}
          <a
            href={DATA.contact.social.WhatsApp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:via-red-600 hover:to-blue-600 w-full sm:w-auto px-6 sm:px-7 py-3 text-sm sm:text-[15px] font-medium text-white border border-white/20 shadow-[0_8px_25px_-3px_rgba(220,38,38,0.55),0_4px_16px_rgba(37,99,235,0.35)] hover:shadow-[0_12px_32px_-2px_rgba(220,38,38,0.8),0_4px_22px_rgba(37,99,235,0.55)] hover:scale-[1.02] sm:hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer select-none"
          >
            <span>Let&apos;s Have a Chat!</span>
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </a>

          {/* Copy Email Glassmorphic Pill Button */}
          <button
            type="button"
            onClick={handleCopyEmail}
            className={`group/copy inline-flex items-center justify-center gap-2 rounded-full w-full sm:w-auto px-5 sm:px-6 py-3 text-sm sm:text-[15px] font-medium backdrop-blur-md transition-all duration-200 hover:scale-[1.02] sm:hover:scale-[1.03] active:scale-[0.98] cursor-pointer select-none ${
              copied
                ? "bg-emerald-950/60 dark:bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                : "bg-zinc-900/80 dark:bg-zinc-800/80 hover:bg-zinc-800 dark:hover:bg-zinc-700/90 text-zinc-100 dark:text-zinc-200 border border-white/10 hover:border-white/20"
            }`}
            title="Copy email to clipboard"
          >
            <span>{copied ? "Copied to Clipboard!" : "Copy Email"}</span>
            {copied ? (
              <Check className="size-4 text-emerald-400" />
            ) : (
              <Copy className="size-3.5 text-zinc-400 group-hover/copy:text-zinc-200" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
