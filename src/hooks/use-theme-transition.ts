"use client";

import { useTheme } from "next-themes";
import { useCallback, useRef } from "react";
import { flushSync } from "react-dom";

export function useThemeTransition() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isTransitioningRef = useRef(false);

  const toggleTheme = useCallback(
    async (eventOrElement?: React.MouseEvent | HTMLElement | null) => {
      if (isTransitioningRef.current) return;

      const currentTheme = resolvedTheme || theme || "light";
      const nextTheme = currentTheme === "dark" ? "light" : "dark";

      // Fallback for browsers without View Transition API
      if (
        typeof document === "undefined" ||
        !("startViewTransition" in document)
      ) {
        setTheme(nextTheme);
        return;
      }

      // Extract target button or coordinates from click event or passed element
      let target: HTMLElement | null = null;
      let clientX: number | null = null;
      let clientY: number | null = null;

      if (eventOrElement) {
        if ("currentTarget" in eventOrElement && eventOrElement.currentTarget instanceof HTMLElement) {
          target = eventOrElement.currentTarget;
        } else if ("target" in eventOrElement && eventOrElement.target instanceof HTMLElement) {
          target = eventOrElement.target;
        } else if (eventOrElement instanceof HTMLElement) {
          target = eventOrElement;
        }

        if ("clientX" in eventOrElement && typeof eventOrElement.clientX === "number") {
          clientX = eventOrElement.clientX;
          clientY = eventOrElement.clientY;
        }
      }

      isTransitioningRef.current = true;

      try {
        const transition = (document as any).startViewTransition(() => {
          flushSync(() => {
            document.documentElement.classList.add("theme-transitioning");
            if (nextTheme === "dark") {
              document.documentElement.classList.add("dark");
            } else {
              document.documentElement.classList.remove("dark");
            }
            setTheme(nextTheme);
            void document.documentElement.offsetHeight;
            document.documentElement.classList.remove("theme-transitioning");
          });
        });

        await transition.ready;

        // Calculate origin x and y (center of the clicked button)
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;

        if (target) {
          const rect = target.getBoundingClientRect();
          x = rect.left + rect.width / 2;
          y = rect.top + rect.height / 2;
        } else if (clientX !== null && clientY !== null) {
          x = clientX;
          y = clientY;
        }

        // Calculates the radius of circle that can cover the screen
        const right = window.innerWidth - x;
        const bottom = window.innerHeight - y;
        const maxRadius = Math.hypot(
          Math.max(x, right),
          Math.max(y, bottom)
        );

        const anim = document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 500,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          }
        );

        await anim.finished;
      } catch (e) {
        setTheme(nextTheme);
      } finally {
        isTransitioningRef.current = false;
      }
    },
    [theme, resolvedTheme, setTheme]
  );

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  };
}
