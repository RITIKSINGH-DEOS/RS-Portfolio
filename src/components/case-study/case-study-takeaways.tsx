import React from "react";
import { Lightbulb } from "lucide-react";
import { TakeawayItem } from "@/data/project-case-studies";

interface Props {
  takeaways: TakeawayItem[];
}

export function CaseStudyTakeaways({ takeaways }: Props) {
  return (
    <section id="takeaways" className="scroll-mt-28 space-y-6 pt-10 border-t border-black/10 dark:border-white/10">
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-500 dark:text-amber-400">
          04 // What I Learned
        </p>
        <h2 className="text-2xl sm:text-3xl font-serif font-light tracking-[-0.03em] text-foreground">
          Practical lessons from building this.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {takeaways.map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-black/10 dark:border-white/10 bg-card/60 dark:bg-zinc-900/60 p-5 space-y-3 backdrop-blur-md transition-all duration-300 hover:border-amber-500/30 hover:shadow-md"
          >
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-lg bg-amber-500/10 text-amber-500 dark:bg-amber-400/10 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Lightbulb className="size-3.5" />
              </div>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                {item.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
