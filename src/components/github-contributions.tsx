"use client";

import React, { useEffect, useRef, useState } from "react";

const FONT_7x4: Record<string, number[][]> = {
  "0": [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
  ],
  "1": [
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 1, 1, 1],
  ],
  "2": [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [0, 0, 0, 1],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
  ],
  "3": [
    [1, 1, 1, 0],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [0, 1, 1, 0],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [1, 1, 1, 0],
  ],
  "4": [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
  ],
  "5": [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
  ],
  "6": [
    [0, 1, 1, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
  ],
  "7": [
    [1, 1, 1, 1],
    [0, 0, 0, 1],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
  "8": [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
  ],
  "9": [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [0, 1, 1, 0],
  ],
  ",": [
    [0],
    [0],
    [0],
    [0],
    [0],
    [1],
    [1],
  ],
  " ": [
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
    [0],
  ],
};

interface GridCell {
  x: number;
  y: number;
  col: number;
  row: number;
  isDigit: boolean;
  digitIndex: number;
  orderIndex: number;
  appearTime: number; // time offset within cycle when this box turns on
  isAmbient: boolean;
  phase: number;
  speed: number;
  floor: number;
  peak: number;
  color: string;
  glowColor: string;
  currentAlpha: number;
  isCurrentlyLit: boolean;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  color: string;
  alpha: number;
}

export function GithubContributions() {
  const [totalContributions, setTotalContributions] = useState<number>(192);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({
    x: -1000,
    y: -1000,
    active: false,
  });
  const shockwavesRef = useRef<Shockwave[]>([]);
  const totalCountRef = useRef(192);

  // Keep ref in sync for loop
  totalCountRef.current = totalContributions;

  // Poll for live GitHub updates periodically
  useEffect(() => {
    async function checkLiveUpdate() {
      try {
        const res = await fetch("/api/github-contributions");
        if (res.ok) {
          const json = await res.json();
          const count = json.total?.lastYear ?? 192;
          setTotalContributions(count);
        }
      } catch (err) {
        console.error("Live update check failed:", err);
      }
    }

    const interval = setInterval(checkLiveUpdate, 90000); // every 90 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let isMounted = true;
    let animId: number;

    const canvas = canvasRef.current;
    if (!canvas) return;

    let cells: GridCell[] = [];
    let lastTimestamp = 0;
    let scanX = -60;
    let scanCycleTimer = 0;
    let totalCycleDuration = 6.0;
    let currentNumberRendered = -1;

    const SPIDER_COLORS_DARK = {
      empty: "rgba(255, 255, 255, 0.04)",
      ambient: "#7f1d1d",
      red1: "#ef4444",
      red2: "#dc2626",
      red3: "#f87171",
      blue: "#3b82f6",
      blueCyan: "#60a5fa",
    };

    const SPIDER_COLORS_LIGHT = {
      empty: "rgba(0, 0, 0, 0.05)",
      ambient: "#fca5a5",
      red1: "#ef4444",
      red2: "#dc2626",
      red3: "#b91c1c",
      blue: "#2563eb",
      blueCyan: "#1d4ed8",
    };

    // Compact micro-box dimensions
    let canvasWidth = 365;
    let canvasHeight = 76;
    let currentDpr = 1;
    let currentCellSize = 6;
    const cols = 41;
    const rows = 7;

    const setupCanvas = (countNumber: number) => {
      currentNumberRendered = countNumber;
      const isDark = document.documentElement.classList.contains("dark");
      currentDpr = Math.min(window.devicePixelRatio || 1, 2);

      // Sizing: Desktop default is 365px.
      // On narrow mobile devices (<365px available in container), scale proportionally so all 41 columns fit perfectly.
      const containerW = containerRef.current?.clientWidth || (typeof window !== "undefined" ? window.innerWidth : 365);
      const targetWidth = Math.min(365, Math.max(containerW, 260));
      const scale = targetWidth < 365 ? targetWidth / 365 : 1;

      const step = 8.5 * scale;
      const cellSize = Math.max(4, 6 * scale);
      const paddingX = 8 * scale;
      const paddingY = 8 * scale;
      canvasWidth = Math.ceil(cols * step + paddingX * 2);
      canvasHeight = Math.ceil(rows * step + paddingY * 2);
      currentCellSize = cellSize;

      canvas.width = Math.floor(canvasWidth * currentDpr);
      canvas.height = Math.floor(canvasHeight * currentDpr);
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;

      const colors = isDark ? SPIDER_COLORS_DARK : SPIDER_COLORS_LIGHT;

      // Format number to string e.g. "192" or "1,810"
      const text = countNumber > 0 ? countNumber.toLocaleString() : "192";

      // Calculate total columns needed for the digits
      let totalDigitCols = 0;
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        const bitmap = FONT_7x4[ch] || FONT_7x4[" "];
        totalDigitCols += bitmap[0].length;
        if (i < text.length - 1) {
          totalDigitCols += 1; // 1-col gap
        }
      }

      // Center digits inside the 41-col grid
      const startCol = Math.max(0, Math.floor((cols - totalDigitCols) / 2));

      // Build sequential order of boxes per digit:
      // First digit 0 (e.g. '1'), then digit 1 (e.g. '9'), then digit 2 (e.g. '2')
      interface BoxPos {
        col: number;
        row: number;
        digitIdx: number;
      }

      const digitBoxesByChar: BoxPos[][] = [];
      let currentCol = startCol;

      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        const bitmap = FONT_7x4[ch] || FONT_7x4[" "];
        const chWidth = bitmap[0].length;
        const charBoxes: BoxPos[] = [];

        // Collect boxes in natural top-to-bottom, stroke order
        for (let r = 0; r < 7; r++) {
          for (let c = 0; c < chWidth; c++) {
            if (bitmap[r][c] === 1) {
              charBoxes.push({
                col: currentCol + c,
                row: r,
                digitIdx: i,
              });
            }
          }
        }

        digitBoxesByChar.push(charBoxes);
        currentCol += chWidth + 1;
      }

      // Calculate timeline offsets for each box
      const boxDelay = 0.05; // 50ms per box fill
      const digitGapDelay = 0.16; // 160ms pause between digits
      let currentTimelineTime = 0.1; // initial slight offset

      const digitBoxMeta = new Map<
        string,
        { digitIndex: number; orderIndex: number; appearTime: number }
      >();

      let globalOrder = 0;

      for (let d = 0; d < digitBoxesByChar.length; d++) {
        const charBoxes = digitBoxesByChar[d];
        for (let b = 0; b < charBoxes.length; b++) {
          const box = charBoxes[b];
          digitBoxMeta.set(`${box.col},${box.row}`, {
            digitIndex: d,
            orderIndex: globalOrder,
            appearTime: currentTimelineTime,
          });
          currentTimelineTime += boxDelay;
          globalOrder++;
        }
        currentTimelineTime += digitGapDelay;
      }

      const typingDuration = currentTimelineTime;
      const holdDuration = 2.0; // hold full number glowing for 2.0s
      const wipeDuration = 0.75; // 0.75s smooth dissolve wipe
      const pauseDuration = 0.35; // brief breath before restarting from '1'

      totalCycleDuration = typingDuration + holdDuration + wipeDuration + pauseDuration;

      cells = [];

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = paddingX + c * step;
          const y = paddingY + r * step;
          const key = `${c},${r}`;
          const meta = digitBoxMeta.get(key);
          const isDigit = !!meta;

          // Natural pseudo-random scattered ambient commit dots (like GitHub activity)
          const hash = Math.abs(Math.sin(c * 127.1 + r * 311.7) * 43758.5453) % 1;
          const isAmbient = !isDigit && hash > 0.83;

          let chosenColor = colors.empty;
          let glowColor = "rgba(0, 0, 0, 0)";
          let floor = 0.15;
          let peak = 0.25;
          let speed = 1.6 + Math.random() * 2.8;

          if (isDigit) {
            // Spider-Man color theme: 78% Red, 22% Quantum Blue
            const isBlue = Math.sin(c * 9.1 + r * 4.3) > 0.55;
            if (isBlue) {
              chosenColor = colors.blue;
              glowColor = isDark
                ? "rgba(59, 130, 246, 0.85)"
                : "rgba(37, 99, 235, 0.6)";
            } else {
              const redVariant = Math.sin(c * 3.3 + r * 8.7);
              chosenColor =
                redVariant > 0.3
                  ? colors.red1
                  : redVariant > -0.3
                  ? colors.red2
                  : colors.red3;
              glowColor = isDark
                ? "rgba(239, 68, 68, 0.9)"
                : "rgba(220, 38, 38, 0.6)";
            }
            floor = 0.65;
            peak = 1.0;
          } else if (isAmbient) {
            chosenColor = colors.ambient;
            glowColor = isDark
              ? "rgba(185, 28, 28, 0.4)"
              : "rgba(220, 38, 38, 0.3)";
            floor = 0.25;
            peak = 0.55;
          }

          cells.push({
            x,
            y,
            col: c,
            row: r,
            isDigit,
            digitIndex: meta ? meta.digitIndex : -1,
            orderIndex: meta ? meta.orderIndex : -1,
            appearTime: meta ? meta.appearTime : 99999,
            isAmbient,
            phase: Math.random() * Math.PI * 2,
            speed,
            floor,
            peak,
            color: chosenColor,
            glowColor,
            currentAlpha: floor,
            isCurrentlyLit: false,
          });
        }
      }
    };

    const draw = (currentTime: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = currentDpr;
      const isDark = document.documentElement.classList.contains("dark");
      const dt = lastTimestamp
        ? Math.min((currentTime - lastTimestamp) / 1000, 0.1)
        : 0.016;
      lastTimestamp = currentTime;

      // Check if total count changed from live API
      if (totalCountRef.current !== currentNumberRendered) {
        setupCanvas(totalCountRef.current);
      }

      // Update scan laser beam (sweeps every 6s)
      scanCycleTimer += dt;
      if (scanCycleTimer >= 6) {
        scanCycleTimer = 0;
        scanX = -40;
      }
      if (scanX < canvasWidth + 40) {
        scanX += dt * 220;
      }

      // Clear canvas
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const tSec = currentTime / 1000;
      const cellSize = currentCellSize;
      const pointer = pointerRef.current;
      const shockwaves = shockwavesRef.current;
      const mouseActive = pointer.active;
      const mouseRadius = 75;

      // Calculate sequential draw cycle time
      const cycleTimer = tSec % totalCycleDuration;
      const wipeStartTime = totalCycleDuration - 1.1; // when fade out begins

      // Update shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += dt * 200;
        sw.alpha = Math.max(0, 1 - sw.radius / sw.maxRadius);
        if (sw.radius >= sw.maxRadius || sw.alpha <= 0) {
          shockwaves.splice(s, 1);
        } else {
          ctx.beginPath();
          ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
          ctx.strokeStyle = sw.color;
          ctx.lineWidth = 1;
          ctx.globalAlpha = sw.alpha * 0.45;
          ctx.stroke();
        }
      }

      // Draw subtle laser scan bar
      if (scanX > -30 && scanX < canvasWidth + 30) {
        const scanGrad = ctx.createLinearGradient(scanX - 16, 0, scanX + 16, 0);
        scanGrad.addColorStop(0, "rgba(239, 68, 68, 0)");
        scanGrad.addColorStop(
          0.5,
          isDark ? "rgba(59, 130, 246, 0.2)" : "rgba(37, 99, 235, 0.16)"
        );
        scanGrad.addColorStop(1, "rgba(239, 68, 68, 0)");
        ctx.fillStyle = scanGrad;
        ctx.fillRect(scanX - 16, 0, 32, canvasHeight);
      }

      // Draw all grid cells
      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];

        if (cell.isDigit) {
          // Sequential drawing condition:
          // Box appears only when cycleTimer >= cell.appearTime
          const isDrawn = cycleTimer >= cell.appearTime;
          let boxFade = 1.0;

          // If in wipe phase, smoothly fade out boxes
          if (cycleTimer >= wipeStartTime) {
            const wipeProgress = (cycleTimer - wipeStartTime) / 0.75;
            // Left to right wave dissolve
            const colRatio = cell.col / cols;
            if (wipeProgress > colRatio * 0.8) {
              boxFade = Math.max(0, 1 - (wipeProgress - colRatio * 0.8) * 4);
            }
          }

          const isVisible = isDrawn && boxFade > 0.05;
          cell.isCurrentlyLit = isVisible;

          if (isVisible) {
            // How recently did this box appear? (creates initial pop flash)
            const timeSinceAppear = cycleTimer - cell.appearTime;
            const flashBoost =
              timeSinceAppear >= 0 && timeSinceAppear < 0.22
                ? (1 - timeSinceAppear / 0.22) * 0.5
                : 0;

            const pulse = (Math.sin(tSec * cell.speed + cell.phase) + 1) * 0.5;
            let alpha =
              (cell.floor + (cell.peak - cell.floor) * pulse + flashBoost) *
              boxFade;

            // Mouse proximity boost
            if (mouseActive) {
              const dx = cell.x + cellSize / 2 - pointer.x;
              const dy = cell.y + cellSize / 2 - pointer.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < mouseRadius) {
                const proximity = 1 - dist / mouseRadius;
                alpha = Math.min(1, alpha + proximity * 0.65);
              }
            }

            // Laser scan excitation
            const scanDist = Math.abs(cell.x - scanX);
            if (scanDist < 20) {
              const factor = 1 - scanDist / 20;
              alpha = Math.min(1, alpha + factor * 0.45);
            }

            // Shockwave excitation
            for (let s = 0; s < shockwaves.length; s++) {
              const sw = shockwaves[s];
              const cdx = cell.x + cellSize / 2 - sw.x;
              const cdy = cell.y + cellSize / 2 - sw.y;
              const dist = Math.sqrt(cdx * cdx + cdy * cdy);
              const ringDiff = Math.abs(dist - sw.radius);
              if (ringDiff < 14) {
                const boost = (1 - ringDiff / 14) * sw.alpha * 0.75;
                alpha = Math.min(1, alpha + boost);
              }
            }

            cell.currentAlpha = alpha;

            ctx.save();
            ctx.shadowColor = cell.glowColor;
            ctx.shadowBlur = flashBoost > 0 ? 10 : isDark ? 6 : 4;
            ctx.fillStyle = cell.color;
            ctx.globalAlpha = cell.currentAlpha;

            const r = 1.6;
            ctx.beginPath();
            ctx.roundRect(cell.x, cell.y, cellSize, cellSize, r);
            ctx.fill();
            ctx.restore();
          } else {
            // When not yet drawn or faded, render as inactive background tile
            let baseAlpha = isDark ? 0.35 : 0.45;
            ctx.fillStyle = isDark
              ? SPIDER_COLORS_DARK.empty
              : SPIDER_COLORS_LIGHT.empty;
            ctx.globalAlpha = baseAlpha;
            const r = 1.4;
            ctx.beginPath();
            ctx.roundRect(cell.x, cell.y, cellSize, cellSize, r);
            ctx.fill();
          }
        } else if (cell.isAmbient) {
          // Ambient scattered commit box
          const pulse = (Math.sin(tSec * cell.speed + cell.phase) + 1) * 0.5;
          let alpha = cell.floor + (cell.peak - cell.floor) * pulse;

          if (mouseActive) {
            const dx = cell.x + cellSize / 2 - pointer.x;
            const dy = cell.y + cellSize / 2 - pointer.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouseRadius) {
              alpha = Math.min(1, alpha + (1 - dist / mouseRadius) * 0.5);
            }
          }

          cell.currentAlpha = alpha;
          cell.isCurrentlyLit = true;

          ctx.fillStyle = cell.color;
          ctx.globalAlpha = cell.currentAlpha;
          const r = 1.5;
          ctx.beginPath();
          ctx.roundRect(cell.x, cell.y, cellSize, cellSize, r);
          ctx.fill();
        } else {
          // Empty background grid tile
          let baseAlpha = isDark ? 0.35 : 0.45;

          if (mouseActive) {
            const dx = cell.x + cellSize / 2 - pointer.x;
            const dy = cell.y + cellSize / 2 - pointer.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouseRadius) {
              baseAlpha += (1 - dist / mouseRadius) * 0.2;
            }
          }

          ctx.fillStyle = cell.color;
          ctx.globalAlpha = baseAlpha;
          const r = 1.4;
          ctx.beginPath();
          ctx.roundRect(cell.x, cell.y, cellSize, cellSize, r);
          ctx.fill();
        }
      }

      // Draw interactive Spider-Silk filaments connecting cursor to currently lit digit nodes
      if (mouseActive) {
        const nearNodes: { cell: GridCell; dist: number }[] = [];
        for (let i = 0; i < cells.length; i++) {
          const cell = cells[i];
          if (cell.isDigit && cell.isCurrentlyLit) {
            const dx = cell.x + cellSize / 2 - pointer.x;
            const dy = cell.y + cellSize / 2 - pointer.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouseRadius) {
              nearNodes.push({ cell, dist });
            }
          }
        }

        nearNodes.sort((a, b) => a.dist - b.dist);
        const closestNodes = nearNodes.slice(0, 5);

        ctx.lineWidth = 0.65;
        for (let j = 0; j < closestNodes.length; j++) {
          const { cell, dist } = closestNodes[j];
          const strength = (1 - dist / mouseRadius) * 0.55;
          ctx.strokeStyle = cell.color;
          ctx.globalAlpha = strength;
          ctx.beginPath();
          ctx.moveTo(pointer.x, pointer.y);
          ctx.lineTo(cell.x + cellSize / 2, cell.y + cellSize / 2);
          ctx.stroke();
        }

        // Draw Spider-Sense reticle at cursor
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = isDark
          ? "rgba(239, 68, 68, 0.45)"
          : "rgba(220, 38, 38, 0.4)";
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 7, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
    };

    let isVisible = true;

    const loop = (timestamp: number) => {
      if (!isMounted || !isVisible) return;
      animId = requestAnimationFrame(loop);
      draw(timestamp);
    };

    const container = containerRef.current;
    let intersectionObserver: IntersectionObserver | null = null;
    if (container) {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            isVisible = entry.isIntersecting;
            if (isVisible && isMounted) {
              cancelAnimationFrame(animId);
              animId = requestAnimationFrame(loop);
            } else {
              cancelAnimationFrame(animId);
            }
          }
        },
        { threshold: 0.05 }
      );
      intersectionObserver.observe(container);
    }

    // Load initial contributions
    async function loadData() {
      try {
        const res = await fetch("/api/github-contributions");
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        if (isMounted) {
          const count = json.total?.lastYear ?? 192;
          setTotalContributions(count);
          totalCountRef.current = count;
          setupCanvas(count);
          if (isVisible) {
            animId = requestAnimationFrame(loop);
          }
        }
      } catch (e) {
        console.error("Error loading GitHub contributions:", e);
        if (isMounted) {
          setupCanvas(192);
          if (isVisible) {
            animId = requestAnimationFrame(loop);
          }
        }
      }
    }

    loadData();

    const themeObserver = new MutationObserver(() => {
      setupCanvas(totalCountRef.current);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    let resizeObserver: ResizeObserver | null = null;
    let lastObsW = 0;
    if (container) {
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const w = Math.floor(entry.contentRect.width);
          if (w > 0 && Math.abs(w - lastObsW) >= 4) {
            lastObsW = w;
            setupCanvas(totalCountRef.current);
          }
        }
      });
      resizeObserver.observe(container);
    }

    return () => {
      isMounted = false;
      cancelAnimationFrame(animId);
      intersectionObserver?.disconnect();
      resizeObserver?.disconnect();
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

    // Add expanding shockwave on click
    shockwavesRef.current.push({
      x: clickX,
      y: clickY,
      radius: 3,
      maxRadius: 160,
      color: Math.random() > 0.3 ? "#ef4444" : "#3b82f6",
      alpha: 0.95,
    });
  };

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col items-center pt-2 pb-0 mt-2 mb-0 select-none"
    >
      {/* Centered Compact Moving Matrix Canvas */}
      <div className="flex justify-center w-full cursor-crosshair">
        <canvas
          ref={canvasRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onPointerDown={handlePointerDown}
          className="block"
        />
      </div>

      {/* Centered Contribution Count Subtitle matching Reference Screenshot */}
      <div className="mt-3 text-center">
        <a
          href="https://github.com/RITIKSINGH-DEOS"
          target="_blank"
          rel="noopener noreferrer"
          className="group/stat inline-flex items-center gap-1.5 font-mono text-[11px] sm:text-xs tracking-[0.22em] text-muted-foreground/80 hover:text-foreground transition-colors cursor-pointer"
          title="View GitHub Profile"
        >
          <span>
            {totalContributions.toLocaleString()} CONTRIBUTIONS IN THE LAST YEAR
          </span>
        </a>
      </div>
    </div>
  );
}
