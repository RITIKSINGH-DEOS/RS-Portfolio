import React from "react";
import { TradeoffItem } from "@/data/project-case-studies";
import { CheckCircle2, XCircle } from "lucide-react";

interface Props {
  tradeoffs: TradeoffItem[];
}

export function CaseStudyTradeoffs({ tradeoffs }: Props) {
  return (
    <section id="tradeoffs" className="scroll-mt-28 space-y-6 pt-10 border-t border-black/10 dark:border-white/10">
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-500 dark:text-emerald-400">
          03 // Engineering Trade-offs & Architecture Decisions
        </p>
        <h2 className="text-2xl sm:text-3xl font-serif font-light tracking-[-0.03em] text-foreground">
          What was chosen, what was rejected, and why.
        </h2>
      </div>

      <p className="text-base text-muted-foreground leading-relaxed">
        Engineering is the practice of evaluating trade-offs. Here is the rationale behind the architectural choices that define this project.
      </p>

      <div className="grid grid-cols-1 gap-4 pt-2">
        {tradeoffs.map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-black/10 dark:border-white/10 bg-card/60 dark:bg-zinc-900/60 p-5 space-y-4 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/30"
          >
            <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-foreground">
              {item.decision}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Chosen option */}
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 space-y-1">
                <div className="flex items-center gap-1.5 font-mono text-emerald-500 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="size-4" />
                  <span>Chosen Approach</span>
                </div>
                <p className="font-medium text-foreground">{item.chosen}</p>
              </div>

              {/* Rejected alternative */}
              <div className="rounded-xl border border-red-500/15 bg-red-500/5 p-3 space-y-1">
                <div className="flex items-center gap-1.5 font-mono text-muted-foreground font-medium">
                  <XCircle className="size-4 text-muted-foreground/60" />
                  <span>Considered Alternative</span>
                </div>
                <p className="text-muted-foreground">{item.alternative}</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
              <strong className="text-foreground font-medium font-mono text-xs mr-1">RATIONALE:</strong>
              {item.reasoning}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
