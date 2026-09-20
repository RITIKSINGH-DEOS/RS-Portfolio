"use client";

import React from "react";

export function RoundedCanvasFrame() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[45] p-2 sm:p-3 select-none"
    >
      <div className="relative w-full h-full rounded-2xl sm:rounded-3xl md:rounded-[32px] border border-black/15 dark:border-white/15 shadow-[0_0_0_9999px_#18181b] dark:shadow-[0_0_0_9999px_#000000] overflow-hidden">
        {/* Light Mode Micro-Dot Matrix Texture */}
        <div
          className="absolute inset-0 dark:hidden opacity-[0.08] mix-blend-multiply bg-repeat pointer-events-none rounded-[inherit]"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='6' height='6' viewBox='0 0 6 6'><circle cx='1' cy='1' r='0.55' fill='black'/><circle cx='4' cy='4' r='0.55' fill='black'/></svg>")`,
          }}
        />
        {/* Dark Mode Micro-Dot Matrix Texture */}
        <div
          className="absolute inset-0 hidden dark:block opacity-[0.14] mix-blend-screen bg-repeat pointer-events-none rounded-[inherit]"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='6' height='6' viewBox='0 0 6 6'><circle cx='1' cy='1' r='0.55' fill='white'/><circle cx='4' cy='4' r='0.55' fill='white'/></svg>")`,
          }}
        />
      </div>
    </div>
  );
}
