"use client";

import { useEffect, useRef, useState } from "react";

export function AutoPlayOnViewVideo({
  src,
  poster,
  className,
  root,
  controls = false,
  threshold = 0.35,
}: {
  src: string;
  poster?: string;
  className?: string;
  root?: HTMLElement | null; // pass modal scroll container here
  controls?: boolean;
  threshold?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Required for autoplay on most browsers
    el.muted = true;
    el.playsInline = true;

    const io = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          try {
            await el.play();
            setBlocked(false);
          } catch {
            // autoplay blocked (rare if muted, but possible)
            setBlocked(true);
          }
        } else {
          el.pause();
        }
      },
      { root: root ?? null, threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [root, threshold]);

  return (
    <div className="relative h-full w-full">
      <video
        ref={ref}
        className={className}
        loop
        muted
        playsInline
        preload="metadata"
        poster={poster}
        controls={controls}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* fallback if autoplay is blocked */}
      {blocked ? (
        <button
          onClick={() => ref.current?.play()}
          className="absolute inset-0 grid place-items-center bg-black/35 text-white/90 text-xs"
        >
          Click to play
        </button>
      ) : null}
    </div>
  );
}