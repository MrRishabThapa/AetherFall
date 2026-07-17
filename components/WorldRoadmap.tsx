"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

type Stop = {
  key: string;
  title: string;
  subtitle: string;
  desc: string;
  img: string;
};

type Pt = { x: number; y: number };
type Seg = { d: string; from: Pt; to: Pt };

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function StopCard({
  stop,
  index,
  setRef,
  onEnter,
}: {
  stop: Stop;
  index: number;
  setRef: (el: HTMLDivElement | null) => void;
  onEnter: () => void;
}) {
  return (
    <div
      ref={setRef}
      onMouseEnter={onEnter}
      className={[
        // NOTE: avoid vertical translate on hover here; it breaks alignment unless you recompute constantly
        "lift-glow transition-shadow duration-200",
        "overflow-hidden rounded-2xl border border-stroke bg-black/20",
        "max-w-[520px] w-full",
        index % 2 === 0 ? "justify-self-start" : "justify-self-end",
      ].join(" ")}
    >
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={stop.img}
          alt={stop.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 520px"
          priority={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[11px] text-white/80">
          {stop.subtitle}
        </div>
      </div>

      <div className="p-4">
        <div className="text-white font-semibold text-lg">{stop.title}</div>
        <div className="mt-1 text-sm text-white/70 leading-relaxed">{stop.desc}</div>
      </div>
    </div>
  );
}

export function WorldRoadmapCurved() {
  const stops: Stop[] = useMemo(
    () => [
      {
        key: "basecamp",
        title: "Basecamp",
        subtitle: "Hub",
        desc: "Quest/cutscene hub and return point before exploring.",
        img: "/world/baseCamp2.jpg",
      },
      {
        key: "forest",
        title: "Forest",
        subtitle: "Biome I",
        desc: "First biome route—mini boss mission progression.",
        img: "/world/forest-final.jpg",
      },
      {
        key: "arctic",
        title: "Artic",
        subtitle: "Biome II",
        desc: "Stronger enemies and higher pressure fights.",
        img: "/world/artic-final.jpg",
      },
      {
        key: "desert",
        title: "Desert",
        subtitle: "Biome III",
        desc: "Fast threats; aggressive patterns and speed.",
        img: "/world/desert-final.png",
      },
      {
        key: "abyss",
        title: "Abyss",
        subtitle: "Final Arena",
        desc: "Single-screen arena for the final boss showdown.",
        img: "/world/dungeon.jpg",
      },
    ],
    []
  );

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState<number>(-1);

  const [size, setSize] = useState({ w: 0, h: 0 });
  const [segments, setSegments] = useState<Seg[]>([]);
  const [nodes, setNodes] = useState<Pt[]>([]);

  const compute = () => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const wr = wrap.getBoundingClientRect();
    const w = Math.round(wr.width);
    const h = Math.round(wr.height);
    setSize({ w, h });

    const pts: Pt[] = cardRefs.current
      .map((el, i) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();

        // Anchor on OUTER edge of each card:
        // left cards connect from right edge, right cards connect from left edge
        const isLeft = i % 2 === 0;
        const x = (isLeft ? r.right : r.left) - wr.left;
        const y = r.top + r.height * 0.52 - wr.top; // slightly below center looks nicer
        const pad = 10;

        return {
          x: clamp(x + (isLeft ? pad : -pad), 0, w),
          y: clamp(y, 0, h),
        } as Pt;
      })
      .filter(Boolean) as Pt[];

    setNodes(pts);

    const segs: Seg[] = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i];
      const b = pts[i + 1];

      const dir = b.x > a.x ? 1 : -1;
      const dx = Math.abs(b.x - a.x);
      const bend = clamp(dx * 0.45, 120, 220); // controls “curviness”

      const c1: Pt = { x: a.x + dir * bend, y: a.y };
      const c2: Pt = { x: b.x - dir * bend, y: b.y };

      const d = `M ${a.x} ${a.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${b.x} ${b.y}`;
      segs.push({ d, from: a, to: b });
    }

    setSegments(segs);
  };

  // compute after first paint to avoid layout mismatch
  useLayoutEffect(() => {
    compute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // recompute on resize + when fonts/images cause reflow
  useEffect(() => {
    const onResize = () => compute();
    window.addEventListener("resize", onResize);

    const ro = new ResizeObserver(() => compute());
    if (wrapRef.current) ro.observe(wrapRef.current);

    // small delayed recompute for late image/font layout shifts
    const t1 = window.setTimeout(compute, 150);
    const t2 = window.setTimeout(compute, 450);

    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={wrapRef}
      onMouseLeave={() => setActive(-1)}
      className="relative mt-6 overflow-hidden rounded-2xl border border-stroke bg-black/10 p-6"
    >
      {/* Road overlay */}
      <svg
        className="pointer-events-none absolute inset-0"
        width={size.w}
        height={size.h}
        viewBox={`0 0 ${size.w} ${size.h}`}
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <filter id="roadGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* base dotted path */}
        {segments.map((s, i) => (
          <path
            key={`dot-${i}`}
            d={s.d}
            fill="none"
            stroke="rgba(255,255,255,0.20)"
            strokeWidth="3"
            strokeDasharray="2 14"
            strokeLinecap="round"
          />
        ))}

        {/* highlighted solid path up to hovered stop */}
        {segments.map((s, i) => {
          const on = active >= i + 1; // highlight segments before the active node
          return (
            <path
              key={`hi-${i}`}
              d={s.d}
              fill="none"
              stroke="rgba(255,122,61,0.95)"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#roadGlow)"
              opacity={on ? 1 : 0}
            />
          );
        })}

        {/* nodes/orbs at anchor points */}
        {nodes.map((p, i) => {
          const isDone = active !== -1 && active >= i;
          const isHot = active === i;
          return (
            <g key={`n-${i}`}>
              <circle
                cx={p.x}
                cy={p.y}
                r={isHot ? 14 : 11}
                fill={isDone ? "rgba(255,122,61,0.18)" : "rgba(255,255,255,0.08)"}
              />
              <circle
                cx={p.x}
                cy={p.y}
                r={isHot ? 6 : 5}
                fill={isDone ? "rgba(244,208,122,0.95)" : "rgba(255,255,255,0.55)"}
              />
            </g>
          );
        })}
      </svg>

      {/* Zigzag cards */}
      <div className="relative grid grid-cols-1 gap-y-10 lg:grid-cols-2 lg:gap-x-16">
        {stops.map((s, i) => (
          <StopCard
            key={s.key}
            stop={s}
            index={i}
            setRef={(el) => {
              cardRefs.current[i] = el;
            }}
            onEnter={() => {
              setActive(i);
              // recompute so the highlighted path always stays perfectly aligned
              requestAnimationFrame(compute);
            }}
          />
        ))}
      </div>
    </div>
  );
}