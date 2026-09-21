"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useThemeTransition } from "@/hooks/use-theme-transition";
import React from "react";

export const ModeToggle = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ onClick, ...props }, ref) => {
  const { theme, toggleTheme } = useThemeTransition();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    toggleTheme(e);
  };

  return (
    <Button
      ref={ref}
      variant="ghost"
      type="button"
      size="icon"
      className="size-10 relative flex items-center justify-center rounded-full text-foreground/80 group-hover/dock-icon:text-red-500 dark:group-hover/dock-icon:text-blue-400 group-hover/dock-icon:bg-gradient-to-tr group-hover/dock-icon:from-red-500/20 group-hover/dock-icon:to-blue-500/20 group-hover/dock-icon:shadow-[0_0_16px_rgba(220,38,38,0.5)] transition-[color,background-color,box-shadow] duration-200 cursor-pointer"
      {...props}
      onClick={handleClick}
      aria-label="Toggle theme"
    >
      <SunIcon className="h-[1.15rem] w-[1.15rem] text-amber-500 dark:text-blue-400 rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0 group-hover/dock-icon:rotate-45 group-hover/dock-icon:scale-120" />
      <MoonIcon className="absolute h-[1.15rem] w-[1.15rem] text-blue-600 dark:text-blue-400 rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100 group-hover/dock-icon:-rotate-12 group-hover/dock-icon:scale-120" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
});

ModeToggle.displayName = "ModeToggle";
