"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const bgClassToColor: Record<string, string> = {
  "bg-brand-red": "#F20505",
  "bg-brand-yellow": "#F2AE30",
  "bg-brand-green": "#155C28",
  "bg-brand-tan": "#dcc0a5",
  "bg-brand-cream": "#f2f2f2",
};

export function PageEntranceOverlay() {
  const [entranceData, setEntranceData] = useState<{
    bgClass: string;
    bgColor: string;
    label: string;
    isSmall: boolean;
  } | null>(null);
  const [phase, setPhase] = useState<"text" | "shrink" | "done">("text");

  useEffect(() => {
    const raw = sessionStorage.getItem("page-transition");
    if (raw) {
      sessionStorage.removeItem("page-transition");
      const parsed = JSON.parse(raw);
      const bgColor = bgClassToColor[parsed.bg] || "#F2AE30";
      setEntranceData({
        bgClass: parsed.bg,
        bgColor,
        label: parsed.label,
        isSmall: parsed.isSmall,
      });
      setPhase("text");
    }
  }, []);

  if (!entranceData || phase === "done") return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100000]">
      <AnimatePresence>
        {/* The fullscreen colored background that shrinks to center */}
        <motion.div
          className={`fixed inset-0 z-[100000] ${entranceData.bgClass}`}
          initial={{ 
            clipPath: "circle(150% at 50% 50%)" 
          }}
          animate={{ 
            clipPath: phase === "shrink" 
              ? "circle(0% at 50% 50%)" 
              : "circle(150% at 50% 50%)" 
          }}
          transition={{
            duration: 0.8,
            ease: (t: number) => Math.floor(t * 10) / 10,
          }}
          onAnimationComplete={() => {
            if (phase === "shrink") setPhase("done");
          }}
        />

        {/* Dark overlay on top */}
        <motion.div
          className="fixed inset-0 z-[100001] bg-brand-deep-green"
          initial={{ clipPath: "circle(150% at 50% 50%)" }}
          animate={{
            clipPath: phase === "shrink"
              ? "circle(0% at 50% 50%)"
              : "circle(150% at 50% 50%)",
          }}
          transition={{
            duration: 0.7,
            delay: phase === "shrink" ? 0.08 : 0,
            ease: (t: number) => Math.floor(t * 10) / 10,
          }}
        />

        {/* The label text that fades out and scales down */}
        {phase === "text" && (
          <motion.div
            className="fixed inset-0 z-[100002] flex items-center justify-center"
            initial={{ opacity: 1, scale: entranceData.isSmall ? 2.5 : 2 }}
            animate={{ opacity: 0, scale: 1 }}
            transition={{
              opacity: { duration: 0.4, delay: 0.3 },
              scale: { type: "spring", stiffness: 100, damping: 20, mass: 1 },
            }}
            onAnimationComplete={() => setPhase("shrink")}
          >
            <span className={`font-serif font-black text-brand-cream whitespace-nowrap ${entranceData.isSmall ? "text-xl md:text-2xl" : "text-3xl sm:text-5xl"}`}>
              {entranceData.label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
