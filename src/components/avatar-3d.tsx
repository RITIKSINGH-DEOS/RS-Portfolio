"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Avatar3DProps {
  src: string;
  alt: string;
  initials: string;
  className?: string;
}

export function Avatar3D({ src, alt, initials, className = "size-28" }: Avatar3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  // Mouse position values relative to center (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for buttery-smooth 3D tilt response
  const mouseXSpring = useSpring(x, { stiffness: 350, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 350, damping: 22 });

  // 3D Rotation transformations
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["24deg", "-24deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-24deg", "24deg"]);

  // Dynamic light glare position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isSpinning) return;
    const rect = cardRef.current.getBoundingClientRect();
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

  const handleClick = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
      x.set(0);
      y.set(0);
    }, 1750);
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="relative flex items-center justify-center cursor-pointer select-none"
    >
      {/* Spider-Man Themed Dual Gradient Glowing Aura Ring */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: isHovered ? [1.08, 1.14, 1.08] : [1, 1.03, 1],
        }}
        transition={{
          rotate: { repeat: Infinity, duration: 8, ease: "linear" },
          scale: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
        }}
        className="absolute -inset-1 rounded-full bg-gradient-to-tr from-red-600 via-blue-500 to-red-500 opacity-65 blur-[5px] transition-all duration-300 group-hover:opacity-100"
      />

      {/* Main 3D Card Container */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        animate={
          isSpinning
            ? {
                rotateY: [0, 360],
                rotateX: [0, 8, -8, 0],
                scale: [1, 1.12, 1.06, 1],
                transition: { duration: 1.75, ease: [0.2, 0.9, 0.3, 1] },
              }
            : isHovered
            ? {
                scale: 1.1,
                z: 35,
                transition: { duration: 0.2 },
              }
            : {
                scale: 1,
                y: [0, -3.5, 0],
                rotateZ: [0, 0.8, -0.8, 0],
                transition: {
                  y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                  rotateZ: { repeat: Infinity, duration: 4.5, ease: "easeInOut" },
                  scale: { duration: 0.2 },
                },
              }
        }
        style={{
          rotateX: isSpinning ? 0 : rotateX,
          rotateY: isSpinning ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative ${className} rounded-full p-[2px] bg-gradient-to-r from-red-600 to-blue-600 shadow-xl transition-shadow duration-300 hover:shadow-[0_20px_40px_-10px_rgba(220,38,38,0.5),0_0_25px_rgba(37,99,235,0.45)]`}
      >
        {/* Inner Avatar with rounded clip */}
        <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-white/20 bg-background">
          <Avatar className="h-full w-full">
            <AvatarImage
              alt={alt}
              src={src}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          {/* Holographic Specular Glare Layer */}
          <motion.div
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.1) 35%, transparent 65%)`,
              opacity: isHovered ? 0.85 : 0,
            }}
            className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-200"
          />

          {/* Spider-Man Suit Web Rim Overlay */}
          <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
        </div>

        {/* Small floating 3D spider web icon badge */}
        <motion.div
          animate={
            isHovered
              ? { scale: [1, 1.25, 1], rotate: [0, 10, -10, 0] }
              : { scale: 1, rotate: 0 }
          }
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full bg-gradient-to-tr from-red-600 to-blue-600 shadow-md border-2 border-background text-[11px]"
          title="Click me for a 360° Spider-Spin!"
        >
          🕸️
        </motion.div>
      </motion.div>
    </div>
  );
}
