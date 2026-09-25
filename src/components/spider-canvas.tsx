"use client";

import React, { useEffect, useRef } from "react";

interface LegState {
  currentX: number;
  currentY: number;
  stepStartX: number;
  stepStartY: number;
  stepTargetX: number;
  stepTargetY: number;
  progress: number;
  stepDuration: number;
  isStepping: boolean;
  angleOffset: number;
  reach: number;
  baseOffsetX: number;
  baseOffsetY: number;
  group: number; // 0 or 1 for alternating tripod-like gait
  side: number;  // -1 left, 1 right
  length1: number;
  length2: number;
}

export function SpiderCanvas() {
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
      if (Math.abs(window.innerWidth - width) < 20 && Math.abs(window.innerHeight - height) < 100) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Spider state
    let x = width * 0.5;
    let y = 100;
    let angle = Math.PI / 2;
    let targetAngle = angle;
    let speed = 0;
    const maxSpeed = 3.2;

    // Mouse / Cursor tracking
    let mouseX = x;
    let mouseY = y;
    let isMouseOnScreen = false;
    let lastMouseMoveTime = 0;

    // Roaming / Wandering state
    let wanderTargetX = width * Math.random();
    let wanderTargetY = height * Math.random();
    let wanderPauseTimer = 0;

    // Silk thread trail
    const trail: { x: number; y: number; opacity: number }[] = [];
    let trailTimer = 0;

    // Eye glow pulse
    let eyePulse = 0;

    // Initialize 8 legs (4 on left, 4 on right) with compact miniature scaling
    const SPIDER_SCALE = 0.58;

    const legConfigs = [
      // Left side: side = -1, group alternates
      { angleOffset: -0.55, reach: 36 * SPIDER_SCALE, baseOffsetX: 4 * SPIDER_SCALE, baseOffsetY: -6 * SPIDER_SCALE, group: 0, side: -1, l1: 17 * SPIDER_SCALE, l2: 21 * SPIDER_SCALE },
      { angleOffset: -1.15, reach: 33 * SPIDER_SCALE, baseOffsetX: 1 * SPIDER_SCALE, baseOffsetY: -7 * SPIDER_SCALE, group: 1, side: -1, l1: 16 * SPIDER_SCALE, l2: 19 * SPIDER_SCALE },
      { angleOffset: -1.95, reach: 34 * SPIDER_SCALE, baseOffsetX: -3 * SPIDER_SCALE, baseOffsetY: -7 * SPIDER_SCALE, group: 0, side: -1, l1: 17 * SPIDER_SCALE, l2: 20 * SPIDER_SCALE },
      { angleOffset: -2.55, reach: 40 * SPIDER_SCALE, baseOffsetX: -6 * SPIDER_SCALE, baseOffsetY: -6 * SPIDER_SCALE, group: 1, side: -1, l1: 19 * SPIDER_SCALE, l2: 23 * SPIDER_SCALE },
      // Right side: side = 1
      { angleOffset: 0.55, reach: 36 * SPIDER_SCALE, baseOffsetX: 4 * SPIDER_SCALE, baseOffsetY: 6 * SPIDER_SCALE, group: 1, side: 1, l1: 17 * SPIDER_SCALE, l2: 21 * SPIDER_SCALE },
      { angleOffset: 1.15, reach: 33 * SPIDER_SCALE, baseOffsetX: 1 * SPIDER_SCALE, baseOffsetY: 7 * SPIDER_SCALE, group: 0, side: 1, l1: 16 * SPIDER_SCALE, l2: 19 * SPIDER_SCALE },
      { angleOffset: 1.95, reach: 34 * SPIDER_SCALE, baseOffsetX: -3 * SPIDER_SCALE, baseOffsetY: 7 * SPIDER_SCALE, group: 1, side: 1, l1: 17 * SPIDER_SCALE, l2: 20 * SPIDER_SCALE },
      { angleOffset: 2.55, reach: 40 * SPIDER_SCALE, baseOffsetX: -6 * SPIDER_SCALE, baseOffsetY: 6 * SPIDER_SCALE, group: 0, side: 1, l1: 19 * SPIDER_SCALE, l2: 23 * SPIDER_SCALE },
    ];

    const legs: LegState[] = legConfigs.map((cfg) => {
      const idealX = x + Math.cos(angle + cfg.angleOffset) * cfg.reach;
      const idealY = y + Math.sin(angle + cfg.angleOffset) * cfg.reach;
      return {
        currentX: idealX,
        currentY: idealY,
        stepStartX: idealX,
        stepStartY: idealY,
        stepTargetX: idealX,
        stepTargetY: idealY,
        progress: 1,
        stepDuration: 8,
        isStepping: false,
        angleOffset: cfg.angleOffset,
        reach: cfg.reach,
        baseOffsetX: cfg.baseOffsetX,
        baseOffsetY: cfg.baseOffsetY,
        group: cfg.group,
        side: cfg.side,
        length1: cfg.l1,
        length2: cfg.l2,
      };
    });

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      mouseX = clientX;
      mouseY = clientY;
      isMouseOnScreen = true;
      lastMouseMoveTime = Date.now();
    };

    const onPointerLeave = () => {
      isMouseOnScreen = false;
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("touchstart", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("mouseleave", onPointerLeave);

    // Main animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");
      const now = Date.now();
      const mouseActive = isMouseOnScreen && now - lastMouseMoveTime < 4500;

      // Determine target position
      let targetX = mouseX;
      let targetY = mouseY;
      let stopDistance = 22;

      if (!mouseActive) {
        stopDistance = 28;
        if (wanderPauseTimer > 0) {
          wanderPauseTimer--;
          targetX = x;
          targetY = y;
        } else {
          const distToWander = Math.hypot(wanderTargetX - x, wanderTargetY - y);
          if (distToWander < 50) {
            // Pick new random point within screen bounds with 60px padding
            wanderTargetX = 60 + Math.random() * (width - 120);
            wanderTargetY = 60 + Math.random() * (height - 120);
            wanderPauseTimer = 40 + Math.floor(Math.random() * 80); // Pause briefly
          }
          targetX = wanderTargetX;
          targetY = wanderTargetY;
        }
      }

      // Move body towards target
      const dx = targetX - x;
      const dy = targetY - y;
      const dist = Math.hypot(dx, dy);

      if (dist > stopDistance) {
        targetAngle = Math.atan2(dy, dx);
        speed = Math.min(maxSpeed, speed + 0.15);
      } else {
        speed = Math.max(0, speed - 0.2);
        // Curious jitter when close to cursor
        if (mouseActive && dist < stopDistance + 10) {
          targetAngle += Math.sin(now * 0.005) * 0.02;
        }
      }

      // Normalize angle difference for shortest turn
      let angleDiff = targetAngle - angle;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      angle += angleDiff * 0.12;

      // Update position
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      x += vx;
      y += vy;

      // Keep within bounds
      x = Math.max(25, Math.min(width - 25, x));
      y = Math.max(25, Math.min(height - 25, y));

      // Add silk thread point occasionally
      trailTimer++;
      if (trailTimer % 4 === 0 && speed > 0.5) {
        const rearX = x - Math.cos(angle) * (12 * SPIDER_SCALE);
        const rearY = y - Math.sin(angle) * (12 * SPIDER_SCALE);
        trail.push({ x: rearX, y: rearY, opacity: 0.35 });
        if (trail.length > 40) trail.shift();
      }

      // Update and draw silk thread
      if (trail.length > 1) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);
        for (let i = 1; i < trail.length; i++) {
          ctx.lineTo(trail[i].x, trail[i].y);
        }
        const rearX = x - Math.cos(angle) * (12 * SPIDER_SCALE);
        const rearY = y - Math.sin(angle) * (12 * SPIDER_SCALE);
        ctx.lineTo(rearX, rearY);

        ctx.strokeStyle = isDark
          ? "rgba(255, 255, 255, 0.28)"
          : "rgba(37, 99, 235, 0.22)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();

        // Fade trail
        for (let i = trail.length - 1; i >= 0; i--) {
          trail[i].opacity -= 0.004;
          if (trail[i].opacity <= 0) {
            trail.splice(i, 1);
          }
        }
      }

      // Update legs with procedural stepping & alternating tripod gait
      const activeGroup = Math.floor(now / 110) % 2;

      legs.forEach((leg) => {
        // Ideal foot landing point
        const leadFactor = speed > 0 ? 5 : 0;
        const idealX = x + Math.cos(angle + leg.angleOffset) * leg.reach + vx * leadFactor;
        const idealY = y + Math.sin(angle + leg.angleOffset) * leg.reach + vy * leadFactor;

        const footDist = Math.hypot(idealX - leg.currentX, idealY - leg.currentY);

        // Check if leg should step
        if (!leg.isStepping && footDist > (16 * SPIDER_SCALE) && leg.group === activeGroup) {
          leg.isStepping = true;
          leg.stepStartX = leg.currentX;
          leg.stepStartY = leg.currentY;
          leg.stepTargetX = idealX;
          leg.stepTargetY = idealY;
          leg.progress = 0;
        }

        // Advance step
        if (leg.isStepping) {
          leg.progress += 1 / leg.stepDuration;
          if (leg.progress >= 1) {
            leg.progress = 1;
            leg.isStepping = false;
            leg.currentX = leg.stepTargetX;
            leg.currentY = leg.stepTargetY;
          } else {
            const t = leg.progress;
            const ease = 0.5 - 0.5 * Math.cos(t * Math.PI);
            leg.currentX = leg.stepStartX + (leg.stepTargetX - leg.stepStartX) * ease;
            leg.currentY = leg.stepStartY + (leg.stepTargetY - leg.stepStartY) * ease;
          }
        }
      });

      // Spider-Man Suit Theme Colors
      const spideyRed = "#dc2626";        // Classic Marvel Spider-Man red
      const spideyDarkRed = "#991b1b";    // Deep red shade for claws/joints
      const spideyBlue = "#2563eb";       // Royal Spider-Man blue

      ctx.save();

      // Draw 8 legs (Blue upper thighs + Red lower legs like Spidey suit)
      legs.forEach((leg) => {
        // Base attachment on thorax
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        const baseX = x + cosA * leg.baseOffsetX - sinA * leg.baseOffsetY;
        const baseY = y + sinA * leg.baseOffsetX + cosA * leg.baseOffsetY;

        const footX = leg.currentX;
        const footY = leg.currentY;

        // 2-segment Inverse Kinematics for knee
        const d = Math.max(1, Math.min(leg.length1 + leg.length2 - 0.5, Math.hypot(footX - baseX, footY - baseY)));
        const l1 = leg.length1;
        const l2 = leg.length2;

        // Law of cosines for knee angle
        const cosAngleKnee = Math.max(-1, Math.min(1, (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d)));
        const angleKnee = Math.acos(cosAngleKnee);
        const baseToFootAngle = Math.atan2(footY - baseY, footX - baseX);

        // Knee bends outwards
        const kneeDir = baseToFootAngle + leg.side * angleKnee;
        const kneeX = baseX + Math.cos(kneeDir) * l1;
        const kneeY = baseY + Math.sin(kneeDir) * l1;

        // Leg lift curve during stepping
        let liftY = 0;
        if (leg.isStepping) {
          liftY = Math.sin(leg.progress * Math.PI) * 2.5;
        }

        // Upper Leg Segment: Spider-Man Royal Blue
        ctx.beginPath();
        ctx.moveTo(baseX, baseY);
        ctx.lineTo(kneeX, kneeY - liftY);
        ctx.strokeStyle = spideyBlue;
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        ctx.stroke();

        // Lower Leg Segment: Spider-Man Vibrant Red
        ctx.beginPath();
        ctx.moveTo(kneeX, kneeY - liftY);
        ctx.lineTo(footX, footY);
        ctx.strokeStyle = spideyRed;
        ctx.lineWidth = 1.1;
        ctx.lineCap = "round";
        ctx.stroke();

        // Knee joint accent ring (Black webbing suit joint)
        ctx.beginPath();
        ctx.arc(kneeX, kneeY - liftY, 1.1, 0, Math.PI * 2);
        ctx.fillStyle = "#09090b";
        ctx.fill();

        // Foot claw tip (Dark red)
        ctx.beginPath();
        ctx.arc(footX, footY, 0.8, 0, Math.PI * 2);
        ctx.fillStyle = spideyDarkRed;
        ctx.fill();
      });

      // Draw Spider-Man Body (Cephalothorax + Abdomen)
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(SPIDER_SCALE, SPIDER_SCALE);

      // Abdomen (rear body) - Classic Royal Blue base
      ctx.beginPath();
      ctx.ellipse(-12, 0, 11.5, 9, 0, 0, Math.PI * 2);
      ctx.fillStyle = spideyBlue;
      ctx.fill();

      // Red Center Stripe / Back Emblem Patch
      ctx.beginPath();
      ctx.ellipse(-11.5, 0, 8.5, 4.8, 0, 0, Math.PI * 2);
      ctx.fillStyle = spideyRed;
      ctx.fill();

      // Black Spider Icon / Web Emblem in the center
      ctx.beginPath();
      ctx.arc(-11.5, 0, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#09090b";
      ctx.fill();

      // Webbing lines on abdomen
      ctx.beginPath();
      ctx.moveTo(-18, 0);
      ctx.lineTo(-4, 0);
      ctx.moveTo(-11.5, -4);
      ctx.lineTo(-11.5, 4);
      ctx.strokeStyle = "rgba(15, 23, 42, 0.45)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Cephalothorax (head/front torso) - Vibrant Spider-Man Red
      ctx.beginPath();
      ctx.ellipse(2, 0, 8.5, 7, 0, 0, Math.PI * 2);
      ctx.fillStyle = spideyRed;
      ctx.fill();

      // Subtle mask webbing lines on head
      ctx.beginPath();
      ctx.moveTo(-3, 0);
      ctx.lineTo(8.5, 0);
      ctx.strokeStyle = "rgba(15, 23, 42, 0.4)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Pedipalps (front feelers) - Red & Blue
      const feelerTwitch = speed > 0 ? Math.sin(now * 0.02) * 1.5 : Math.sin(now * 0.005) * 0.8;
      ctx.beginPath();
      ctx.moveTo(7, -2.2);
      ctx.lineTo(12, -4 + feelerTwitch);
      ctx.moveTo(7, 2.2);
      ctx.lineTo(12, 4 - feelerTwitch);
      ctx.strokeStyle = spideyBlue;
      ctx.lineWidth = 1.6;
      ctx.lineCap = "round";
      ctx.stroke();

      // Iconic Spider-Man Mask Eye Lenses (Angled White Lenses with Black Outline)
      // Left eye lens
      ctx.save();
      ctx.translate(6.5, -2.8);
      ctx.rotate(-0.35);
      // Black outer border
      ctx.beginPath();
      ctx.ellipse(0, 0, 2.8, 1.6, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#09090b";
      ctx.fill();
      // White inner mask lens
      ctx.beginPath();
      ctx.ellipse(0.1, 0, 2.1, 1.0, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#60a5fa";
      ctx.shadowBlur = isDark ? 6 : 2;
      ctx.fill();
      ctx.restore();

      // Right eye lens
      ctx.save();
      ctx.translate(6.5, 2.8);
      ctx.rotate(0.35);
      // Black outer border
      ctx.beginPath();
      ctx.ellipse(0, 0, 2.8, 1.6, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#09090b";
      ctx.fill();
      // White inner mask lens
      ctx.beginPath();
      ctx.ellipse(0.1, 0, 2.1, 1.0, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#60a5fa";
      ctx.shadowBlur = isDark ? 6 : 2;
      ctx.fill();
      ctx.restore();

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("touchstart", onPointerMove);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("mouseleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 h-full w-full select-none block"
    />
  );
}
