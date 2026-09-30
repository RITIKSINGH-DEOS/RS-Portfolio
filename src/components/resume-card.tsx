"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import Markdown from "react-markdown";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
}

export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const hasExpandableDescription = Boolean(description?.trim());
  const showHrefFooter = Boolean(href && href !== "#" && hasExpandableDescription);

  const markdownComponents = {
    a: (props: React.ComponentPropsWithoutRef<"a">) => (
      <a
        {...props}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "font-medium text-primary underline underline-offset-2 hover:text-primary/90",
          props.className
        )}
        onClick={(e) => e.stopPropagation()}
      />
    ),
  };

  const card = (
    <Card className="group relative flex items-start p-3.5 sm:p-4 rounded-xl sm:rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.09] bg-white/75 dark:bg-zinc-950/75 backdrop-blur-xl shadow-[0_4px_20px_-2px_rgba(220,38,38,0.10),0_4px_20px_-2px_rgba(37,99,235,0.10),0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_-4px_rgba(220,38,38,0.22),0_8px_28px_-4px_rgba(37,99,235,0.20),0_6px_16px_rgba(0,0,0,0.07)] hover:border-red-500/35 dark:hover:border-blue-400/40 hover:-translate-y-0.5 transition-all duration-300">
      {/* Spider-Man Base Ambient Lighting (Soft Red & Blue Corner Glows) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -left-10 size-32 sm:size-40 rounded-full bg-red-500/15 dark:bg-red-500/20 blur-2xl transition-opacity duration-300"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -right-10 size-32 sm:size-40 rounded-full bg-blue-500/15 dark:bg-blue-500/20 blur-2xl transition-opacity duration-300"
      />

      {/* Glossy Specular Glass Reflection Sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-transparent dark:from-white/[0.04] dark:via-transparent dark:to-transparent"
      />

      <div className="relative z-10 flex-none pt-0.5">
        <Avatar className="border border-black/[0.08] dark:border-white/[0.12] size-11 sm:size-12 m-auto bg-white/90 dark:bg-zinc-900/90 shadow-sm p-1 backdrop-blur-sm">
          <AvatarImage src={logoUrl} alt={altText} className="object-contain" />
          <AvatarFallback>{altText[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="relative z-10 min-w-0 flex-grow ml-3 sm:ml-4 flex-col group">
        <CardHeader className="p-0 space-y-1">
          <div className="flex items-center justify-between gap-x-2 text-base">
            <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm">
              {title}
              {badges && (
                <span className="inline-flex gap-x-1">
                  {badges.map((badge, index) => (
                    <Badge variant="secondary" className="align-middle text-xs" key={index}>
                      {badge}
                    </Badge>
                  ))}
                </span>
              )}
              {hasExpandableDescription && (
                <ChevronRightIcon
                  className={cn(
                    "size-4 shrink-0 translate-x-0 transform text-muted-foreground transition-all duration-300 ease-out",
                    "opacity-70 group-hover:translate-x-0.5 group-hover:opacity-100",
                    isExpanded ? "rotate-90" : "rotate-0"
                  )}
                  aria-hidden
                />
              )}
            </h3>
            <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
              {period}
            </div>
          </div>
          {subtitle && <div className="font-sans text-xs">{subtitle}</div>}
        </CardHeader>
        {hasExpandableDescription && (
          <motion.div
            initial={false}
            animate={{
              opacity: isExpanded ? 1 : 0,
              height: isExpanded ? "auto" : 0,
            }}
            transition={{
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-2 overflow-hidden"
          >
            <div className="prose prose-sm max-w-full text-pretty font-sans text-muted-foreground dark:prose-invert [&_p]:my-1.5 [&_strong]:text-foreground">
              <Markdown components={markdownComponents}>{description}</Markdown>
              {showHrefFooter && (
                <p className="not-prose mt-3 text-xs">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline underline-offset-2 hover:text-primary/90"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Open related link →
                  </a>
                </p>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </Card>
  );

  if (hasExpandableDescription) {
    return (
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        className="block cursor-pointer rounded-xl sm:rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        onClick={() => setIsExpanded((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsExpanded((v) => !v);
          }
        }}
      >
        {card}
      </div>
    );
  }

  return (
    <Link href={href || "#"} className="block cursor-pointer rounded-xl sm:rounded-2xl">
      {card}
    </Link>
  );
};
