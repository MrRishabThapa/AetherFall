"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function ScrollHint() {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 240]);

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden md:block">
      <div className="relative h-16 w-16">
        <motion.div
          style={{ rotate }}
          className="absolute inset-0 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl"
        />
        <motion.div style={{ rotate }} className="absolute inset-0 grid place-items-center">
          <div className="text-[10px] tracking-[0.35em] text-white/70">
            SCROLL • SCROLL •
          </div>
        </motion.div>
        <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-glow" />
      </div>
    </div>
  );
}