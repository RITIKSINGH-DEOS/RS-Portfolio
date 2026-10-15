"use client";

import React from "react";
import { CurvedProjectCarousel } from "@/components/curved-project-carousel";

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
  return (
    <div className="w-full">
      <div className="w-screen relative left-1/2 -translate-x-1/2 max-w-[100vw] overflow-x-hidden px-2 sm:px-6">
        <CurvedProjectCarousel projects={projects} />
      </div>
    </div>
  );
}
