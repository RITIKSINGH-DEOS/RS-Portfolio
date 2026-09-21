"use client";

import React from "react";

interface HeadphoneMusicDiscProps {
  isPlaying?: boolean;
}

export function HeadphoneMusicDisc({ isPlaying = true }: HeadphoneMusicDiscProps) {
  return (
    <div
      aria-hidden="true"
      className="absolute pointer-events-none select-none flex items-center justify-center"
      style={{
        left: "32.03%",
        top: "52.01%",
        width: "4.8%",
        aspectRatio: "1 / 1",
        transform: "translate(-50%, -50%) rotate(-12deg)",
      }}
    >
      {/* Audio Beat Soundwaves (Rhythmic bass pulses radiating from headphone) */}
      {isPlaying && (
        <>
          <span className="absolute -inset-2.5 rounded-full border border-red-500/50 dark:border-blue-400/50 animate-ping opacity-60 [animation-duration:2.4s]" />
          <span className="absolute -inset-5 rounded-full border border-blue-500/30 dark:border-red-400/30 animate-ping opacity-30 [animation-delay:600ms] [animation-duration:2.8s]" />
        </>
      )}

      {/* Rotating Vinyl Record / Turntable Disc */}
      <div
        className="relative w-full h-full rounded-full overflow-hidden shadow-[0_0_10px_rgba(239,68,68,0.35)] dark:shadow-[0_0_10px_rgba(59,130,246,0.35)] animate-[spin_3s_linear_infinite]"
        style={{ animationPlayState: isPlaying ? "running" : "paused" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Vinyl Record Base */}
          <circle
            cx="50"
            cy="50"
            r="49"
            className="fill-zinc-900 dark:fill-zinc-950 stroke-zinc-700 dark:stroke-zinc-600"
            strokeWidth="2"
          />

          {/* Micro-Grooved Vinyl Audio Tracks */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1.4"
            strokeDasharray="8 4"
          />
          <circle
            cx="50"
            cy="50"
            r="34"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1.2"
            strokeDasharray="12 4"
          />
          <circle
            cx="50"
            cy="50"
            r="26"
            fill="none"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="1"
          />

          {/* 3 Kinetic Turntable Strobe Markers (make rotation immediately obvious and hypnotic) */}
          <circle cx="50" cy="16" r="3.2" fill="#ffffff" opacity="0.9" />
          <circle cx="21" cy="67" r="3.2" fill="#ffffff" opacity="0.9" />
          <circle cx="79" cy="67" r="3.2" fill="#ffffff" opacity="0.9" />

          {/* Center Vinyl Label (Spider-Man Theme Red with Blue accent ring) */}
          <circle cx="50" cy="50" r="14.5" fill="#ef4444" />
          <circle cx="50" cy="50" r="11.5" fill="none" stroke="#3b82f6" strokeWidth="1.4" />

          {/* Center Spindle Hole */}
          <circle cx="50" cy="50" r="4" fill="#ffffff" opacity="0.95" />
        </svg>
      </div>
    </div>
  );
}
