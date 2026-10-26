"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const PROJECT_SLUGS: Record<string, string> = {
  "ResumeAI": "resume-ai",
  "MedConnect": "medconnect",
  "AI Learning Assistant": "ai-learning-assistant",
  "Support AI": "support-ai",
};

interface ProjectItem {
  title: string;
  href?: string;
  description: string;
  dates?: string;
  technologies?: readonly string[];
  link?: string;
  image?: string;
  video?: string;
}

interface Props {
  projects: readonly ProjectItem[];
}

export function CurvedProjectCarousel({ projects }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const wheelLock = useRef(false);
  const total = projects.length;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
  }, [total]);

  const activeIndexRef = useRef(activeIndex);
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Boundary-aware wheel listener: cycles cards and smoothly passes through at boundaries
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      const isOverCard = target?.closest('[data-project-card="true"]');
      if (!isOverCard) {
        // Cursor is outside cards: allow natural page scroll
        return;
      }

      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const delta = isHorizontal ? e.deltaX : e.deltaY;

      if (Math.abs(delta) < 12) return;

      const currentIdx = activeIndexRef.current;
      const isScrollingDown = delta > 0;
      const isScrollingUp = delta < 0;

      // Boundary check:
      // When at the last card and scrolling down, allow natural page scroll down
      if (isScrollingDown && currentIdx >= total - 1) {
        return;
      }

      // When at the first card and scrolling up, allow natural page scroll up
      if (isScrollingUp && currentIdx <= 0) {
        return;
      }

      // Inside carousel range: intercept wheel to cycle cards smoothly and STOP page/Lenis scroll
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation?.();
      (e as any).lenisStopPropagation = true;

      if (wheelLock.current) return;

      if (isScrollingDown) {
        setActiveIndex((prev) => Math.min(prev + 1, total - 1));
      } else {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }

      wheelLock.current = true;
      setTimeout(() => {
        wheelLock.current = false;
      }, 420); // 420ms cooldown synchronized with smooth 0.46s transition duration
    };

    el.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => el.removeEventListener("wheel", onWheel, { capture: true });
  }, [total]);

  // Pointer / Mouse Drag & Swipe Handlers with live tracking
  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    setIsDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging || dragStartX.current === null) return;
    const diff = e.clientX - dragStartX.current;
    // Dampen drag offset for smooth feel
    setDragOffset(diff * 0.7);
  };

  const onPointerUp = () => {
    if (!isDragging) return;
    if (dragOffset > 40) {
      handlePrev();
    } else if (dragOffset < -40) {
      handleNext();
    }
    dragStartX.current = null;
    setDragOffset(0);
    setIsDragging(false);
  };

  return (
    <div
      ref={stageRef}
      className="relative w-full overflow-hidden pt-1 pb-1 sm:py-4 select-none touch-pan-y"
    >
      {/* 3D Perspective Stage - Spans full width */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{ perspective: isMobile ? "950px" : "1400px" }}
        className="relative w-full h-[245px] sm:h-[380px] md:h-[490px] flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        {/* Subtle floor ambient shadow for 3D depth */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-1 sm:bottom-4 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-10 sm:h-14 bg-gradient-to-r from-red-500/15 via-blue-500/20 to-red-500/15 blur-2xl sm:blur-3xl rounded-full opacity-70"
        />

        {projects.map((project, index) => {
          const offset = index - activeIndex;
          const isActive = offset === 0;
          const caseStudySlug = PROJECT_SLUGS[project.title];
          const targetUrl = caseStudySlug ? `/projects/${caseStudySlug}` : (project.href || "#");

          // Dynamic spacing based on screen width
          const stepX = isMobile ? 260 : 560;
          const stepZ = isMobile ? 85 : 150;
          const stepRotate = isMobile ? 20 : 25;

          // Compute 3D Cylindrical transform values
          let xPx = offset * stepX + (isDragging ? dragOffset : 0);
          let rotateY = -offset * stepRotate;
          let zPx = -Math.abs(offset) * stepZ;
          let scale = 1 - Math.abs(offset) * 0.12;
          let zIndex = isActive ? 50 : Math.max(1, 30 - Math.abs(offset) * 10);

          if (scale < 0.65) scale = 0.65;

          return (
            <div
              key={project.title}
              data-project-card="true"
              onClick={() => {
                if (!isActive && Math.abs(dragOffset) < 10) {
                  setActiveIndex(index);
                }
              }}
              style={{
                transform: `translate3d(calc(-50% + ${xPx}px), -50%, ${zPx}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex,
                willChange: "transform",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transition: isDragging
                  ? "transform 0.06s linear"
                  : "transform 0.46s cubic-bezier(0.2, 0.85, 0.25, 1)",
                transformStyle: "preserve-3d",
              }}
              className={cn(
                "absolute top-1/2 left-1/2",
                "w-[86vw] max-w-[340px] sm:max-w-[500px] md:max-w-[600px] aspect-[16/10]",
                "rounded-2xl sm:rounded-3xl overflow-hidden",
                "border border-white/10 dark:border-white/15",
                "bg-zinc-950 shadow-2xl",
                isActive
                  ? "border-red-500/50 dark:border-blue-400/50 shadow-[0_0_45px_rgba(220,38,38,0.4),0_0_25px_rgba(37,99,235,0.3)]"
                  : "cursor-pointer hover:border-white/30"
              )}
            >
              {/* Media Layer (Video or High-Res Image) */}
              <div className="relative w-full h-full overflow-hidden bg-zinc-950">
                {project.video ? (
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
                  />
                ) : project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 90vw, 600px"
                    className="object-cover object-top pointer-events-none"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 text-muted-foreground font-mono text-xs">
                    {project.title}
                  </div>
                )}

                {/* Dimming overlay on non-active cards so active card stands out */}
                <div
                  className={cn(
                    "absolute inset-0 bg-black pointer-events-none transition-opacity duration-300 z-[5]",
                    isActive ? "opacity-0" : "opacity-55"
                  )}
                />

                {/* Dark Vignette Overlay for Text Legibility (Jesper Landberg style) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none z-[6]" />

                {/* Top Badge: Counter */}
                <div className="absolute top-3.5 left-4 z-10">
                  <span className="font-mono text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white/80 border border-white/15">
                    0{index + 1} / 0{total}
                  </span>
                </div>

                {/* Bottom Meta: Title & Summary */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 z-10 flex items-end justify-between gap-3">
                  <div className="space-y-1 max-w-[80%] text-left">
                    <h3 className="font-serif text-lg sm:text-2xl font-light tracking-tight text-white drop-shadow-md">
                      {project.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-zinc-300 line-clamp-1 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Circular Action Button */}
                  {isActive ? (
                    <Link
                      href={targetUrl}
                      aria-label={`Open ${project.title} Case Study`}
                      className="size-9 sm:size-11 rounded-full bg-white text-black flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95 shrink-0"
                    >
                      <ArrowUpRight className="size-4 sm:size-5 stroke-[2.2]" />
                    </Link>
                  ) : (
                    <div className="size-8 sm:size-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center shrink-0">
                      <ArrowUpRight className="size-3.5 sm:size-4 opacity-70" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Segmented Dotted Progress Bar (Replaces old arrow buttons & dots) */}
      <div className="mt-2.5 sm:mt-5 flex flex-col items-center justify-center gap-2">
        <div className="inline-flex items-center gap-2 sm:gap-3.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-black/10 dark:border-white/10 bg-card/60 dark:bg-zinc-950/70 backdrop-blur-xl shadow-lg">
          {/* Active project number */}
          <span className="font-mono text-xs font-semibold text-foreground/90 tabular-nums">
            0{activeIndex + 1}
          </span>

          {/* Dotted / Segmented Bars */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {projects.map((project, i) => {
              const isPassed = i < activeIndex;
              const isCurrent = i === activeIndex;

              return (
                <button
                  key={project.title}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to project ${i + 1}: ${project.title}`}
                  title={`${i + 1}. ${project.title}`}
                  className="group relative h-1.5 sm:h-2 w-7 sm:w-11 rounded-full bg-black/10 dark:bg-white/15 overflow-hidden transition-all duration-300 hover:h-2.5 focus:outline-none"
                >
                  {/* Fill Progress Bar */}
                  <span
                    className={cn(
                      "absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out",
                      isPassed && "w-full bg-foreground/70 dark:bg-white/80",
                      isCurrent && "w-full bg-gradient-to-r from-red-500 via-rose-500 to-blue-500 shadow-[0_0_12px_rgba(239,68,68,0.7)]",
                      !isPassed && !isCurrent && "w-0 bg-transparent"
                    )}
                  />
                </button>
              );
            })}
          </div>

          {/* Total project count */}
          <span className="font-mono text-xs text-muted-foreground/50 tabular-nums">
            0{total}
          </span>
        </div>
      </div>
    </div>
  );
}
