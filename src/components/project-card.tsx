"use client";

import React, { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
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
  dates,
  tags,
  link,
  image,
  video,
  priority,
  links,
  className,
}: Props) {
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const mediaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!video) return;

    // Use IntersectionObserver to lazy-load heavy video streams only when scrolled into proximity
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVideoVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "300px" } // Starts loading 300px before user reaches the card
    );

    if (mediaRef.current) {
      observer.observe(mediaRef.current);
    }

    return () => observer.disconnect();
  }, [video]);

  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden border transition-all duration-300 ease-out h-full bg-card",
        // Spider-Man Themed Drop Shadow (Desktop, Mobile, Tablet)
        "shadow-[0_0_20px_rgba(220,38,38,0.22),0_0_12px_rgba(37,99,235,0.2),0_4px_16px_rgba(0,0,0,0.08)]",
        "border-red-500/25 dark:border-blue-500/30",
        "hover:shadow-[0_0_45px_rgba(220,38,38,0.5),0_0_28px_rgba(37,99,235,0.45),0_15px_45px_rgba(220,38,38,0.35)]",
        "hover:border-red-500/70 dark:hover:border-blue-400/70",
        className
      )}
    >
      {/* Main card clickable area */}
      <Link href={href || "#"} className={cn("block cursor-pointer", className)}>
        {video && (
          <div
            ref={mediaRef}
            className="relative h-40 w-full overflow-hidden bg-zinc-950/40 border-b border-black/[0.05] dark:border-white/[0.05] flex items-center justify-center"
          >
            {isVideoVisible ? (
              <video
                src={video}
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                className="pointer-events-none mx-auto h-40 w-full object-cover object-top transition-opacity duration-500"
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
        {image && (
          <Image
            src={image}
            alt={title}
            width={500}
            height={300}
            priority={priority}
            loading={priority ? undefined : "lazy"}
            decoding="async"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 350px"
            className="h-40 w-full overflow-hidden object-cover object-top"
          />
        )}
      </Link>

      {/* Card content */}
      <CardHeader className="px-2">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base">{title}</CardTitle>
          <time className="font-sans text-xs">{dates}</time>
          {link && (
            <div className="hidden font-sans text-xs underline print:visible">
              {link.replace("https://", "").replace("www.", "").replace("/", "")}
            </div>
          )}
          <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            {description}
          </Markdown>
        </div>
      </CardHeader>

      {/* Tags */}
      <CardContent className="mt-auto flex flex-col px-2">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge
                className="px-1 py-0 text-[10px]"
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      {/* Footer links */}
      <CardFooter className="flex flex-wrap gap-2 px-2 pb-2">
        {links &&
          links.filter((l) => l?.href).map((link, idx) => (
            <Link href={link.href!} key={idx} target="_blank" rel="noopener noreferrer">
              <Badge className="flex gap-2 px-2 py-1 text-[10px]">
                {link.icon}
                {link.type}
              </Badge>
            </Link>
          ))}
      </CardFooter>
    </Card>
  );
}
