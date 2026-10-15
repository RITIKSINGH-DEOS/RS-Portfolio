import React from "react";
import { ArrowRight } from "lucide-react";
import { HowItWorksStep } from "@/data/project-case-studies";

interface Props {
  howItWorks: {
    headline: string;
    steps: HowItWorksStep[];
  };
}

export function CaseStudyHowItWorks({ howItWorks }: Props) {
  return (
    <section id="how-it-works" className="scroll-mt-28 space-y-6 pt-10 border-t border-black/10 dark:border-white/10">
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400">
          02 // How It Works
        </p>
        <h2 className="text-2xl sm:text-3xl font-serif font-light tracking-[-0.03em] text-foreground">
          {howItWorks.headline}
        </h2>
      </div>

      {/* 3 Simple Action Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {howItWorks.steps.map((item, idx) => (
          <div
            key={idx}
            className="relative rounded-2xl border border-black/10 dark:border-white/10 bg-card/60 dark:bg-zinc-900/60 p-5 space-y-3 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:shadow-md"
          >
            {/* Step badge */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 dark:bg-blue-400/10 dark:text-blue-400 border border-blue-500/20">
                STEP {item.step}
              </span>
              {idx < howItWorks.steps.length - 1 && (
                <ArrowRight className="hidden md:block size-4 text-muted-foreground/40 -mr-2" />
              )}
            </div>

            <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-foreground">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
