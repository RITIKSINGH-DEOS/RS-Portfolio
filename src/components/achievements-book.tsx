"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { 
  X, 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Achievement {
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
  achievements: readonly Achievement[];
}

// Visual themes per category matching Divyansh's colorful diagram grids
const CATEGORY_THEMES: Record<string, { tagBorder: string; tagText: string; tagBg: string; boxBorder: string; dotColor: string }> = {
  "Artificial Intelligence": {
    tagBorder: "border-teal-500/35",
    tagText: "text-teal-400",
    tagBg: "bg-teal-500/10",
    boxBorder: "border-teal-500/20",
    dotColor: "rgba(20, 184, 166, 0.25)",
  },
  "Cloud Architecture": {
    tagBorder: "border-sky-500/35",
    tagText: "text-sky-400",
    tagBg: "bg-sky-500/10",
    boxBorder: "border-sky-500/20",
    dotColor: "rgba(14, 165, 233, 0.25)",
  },
  "API & Backend Systems": {
    tagBorder: "border-pink-500/35",
    tagText: "text-pink-400",
    tagBg: "bg-pink-500/10",
    boxBorder: "border-pink-500/20",
    dotColor: "rgba(236, 72, 153, 0.25)",
  },
};

const DEFAULT_THEME = {
  tagBorder: "border-pink-500/35",
  tagText: "text-pink-400",
  tagBg: "bg-pink-500/10",
  boxBorder: "border-pink-500/20",
  dotColor: "rgba(236, 72, 153, 0.25)",
};

const pageTurnVariants = {
  enter: (direction: number) => ({
    rotateY: direction > 0 ? 0 : -85,
    skewY: direction > 0 ? 0 : 2,
    opacity: direction > 0 ? 1 : 0,
    filter: direction > 0 ? "brightness(0.85)" : "brightness(0.7)",
    scale: direction > 0 ? 0.99 : 0.96,
    transformOrigin: "left center",
    zIndex: direction > 0 ? 1 : 20,
  }),
  center: {
    rotateY: 0,
    skewY: 0,
    opacity: 1,
    filter: "brightness(1)",
    scale: 1,
    transformOrigin: "left center",
    zIndex: 10,
    transition: {
      duration: 0.52,
      ease: [0.25, 1, 0.5, 1],
    },
  },
  exit: (direction: number) => ({
    rotateY: direction > 0 ? -85 : 0,
    skewY: direction > 0 ? -2.5 : 0,
    opacity: direction > 0 ? 0 : 0.6,
    filter: direction > 0 ? "brightness(0.65)" : "brightness(0.8)",
    scale: direction > 0 ? 0.95 : 0.99,
    transformOrigin: "left center",
    zIndex: direction > 0 ? 20 : 1,
    boxShadow: direction > 0 
      ? "-25px 0 45px -5px rgba(0, 0, 0, 0.9)" 
      : "none",
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
    },
  }),
};

interface RightBookPageProps {
  readonly achievement: Achievement;
  readonly milestoneNumber: number;
  readonly pageNumber: number;
  readonly canGoPrev: boolean;
  readonly onNext: () => void;
  readonly onPrev: () => void;
  readonly onZoom: () => void;
}

const RightBookPage = React.memo(function RightBookPage({
  achievement,
  milestoneNumber,
  pageNumber,
  canGoPrev,
  onNext,
  onPrev,
  onZoom,
}: RightBookPageProps) {
  const theme = CATEGORY_THEMES[achievement.category] || DEFAULT_THEME;

  return (
    <div className="w-full h-full min-h-[540px] md:min-h-0 p-8 sm:p-10 md:p-12 flex flex-col justify-between bg-gradient-to-l from-[#191a1d] to-[#161719] relative select-none">
      {/* Dynamic Paper Lighting Sheen during 3D Page Turn */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        exit={{
          opacity: [0, 0.7, 0],
          background: "linear-gradient(105deg, rgba(0,0,0,0.85) 0%, rgba(255,255,255,0.08) 45%, rgba(0,0,0,0.5) 100%)",
          transition: { duration: 0.5 },
        }}
      />

      <div className="flex flex-col relative z-10">
        {/* Top Bar: Category Tag Pill + NO. 0X */}
        <div className="h-7 flex items-center justify-between">
          <span className={cn(
            "font-mono text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider font-medium border",
            theme.tagBorder,
            theme.tagText,
            theme.tagBg
          )}>
            {achievement.category}
          </span>

          <span className="font-mono text-xs text-zinc-500 tracking-[0.25em]">
            NO.  0{milestoneNumber}
          </span>
        </div>

        {/* Title Slot (Fixed Height Slot so visual box below never shifts) */}
        <div className="h-[76px] sm:h-[84px] flex items-center mt-3 mb-5">
          <h3 className="font-serif text-2xl sm:text-[28px] lg:text-[30px] font-normal text-white tracking-tight leading-[1.2] line-clamp-2">
            {achievement.title}
          </h3>
        </div>

        {/* Center Visual Box (Matching Image 1's Dotted Grid Diagram Box) */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            onZoom();
          }}
          style={{
            backgroundImage: `radial-gradient(${theme.dotColor} 1.2px, transparent 1.2px)`,
            backgroundSize: "16px 16px",
          }}
          className={cn(
            "group relative w-full aspect-[16/10] max-h-[225px] rounded-2xl border bg-[#151619] shadow-xl flex items-center justify-center cursor-pointer transition-all duration-300 p-5",
            theme.boxBorder,
            "hover:border-white/30 hover:shadow-[0_0_35px_rgba(255,255,255,0.06)]"
          )}
        >
          {/* Certificate Plate Card Mount */}
          <div className="relative w-48 sm:w-56 aspect-[16/10] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center p-3 transition-transform duration-300 group-hover:scale-105">
            <Image
              src={achievement.certificateImage}
              alt={achievement.title}
              fill
              sizes="(max-width: 768px) 90vw, 400px"
              className="object-contain p-2"
              priority
            />
          </div>

          {/* Hover Inspect Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 backdrop-blur-[2px] rounded-2xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-black font-mono text-xs font-semibold shadow-lg">
              Inspect Full Resolution
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Date & Next Page Turn Control */}
      <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between mt-auto relative z-10">
        <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
          {achievement.date}  ·  VERIFIED
        </span>

        <div className="flex items-center gap-4 sm:gap-5">
          {canGoPrev && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-zinc-400 uppercase tracking-wider hover:text-white transition-colors group/prev focus:outline-none"
              aria-label="Previous Page"
            >
              <ArrowLeft className="size-3.5 transition-transform duration-200 group-hover/prev:-translate-x-1" />
              <span>PREV</span>
            </button>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-white uppercase tracking-wider hover:text-red-400 dark:hover:text-blue-400 transition-colors group/next focus:outline-none"
            aria-label="Next Page"
          >
            <span>NEXT</span>
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/next:translate-x-1" />
          </button>

          <span className="font-mono text-xs text-zinc-600 tabular-nums">
            {pageNumber}
          </span>
        </div>
      </div>
    </div>
  );
});

export function AchievementsBook({ achievements }: AchievementsBookProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);

  const total = achievements.length;
  const current = achievements[activeIndex] || achievements[0];

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
  }, [total]);

  const handleSelect = useCallback((idx: number) => {
    if (idx === activeIndex) return;
    setDirection(idx > activeIndex ? 1 : -1);
    setActiveIndex(idx);
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isZoomed) {
        setIsZoomed(false);
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isZoomed, handlePrev, handleNext]);

  return (
    <div className="w-[94vw] max-w-5xl relative left-1/2 -translate-x-1/2 py-4 select-none">
      {/* Soft Ambient Glow Behind Book */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-20 bg-gradient-to-r from-red-500/10 via-blue-500/15 to-red-500/10 blur-3xl rounded-full opacity-50" 
      />

      {/* The Physical Open Book Spread (Landscape Aspect Ratio) */}
      <div className="relative rounded-2xl sm:rounded-3xl border border-white/[0.07] bg-[#191a1d] shadow-[0_25px_65px_-12px_rgba(0,0,0,0.95),0_0_40px_rgba(0,0,0,0.6)] overflow-hidden">
        
        {/* Soft Realistic Inward Spine Fold Shadow */}
        <div 
          aria-hidden="true"
          className="hidden md:block pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-20 z-30 bg-gradient-to-r from-transparent via-black/40 to-transparent"
        />

        {/* 1px Center Crease Line */}
        <div 
          aria-hidden="true" 
          className="hidden md:block pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] z-30 bg-white/[0.04]" 
        />

        {/* 2-Page Spread Grid with Fixed Rock-Solid Height */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:h-[620px]">

          {/* ========================================================================= */}
          {/* 📄 LEFT PAGE: CONTENTS                                                    */}
          {/* ========================================================================= */}
          <div className="p-8 sm:p-10 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/[0.06] bg-gradient-to-r from-[#191a1d] to-[#161719] relative md:h-full">
            
            <div className="flex flex-col">
              {/* Top Label */}
              <div className="pb-4">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500 font-medium">
                  CONTENTS
                </span>
              </div>

              {/* Numbered Achievements List */}
              <div className="divide-y divide-white/[0.06]">
                {achievements.map((item, idx) => {
                  const isSelected = idx === activeIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelect(idx)}
                      className={cn(
                        "w-full py-3.5 flex items-center justify-between text-left transition-colors duration-150 group focus:outline-none",
                        isSelected ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                      )}
                    >
                      <div className="flex items-center gap-4 min-w-0 pr-4">
                        <span className={cn(
                          "font-mono text-xs tabular-nums transition-colors",
                          isSelected 
                            ? "text-red-400 dark:text-blue-400 font-semibold" 
                            : "text-zinc-600 group-hover:text-zinc-400"
                        )}>
                          0{idx + 1}
                        </span>
                        <span className={cn(
                          "font-serif text-base sm:text-lg md:text-[17px] tracking-tight truncate transition-colors",
                          isSelected ? "text-white font-medium" : "text-zinc-400 group-hover:text-zinc-200"
                        )}>
                          {item.title}
                        </span>
                      </div>

                      <span className="font-mono text-xs text-zinc-600 shrink-0 tabular-nums">
                        {idx * 2 + 3}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Left Footer: Turn Page Hint & Page Number */}
            <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between mt-auto">
              <span className="font-serif italic text-xs text-zinc-500">
                Click a page to turn it.
              </span>

              <span className="font-mono text-xs text-zinc-600 tabular-nums">
                2
              </span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 📄 RIGHT PAGE: THE REALISTIC 3D TURNING BOOK PAGE                         */}
          {/* ========================================================================= */}
          <div className="relative min-h-[540px] md:min-h-0 md:h-full w-full overflow-hidden [perspective:1600px] bg-[#161719]">
            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
              <motion.div
                key={current.id}
                custom={direction}
                variants={pageTurnVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                }}
                className="w-full h-full"
              >
                <RightBookPage
                  achievement={current}
                  milestoneNumber={activeIndex + 1}
                  pageNumber={activeIndex * 2 + 3}
                  canGoPrev={activeIndex > 0}
                  onNext={handleNext}
                  onPrev={handlePrev}
                  onZoom={() => setIsZoomed(true)}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Physical Paper Rim Lines at Bottom */}
        <div 
          aria-hidden="true" 
          className="h-1 w-full bg-[#121315] border-t border-white/[0.04]"
        />
      </div>

      {/* ========================================================================= */}
      {/* 🔍 IN-APP FULLSCREEN LIGHTBOX MODAL                                       */}
      {/* ========================================================================= */}
      {isZoomed && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setIsZoomed(false)}
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
                  {current.title} · {current.issuer}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => setIsZoomed(false)}
                aria-label="Close Preview"
                className="size-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all shrink-0"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* High-Res Document Preview */}
            <div className="relative w-full h-[62vh] sm:h-[72vh] my-3 bg-[#0c0d0f] rounded-xl overflow-hidden flex items-center justify-center border border-white/10">
              <Image
                src={current.certificateImage}
                alt={current.title}
                fill
                sizes="100vw"
                className="object-contain p-2"
                priority
              />
            </div>

            {/* Modal Bottom Bar */}
            <div className="pt-2 px-1 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>Credential ID: {current.credentialId}</span>
              <span>Press ESC or click outside to close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
