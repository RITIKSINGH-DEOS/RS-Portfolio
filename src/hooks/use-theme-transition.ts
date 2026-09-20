"use client";

import { useTheme } from "next-themes";
import { useCallback, useRef } from "react";
import { flushSync } from "react-dom";

export function useThemeTransition() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isTransitioningRef = useRef(false);

  const toggleTheme = useCallback(
    async (eventOrElement?: React.MouseEvent | React.TouchEvent | HTMLElement | Element | null) => {
      if (isTransitioningRef.current) return;

      // 1. SYNCHRONOUSLY capture target element and screen coordinates BEFORE any async await or ViewTransition!
      let x = window.innerWidth / 2;
      let y = window.innerHeight / 2;

      let element: Element | null = null;

      if (eventOrElement) {
        if (eventOrElement instanceof Element) {
          element = eventOrElement;
        } else if ("currentTarget" in eventOrElement && eventOrElement.currentTarget instanceof Element) {
          element = eventOrElement.currentTarget;
        } else if ("target" in eventOrElement && eventOrElement.target instanceof Element) {
          element = eventOrElement.target;
        }
      }

      // If clicked element is inside a button (e.g. svg, path, span), find the button
      const button = element ? (element.closest("button") || element) : null;

      if (button) {
        const rect = button.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          x = rect.left + rect.width / 2;
          y = rect.top + rect.height / 2;
        }
      } else if (
        eventOrElement &&
        "clientX" in eventOrElement &&
        typeof eventOrElement.clientX === "number" &&
        (eventOrElement.clientX > 0 || eventOrElement.clientY > 0)
      ) {
        x = eventOrElement.clientX;
        y = eventOrElement.clientY;
      }

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

        // Calculates the radius of circle that can cover the screen from the exact button coordinates
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
