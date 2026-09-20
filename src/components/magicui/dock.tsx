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
  isMobile: boolean;
}

const DockContext = createContext<DockContextType>({
  mousex: null,
  magnification: DEFAULT_MAGNIFICATION,
  distance: DEFAULT_DISTANCE,
  isMobile: false,
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
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(
          window.matchMedia("(pointer: coarse)").matches ||
          window.innerWidth < 768 ||
          "ontouchstart" in window
        );
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const effectiveMagnification = isMobile ? 40 : magnification;

    return (
      <DockContext.Provider
        value={{
          mousex,
          magnification: effectiveMagnification,
          distance,
          isMobile,
        }}
      >
        <motion.div
          ref={ref}
          onMouseMove={(e) => {
            if (!isMobile) {
              mousex.set(e.pageX);
            }
          }}
          onMouseLeave={() => mousex.set(Infinity)}
          onTouchStart={() => mousex.set(Infinity)}
          onTouchEnd={() => mousex.set(Infinity)}
          {...props}
          className={cn(dockVariants({ className }))}
        >
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
  const isMobile = context?.isMobile ?? false;

  const fallbackMouseX = useMotionValue(Infinity);
  const activeMouseX = mousex ?? fallbackMouseX;

  const distanceCalc = useTransform(activeMouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [40, magnification, 40]
  );

  let width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={isMobile ? { width: 40 } : { width }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full shrink-0",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };
