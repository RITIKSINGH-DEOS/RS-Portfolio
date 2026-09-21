"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  magnification?: number;
  distance?: number;
  children: React.ReactNode;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
  "mx-auto w-max h-full p-2 flex items-end rounded-full border"
);

interface DockContextType {
  mousex: any;
  magnification: number;
  distance: number;
}

const DockContext = createContext<DockContextType>({
  mousex: null,
  magnification: DEFAULT_MAGNIFICATION,
  distance: DEFAULT_DISTANCE,
});

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      ...props
    },
    ref
  ) => {
    const mousex = useMotionValue(Infinity);
    const dockRef = useRef<HTMLDivElement | null>(null);
    const [spotlight, setSpotlight] = useState<{ x: number; y: number; opacity: number }>({
      x: 0,
      y: 0,
      opacity: 0,
    });

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      mousex.set(e.clientX);
      const bounds = dockRef.current?.getBoundingClientRect();
      if (bounds) {
        setSpotlight({
          x: e.clientX - bounds.left,
          y: e.clientY - bounds.top,
          opacity: 1,
        });
      }
    };

    const handlePointerLeave = () => {
      mousex.set(Infinity);
      setSpotlight((prev) => ({ ...prev, opacity: 0 }));
    };

    return (
      <DockContext.Provider
        value={{
          mousex,
          magnification,
          distance,
        }}
      >
        <motion.div
          ref={(node) => {
            dockRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onTouchMove={(e) => {
            if (e.touches[0]) {
              mousex.set(e.touches[0].clientX);
              const bounds = dockRef.current?.getBoundingClientRect();
              if (bounds) {
                setSpotlight({
                  x: e.touches[0].clientX - bounds.left,
                  y: e.touches[0].clientY - bounds.top,
                  opacity: 1,
                });
              }
            }
          }}
          onTouchEnd={() => {
            mousex.set(Infinity);
            setSpotlight((prev) => ({ ...prev, opacity: 0 }));
          }}
          whileHover={{ y: -3, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 320, damping: 20 }}
          {...props}
          className={cn(dockVariants({ className }), "relative overflow-visible group/dock")}
        >
          {/* Spider-Man interactive dynamic spotlight following cursor across navbar */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full overflow-hidden transition-opacity duration-300"
            style={{
              opacity: spotlight.opacity,
              background: `radial-gradient(130px circle at ${spotlight.x}px ${spotlight.y}px, rgba(220, 38, 38, 0.25), rgba(37, 99, 235, 0.2), transparent 70%)`,
            }}
          />
          {children}
        </motion.div>
      </DockContext.Provider>
    );
  }
);

Dock.displayName = "Dock";

export interface DockIconProps {
  size?: number;
  className?: string;
  children?: React.ReactNode;
}

const DockIcon = ({
  size,
  className,
  children,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const context = useContext(DockContext);
  const mousex = context?.mousex;
  const magnification = context?.magnification ?? DEFAULT_MAGNIFICATION;
  const distance = context?.distance ?? DEFAULT_DISTANCE;

  const fallbackMouseX = useMotionValue(Infinity);
  const activeMouseX = mousex ?? fallbackMouseX;

  const distanceCalc = useTransform(activeMouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [40, magnification, 40]
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 220,
    damping: 16,
  });

  const ySync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [0, -8, 0]
  );

  const y = useSpring(ySync, {
    mass: 0.1,
    stiffness: 220,
    damping: 16,
  });

  const scaleSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [1, 1.25, 1]
  );

  const scale = useSpring(scaleSync, {
    mass: 0.1,
    stiffness: 220,
    damping: 16,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width, y, scale }}
      whileHover={{ scale: 1.34, y: -10 }}
      whileTap={{ scale: 0.9, y: 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 18 }}
      className={cn(
        "group/dock-icon relative flex aspect-square cursor-pointer items-center justify-center rounded-full shrink-0 z-10",
        className
      )}
      {...props}
    >
      {/* Spider-Sense energetic ambient glow under each icon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1 rounded-full bg-gradient-to-tr from-red-500/35 via-transparent to-blue-500/35 opacity-0 group-hover/dock-icon:opacity-100 blur-md transition-opacity duration-200"
      />
      {children}
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };
