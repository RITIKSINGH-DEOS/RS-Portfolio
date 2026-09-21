"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Interactive3DNameProps {
  prefix?: string;
  name: string;
  suffix?: string;
  className?: string;
}

export function Interactive3DName({
  prefix = "Hi, I'm",
  name = "Ritik",
  suffix = "",
  className = "",
}: Interactive3DNameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Motion Values for perspective tilt on mouse move
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 350, damping: 22 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["14deg", "-14deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-14deg", "14deg"]);

  // Mouse Move tracking for 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const prefixChars = Array.from(prefix);

  // Slow, elegant wave configuration
  const waveDuration = 2.8;
  const waveStagger = 0.11;
  const waveLift = isHovered ? -9 : -6.5;

  return (
    <div
      style={{ perspective: 900 }}
      className={`inline-block select-none ${className}`}
    >
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={
          isHovered
            ? { scale: 1.03, z: 20 }
            : { scale: 1, z: 0 }
        }
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex items-center flex-wrap gap-x-2.5 sm:gap-x-3 gap-y-1 cursor-pointer py-1"
      >
        {/* Prefix "Hi, I'm" with Slow Wavy Motion */}
        {prefix && (
          <span className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground inline-flex items-center">
            {prefixChars.map((char, i) => (
              <motion.span
                key={`prefix-${i}`}
                animate={{
                  y: [0, waveLift, 0],
                }}
                transition={{
                  duration: waveDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * waveStagger,
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
        )}

        {/* Person Name styled like first image with Theme Gradient (Spider-Man Red to Blue) */}
        <motion.span
          style={{ transform: "translateZ(20px)" }}
          animate={{
            y: [0, waveLift, 0],
          }}
          transition={{
            duration: waveDuration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: prefixChars.length * waveStagger,
          }}
          className="relative inline-block text-3xl font-extrabold uppercase tracking-tight sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-red-500 via-rose-500 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_2px_14px_rgba(239,68,68,0.25)] hover:drop-shadow-[0_4px_22px_rgba(239,68,68,0.45)] transition-all duration-300 select-none"
        >
          {name}
        </motion.span>

        {/* Optional Suffix (only rendered if suffix provided and non-empty) */}
        {suffix && (
          <motion.span
            style={{ transform: "translateZ(35px)" }}
            animate={
              isHovered
                ? {
                    rotate: [0, 22, -12, 22, -8, 0],
                    scale: [1, 1.22, 1.12, 1.22, 1],
                    y: [0, waveLift - 2, 0],
                  }
                : {
                    rotate: [0, 12, -4, 12, 0],
                    y: [0, waveLift, 0],
                  }
            }
            transition={{
              duration: isHovered ? 0.9 : waveDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (prefixChars.length + name.length + 1) * waveStagger,
            }}
            className="inline-block text-3xl sm:text-5xl xl:text-6xl origin-[70%_70%] ml-0.5"
          >
            {suffix}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
