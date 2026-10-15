"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Mouse Wheel / Trackpad smooth scroll handler
  const handleWheel = (e: React.WheelEvent) => {
    // Detect horizontal scroll or vertical scroll intent
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 18 || wheelLock.current) return;

    if (delta > 0) {
      handleNext();
    } else {
      handlePrev();
    }

    wheelLock.current = true;
    setTimeout(() => {
      wheelLock.current = false;
    }, 420); // 420ms cooldown for smooth, controlled paging rhythm
  };

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
      onWheel={handleWheel}
      className="relative w-full overflow-hidden py-4 select-none"
    >
      {/* 3D Perspective Stage - Spans full width */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{ perspective: isMobile ? "900px" : "1300px" }}
        className="relative w-full h-[360px] sm:h-[440px] md:h-[490px] flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        {/* Subtle floor ambient shadow for 3D depth */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-14 bg-gradient-to-r from-red-500/15 via-blue-500/20 to-red-500/15 blur-3xl rounded-full opacity-70"
        />

        {projects.map((project, index) => {
          const offset = index - activeIndex;
          const isActive = offset === 0;
          const caseStudySlug = PROJECT_SLUGS[project.title];
          const targetUrl = caseStudySlug ? `/projects/${caseStudySlug}` : (project.href || "#");

          // Dynamic spacing based on screen width
          const stepX = isMobile ? 240 : 460;
          const stepZ = isMobile ? 85 : 140;
          const stepRotate = isMobile ? 22 : 30;

          // Compute 3D Cylindrical transform values
          let xPx = offset * stepX + (isDragging ? dragOffset : 0);
          let rotateY = -offset * stepRotate;
          let zPx = -Math.abs(offset) * stepZ;
          let scale = 1 - Math.abs(offset) * 0.12;
          let opacity = 1 - Math.abs(offset) * 0.35;
          let zIndex = 30 - Math.abs(offset) * 10;

          if (scale < 0.65) scale = 0.65;
          if (opacity < 0.15) opacity = 0.15;
          if (zIndex < 1) zIndex = 1;

          return (
            <div
              key={project.title}
              onClick={() => {
                if (!isActive && Math.abs(dragOffset) < 10) {
                  setActiveIndex(index);
                }
              }}
              style={{
                transform: `translate3d(calc(-50% + ${xPx}px), -50%, ${zPx}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                zIndex,
                transition: isDragging
                  ? "transform 0.08s linear"
                  : "transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s ease, z-index 0.75s step-end",
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
                  : "hover:opacity-80"
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

                {/* Dark Vignette Overlay for Text Legibility (Jesper Landberg style) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

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

      {/* Controls Bar: Prev Button, Dots, Next Button */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous Project"
          className="size-9 rounded-full border border-black/10 dark:border-white/15 bg-card/60 dark:bg-zinc-900/60 flex items-center justify-center text-foreground hover:bg-black/5 dark:hover:bg-white/10 hover:border-red-500/40 active:scale-95 transition-all shadow-sm"
        >
          <ChevronLeft className="size-4" />
        </button>

        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-card/40 dark:bg-zinc-900/40 backdrop-blur-md">
          {projects.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to project ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === activeIndex
                  ? "w-6 bg-red-500 dark:bg-blue-400"
                  : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next Project"
          className="size-9 rounded-full border border-black/10 dark:border-white/15 bg-card/60 dark:bg-zinc-900/60 flex items-center justify-center text-foreground hover:bg-black/5 dark:hover:bg-white/10 hover:border-blue-500/40 active:scale-95 transition-all shadow-sm"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <p className="mt-2 text-center font-mono text-[10px] text-muted-foreground/60 uppercase tracking-widest">
        Scroll with Mouse Wheel or Drag · Click ↗ to Open
      </p>
    </div>
  );
}
