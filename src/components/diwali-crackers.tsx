"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  decay: number;
  gravity: number;
  friction: number;
  hasCrackle?: boolean;
}

// Authentic Diwali Festive Palette
const DIWALI_COLORS = [
  "#FFD700", // Bright Diwali Gold
  "#FFA500", // Marigold Saffron
  "#FF3366", // Firecracker Ruby Red
  "#10B981", // Emerald Green Anar Spark
  "#FFFFFF", // Sparkler White Hot
  "#F59E0B", // Amber Gold
  "#C084FC", // Violet Sky Spark
  "#38BDF8", // Electric Blue Spark
];

const MAX_PARTICLES = 90;

export function DiwaliCrackers({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animIdRef = useRef<number | null>(null);
  const lastSpawnTime = useRef<number>(0);
  const distanceTraveled = useRef<number>(0);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  // Smooth GPU-composited CSS ambient glow tracking
  const [ambientGlow, setAmbientGlow] = useState({ x: 0, y: 0, active: false });

  // 1. Phuljhadi (Sparkler) sparks at cursor - Lightweight & Throttled
  const spawnSparkler = useCallback((x: number, y: number, count = 2) => {
    if (particlesRef.current.length >= MAX_PARTICLES) return;
    const available = Math.min(count, MAX_PARTICLES - particlesRef.current.length);

    for (let i = 0; i < available; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.0 + Math.random() * 3.5;
      const color =
        DIWALI_COLORS[Math.floor(Math.random() * DIWALI_COLORS.length)];
      particlesRef.current.push({
        x,
        y,
        prevX: x,
        prevY: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.35,
        alpha: 0.95,
        color,
        size: 1.2 + Math.random() * 1.4,
        decay: 0.026 + Math.random() * 0.022,
        gravity: 0.06,
        friction: 0.96,
        hasCrackle: Math.random() < 0.3,
      });
    }
  }, []);

  // 2. Mini Firecracker Pop (Every ~120px of movement)
  const spawnMiniPop = useCallback((x: number, y: number) => {
    if (particlesRef.current.length >= MAX_PARTICLES) return;
    const burstColor =
      DIWALI_COLORS[Math.floor(Math.random() * DIWALI_COLORS.length)];
    const count = Math.min(8, MAX_PARTICLES - particlesRef.current.length);

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
      const speed = 1.8 + Math.random() * 3.2;
      particlesRef.current.push({
        x,
        y,
        prevX: x,
        prevY: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.5,
        alpha: 1.0,
        color: Math.random() < 0.7 ? burstColor : "#FFFFFF",
        size: 1.4 + Math.random() * 1.0,
        decay: 0.028 + Math.random() * 0.02,
        gravity: 0.07,
        friction: 0.95,
        hasCrackle: true,
      });
    }
  }, []);

  // 3. Celebratory Cracker / Sky Shot Burst on click or tap
  const spawnCrackerBurst = useCallback(
    (x: number, y: number, particleCount = 26) => {
      // Clear half if full to ensure new burst always renders smoothly
      if (particlesRef.current.length > 50) {
        particlesRef.current = particlesRef.current.slice(-30);
      }

      const primaryColor =
        DIWALI_COLORS[Math.floor(Math.random() * DIWALI_COLORS.length)];
      const secondaryColor =
        DIWALI_COLORS[Math.floor(Math.random() * DIWALI_COLORS.length)];

      for (let i = 0; i < particleCount; i++) {
        const angle =
          (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.25;
        const speed = 2.4 + Math.random() * 4.8;
        const color = Math.random() < 0.65 ? primaryColor : secondaryColor;

        particlesRef.current.push({
          x,
          y,
          prevX: x,
          prevY: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1.0,
          color,
          size: 1.5 + Math.random() * 1.4,
          decay: 0.02 + Math.random() * 0.018,
          gravity: 0.075,
          friction: 0.955,
          hasCrackle: Math.random() < 0.4,
        });
      }

      // 6 Golden fountain sparks spraying upward
      for (let j = 0; j < 6; j++) {
        const fAngle = -Math.PI / 2 + (Math.random() - 0.5) * 0.55;
        const fSpeed = 3.0 + Math.random() * 3.8;
        particlesRef.current.push({
          x,
          y,
          prevX: x,
          prevY: y,
          vx: Math.cos(fAngle) * fSpeed,
          vy: Math.sin(fAngle) * fSpeed,
          alpha: 1.0,
          color: "#FFD700",
          size: 1.6,
          decay: 0.024,
          gravity: 0.1,
          friction: 0.965,
        });
      }
    },
    []
  );

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      // Cap DPR to 1.25 for buttery 120 FPS performance on high-DPI / 4K displays
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    let isRunning = false;

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        animIdRef.current = requestAnimationFrame(render);
      }
    };

    // Ultra-Fast GPU-Friendly Render Loop (ZERO shadowBlur, ZERO createRadialGradient per frame)
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      if (particles.length > 0) {
        ctx.save();
        // Hardware-accelerated additive blending creates intense radiant glow with 0% CPU blur penalty
        ctx.globalCompositeOperation = "lighter";
        ctx.lineCap = "round";

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];

          // Store previous position
          p.prevX = p.x;
          p.prevY = p.y;

          // Physics update
          p.vx *= p.friction;
          p.vy *= p.friction;
          p.vy += p.gravity;
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;

          // Remove dead particles
          if (p.alpha <= 0 || p.x < -10 || p.x > width + 10 || p.y > height + 20) {
            particles.splice(i, 1);
            continue;
          }

          // Crackle flash effect without array allocations
          const isCrackling = p.hasCrackle && p.alpha < 0.35 && Math.random() < 0.45;
          const renderColor = isCrackling ? "#FFFFFF" : p.color;

          // 1. Soft Outer Glow Streak (Fast 2-pass additive stroke, 10x faster than shadowBlur)
          ctx.strokeStyle = renderColor;
          ctx.globalAlpha = Math.max(0, p.alpha * 0.3);
          ctx.lineWidth = p.size * 2.2;
          ctx.beginPath();
          ctx.moveTo(p.prevX, p.prevY);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();

          // 2. Crisp Bright Core Streak
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.lineWidth = p.size;
          ctx.beginPath();
          ctx.moveTo(p.prevX, p.prevY);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();

          // 3. Bright spark head
          ctx.fillStyle = renderColor;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // Continue loop only when particles exist
      if (particles.length > 0) {
        animIdRef.current = requestAnimationFrame(render);
      } else {
        isRunning = false;
        animIdRef.current = null;
      }
    };

    // Pointer Event Handlers
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ("touches" in e) {
        if (e.touches.length === 0) return;
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      setAmbientGlow({ x, y, active: true });

      // Track distance traveled to trigger mini pops
      if (lastPos.current) {
        const dx = x - lastPos.current.x;
        const dy = y - lastPos.current.y;
        distanceTraveled.current += Math.hypot(dx, dy);

        if (distanceTraveled.current > 110) {
          spawnMiniPop(x, y);
          distanceTraveled.current = 0;
        }
      }
      lastPos.current = { x, y };

      const now = performance.now();
      // Throttle spark generation to ~35ms for silky smooth 60/120 FPS
      if (now - lastSpawnTime.current > 35) {
        spawnSparkler(x, y, 2);
        lastSpawnTime.current = now;
      }

      startLoop();
    };

    const handlePointerLeave = () => {
      setAmbientGlow((prev) => ({ ...prev, active: false }));
      lastPos.current = null;
      distanceTraveled.current = 0;
    };

    const handleClick = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ("touches" in e) {
        if (e.touches.length === 0) return;
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      spawnCrackerBurst(x, y, 26);
      startLoop();
    };

    container.addEventListener("mousemove", handlePointerMove, { passive: true });
    container.addEventListener("mouseleave", handlePointerLeave);
    container.addEventListener("click", handleClick, { passive: true });

    container.addEventListener("touchstart", handlePointerMove, { passive: true });
    container.addEventListener("touchmove", handlePointerMove, { passive: true });
    container.addEventListener("touchend", handlePointerLeave);

    return () => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("mouseleave", handlePointerLeave);
      container.removeEventListener("click", handleClick);
      container.removeEventListener("touchstart", handlePointerMove);
      container.removeEventListener("touchmove", handlePointerMove);
      container.removeEventListener("touchend", handlePointerLeave);
    };
  }, [containerRef, spawnSparkler, spawnMiniPop, spawnCrackerBurst]);

  return (
    <>
      {/* 1. Hardware-Accelerated CSS Ambient Diya Glow (Offloaded to GPU compositor thread, 0% CPU) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: ambientGlow.active ? 1 : 0,
          background: ambientGlow.active
            ? `radial-gradient(180px circle at ${ambientGlow.x}px ${ambientGlow.y}px, rgba(251, 191, 36, 0.16), rgba(249, 115, 22, 0.05), transparent 70%)`
            : "none",
        }}
      />

      {/* 2. High-Performance Particle Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 h-full w-full select-none"
      />
    </>
  );
}
