"use client";

import { useEffect, useRef } from "react";

export function HeroVideo({
  src = "/assets/kai.mp4",
  playbackRate = 0.5,
  className = "",
}: {
  src?: string;
  playbackRate?: number;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.playbackRate = playbackRate;
  }, [playbackRate]);

  return (
    <video
      ref={ref}
      className={className}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}