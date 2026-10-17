"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { 
  X, 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft,
  Maximize2,
  BookOpen,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

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
    <div className="relative w-full h-full rounded-r-2xl rounded-l-md bg-gradient-to-br from-[#1b1c1f] via-[#16171a] to-[#121315] border border-white/[0.09] flex flex-col justify-between p-7 sm:p-9 select-none overflow-hidden">
      {/* Left Spine Texture & Embossed Ridges */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-y-0 left-0 w-5 bg-gradient-to-r from-[#0a0b0c] via-[#141518] to-transparent border-r border-white/[0.04]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute top-12 left-0 w-4 h-[1.5px] bg-white/[0.08]" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-12 left-0 w-4 h-[1.5px] bg-white/[0.08]" />

      {/* Right Paper Stack Edge (Simulating Realistic Physical Book Pages Block) */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-y-2 right-0 w-2.5 rounded-r-sm bg-gradient-to-l from-white/[0.12] via-zinc-600/20 to-transparent shadow-inner"
      />

      {/* Soft Leatherette Sheen Overlay */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.05] rounded-r-2xl" 
      />

      {/* Cover Header */}
      <div className="relative z-10 pl-2">
        <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-zinc-500 font-medium">
          VOL. 01 · FIELD NOTES
        </span>

        <div className="mt-5 space-y-1">
          <h3 className="font-serif text-2xl sm:text-[27px] font-normal text-white tracking-tight leading-[1.18]">
            Verified Milestones &
          </h3>
          <p className="font-serif italic text-2xl sm:text-[27px] font-normal bg-gradient-to-r from-red-500 via-rose-500 to-blue-500 bg-clip-text text-transparent tracking-tight">
            achievements
          </p>
        </div>

        <p className="font-sans text-xs text-zinc-400 mt-4 leading-relaxed font-light line-clamp-3">
          A permanent dossier of verified honors, certifications, and virtual engineering milestones.
        </p>
      </div>

      {/* Center Spider Web Silk Threads & Nodes Network */}
      <div className="relative z-10 my-auto py-4 flex items-center justify-center">
        <svg className="w-56 h-14 overflow-visible opacity-85 group-hover:opacity-100 transition-opacity" viewBox="0 0 200 40">
          {/* Spider Silk Connecting Filaments */}
          <path 
            d="M 20 25 L 60 12 L 100 28 L 140 10 L 180 22" 
            fill="none" 
            stroke="rgba(220,38,38,0.45)" 
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <path 
            d="M 20 25 L 100 28 L 180 22" 
            fill="none" 
            stroke="rgba(37,99,235,0.35)" 
            strokeWidth="1"
            strokeDasharray="2 4"
          />
          {/* Glowing Spider-Man Nodes (Red & Royal Blue) */}
          <circle cx="20" cy="25" r="4.5" fill="#dc2626" className="drop-shadow-[0_0_10px_rgba(220,38,38,0.95)]" />
          <circle cx="60" cy="12" r="4.5" fill="#2563eb" className="drop-shadow-[0_0_10px_rgba(37,99,235,0.95)]" />
          <circle cx="100" cy="28" r="5" fill="#ef4444" className="drop-shadow-[0_0_12px_rgba(239,68,68,1)]" />
          <circle cx="140" cy="10" r="4.5" fill="#3b82f6" className="drop-shadow-[0_0_10px_rgba(59,130,246,0.95)]" />
          <circle cx="180" cy="22" r="4.5" fill="#dc2626" className="drop-shadow-[0_0_10px_rgba(220,38,38,0.95)]" />
        </svg>
      </div>

      {/* Cover Footer & Open Prompt */}
      <div className="relative z-10 pl-2">
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-300 font-medium">
            RITIK SINGH
          </span>

          <span className="font-mono text-xs text-zinc-500 tabular-nums">
            {totalAchievements} HONORS
          </span>
        </div>

        {!isTurning && (
          <div className="mt-3 flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-white font-mono text-[11px] group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-blue-600 group-hover:border-transparent transition-all shadow-[0_0_15px_rgba(220,38,38,0.2)]">
              <BookOpen className="size-3 text-red-400 group-hover:text-white" />
              <span>Click to Open Book</span>
              <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function ClosedBookCover({ totalAchievements, onOpen }: ClosedCoverProps) {
  return (
    <div className="w-full flex items-center justify-center py-6 select-none [perspective:1600px]">
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
        className="group relative w-[310px] sm:w-[350px] md:w-[380px] h-[460px] sm:h-[490px] rounded-r-2xl rounded-l-md shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),0_0_35px_rgba(0,0,0,0.6)] cursor-pointer transition-shadow duration-300 hover:shadow-[0_35px_80px_-10px_rgba(0,0,0,0.98),0_0_45px_rgba(255,255,255,0.06)] overflow-hidden"
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
    <div className="w-full h-full px-8 py-7 sm:px-10 sm:py-8 md:px-12 md:pt-9 md:pb-8 flex flex-col justify-between bg-gradient-to-r from-[#191a1d] to-[#161719] relative select-none">
      <div className="flex flex-col">
        {/* Top Label */}
        <div className="pb-3">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500 font-medium">
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
                className="w-full py-3 sm:py-3.5 flex items-center justify-between text-left transition-colors duration-150 group focus:outline-none text-zinc-400 hover:text-white"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 pr-3 sm:pr-4">
                  <span className="font-mono text-xs tabular-nums text-zinc-600 group-hover:text-red-400 transition-colors">
                    0{idx + 1}
                  </span>
                  <span className="font-serif text-[15px] sm:text-base tracking-tight truncate group-hover:text-white transition-colors">
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
      <div className="pt-3.5 border-t border-white/[0.06] flex items-center justify-between mt-auto">
        <span className="font-serif italic text-xs text-zinc-500">
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
// 📄 3. MILESTONE PAGE (USED ON BOTH LEFT & RIGHT SIDES OF SPREADS)
// =========================================================================
interface MilestonePageProps {
  readonly achievement: Achievement;
  readonly milestoneNumber: number;
  readonly pageNumber: number;
  readonly isRightSide: boolean;
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
  isRightSide,
  canGoNext,
  canGoPrev,
  onNext,
  onPrev,
  onZoom,
}: MilestonePageProps) {
  return (
    <div className={cn(
      "w-full h-full px-8 py-7 sm:px-10 sm:py-8 md:px-12 md:pt-9 md:pb-8 flex flex-col justify-between relative select-none",
      isRightSide 
        ? "bg-gradient-to-l from-[#191a1d] to-[#161719]" 
        : "bg-gradient-to-r from-[#191a1d] to-[#161719]"
    )}>
      <div className="flex flex-col relative z-10">
        {/* Top Bar: Spider-Theme Category Tag Pill + NO. 0X */}
        <div className="h-7 flex items-center justify-between">
          <span className={cn(
            "font-mono text-[10px] sm:text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider font-semibold border flex items-center gap-1.5",
            SPIDER_THEME.tagBorder,
            SPIDER_THEME.tagText,
            SPIDER_THEME.tagBg,
            SPIDER_THEME.tagGlow
          )}>
            <span className="size-1.5 rounded-full bg-red-500 animate-pulse" />
            <span>{achievement.category}</span>
          </span>

          <span className="font-mono text-xs text-zinc-500 tracking-[0.25em]">
            NO.  0{milestoneNumber}
          </span>
        </div>

        {/* Title Slot (Compact and refined) */}
        <div className="min-h-[28px] sm:min-h-[32px] flex items-center mt-2 mb-2">
          <h3 className="font-serif text-[15px] sm:text-base md:text-[17px] font-normal text-white tracking-tight leading-snug line-clamp-1 sm:line-clamp-2">
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
            "group relative w-full h-[250px] sm:h-[265px] md:h-[270px] rounded-xl sm:rounded-2xl border bg-[#141518] shadow-xl flex items-center justify-center cursor-pointer transition-all duration-300 p-2 sm:p-2.5",
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
              sizes="(max-width: 768px) 90vw, 420px"
              className="object-contain"
              priority
            />
          </div>

          {/* Subtle Corner Expand Indicator */}
          <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-white font-mono text-[10px] border border-white/20 shadow-md">
              <Maximize2 className="size-3 text-white" />
              <span>Zoom</span>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-3.5 border-t border-white/[0.06] flex items-center justify-between mt-auto relative z-10">
        <div className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-red-500/80" />
          <span className="font-mono text-[11px] sm:text-xs text-zinc-400 uppercase tracking-widest">
            {achievement.date}  ·  VERIFIED
          </span>
        </div>

        <div className="flex items-center gap-4 sm:gap-5">
          {/* Optional Prev on Left Page */}
          {!isRightSide && canGoPrev && onPrev && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-zinc-400 uppercase tracking-wider hover:text-red-400 transition-colors group/prev focus:outline-none"
              aria-label="Previous Page"
            >
              <ArrowLeft className="size-3.5 transition-transform duration-200 group-hover/prev:-translate-x-1" />
              <span>PREV</span>
            </button>
          )}

          {/* Next Button on Right Page */}
          {isRightSide && onNext && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-white uppercase tracking-wider hover:text-red-400 transition-colors group/next focus:outline-none"
              aria-label="Next Page"
            >
              <span>READ</span>
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/next:translate-x-1" />
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
// 📄 4. EPILOGUE PAGE (SPREAD 3 LEFT PAGE: ROADMAP & FUTURE PURSUITS)
// =========================================================================
interface AfterwordPageProps {
  readonly totalAchievements: number;
  readonly onReturnToContents: () => void;
}

function AfterwordPage({ totalAchievements, onReturnToContents }: AfterwordPageProps) {
  return (
    <div className="w-full h-full px-8 py-7 sm:px-10 sm:py-8 md:px-12 md:pt-8 md:pb-7 flex flex-col justify-between bg-gradient-to-r from-[#191a1d] to-[#161719] relative select-none">
      <div className="flex flex-col relative z-10">
        {/* Top Label */}
        <div className="flex items-center justify-between pb-2">
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-red-400 font-semibold flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-red-500 animate-pulse" />
            <span>EPILOGUE · NEXT OBJECTIVES</span>
          </span>

          <span className="font-mono text-xs text-zinc-500 tracking-[0.25em]">
            2026 // ROADMAP
          </span>
        </div>

        {/* Headline */}
        <div className="mt-2.5 space-y-1.5">
          <h3 className="font-serif text-xl sm:text-2xl md:text-[23px] font-normal text-white tracking-tight leading-snug">
            The Journey Doesn’t End On Paper.
          </h3>
          <p className="font-sans text-xs sm:text-[13px] text-zinc-400 leading-relaxed font-light">
            Certificates verify the foundation. Real growth happens in the lab while shipping code and solving hard engineering problems.
          </p>
        </div>

        {/* 3 Active Engineering Quests */}
        <div className="mt-3.5 space-y-2">
          <div className="p-2 sm:p-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center justify-between hover:border-red-500/30 transition-colors group/item">
            <div className="flex items-center gap-2.5 min-w-0 pr-2">
              <span className="size-6 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0 font-mono text-[11px] font-bold">
                01
              </span>
              <div className="truncate">
                <p className="font-mono text-xs text-zinc-200 group-hover/item:text-white transition-colors truncate">
                  Autonomous AI Agents & RAG Swarms
                </p>
                <p className="font-mono text-[10px] text-zinc-500 truncate">
                  Multi-modal reasoning & LLM workflows
                </p>
              </div>
            </div>
            <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/25 shrink-0">
              Active
            </span>
          </div>

          <div className="p-2 sm:p-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center justify-between hover:border-blue-500/30 transition-colors group/item">
            <div className="flex items-center gap-2.5 min-w-0 pr-2">
              <span className="size-6 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 font-mono text-[11px] font-bold">
                02
              </span>
              <div className="truncate">
                <p className="font-mono text-xs text-zinc-200 group-hover/item:text-white transition-colors truncate">
                  Distributed Cloud Architecture
                </p>
                <p className="font-mono text-[10px] text-zinc-500 truncate">
                  Event-driven microservices & scalability
                </p>
              </div>
            </div>
            <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/25 shrink-0">
              Building
            </span>
          </div>

          <div className="p-2 sm:p-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center justify-between hover:border-red-500/30 transition-colors group/item">
            <div className="flex items-center gap-2.5 min-w-0 pr-2">
              <span className="size-6 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0 font-mono text-[11px] font-bold">
                03
              </span>
              <div className="truncate">
                <p className="font-mono text-xs text-zinc-200 group-hover/item:text-white transition-colors truncate">
                  Production Full-Stack AI Ecosystems
                </p>
                <p className="font-mono text-[10px] text-zinc-500 truncate">
                  Next.js, FastAPI, Vector DBs, & WebSockets
                </p>
              </div>
            </div>
            <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 shrink-0">
              Deployed
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Jump Back to Contents */}
      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between mt-auto relative z-10">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onReturnToContents();
          }}
          className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-white uppercase tracking-wider hover:text-red-400 transition-colors group focus:outline-none"
        >
          <span>ALL ACHIEVEMENTS ({totalAchievements})</span>
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1 text-red-400" />
        </button>

        <span className="font-mono text-xs text-zinc-600 tabular-nums">
          6
        </span>
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
      className="w-full h-full px-8 py-7 sm:px-10 sm:py-8 md:px-12 md:pt-8 md:pb-7 flex flex-col justify-between bg-gradient-to-l from-[#191a1d] to-[#161719] relative select-none cursor-pointer group"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2">
        <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-zinc-500 font-medium">
          DOSSIER // ARCHIVED
        </span>

        <span className="font-mono text-[10px] sm:text-[11px] text-zinc-500 uppercase tracking-widest">
          VOL. 01 SEAL
        </span>
      </div>

      {/* Centerpiece: Glowing Spider Crest + To Be Continued */}
      <div className="flex-1 flex flex-col items-center justify-center my-auto space-y-3 py-1">
        {/* Animated Spider Crest Seal */}
        <div className="relative size-16 sm:size-18 flex items-center justify-center">
          {/* Rotating outer web ring */}
          <div className="absolute inset-0 rounded-full border border-red-500/25 animate-[spin_20s_linear_infinite]" />
          <div className="absolute inset-1.5 rounded-full border border-blue-500/20 border-dashed animate-[spin_15s_linear_infinite_reverse]" />
          {/* Spider-Sense Glow */}
          <div className="absolute inset-3 rounded-full bg-gradient-to-br from-red-600/25 via-transparent to-blue-600/25 blur-md" />

          {/* Spider Icon */}
          <svg className="size-9 sm:size-10 drop-shadow-[0_0_14px_rgba(220,38,38,0.95)] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 40 40" fill="none">
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

        {/* Narrative Headline */}
        <div className="text-center space-y-1">
          <h4 className="font-serif italic text-2xl sm:text-[26px] bg-gradient-to-r from-red-500 via-rose-500 to-blue-500 bg-clip-text text-transparent tracking-tight leading-tight">
            To Be Continued...
          </h4>
          <p className="font-mono text-[10px] sm:text-[11px] text-zinc-400">
            More milestones unlocking as new projects launch.
          </p>
        </div>

        {/* Ritik's Spider Motto */}
        <div className="max-w-[280px] text-center border-y border-white/[0.06] py-1.5 px-3">
          <p className="font-serif italic text-xs text-zinc-400 leading-snug">
            &ldquo;With great power comes great responsibility to write clean code.&rdquo;
          </p>
          <span className="font-mono text-[10px] text-red-400 font-semibold uppercase tracking-wider block mt-0.5">
            — Ritik Singh
          </span>
        </div>

        {/* Prominent Tactile Close Button Pill */}
        <div className="pt-0.5">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-white font-mono text-[11px] font-medium shadow-[0_0_18px_rgba(220,38,38,0.25)] group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-blue-600 group-hover:border-transparent group-hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] transition-all">
            <BookOpen className="size-3 text-red-400 group-hover:text-white" />
            <span>Click to Close Book</span>
          </span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between mt-auto">
        <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
          REF: RS-2026-V1
        </span>

        <span className="font-mono text-xs text-zinc-600 tabular-nums">
          7
        </span>
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
        {/* Dynamic Paper Spine Shadow Drop */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ duration: 0.65 }}
          className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-r from-black/80 via-black/20 to-transparent"
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
// 🏛️ MAIN ACHIEVEMENTS BOOK COMPONENT
// =========================================================================
export function AchievementsBook({ achievements }: AchievementsBookProps) {
  // isOpen: true = open 2-page spread; false = closed 3D cover
  const [isOpen, setIsOpen] = useState(true);

  // Smooth 3D physical cover transitions
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  // currentSpread: 1 = Contents & No.1, 2 = No.2 & No.3, 3 = Afterword & Fin
  const [currentSpread, setCurrentSpread] = useState(1);
  const [targetSpread, setTargetSpread] = useState<number | null>(null);
  const [isTurning, setIsTurning] = useState(false);
  const [turnDirection, setTurnDirection] = useState<1 | -1>(1);

  // Fullscreen Zoom Lightbox
  const [zoomedAchievement, setZoomedAchievement] = useState<Achievement | null>(null);

  const total = achievements.length;
  const maxSpread = 3; // Spread 1, Spread 2, Spread 3 (Afterword/Fin)

  const handleClose = useCallback(() => {
    if (isTurning || isClosing || isOpening) return;
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsOpen(false);
      return;
    }
    setIsClosing(true);
  }, [isTurning, isClosing, isOpening]);

  const handleOpen = useCallback(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsOpen(true);
      setCurrentSpread(1);
      return;
    }
    setIsOpen(true);
    setCurrentSpread(1);
    setIsOpening(true);
  }, []);

  const turnToSpread = useCallback((newSpread: number) => {
    if (isTurning || isClosing || isOpening || newSpread === currentSpread || newSpread < 1 || newSpread > maxSpread) return;
    const direction: 1 | -1 = newSpread > currentSpread ? 1 : -1;
    setTurnDirection(direction);
    setTargetSpread(newSpread);
    setIsTurning(true);
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

  // Map spread to Left & Right pages
  // Spread 1: Left = Contents, Right = Achievement[0] (IBM)
  // Spread 2: Left = Achievement[1] (Google), Right = Achievement[2] (Postman)
  // Spread 3: Left = Afterword/Roadmap, Right = Fin/Dossier Seal

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
    // Spread 3: Epilogue / Roadmap
    return (
      <AfterwordPage 
        totalAchievements={total} 
        onReturnToContents={() => {
          turnToSpread(1);
        }} 
      />
    );
  }, [achievements, currentSpread, isTurning, isClosing, isOpening, total, turnToSpread, handlePrev]);

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
        if (isOpen && !isClosing && !isOpening) handleNext();
      } else if (e.key === "ArrowLeft") {
        if (isOpen && !isClosing && !isOpening) handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isClosing, isOpening, zoomedAchievement, handleNext, handlePrev, handleClose]);

  return (
    <div className="w-[92vw] max-w-[768px] relative left-1/2 -translate-x-1/2 py-2 select-none">
      {/* Soft Ambient Glow Behind Book (Spider Theme Red & Blue) */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-20 bg-gradient-to-r from-red-600/15 via-blue-600/15 to-red-600/15 blur-2xl rounded-full opacity-60" 
      />

      <AnimatePresence>
        {!isOpen ? (
          /* ========================================================================= */
          /* 📕 3D CLOSED BOOK COVER VIEW                                              */
          /* ========================================================================= */
          <motion.div
            key="closed-book-cover"
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
          >
            <ClosedBookCover 
              totalAchievements={total} 
              onOpen={handleOpen} 
            />
          </motion.div>
        ) : (
          /* ========================================================================= */
          /* 📖 2-PAGE SPREAD BOOK VIEW                                                */
          /* ========================================================================= */
          <motion.div
            key="open-book-spread"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: isClosing ? ["0%", "-25%"] : isOpening ? ["-25%", "0%"] : "0%"
            }}
            transition={{ 
              x: { duration: 0.75, ease: [0.33, 1, 0.68, 1] },
              duration: 0.25 
            }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
            className={cn(
              "relative rounded-2xl overflow-hidden transition-colors duration-300",
              isClosing 
                ? "bg-transparent border-transparent shadow-none" 
                : "border border-white/[0.08] bg-[#191a1d] shadow-[0_25px_65px_-12px_rgba(0,0,0,0.95),0_0_40px_rgba(0,0,0,0.6)]"
            )}
          >
            {/* Soft Realistic Inward Spine Fold Shadow */}
            <div 
              aria-hidden="true"
              className={cn(
                "hidden md:block pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-20 z-30 bg-gradient-to-r from-transparent via-black/45 to-transparent transition-opacity duration-300",
                isClosing && "opacity-0"
              )}
            />

            {/* 1px Center Crease Line */}
            <div 
              aria-hidden="true" 
              className={cn(
                "hidden md:block pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] z-30 bg-white/[0.04] transition-opacity duration-300",
                isClosing && "opacity-0"
              )}
            />

            {/* Top Right Close Bookmark Button (Lets users re-close the book anytime) */}
            <button
              type="button"
              onClick={handleClose}
              disabled={isClosing || isOpening}
              className={cn(
                "absolute top-3.5 right-4 z-30 font-mono text-[10px] text-zinc-500 hover:text-white uppercase tracking-wider flex items-center gap-1 bg-black/40 hover:bg-black/70 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-md transition-all disabled:opacity-40",
                (isClosing || isOpening) && "opacity-0 pointer-events-none"
              )}
              title="Close Book"
            >
              <span>Close Cover</span>
              <X className="size-3" />
            </button>

            {/* 2-Page Spread Grid (Fixed Height 490px) */}
            <div className="grid grid-cols-1 md:grid-cols-2 md:h-[490px] relative">
              {/* LEFT PAGE (Underneath Base) */}
              <div 
                onClick={() => {
                  if (!isClosing && !isOpening && currentSpread > 1) handlePrev();
                }}
                className={cn(
                  "border-b md:border-b-0 md:border-r border-white/[0.06] relative md:h-full transition-opacity duration-200",
                  !isClosing && !isOpening && currentSpread > 1 && "cursor-pointer",
                  isClosing && "opacity-0 pointer-events-none"
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
                  if (!isClosing && !isOpening && currentSpread < maxSpread) handleNext();
                }}
                className={cn(
                  "relative md:h-full transition-all duration-300",
                  !isClosing && !isOpening && currentSpread < maxSpread && "cursor-pointer",
                  isClosing && "rounded-r-2xl rounded-l-md border border-white/[0.09] bg-[#161719] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)]"
                )}
              >
                {renderRightPage(
                  isTurning && targetSpread !== null && turnDirection === 1 
                    ? targetSpread 
                    : currentSpread
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

              {/* 3D BOOK CLOSING LEAF (TURNS FROM LEFT TO RIGHT LIKE A REAL HARDCOVER TURNING CLOSED) */}
              {isClosing && (
                <div 
                  className="hidden md:block pointer-events-none absolute inset-y-0 left-1/2 w-1/2 z-50 [perspective:2000px]"
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
                      ease: [0.33, 1, 0.68, 1], // Smooth physical hardbound closing momentum
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
                    {/* Dynamic Hardbound Closing Shadow Drop */}
                    <motion.div
                      aria-hidden="true"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.85, 0] }}
                      transition={{ duration: 0.75 }}
                      className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-r from-black/90 via-black/40 to-transparent"
                    />

                    {/* FRONT FACE (The Hardbound Leatherette Cover!) */}
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

                    {/* BACK FACE (The Outgoing Left Page) */}
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

              {/* 3D BOOK OPENING LEAF (TURNS FROM RIGHT TO LEFT TO REVEAL THE SPREAD) */}
              {isOpening && (
                <div 
                  className="hidden md:block pointer-events-none absolute inset-y-0 left-1/2 w-1/2 z-50 [perspective:2000px]"
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
                      ease: [0.33, 1, 0.68, 1], // Smooth physical hardbound opening momentum
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
                    {/* Dynamic Opening Shadow Drop */}
                    <motion.div
                      aria-hidden="true"
                      initial={{ opacity: 0.2 }}
                      animate={{ opacity: [0.2, 0.85, 0] }}
                      transition={{ duration: 0.75 }}
                      className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-r from-black/90 via-black/40 to-transparent"
                    />

                    {/* FRONT FACE (Cover being opened away) */}
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

                    {/* BACK FACE (Contents Page landing on Left) */}
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
                isClosing && "opacity-0"
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>

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
