"use client";

import React, { useEffect, useRef } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Edge {
  p1: number;
  p2: number;
  type: "blue" | "red" | "white" | "gold";
}

interface Particle3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  color: "red" | "blue" | "white";
  size: number;
  alpha: number;
}

export function SpiderBackground3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse tilt interaction
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / width) * 2 - 1;
      const normY = (e.clientY / height) * 2 - 1;
      targetTiltY = normX * 0.45;
      targetTiltX = -normY * 0.35;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // ==========================================
    // 1. GENERATE 3D SPIDER WEB SPHERE GEOMETRY
    // ==========================================
    const webVertices: Point3D[] = [];
    const webEdges: Edge[] = [];

    const rings = 5;
    const spokes = 12;
    const maxRadius = 180;

    // Center poles
    webVertices.push({ x: 0, y: -maxRadius, z: 0 }); // Index 0: Top Pole
    webVertices.push({ x: 0, y: maxRadius, z: 0 });  // Index 1: Bottom Pole

    // Latitudinal rings
    for (let r = 1; r <= rings; r++) {
      const phi = (r / (rings + 1)) * Math.PI; // from 0 to PI
      const ringY = -Math.cos(phi) * maxRadius;
      const ringRadius = Math.sin(phi) * maxRadius;

      const ringStartIndex = webVertices.length;

      for (let s = 0; s < spokes; s++) {
        const theta = (s / spokes) * Math.PI * 2;
        const vx = Math.cos(theta) * ringRadius;
        const vz = Math.sin(theta) * ringRadius;

        webVertices.push({ x: vx, y: ringY, z: vz });

        const currentIndex = ringStartIndex + s;
        const nextInRing = ringStartIndex + ((s + 1) % spokes);

        // Circular web thread (Red)
        webEdges.push({ p1: currentIndex, p2: nextInRing, type: "red" });

        // Connect to pole or previous ring (Blue radial spoke)
        if (r === 1) {
          webEdges.push({ p1: 0, p2: currentIndex, type: "blue" });
        } else {
          const prevRingIndex = currentIndex - spokes;
          webEdges.push({ p1: prevRingIndex, p2: currentIndex, type: "blue" });

          // Spiral web cross-link (White)
          if ((s + r) % 2 === 0) {
            const diagonalIndex = ringStartIndex - spokes + ((s + 1) % spokes);
            webEdges.push({ p1: currentIndex, p2: diagonalIndex, type: "white" });
          }
        }

        if (r === rings) {
          webEdges.push({ p1: currentIndex, p2: 1, type: "blue" });
        }
      }
    }

    // ==========================================
    // 2. GENERATE 3D SPIDER-MAN CORE EMBLEM
    // ==========================================
    const emblemVertices: Point3D[] = [];
    const emblemEdges: Edge[] = [];

    // 3D Faceted Diamond Body
    emblemVertices.push({ x: 0, y: -38, z: 0 });   // 0: Top Head
    emblemVertices.push({ x: -14, y: -5, z: 8 });  // 1: Upper Left Front
    emblemVertices.push({ x: 14, y: -5, z: 8 });   // 2: Upper Right Front
    emblemVertices.push({ x: -14, y: -5, z: -8 }); // 3: Upper Left Back
    emblemVertices.push({ x: 14, y: -5, z: -8 });  // 4: Upper Right Back
    emblemVertices.push({ x: 0, y: 5, z: 16 });    // 5: Front Chest Crest
    emblemVertices.push({ x: 0, y: 5, z: -16 });   // 6: Back Crest
    emblemVertices.push({ x: -12, y: 22, z: 6 });  // 7: Lower Left Front
    emblemVertices.push({ x: 12, y: 22, z: 6 });   // 8: Lower Right Front
    emblemVertices.push({ x: -12, y: 22, z: -6 }); // 9: Lower Left Back
    emblemVertices.push({ x: 12, y: 22, z: -6 });  // 10: Lower Right Back
    emblemVertices.push({ x: 0, y: 52, z: 0 });    // 11: Abdomen Stinger

    // Body Edges (Red & Blue faceted suit core)
    const bodyConnections: [number, number, "red" | "blue" | "white"][] = [
      [0, 1, "red"], [0, 2, "red"], [0, 3, "blue"], [0, 4, "blue"],
      [1, 5, "red"], [2, 5, "red"], [3, 6, "blue"], [4, 6, "blue"],
      [1, 2, "red"], [3, 4, "blue"], [1, 3, "white"], [2, 4, "white"],
      [5, 7, "red"], [5, 8, "red"], [6, 9, "blue"], [6, 10, "blue"],
      [7, 11, "red"], [8, 11, "red"], [9, 11, "blue"], [10, 11, "blue"],
      [7, 8, "red"], [9, 10, "blue"], [7, 9, "white"], [8, 10, "white"],
    ];

    bodyConnections.forEach(([p1, p2, type]) => {
      emblemEdges.push({ p1, p2, type });
    });

    // 8 Angular 3D Spider Legs extending in space
    const legChains: { root: number; joints: Point3D[]; type: "red" | "blue" }[] = [
      // Upper Left Leg 1
      { root: 1, joints: [{ x: -45, y: -50, z: 25 }, { x: -80, y: -25, z: 45 }], type: "red" },
      // Upper Right Leg 1
      { root: 2, joints: [{ x: 45, y: -50, z: 25 }, { x: 80, y: -25, z: 45 }], type: "red" },
      // Mid Left Leg 2
      { root: 1, joints: [{ x: -55, y: -15, z: 12 }, { x: -95, y: 5, z: 25 }], type: "blue" },
      // Mid Right Leg 2
      { root: 2, joints: [{ x: 55, y: -15, z: 12 }, { x: 95, y: 5, z: 25 }], type: "blue" },
      // Mid-Lower Left Leg 3
      { root: 7, joints: [{ x: -52, y: 40, z: -10 }, { x: -88, y: 80, z: -25 }], type: "red" },
      // Mid-Lower Right Leg 3
      { root: 8, joints: [{ x: 52, y: 40, z: -10 }, { x: 88, y: 80, z: -25 }], type: "red" },
      // Rear Left Leg 4
      { root: 9, joints: [{ x: -35, y: 65, z: -25 }, { x: -65, y: 115, z: -45 }], type: "blue" },
      // Rear Right Leg 4
      { root: 10, joints: [{ x: 35, y: 65, z: -25 }, { x: 65, y: 115, z: -45 }], type: "blue" },
    ];

    legChains.forEach((leg) => {
      let prevIndex = leg.root;
      leg.joints.forEach((joint) => {
        const newIndex = emblemVertices.length;
        emblemVertices.push(joint);
        emblemEdges.push({ p1: prevIndex, p2: newIndex, type: leg.type });
        prevIndex = newIndex;
      });
    });

    // ==========================================
    // 3. 3D FLOATING WEB PARTICLES (SPIDER-VERSE)
    // ==========================================
    const particles: Particle3D[] = [];
    const particleCount = 55;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 700,
        y: (Math.random() - 0.5) * 700,
        z: (Math.random() - 0.5) * 500,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 0.5,
        color: i % 2 === 0 ? "red" : i % 5 === 0 ? "white" : "blue",
        size: 1.2 + Math.random() * 2,
        alpha: 0.3 + Math.random() * 0.5,
      });
    }

    // 3D Projection function
    const project = (
      p: Point3D,
      rotX: number,
      rotY: number,
      rotZ: number,
      cx: number,
      cy: number,
      scaleMultiplier: number
    ) => {
      // Rotation around Y
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = p.x * cosY + p.z * sinY;
      const z1 = -p.x * sinY + p.z * cosY;
      const y1 = p.y;

      // Rotation around X
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y2 = y1 * cosX - z1 * sinX;
      const z2 = y1 * sinX + z1 * cosX;
      const x2 = x1;

      // Rotation around Z
      const cosZ = Math.cos(rotZ);
      const sinZ = Math.sin(rotZ);
      const x3 = x2 * cosZ - y2 * sinZ;
      const y3 = x2 * sinZ + y2 * cosZ;
      const z3 = z2;

      // Camera perspective projection
      const fov = 520;
      const cameraDist = 620;
      const effectiveZ = z3 + cameraDist;
      const factor = (fov / Math.max(50, effectiveZ)) * scaleMultiplier;

      return {
        x: cx + x3 * factor,
        y: cy + y3 * factor,
        z: z3,
        scale: factor,
      };
    };

    let autoRotY = 0;
    let autoRotX = 0;
    let autoRotZ = 0;
    let time = 0;

    // ==========================================
    // MAIN 3D RENDER LOOP
    // ==========================================
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");

      time += 0.012;
      autoRotY += 0.007;
      autoRotX = Math.sin(time * 0.5) * 0.25;
      autoRotZ = Math.cos(time * 0.35) * 0.12;

      // Smooth mouse tilt interpolation
      currentTiltX += (targetTiltX - currentTiltX) * 0.05;
      currentTiltY += (targetTiltY - currentTiltY) * 0.05;

      const rotX = autoRotX + currentTiltX;
      const rotY = autoRotY + currentTiltY;
      const rotZ = autoRotZ;

      // Center position with floating weightless levitation
      const centerX = width * 0.5;
      const centerY = height * 0.42 + Math.sin(time * 1.5) * 16;
      const responsiveScale = Math.min(1.15, Math.max(0.7, width / 1100));

      // 1. Draw Spider-Verse Quantum Particles & Dynamic Web Filaments
      particles.forEach((pt, i) => {
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.z += pt.vz;

        if (pt.x < -350) pt.x = 350;
        if (pt.x > 350) pt.x = -350;
        if (pt.y < -350) pt.y = 350;
        if (pt.y > 350) pt.y = -350;
        if (pt.z < -250) pt.z = 250;
        if (pt.z > 250) pt.z = -250;

        const proj = project(pt, rotX * 0.4, rotY * 0.4, rotZ * 0.4, centerX, centerY, responsiveScale);

        // Draw connections between nearby floating particles
        for (let j = i + 1; j < particles.length; j++) {
          const pt2 = particles[j];
          const distSq = (pt.x - pt2.x) ** 2 + (pt.y - pt2.y) ** 2 + (pt.z - pt2.z) ** 2;
          if (distSq < 110 * 110) {
            const proj2 = project(pt2, rotX * 0.4, rotY * 0.4, rotZ * 0.4, centerX, centerY, responsiveScale);
            const distRatio = 1 - Math.sqrt(distSq) / 110;
            const lineAlpha = distRatio * (isDark ? 0.25 : 0.15);

            ctx.beginPath();
            ctx.moveTo(proj.x, proj.y);
            ctx.lineTo(proj2.x, proj2.y);
            ctx.strokeStyle =
              pt.color === "red"
                ? isDark ? `rgba(239, 68, 68, ${lineAlpha})` : `rgba(220, 38, 38, ${lineAlpha})`
                : isDark ? `rgba(59, 130, 246, ${lineAlpha})` : `rgba(37, 99, 235, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw particle node
        ctx.beginPath();
        const pRadius = Math.max(0.6, pt.size * proj.scale);
        ctx.arc(proj.x, proj.y, pRadius, 0, Math.PI * 2);
        const nodeAlpha = isDark ? pt.alpha * 0.75 : pt.alpha * 0.55;

        if (pt.color === "red") {
          ctx.fillStyle = isDark ? `rgba(239, 68, 68, ${nodeAlpha})` : `rgba(220, 38, 38, ${nodeAlpha})`;
        } else if (pt.color === "blue") {
          ctx.fillStyle = isDark ? `rgba(59, 130, 246, ${nodeAlpha})` : `rgba(37, 99, 235, ${nodeAlpha})`;
        } else {
          ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${nodeAlpha})` : `rgba(100, 116, 139, ${nodeAlpha})`;
        }
        ctx.fill();
      });

      // 2. Project 3D Outer Web Sphere
      const projectedWeb = webVertices.map((v) =>
        project(v, rotX, rotY, rotZ, centerX, centerY, responsiveScale)
      );

      // Draw Outer Web Edges with depth sorting / alpha
      webEdges.forEach((edge) => {
        const v1 = projectedWeb[edge.p1];
        const v2 = projectedWeb[edge.p2];

        // Depth cueing: strands further back in Z appear fainter
        const avgZ = (v1.z + v2.z) * 0.5;
        const depthFactor = Math.max(0.15, Math.min(1, (avgZ + 200) / 400));

        let strokeStyle = "";
        let lineWidth = 1;

        if (edge.type === "red") {
          const alpha = depthFactor * (isDark ? 0.45 : 0.32);
          strokeStyle = isDark ? `rgba(239, 68, 68, ${alpha})` : `rgba(220, 38, 38, ${alpha})`;
          lineWidth = depthFactor * (isDark ? 1.4 : 1.2);
        } else if (edge.type === "blue") {
          const alpha = depthFactor * (isDark ? 0.5 : 0.35);
          strokeStyle = isDark ? `rgba(59, 130, 246, ${alpha})` : `rgba(37, 99, 235, ${alpha})`;
          lineWidth = depthFactor * (isDark ? 1.5 : 1.3);
        } else {
          const alpha = depthFactor * (isDark ? 0.28 : 0.18);
          strokeStyle = isDark ? `rgba(255, 255, 255, ${alpha})` : `rgba(71, 85, 105, ${alpha})`;
          lineWidth = 0.9;
        }

        ctx.beginPath();
        ctx.moveTo(v1.x, v1.y);
        ctx.lineTo(v2.x, v2.y);
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = Math.max(0.5, lineWidth);
        ctx.stroke();
      });

      // Draw Web Nodes (Glowing junctions)
      projectedWeb.forEach((v, idx) => {
        const depthFactor = Math.max(0.2, Math.min(1, (v.z + 200) / 400));
        ctx.beginPath();
        const r = Math.max(0.8, 1.6 * v.scale * depthFactor);
        ctx.arc(v.x, v.y, r, 0, Math.PI * 2);

        if (idx % 2 === 0) {
          ctx.fillStyle = isDark ? `rgba(239, 68, 68, ${depthFactor * 0.8})` : `rgba(220, 38, 38, ${depthFactor * 0.6})`;
        } else {
          ctx.fillStyle = isDark ? `rgba(59, 130, 246, ${depthFactor * 0.8})` : `rgba(37, 99, 235, ${depthFactor * 0.6})`;
        }
        ctx.fill();
      });

      // 3. Project & Draw Inner 3D Spider-Man Emblem
      // Counter-rotate slightly on Y for mesmerizing dual-axis depth
      const emblemRotY = rotY * 1.3 + Math.PI;
      const emblemRotX = rotX * 1.1;
      const emblemRotZ = rotZ * 1.2;

      const projectedEmblem = emblemVertices.map((v) =>
        project(v, emblemRotX, emblemRotY, emblemRotZ, centerX, centerY, responsiveScale)
      );

      // Draw Emblem Edges
      emblemEdges.forEach((edge) => {
        const v1 = projectedEmblem[edge.p1];
        const v2 = projectedEmblem[edge.p2];

        const avgZ = (v1.z + v2.z) * 0.5;
        const depthFactor = Math.max(0.25, Math.min(1, (avgZ + 150) / 300));

        let strokeStyle = "";
        let lineWidth = 1.6;

        if (edge.type === "red") {
          const alpha = depthFactor * (isDark ? 0.85 : 0.7);
          strokeStyle = isDark ? `rgba(248, 113, 113, ${alpha})` : `rgba(220, 38, 38, ${alpha})`;
          lineWidth = depthFactor * (isDark ? 2.2 : 1.8);
        } else if (edge.type === "blue") {
          const alpha = depthFactor * (isDark ? 0.85 : 0.7);
          strokeStyle = isDark ? `rgba(96, 165, 250, ${alpha})` : `rgba(37, 99, 235, ${alpha})`;
          lineWidth = depthFactor * (isDark ? 2.2 : 1.8);
        } else {
          const alpha = depthFactor * (isDark ? 0.6 : 0.4);
          strokeStyle = isDark ? `rgba(255, 255, 255, ${alpha})` : `rgba(15, 23, 42, ${alpha})`;
          lineWidth = 1.2;
        }

        ctx.beginPath();
        ctx.moveTo(v1.x, v1.y);
        ctx.lineTo(v2.x, v2.y);
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = Math.max(0.7, lineWidth);
        ctx.lineCap = "round";
        ctx.stroke();
      });

      // Draw Inner Emblem Core Nodes (Shining suit points)
      projectedEmblem.forEach((v, idx) => {
        const depthFactor = Math.max(0.3, Math.min(1, (v.z + 150) / 300));
        ctx.beginPath();
        const r = Math.max(1, 2.2 * v.scale * depthFactor);
        ctx.arc(v.x, v.y, r, 0, Math.PI * 2);

        if (idx === 0 || idx === 11) {
          // Head / Tail crest
          ctx.fillStyle = isDark ? "#ffffff" : "#dc2626";
        } else if (idx % 2 === 0) {
          ctx.fillStyle = isDark ? "#f87171" : "#dc2626";
        } else {
          ctx.fillStyle = isDark ? "#60a5fa" : "#2563eb";
        }
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full select-none opacity-85 transition-opacity duration-700"
    />
  );
}
