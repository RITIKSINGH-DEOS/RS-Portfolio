import React from "react";
import { AlertCircle, ShieldAlert, ZapOff } from "lucide-react";

interface PainPoint {
  title: string;
  desc: string;
}

interface Props {
  problem: {
    headline: string;
    description: string;
    painPoints: PainPoint[];
  };
}

export function CaseStudyProblem({ problem }: Props) {
  const icons = [
    <AlertCircle key="0" className="size-5 text-red-500" />,
    <ShieldAlert key="1" className="size-5 text-amber-500" />,
    <ZapOff key="2" className="size-5 text-blue-500" />,
  ];

  return (
    <section id="problem" className="scroll-mt-28 space-y-6 pt-8 border-t border-black/10 dark:border-white/10">
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-red-500 dark:text-red-400">
          01 // The Core Problem
        </p>
        <h2 className="text-2xl sm:text-3xl font-serif font-light tracking-[-0.03em] text-foreground">
          {problem.headline}
        </h2>
      </div>

      <p className="text-base text-muted-foreground leading-relaxed">
        {problem.description}
      </p>

      {/* Pain Points Callouts */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 pt-2">
        {problem.painPoints.map((point, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-black/10 dark:border-white/10 bg-card/50 dark:bg-zinc-900/50 p-4 space-y-2 backdrop-blur-sm transition-all duration-300 hover:border-red-500/30 hover:shadow-lg"
          >
            <div className="flex items-center gap-2">
              {icons[idx % icons.length]}
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                {point.title}
              </h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{point.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
