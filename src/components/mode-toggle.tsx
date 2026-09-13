"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      type="button"
      size="icon"
      className="size-10 relative flex items-center justify-center rounded-full text-foreground/80 hover:text-red-500 dark:hover:text-blue-400 hover:bg-gradient-to-tr hover:from-red-500/15 hover:to-blue-500/15 hover:shadow-[0_0_14px_rgba(220,38,38,0.4)] transition-[color,background-color,box-shadow] duration-200"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <SunIcon className="h-[1.15rem] w-[1.15rem] text-amber-500 dark:text-blue-400 rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-[1.15rem] w-[1.15rem] text-blue-600 dark:text-blue-400 rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
