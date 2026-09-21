"use client";

import React from "react";
import { Marquee } from "@/components/magicui/marquee";

interface SkillItem {
  name: string;
  subtitle: string;
  icon: React.ReactNode;
}

// Row 1: Right to Left (moving leftwards)
const ROW_1: SkillItem[] = [
  {
    name: "TypeScript",
    subtitle: "Language",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path
          d="M11.5 10H7v2.2h1.6v6.8H11v-6.8h1.6V10H11.5zm6.8 1.8c-.4-.5-1.1-.9-2.1-.9-1.2 0-2 .6-2 1.6 0 1 .7 1.4 1.8 1.8l.7.3c1.3.5 2 1 2 2.2 0 1.5-1.2 2.4-2.8 2.4-1.3 0-2.3-.5-2.9-1.3l1.1-1.3c.4.6 1.1.9 1.8.9.8 0 1.3-.4 1.3-1 0-.7-.5-1.1-1.5-1.5l-.8-.3c-1.3-.5-2.2-1.1-2.2-2.3 0-1.4 1.1-2.3 2.6-2.3 1.1 0 2 .4 2.5 1.1l-1.2 1.1z"
          fill="#fff"
        />
      </svg>
    ),
  },
  {
    name: "Python",
    subtitle: "AI pipelines",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24">
        <path
          d="M11.87 2c-3.1 0-2.9 1.35-2.9 1.35l.03 1.4h2.93v.42H6.07S4 4.93 4 8.04c0 3.1 1.77 3 1.77 3h1.06v-1.5s-.06-1.78 1.75-1.78h3s1.72-.03 1.72-1.7V4.08S13.56 2 11.87 2zm-1.63 1.02a.68.68 0 1 1 0 1.36.68.68 0 0 1 0-1.36z"
          fill="#3776AB"
        />
        <path
          d="M12.13 22c3.1 0 2.9-1.35 2.9-1.35l-.03-1.4H12.07v-.42h5.86s2.07.24 2.07-2.87c0-3.1-1.77-3-1.77-3h-1.06v1.5s.06 1.78-1.75 1.78h-3s-1.72.03-1.72 1.7v1.98S10.44 22 12.13 22zm1.63-1.02a.68.68 0 1 1 0-1.36.68.68 0 0 1 0 1.36z"
          fill="#FFD43B"
        />
      </svg>
    ),
  },
  {
    name: "React.js",
    subtitle: "Frontend UI",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="2" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" />
        <ellipse
          cx="12"
          cy="12"
          rx="9"
          ry="3.5"
          stroke="#61DAFB"
          strokeWidth="1.2"
          transform="rotate(60 12 12)"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="9"
          ry="3.5"
          stroke="#61DAFB"
          strokeWidth="1.2"
          transform="rotate(120 12 12)"
        />
      </svg>
    ),
  },
  {
    name: "Next.js",
    subtitle: "Web apps",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.66 17.58l-5.42-7.05v6.92h-1.6V6.55h1.6l5.42 7.05V6.55h1.6v11.03h-1.6z" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    subtitle: "Services",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="#339933">
        <path d="M12 1.5l10.5 6v12l-10.5 6-10.5-6v-12l10.5-6zm0 2.3l-8.5 4.9v9.7l8.5 4.9 8.5-4.9v-9.7l-8.5-4.9zm-2.8 7.3h2.4v6.2h-2.4v-6.2zm3.2 0h2.4v6.2h-2.4v-6.2z" />
      </svg>
    ),
  },
  {
    name: "Docker",
    subtitle: "Containers",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="#2496ED">
        <path d="M13.98 11.08h-2.09v-2.1h2.09v2.1zm-2.6 0H9.28v-2.1h2.1v2.1zm-2.6 0H6.68v-2.1h2.1v2.1zm7.81 0h-2.1v-2.1h2.1v2.1zm-2.6-2.62h-2.1v-2.1h2.1v2.1zm-2.6 0H9.28v-2.1h2.1v2.1zm5.2 0h-2.1v-2.1h2.1v2.1zm-2.6-2.62h-2.1v-2.1h2.1v2.1zm8.32 5.24c-.45-.3-1.42-.36-2.2-.18-.3-.66-.82-1.22-1.52-1.56l-.54-.26-.34.48c-.5.7-1.12 1.25-1.92 1.54h-13.8c-.37 1.6.08 3.3.96 4.7 1.34 2.1 3.73 3.4 6.38 3.4 5.3 0 9.8-3.3 11.2-8.1.7.04 1.3-.1 1.7-.4l.08-.08z" />
      </svg>
    ),
  },
  {
    name: "Google Gemini",
    subtitle: "Generative AI",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z"
          fill="url(#gemini-grad-row1)"
        />
        <defs>
          <linearGradient id="gemini-grad-row1" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1BA1E3" />
            <stop offset="0.5" stopColor="#545BDE" />
            <stop offset="1" stopColor="#9B72CB" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "LangChain",
    subtitle: "Agent tooling",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: "Java",
    subtitle: "Core OOP & DSA",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="#EA2D2E">
        <path d="M8.85 16.82c-.93.08-1.54.49-1.54.9 0 .46.85.83 2.14.83 1.95 0 3.73-.78 3.73-1.63 0-.15-.04-.3-.14-.42-1.02.24-2.88.24-4.19.32zm8.43-2.12c-.22.56-1.12 1.05-2.58 1.34 1.13-.7 1.87-1.39 2.05-2.02.04-.15.05-.29.05-.42 0-.82-.77-1.54-2.08-2.06.63.3 1.01.67 1.01 1.06 0 .5-.71 1.04-1.95 1.48 1.4-.73 2.19-1.46 2.19-2.15 0-.25-.13-.48-.37-.7-.84-.73-2.73-1.25-5.18-1.43 1.33.39 2.19.89 2.19 1.43 0 .42-.48.86-1.35 1.25 1.55-.7 2.45-1.42 2.45-2.1 0-.13-.04-.25-.1-.36-.73-.83-2.8-1.44-5.61-1.63 1.55.45 2.51 1.05 2.51 1.7 0 .55-.74 1.13-2.07 1.63 1.62-.68 2.58-1.4 2.58-2.1 0-.08-.02-.15-.05-.22C11.5 8.1 8.8 8.7 6.4 9.6c2-.4 3.7-.6 4.9-.6 2.6 0 4.1.7 4.1 1.7 0 .5-.4 1-1.2 1.4 1.5-.6 2.4-1.3 2.4-2 0-.2-.1-.3-.2-.5 1-.2 1.8-.4 2.4-.6 1.4 1.2 2.2 2.7 2.2 4.3 0 1.2-.5 2.3-1.4 3.3z" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    subtitle: "Modern styling",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="#38BDF8">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624-1.176-1.194-2.537-2.576-5.512-2.576zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624-1.176-1.194-2.537-2.576-5.512-2.576z" />
      </svg>
    ),
  },
  {
    name: "GSAP",
    subtitle: "Smooth motion",
    icon: (
      <div className="flex size-5 items-center justify-center rounded font-mono text-[9px] font-bold text-emerald-500 border border-emerald-500/40">
        GS
      </div>
    ),
  },
  {
    name: "MCP",
    subtitle: "Context protocol",
    icon: (
      <div className="flex size-5 items-center justify-center rounded font-mono text-[9px] font-bold text-foreground border border-foreground/30">
        MCP
      </div>
    ),
  },
];

// Row 2: Left to Right (moving rightwards)
const ROW_2: SkillItem[] = [
  {
    name: "AWS",
    subtitle: "Cloud services",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="#FF9900">
        <path d="M18.8 13.9c-.3-.4-.7-.6-1.2-.6-.8 0-1.4.5-1.4 1.4 0 .9.6 1.4 1.4 1.4.5 0 .9-.2 1.2-.6v-1.6zm-4.7-6.7c-.5.4-.7 1-.7 1.7 0 1.3 1 2.3 2.3 2.3.8 0 1.5-.4 1.9-1.1V8.9c0-1.4-.9-2.4-2.4-2.4-.6 0-1.1.2-1.1.7zm1.1 5.3c-.6.3-1.4.5-2.2.5-1.9 0-3.3-1.2-3.3-3.1 0-1.9 1.4-3.2 3.3-3.2.8 0 1.5.2 2.1.5v-1c-.6-.3-1.4-.5-2.2-.5-2.6 0-4.6 1.8-4.6 4.3 0 2.5 2 4.3 4.6 4.3.9 0 1.8-.2 2.3-.5v-1.3zm8.3 5.4C19.7 19.5 15.3 21 11.5 21c-4.4 0-8.5-1.8-11.5-4.7-.2-.2-.2-.6 0-.8.3-.3.7-.3.9 0 2.8 2.7 6.6 4.4 10.6 4.4 3.6 0 7.7-1.4 10.9-3.7.4-.3.9-.1 1.1.3.2.4 0 .9-.3 1.4z" />
      </svg>
    ),
  },
  {
    name: "Cloudflare",
    subtitle: "Edge & workers",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="#F38020">
        <path d="M16.5 7.5c-.3 0-.6.1-.8.2C14.9 5.8 13.1 4.5 11 4.5c-2.8 0-5.1 2.1-5.5 4.8C4 9.6 3 11 3 12.8 3 15 4.8 16.8 7 16.8h9.5c2.5 0 4.5-2 4.5-4.5s-2-4.8-4.5-4.8z" />
      </svg>
    ),
  },
  {
    name: "GitHub Actions",
    subtitle: "CI/CD pipelines",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="#2088FF">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
      </svg>
    ),
  },
  {
    name: "LLMs",
    subtitle: "OpenAI · Anthropic",
    icon: (
      <div className="flex size-5 items-center justify-center rounded bg-foreground/10 font-mono text-[9px] font-bold text-foreground">
        llm
      </div>
    ),
  },
  {
    name: "PostgreSQL",
    subtitle: "Relational DB",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="#4169E1">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1.2 15.5c-2.5 0-4.2-1.3-4.2-3.3 0-1.8 1.4-2.8 3.5-2.8h.7v-.5c0-.8-.5-1.2-1.5-1.2-.8 0-1.6.3-2.2.8l-.6-1.1c.8-.7 2-1 3.2-1 2.1 0 3.2 1.1 3.2 2.9v5.2h-2.1zm-1.8-4.9c-1.3 0-2 .6-2 1.5 0 .9.7 1.5 1.9 1.5.8 0 1.4-.4 1.7-.9v-2.1h-1.6z" />
      </svg>
    ),
  },
  {
    name: "Redis",
    subtitle: "Cache & queues",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="#DC382D">
        <path d="M2.5 8.5L12 3l9.5 5.5-9.5 5.5-9.5-5.5zm0 4.5l9.5 5.5 9.5-5.5v2.5L12 21l-9.5-5.5V13z" />
      </svg>
    ),
  },
  {
    name: "MongoDB",
    subtitle: "NoSQL database",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="#47A248">
        <path d="M12 1.5s-6 5.5-6 11.5c0 4.5 3.5 7.5 6 9.5 2.5-2 6-5 6-9.5 0-6-6-11.5-6-11.5zm-.5 18.5c-.3-.2-2.5-2-3.5-4.5 1 2.5 3 4 3.5 4.5zm1 0c.5-.5 2.5-2 3.5-4.5-1 2.5-3 4-3.5 4.5z" />
      </svg>
    ),
  },
  {
    name: "Supabase",
    subtitle: "BaaS & auth",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="#3ECF8E">
        <path d="M13.4 2.1c-.6-.7-1.7-.3-1.8.6L10.3 11h9.3c.9 0 1.4 1 .8 1.7L9.8 22.9c-.6.7-1.7.3-1.8-.6L9.3 14H1.1c-.9 0-1.4-1-.8-1.7L13.4 2.1z" />
      </svg>
    ),
  },
  {
    name: "Express.js",
    subtitle: "REST API engine",
    icon: (
      <div className="flex size-5 items-center justify-center rounded font-mono text-[9px] font-bold text-foreground border border-foreground/30">
        ex
      </div>
    ),
  },
  {
    name: "Streamlit",
    subtitle: "AI rapid prototypes",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="#FF4B4B">
        <path d="M12 4.5l3.5 6.5H8.5L12 4.5zM6.5 14l2.5 5.5H4L6.5 14zm11 0l2.5 5.5h-5l2.5-5.5z" />
      </svg>
    ),
  },
  {
    name: "Postman",
    subtitle: "API testing",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="#FF6C37">
        <circle cx="12" cy="12" r="10" />
        <path d="M15 8l-6 4 6 4V8z" fill="#fff" />
      </svg>
    ),
  },
  {
    name: "Git",
    subtitle: "Version control",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="#F05032">
        <path d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L8.9 4.5l2.7 2.7c.6-.2 1.3-.1 1.8.4.5.5.7 1.3.4 1.9l2.6 2.6c.6-.3 1.4-.1 1.9.4.7.7.7 1.8 0 2.5s-1.8.7-2.5 0c-.6-.6-.7-1.4-.3-2.1l-2.4-2.4v6.3c.2.1.4.3.6.5.7.7.7 1.8 0 2.5s-1.8.7-2.5 0c-.7-.7-.7-1.8 0-2.5.2-.2.5-.4.8-.5V9.4c-.3-.1-.5-.3-.8-.5-.6-.6-.7-1.4-.3-2.1L8.3 4.2 2.4 10.1c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.5-8.5c.7-.5.7-1.5.1-2.1v.8z" />
      </svg>
    ),
  },
];

function SkillCard({ skill }: { skill: SkillItem }) {
  return (
    <div className="group/skill relative flex items-center gap-3 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl border border-black/[0.07] dark:border-white/[0.08] bg-card/85 dark:bg-zinc-950/80 backdrop-blur-xl hover:border-red-500/40 dark:hover:border-blue-500/40 hover:bg-card dark:hover:bg-zinc-900/95 transition-all duration-300 shadow-sm hover:shadow-[0_4px_22px_-2px_rgba(220,38,38,0.32)] hover:scale-[1.04] active:scale-[0.97] select-none cursor-pointer shrink-0">
      {/* Spider-Man Ambient Glow behind each card on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-0.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-500/25 via-rose-500/10 to-blue-500/25 opacity-0 group-hover/skill:opacity-100 blur-sm transition-opacity duration-300"
      />

      {/* Subtle Corner Tech Accent */}
      <div
        aria-hidden="true"
        className="absolute top-1.5 right-2 opacity-0 group-hover/skill:opacity-80 transition-opacity duration-200"
      >
        <span className="size-1 rounded-full bg-red-500 inline-block animate-ping" />
      </div>

      {/* Left Icon Container matching reference screenshot */}
      <div className="relative z-10 flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-muted/60 dark:bg-zinc-900/90 border border-black/[0.05] dark:border-white/[0.07] group-hover/skill:scale-115 group-hover/skill:-rotate-3 group-hover/skill:border-red-500/35 transition-transform duration-200">
        {skill.icon}
      </div>

      {/* Right Text (Two Lines) */}
      <div className="relative z-10 flex flex-col text-left leading-tight pr-1">
        <span className="font-sans font-medium text-xs sm:text-[13px] text-foreground tracking-tight group-hover/skill:bg-gradient-to-r group-hover/skill:from-red-500 group-hover/skill:via-rose-500 group-hover/skill:to-blue-500 group-hover/skill:bg-clip-text group-hover/skill:text-transparent transition-all">
          {skill.name}
        </span>
        <span className="font-mono text-[9px] sm:text-[10px] text-muted-foreground/80 tracking-wide mt-0.5">
          {skill.subtitle}
        </span>
      </div>
    </div>
  );
}

export function SkillsMarquee() {
  return (
    <div className="flex flex-col w-full gap-2">
      {/* Creative HUD Status Header */}
      <div className="flex items-center justify-between w-full px-1">
        <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-widest text-muted-foreground/75 uppercase">
          <span className="relative flex size-1.5">
            <span className="animate-ping absolute inline-flex size-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex size-1.5 rounded-full bg-red-500"></span>
          </span>
          <span>ARSENAL // 24 TECHNOLOGIES</span>
        </div>
        <span className="hidden sm:inline-block font-mono text-[10px] tracking-widest text-muted-foreground/50 uppercase">
          HOVER TO PAUSE & INSPECT ⚡
        </span>
      </div>

      {/* Full-Width Canvas Breakout with Edge Fades */}
      <div
        className="relative left-1/2 -translate-x-1/2 w-[calc(100vw-16px)] sm:w-[calc(100vw-24px)] max-w-[100vw] overflow-hidden select-none py-1"
        style={{
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 92%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 92%, rgba(0,0,0,0) 100%)",
        }}
      >
        <div className="flex flex-col gap-1.5 sm:gap-2">
          {/* Line 1: Right to Left (reverse=false) */}
          <Marquee pauseOnHover repeat={4} className="[--duration:38s] [--gap:0.75rem] sm:[--gap:1rem]">
            {ROW_1.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </Marquee>

          {/* Line 2: Left to Right (reverse=true) */}
          <Marquee reverse pauseOnHover repeat={4} className="[--duration:38s] [--gap:0.75rem] sm:[--gap:1rem]">
            {ROW_2.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
}
