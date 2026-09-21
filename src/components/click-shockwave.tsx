"use client";

import React, { useEffect, useRef } from "react";

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  color: string;
  alpha: number;
}

export function ClickShockwave() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shockwavesRef = useRef<Shockwave[]>([]);
  const isRunningRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const loop = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const waves = shockwavesRef.current;

      for (let i = waves.length - 1; i >= 0; i--) {
        const sw = waves[i];
        sw.radius += 5.5;
        sw.alpha = Math.max(0, 1 - sw.radius / sw.maxRadius);

        if (sw.radius >= sw.maxRadius || sw.alpha <= 0) {
          waves.splice(i, 1);
        } else {
          // Draw primary expanding radar ring
          ctx.beginPath();
          ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
          ctx.strokeStyle = sw.color;
          ctx.lineWidth = 1.3;
          ctx.globalAlpha = sw.alpha * 0.42;
          ctx.stroke();

          // Subtle inner echo ring
          if (sw.radius > 16) {
            ctx.beginPath();
            ctx.arc(sw.x, sw.y, sw.radius - 14, 0, Math.PI * 2);
            ctx.lineWidth = 0.8;
            ctx.globalAlpha = sw.alpha * 0.18;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;

      if (waves.length > 0) {
        animId = requestAnimationFrame(loop);
      } else {
        isRunningRef.current = false;
      }
    };

    const handleClick = (e: MouseEvent | TouchEvent) => {
      const clientX = "clientX" in e ? e.clientX : e.touches?.[0]?.clientX;
      const clientY = "clientY" in e ? e.clientY : e.touches?.[0]?.clientY;
      if (clientX === undefined || clientY === undefined) return;

      shockwavesRef.current.push({
        x: clientX,
        y: clientY,
        radius: 4,
        maxRadius: 150,
        color: Math.random() > 0.35 ? "#ef4444" : "#3b82f6",
        alpha: 1,
      });

      if (!isRunningRef.current) {
        isRunningRef.current = true;
        animId = requestAnimationFrame(loop);
      }
    };

    window.addEventListener("pointerdown", handleClick, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", handleClick);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[42] select-none"
    />
  );
}
