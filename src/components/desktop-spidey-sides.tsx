"use client";

import React, { useEffect, useRef } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Edge3D {
  p1: number;
  p2: number;
  color: "red" | "blue" | "white" | "dark";
  width?: number;
}

export function DesktopSpideySides() {
  const leftCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const rightCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Only run on client and if canvases exist
    const leftCanvas = leftCanvasRef.current;
    const rightCanvas = rightCanvasRef.current;
    if (!leftCanvas || !rightCanvas) return;

    const leftCtx = leftCanvas.getContext("2d");
    const rightCtx = rightCanvas.getContext("2d");
    if (!leftCtx || !rightCtx) return;

    let animId: number;
    let width = 280;
    let height = 440;

    leftCanvas.width = width * window.devicePixelRatio;
    leftCanvas.height = height * window.devicePixelRatio;
    leftCtx.scale(window.devicePixelRatio, window.devicePixelRatio);

    rightCanvas.width = width * window.devicePixelRatio;
    rightCanvas.height = height * window.devicePixelRatio;
    rightCtx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Global cursor tracking for 3D head-tracking & gyro tilt
    let mouseGlobalX = window.innerWidth * 0.5;
    let mouseGlobalY = window.innerHeight * 0.5;

    const onMouseMove = (e: MouseEvent) => {
      mouseGlobalX = e.clientX;
      mouseGlobalY = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    // =======================================================
    // 1. LEFT SIDE: 3D SPIDER-MAN MASK WITH HEAD-TRACKING
    // =======================================================
    const maskVertices: Point3D[] = [
      // Cranium / Forehead
      { x: 0, y: -95, z: -10 },   // 0: Crown
      { x: 0, y: -65, z: 35 },    // 1: Forehead Center
      { x: -38, y: -60, z: 22 },  // 2: Forehead Left
      { x: 38, y: -60, z: 22 },   // 3: Forehead Right
      { x: -52, y: -25, z: 5 },   // 4: Temple Left
      { x: 52, y: -25, z: 5 },    // 5: Temple Right

      // Center Face / Nose Bridge
      { x: 0, y: -5, z: 52 },     // 6: Nose Bridge Apex
      { x: 0, y: 30, z: 42 },     // 7: Upper Lip Center

      // Cheeks & Jaw
      { x: -44, y: 15, z: 28 },   // 8: Cheek Left
      { x: 44, y: 15, z: 28 },    // 9: Cheek Right
      { x: -30, y: 62, z: 18 },   // 10: Jaw Left
      { x: 30, y: 62, z: 18 },    // 11: Jaw Right
      { x: 0, y: 85, z: 22 },     // 12: Chin Tip

      // Left Eye Lens (Angular Spider-Man Mask Eye)
      { x: -7, y: -18, z: 46 },   // 13: Left Eye Inner Top
      { x: -38, y: -26, z: 32 },  // 14: Left Eye Outer Top Corner
      { x: -36, y: 2, z: 34 },    // 15: Left Eye Outer Bottom
      { x: -9, y: 6, z: 44 },     // 16: Left Eye Inner Bottom

      // Right Eye Lens (Symmetric)
      { x: 7, y: -18, z: 46 },    // 17: Right Eye Inner Top
      { x: 38, y: -26, z: 32 },   // 18: Right Eye Outer Top Corner
      { x: 36, y: 2, z: 34 },     // 19: Right Eye Outer Bottom
      { x: 9, y: 6, z: 44 },      // 20: Right Eye Inner Bottom

      // Back of Head Contour
      { x: 0, y: -75, z: -45 },   // 21: Back Top
      { x: -45, y: 0, z: -35 },   // 22: Back Left
      { x: 45, y: 0, z: -35 },    // 23: Back Right
      { x: 0, y: 45, z: -35 },    // 24: Back Bottom
    ];

    const maskEdges: Edge3D[] = [
      // Facial Contour (Red)
      { p1: 0, p2: 1, color: "red" }, { p1: 1, p2: 6, color: "red" }, { p1: 6, p2: 7, color: "red" }, { p1: 7, p2: 12, color: "red" },
      { p1: 0, p2: 2, color: "red" }, { p1: 0, p2: 3, color: "red" },
      { p1: 1, p2: 2, color: "red" }, { p1: 1, p2: 3, color: "red" },
      { p1: 2, p2: 4, color: "red" }, { p1: 3, p2: 5, color: "red" },
      { p1: 4, p2: 8, color: "red" }, { p1: 5, p2: 9, color: "red" },
      { p1: 8, p2: 10, color: "blue" }, { p1: 9, p2: 11, color: "blue" },
      { p1: 10, p2: 12, color: "blue" }, { p1: 11, p2: 12, color: "blue" },

      // Web Strands from Nose Bridge (Spider-Web Facial Lines)
      { p1: 6, p2: 2, color: "red" }, { p1: 6, p2: 3, color: "red" },
      { p1: 6, p2: 8, color: "red" }, { p1: 6, p2: 9, color: "red" },
      { p1: 7, p2: 8, color: "red" }, { p1: 7, p2: 9, color: "red" },
      { p1: 7, p2: 10, color: "blue" }, { p1: 7, p2: 11, color: "blue" },

      // Left Eye Outline (White/Black)
      { p1: 13, p2: 14, color: "white", width: 2.2 },
      { p1: 14, p2: 15, color: "white", width: 2.2 },
      { p1: 15, p2: 16, color: "white", width: 2.2 },
      { p1: 16, p2: 13, color: "white", width: 2.2 },

      // Right Eye Outline
      { p1: 17, p2: 18, color: "white", width: 2.2 },
      { p1: 18, p2: 19, color: "white", width: 2.2 },
      { p1: 19, p2: 20, color: "white", width: 2.2 },
      { p1: 20, p2: 17, color: "white", width: 2.2 },

      // Back of Head Wireframe
      { p1: 0, p2: 21, color: "dark" },
      { p1: 21, p2: 22, color: "dark" }, { p1: 21, p2: 23, color: "dark" },
      { p1: 22, p2: 24, color: "dark" }, { p1: 23, p2: 24, color: "dark" },
      { p1: 4, p2: 22, color: "dark" }, { p1: 5, p2: 23, color: "dark" },
    ];

    // =======================================================
    // 2. RIGHT SIDE: 3D QUANTUM WEB-SHOOTER & KINETIC RINGS
    // =======================================================
    const shooterGimbal: { ringRadius: number; segments: number; tiltAxis: "x" | "y" | "z"; color: "blue" | "red" | "white" }[] = [
      { ringRadius: 78, segments: 24, tiltAxis: "y", color: "blue" },
      { ringRadius: 62, segments: 20, tiltAxis: "x", color: "red" },
      { ringRadius: 46, segments: 16, tiltAxis: "z", color: "white" },
    ];

    // Core 3D Spider Nozzle
    const nozzleVertices: Point3D[] = [
      { x: 0, y: 0, z: -25 },  // 0: Core back
      { x: 0, y: 0, z: 32 },   // 1: Nozzle tip
      // Center Spider Octagon
      { x: -16, y: -8, z: 0 }, { x: -8, y: -16, z: 0 },
      { x: 8, y: -16, z: 0 },  { x: 16, y: -8, z: 0 },
      { x: 16, y: 8, z: 0 },   { x: 8, y: 16, z: 0 },
      { x: -8, y: 16, z: 0 },  { x: -16, y: 8, z: 0 },
      // 4 Outward Mechanical Struts
      { x: -42, y: -42, z: 12 }, { x: 42, y: -42, z: 12 },
      { x: -42, y: 42, z: 12 },  { x: 42, y: 42, z: 12 },
    ];

    // 3D Projection Helper
    const project3D = (
      p: Point3D,
      rotX: number,
      rotY: number,
      rotZ: number,
      cx: number,
      cy: number,
      fov = 420,
      cameraZ = 460
    ) => {
      // Rotate Y
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = p.x * cosY + p.z * sinY;
      const z1 = -p.x * sinY + p.z * cosY;
      const y1 = p.y;

      // Rotate X
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y2 = y1 * cosX - z1 * sinX;
      const z2 = y1 * sinX + z1 * cosX;
      const x2 = x1;

      // Rotate Z
      const cosZ = Math.cos(rotZ);
      const sinZ = Math.sin(rotZ);
      const x3 = x2 * cosZ - y2 * sinZ;
      const y3 = x2 * sinZ + y2 * cosZ;
      const z3 = z2;

      const effZ = z3 + cameraZ;
      const scale = fov / Math.max(30, effZ);

      return {
        x: cx + x3 * scale,
        y: cy + y3 * scale,
        z: z3,
        scale,
      };
    };

    // Smooth head-tracking angles
    let leftHeadRotX = 0;
    let leftHeadRotY = 0;

    let time = 0;

    // =======================================================
    // MAIN RENDER LOOP
    // =======================================================
    const render = () => {
      leftCtx.clearRect(0, 0, width, height);
      rightCtx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");
      time += 0.018;

      const centerX = width * 0.5;
      const centerY = height * 0.5 + Math.sin(time * 1.6) * 12; // Floating levitation

      // =======================================================
      // 1. RENDER LEFT: 3D SPIDER-MAN MASK (HEAD-TRACKING)
      // =======================================================
      if (leftCanvas) {
        const leftRect = leftCanvas.getBoundingClientRect();
        const canvasScreenCenterX = leftRect.left + leftRect.width / 2;
        const canvasScreenCenterY = leftRect.top + leftRect.height / 2;

        // Calculate angle towards mouse cursor
        const dx = mouseGlobalX - canvasScreenCenterX;
        const dy = mouseGlobalY - canvasScreenCenterY;

        const targetRotY = Math.max(-0.65, Math.min(0.65, dx * 0.0009));
        const targetRotX = Math.max(-0.45, Math.min(0.45, -dy * 0.0009));

        leftHeadRotX += (targetRotX - leftHeadRotX) * 0.08;
        leftHeadRotY += (targetRotY - leftHeadRotY) * 0.08;

        const maskRotX = leftHeadRotX + Math.sin(time * 0.8) * 0.04;
        const maskRotY = leftHeadRotY;
        const maskRotZ = Math.sin(time * 0.5) * 0.03;

        // Project mask vertices
        const projMask = maskVertices.map((v) =>
          project3D(v, maskRotX, maskRotY, maskRotZ, centerX, centerY, 380, 420)
        );

        // Draw Eye Lens Filled Polygonal Highlights (White Mask Eyes)
        const drawEyeFill = (indices: number[]) => {
          leftCtx.save();
          leftCtx.beginPath();
          leftCtx.moveTo(projMask[indices[0]].x, projMask[indices[0]].y);
          for (let i = 1; i < indices.length; i++) {
            leftCtx.lineTo(projMask[indices[i]].x, projMask[indices[i]].y);
          }
          leftCtx.closePath();

          leftCtx.fillStyle = isDark
            ? "rgba(255, 255, 255, 0.85)"
            : "rgba(240, 249, 255, 0.95)";
          leftCtx.shadowColor = isDark ? "#38bdf8" : "#2563eb";
          leftCtx.shadowBlur = isDark ? 10 : 4;
          leftCtx.fill();
          leftCtx.restore();
        };

        drawEyeFill([13, 14, 15, 16]); // Left Eye
        drawEyeFill([17, 18, 19, 20]); // Right Eye

        // Draw Mask Wireframe Edges
        maskEdges.forEach((edge) => {
          const v1 = projMask[edge.p1];
          const v2 = projMask[edge.p2];

          const avgZ = (v1.z + v2.z) * 0.5;
          const depthAlpha = Math.max(0.2, Math.min(1, (avgZ + 120) / 240));

          leftCtx.beginPath();
          leftCtx.moveTo(v1.x, v1.y);
          leftCtx.lineTo(v2.x, v2.y);

          if (edge.color === "white") {
            leftCtx.strokeStyle = isDark ? "#09090b" : "#0f172a";
            leftCtx.lineWidth = edge.width || 2;
          } else if (edge.color === "red") {
            leftCtx.strokeStyle = isDark
              ? `rgba(239, 68, 68, ${depthAlpha * 0.9})`
              : `rgba(220, 38, 38, ${depthAlpha * 0.85})`;
            leftCtx.lineWidth = depthAlpha * 1.8;
          } else if (edge.color === "blue") {
            leftCtx.strokeStyle = isDark
              ? `rgba(59, 130, 246, ${depthAlpha * 0.9})`
              : `rgba(37, 99, 235, ${depthAlpha * 0.85})`;
            leftCtx.lineWidth = depthAlpha * 1.8;
          } else {
            leftCtx.strokeStyle = isDark
              ? `rgba(148, 163, 184, ${depthAlpha * 0.25})`
              : `rgba(100, 116, 139, ${depthAlpha * 0.2})`;
            leftCtx.lineWidth = 0.9;
          }

          leftCtx.stroke();
        });

        // Glowing nodes on forehead and chin
        [0, 1, 6, 12].forEach((idx) => {
          const pt = projMask[idx];
          leftCtx.beginPath();
          leftCtx.arc(pt.x, pt.y, 2.2, 0, Math.PI * 2);
          leftCtx.fillStyle = isDark ? "#f87171" : "#dc2626";
          leftCtx.fill();
        });
      }

      // =======================================================
      // 2. RENDER RIGHT: 3D KINETIC WEB-SHOOTER & GIMBAL RINGS
      // =======================================================
      if (rightCanvas) {
        const rightRotX = Math.sin(time * 0.7) * 0.35 + (mouseGlobalY / window.innerHeight - 0.5) * -0.4;
        const rightRotY = time * 0.8 + (mouseGlobalX / window.innerWidth - 0.5) * 0.4;
        const rightRotZ = Math.cos(time * 0.5) * 0.25;

        // Draw 3 Gimbal Rings
        shooterGimbal.forEach((gimbal, gIdx) => {
          const ringPts: Point3D[] = [];
          const speedMultiplier = gIdx === 1 ? -1.3 : 1;
          const currentRotY = rightRotY * speedMultiplier + (gIdx * Math.PI) / 3;
          const currentRotX = rightRotX + (gIdx === 0 ? Math.sin(time) * 0.2 : 0);

          for (let i = 0; i < gimbal.segments; i++) {
            const theta = (i / gimbal.segments) * Math.PI * 2;
            let rx = 0;
            let ry = 0;
            let rz = 0;

            if (gimbal.tiltAxis === "y") {
              rx = Math.cos(theta) * gimbal.ringRadius;
              rz = Math.sin(theta) * gimbal.ringRadius;
            } else if (gimbal.tiltAxis === "x") {
              ry = Math.cos(theta) * gimbal.ringRadius;
              rz = Math.sin(theta) * gimbal.ringRadius;
            } else {
              rx = Math.cos(theta) * gimbal.ringRadius;
              ry = Math.sin(theta) * gimbal.ringRadius;
            }

            ringPts.push({ x: rx, y: ry, z: rz });
          }

          const projRing = ringPts.map((p) =>
            project3D(p, currentRotX, currentRotY, rightRotZ, centerX, centerY, 380, 420)
          );

          // Draw Ring
          rightCtx.beginPath();
          rightCtx.moveTo(projRing[0].x, projRing[0].y);
          for (let i = 1; i < projRing.length; i++) {
            rightCtx.lineTo(projRing[i].x, projRing[i].y);
          }
          rightCtx.closePath();

          if (gimbal.color === "red") {
            rightCtx.strokeStyle = isDark ? "rgba(239, 68, 68, 0.75)" : "rgba(220, 38, 38, 0.7)";
            rightCtx.lineWidth = 1.6;
          } else if (gimbal.color === "blue") {
            rightCtx.strokeStyle = isDark ? "rgba(59, 130, 246, 0.85)" : "rgba(37, 99, 235, 0.75)";
            rightCtx.lineWidth = 1.8;
          } else {
            rightCtx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(71, 85, 105, 0.5)";
            rightCtx.lineWidth = 1.2;
          }
          rightCtx.stroke();

          // Draw tick nodes along ring
          projRing.forEach((pt, pIdx) => {
            if (pIdx % 4 === 0) {
              rightCtx.beginPath();
              rightCtx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
              rightCtx.fillStyle = isDark ? "#60a5fa" : "#2563eb";
              rightCtx.fill();
            }
          });
        });

        // Draw Center Web Core Nozzle
        const projNozzle = nozzleVertices.map((p) =>
          project3D(p, rightRotX * 1.2, rightRotY * 1.5, rightRotZ, centerX, centerY, 380, 420)
        );

        // Core Struts (Red)
        for (let i = 2; i <= 9; i++) {
          const next = i === 9 ? 2 : i + 1;
          rightCtx.beginPath();
          rightCtx.moveTo(projNozzle[i].x, projNozzle[i].y);
          rightCtx.lineTo(projNozzle[next].x, projNozzle[next].y);
          rightCtx.strokeStyle = isDark ? "#ef4444" : "#dc2626";
          rightCtx.lineWidth = 1.6;
          rightCtx.stroke();

          // Connect to center nozzle tip
          rightCtx.beginPath();
          rightCtx.moveTo(projNozzle[i].x, projNozzle[i].y);
          rightCtx.lineTo(projNozzle[1].x, projNozzle[1].y);
          rightCtx.strokeStyle = isDark ? "rgba(59, 130, 246, 0.55)" : "rgba(37, 99, 235, 0.45)";
          rightCtx.lineWidth = 1;
          rightCtx.stroke();
        }

        // Outward Mechanical Web Claws
        [10, 11, 12, 13].forEach((idx) => {
          rightCtx.beginPath();
          rightCtx.moveTo(projNozzle[0].x, projNozzle[0].y);
          rightCtx.lineTo(projNozzle[idx].x, projNozzle[idx].y);
          rightCtx.strokeStyle = isDark ? "#f87171" : "#b91c1c";
          rightCtx.lineWidth = 2.2;
          rightCtx.lineCap = "round";
          rightCtx.stroke();
        });

        // Center Web Energy Pulse (Tip)
        const pulse = 2.5 + Math.sin(time * 5) * 1.2;
        rightCtx.beginPath();
        rightCtx.arc(projNozzle[1].x, projNozzle[1].y, pulse, 0, Math.PI * 2);
        rightCtx.fillStyle = isDark ? "#38bdf8" : "#2563eb";
        rightCtx.shadowColor = isDark ? "#38bdf8" : "#2563eb";
        rightCtx.shadowBlur = isDark ? 12 : 6;
        rightCtx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      {/* LEFT SIDE: 3D Spider-Man Mask Hologram (Head Tracking) */}
      <aside
        aria-hidden="true"
        className="hidden xl:flex flex-col items-center fixed left-3 2xl:left-12 top-1/2 -translate-y-1/2 z-20 pointer-events-none select-none transition-all duration-500"
      >
        <div className="relative flex flex-col items-center">
          <canvas
            ref={leftCanvasRef}
            className="w-[260px] h-[400px] drop-shadow-[0_15px_35px_rgba(220,38,38,0.25)]"
          />
          {/* Subtle Cyberpunk Spider-Man Badge Label */}
          <div className="mt-[-20px] px-3 py-1 rounded-full border border-red-500/30 bg-background/60 backdrop-blur-md shadow-md text-[11px] font-mono tracking-wider text-red-500 dark:text-red-400 uppercase">
            SPIDER-SENSE // 3D
          </div>
        </div>
      </aside>

      {/* RIGHT SIDE: 3D Quantum Web-Shooter Core (Kinetic Gyro) */}
      <aside
        aria-hidden="true"
        className="hidden xl:flex flex-col items-center fixed right-3 2xl:right-12 top-1/2 -translate-y-1/2 z-20 pointer-events-none select-none transition-all duration-500"
      >
        <div className="relative flex flex-col items-center">
          <canvas
            ref={rightCanvasRef}
            className="w-[260px] h-[400px] drop-shadow-[0_15px_35px_rgba(37,99,235,0.25)]"
          />
          {/* Subtle Cyberpunk Spider-Man Badge Label */}
          <div className="mt-[-20px] px-3 py-1 rounded-full border border-blue-500/30 bg-background/60 backdrop-blur-md shadow-md text-[11px] font-mono tracking-wider text-blue-500 dark:text-blue-400 uppercase">
            WEB-SHOOTER // V2
          </div>
        </div>
      </aside>
    </>
  );
}
