import React from "react";
import { Badge } from "@/components/ui/badge";

interface StatItem {
  label: string;
  value: string;
  badge: string;
  context: string;
}

interface Props {
  benchmarks: {
    headline: string;
    description: string;
    stats: StatItem[];
  };
}

export function CaseStudyBenchmarks({ benchmarks }: Props) {
  return (
    <section id="benchmarks" className="scroll-mt-28 space-y-6 pt-10 border-t border-black/10 dark:border-white/10">
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-500 dark:text-cyan-400">
          05 // Performance Benchmarks & Telemetry
        </p>
        <h2 className="text-2xl sm:text-3xl font-serif font-light tracking-[-0.03em] text-foreground">
          {benchmarks.headline}
        </h2>
      </div>

      <p className="text-base text-muted-foreground leading-relaxed">
        {benchmarks.description}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        {benchmarks.stats.map((stat, idx) => (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-card/60 dark:bg-zinc-900/60 p-4 space-y-2 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
          >
            <div className="flex items-center justify-between gap-1">
              <span className="font-mono text-2xl font-semibold text-foreground group-hover:text-cyan-400 transition-colors">
                {stat.value}
              </span>
              <Badge variant="outline" className="font-mono text-[9px] border-cyan-500/30 text-cyan-400">
                {stat.badge}
              </Badge>
            </div>
            <p className="font-mono text-xs font-medium text-foreground">{stat.label}</p>
            <p className="text-[11px] text-muted-foreground leading-snug">{stat.context}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
