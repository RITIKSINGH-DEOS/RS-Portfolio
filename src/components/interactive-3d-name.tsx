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
  suffix = "👋",
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
  const nameChars = Array.from(name);

  // Slow, elegant wave configuration
  const waveDuration = 2.8; // Slow duration for luxurious premium feel
  const waveStagger = 0.11; // Staggered phase offset per character
  const waveLift = isHovered ? -9 : -6.5; // Gentle vertical lift

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
            ? { scale: 1.04, z: 25 }
            : { scale: 1, z: 0 }
        }
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex items-center flex-wrap gap-x-2.5 gap-y-1 cursor-pointer py-1"
      >
        {/* Prefix "Hi, I'm" with Slow Wavy Motion */}
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

        {/* 3D Person Name with Slow Wavy Motion & Pure Crisp White 3D Depth */}
        <span
          style={{ transform: "translateZ(25px)" }}
          className="relative inline-flex items-center text-3xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl/none text-white dark:text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.55)] [text-shadow:0_1px_0_#d4d4d8,0_2px_0_#a1a1aa,0_3px_0_#71717a,0_4px_8px_rgba(0,0,0,0.4)] dark:[text-shadow:0_1px_0_#e4e4e7,0_2px_0_#a1a1aa,0_3px_0_#71717a,0_5px_12px_rgba(0,0,0,0.85)]"
        >
          {nameChars.map((char, i) => {
            const charIndex = prefixChars.length + 1 + i;
            return (
              <motion.span
                key={`name-${i}`}
                animate={{
                  y: [0, waveLift, 0],
                }}
                transition={{
                  duration: waveDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: charIndex * waveStagger,
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            );
          })}
        </span>

        {/* Waving Hand Emoji (👋) synchronized with wave rhythm */}
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
            delay: (prefixChars.length + nameChars.length + 1) * waveStagger,
          }}
          className="inline-block text-3xl sm:text-5xl xl:text-6xl origin-[70%_70%] ml-0.5"
        >
          {suffix}
        </motion.span>
      </motion.div>
    </div>
  );
}
