"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
}

interface Props {
  navItems: NavItem[];
}

export function CaseStudySidebar({ navItems }: Props) {
  const [activeId, setActiveId] = useState<string>(navItems[0]?.id || "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0% -60% 0%", // Triggers when section enters top third of viewport
        threshold: 0,
      }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navItems]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const yOffset = -90; // Offset for sticky top bar
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <>
      {/* Mobile Sticky Horizontal Index Pill Bar */}
      <div className="sticky top-20 z-30 -mx-4 block lg:hidden border-y border-black/10 dark:border-white/10 bg-background/80 px-4 py-2.5 backdrop-blur-xl">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-all duration-200",
                  isActive
                    ? "bg-foreground text-background font-semibold shadow-sm"
                    : "border border-black/10 dark:border-white/10 text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label.replace(/^\d+\.\s*/, "")}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Sticky Vertical Index */}
      <aside className="hidden lg:block sticky top-28 h-fit space-y-4">
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-card/40 dark:bg-zinc-950/40 p-4 backdrop-blur-md">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
            Case Study Index
          </p>
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className={cn(
                    "group relative flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left font-mono text-xs transition-all duration-200",
                    isActive
                      ? "text-foreground font-semibold bg-red-500/10 dark:bg-blue-500/15"
                      : "text-muted-foreground hover:text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
                  )}
                >
                  <span
                    className={cn(
                      "size-1.5 rounded-full transition-all duration-200",
                      isActive
                        ? "bg-red-500 dark:bg-blue-400 scale-125 shadow-[0_0_8px_rgba(220,38,38,0.8)]"
                        : "bg-muted-foreground/30 group-hover:bg-foreground/60"
                    )}
                  />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
