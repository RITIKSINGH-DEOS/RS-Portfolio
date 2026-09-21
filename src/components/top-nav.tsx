"use client";

import Image from "next/image";
import Link from "next/link";
import { useThemeTransition } from "@/hooks/use-theme-transition";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon, DownloadIcon } from "@radix-ui/react-icons";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { motion, AnimatePresence } from "framer-motion";

const pillVariants = {
  initial: (isHovered: boolean) => ({
    opacity: 0,
    y: isHovered ? 12 : -12,
    filter: "blur(4px)",
  }),
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (isHovered: boolean) => ({
    opacity: 0,
    y: isHovered ? -12 : 12,
    filter: "blur(4px)",
    transition: {
      duration: 0.38,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function TopNav() {
  const { theme, toggleTheme } = useThemeTransition();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLocationHovered, setIsLocationHovered] = useState(false);
  const [commitsCount, setCommitsCount] = useState<number>(214);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Fetch live GitHub contributions count
    fetch("/api/github-contributions")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.total?.lastYear) {
          setCommitsCount(data.total.lastYear);
        }
      })
      .catch(() => {});

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLocationClick = (e: React.MouseEvent) => {
    if (isLocationHovered) {
      const el = document.getElementById("contributions");
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center">
      {/* Subtle glass fade that activates smoothly when scrolled */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background/90 via-background/60 to-transparent backdrop-blur-[2px] pointer-events-none transition-opacity duration-300",
          scrolled ? "opacity-100" : "opacity-0"
        )}
      />

      <header className="relative z-10 w-full max-w-2xl px-6 py-3.5 sm:py-4 flex items-center justify-between pointer-events-none select-none">
        {/* ============================================================ */}
        {/* LEFT SECTION: AVATAR & LOCATION                             */}
        {/* ============================================================ */}
        <div className="pointer-events-auto">
          <Link
            href={isLocationHovered ? "#contributions" : "/"}
            onClick={handleLocationClick}
            className="group focus:outline-none"
            aria-label={isLocationHovered ? "View GitHub Contributions" : "Home"}
            title={isLocationHovered ? "View GitHub Contributions" : `${DATA.name} - ${DATA.location}`}
          >
            {/* Mobile View: Squircle Avatar Only (< sm) */}
            <div
              className="sm:hidden size-9 rounded-xl overflow-hidden border border-red-500/40 dark:border-blue-500/40 bg-black dark:bg-black shadow-[0_4px_16px_rgba(220,38,38,0.3),0_0_12px_rgba(37,99,235,0.25)] hover:shadow-[0_6px_22px_rgba(220,38,38,0.5),0_0_16px_rgba(37,99,235,0.4)] group-hover:scale-105 transition-all flex items-center justify-center"
              title={`${commitsCount} Commits on GitHub`}
            >
              <Image
                src={DATA.avatarUrl}
                alt={DATA.name}
                width={36}
                height={36}
                className="size-full scale-[1.28] object-cover"
              />
            </div>

            {/* Desktop View: Pill with Avatar + Location (>= sm) - switches to Commits on Hover with constant width */}
            <div
              onMouseEnter={() => setIsLocationHovered(true)}
              onMouseLeave={() => setIsLocationHovered(false)}
              className={cn(
                "hidden sm:flex items-center relative h-9 w-[172px] rounded-full border border-red-500/40 dark:border-blue-500/40 shadow-[0_4px_20px_rgba(220,38,38,0.3),0_0_15px_rgba(37,99,235,0.25)] hover:shadow-[0_6px_28px_rgba(220,38,38,0.55),0_0_20px_rgba(37,99,235,0.4)] hover:border-red-500/60 dark:hover:border-blue-400/60 transition-colors duration-300 cursor-pointer select-none overflow-hidden",
                isLocationHovered
                  ? "bg-foreground text-background"
                  : "bg-background text-foreground"
              )}
            >
              <AnimatePresence custom={isLocationHovered} initial={false}>
                {!isLocationHovered ? (
                  <motion.div
                    key="location"
                    custom={isLocationHovered}
                    variants={pillVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-0 flex items-center px-1 gap-2.5"
                  >
                    <div className="size-7 rounded-full overflow-hidden border border-red-500/30 dark:border-blue-500/30 shrink-0">
                      <Image
                        src={DATA.avatarUrl}
                        alt={DATA.name}
                        width={28}
                        height={28}
                        className="size-full object-cover"
                      />
                    </div>
                    <span className="text-xs sm:text-[13px] font-medium text-foreground/90 whitespace-nowrap">
                      Lucknow, India{" "}
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase">
                        IN
                      </span>
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="commits"
                    custom={isLocationHovered}
                    variants={pillVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-0 flex items-center px-1 gap-2.5"
                  >
                    <div className="size-7 rounded-full bg-background/20 border border-red-500/40 dark:border-blue-500/40 flex items-center justify-center shrink-0">
                      <Icons.github className="size-3.5 fill-current text-background" />
                    </div>
                    <span className="text-xs sm:text-[13px] font-medium text-background whitespace-nowrap flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                      <span className="font-semibold text-background">{commitsCount}</span> Commits
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Link>
        </div>

        {/* ============================================================ */}
        {/* RIGHT SECTION: NAV LINKS, THEME TOGGLE, CALL BUTTON          */}
        {/* ============================================================ */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-2.5">
          {/* Desktop View: Resume & Linkedin Pill (>= sm) */}
          <div className="hidden sm:flex items-center gap-4 rounded-full border border-red-500/40 dark:border-blue-500/40 bg-background px-4 py-1.5 shadow-[0_4px_20px_rgba(220,38,38,0.3),0_0_15px_rgba(37,99,235,0.25)] hover:shadow-[0_6px_28px_rgba(220,38,38,0.5),0_0_20px_rgba(37,99,235,0.4)] hover:border-red-500/60 dark:hover:border-blue-400/60 transition-all text-xs sm:text-[13px]">
            <a
              href="/resume.pdf"
              download="Ritik_Singh_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground/80 hover:text-red-500 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Resume
            </a>
            <a
              href={DATA.contact.social.LinkedIn.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground/80 hover:text-red-500 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Linkedin
            </a>
          </div>

          {/* Mobile View: Resume Download Button (< sm) */}
          <a
            href="/resume.pdf"
            download="Ritik_Singh_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden h-9 px-2.5 rounded-xl border border-red-500/40 dark:border-blue-500/40 bg-background flex items-center gap-1.5 text-foreground/80 hover:text-red-500 dark:hover:text-blue-400 shadow-[0_4px_16px_rgba(220,38,38,0.3),0_0_12px_rgba(37,99,235,0.25)] hover:shadow-[0_6px_22px_rgba(220,38,38,0.5),0_0_16px_rgba(37,99,235,0.4)] hover:border-red-500/60 dark:hover:border-blue-400/60 transition-all font-medium text-xs cursor-pointer select-none"
            title="Download Resume"
            aria-label="Download Resume"
          >
            <DownloadIcon className="size-3.5 text-red-500 dark:text-blue-400" />
            <span>Resume</span>
          </a>

          {/* Theme Toggle Button (Mobile & Desktop) */}
          <button
            type="button"
            onClick={toggleTheme}
            className="size-9 rounded-xl border border-red-500/40 dark:border-blue-500/40 bg-background flex items-center justify-center text-foreground/80 hover:text-red-500 dark:hover:text-blue-400 shadow-[0_4px_16px_rgba(220,38,38,0.3),0_0_12px_rgba(37,99,235,0.25)] hover:shadow-[0_6px_22px_rgba(220,38,38,0.5),0_0_16px_rgba(37,99,235,0.4)] hover:border-red-500/60 dark:hover:border-blue-400/60 transition-all focus:outline-none cursor-pointer"
            aria-label="Toggle theme"
          >
            {mounted && theme === "light" ? (
              <MoonIcon className="size-4 text-blue-600 dark:text-blue-400 transition-transform" />
            ) : (
              <SunIcon className="size-4 text-amber-500 dark:text-blue-400 transition-transform" />
            )}
          </button>

          {/* Call Button (Redirects to WhatsApp) */}
          <a
            href={DATA.contact.social.WhatsApp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 px-4 sm:px-5 rounded-xl bg-foreground text-background font-semibold text-xs sm:text-sm flex items-center justify-center border border-red-500/40 dark:border-blue-500/40 shadow-[0_4px_20px_rgba(220,38,38,0.35),0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_8px_30px_rgba(220,38,38,0.55),0_0_22px_rgba(37,99,235,0.45)] hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer select-none"
            title="Connect on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            Call
          </a>
        </div>
      </header>
    </div>
  );
}
