"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MeteorData {
  id: number;
  left: string;
  top: string;
  duration: string;
  delay: string;
  opacity: number;
  width: number;
  type: "hero" | "standard" | "deep";
}

interface TwinkleStar {
  id: number;
  left: string;
  top: string;
  duration: string;
  delay: string;
  size: number;
  minOpacity: number;
  maxOpacity: number;
  isDiamond?: boolean;
}

// 4-Pointed Classic Diamond Star Sparkle (✦)
function DiamondSparkle({
  className,
  style,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
    </svg>
  );
}

// Multi-layered meteors: Hero (cinematic), Standard (classic), Deep (distant depth)
const METEOR_CONFIGS: MeteorData[] = [
  // Tier 1: Hero Meteors (Majestic, long luminous trail, diamond starburst, stardust wake)
  { id: 1, left: "-10%", top: "10%", duration: "6.8s", delay: "-1.6s", opacity: 0.65, width: 210, type: "hero" },
  { id: 5, left: "-14%", top: "46%", duration: "7.2s", delay: "-4.4s", opacity: 0.60, width: 195, type: "hero" },
  { id: 8, left: "-6%", top: "76%", duration: "7.0s", delay: "-6.8s", opacity: 0.58, width: 185, type: "hero" },

  // Tier 2: Standard Meteors (Clean classic comets with stardust embers)
  { id: 2, left: "14%", top: "4%", duration: "9.0s", delay: "-3.2s", opacity: 0.48, width: 140, type: "standard" },
  { id: 4, left: "30%", top: "18%", duration: "10.0s", delay: "-5.6s", opacity: 0.44, width: 130, type: "standard" },
  { id: 7, left: "6%", top: "60%", duration: "8.6s", delay: "-2.3s", opacity: 0.46, width: 135, type: "standard" },
  { id: 9, left: "20%", top: "36%", duration: "9.5s", delay: "-7.1s", opacity: 0.42, width: 125, type: "standard" },
  { id: 11, left: "50%", top: "8%", duration: "10.2s", delay: "-8.5s", opacity: 0.40, width: 120, type: "standard" },

  // Tier 3: Deep Space Meteors (Fine, ethereal, adds 3D cosmic perspective)
  { id: 3, left: "-8%", top: "26%", duration: "11.2s", delay: "-0.8s", opacity: 0.30, width: 90, type: "deep" },
  { id: 6, left: "42%", top: "2%", duration: "12.0s", delay: "-4.6s", opacity: 0.28, width: 85, type: "deep" },
  { id: 10, left: "-2%", top: "88%", duration: "11.5s", delay: "-6.2s", opacity: 0.30, width: 95, type: "deep" },
  { id: 12, left: "8%", top: "22%", duration: "10.6s", delay: "-2.9s", opacity: 0.32, width: 90, type: "deep" },
];

// Ambient Constellation Twinkles (Soft stationary stars that gently breathe in the background)
const TWINKLE_STARS: TwinkleStar[] = [
  { id: 1, left: "7%", top: "8%", duration: "4.6s", delay: "-1.2s", size: 7, minOpacity: 0.12, maxOpacity: 0.70, isDiamond: true },
  { id: 2, left: "22%", top: "5%", duration: "3.8s", delay: "-2.4s", size: 2, minOpacity: 0.15, maxOpacity: 0.65 },
  { id: 3, left: "86%", top: "12%", duration: "5.4s", delay: "-0.8s", size: 8, minOpacity: 0.10, maxOpacity: 0.65, isDiamond: true },
  { id: 4, left: "78%", top: "24%", duration: "4.2s", delay: "-3.1s", size: 2, minOpacity: 0.16, maxOpacity: 0.70 },
  { id: 5, left: "11%", top: "32%", duration: "4.8s", delay: "-1.8s", size: 1.5, minOpacity: 0.14, maxOpacity: 0.60 },
  { id: 6, left: "93%", top: "40%", duration: "4.0s", delay: "-2.7s", size: 7, minOpacity: 0.12, maxOpacity: 0.72, isDiamond: true },
  { id: 7, left: "4%", top: "54%", duration: "5.6s", delay: "-4.2s", size: 2, minOpacity: 0.15, maxOpacity: 0.60 },
  { id: 8, left: "85%", top: "58%", duration: "4.4s", delay: "-1.5s", size: 1.5, minOpacity: 0.18, maxOpacity: 0.72 },
  { id: 9, left: "16%", top: "70%", duration: "5.2s", delay: "-3.3s", size: 8, minOpacity: 0.10, maxOpacity: 0.68, isDiamond: true },
  { id: 10, left: "91%", top: "78%", duration: "4.7s", delay: "-0.6s", size: 2, minOpacity: 0.14, maxOpacity: 0.65 },
  { id: 11, left: "9%", top: "88%", duration: "3.9s", delay: "-2.0s", size: 1.5, minOpacity: 0.16, maxOpacity: 0.70 },
  { id: 12, left: "82%", top: "92%", duration: "5.5s", delay: "-3.7s", size: 7, minOpacity: 0.12, maxOpacity: 0.62, isDiamond: true },
  { id: 13, left: "28%", top: "84%", duration: "4.3s", delay: "-1.6s", size: 1.5, minOpacity: 0.15, maxOpacity: 0.62 },
  { id: 14, left: "72%", top: "46%", duration: "5.0s", delay: "-3.0s", size: 2, minOpacity: 0.12, maxOpacity: 0.58 },
];

export function ShootingStars() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* ============================================================ */}
      {/* 1. AMBIENT CONSTELLATION TWINKLE STARS                       */}
      {/* ============================================================ */}
      {TWINKLE_STARS.map((star) => (
        <span
          key={`star-${star.id}`}
          className="celestial-star absolute pointer-events-none flex items-center justify-center"
          style={{
            left: star.left,
            top: star.top,
            // @ts-ignore
            "--twinkle-min": star.minOpacity,
            "--twinkle-max": star.maxOpacity,
            animationDuration: star.duration,
            animationDelay: star.delay,
          }}
        >
          {star.isDiamond ? (
            <DiamondSparkle
              className="text-foreground/50 dark:text-white/70 drop-shadow-[0_0_5px_rgba(255,255,255,0.7)]"
              style={{ width: `${star.size}px`, height: `${star.size}px` }}
            />
          ) : (
            <span
              className="rounded-full bg-foreground/60 dark:bg-white/80 shadow-[0_0_4px_1px_rgba(255,255,255,0.6)]"
              style={{ width: `${star.size}px`, height: `${star.size}px` }}
            />
          )}
        </span>
      ))}

      {/* ============================================================ */}
      {/* 2. CINEMATIC SHOOTING STARS / METEORS                        */}
      {/* ============================================================ */}
      {METEOR_CONFIGS.map((meteor) => (
        <span
          key={`meteor-${meteor.id}`}
          className="meteor absolute pointer-events-none"
          style={{
            left: meteor.left,
            top: meteor.top,
            animationDuration: meteor.duration,
            animationDelay: meteor.delay,
            // @ts-ignore
            "--meteor-opacity": meteor.opacity,
            "--meteor-dx": "1560px",
            "--meteor-dy": "690px",
            "--meteor-angle": "24deg",
          }}
        >
          {/* A. Cometary Luminous Tail */}
          <span
            className={cn(
              "block rounded-full bg-gradient-to-l",
              meteor.type === "hero"
                ? "h-[1.5px] from-foreground/80 via-foreground/35 to-transparent dark:from-white dark:via-blue-400/50 dark:to-transparent"
                : meteor.type === "standard"
                ? "h-[1px] from-foreground/70 via-foreground/25 to-transparent dark:from-white/90 dark:via-cyan-300/35 dark:to-transparent"
                : "h-[0.75px] from-foreground/40 to-transparent dark:from-white/50 dark:to-transparent"
            )}
            style={{ width: `${meteor.width}px` }}
          />

          {/* B. Stardust Wake Particles (Embers drifting behind head) */}
          {meteor.type !== "deep" && (
            <>
              <span
                className="absolute rounded-full bg-foreground/45 dark:bg-cyan-200/80 shadow-[0_0_3px_rgba(255,255,255,0.6)]"
                style={{
                  right: "26px",
                  top: "-2.5px",
                  width: "1.5px",
                  height: "1.5px",
                }}
              />
              <span
                className="absolute rounded-full bg-foreground/30 dark:bg-blue-300/60"
                style={{
                  right: "56px",
                  top: "3px",
                  width: "1px",
                  height: "1px",
                }}
              />
              {meteor.type === "hero" && (
                <span
                  className="absolute rounded-full bg-foreground/25 dark:bg-rose-400/60"
                  style={{
                    right: "92px",
                    top: "-1.5px",
                    width: "1px",
                    height: "1px",
                  }}
                />
              )}
            </>
          )}

          {/* C. Glowing Meteor Head with Diamond Star Sparkle */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex items-center justify-center pointer-events-none">
            {/* Ethereal Outer Halo */}
            <span
              className={cn(
                "absolute rounded-full pointer-events-none",
                meteor.type === "hero"
                  ? "size-4 bg-foreground/15 dark:bg-blue-500/35 blur-[2.5px]"
                  : "size-2.5 bg-foreground/10 dark:bg-cyan-400/25 blur-[1.5px]"
              )}
            />

            {/* Intense Central Nucleus */}
            <span
              className={cn(
                "relative rounded-full bg-foreground dark:bg-white",
                meteor.type === "hero"
                  ? "size-[2.5px] shadow-[0_0_8px_2px_rgba(0,0,0,0.3)] dark:shadow-[0_0_8px_2px_rgba(255,255,255,0.95),0_0_14px_4px_rgba(59,130,246,0.55)]"
                  : "size-[2px] shadow-[0_0_5px_1px_rgba(0,0,0,0.2)] dark:shadow-[0_0_6px_1px_rgba(255,255,255,0.85),0_0_10px_2px_rgba(34,211,238,0.4)]"
              )}
            />

            {/* Classic 4-Point Diamond Glint */}
            {meteor.type !== "deep" && (
              <DiamondSparkle
                className={cn(
                  "meteor-glint absolute text-foreground dark:text-white pointer-events-none",
                  meteor.type === "hero"
                    ? "size-3.5 drop-shadow-[0_0_4px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_0_6px_rgba(255,255,255,0.95)] opacity-95"
                    : "size-2.5 drop-shadow-[0_0_3px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_0_4px_rgba(255,255,255,0.85)] opacity-80"
                )}
              />
            )}
          </div>
        </span>
      ))}
    </div>
  );
}
