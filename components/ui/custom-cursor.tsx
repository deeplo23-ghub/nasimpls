"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "text">("default");
  const [rippleFrame, setRippleFrame] = useState(-1);
  const [burstColor, setBurstColor] = useState("#F2AE30");
  const [burstLines, setBurstLines] = useState<{ angle: number; lenMul: number; sw: number; wobble: number }[]>([]);
  const clickCountRef = useRef(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Primary + Tertiary palette cycle
  const burstColors = ["#F20505", "#155C28", "#F2AE30", "#2805F2", "#F26905"];

  const generateBurstLines = () => {
    const count = 6 + Math.floor(Math.random() * 4); // 6-9 lines
    return Array.from({ length: count }, (_, i) => ({
      angle: (360 / count) * i + (Math.random() - 0.5) * 30,
      lenMul: 0.6 + Math.random() * 0.8,
      sw: 2 + Math.random() * 2.5,
      wobble: (Math.random() - 0.5) * 10,
    }));
  };

  const springConfig = { damping: 30, stiffness: 450, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

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
      const target = e.target as HTMLElement;
      if (!target) return;
      if (target.closest('a') || target.closest('button')) return;

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

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
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
      }}
    >
      <motion.svg 
        width="32" height="32" viewBox="0 0 32 32" fill="none" 
        className="overflow-visible drop-shadow-[2px_4px_8px_rgba(0,0,0,0.4)]"
        animate={{ 
          rotate: cursorType === "pointer" ? 30 : 0,
          scale: cursorType === "pointer" ? 1.15 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ transformOrigin: "0 0" }}
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
              animate={{ fill: rippleFrame >= 0 ? burstColor : cursorType === "pointer" ? "#F26905" : "#F2F2F2" }}
              transition={{ duration: 0.2 }}
              stroke="none"
            />
          </g>
        )}
      </motion.svg>
    </motion.div>
  );
}
