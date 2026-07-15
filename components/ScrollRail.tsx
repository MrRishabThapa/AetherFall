"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function ScrollRail() {
  const { scrollYProgress } = useScroll();

  const rail = 420;
  const orb = 18; // orb diameter
  const y = useTransform(scrollYProgress, [0, 1], [0, rail - orb]);

  return (
    <div className="fixed left-6 top-1/2 z-40 hidden lg:block -translate-y-1/2">
      <div className="relative h-[420px] w-10">
        {/* rail */}
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10" />

        {/* progress glow on the line */}
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 origin-top bg-gradient-to-b from-gild/80 via-gild/40 to-ember/60"
        />

        {/* orb */}
        <motion.div style={{ y }} className="absolute left-1/2 top-0 -translate-x-1/2">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            {/* outer bloom */}
            <div className="absolute inset-0 -m-5 rounded-full bg-gild/20 blur-xl" />
            <div className="absolute inset-0 -m-3 rounded-full bg-ember/15 blur-lg" />

            {/* core orb */}
            <div className="h-[18px] w-[18px] rounded-full bg-gradient-to-br from-gild via-white/80 to-ember shadow-gild" />

            {/* tiny highlight */}
            <div className="absolute left-[4px] top-[4px] h-2 w-2 rounded-full bg-white/80 blur-[0.5px]" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}