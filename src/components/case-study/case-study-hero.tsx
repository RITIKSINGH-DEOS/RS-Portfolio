"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github, Play, Pause } from "lucide-react";
import { ProjectCaseStudy } from "@/data/project-case-studies";
import { Badge } from "@/components/ui/badge";

interface Props {
  study: ProjectCaseStudy;
}

export function CaseStudyHero({ study }: Props) {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <header className="relative w-full space-y-6 pt-4 pb-4">
      {/* Top Navigation Row: Back Button & Category Tags */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/15 bg-card/60 dark:bg-zinc-900/60 px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground backdrop-blur-md transition-all duration-200 hover:border-red-500/50 hover:text-foreground hover:shadow-[0_0_15px_rgba(220,38,38,0.25)]"
        >
          <ArrowLeft className="size-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to Projects</span>
        </Link>

        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="border-red-500/30 bg-red-500/10 text-red-500 dark:text-red-400 font-mono text-[11px] tracking-wide"
          >
            {study.categoryBadge}
          </Badge>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {study.statusBadge}
          </span>
        </div>
      </div>

      {/* Main Headline & Simple Summary */}
      <div className="space-y-3">
        <div className="space-y-1">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/80">
            Project Overview // {study.title}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light tracking-[-0.03em] text-foreground leading-[1.12]">
            {study.heroHeadline}
          </h1>
        </div>

        <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          {study.summary}
        </p>

        {/* Action Buttons: Live Demo & GitHub */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {study.specs.liveUrl && (
            <a
              href={study.specs.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-red-500/20 transition-all duration-200 hover:scale-[1.02] hover:shadow-red-500/40 active:scale-[0.98]"
            >
              <span>Try Live Demo</span>
              <ExternalLink className="size-4" />
            </a>
          )}

          {study.specs.githubUrl && (
            <a
              href={study.specs.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/15 bg-card/70 dark:bg-zinc-900/70 px-4 py-2.5 text-sm font-medium text-foreground backdrop-blur-md transition-all duration-200 hover:border-blue-500/50 hover:bg-zinc-800/80 hover:shadow-[0_0_20px_rgba(37,99,235,0.2)]"
            >
              <Github className="size-4" />
              <span>GitHub Code</span>
            </a>
          )}
        </div>
      </div>

      {/* Clean Quick Specs Bar */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-black/10 dark:border-white/10 py-3 text-xs text-muted-foreground font-mono">
        <div>
          <span className="text-foreground font-medium">Role:</span> {study.specs.role}
        </div>
        <div>
          <span className="text-foreground font-medium">Built With:</span> {study.specs.stack.slice(0, 4).join(" · ")}
        </div>
        <div>
          <span className="text-foreground font-medium">Date:</span> {study.specs.timeline}
        </div>
      </div>

      {/* 3 High-Impact Metrics */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {study.metrics.map((metric, i) => (
          <div
            key={i}
            className="rounded-2xl border border-black/10 dark:border-white/10 bg-card/60 dark:bg-zinc-900/60 p-4 transition-all duration-300 hover:border-red-500/30"
          >
            <span className="font-mono text-2xl font-semibold text-foreground">
              {metric.value}
            </span>
            <p className="text-xs font-medium text-foreground mt-0.5">{metric.label}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{metric.desc}</p>
          </div>
        ))}
      </div>

      {/* Hero Media (Video or Image) */}
      {(study.specs.video || study.specs.image) && (
        <div className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-950 shadow-xl">
          {study.specs.video ? (
            <div className="relative aspect-video w-full">
              <video
                ref={videoRef}
                src={study.specs.video}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover object-top"
              />
              <button
                type="button"
                onClick={toggleVideo}
                className="absolute bottom-3 right-3 flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md hover:scale-110 active:scale-95"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5 ml-0.5" />}
              </button>
            </div>
          ) : study.specs.image ? (
            <div className="relative aspect-video w-full">
              <Image
                src={study.specs.image}
                alt={`${study.title} Preview`}
                fill
                priority
                className="object-cover object-top"
              />
            </div>
          ) : null}
        </div>
      )}
    </header>
  );
}
