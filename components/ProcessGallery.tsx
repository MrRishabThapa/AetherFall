"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { AutoPlayOnViewVideo } from "@/components/AutoPlayOnViewVideo";

export type ProcessItem = {
  type: "image" | "video";
  src: string; // "/process/xx.jpg" OR "/process/xx.mp4"
  poster?: string; // recommended for video first frame
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

  // IMPORTANT: render an actual video so it can autoplay on scroll
  return (
    <AutoPlayOnViewVideo
      src={item.src}
      poster={item.poster}
      className="h-full w-full object-cover"
      controls={false}
      threshold={0.35}
    />
  );
}

function ModalMedia({
  item,
  modalRoot,
}: {
  item: ProcessItem;
  modalRoot: HTMLElement | null;
}) {
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

  // Modal videos: autoplay/pause based on visibility INSIDE the modal scroll container
  return (
    <div className="relative aspect-[16/10] w-full bg-black">
      <AutoPlayOnViewVideo
        src={item.src}
        poster={item.poster}
        root={modalRoot}
        className="h-full w-full object-cover"
        controls={true}
        threshold={0.35}
      />
    </div>
  );
}

export function ProcessGallery({
  items,
  previewCount = 3,
}: {
  items: ProcessItem[];
  previewCount?: number;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // This is the scroll container inside the modal
  const modalScrollRef = useRef<HTMLDivElement>(null);

  const preview = useMemo(
    () => items.slice(0, Math.min(previewCount, items.length)),
    [items, previewCount]
  );

  useEffect(() => setMounted(true), []);

  // ESC to close + lock body scroll when open
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
          <div
            key={it.src + idx}
            className="lift lift-glow overflow-hidden rounded-xl border border-stroke bg-black/20"
          >
            <div className="relative aspect-[16/10] w-full">
              <PreviewMedia item={it} />

              {/* dark fade for text */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

              {/* small VIDEO badge */}
              {it.type === "video" ? (
                <div className="absolute left-2 top-2 rounded-full border border-white/15 bg-black/55 px-2 py-1 text-[10px] text-white/80">
                  VIDEO
                </div>
              ) : null}

              {it.title ? (
                <div className="absolute bottom-2 left-2 right-2 text-[11px] text-white/85">
                  {it.title}
                </div>
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
              {/* solid backdrop */}
              <div
                className="absolute inset-0 bg-black"
                onClick={() => setOpen(false)}
              />

              {/* modal panel (stop clicks from closing when interacting) */}
              <div
                className="relative mx-auto mt-20 w-[min(1100px,92vw)]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="overflow-hidden rounded-2xl border border-stroke bg-[#050407] shadow-[0_20px_80px_rgba(0,0,0,0.85)]">
                  <div className="flex items-start justify-between gap-4 border-b border-stroke px-4 py-3">
                    <div>
                      <div className="text-sm font-semibold text-white">
                        Process / Development Journey
                      </div>
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

                  {/* This is the modal scroll container (important for autoplay-on-scroll inside modal) */}
                  <div
                    ref={modalScrollRef}
                    className="max-h-[72vh] overflow-y-auto p-4"
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {items.map((it, idx) => (
                        <div
                          key={it.src + idx}
                          className="lift lift-glow overflow-hidden rounded-xl border border-stroke bg-black/20"
                        >
                          <ModalMedia item={it} modalRoot={modalScrollRef.current} />

                          {(it.title || it.note) ? (
                            <div className="p-3">
                              {it.title ? (
                                <div className="text-sm font-semibold text-white/85">
                                  {it.title}
                                </div>
                              ) : null}
                              {it.note ? (
                                <div className="mt-1 text-xs text-white/55 leading-relaxed">
                                  {it.note}
                                </div>
                              ) : null}
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