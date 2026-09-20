"use client";

import React, { useEffect, useState } from "react";

interface MeteorData {
  id: number;
  left: string;
  top: string;
  duration: string;
  delay: string;
  opacity: number;
  width: number;
}

const METEOR_CONFIGS: MeteorData[] = [
  { id: 1, left: "-5%", top: "8%", duration: "7.2s", delay: "-2.4s", opacity: 0.42, width: 120 },
  { id: 2, left: "12%", top: "4%", duration: "9.5s", delay: "-5.1s", opacity: 0.35, width: 105 },
  { id: 3, left: "-15%", top: "25%", duration: "8.0s", delay: "-7.8s", opacity: 0.45, width: 130 },
  { id: 4, left: "28%", top: "15%", duration: "10.2s", delay: "-3.6s", opacity: 0.38, width: 95 },
  { id: 5, left: "-8%", top: "42%", duration: "6.8s", delay: "-1.9s", opacity: 0.48, width: 125 },
  { id: 6, left: "40%", top: "2%", duration: "11.0s", delay: "-6.2s", opacity: 0.32, width: 110 },
  { id: 7, left: "5%", top: "60%", duration: "8.6s", delay: "-4.5s", opacity: 0.40, width: 115 },
  { id: 8, left: "-20%", top: "72%", duration: "7.5s", delay: "-8.3s", opacity: 0.44, width: 135 },
  { id: 9, left: "20%", top: "35%", duration: "9.8s", delay: "-2.8s", opacity: 0.36, width: 100 },
  { id: 10, left: "-2%", top: "85%", duration: "8.2s", delay: "-6.7s", opacity: 0.42, width: 120 },
  { id: 11, left: "55%", top: "12%", duration: "10.5s", delay: "-9.1s", opacity: 0.30, width: 105 },
  { id: 12, left: "8%", top: "18%", duration: "7.9s", delay: "-0.5s", opacity: 0.46, width: 125 },
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
      {METEOR_CONFIGS.map((meteor) => (
        <span
          key={meteor.id}
          className="meteor absolute pointer-events-none"
          style={{
            left: meteor.left,
            top: meteor.top,
            animationDuration: meteor.duration,
            animationDelay: meteor.delay,
            // @ts-ignore
            "--meteor-opacity": meteor.opacity,
            "--meteor-dx": "1480px",
            "--meteor-dy": "615px",
            "--meteor-angle": "22.6deg",
          }}
        >
          {/* Fading tail */}
          <span
            className="block h-[1px] rounded-sm bg-gradient-to-l from-foreground/50 via-foreground/25 to-transparent dark:from-white/60 dark:via-white/30 dark:to-transparent"
            style={{ width: `${meteor.width}px` }}
          />
          {/* Glowing head */}
          <span className="absolute right-0 top-0 h-[1.5px] w-[2.5px] rounded-[1px] bg-foreground dark:bg-white shadow-[0_0_6px_1px_rgba(0,0,0,0.3)] dark:shadow-[0_0_8px_2px_rgba(255,255,255,0.7)]" />
        </span>
      ))}
    </div>
  );
}
