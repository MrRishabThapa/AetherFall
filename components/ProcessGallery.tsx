"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { X, Play } from "lucide-react";

export type ProcessItem = {
  type: "image" | "video";
  src: string;          // "/process/xx.jpg" OR "/process/xx.mp4"
  poster?: string;      // for video previews (recommended)
  title?: string;
  note?: string;
};

function PreviewMedia({ item }: { item: ProcessItem }) {
  if (item.type === "image") {
    return (
      <Image
        src={item.src}
        alt={item.title ?? "Process image"}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, 33vw"
      />
    );
  }

  // Video preview: use poster if available
  if (item.poster) {
    return (
      <>
        <Image
          src={item.poster}
          alt={item.title ?? "Process video"}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
        <div className="absolute inset-0 grid place-items-center">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-black/65 border border-white/15">
            <Play className="h-4 w-4 text-white/90" />
          </div>
        </div>
      </>
    );
  }

  // Fallback if no poster (still works, but heavier)
  return (
    <>
      <video className="h-full w-full object-cover" muted playsInline preload="metadata">
        <source src={item.src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-black/65 border border-white/15">
          <Play className="h-4 w-4 text-white/90" />
        </div>
      </div>
    </>
  );
}

function ModalMedia({ item }: { item: ProcessItem }) {
  if (item.type === "image") {
    return (
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={item.src}
          alt={item.title ?? "Process image"}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 50vw, 33vw"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/10] w-full bg-black">
      <video className="h-full w-full object-cover" controls playsInline preload="metadata">
        <source src={item.src} type="video/mp4" />
      </video>
    </div>
  );
}

export function ProcessGallery({ items, previewCount = 3 }: { items: ProcessItem[]; previewCount?: number }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const preview = useMemo(
    () => items.slice(0, Math.min(previewCount, items.length)),
    [items, previewCount]
  );

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="mt-5">
      {/* Preview: exactly 3 items, no horizontal scroll */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {preview.map((it, idx) => (
          <div key={it.src + idx} className="lift lift-glow overflow-hidden rounded-xl border border-stroke bg-black/20">
            <div className="relative aspect-[16/10] w-full">
              <PreviewMedia item={it} />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
              {it.title ? (
                <div className="absolute bottom-2 left-2 right-2 text-[11px] text-white/85">{it.title}</div>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="text-xs text-white/55">
          Showing {preview.length} of {items.length} development media.
        </div>

        <button
          onClick={() => setOpen(true)}
          className="lift lift-glow rounded-xl border border-stroke bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 hover:bg-white/10 transition"
        >
          See more
        </button>
      </div>

      {/* Solid fullscreen overlay on top (portal) */}
      {mounted && open
        ? createPortal(
            <div className="fixed inset-0 z-[9999]">
              <div className="absolute inset-0 bg-black" onClick={() => setOpen(false)} />

              <div className="relative mx-auto mt-20 w-[min(1100px,92vw)]">
                <div className="overflow-hidden rounded-2xl border border-stroke bg-[#050407] shadow-[0_20px_80px_rgba(0,0,0,0.85)]">
                  <div className="flex items-start justify-between gap-4 border-b border-stroke px-4 py-3">
                    <div>
                      <div className="text-sm font-semibold text-white">Process / Development Journey</div>
                      <div className="text-xs text-white/55">
                        Mixed media proof: screenshots + prototype videos.
                      </div>
                    </div>

                    <button
                      onClick={() => setOpen(false)}
                      className="lift rounded-xl border border-stroke bg-white/5 p-2 text-white/70 hover:bg-white/10 hover:text-white transition"
                      aria-label="Close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="max-h-[72vh] overflow-y-auto p-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {items.map((it, idx) => (
                        <div key={it.src + idx} className="lift lift-glow overflow-hidden rounded-xl border border-stroke bg-black/20">
                          <ModalMedia item={it} />
                          {(it.title || it.note) ? (
                            <div className="p-3">
                              {it.title ? <div className="text-sm font-semibold text-white/85">{it.title}</div> : null}
                              {it.note ? <div className="mt-1 text-xs text-white/55 leading-relaxed">{it.note}</div> : null}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}