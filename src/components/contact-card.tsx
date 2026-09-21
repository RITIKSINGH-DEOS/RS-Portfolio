"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DATA } from "@/data/resume";
import { ArrowUpRight, Check, Copy, Volume2, Volume1, VolumeX, Plus, Minus } from "lucide-react";
import { HeadphoneMusicDisc } from "@/components/headphone-music-disc";

function FloatingMusicNote({
  char,
  left,
  top,
  delay,
  duration,
  color,
  isPlaying,
}: {
  char: string;
  left: string;
  top: string;
  delay: number;
  duration: number;
  color: string;
  isPlaying: boolean;
}) {
  if (!isPlaying) return null;
  return (
    <motion.span
      aria-hidden="true"
      initial={{ y: 0, x: 0, opacity: 0, scale: 0.6 }}
      animate={{
        y: [0, -16, -34],
        x: [0, -5, -10],
        opacity: [0, 0.85, 0],
        scale: [0.6, 1.1, 0.8],
        rotate: [0, -14, 10],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeOut",
        delay,
      }}
      className={`absolute pointer-events-none select-none text-[11px] sm:text-xs font-bold ${color}`}
      style={{ left, top }}
    >
      {char}
    </motion.span>
  );
}

export function ContactCard() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userManuallyPausedRef = useRef(false);

  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [isMuted, setIsMuted] = useState(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number; opacity: number }>({
    x: 0,
    y: 0,
    opacity: 0,
  });

  // Autoplay music when scrolled into view, pause when scrolled away
  useEffect(() => {
    const audio = audioRef.current;
    const container = containerRef.current;
    if (!audio || !container) return;

    audio.volume = volume;

    let hasAttachedGesture = false;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!userManuallyPausedRef.current) {
              const playPromise = audio.play();
              if (playPromise !== undefined) {
                playPromise
                  .then(() => {
                    setIsPlaying(true);
                  })
                  .catch(() => {
                    if (!hasAttachedGesture) {
                      hasAttachedGesture = true;
                      const onGesture = () => {
                        if (!userManuallyPausedRef.current) {
                          audio.play().then(() => setIsPlaying(true)).catch(() => {});
                        }
                        window.removeEventListener("pointerdown", onGesture);
                        window.removeEventListener("scroll", onGesture);
                      };
                      window.addEventListener("pointerdown", onGesture, { once: true });
                      window.addEventListener("scroll", onGesture, { once: true, passive: true });
                    }
                  });
              }
            }
          } else {
            if (!audio.paused) {
              audio.pause();
              setIsPlaying(false);
            }
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      audio.pause();
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      userManuallyPausedRef.current = true;
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        userManuallyPausedRef.current = false;
      }).catch((e) => console.log("Audio play error:", e));
    }
  };

  const increaseVolume = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(false);
    setVolume((prev) => {
      const next = Math.min(1, Math.round((prev + 0.15) * 100) / 100);
      if (audioRef.current) {
        audioRef.current.volume = next;
        audioRef.current.muted = false;
      }
      return next;
    });
  };

  const decreaseVolume = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVolume((prev) => {
      const next = Math.max(0, Math.round((prev - 0.15) * 100) / 100);
      if (audioRef.current) {
        audioRef.current.volume = next;
      }
      return next;
    });
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMuted) {
      setIsMuted(false);
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.volume = volume || 0.65;
      }
      if (volume === 0) setVolume(0.65);
    } else {
      setIsMuted(true);
      if (audioRef.current) {
        audioRef.current.muted = true;
      }
    }
  };

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
      ref={containerRef}
      className="relative left-1/2 -translate-x-1/2 w-[calc(100%-20px)] max-w-[340px] sm:max-w-5xl sm:w-[90vw] md:w-[86vw] lg:w-[84vw]"
    >
      {/* Top Border Line Illustration with Interactive Lofi Music Experience */}
      <div className="relative w-full flex justify-center -mb-[1px] select-none z-10">
        <div className="relative w-[240px] sm:w-[340px] md:w-[420px] aspect-[1024/523]">
          {/* Moving Rotating Music Object inside headphone ear cup */}
          <HeadphoneMusicDisc isPlaying={isPlaying} />

          {/* Floating Lofi Music Notes emerging from soundwaves */}
          <FloatingMusicNote
            char="♪"
            left="27%"
            top="44%"
            delay={0}
            duration={3.2}
            color="text-red-500/80 dark:text-red-400/90"
            isPlaying={isPlaying}
          />
          <FloatingMusicNote
            char="♫"
            left="23%"
            top="37%"
            delay={1.2}
            duration={3.6}
            color="text-blue-500/80 dark:text-blue-400/90"
            isPlaying={isPlaying}
          />
          <FloatingMusicNote
            char="♩"
            left="20%"
            top="30%"
            delay={2.3}
            duration={3.0}
            color="text-rose-500/80 dark:text-rose-400/90"
            isPlaying={isPlaying}
          />

          {/* Glowing Inspiration Spark above Thought Bubble ("How idea's comes !") */}
          <motion.div
            aria-hidden="true"
            animate={{
              scale: [0.85, 1.3, 0.85],
              opacity: [0.4, 1, 0.4],
              rotate: [0, 20, -10, 0],
            }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute pointer-events-none select-none text-amber-500 dark:text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.65)]"
            style={{ left: "84%", top: "2%" }}
          >
            <span className="text-xs sm:text-sm font-serif">✦</span>
          </motion.div>

          {/* The line art illustration */}
          <img
            src="/listen-illustration.png"
            alt="Continuous line art illustration"
            className="relative z-10 w-full h-full object-contain object-bottom invert dark:invert-0 opacity-80 dark:opacity-90 transition-opacity duration-300 pointer-events-none"
          />

          {/* Interactive Lofi "Now Playing" Pill Badge & Volume Controls on bottom-left above baseline */}
          <div className="absolute left-1 sm:left-2 bottom-1.5 sm:bottom-2.5 z-20 pointer-events-auto flex items-center gap-1 sm:gap-1.5">
            <button
              type="button"
              onClick={togglePlay}
              className="group/track inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-black/[0.08] dark:border-white/[0.12] bg-background/85 dark:bg-zinc-900/85 backdrop-blur-md shadow-sm hover:shadow-md hover:border-red-500/30 dark:hover:border-blue-500/40 transition-all duration-200 cursor-pointer"
              title={isPlaying ? "Pause music" : "Play music"}
            >
              {/* 4 Animated Frequency Equalizer Bars */}
              <span className="flex items-end gap-[2px] h-2.5 sm:h-3 w-3 sm:w-3.5 pb-0.5">
                {[
                  { duration: 0.9, h: ["25%", "90%", "45%", "100%", "25%"] },
                  { duration: 0.7, h: ["50%", "100%", "30%", "85%", "50%"] },
                  { duration: 1.1, h: ["35%", "75%", "100%", "40%", "35%"] },
                  { duration: 0.85, h: ["40%", "90%", "30%", "95%", "40%"] },
                ].map((bar, idx) => (
                  <motion.span
                    key={idx}
                    animate={
                      isPlaying
                        ? { height: bar.h }
                        : { height: "25%" }
                    }
                    transition={{
                      duration: isPlaying ? bar.duration : 0.35,
                      repeat: isPlaying ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                    className="w-[2px] rounded-full bg-gradient-to-t from-red-500 to-blue-500"
                  />
                ))}
              </span>

              {/* Smooth Animated Label: 2AM LO-FI <-> PAUSED */}
              <div className="relative overflow-hidden min-h-[14px] flex items-center">
                <AnimatePresence mode="wait" initial={false}>
                  {isPlaying ? (
                    <motion.span
                      key="playing-label"
                      initial={{ opacity: 0, y: 5, filter: "blur(2px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -5, filter: "blur(2px)" }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="text-[9px] sm:text-[10px] font-mono tracking-tight text-foreground/85 flex items-center gap-1 whitespace-nowrap"
                    >
                      <span className="font-semibold text-red-500 dark:text-red-400">
                        2AM LO-FI
                      </span>
                      <span className="text-muted-foreground/50 hidden xs:inline">•</span>
                      <span className="text-muted-foreground/80 hidden xs:inline">
                        Coding Beats
                      </span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="paused-label"
                      initial={{ opacity: 0, y: 5, filter: "blur(2px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -5, filter: "blur(2px)" }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="text-[9px] sm:text-[10px] font-mono tracking-tight text-foreground/85 flex items-center gap-1 whitespace-nowrap"
                    >
                      <span className="font-semibold text-muted-foreground">
                        PAUSED
                      </span>
                      <span className="text-muted-foreground/50 hidden xs:inline">•</span>
                      <span className="text-muted-foreground/80 hidden xs:inline">
                        Click to Play
                      </span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </button>

            {/* Volume Control Micro Pill */}
            <div className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border border-black/[0.08] dark:border-white/[0.12] bg-background/85 dark:bg-zinc-900/85 backdrop-blur-md shadow-sm hover:border-red-500/30 dark:hover:border-blue-500/40 transition-all duration-200 text-foreground/80">
              <button
                type="button"
                onClick={toggleMute}
                className="hover:text-red-500 dark:hover:text-blue-400 transition-colors cursor-pointer p-0.5"
                title={isMuted || volume === 0 ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="size-3 sm:size-3.5 text-muted-foreground" />
                ) : volume < 0.5 ? (
                  <Volume1 className="size-3 sm:size-3.5 text-blue-500 dark:text-blue-400" />
                ) : (
                  <Volume2 className="size-3 sm:size-3.5 text-red-500 dark:text-red-400" />
                )}
              </button>

              <button
                type="button"
                onClick={decreaseVolume}
                disabled={volume <= 0 || isMuted}
                className="size-3.5 sm:size-4 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30 transition-all cursor-pointer"
                title="Volume Down"
              >
                <Minus className="size-2.5 sm:size-3" />
              </button>

              <span className="text-[8.5px] sm:text-[9.5px] font-mono font-medium min-w-[20px] text-center select-none text-muted-foreground">
                {isMuted ? "0%" : `${Math.round(volume * 100)}%`}
              </span>

              <button
                type="button"
                onClick={increaseVolume}
                disabled={volume >= 1}
                className="size-3.5 sm:size-4 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30 transition-all cursor-pointer"
                title="Volume Up"
              >
                <Plus className="size-2.5 sm:size-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background Lofi Audio Player */}
      <audio
        ref={audioRef}
        src="/audio/lofi-ambient.mp3"
        loop
        preload="auto"
      />

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative w-full rounded-2xl sm:rounded-3xl md:rounded-[32px] p-6 sm:p-11 md:p-14 overflow-hidden border border-black/[0.08] dark:border-white/[0.09] bg-card/60 dark:bg-zinc-950/75 backdrop-blur-xl shadow-2xl transition-all duration-300"
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
  </div>
  );
}
