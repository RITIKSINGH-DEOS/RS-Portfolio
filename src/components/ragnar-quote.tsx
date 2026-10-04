"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { PERSONAL_QUOTES } from "@/data/quotes";
import { motion, AnimatePresence } from "framer-motion";

const ROTATION_INTERVAL_MS = 6000; // 6 seconds per quote in circular loop

export function RagnarQuote() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // On page mount / refresh: continue to the next quote in the sequential series
  useEffect(() => {
    try {
      const savedIdxStr = sessionStorage.getItem("rs_quote_series_idx");
      if (savedIdxStr !== null) {
        const prevIdx = parseInt(savedIdxStr, 10);
        if (!isNaN(prevIdx)) {
          const next = (prevIdx + 1) % PERSONAL_QUOTES.length;
          setCurrentIndex(next);
          sessionStorage.setItem("rs_quote_series_idx", next.toString());
          return;
        }
      }
      sessionStorage.setItem("rs_quote_series_idx", "0");
    } catch {
      // In case sessionStorage is blocked
    }
  }, []);

  // Advance to next quote in the circular loop (1 -> 2 -> ... -> 8 -> 1)
  const handleNextQuote = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % PERSONAL_QUOTES.length;
      try {
        sessionStorage.setItem("rs_quote_series_idx", next.toString());
      } catch {}
      return next;
    });
  }, []);

  // Auto-run quotes continuously in a circular loop
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      handleNextQuote();
    }, ROTATION_INTERVAL_MS);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused, handleNextQuote]);

  const currentQuote = PERSONAL_QUOTES[currentIndex] || PERSONAL_QUOTES[0];

  return (
    <div
      onClick={handleNextQuote}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      title="Click to view next quote in loop"
      className="group relative w-full max-w-2xl mx-auto px-4 sm:px-6 my-6 sm:my-8 text-center select-none cursor-pointer transition-transform duration-300 active:scale-[0.99]"
    >
      {/* Subtle Spider-Man themed ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-20 bg-gradient-to-r from-red-500/10 via-blue-500/10 to-red-500/10 blur-2xl opacity-60 dark:opacity-40 group-hover:opacity-80 transition-opacity duration-500"
      />

      {/* Decorative subtle top separator line */}
      <div className="flex items-center justify-center gap-3 mb-4 sm:mb-5 opacity-40 group-hover:opacity-70 transition-opacity">
        <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-red-500" />
        <span className="text-[10px] text-red-500 dark:text-blue-400 font-serif">✦</span>
        <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-blue-500" />
      </div>

      {/* Animated Quote in Great Vibes Cursive Script */}
      <div className="min-h-[110px] sm:min-h-[90px] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuote.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="w-full"
          >
            <blockquote className="relative z-10 font-cursive text-xl sm:text-2xl md:text-[28px] leading-relaxed tracking-wide text-foreground/90 dark:text-zinc-100 drop-shadow-sm">
              “{currentQuote.quote}”
            </blockquote>

            {/* Author Attribution */}
            {currentQuote.author && (
              <div className="relative z-10 mt-2 sm:mt-3 flex items-center justify-center gap-2">
                <cite className="font-cursive text-base sm:text-lg md:text-xl not-italic font-normal text-red-500/90 dark:text-blue-400/90">
                  — {currentQuote.author}
                </cite>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Decorative subtle bottom separator line */}
      <div className="flex items-center justify-center gap-3 mt-4 sm:mt-5 opacity-40 group-hover:opacity-70 transition-opacity">
        <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-blue-500" />
        <span className="text-[10px] text-blue-500 dark:text-red-400 font-serif">✦</span>
        <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-red-500" />
      </div>
    </div>
  );
}
