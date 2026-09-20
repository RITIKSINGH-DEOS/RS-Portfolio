"use client";

import React from "react";

export function RoundedCanvasFrame() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[45] p-2 sm:p-3 select-none"
    >
      <div className="w-full h-full rounded-2xl sm:rounded-3xl md:rounded-[32px] border border-black/15 dark:border-white/15 shadow-[0_0_0_9999px_#18181b] dark:shadow-[0_0_0_9999px_#000000]" />
    </div>
  );
}
