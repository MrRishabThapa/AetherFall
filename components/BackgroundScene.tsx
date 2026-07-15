"use client";

import { motion, useReducedMotion } from "framer-motion";

export function BackgroundScene() {
  const reduce = useReducedMotion();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-ink">
      {/* Base image (Ken Burns) */}
      <motion.div
        className="absolute inset-0 bg-[url('/hero-medieval.jpg')] bg-cover bg-center"
        animate={
          reduce
            ? {}
            : {
                scale: [1.05, 1.12, 1.06],
                x: ["0%", "-2%", "1%"],
                y: ["0%", "1%", "-1%"],
              }
        }
        transition={
          reduce
            ? {}
            : { duration: 22, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
        }
      />

      {/* Vignette + readable darkness (don’t kill the image) */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_25%,rgba(0,0,0,0.25),rgba(0,0,0,0.78))]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/35 to-ink" />

      {/* Warm medieval “light pools” */}
      <div className="absolute inset-0 opacity-90">
        <div className="absolute -top-24 left-[10%] h-[520px] w-[520px] rounded-full bg-gild/12 blur-[70px]" />
        <div className="absolute top-[18%] right-[8%] h-[420px] w-[420px] rounded-full bg-ember/10 blur-[80px]" />
      </div>

      {/* Moving fog layer */}
      <motion.div
        className="absolute inset-0 opacity-[0.35] mix-blend-screen"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 40%, rgba(255,255,255,0.10), transparent 45%)," +
            "radial-gradient(circle at 80% 30%, rgba(255,255,255,0.07), transparent 50%)," +
            "radial-gradient(circle at 55% 75%, rgba(255,255,255,0.06), transparent 55%)",
          filter: "blur(10px)",
        }}
        animate={reduce ? {} : { x: [0, 40, -20, 0], y: [0, -10, 20, 0] }}
        transition={reduce ? {} : { duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Film grain already in your .noise::before; keep it */}
    </div>
  );
}