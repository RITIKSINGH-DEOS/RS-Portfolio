"use client";

import React from "react";

export function RoundedCanvasFrame() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[45] p-2 sm:p-3 select-none"
    >
      <div className="w-full h-full rounded-2xl sm:rounded-3xl md:rounded-[32px] border border-black/[0.03] dark:border-white/[0.02] shadow-[0_0_0_9999px_#18181b] dark:shadow-[0_0_0_9999px_#000000,inset_0_0_10px_rgba(0,0,0,0.5)]" />
    </div>
  );
}
