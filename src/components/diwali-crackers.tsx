"use client";

import React, { useEffect, useRef, useCallback } from "react";

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

// Authentic Diwali Festive Palette: Gold, Saffron, Crimson, Emerald, White Hot, Royal Violet
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

const MAX_PARTICLES = 80;
const PADDING = 70; // Padding around text so sparks can spray freely without clipping

export function DiwaliCrackers({
  targetRef,
}: {
  targetRef: React.RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animIdRef = useRef<number | null>(null);
  const lastSpawnTime = useRef<number>(0);
  const distanceTraveled = useRef<number>(0);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  // 1. Phuljhadi (Sparkler) sparks directly at cursor over characters
  const spawnSparkler = useCallback((x: number, y: number, count = 2) => {
    if (particlesRef.current.length >= MAX_PARTICLES) return;
    const available = Math.min(count, MAX_PARTICLES - particlesRef.current.length);

    for (let i = 0; i < available; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.0 + Math.random() * 3.6;
      const color =
        DIWALI_COLORS[Math.floor(Math.random() * DIWALI_COLORS.length)];
      particlesRef.current.push({
        x,
        y,
        prevX: x,
        prevY: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.4,
        alpha: 0.95,
        color,
        size: 1.2 + Math.random() * 1.4,
        decay: 0.026 + Math.random() * 0.022,
        gravity: 0.065,
        friction: 0.96,
        hasCrackle: Math.random() < 0.3,
      });
    }
  }, []);

  // 2. Mini Firecracker Pop across characters
  const spawnMiniPop = useCallback((x: number, y: number) => {
    if (particlesRef.current.length >= MAX_PARTICLES) return;
    const burstColor =
      DIWALI_COLORS[Math.floor(Math.random() * DIWALI_COLORS.length)];
    const count = Math.min(7, MAX_PARTICLES - particlesRef.current.length);

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
      const speed = 1.6 + Math.random() * 3.2;
      particlesRef.current.push({
        x,
        y,
        prevX: x,
        prevY: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.5,
        alpha: 1.0,
        color: Math.random() < 0.7 ? burstColor : "#FFFFFF",
        size: 1.3 + Math.random() * 1.0,
        decay: 0.028 + Math.random() * 0.02,
        gravity: 0.07,
        friction: 0.95,
        hasCrackle: true,
      });
    }
  }, []);

  // 3. Celebratory Cracker / Sky Shot Burst on click or tap on the name
  const spawnCrackerBurst = useCallback(
    (x: number, y: number, particleCount = 26) => {
      if (particlesRef.current.length > 40) {
        particlesRef.current = particlesRef.current.slice(-25);
      }

      const primaryColor =
        DIWALI_COLORS[Math.floor(Math.random() * DIWALI_COLORS.length)];
      const secondaryColor =
        DIWALI_COLORS[Math.floor(Math.random() * DIWALI_COLORS.length)];

      for (let i = 0; i < particleCount; i++) {
        const angle =
          (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.25;
        const speed = 2.2 + Math.random() * 4.6;
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

      // Golden fountain (Anar) sparks spraying upward
      for (let j = 0; j < 5; j++) {
        const fAngle = -Math.PI / 2 + (Math.random() - 0.5) * 0.55;
        const fSpeed = 2.8 + Math.random() * 3.6;
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
    const target = targetRef.current;
    const canvas = canvasRef.current;
    if (!target || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let canvasWidth = 0;
    let canvasHeight = 0;

    const updateSize = () => {
      const rect = target.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      canvasWidth = rect.width + PADDING * 2;
      canvasHeight = rect.height + PADDING * 2;
      canvas.width = Math.floor(canvasWidth * dpr);
      canvas.height = Math.floor(canvasHeight * dpr);
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;
      canvas.style.left = `-${PADDING}px`;
      canvas.style.top = `-${PADDING}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(target);

    let isRunning = false;

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        animIdRef.current = requestAnimationFrame(render);
      }
    };

    // Fast 120 FPS render loop - completely transparent background
    const render = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      const particles = particlesRef.current;
      if (particles.length > 0) {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.lineCap = "round";

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];

          p.prevX = p.x;
          p.prevY = p.y;

          p.vx *= p.friction;
          p.vy *= p.friction;
          p.vy += p.gravity;
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;

          if (
            p.alpha <= 0 ||
            p.x < 0 ||
            p.x > canvasWidth ||
            p.y > canvasHeight
          ) {
            particles.splice(i, 1);
            continue;
          }

          const isCrackling = p.hasCrackle && p.alpha < 0.35 && Math.random() < 0.45;
          const renderColor = isCrackling ? "#FFFFFF" : p.color;

          // 1. Soft Outer Glow (Additive stroke)
          ctx.strokeStyle = renderColor;
          ctx.globalAlpha = Math.max(0, p.alpha * 0.3);
          ctx.lineWidth = p.size * 2.2;
          ctx.beginPath();
          ctx.moveTo(p.prevX, p.prevY);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();

          // 2. Crisp Core Streak
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.lineWidth = p.size;
          ctx.beginPath();
          ctx.moveTo(p.prevX, p.prevY);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();

          // 3. Bright Spark Head
          ctx.fillStyle = renderColor;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      if (particles.length > 0) {
        animIdRef.current = requestAnimationFrame(render);
      } else {
        isRunning = false;
        animIdRef.current = null;
      }
    };

    // Pointer Events attached ONLY to the "Ritik Singh" target element
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = target.getBoundingClientRect();
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

      // Convert to canvas coordinates (including PADDING offset)
      const x = clientX - rect.left + PADDING;
      const y = clientY - rect.top + PADDING;

      if (lastPos.current) {
        const dx = x - lastPos.current.x;
        const dy = y - lastPos.current.y;
        distanceTraveled.current += Math.hypot(dx, dy);

        if (distanceTraveled.current > 90) {
          spawnMiniPop(x, y);
          distanceTraveled.current = 0;
        }
      }
      lastPos.current = { x, y };

      const now = performance.now();
      if (now - lastSpawnTime.current > 35) {
        spawnSparkler(x, y, 2);
        lastSpawnTime.current = now;
      }

      startLoop();
    };

    const handlePointerLeave = () => {
      lastPos.current = null;
      distanceTraveled.current = 0;
    };

    const handleClick = (e: MouseEvent | TouchEvent) => {
      const rect = target.getBoundingClientRect();
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

      const x = clientX - rect.left + PADDING;
      const y = clientY - rect.top + PADDING;

      spawnCrackerBurst(x, y, 26);
      startLoop();
    };

    target.addEventListener("mousemove", handlePointerMove, { passive: true });
    target.addEventListener("mouseleave", handlePointerLeave);
    target.addEventListener("click", handleClick, { passive: true });

    target.addEventListener("touchstart", handlePointerMove, { passive: true });
    target.addEventListener("touchmove", handlePointerMove, { passive: true });
    target.addEventListener("touchend", handlePointerLeave);

    return () => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
      resizeObserver.disconnect();
      target.removeEventListener("mousemove", handlePointerMove);
      target.removeEventListener("mouseleave", handlePointerLeave);
      target.removeEventListener("click", handleClick);
      target.removeEventListener("touchstart", handlePointerMove);
      target.removeEventListener("touchmove", handlePointerMove);
      target.removeEventListener("touchend", handlePointerLeave);
    };
  }, [targetRef, spawnSparkler, spawnMiniPop, spawnCrackerBurst]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute z-20 select-none"
    />
  );
}
