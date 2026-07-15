"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Ember = {
  left: number;     // %
  size: number;     // px
  delay: number;    // s
  duration: number; // s
  drift: number;    // px
  opacity: number;
};

function generateEmbers(count: number): Ember[] {
  return Array.from({ length: count }).map(() => {
    const left = Math.random() * 100;
    const size = 2 + Math.random() * 4;         // 2–6px
    const delay = Math.random() * 1.2;          // more frequent
    const duration = 3.2 + Math.random() * 3.2; // 3.2–6.4s
    const drift = -18 + Math.random() * 36;     // -18..18px
    const opacity = 0.16 + Math.random() * 0.22;

    return { left, size, delay, duration, drift, opacity };
  });
}

export function Embers({ count = 48 }: { count?: number }) {
  const reduce = useReducedMotion();
  const [embers, setEmbers] = useState<Ember[]>([]);

  // IMPORTANT: only generate on client after hydration
  useEffect(() => {
    if (reduce) return;
    setEmbers(generateEmbers(count));
  }, [count, reduce]);

  if (reduce) return null;

  // Server render => embers=[]
  // First client render => embers=[] (matches server)
  // After mount => embers generated (no hydration mismatch)
  if (embers.length === 0) return null;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {embers.map((e, idx) => (
        <motion.div
          key={idx}
          className="absolute bottom-[-30px] rounded-full"
          style={{
            left: `${e.left}%`,
            width: e.size,
            height: e.size,
            background: "rgba(255, 122, 61, 1)",
            boxShadow:
              "0 0 14px rgba(255,122,61,0.38), 0 0 28px rgba(176,38,46,0.20)",
            opacity: e.opacity,
            mixBlendMode: "screen",
          }}
          animate={{
            y: [-10, -900],
            x: [0, e.drift, -e.drift * 0.5, 0],
            opacity: [e.opacity, e.opacity + 0.1, 0],
          }}
          transition={{
            duration: e.duration,
            delay: e.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}