"use client";

import React from "react";

export function DottedCanvas() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 select-none overflow-hidden"
    >
      {/* Light Mode Micro-Dot Matrix Canvas Background */}
      <div
        className="absolute inset-0 dark:hidden opacity-[0.08] mix-blend-multiply bg-repeat pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='6' height='6' viewBox='0 0 6 6'><circle cx='1' cy='1' r='0.55' fill='black'/><circle cx='4' cy='4' r='0.55' fill='black'/></svg>")`,
        }}
      />
      {/* Dark Mode Micro-Dot Matrix Canvas Background */}
      <div
        className="absolute inset-0 hidden dark:block opacity-[0.14] mix-blend-screen bg-repeat pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='6' height='6' viewBox='0 0 6 6'><circle cx='1' cy='1' r='0.55' fill='white'/><circle cx='4' cy='4' r='0.55' fill='white'/></svg>")`,
        }}
      />
    </div>
  );
}
