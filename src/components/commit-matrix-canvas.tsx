"use client";

import React, { useEffect, useRef } from "react";

interface ActiveCell {
  x: number;
  y: number;
  phase: number;
  speed: number;
  floor: number;
  peak: number;
  color: string;
  currentAlpha: number;
}

interface NodeLink {
  from: number;
  to: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  color: string;
  alpha: number;
}

export function CommitMatrixCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({
    x: -1000,
    y: -1000,
    active: false,
  });
  const shockwavesRef = useRef<Shockwave[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animId: number;
    let offscreenCanvas: HTMLCanvasElement | null = null;
    let activeCells: ActiveCell[] = [];
    let nodeLinks: NodeLink[] = [];
    let lastTimestamp = 0;
    let scanX = -100;
    let scanCycleTimer = 0;

    const SPIDER_COLORS_DARK = [
      "#ef4444", // Spider-Man Red
      "#dc2626", // Deep Crimson Red
      "#f87171", // Bright Light Red
      "#3b82f6", // Quantum Spider Blue
      "#60a5fa", // Electric Cyan Blue
    ];

    const SPIDER_COLORS_LIGHT = [
      "#dc2626", // Spider-Man Red
      "#b91c1c", // Deep Crimson
      "#e11d48", // Rose Red
      "#2563eb", // Royal Spider Blue
      "#1d4ed8", // Deep Blue
    ];

    const initCanvas = () => {
      const isDark = document.documentElement.classList.contains("dark");
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = container.clientWidth || (typeof window !== "undefined" ? window.innerWidth : 300);
      const height = container.clientHeight || 155;

      if (width <= 0 || height <= 0) return;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const cellSize = 4;
      const step = 6;
      const cols = Math.ceil(width / step);
      const rows = Math.ceil(height / step);

      if (cols <= 0 || rows <= 0) return;

      // Create static background grid on offscreen canvas
      const off = document.createElement("canvas");
      off.width = canvas.width;
      off.height = canvas.height;

      if (off.width <= 0 || off.height <= 0) return;

      const offCtx = off.getContext("2d");

      if (offCtx) {
        offCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        offCtx.fillStyle = isDark
          ? "rgba(255, 255, 255, 0.035)"
          : "rgba(0, 0, 0, 0.045)";

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            offCtx.fillRect(c * step, r * step, cellSize, cellSize);
          }
        }
      }

      offscreenCanvas = off;

      // Generate active blinking commit cells
      activeCells = [];
      const colors = isDark ? SPIDER_COLORS_DARK : SPIDER_COLORS_LIGHT;

      for (let r = 0; r < rows; r++) {
        const normR = rows > 1 ? r / (rows - 1) : 0.5;
        const verticalDensity = Math.sin(normR * Math.PI);
        const rowProbability = 0.03 + 0.12 * verticalDensity;

        for (let c = 0; c < cols; c++) {
          if (Math.random() < rowProbability) {
            const isBlue = Math.random() < 0.28;
            const chosenColor = isBlue
              ? colors[3 + (Math.random() > 0.5 ? 1 : 0)]
              : colors[Math.floor(Math.random() * 3)];

            activeCells.push({
              x: c * step,
              y: r * step,
              phase: Math.random() * Math.PI * 2,
              speed: 1.4 + Math.random() * 3.2,
              floor: 0.04 + Math.random() * 0.14,
              peak: 0.75 + Math.random() * 0.25,
              color: chosenColor,
              currentAlpha: 0,
            });
          }
        }
      }

      // Precalculate delicate web connections between close neighbor commits
      nodeLinks = [];
      const maxConnectDist = 26;
      for (let i = 0; i < activeCells.length; i++) {
        let connections = 0;
        for (let j = i + 1; j < activeCells.length; j++) {
          const dx = activeCells[i].x - activeCells[j].x;
          const dy = activeCells[i].y - activeCells[j].y;
          if (Math.abs(dx) < maxConnectDist && Math.abs(dy) < maxConnectDist) {
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < maxConnectDist) {
              nodeLinks.push({ from: i, to: j });
              connections++;
              if (connections >= 2) break;
            }
          }
        }
      }
    };

    const draw = (currentTime: number) => {
      if (!canvas || canvas.width <= 0 || canvas.height <= 0) return;
      if (!offscreenCanvas || offscreenCanvas.width <= 0 || offscreenCanvas.height <= 0) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = container.clientWidth || (canvas.width / dpr);
      const height = container.clientHeight || 155;
      const isDark = document.documentElement.classList.contains("dark");

      if (width <= 0 || height <= 0) return;

      const dt = lastTimestamp ? Math.min((currentTime - lastTimestamp) / 1000, 0.1) : 0.016;
      lastTimestamp = currentTime;

      // Update scan beam position (sweeps every 7.5 seconds)
      scanCycleTimer += dt;
      if (scanCycleTimer >= 7.5) {
        scanCycleTimer = 0;
        scanX = -60;
      }
      if (scanX < width + 60) {
        scanX += dt * 320;
      }

      // Solid background fill - completely blocks underlying DottedCanvas dots
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = isDark ? "hsl(210, 11.1%, 3.53%)" : "hsl(0, 0%, 100%)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw offscreen static base grid
      if (offscreenCanvas.width > 0 && offscreenCanvas.height > 0) {
        ctx.drawImage(offscreenCanvas, 0, 0);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const tSec = currentTime / 1000;
      const cellSize = 4;
      const pointer = pointerRef.current;
      const shockwaves = shockwavesRef.current;

      // Update shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += dt * 260;
        sw.alpha = Math.max(0, 1 - sw.radius / sw.maxRadius);
        if (sw.radius >= sw.maxRadius || sw.alpha <= 0) {
          shockwaves.splice(s, 1);
        } else {
          // Draw expanding spider-sense radar pulse ring
          ctx.beginPath();
          ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
          ctx.strokeStyle = sw.color;
          ctx.lineWidth = 1.2;
          ctx.globalAlpha = sw.alpha * 0.45;
          ctx.stroke();
        }
      }

      // Draw subtle radar scan beam
      if (scanX > -40 && scanX < width + 40) {
        const scanGrad = ctx.createLinearGradient(scanX - 25, 0, scanX + 25, 0);
        scanGrad.addColorStop(0, "rgba(239, 68, 68, 0)");
        scanGrad.addColorStop(0.5, isDark ? "rgba(59, 130, 246, 0.16)" : "rgba(37, 99, 235, 0.12)");
        scanGrad.addColorStop(1, "rgba(239, 68, 68, 0)");
        ctx.fillStyle = scanGrad;
        ctx.fillRect(scanX - 25, 0, 50, height);

        // Fine laser beam filament in the center of the wave
        ctx.beginPath();
        ctx.moveTo(scanX, 0);
        ctx.lineTo(scanX, height);
        ctx.strokeStyle = isDark ? "rgba(96, 165, 250, 0.35)" : "rgba(37, 99, 235, 0.3)";
        ctx.lineWidth = 0.75;
        ctx.stroke();
      }

      // Calculate each active cell's brightness
      const mouseActive = pointer.active;
      const mouseRadius = 110;

      for (let i = 0; i < activeCells.length; i++) {
        const cell = activeCells[i];
        const pulse = (Math.sin(tSec * cell.speed + cell.phase) + 1) * 0.5;
        let alpha = cell.floor + (cell.peak - cell.floor) * pulse;

        // Proximity boost from mouse cursor
        if (mouseActive) {
          const dx = (cell.x + cellSize / 2) - pointer.x;
          const dy = (cell.y + cellSize / 2) - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius) {
            const proximity = 1 - dist / mouseRadius;
            alpha = Math.min(1, alpha + proximity * 0.75);
          }
        }

        // Radar scan wave excitation
        const scanDist = Math.abs(cell.x - scanX);
        if (scanDist < 30) {
          const scanFactor = 1 - scanDist / 30;
          alpha = Math.min(1, alpha + scanFactor * 0.5);
        }

        // Shockwave excitation
        for (let s = 0; s < shockwaves.length; s++) {
          const sw = shockwaves[s];
          const cdx = (cell.x + cellSize / 2) - sw.x;
          const cdy = (cell.y + cellSize / 2) - sw.y;
          const cellDist = Math.sqrt(cdx * cdx + cdy * cdy);
          const ringDist = Math.abs(cellDist - sw.radius);
          if (ringDist < 20) {
            const shockBoost = (1 - ringDist / 20) * sw.alpha * 0.8;
            alpha = Math.min(1, alpha + shockBoost);
          }
        }

        cell.currentAlpha = alpha;
      }

      // Draw inter-node spider web threads between close pulsing commits
      ctx.lineWidth = 0.5;
      for (let k = 0; k < nodeLinks.length; k++) {
        const link = nodeLinks[k];
        const a = activeCells[link.from];
        const b = activeCells[link.to];

        if (a.currentAlpha > 0.4 && b.currentAlpha > 0.4) {
          const linkAlpha = (a.currentAlpha * b.currentAlpha) * 0.35;
          ctx.strokeStyle = a.color;
          ctx.globalAlpha = linkAlpha;
          ctx.beginPath();
          ctx.moveTo(a.x + cellSize / 2, a.y + cellSize / 2);
          ctx.lineTo(b.x + cellSize / 2, b.y + cellSize / 2);
          ctx.stroke();
        }
      }

      // Draw active commit squares
      for (let i = 0; i < activeCells.length; i++) {
        const cell = activeCells[i];
        ctx.fillStyle = cell.color;
        ctx.globalAlpha = cell.currentAlpha;
        ctx.fillRect(cell.x, cell.y, cellSize, cellSize);
      }

      // Draw interactive Spider-Silk filaments connecting cursor to nearby commits
      if (mouseActive) {
        const nearNodes: { cell: ActiveCell; dist: number }[] = [];
        for (let i = 0; i < activeCells.length; i++) {
          const cell = activeCells[i];
          const dx = (cell.x + cellSize / 2) - pointer.x;
          const dy = (cell.y + cellSize / 2) - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius) {
            nearNodes.push({ cell, dist });
          }
        }

        nearNodes.sort((a, b) => a.dist - b.dist);
        const closestNodes = nearNodes.slice(0, 6);

        ctx.lineWidth = 0.75;
        for (let j = 0; j < closestNodes.length; j++) {
          const { cell, dist } = closestNodes[j];
          const threadStrength = (1 - dist / mouseRadius) * 0.6;

          // Spider-silk laser thread
          ctx.strokeStyle = cell.color;
          ctx.globalAlpha = threadStrength;
          ctx.beginPath();
          ctx.moveTo(pointer.x, pointer.y);
          ctx.lineTo(cell.x + cellSize / 2, cell.y + cellSize / 2);
          ctx.stroke();
        }

        // Draw Spider-Sense reticle at cursor
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glowing Spider-Sense halo
        const haloGrad = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          24
        );
        haloGrad.addColorStop(0, isDark ? "rgba(239, 68, 68, 0.45)" : "rgba(220, 38, 38, 0.35)");
        haloGrad.addColorStop(0.6, isDark ? "rgba(59, 130, 246, 0.2)" : "rgba(37, 99, 235, 0.15)");
        haloGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 24, 0, Math.PI * 2);
        ctx.fill();

        // Sleek outer reticle ring
        ctx.strokeStyle = isDark ? "rgba(239, 68, 68, 0.4)" : "rgba(220, 38, 38, 0.35)";
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 9, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
    };

    let isVisible = true;

    const loop = (timestamp: number) => {
      if (!isVisible) return;
      animId = requestAnimationFrame(loop);
      draw(timestamp);
    };

    initCanvas();
    animId = requestAnimationFrame(loop);

    const intersectionObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(animId);
          animId = requestAnimationFrame(loop);
        } else {
          cancelAnimationFrame(animId);
        }
      }
    }, { threshold: 0.05 });
    intersectionObserver.observe(container);

    let lastObsW = 0;
    let lastObsH = 0;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.floor(entry.contentRect.width);
        const h = Math.floor(entry.contentRect.height);
        if (lastObsW > 0 && Math.abs(w - lastObsW) < 4 && Math.abs(h - lastObsH) < 8) return;
        lastObsW = w;
        lastObsH = h;
        initCanvas();
      }
    });
    resizeObserver.observe(container);

    const themeObserver = new MutationObserver(() => {
      initCanvas();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelAnimationFrame(animId);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handlePointerLeave = () => {
    pointerRef.current.active = false;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    pointerRef.current = {
      x: clickX,
      y: clickY,
      active: true,
    };

    // Add Spider-Sense pulse shockwave
    shockwavesRef.current.push({
      x: clickX,
      y: clickY,
      radius: 4,
      maxRadius: 220,
      color: Math.random() > 0.3 ? "#ef4444" : "#3b82f6",
      alpha: 1,
    });
  };

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="group relative left-1/2 -translate-x-1/2 w-[calc(100vw-16px)] sm:w-[calc(100vw-24px)] select-none overflow-hidden my-3 sm:my-5 bg-background"
      style={{
        height: "155px",
        touchAction: "pan-y",
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 6%, rgba(0,0,0,0.85) 14%, rgba(0,0,0,1) 22%, rgba(0,0,0,1) 78%, rgba(0,0,0,0.85) 86%, rgba(0,0,0,0.3) 94%, rgba(0,0,0,0) 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 6%, rgba(0,0,0,0.85) 14%, rgba(0,0,0,1) 22%, rgba(0,0,0,1) 78%, rgba(0,0,0,0.85) 86%, rgba(0,0,0,0.3) 94%, rgba(0,0,0,0) 100%)",
      }}
    >
      <canvas
        ref={canvasRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        className="block w-full h-full cursor-crosshair"
      />

    </div>
  );
}
