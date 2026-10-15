import React from "react";
import { AlertCircle, Ban, SearchX } from "lucide-react";

interface BulletPoint {
  title: string;
  desc: string;
}

interface Props {
  problem: {
    headline: string;
    story: string;
    bulletPoints: BulletPoint[];
  };
}

export function CaseStudyProblem({ problem }: Props) {
  const icons = [
    <SearchX key="0" className="size-4 text-red-500 shrink-0" />,
    <Ban key="1" className="size-4 text-amber-500 shrink-0" />,
    <AlertCircle key="2" className="size-4 text-blue-500 shrink-0" />,
  ];

  return (
    <section id="problem" className="scroll-mt-28 space-y-6 pt-8 border-t border-black/10 dark:border-white/10">
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-red-500 dark:text-red-400">
          01 // The Problem
        </p>
        <h2 className="text-2xl sm:text-3xl font-serif font-light tracking-[-0.03em] text-foreground">
          {problem.headline}
        </h2>
      </div>

      <p className="text-base text-muted-foreground leading-relaxed">
        {problem.story}
      </p>

      {/* 3 Human Pain Point Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 pt-2">
        {problem.bulletPoints.map((point, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-black/10 dark:border-white/10 bg-card/60 dark:bg-zinc-900/60 p-5 space-y-2.5 backdrop-blur-sm transition-all duration-300 hover:border-red-500/30 hover:shadow-md"
          >
            <div className="flex items-center gap-2.5">
              {icons[idx % icons.length]}
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                {point.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {point.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
