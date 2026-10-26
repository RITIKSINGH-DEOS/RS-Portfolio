"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { 
  X, 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft,
  Maximize2,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { PERSONAL_QUOTES } from "@/data/quotes";

export interface Achievement {
  readonly id: string;
  readonly title: string;
  readonly issuer: string;
  readonly category: string;
  readonly date: string;
  readonly logoUrl?: string;
  readonly certificateImage: string;
  readonly credentialId: string;
  readonly description: string;
  readonly skills: readonly string[];
}

interface AchievementsBookProps {
  readonly achievements: readonly Achievement[];
}

// Single unified Spider-Man Theme matching the rest of the RS-Portfolio website
const SPIDER_THEME = {
  // Category Pill Badge
  tagBorder: "border-red-500/35 dark:border-red-500/40",
  tagText: "text-red-400 dark:text-red-400",
  tagBg: "bg-red-500/10 dark:bg-red-500/15",
  tagGlow: "shadow-[0_0_12px_rgba(220,38,38,0.18)]",

  // Center Plate & Spider Web Matrix
  boxBorder: "border-red-500/20 dark:border-red-500/25",
  boxHover: "hover:border-red-500/40 hover:shadow-[0_0_35px_rgba(220,38,38,0.22),0_0_20px_rgba(37,99,235,0.18)]",
  dotColor: "rgba(220, 38, 38, 0.22)", // Spider web matrix red dots

  // Hover Highlights
  accentRed: "text-red-400",
  accentBlue: "text-blue-400",
  gradientText: "bg-gradient-to-r from-red-500 via-rose-500 to-blue-500 bg-clip-text text-transparent",
};

// =========================================================================
// 📕 1. CLOSED BOOK COVER (MATCHES FRAME 00:09 - 00:11 EXACTLY)
// =========================================================================
interface ClosedCoverProps {
  readonly totalAchievements: number;
  readonly onOpen: () => void;
}

interface CoverContentProps {
  readonly totalAchievements: number;
  readonly isTurning?: boolean;
}

function CoverContent({ totalAchievements, isTurning }: CoverContentProps) {
  return (
    <div className="relative w-full h-full rounded-r-2xl rounded-l-md bg-gradient-to-br from-[#1b1c1f] via-[#16171a] to-[#121315] border border-white/[0.09] flex flex-col justify-between p-5 sm:p-7 md:p-9 select-none overflow-hidden">
      {/* Left Spine Texture & Embossed Ridges */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-y-0 left-0 w-4 sm:w-5 bg-gradient-to-r from-[#0a0b0c] via-[#141518] to-transparent border-r border-white/[0.04]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute top-10 sm:top-12 left-0 w-3.5 sm:w-4 h-[1.5px] bg-white/[0.08]" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-10 sm:bottom-12 left-0 w-3.5 sm:w-4 h-[1.5px] bg-white/[0.08]" />

      {/* Right Paper Stack Edge (Simulating Realistic Physical Book Pages Block) */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-y-2 right-0 w-2 sm:w-2.5 rounded-r-sm bg-gradient-to-l from-white/[0.12] via-zinc-600/20 to-transparent shadow-inner"
      />

      {/* Soft Leatherette Sheen Overlay */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.05] rounded-r-2xl" 
      />

      {/* Cover Header */}
      <div className="relative z-10 pl-2">
        <span className="font-mono text-[9.5px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-zinc-500 font-medium">
          VOL. 01 · FIELD NOTES
        </span>

        <div className="mt-3 sm:mt-4 md:mt-5 space-y-0.5 sm:space-y-1">
          <h3 className="font-serif text-[21px] sm:text-2xl md:text-[27px] font-normal text-white tracking-tight leading-[1.18]">
            Verified Milestones &
          </h3>
          <p className="font-serif italic text-[21px] sm:text-2xl md:text-[27px] font-normal bg-gradient-to-r from-red-500 via-rose-500 to-blue-500 bg-clip-text text-transparent tracking-tight">
            achievements
          </p>
        </div>

        <p className="font-sans text-[11px] sm:text-xs text-zinc-400 mt-2.5 sm:mt-3 md:mt-4 leading-relaxed font-light line-clamp-2 sm:line-clamp-3">
          A permanent dossier of verified honors, certifications, and virtual engineering milestones.
        </p>
      </div>

      {/* Center Spider Web Graphic in Spider-Man Theme (Red & Royal Blue) */}
      <div className="relative z-10 my-auto py-1 sm:py-2 md:py-3 flex items-center justify-center">
        <svg 
          className="w-36 h-22 sm:w-44 sm:h-28 md:w-48 md:h-32 overflow-visible opacity-90 group-hover:opacity-100 transition-all duration-300 drop-shadow-[0_0_12px_rgba(220,38,38,0.45)] group-hover:drop-shadow-[0_0_20px_rgba(37,99,235,0.55)]" 
          viewBox="0 0 180 120"
          fill="none"
        >
          <defs>
            {/* Spider-Man Suit Dual Gradient (Red to Royal Blue) */}
            <linearGradient id="spiderWebGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#dc2626" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.9" />
            </linearGradient>

            {/* Ambient Radial Spider Glow */}
            <radialGradient id="spiderWebAmbient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#dc2626" stopOpacity="0.16" />
              <stop offset="60%" stopColor="#2563eb" stopOpacity="0.08" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Spider Sense Aura */}
          <circle cx="90" cy="60" r="52" fill="url(#spiderWebAmbient)" />

          {/* Radial Spokes (8 structural web silk threads in Spider-Man Theme) */}
          <g stroke="url(#spiderWebGradient)" strokeWidth="1.2" strokeLinecap="round">
            <line x1="90" y1="60" x2="142" y2="60" />
            <line x1="90" y1="60" x2="126.8" y2="96.8" />
            <line x1="90" y1="60" x2="90" y2="112" />
            <line x1="90" y1="60" x2="53.2" y2="96.8" />
            <line x1="90" y1="60" x2="38" y2="60" />
            <line x1="90" y1="60" x2="53.2" y2="23.2" />
            <line x1="90" y1="60" x2="90" y2="8" />
            <line x1="90" y1="60" x2="126.8" y2="23.2" />
            {/* Outer Anchor Filaments */}
            <line x1="38" y1="60" x2="16" y2="60" stroke="#ef4444" strokeDasharray="3 3" opacity="0.45" />
            <line x1="142" y1="60" x2="164" y2="60" stroke="#2563eb" strokeDasharray="3 3" opacity="0.45" />
            <line x1="90" y1="8" x2="90" y2="0" stroke="#ef4444" strokeDasharray="3 3" opacity="0.45" />
            <line x1="90" y1="112" x2="90" y2="120" stroke="#2563eb" strokeDasharray="3 3" opacity="0.45" />
          </g>

          {/* Concentric Sagging Silk Web Rings in Spider-Man Red & Blue */}
          <g strokeWidth="1.2" fill="none">
            {/* Ring 0 (Inner Core - Crimson Red) */}
            <path 
              stroke="#ef4444" 
              strokeOpacity="0.85"
              d="M 104.0 60.0 Q 101.4 64.7 99.9 69.9 Q 94.7 71.4 90.0 74.0 Q 85.3 71.4 80.1 69.9 Q 78.6 64.7 76.0 60.0 Q 78.6 55.3 80.1 50.1 Q 85.3 48.6 90.0 46.0 Q 94.7 48.6 99.9 50.1 Q 101.4 55.3 104.0 60.0 Z" 
            />
            {/* Ring 1 (Spider-Man Dual Red/Blue Gradient) */}
            <path 
              stroke="url(#spiderWebGradient)" 
              strokeOpacity="0.8"
              d="M 115.0 60.0 Q 110.3 68.4 107.7 77.7 Q 98.4 80.3 90.0 85.0 Q 81.6 80.3 72.3 77.7 Q 69.7 68.4 65.0 60.0 Q 69.7 51.6 72.3 42.3 Q 81.6 39.7 90.0 35.0 Q 98.4 39.7 107.7 42.3 Q 110.3 51.6 115.0 60.0 Z" 
            />
            {/* Ring 2 (Electric Spider Blue) */}
            <path 
              stroke="#2563eb" 
              strokeOpacity="0.85"
              d="M 126.0 60.0 Q 119.3 72.1 115.5 85.5 Q 102.1 89.3 90.0 96.0 Q 77.9 89.3 64.5 85.5 Q 60.7 72.1 54.0 60.0 Q 60.7 47.9 64.5 34.5 Q 77.9 30.7 90.0 24.0 Q 102.1 30.7 115.5 34.5 Q 119.3 47.9 126.0 60.0 Z" 
            />
            {/* Ring 3 (Outer Perimeter - Spider-Man Gradient) */}
            <path 
              stroke="url(#spiderWebGradient)" 
              strokeOpacity="0.9"
              d="M 137.0 60.0 Q 128.2 75.8 123.2 93.2 Q 105.8 98.2 90.0 107.0 Q 74.2 98.2 56.8 93.2 Q 51.8 75.8 43.0 60.0 Q 51.8 44.2 56.8 26.8 Q 74.2 21.8 90.0 13.0 Q 105.8 21.8 123.2 26.8 Q 128.2 44.2 137.0 60.0 Z" 
            />
          </g>

          {/* Central Silk Core & Glowing Spider Nodes */}
          <circle cx="90" cy="60" r="3" fill="#dc2626" className="drop-shadow-[0_0_8px_rgba(220,38,38,0.95)]" />
          <circle cx="104" cy="60" r="1.5" fill="#ef4444" className="drop-shadow-[0_0_6px_rgba(239,68,68,0.9)]" />
          <circle cx="76" cy="60" r="1.5" fill="#3b82f6" className="drop-shadow-[0_0_6px_rgba(59,130,246,0.9)]" />
          <circle cx="90" cy="74" r="1.5" fill="#2563eb" className="drop-shadow-[0_0_6px_rgba(37,99,235,0.9)]" />
          <circle cx="90" cy="46" r="1.5" fill="#ef4444" className="drop-shadow-[0_0_6px_rgba(239,68,68,0.9)]" />
        </svg>
      </div>

      {/* Cover Footer */}
      <div className="relative z-10 pl-2">
        <div className="pt-2.5 sm:pt-3 md:pt-4 border-t border-white/[0.08] flex items-center justify-between">
          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-zinc-300 font-medium">
            RITIK SINGH
          </span>

          <span className="font-mono text-[11px] sm:text-xs text-zinc-500 tabular-nums">
            {totalAchievements} HONORS
          </span>
        </div>
      </div>
    </div>
  );
}

function ClosedBookCover({ totalAchievements, onOpen }: ClosedCoverProps) {
  return (
    <div className="w-full flex items-center justify-center py-4 sm:py-6 select-none [perspective:1600px]">
      <motion.div
        onClick={onOpen}
        initial={false}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        whileHover={{ 
          scale: 1.025, 
          rotateY: -8, 
          rotateX: 2,
          transition: { duration: 0.35, ease: "easeOut" }
        }}
        whileTap={{ scale: 0.99 }}
        className="group relative w-[290px] sm:w-[330px] md:w-[380px] h-[420px] sm:h-[450px] md:h-[490px] rounded-r-2xl rounded-l-md shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),0_0_35px_rgba(0,0,0,0.6)] cursor-pointer transition-shadow duration-300 hover:shadow-[0_35px_80px_-10px_rgba(0,0,0,0.98),0_0_45px_rgba(255,255,255,0.06)] overflow-hidden"
      >
        <CoverContent totalAchievements={totalAchievements} />
      </motion.div>
    </div>
  );
}

// =========================================================================
// 📄 2. CONTENTS PAGE (SPREAD 1 LEFT PAGE, EXACT FRAME 00:00)
// =========================================================================
interface ContentsPageProps {
  readonly achievements: readonly Achievement[];
  readonly onSelect: (index: number) => void;
}

function ContentsPage({ achievements, onSelect }: ContentsPageProps) {
  return (
    <div className="w-full h-full px-5 py-5 sm:px-7 sm:py-7 md:px-12 md:pt-9 md:pb-8 flex flex-col justify-between bg-gradient-to-r from-[#191a1d] to-[#161719] relative select-none antialiased">
      <div className="flex flex-col">
        {/* Top Label */}
        <div className="pb-2.5 sm:pb-3">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-zinc-500 font-medium">
            CONTENTS
          </span>
        </div>

        {/* Numbered Achievements List */}
        <div className="divide-y divide-white/[0.06]">
          {achievements.map((item, idx) => {
            // Page mapping: Achievement 0 is Page 3, Achievement 1 is Page 4, Achievement 2 is Page 5
            const pageNum = idx + 3;
            return (
              <button
                key={item.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(idx);
                }}
                className="w-full py-2.5 sm:py-3.5 flex items-center justify-between text-left transition-colors duration-150 group focus:outline-none text-zinc-400 hover:text-white"
              >
                <div className="flex items-center gap-2.5 sm:gap-4 min-w-0 pr-2 sm:pr-4">
                  <span className="font-mono text-xs tabular-nums text-zinc-600 group-hover:text-red-400 transition-colors">
                    0{idx + 1}
                  </span>
                  <span className="font-serif text-[14px] sm:text-base tracking-tight truncate group-hover:text-white transition-colors">
                    {item.title}
                  </span>
                </div>

                <span className="font-mono text-xs text-zinc-600 shrink-0 tabular-nums group-hover:text-red-400 transition-colors">
                  {pageNum}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Left Footer */}
      <div className="pt-2.5 sm:pt-3.5 border-t border-white/[0.06] flex items-center justify-between mt-auto">
        <span className="font-serif italic text-[11px] sm:text-xs text-zinc-500">
          Click a page to turn it.
        </span>

        <span className="font-mono text-xs text-zinc-600 tabular-nums">
          2
        </span>
      </div>
    </div>
  );
}

// =========================================================================
// 📄 3. MILESTONE PAGE (USED ON BOTH LEFT & RIGHT SIDES OF SPREADS & MOBILE)
// =========================================================================
interface MilestonePageProps {
  readonly achievement: Achievement;
  readonly milestoneNumber: number;
  readonly pageNumber: number;
  readonly isRightSide?: boolean;
  readonly canGoNext?: boolean;
  readonly canGoPrev?: boolean;
  readonly onNext?: () => void;
  readonly onPrev?: () => void;
  readonly onZoom: () => void;
}

function MilestonePage({
  achievement,
  milestoneNumber,
  pageNumber,
  isRightSide = false,
  canGoNext,
  canGoPrev,
  onNext,
  onPrev,
  onZoom,
}: MilestonePageProps) {
  return (
    <div className={cn(
      "w-full h-full px-5 py-4 sm:px-7 sm:py-6 md:px-12 md:pt-9 md:pb-8 flex flex-col justify-between relative select-none",
      isRightSide 
        ? "bg-gradient-to-l from-[#191a1d] to-[#161719]" 
        : "bg-gradient-to-r from-[#191a1d] to-[#161719]"
    )}>
      <div className="flex flex-col relative z-10">
        {/* Top Bar: Spider-Theme Category Tag Pill + NO. 0X */}
        <div className="h-6 sm:h-7 flex items-center justify-between">
          <span className={cn(
            "font-mono text-[9.5px] sm:text-[10px] md:text-[11px] px-2.5 py-0.5 sm:px-3.5 sm:py-1 rounded-full uppercase tracking-wider font-semibold border flex items-center gap-1.5",
            SPIDER_THEME.tagBorder,
            SPIDER_THEME.tagText,
            SPIDER_THEME.tagBg,
            SPIDER_THEME.tagGlow
          )}>
            <span className="size-1.5 rounded-full bg-red-500 animate-pulse" />
            <span>{achievement.category}</span>
          </span>

          <span className="font-mono text-[11px] sm:text-xs text-zinc-500 tracking-[0.25em]">
            NO.  0{milestoneNumber}
          </span>
        </div>

        {/* Title Slot (Compact and refined) */}
        <div className="min-h-[24px] sm:min-h-[28px] md:min-h-[32px] flex items-center mt-1 mb-1 sm:mt-2 sm:mb-2">
          <h3 className="font-serif text-sm sm:text-[15px] md:text-[17px] font-normal text-white tracking-tight leading-snug line-clamp-1 sm:line-clamp-2">
            {achievement.title}
          </h3>
        </div>

        {/* Center Visual Certificate Plate (Full A4 Portrait Display - Spider Web Matrix Theme) */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            onZoom();
          }}
          style={{
            backgroundImage: `radial-gradient(${SPIDER_THEME.dotColor} 1.2px, transparent 1.2px)`,
            backgroundSize: "16px 16px",
          }}
          className={cn(
            "group relative w-fit mx-auto h-[215px] sm:h-[235px] md:h-[270px] rounded-xl sm:rounded-2xl border bg-[#141518] shadow-xl flex items-center justify-center cursor-pointer transition-all duration-300 p-2 sm:p-2.5 md:p-3",
            SPIDER_THEME.boxBorder,
            SPIDER_THEME.boxHover
          )}
        >
          {/* Document Sheet Frame */}
          <div className="relative h-full aspect-[1/1.38] rounded-md sm:rounded-lg overflow-hidden shadow-[0_12px_28px_-5px_rgba(0,0,0,0.85),0_0_15px_rgba(255,255,255,0.06)] border border-white/20 bg-white flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.02]">
            <Image
              src={achievement.certificateImage}
              alt={achievement.title}
              fill
              sizes="(max-width: 768px) 80vw, 420px"
              className="object-contain"
              priority
            />
          </div>

          {/* Subtle Corner Expand Indicator */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-white font-mono text-[10px] border border-white/20 shadow-md">
              <Maximize2 className="size-3 text-white" />
              <span>Zoom</span>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-2.5 sm:pt-3.5 border-t border-white/[0.06] flex items-center justify-between mt-auto relative z-10">
        <div className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-red-500/80" />
          <span className="font-mono text-[10.5px] sm:text-xs text-zinc-400 uppercase tracking-widest">
            VERIFIED
          </span>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-4 md:gap-5">
          {/* Prev Button */}
          {canGoPrev && onPrev && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="inline-flex items-center gap-1 font-mono text-[11px] sm:text-xs font-semibold text-zinc-400 uppercase tracking-wider hover:text-red-400 transition-colors group/prev focus:outline-none"
              aria-label="Previous Page"
            >
              <ArrowLeft className="size-3 sm:size-3.5 transition-transform duration-200 group-hover/prev:-translate-x-1" />
              <span>PREV</span>
            </button>
          )}

          {/* Next Button */}
          {canGoNext && onNext && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="inline-flex items-center gap-1 font-mono text-[11px] sm:text-xs font-semibold text-white uppercase tracking-wider hover:text-red-400 transition-colors group/next focus:outline-none"
              aria-label="Next Page"
            >
              <span>READ</span>
              <ArrowRight className="size-3 sm:size-3.5 transition-transform duration-200 group-hover/next:translate-x-1" />
            </button>
          )}

          <span className="font-mono text-xs text-zinc-600 tabular-nums">
            {pageNumber}
          </span>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 📄 4. EPILOGUE PAGE (SPREAD 3 LEFT PAGE: INSPIRATIONAL QUOTE SERIES)
// =========================================================================
interface AfterwordPageProps {
  readonly totalAchievements: number;
  readonly quoteIndex: number;
  readonly onNextQuote: () => void;
  readonly onReturnToContents: () => void;
  readonly canGoNext?: boolean;
  readonly onNext?: () => void;
}

function AfterwordPage({ 
  totalAchievements, 
  quoteIndex, 
  onNextQuote, 
  onReturnToContents,
  canGoNext,
  onNext,
}: AfterwordPageProps) {
  const currentQuote = PERSONAL_QUOTES[quoteIndex % PERSONAL_QUOTES.length];

  return (
    <div className="w-full h-full px-5 py-4 sm:px-7 sm:py-6 md:px-12 md:py-8 flex flex-col justify-between bg-gradient-to-r from-[#191a1d] to-[#161719] relative select-none antialiased">
      {/* Top Header */}
      <div className="shrink-0 flex items-center justify-between pb-1 relative z-10">
        <span className="font-mono text-[9.5px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-red-400 font-semibold flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-red-500 animate-pulse" />
          <span>EPILOGUE</span>
        </span>

        <span className="font-mono text-[9.5px] sm:text-[10px] md:text-xs text-zinc-500 tracking-[0.25em] uppercase">
          WORDS TO LIVE BY
        </span>
      </div>

      {/* Centerpiece: Literary Quote Slot (Passive - clicking outside shuffle button turns page!) */}
      <div className="flex-1 my-auto flex flex-col items-center justify-center relative z-10 select-none px-1 py-1">
        {/* Large Decorative Serif Quotation Mark */}
        <span 
          aria-hidden="true" 
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-red-500/25 leading-none select-none block text-center mb-0.5 sm:mb-1"
        >
          “
        </span>

        {/* Fixed Height Slot for Quote and Author so Layout and Bottom Bar NEVER Shift */}
        <div className="w-full min-h-[135px] sm:min-h-[150px] md:min-h-[185px] max-h-[155px] sm:max-h-[170px] md:max-h-[195px] flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="w-full text-center flex flex-col items-center justify-center"
            >
              {/* The Quote Text in Grey Great Vibes Script */}
              <blockquote className="font-great-vibes text-[17px] sm:text-[19px] md:text-[23px] leading-[1.35] sm:leading-[1.4] text-zinc-400 tracking-wide text-center line-clamp-4">
                {currentQuote.quote}
              </blockquote>

              {/* Author Attribution */}
              {currentQuote.author && (
                <div className="mt-2.5 sm:mt-3 md:mt-4 flex items-center justify-center gap-2 sm:gap-2.5">
                  <span className="h-px w-5 sm:w-8 bg-gradient-to-r from-red-500/80 to-blue-500/80" />
                  <cite className="font-mono text-[11px] sm:text-xs md:text-[13px] text-red-400 not-italic uppercase tracking-widest font-semibold">
                    {currentQuote.author}
                  </cite>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dedicated Click-to-Shuffle Pill Button (ONLY this shuffles quotes; clicking anywhere else turns page) */}
        <div className="mt-2 flex items-center justify-center">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNextQuote();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] active:scale-95 transition-all text-zinc-400 hover:text-white cursor-pointer focus:outline-none"
            title="Click to shuffle quote"
          >
            <Sparkles className="size-3 text-red-400 animate-pulse shrink-0" />
            <span className="font-mono text-[10px] tracking-wide">
              click to shuffle quote ({quoteIndex + 1}/{PERSONAL_QUOTES.length})
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Bar: Jump Back to Contents & Optional Mobile READ Button */}
      <div className="shrink-0 pt-2.5 sm:pt-3 border-t border-white/[0.06] flex items-center justify-between mt-auto relative z-10">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onReturnToContents();
          }}
          className="inline-flex items-center gap-1.5 font-mono text-[11px] sm:text-xs font-semibold text-white uppercase tracking-wider hover:text-red-400 transition-colors group focus:outline-none"
        >
          <span>ALL ACHIEVEMENTS ({totalAchievements})</span>
          <ArrowRight className="size-3 sm:size-3.5 transition-transform group-hover:translate-x-1 text-red-400" />
        </button>

        <div className="flex items-center gap-2.5 sm:gap-3">
          {canGoNext && onNext && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="inline-flex items-center gap-1 font-mono text-[11px] sm:text-xs font-semibold text-white uppercase tracking-wider hover:text-red-400 transition-colors group/next focus:outline-none"
              aria-label="Next Page"
            >
              <span>READ</span>
              <ArrowRight className="size-3 sm:size-3.5 transition-transform duration-200 group-hover/next:translate-x-1" />
            </button>
          )}

          <span className="font-mono text-xs text-zinc-600 tabular-nums">
            6
          </span>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 📄 5. FIN PAGE (SPREAD 3 RIGHT PAGE: AUTHENTIC SPIDER DOSSIER SEAL)
// =========================================================================
interface FinPageProps {
  readonly onClose: () => void;
}

function FinPage({ onClose }: FinPageProps) {
  return (
    <div 
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      className="w-full h-full px-5 py-5 sm:px-7 sm:py-7 md:px-12 md:py-9 flex flex-col items-center justify-center bg-gradient-to-l from-[#191a1d] to-[#161719] relative select-none cursor-pointer group"
    >
      {/* Centerpiece: Glowing Spider Crest + To Be Continued + CLICK TO CLOSE */}
      <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 py-2">
        {/* Animated Spider Crest Seal */}
        <div className="relative size-13 sm:size-15 md:size-18 flex items-center justify-center">
          {/* Rotating outer web ring */}
          <div className="absolute inset-0 rounded-full border border-red-500/25 animate-[spin_20s_linear_infinite]" />
          <div className="absolute inset-1.5 rounded-full border border-blue-500/20 border-dashed animate-[spin_15s_linear_infinite_reverse]" />
          {/* Spider-Sense Glow */}
          <div className="absolute inset-2 sm:inset-3 rounded-full bg-gradient-to-br from-red-600/20 via-transparent to-blue-600/20 blur-md" />

          {/* Spider Icon */}
          <svg className="size-8 sm:size-9 md:size-10 drop-shadow-[0_0_14px_rgba(220,38,38,0.95)] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 40 40" fill="none">
            <ellipse cx="20" cy="23" rx="4.5" ry="6.5" fill="#dc2626" />
            <circle cx="20" cy="14" r="3.5" fill="#ef4444" />
            <ellipse cx="18.5" cy="13.5" rx="1" ry="1.4" fill="#ffffff" transform="rotate(-15 18.5 13.5)" />
            <ellipse cx="21.5" cy="13.5" rx="1" ry="1.4" fill="#ffffff" transform="rotate(15 21.5 13.5)" />
            <path d="M 17 18 Q 11 15 9 9" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 16 21 Q 9 20 6 17" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 16 24 Q 9 26 7 31" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 17 26 Q 11 31 10 35" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 23 18 Q 29 15 31 9" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 24 21 Q 31 20 34 17" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 24 24 Q 31 26 33 31" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 23 26 Q 29 31 30 35" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>

        {/* Narrative Headline & Click to Close */}
        <div className="text-center space-y-1.5 sm:space-y-2 pt-1">
          <h4 className="font-serif italic text-[22px] sm:text-2xl md:text-[28px] font-normal text-white tracking-tight leading-tight">
            To Be Continued...
          </h4>
          <p className="font-mono text-[10.5px] sm:text-xs uppercase tracking-[0.25em] text-zinc-400 group-hover:text-zinc-300 transition-colors antialiased select-none">
            CLICK TO CLOSE
          </p>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 📖 6. 3D TURNING LEAF COMPONENT (AUTHENTIC 180° SPINE-HINGED PAGE FLIP)
// =========================================================================
interface TurningLeafProps {
  readonly direction: 1 | -1;
  readonly frontContent: React.ReactNode;
  readonly backContent: React.ReactNode;
  readonly onComplete: () => void;
}

function TurningLeaf({ direction, frontContent, backContent, onComplete }: TurningLeafProps) {
  return (
    <div 
      className="hidden md:block pointer-events-none absolute inset-y-0 left-1/2 w-1/2 z-40 [perspective:1800px]"
      style={{
        transformOrigin: "left center",
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        initial={{ rotateY: direction === 1 ? 0 : -180 }}
        animate={{ rotateY: direction === 1 ? -180 : 0 }}
        transition={{ 
          duration: 0.65, 
          ease: [0.33, 1, 0.68, 1], // Smooth paper turning momentum
        }}
        onAnimationComplete={onComplete}
        style={{
          transformOrigin: "left center",
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        {/* Dynamic Paper Turning Curvature Shadow Drop */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.35, 0] }}
          transition={{ duration: 0.65 }}
          className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-black/40 via-black/15 to-transparent"
        />

        {/* FRONT FACE (Visible 0deg to -90deg) */}
        <div 
          style={{ 
            backfaceVisibility: "hidden",
            position: "absolute",
            inset: 0,
            overflow: "hidden",
          }}
          className="border-r border-white/[0.06] bg-[#161719] shadow-2xl"
        >
          {frontContent}
        </div>

        {/* BACK FACE (Visible -90deg to -180deg - Pre-rotated by 180deg) */}
        <div 
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            position: "absolute",
            inset: 0,
            overflow: "hidden",
          }}
          className="border-l border-white/[0.06] bg-[#191a1d] shadow-2xl"
        >
          {backContent}
        </div>
      </motion.div>
    </div>
  );
}

// =========================================================================
// 📱 MOBILE PAGE TURN ANIMATION VARIANTS (CLEAN HARDWARE-ACCELERATED SLIDE)
// =========================================================================
const mobilePageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.32,
      ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -50 : 50,
    opacity: 0,
    transition: {
      duration: 0.26,
      ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
    },
  }),
};

// =========================================================================
// 🏛️ MAIN ACHIEVEMENTS BOOK COMPONENT
// =========================================================================
export function AchievementsBook({ achievements }: AchievementsBookProps) {
  // isOpen: true = open book; false = closed 3D cover
  const [isOpen, setIsOpen] = useState(false);

  // Smooth 3D physical cover transitions for desktop
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  // Desktop spread: 1 = Contents & No.1, 2 = No.2 & No.3, 3 = Epilogue & Fin
  const [currentSpread, setCurrentSpread] = useState(1);
  const [targetSpread, setTargetSpread] = useState<number | null>(null);
  const [isTurning, setIsTurning] = useState(false);
  const [turnDirection, setTurnDirection] = useState<1 | -1>(1);

  // Mobile Single-Page Navigation:
  // 0 = Cover, 1 = Contents, 2 = Milestone 1, 3 = Milestone 2, 4 = Milestone 3, 5 = Epilogue, 6 = Fin
  const [mobilePage, setMobilePage] = useState(0);
  const [mobileDirection, setMobileDirection] = useState<1 | -1>(1);

  // Fullscreen Zoom Lightbox
  const [zoomedAchievement, setZoomedAchievement] = useState<Achievement | null>(null);

  // Inspirational Quote series for Epilogue (cycles on each visit or user click)
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    if (currentSpread === 3 || mobilePage === 5) {
      setQuoteIndex((prev) => (prev + 1) % PERSONAL_QUOTES.length);
    }
  }, [currentSpread, mobilePage]);

  const total = achievements.length;
  const maxSpread = 3;

  // Mobile navigation handler
  const goToMobilePage = useCallback((newPage: number) => {
    if (newPage < 0 || newPage > 6 || newPage === mobilePage) return;
    const direction: 1 | -1 = newPage > mobilePage ? 1 : -1;
    setMobileDirection(direction);
    setMobilePage(newPage);
    if (newPage === 0) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      if (newPage === 1 || newPage === 2) setCurrentSpread(1);
      else if (newPage === 3 || newPage === 4) setCurrentSpread(2);
      else if (newPage >= 5) setCurrentSpread(3);
    }
  }, [mobilePage]);

  // Desktop navigation handlers
  const handleClose = useCallback(() => {
    if (isTurning || isClosing || isOpening || !isOpen) return;
    setMobilePage(0);
    setMobileDirection(-1);
    setIsClosing(true);
  }, [isTurning, isClosing, isOpening, isOpen]);

  const handleOpen = useCallback(() => {
    if (isTurning || isClosing || isOpening || isOpen) return;
    setIsOpen(true);
    setCurrentSpread(1);
    setMobilePage(1);
    setMobileDirection(1);
    setIsOpening(true);
  }, [isTurning, isClosing, isOpening, isOpen]);

  const turnToSpread = useCallback((newSpread: number) => {
    if (isTurning || isClosing || isOpening || newSpread === currentSpread || newSpread < 1 || newSpread > maxSpread) return;
    const direction: 1 | -1 = newSpread > currentSpread ? 1 : -1;
    setTurnDirection(direction);
    setTargetSpread(newSpread);
    setIsTurning(true);
    if (newSpread === 1) setMobilePage(1);
    else if (newSpread === 2) setMobilePage(3);
    else if (newSpread === 3) setMobilePage(5);
  }, [isTurning, isClosing, isOpening, currentSpread, maxSpread]);

  const handleNext = useCallback(() => {
    if (currentSpread < maxSpread) {
      turnToSpread(currentSpread + 1);
    }
  }, [currentSpread, maxSpread, turnToSpread]);

  const handlePrev = useCallback(() => {
    if (currentSpread > 1) {
      turnToSpread(currentSpread - 1);
    }
  }, [currentSpread, turnToSpread]);

  // Map spread to Left & Right pages on Desktop
  const renderLeftPage = useCallback((spread: number) => {
    if (spread === 1) {
      return (
        <ContentsPage 
          achievements={achievements} 
          onSelect={(idx) => {
            if (isTurning || isClosing || isOpening) return;
            if (idx === 0) {
              if (currentSpread !== 1) turnToSpread(1);
            } else {
              turnToSpread(2);
            }
          }} 
        />
      );
    }
    if (spread === 2) {
      return (
        <MilestonePage
          achievement={achievements[1]}
          milestoneNumber={2}
          pageNumber={4}
          isRightSide={false}
          canGoPrev={true}
          onPrev={handlePrev}
          onZoom={() => setZoomedAchievement(achievements[1])}
        />
      );
    }
    // Spread 3: Epilogue / Quote
    return (
      <AfterwordPage 
        totalAchievements={total} 
        quoteIndex={quoteIndex}
        onNextQuote={() => setQuoteIndex((prev) => (prev + 1) % PERSONAL_QUOTES.length)}
        onReturnToContents={() => {
          turnToSpread(1);
        }} 
      />
    );
  }, [achievements, currentSpread, isTurning, isClosing, isOpening, total, turnToSpread, handlePrev, quoteIndex]);

  const renderRightPage = useCallback((spread: number) => {
    if (spread === 1) {
      return (
        <MilestonePage
          achievement={achievements[0]}
          milestoneNumber={1}
          pageNumber={3}
          isRightSide={true}
          canGoNext={true}
          onNext={handleNext}
          onZoom={() => setZoomedAchievement(achievements[0])}
        />
      );
    }
    if (spread === 2) {
      return (
        <MilestonePage
          achievement={achievements[2]}
          milestoneNumber={3}
          pageNumber={5}
          isRightSide={true}
          canGoNext={true}
          onNext={handleNext}
          onZoom={() => setZoomedAchievement(achievements[2])}
        />
      );
    }
    // Spread 3: Dossier Seal (Click to close)
    return (
      <FinPage 
        onClose={handleClose} 
      />
    );
  }, [achievements, handleNext, handleClose]);

  // Mobile Single Page Renderer (Matches book.mp4 Flow)
  const renderMobilePage = useCallback((page: number) => {
    switch (page) {
      case 0:
        return (
          <div 
            onClick={() => goToMobilePage(1)}
            className="w-full h-full cursor-pointer"
          >
            <CoverContent totalAchievements={total} />
          </div>
        );
      case 1:
        return (
          <div 
            onClick={() => goToMobilePage(2)}
            className="w-full h-full cursor-pointer"
          >
            <ContentsPage 
              achievements={achievements} 
              onSelect={(idx) => goToMobilePage(idx + 2)} 
            />
          </div>
        );
      case 2:
        return (
          <div 
            onClick={() => goToMobilePage(3)}
            className="w-full h-full cursor-pointer"
          >
            <MilestonePage
              achievement={achievements[0]}
              milestoneNumber={1}
              pageNumber={3}
              isRightSide={true}
              canGoNext={true}
              canGoPrev={false}
              onNext={() => goToMobilePage(3)}
              onZoom={() => setZoomedAchievement(achievements[0])}
            />
          </div>
        );
      case 3:
        return (
          <div 
            onClick={() => goToMobilePage(4)}
            className="w-full h-full cursor-pointer"
          >
            <MilestonePage
              achievement={achievements[1]}
              milestoneNumber={2}
              pageNumber={4}
              isRightSide={false}
              canGoNext={true}
              canGoPrev={true}
              onNext={() => goToMobilePage(4)}
              onPrev={() => goToMobilePage(2)}
              onZoom={() => setZoomedAchievement(achievements[1])}
            />
          </div>
        );
      case 4:
        return (
          <div 
            onClick={() => goToMobilePage(5)}
            className="w-full h-full cursor-pointer"
          >
            <MilestonePage
              achievement={achievements[2]}
              milestoneNumber={3}
              pageNumber={5}
              isRightSide={true}
              canGoNext={true}
              canGoPrev={true}
              onNext={() => goToMobilePage(5)}
              onPrev={() => goToMobilePage(3)}
              onZoom={() => setZoomedAchievement(achievements[2])}
            />
          </div>
        );
      case 5:
        return (
          <div 
            onClick={() => goToMobilePage(6)}
            className="w-full h-full cursor-pointer"
          >
            <AfterwordPage 
              totalAchievements={total} 
              quoteIndex={quoteIndex}
              onNextQuote={() => setQuoteIndex((prev) => (prev + 1) % PERSONAL_QUOTES.length)}
              onReturnToContents={() => goToMobilePage(1)}
              canGoNext={true}
              onNext={() => goToMobilePage(6)}
            />
          </div>
        );
      case 6:
        return (
          <div 
            onClick={() => goToMobilePage(0)}
            className="w-full h-full cursor-pointer"
          >
            <FinPage 
              onClose={() => goToMobilePage(0)} 
            />
          </div>
        );
      default:
        return null;
    }
  }, [achievements, total, quoteIndex, goToMobilePage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoomedAchievement) {
          setZoomedAchievement(null);
        } else if (isOpen && !isClosing) {
          handleClose();
        }
      } else if (e.key === "ArrowRight") {
        if (typeof window !== "undefined" && window.innerWidth < 768) {
          if (mobilePage < 6) goToMobilePage(mobilePage + 1);
        } else {
          if (isOpen && !isClosing && !isOpening) handleNext();
        }
      } else if (e.key === "ArrowLeft") {
        if (typeof window !== "undefined" && window.innerWidth < 768) {
          if (mobilePage > 0) goToMobilePage(mobilePage - 1);
        } else {
          if (isOpen && !isClosing && !isOpening) handlePrev();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isClosing, isOpening, mobilePage, zoomedAchievement, handleNext, handlePrev, handleClose, goToMobilePage]);

  return (
    <div className="w-[92vw] max-w-[768px] relative left-1/2 -translate-x-1/2 py-2 select-none">
      {/* Soft Ambient Glow Behind Book (Spider Theme Red & Blue) */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-20 bg-gradient-to-r from-red-600/15 via-blue-600/15 to-red-600/15 blur-2xl rounded-full opacity-60" 
      />

      {/* ========================================================================= */}
      {/* 💻 DESKTOP VIEW: AUTHENTIC TWO-PAGE SPREAD WITH 3D TURNING LEAF (md:block) */}
      {/* ========================================================================= */}
      <div className="hidden md:block w-full">
        <motion.div
          key="open-book-spread-desktop"
          initial={false}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: isClosing 
              ? ["0%", "-25%"] 
              : isOpening 
                ? ["-25%", "0%"] 
                : !isOpen 
                  ? "-25%" 
                  : "0%"
          }}
          transition={{ 
            x: { duration: 0.75, ease: [0.33, 1, 0.68, 1] },
            duration: 0.25 
          }}
          className={cn(
            "relative rounded-2xl overflow-hidden",
            (!isOpen || isClosing || isOpening) 
              ? "bg-transparent border-transparent shadow-none" 
              : "border border-white/[0.08] bg-[#191a1d] shadow-[0_25px_65px_-12px_rgba(0,0,0,0.95),0_0_40px_rgba(0,0,0,0.6)]"
          )}
        >
          {/* 2-Page Spread Grid (Fixed Height 490px) */}
          <div className="grid grid-cols-2 h-[490px] relative">
            {/* LEFT PAGE (Underneath Base) */}
            <div 
              onClick={() => {
                if (isOpen && !isClosing && !isOpening && currentSpread > 1) handlePrev();
              }}
              className={cn(
                "relative h-full",
                isOpen && !isClosing && !isOpening && currentSpread > 1 && "cursor-pointer",
                (!isOpen || isClosing || isOpening) && "opacity-0 pointer-events-none"
              )}
            >
              {renderLeftPage(
                isTurning && targetSpread !== null && turnDirection === -1 
                  ? targetSpread 
                  : currentSpread
              )}
            </div>

            {/* RIGHT PAGE (Underneath Base) */}
            <div 
              onClick={() => {
                if (!isOpen && !isClosing && !isOpening) {
                  handleOpen();
                } else if (isOpen && !isClosing && !isOpening && currentSpread < maxSpread) {
                  handleNext();
                }
              }}
              className={cn(
                "relative h-full",
                !isOpen && "cursor-pointer rounded-r-2xl rounded-l-md border border-white/[0.09] bg-[#161719] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)] hover:shadow-[0_35px_80px_-10px_rgba(0,0,0,0.98),0_0_45px_rgba(255,255,255,0.06)]",
                isOpen && !isClosing && !isOpening && currentSpread < maxSpread && "cursor-pointer",
                (isClosing || isOpening) && "rounded-r-2xl rounded-l-md border border-white/[0.09] bg-[#161719] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)]"
              )}
            >
              {!isOpen && !isClosing ? (
                <div className="w-full h-full overflow-hidden rounded-r-2xl rounded-l-md">
                  <CoverContent totalAchievements={total} />
                </div>
              ) : (
                renderRightPage(
                  isTurning && targetSpread !== null && turnDirection === 1 
                    ? targetSpread 
                    : currentSpread
                )
              )}
            </div>

            {/* 3D SPINE TURNING LEAF (ACTIVE ONLY DURING NORMAL TURN) */}
            {isTurning && targetSpread !== null && (
              <TurningLeaf
                direction={turnDirection}
                frontContent={
                  turnDirection === 1 
                    ? renderRightPage(currentSpread) 
                    : renderRightPage(targetSpread)
                }
                backContent={
                  turnDirection === 1 
                    ? renderLeftPage(targetSpread) 
                    : renderLeftPage(currentSpread)
                }
                onComplete={() => {
                  setCurrentSpread(targetSpread);
                  setTargetSpread(null);
                  setIsTurning(false);
                }}
              />
            )}

            {/* Soft Realistic Inward Spine Fold Shadow */}
            <div 
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-16 z-[45] bg-gradient-to-r from-transparent via-black/40 to-transparent transition-opacity duration-300",
                (!isOpen || isClosing || isOpening) && "opacity-0"
              )}
            />

            {/* 1px Center Crease Line */}
            <div 
              aria-hidden="true" 
              className={cn(
                "pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] z-[45] bg-white/[0.05] transition-opacity duration-300",
                (!isOpen || isClosing || isOpening) && "opacity-0"
              )}
            />

            {/* 3D BOOK CLOSING LEAF */}
            {isClosing && (
              <div 
                className="pointer-events-none absolute inset-y-0 left-1/2 w-1/2 z-50 [perspective:2000px]"
                style={{
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  initial={{ rotateY: -180 }}
                  animate={{ rotateY: 0 }}
                  transition={{ 
                    duration: 0.75, 
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  onAnimationComplete={() => {
                    setIsOpen(false);
                    setIsClosing(false);
                  }}
                  style={{
                    transformOrigin: "left center",
                    transformStyle: "preserve-3d",
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <motion.div
                    aria-hidden="true"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.85, 0] }}
                    transition={{ duration: 0.75 }}
                    className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-r from-black/90 via-black/40 to-transparent"
                  />
                  <div 
                    style={{ 
                      backfaceVisibility: "hidden",
                      position: "absolute",
                      inset: 0,
                      overflow: "hidden",
                    }}
                    className="rounded-r-2xl rounded-l-md border border-white/[0.09] bg-[#191a1d] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)]"
                  >
                    <CoverContent totalAchievements={total} isTurning={true} />
                  </div>
                  <div 
                    style={{ 
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      position: "absolute",
                      inset: 0,
                      overflow: "hidden",
                    }}
                    className="border-l border-white/[0.06] bg-[#191a1d] shadow-2xl rounded-l-md"
                  >
                    {renderLeftPage(currentSpread)}
                  </div>
                </motion.div>
              </div>
            )}

            {/* 3D BOOK OPENING LEAF */}
            {isOpening && (
              <div 
                className="pointer-events-none absolute inset-y-0 left-1/2 w-1/2 z-50 [perspective:2000px]"
                style={{
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: -180 }}
                  transition={{ 
                    duration: 0.75, 
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  onAnimationComplete={() => {
                    setIsOpening(false);
                  }}
                  style={{
                    transformOrigin: "left center",
                    transformStyle: "preserve-3d",
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <motion.div
                    aria-hidden="true"
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: [0.2, 0.85, 0] }}
                    transition={{ duration: 0.75 }}
                    className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-r from-black/90 via-black/40 to-transparent"
                  />
                  <div 
                    style={{ 
                      backfaceVisibility: "hidden",
                      position: "absolute",
                      inset: 0,
                      overflow: "hidden",
                    }}
                    className="rounded-r-2xl rounded-l-md border border-white/[0.09] bg-[#191a1d] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)]"
                  >
                    <CoverContent totalAchievements={total} isTurning={true} />
                  </div>
                  <div 
                    style={{ 
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      position: "absolute",
                      inset: 0,
                      overflow: "hidden",
                    }}
                    className="w-full h-full"
                  >
                    {renderLeftPage(1)}
                  </div>
                </motion.div>
              </div>
            )}
          </div>

          {/* Physical Paper Rim Lines at Bottom */}
          <div 
            aria-hidden="true" 
            className={cn(
              "h-1 w-full bg-[#121315] border-t border-white/[0.04] transition-opacity duration-300",
              (!isOpen || isClosing || isOpening) && "opacity-0"
            )}
          />
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 📱 MOBILE VIEW: COMPACT SINGLE-PAGE AUTHENTIC BOOK CARD                   */}
      {/* ========================================================================= */}
      <div className="block md:hidden w-full max-w-[315px] sm:max-w-[340px] mx-auto">
        <div className="relative w-full h-[420px] sm:h-[440px] rounded-2xl border border-white/[0.08] bg-[#161719] shadow-[0_25px_65px_-12px_rgba(0,0,0,0.95),0_0_35px_rgba(0,0,0,0.6)] overflow-hidden">
          <AnimatePresence mode="popLayout" custom={mobileDirection}>
            <motion.div
              key={mobilePage}
              custom={mobileDirection}
              variants={mobilePageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full h-full"
            >
              {renderMobilePage(mobilePage)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🔍 IN-APP FULLSCREEN LIGHTBOX MODAL                                       */}
      {/* ========================================================================= */}
      {zoomedAchievement && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setZoomedAchievement(null)}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[92vh] bg-[#191a1d] rounded-2xl border border-white/20 p-3 sm:p-5 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between pb-3 px-1 border-b border-white/10">
              <div className="flex items-center gap-2 truncate pr-4">
                <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                <h4 className="font-mono text-xs sm:text-sm text-white truncate">
                  {zoomedAchievement.title} · {zoomedAchievement.issuer}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => setZoomedAchievement(null)}
                aria-label="Close Preview"
                className="size-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all shrink-0"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* High-Res Document Preview */}
            <div className="relative w-full h-[62vh] sm:h-[74vh] my-3 bg-[#0c0d0f] rounded-xl overflow-hidden flex items-center justify-center border border-white/10">
              <Image
                src={zoomedAchievement.certificateImage}
                alt={zoomedAchievement.title}
                fill
                sizes="100vw"
                className="object-contain p-2"
                priority
              />
            </div>

            {/* Modal Bottom Bar */}
            <div className="pt-2 px-1 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>Credential ID: {zoomedAchievement.credentialId}</span>
              <span>Press ESC or click outside to close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
