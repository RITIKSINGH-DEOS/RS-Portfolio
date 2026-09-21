"use client";

import React from "react";

export function RagnarQuote() {
  return (
    <div className="relative w-full max-w-2xl mx-auto px-4 sm:px-6 my-6 sm:my-8 text-center select-none">
      {/* Subtle Spider-Man themed ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-20 bg-gradient-to-r from-red-500/10 via-blue-500/10 to-red-500/10 blur-2xl opacity-60 dark:opacity-40"
      />

      {/* Decorative subtle top separator line */}
      <div className="flex items-center justify-center gap-3 mb-4 sm:mb-5 opacity-40">
        <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-red-500" />
        <span className="text-[10px] text-red-500 dark:text-blue-400 font-serif">✦</span>
        <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-blue-500" />
      </div>

      {/* Ragnar Lothbrok Quote in Great Vibes Cursive Script */}
      <blockquote className="relative z-10 font-cursive text-xl sm:text-2xl md:text-[28px] leading-relaxed tracking-wide text-foreground/90 dark:text-zinc-100 drop-shadow-sm">
        “I don’t believe in the gods’ existence. Man is the master of his own fate, not the gods. The gods are man’s creation to give answers that they are too afraid to give themselves.”
      </blockquote>

      {/* Author Attribution */}
      <div className="relative z-10 mt-2 sm:mt-3 flex items-center justify-center gap-2">
        <cite className="font-cursive text-base sm:text-lg md:text-xl not-italic font-normal text-red-500/90 dark:text-blue-400/90">
          — Ragnar Lothbrok
        </cite>
      </div>

      {/* Decorative subtle bottom separator line */}
      <div className="flex items-center justify-center gap-3 mt-4 sm:mt-5 opacity-40">
        <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-blue-500" />
        <span className="text-[10px] text-blue-500 dark:text-red-400 font-serif">✦</span>
        <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-red-500" />
      </div>
    </div>
  );
}
