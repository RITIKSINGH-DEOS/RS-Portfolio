import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { PROJECT_CASE_STUDIES } from "@/data/project-case-studies";

interface Props {
  currentSlug: string;
}

export function CaseStudyFooterNav({ currentSlug }: Props) {
  const slugs = Object.keys(PROJECT_CASE_STUDIES);
  const currentIndex = slugs.indexOf(currentSlug);

  const prevSlug = currentIndex > 0 ? slugs[currentIndex - 1] : slugs[slugs.length - 1];
  const nextSlug = currentIndex < slugs.length - 1 ? slugs[currentIndex + 1] : slugs[0];

  const prevStudy = PROJECT_CASE_STUDIES[prevSlug];
  const nextStudy = PROJECT_CASE_STUDIES[nextSlug];

  return (
    <nav
      aria-label="Case Study Navigation"
      className="mt-14 pt-8 border-t border-black/10 dark:border-white/10 space-y-6"
    >
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground/70">
          Continue Exploring
        </p>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Home className="size-3.5" />
          <span>All Projects</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Previous Case Study */}
        {prevStudy && (
          <Link
            href={`/projects/${prevStudy.slug}`}
            className="group flex flex-col justify-between rounded-2xl border border-black/10 dark:border-white/10 bg-card/60 dark:bg-zinc-900/60 p-5 backdrop-blur-md transition-all duration-300 hover:border-red-500/40 hover:shadow-lg text-left"
          >
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground group-hover:text-red-500 transition-colors">
              <ArrowLeft className="size-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
              <span>Previous Case Study</span>
            </div>
            <div className="pt-3">
              <p className="font-serif text-lg font-medium text-foreground tracking-tight group-hover:text-red-500 transition-colors">
                {prevStudy.title}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-1">{prevStudy.tagline}</p>
            </div>
          </Link>
        )}

        {/* Next Case Study */}
        {nextStudy && (
          <Link
            href={`/projects/${nextStudy.slug}`}
            className="group flex flex-col justify-between rounded-2xl border border-black/10 dark:border-white/10 bg-card/60 dark:bg-zinc-900/60 p-5 backdrop-blur-md transition-all duration-300 hover:border-blue-500/40 hover:shadow-lg text-right sm:text-right"
          >
            <div className="flex items-center justify-end gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground group-hover:text-blue-400 transition-colors">
              <span>Next Case Study</span>
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
            <div className="pt-3">
              <p className="font-serif text-lg font-medium text-foreground tracking-tight group-hover:text-blue-400 transition-colors">
                {nextStudy.title}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-1">{nextStudy.tagline}</p>
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
}
