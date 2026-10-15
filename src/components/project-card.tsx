"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const PROJECT_SLUGS: Record<string, string> = {
  "ResumeAI": "resume-ai",
  "MedConnect": "medconnect",
  "AI Learning Assistant": "ai-learning-assistant",
  "Support AI": "support-ai",
};

interface Props {
  title: string;
  href?: string;
  description: string;
  dates?: string;
  tags?: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  priority?: boolean;
  links?: readonly {
    icon?: React.ReactNode;
    type: string;
    href?: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  image,
  video,
  priority,
  className,
}: Props) {
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const mediaRef = useRef<HTMLDivElement | null>(null);

  const caseStudySlug = PROJECT_SLUGS[title];
  const targetUrl = caseStudySlug ? `/projects/${caseStudySlug}` : (href || "#");

  useEffect(() => {
    if (!video) return;

    // Use IntersectionObserver to lazy-load video streams only when scrolled into proximity
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVideoVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "300px" }
    );

    if (mediaRef.current) {
      observer.observe(mediaRef.current);
    }

    return () => observer.disconnect();
  }, [video]);

  return (
    <Link href={targetUrl} className="group block h-full select-none cursor-pointer">
      <Card
        className={cn(
          "flex flex-col overflow-hidden border transition-all duration-500 ease-out h-full bg-card rounded-2xl",
          // Spider-Man Themed Drop Shadow
          "shadow-[0_0_20px_rgba(220,38,38,0.22),0_0_12px_rgba(37,99,235,0.2),0_4px_16px_rgba(0,0,0,0.08)]",
          "border-red-500/25 dark:border-blue-500/30",
          "group-hover:shadow-[0_0_40px_rgba(220,38,38,0.45),0_0_24px_rgba(37,99,235,0.4),0_12px_36px_rgba(220,38,38,0.25)]",
          "group-hover:border-red-500/60 dark:group-hover:border-blue-400/60",
          className
        )}
      >
        {/* Media Preview (Video / Image) */}
        {video && (
          <div
            ref={mediaRef}
            className="relative h-44 sm:h-48 w-full overflow-hidden bg-zinc-950/40 border-b border-black/[0.05] dark:border-white/[0.05] flex items-center justify-center"
          >
            {isVideoVisible ? (
              <video
                src={video}
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                className="pointer-events-none mx-auto h-44 sm:h-48 w-full object-cover object-top transition-opacity duration-500"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 select-none">
                <div className="size-9 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center text-red-500 shadow-sm animate-pulse">
                  <svg className="size-3.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground/60">
                  {title} Demo
                </span>
              </div>
            )}
          </div>
        )}

        {image && !video && (
          <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-zinc-950/40 border-b border-black/[0.05] dark:border-white/[0.05]">
            <Image
              src={image}
              alt={title}
              width={500}
              height={300}
              priority={priority}
              loading={priority ? undefined : "lazy"}
              decoding="async"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 350px"
              className="h-44 sm:h-48 w-full overflow-hidden object-cover object-top"
            />
          </div>
        )}

        {/* Clean Minimal Content: Project Name on top, short summary below */}
        <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-serif text-lg sm:text-xl font-medium tracking-tight text-foreground group-hover:text-red-500 dark:group-hover:text-blue-400 transition-colors">
                {title}
              </h3>
              <ArrowUpRight className="size-4 text-muted-foreground/50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground shrink-0" />
            </div>

            <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
