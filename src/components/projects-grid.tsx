"use client";

import React, { useState, useEffect } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { motion } from "framer-motion";

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

interface ProjectsGridProps {
  projects: readonly ProjectItem[];
  blurFadeDelay?: number;
  baseDelay?: number;
}

export function ProjectsGrid({ projects, blurFadeDelay = 0.04, baseDelay }: ProjectsGridProps) {
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect desktop screen (>= 1024px)
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-2xl mx-auto w-full relative">
      {projects.map((project, id) => {
        const isThisHovered = isDesktop && hoveredTitle === project.title;
        const isOtherHovered = isDesktop && hoveredTitle !== null && !isThisHovered;

        return (
          <BlurFade
            key={project.title}
            delay={(baseDelay !== undefined ? baseDelay : 0.05) + id * 0.03}
            className="h-full"
          >
            <motion.div
              className="h-full relative cursor-pointer"
              onMouseEnter={() => {
                if (isDesktop) setHoveredTitle(project.title);
              }}
              onMouseLeave={() => {
                if (isDesktop) setHoveredTitle(null);
              }}
              animate={
                isDesktop
                  ? isThisHovered
                    ? {
                        scale: 1.12,
                        zIndex: 40,
                        opacity: 1,
                        filter: "blur(0px)",
                      }
                    : isOtherHovered
                    ? {
                        scale: 0.92,
                        zIndex: 1,
                        opacity: 0.12,
                        filter: "blur(3px)",
                      }
                    : {
                        scale: 1,
                        zIndex: 1,
                        opacity: 1,
                        filter: "blur(0px)",
                      }
                  : {
                      scale: 1,
                      zIndex: 1,
                      opacity: 1,
                      filter: "blur(0px)",
                    }
              }
              transition={{
                duration: 0.28,
                ease: [0.25, 1, 0.5, 1],
              }}
            >
              <ProjectCard
                href={project.href}
                title={project.title}
                description={project.description}
                dates={project.dates}
                tags={project.technologies}
                image={project.image}
                video={project.video}
                links={project.links}
              />
            </motion.div>
          </BlurFade>
        );
      })}
    </div>
  );
}
