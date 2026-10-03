"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";

interface RedirectPortalProps {
  title: string;
  description: string;
  targetUrl: string;
  buttonText: string;
  badge: string;
  icon: React.ReactNode;
}

export function RedirectPortal({
  title,
  description,
  targetUrl,
  buttonText,
  badge,
  icon,
}: RedirectPortalProps) {
  const [seconds, setSeconds] = useState(2);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = targetUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetUrl]);

  return (
    <section className="min-h-[55vh] flex flex-col items-center justify-center py-10 text-center">
      <BlurFade delay={0.05}>
        <div className="relative group p-7 sm:p-9 rounded-2xl sm:rounded-3xl border border-black/[0.08] dark:border-white/[0.12] bg-card/70 dark:bg-zinc-950/75 backdrop-blur-xl shadow-2xl max-w-md mx-auto">
          {/* Ambient Corner Glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 -left-10 size-36 rounded-full bg-red-500/20 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-10 -right-10 size-36 rounded-full bg-blue-500/20 blur-2xl"
          />

          <div className="relative z-10 flex flex-col items-center space-y-4">
            <div className="size-14 rounded-2xl border border-black/10 dark:border-white/15 bg-white/90 dark:bg-zinc-900/90 shadow-md flex items-center justify-center text-foreground">
              {icon}
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-red-500/20 bg-red-500/10 text-[11px] font-mono font-medium text-red-600 dark:text-red-400">
              <span>{badge}</span>
            </div>

            <h1 className="font-serif font-light text-2xl sm:text-3xl text-foreground tracking-tight">
              {title}
            </h1>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xs">
              {description}
            </p>

            <div className="pt-2 w-full space-y-3">
              <a
                href={targetUrl}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-blue-600 hover:from-red-500 hover:to-blue-500 w-full px-6 py-3 text-sm font-medium text-white shadow-lg shadow-red-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>{buttonText}</span>
                <ArrowUpRight className="size-4" />
              </a>

              <p className="text-[11px] text-muted-foreground/75 font-mono">
                {seconds > 0
                  ? `Redirecting automatically in ${seconds}s...`
                  : "Opening link..."}
              </p>

              <div className="pt-2">
                <Link
                  href="/"
                  className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4"
                >
                  ← Back to Portfolio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
