"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const AIChatTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, onClick, ...props }, ref) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-ai-chat"));
    }
    onClick?.(e);
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleClick}
      aria-label="Chat with Ritik's AI Assistant"
      title="Ask Ritik's AI"
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        "relative size-10 rounded-full text-foreground/80",
        "group-hover/dock-icon:text-red-500 dark:group-hover/dock-icon:text-blue-400",
        "group-hover/dock-icon:bg-gradient-to-tr group-hover/dock-icon:from-red-500/20 group-hover/dock-icon:to-blue-500/20",
        "group-hover/dock-icon:shadow-[0_0_18px_rgba(220,38,38,0.55),0_0_12px_rgba(37,99,235,0.4)]",
        "transition-all duration-200 cursor-pointer",
        className
      )}
      {...props}
    >
      <Sparkles className="size-4 transition-transform duration-200 group-hover/dock-icon:scale-125 text-red-500 dark:text-blue-400" />
      <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.9)] animate-pulse" />
    </button>
  );
});

AIChatTrigger.displayName = "AIChatTrigger";
