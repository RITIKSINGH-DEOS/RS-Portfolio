"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { DATA } from "@/data/resume";

export function TopNav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="w-full flex items-center justify-between mb-8 sm:mb-12 relative z-30 select-none">
      {/* ============================================================ */}
      {/* LEFT SECTION: AVATAR & LOCATION                             */}
      {/* ============================================================ */}
      <Link href="/" className="group focus:outline-none" aria-label="Home">
        {/* Mobile View: Squircle Avatar Only (< sm) */}
        <div className="sm:hidden size-9 rounded-xl overflow-hidden border border-neutral-300/70 dark:border-neutral-800/90 bg-white/80 dark:bg-neutral-900/90 p-0.5 shadow-sm group-hover:scale-105 transition-transform">
          <Image
            src={DATA.avatarUrl}
            alt={DATA.name}
            width={36}
            height={36}
            className="size-full rounded-[10px] object-cover"
          />
        </div>

        {/* Desktop View: Pill with Avatar + Location (>= sm) */}
        <div className="hidden sm:flex items-center gap-2.5 rounded-full border border-neutral-300/70 dark:border-neutral-800/90 bg-white/80 dark:bg-neutral-900/90 backdrop-blur-md p-1 pr-3.5 shadow-sm group-hover:border-neutral-400 dark:group-hover:border-neutral-700 transition-colors">
          <div className="size-7 rounded-full overflow-hidden border border-neutral-200 dark:border-white/10 shrink-0">
            <Image
              src={DATA.avatarUrl}
              alt={DATA.name}
              width={28}
              height={28}
              className="size-full object-cover"
            />
          </div>
          <span className="text-xs sm:text-[13px] font-medium text-neutral-800 dark:text-neutral-200 whitespace-nowrap">
            New Delhi, India
          </span>
          <span className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 tracking-wider uppercase">
            IN
          </span>
        </div>
      </Link>

      {/* ============================================================ */}
      {/* RIGHT SECTION: NAV LINKS, THEME TOGGLE, CALL BUTTON          */}
      {/* ============================================================ */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Desktop View: Resume & Linkedin Pill (>= sm) */}
        <div className="hidden sm:flex items-center gap-4 rounded-full border border-neutral-300/70 dark:border-neutral-800/90 bg-white/80 dark:bg-neutral-900/90 backdrop-blur-md px-4 py-1.5 shadow-sm text-xs sm:text-[13px]">
          <a
            href="/resume.pdf"
            download="Ritik_Singh_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
          >
            Resume
          </a>
          <a
            href={DATA.contact.social.LinkedIn.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
          >
            Linkedin
          </a>
        </div>

        {/* Theme Toggle Button (Mobile & Desktop) */}
        <button
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="size-9 rounded-xl border border-neutral-300/70 dark:border-neutral-800/90 bg-white/80 dark:bg-neutral-900/90 flex items-center justify-center text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/90 transition-all shadow-sm focus:outline-none cursor-pointer"
          aria-label="Toggle theme"
        >
          {mounted && theme === "light" ? (
            <MoonIcon className="size-4 text-neutral-800 transition-transform" />
          ) : (
            <SunIcon className="size-4 text-neutral-200 transition-transform" />
          )}
        </button>

        {/* Call Button (Mobile & Desktop) */}
        <a
          href={`tel:${DATA.contact.tel}`}
          className="h-9 px-4 sm:px-5 rounded-xl bg-foreground text-background font-semibold text-xs sm:text-sm flex items-center justify-center shadow-sm hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer select-none"
          title={`Call ${DATA.contact.tel}`}
          aria-label="Call Ritik"
        >
          Call
        </a>
      </div>
    </header>
  );
}
