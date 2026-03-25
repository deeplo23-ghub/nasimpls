"use client";

import { motion, useMotionValue, useSpring, useVelocity, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "text">("default");
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [rippleFrame, setRippleFrame] = useState(-1);
  const [burstColor, setBurstColor] = useState("#F2AE30");
  const [burstLines, setBurstLines] = useState<{ angle: number; lenMul: number; sw: number; wobble: number }[]>([]);
  const clickCountRef = useRef(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Drag lag physics
  const velX = useVelocity(mouseX);
  
  // Subtle rotation based on horizontal velocity to simulate drag
  // Tip is anchored at 0,0, tail lags behind
  const rotation = useTransform(velX, [-1500, 1500], [20, -20]);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const smoothRotation = useSpring(rotation, { damping: 30, stiffness: 200 });
  const pointerOffset = useSpring(0, { damping: 30, stiffness: 200 });
  
  // Combine physics lag with the pointer-mode rotation offset
  const cursorRotation = useTransform(
    [smoothRotation, pointerOffset],
    ([rot, off]) => (rot as number) + (off as number)
  );

  // Primary + Tertiary palette cycle
  const burstColors = ["#F2AE30", "#F26905"];

  const generateBurstLines = () => {
    const count = 6 + Math.floor(Math.random() * 4); // 6-9 lines
    return Array.from({ length: count }, (_, i) => ({
      angle: (360 / count) * i + (Math.random() - 0.5) * 30,
      lenMul: 0.6 + Math.random() * 0.8,
      sw: 2 + Math.random() * 2.5,
      wobble: (Math.random() - 0.5) * 10,
    }));
  };

  useEffect(() => {
    pointerOffset.set(cursorType === "pointer" ? 30 : 0);
  }, [cursorType, pointerOffset]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!hasMoved) {
        setTimeout(() => setHasMoved(true), 80);
      }

      const target = e.target as HTMLElement;
      if (!target) return;

      const cursor = window.getComputedStyle(target).cursor;
      if (cursor === "pointer" || target.closest('a') || target.closest('button')) {
        setCursorType("pointer");
      } else if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || cursor === "text") {
        setCursorType("text");
      } else {
        setCursorType("default");
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsMouseDown(true);
      const target = e.target as HTMLElement;
      if (!target) return;

      const cursor = window.getComputedStyle(target).cursor;
      if (cursor === "pointer" || target.closest('a') || target.closest('button')) {
        setCursorType("pointer");
      }

      // Cycle color + randomize lines on each click
      setBurstColor(burstColors[clickCountRef.current % burstColors.length]);
      setBurstLines(generateBurstLines());
      clickCountRef.current++;

      // Low-FPS ripple: 6 stepped frames
      const frames = [0, 1, 2, 3, 4, -1];
      frames.forEach((frame, i) => {
        setTimeout(() => setRippleFrame(frame), i * 70);
      });
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY]);

  // Stepped ripple sizes (radius) and opacity for each frame
  const rippleSizes = [4, 10, 18, 28, 40];
  const rippleOpacities = [0.8, 0.6, 0.4, 0.2, 0.1];

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[99999] hidden lg:block"
      style={{
        x: smoothX,
        y: smoothY,
        rotate: cursorRotation,
        transformOrigin: "0% 0%",
      }}
      animate={{ 
        opacity: hasMoved ? 1 : 0 
      }}
      transition={{ 
        opacity: { duration: 1.2, ease: "easeOut" } 
      }}
    >
      <motion.svg 
        width="32" height="32" viewBox="0 0 32 32" fill="none" 
        className="overflow-visible drop-shadow-[2px_4px_8px_rgba(0,0,0,0.4)]"
        animate={{ 
          scale: isMouseDown ? 0.9 : (cursorType === "pointer" ? 1.15 : 1),
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Cartoony Hand-Drawn Burst Lines at the tip (0,0) */}
        {rippleFrame >= 0 && burstLines.length > 0 && (
          <g>
            {burstLines.map((l, i) => {
              const rad = l.angle * Math.PI / 180;
              const perpRad = rad + Math.PI / 2;
              const innerR = rippleSizes[rippleFrame] * 0.35;
              const outerR = rippleSizes[rippleFrame] * l.lenMul;
              const midR = (innerR + outerR) / 2;
              const x1 = Math.cos(rad) * innerR;
              const y1 = Math.sin(rad) * innerR;
              const x2 = Math.cos(rad) * outerR;
              const y2 = Math.sin(rad) * outerR;
              const cx = Math.cos(rad) * midR + Math.cos(perpRad) * l.wobble;
              const cy = Math.sin(rad) * midR + Math.sin(perpRad) * l.wobble;
              return (
                <path
                  key={i}
                  d={`M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`}
                  stroke={burstColor}
                  strokeWidth={l.sw}
                  strokeLinecap="round"
                  fill="none"
                  opacity={rippleOpacities[rippleFrame]}
                />
              );
            })}
          </g>
        )}

        {cursorType === "text" ? (
          <g>
            <path 
              d="M-4 -10 L4 -10 M0 -10 L0 10 M-4 10 L4 10" 
              stroke="#1D261D" 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            <path 
              d="M-4 -10 L4 -10 M0 -10 L0 10 M-4 10 L4 10" 
              stroke="#F2AE30" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </g>
        ) : (
          <g>
            <path 
              d="M0 0 L6 26 L12 16 L24 16 L0 0" 
              stroke="#1D261D" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            <motion.path 
              d="M0 0 L6 26 L12 16 L24 16 L0 0" 
              animate={{ fill: rippleFrame >= 0 ? burstColor : "#F2F2F2" }}
              transition={{ duration: 0.2 }}
              stroke="none"
            />
          </g>
        )}
      </motion.svg>
    </motion.div>
  );
}
