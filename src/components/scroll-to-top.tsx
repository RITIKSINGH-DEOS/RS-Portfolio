"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShow(window.scrollY > 350);
    };
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 sm:bottom-8 sm:right-8 z-40 size-10 sm:size-11 rounded-full bg-background/85 backdrop-blur-xl border border-red-500/40 dark:border-blue-500/40 text-foreground/80 flex items-center justify-center shadow-[0_4px_20px_rgba(220,38,38,0.35),0_0_15px_rgba(37,99,235,0.25)] hover:shadow-[0_6px_28px_rgba(220,38,38,0.6),0_0_20px_rgba(37,99,235,0.5)] hover:border-red-500/80 dark:hover:border-blue-400/80 hover:text-red-500 dark:hover:text-blue-400 hover:scale-110 active:scale-95 transition-all cursor-pointer group"
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <ArrowUp className="size-4 sm:size-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          {/* Subtle Spider Thread Effect */}
          <span className="sr-only">Scroll to top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
