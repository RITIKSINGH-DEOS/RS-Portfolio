import React from "react";
import { PipelineStep } from "@/data/project-case-studies";
import { Badge } from "@/components/ui/badge";

interface Props {
  architecture: {
    headline: string;
    description: string;
    pipeline: PipelineStep[];
  };
}

export function CaseStudyPipeline({ architecture }: Props) {
  return (
    <section id="architecture" className="scroll-mt-28 space-y-6 pt-10 border-t border-black/10 dark:border-white/10">
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400">
          02 // System Architecture & Execution Flow
        </p>
        <h2 className="text-2xl sm:text-3xl font-serif font-light tracking-[-0.03em] text-foreground">
          {architecture.headline}
        </h2>
      </div>

      <p className="text-base text-muted-foreground leading-relaxed">
        {architecture.description}
      </p>

      {/* Step-by-Step Architecture Pipeline */}
      <div className="relative space-y-4 pt-2">
        {architecture.pipeline.map((step, idx) => (
          <div
            key={idx}
            className="group relative flex flex-col sm:flex-row sm:items-start gap-4 rounded-2xl border border-black/10 dark:border-white/10 bg-card/60 dark:bg-zinc-900/60 p-4 sm:p-5 backdrop-blur-md transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)]"
          >
            {/* Step Number Badge */}
            <div className="flex items-center gap-3 sm:block">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 font-mono text-sm font-semibold text-blue-500 dark:text-blue-400 group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(37,99,235,0.5)] transition-all">
                {step.step}
              </span>
              <span className="sm:hidden font-mono text-xs font-semibold text-foreground uppercase tracking-wide">
                {step.name}
              </span>
            </div>

            {/* Step Details */}
            <div className="min-w-0 flex-1 space-y-2">
              <div className="hidden sm:flex items-center justify-between gap-2">
                <h3 className="font-mono text-sm font-semibold text-foreground uppercase tracking-wide">
                  {step.name}
                </h3>
                <Badge variant="secondary" className="font-mono text-[10px] tracking-wide">
                  {step.tech}
                </Badge>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {step.detail}
              </p>

              <div className="sm:hidden pt-1">
                <Badge variant="secondary" className="font-mono text-[10px] tracking-wide">
                  {step.tech}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
