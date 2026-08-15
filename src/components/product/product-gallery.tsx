"use client";

import { useState } from "react";
import { type TextileTone } from "@/components/editorial/textile-study";
import { ProductVisual } from "@/components/editorial/product-visual";
import { ProductViewer3D } from "@/components/product/product-viewer-3d";
import { Dialog } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Product, ProductImage } from "@/lib/types";

type MediaItem = { type: "image"; image: ProductImage } | { type: "video"; src: string; alt: string };

function buildMedia(product: Product): MediaItem[] {
  const images: MediaItem[] = product.images.map((image) => ({ type: "image", image }));
  const videos: MediaItem[] = (product.videos ?? []).map((src) => ({
    type: "video",
    src,
    alt: `${product.name} — video`,
  }));
  return [...images, ...videos];
}

function NavArrow({
  direction,
  onClick,
  label,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={label}
      className={cn(
        "absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-alabaster/80 text-ink shadow-sm active:scale-95 sm:h-10 sm:w-10",
        direction === "prev" ? "left-2" : "right-2"
      )}
    >
      <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
        <path
          d={direction === "prev" ? "M7 1 1 7l6 6" : "M1 1l6 6-6 6"}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export function ProductGallery({ product, colorHex, tone }: { product: Product; colorHex: string; tone: TextileTone }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mode, setMode] = useState<"images" | "3d">("images");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const media = buildMedia(product);
  const active = media[activeIndex] ?? media[0];
  const showArrows = media.length > 1;
  const goPrev = () => setActiveIndex((i) => (i - 1 + media.length) % media.length);
  const goNext = () => setActiveIndex((i) => (i + 1) % media.length);

  return (
    <div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("images")}
          aria-pressed={mode === "images"}
          className={cn("text-label uppercase tracking-[0.14em]", mode === "images" ? "text-ink" : "text-stone")}
        >
          Images
        </button>
        <span className="text-stone">/</span>
        <button
          type="button"
          onClick={() => setMode("3d")}
          aria-pressed={mode === "3d"}
          className={cn("text-label uppercase tracking-[0.14em]", mode === "3d" ? "text-ink" : "text-stone")}
        >
          3D View
        </button>
      </div>

      {mode === "images" ? (
        <>
          {active?.type === "video" ? (
            <div className="relative mt-4 aspect-[3/4] w-full overflow-hidden bg-ink">
              <video
                key={active.src}
                controls
                playsInline
                className="h-full w-full object-cover"
                src={active.src}
                aria-label={active.alt}
              />
              {showArrows && (
                <>
                  <NavArrow direction="prev" onClick={goPrev} label="Show previous media" />
                  <NavArrow direction="next" onClick={goNext} label="Show next media" />
                </>
              )}
            </div>
          ) : (
            <div className="relative mt-4">
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="block w-full cursor-zoom-in"
                aria-label={`View ${active?.image.alt ?? product.name} in full screen`}
              >
                <ProductVisual
                  image={active?.image ?? product.images[0]}
                  tone={tone}
                  showStitching={product.embroideryType !== "None"}
                  priority
                  hoverLens
                />
              </button>
              {showArrows && (
                <>
                  <NavArrow direction="prev" onClick={goPrev} label="Show previous image" />
                  <NavArrow direction="next" onClick={goNext} label="Show next image" />
                </>
              )}
            </div>
          )}
          <div className="mt-3 grid grid-cols-3 gap-2">
            {media.map((item, i) => (
              <button
                key={item.type === "image" ? item.image.src : item.src}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-pressed={activeIndex === i}
                aria-label={item.type === "image" ? `Show ${item.image.alt}` : `Play ${item.alt}`}
                className={cn(
                  "relative aspect-square overflow-hidden outline outline-1",
                  activeIndex === i ? "outline-ink" : "outline-ink/10"
                )}
              >
                {item.type === "image" ? (
                  <ProductVisual image={{ ...item.image, aspect: "detail" }} tone={tone} />
                ) : (
                  <>
                    <video muted playsInline preload="metadata" className="h-full w-full object-cover" src={item.src} />
                    <span className="absolute inset-0 flex items-center justify-center bg-ink/20">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-alabaster/90 text-ink">
                        <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" aria-hidden="true">
                          <path d="M0 0 10 6 0 12Z" />
                        </svg>
                      </span>
                    </span>
                  </>
                )}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="mt-4">
          <ProductViewer3D colorHex={colorHex} seed={`${product.slug}-viewer`} productName={product.name} />
        </div>
      )}

      <Dialog open={lightboxOpen} onClose={() => setLightboxOpen(false)} labelledBy="lightbox-heading" placement="fullscreen">
        <div className="flex h-full w-full flex-col bg-warm-ivory">
          <div className="flex items-center justify-between p-4">
            <span id="lightbox-heading" className="sr-only">
              {active?.type === "image" ? active.image.alt : active?.alt}
            </span>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="ml-auto text-label uppercase tracking-[0.14em] text-ink"
            >
              Close
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center p-6">
            <div className="w-full max-w-xl">
              {active?.type === "image" && (
                <ProductVisual key={active.image.src} image={active.image} tone={tone} showStitching zoomOnClick />
              )}
            </div>
            {showArrows && (
              <>
                <NavArrow direction="prev" onClick={goPrev} label="Show previous image" />
                <NavArrow direction="next" onClick={goNext} label="Show next image" />
              </>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
}
