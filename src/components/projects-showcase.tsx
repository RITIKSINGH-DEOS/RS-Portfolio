"use client";

import React, { useState } from "react";
import { CurvedProjectCarousel } from "@/components/curved-project-carousel";
import { ProjectsGrid } from "@/components/projects-grid";
import { Layers, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectItem {
  title: string;
  href?: string;
  description: string;
  dates: string;
  technologies: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon?: React.ReactNode;
    type: string;
    href?: string;
  }[];
}

interface Props {
  projects: readonly ProjectItem[];
}

export function ProjectsShowcase({ projects }: Props) {
  const [viewMode, setViewMode] = useState<"3d" | "grid">("3d");

  return (
    <div className="w-full space-y-6">
      {/* View Switcher: 3D Curved vs Minimal Grid */}
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center p-1 rounded-full border border-black/10 dark:border-white/10 bg-card/60 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm">
          <button
            type="button"
            onClick={() => setViewMode("3d")}
            className={cn(
              "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300",
              viewMode === "3d"
                ? "bg-foreground text-background font-semibold shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Layers className="size-3.5 text-red-500 dark:text-blue-400" />
            <span>3D Curved</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={cn(
              "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300",
              viewMode === "grid"
                ? "bg-foreground text-background font-semibold shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <LayoutGrid className="size-3.5" />
            <span>Grid</span>
          </button>
        </div>
      </div>

      {/* Main Display: 3D Curved Ribbon or Standard Grid */}
      <div className="w-full">
        {viewMode === "3d" ? (
          <div className="w-screen relative left-1/2 -translate-x-1/2 max-w-[100vw] overflow-x-hidden px-2 sm:px-6">
            <CurvedProjectCarousel projects={projects} />
          </div>
        ) : (
          <ProjectsGrid projects={projects} />
        )}
      </div>
    </div>
  );
}
