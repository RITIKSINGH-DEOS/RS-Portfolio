import React from "react";
import { FeatureDeepDive } from "@/data/project-case-studies";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface Props {
  features: FeatureDeepDive[];
}

export function CaseStudyFeatures({ features }: Props) {
  return (
    <section id="features" className="scroll-mt-28 space-y-6 pt-10 border-t border-black/10 dark:border-white/10">
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-purple-500 dark:text-purple-400">
          04 // Deep Technical Features & Implementation
        </p>
        <h2 className="text-2xl sm:text-3xl font-serif font-light tracking-[-0.03em] text-foreground">
          Engineered for production resilience.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-black/10 dark:border-white/10 bg-card/60 dark:bg-zinc-900/60 p-5 space-y-3 backdrop-blur-md transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-mono text-sm font-semibold text-foreground uppercase tracking-wider">
                {feature.title}
              </h3>
              <Badge variant="outline" className="font-mono text-[9px] border-purple-500/30 text-purple-400 shrink-0">
                {feature.tag}
              </Badge>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {feature.summary}
            </p>

            <ul className="space-y-1.5 pt-2 border-t border-black/[0.06] dark:border-white/[0.06]">
              {feature.bullets.map((bullet, bIdx) => (
                <li key={bIdx} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Check className="size-3.5 text-purple-400 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
