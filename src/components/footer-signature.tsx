"use client";

import React, { useRef, useState } from "react";
import { DATA } from "@/data/resume";

export function FooterSignature() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
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

  const fullName = "Ritik Singh";

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
      className="relative left-1/2 -translate-x-1/2 w-screen max-w-[100vw] overflow-hidden select-none cursor-default mt-6 sm:mt-10 pt-4 pb-4 sm:pb-8 text-center"
    >
      {/* Spider-Man Interactive Cursor Spotlight behind the name */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: mousePos.opacity,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(220, 38, 38, 0.14), rgba(37, 99, 235, 0.10), transparent 75%)`,
        }}
      />

      {/* Giant Editorial Serif Signature matching reference image */}
      <div className="relative z-10 w-full overflow-hidden flex justify-center items-center">
        <h1 className="font-serif font-light text-[13.5vw] sm:text-[13vw] md:text-[12.5vw] lg:text-[11.5vw] tracking-[-0.04em] leading-[0.88] whitespace-nowrap select-none">
          <span className="bg-gradient-to-b from-foreground/[0.18] via-foreground/[0.10] to-foreground/[0.02] dark:from-white/[0.18] dark:via-white/[0.09] dark:to-white/[0.02] bg-clip-text text-transparent hover:from-red-500/40 hover:via-foreground/25 hover:to-blue-500/30 transition-all duration-500 inline-block">
            {fullName}
          </span>
        </h1>
      </div>

      {/* Subtle minimal copyright tagline */}
      <p className="mt-3 sm:mt-4 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-muted-foreground/35 uppercase">
        © {new Date().getFullYear()} {fullName} · CRAFTED WITH PASSION
      </p>
    </div>
  );
}
