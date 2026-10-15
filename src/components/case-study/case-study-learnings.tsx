import React from "react";
import { ArrowUpRight, Compass, Lightbulb } from "lucide-react";

interface Props {
  learnings: { title: string; description: string }[];
  nextSteps: string[];
}

export function CaseStudyLearnings({ learnings, nextSteps }: Props) {
  return (
    <section id="learnings" className="scroll-mt-28 space-y-6 pt-10 border-t border-black/10 dark:border-white/10">
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-500 dark:text-amber-400">
          06 // Engineering Retrospective & Future Roadmap
        </p>
        <h2 className="text-2xl sm:text-3xl font-serif font-light tracking-[-0.03em] text-foreground">
          What building this taught me about production systems.
        </h2>
      </div>

      {/* Learnings Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        {learnings.map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-black/10 dark:border-white/10 bg-card/60 dark:bg-zinc-900/60 p-5 space-y-2.5 backdrop-blur-md transition-all duration-300 hover:border-amber-500/30"
          >
            <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400">
              <Lightbulb className="size-4 shrink-0" />
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                {item.title}
              </h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Next Steps / Roadmap */}
      {nextSteps && nextSteps.length > 0 && (
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-card/40 dark:bg-zinc-950/40 p-5 space-y-3 backdrop-blur-sm">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-foreground font-semibold">
            <Compass className="size-4 text-red-500 dark:text-blue-400" />
            <span>Next Engineering Horizons</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {nextSteps.map((step, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs text-muted-foreground border-l-2 border-red-500/40 pl-3 py-1"
              >
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
