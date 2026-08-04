"use client";

import { useState } from "react";
import { TextileStudy, type TextileTone } from "@/components/editorial/textile-study";
import { ProductViewer3D } from "@/components/product/product-viewer-3d";
import { Dialog } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function ProductGallery({ product, colorHex, tone }: { product: Product; colorHex: string; tone: TextileTone }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mode, setMode] = useState<"images" | "3d">("images");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const image = product.images[activeIndex];

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
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="mt-4 block w-full cursor-zoom-in"
            aria-label={`View ${image.alt} in full screen`}
          >
            <TextileStudy seed={image.src} alt={image.alt} aspect="portrait" tone={tone} showStitching={product.embroideryType !== "None"} />
          </button>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {product.images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-pressed={activeIndex === i}
                aria-label={`Show ${img.alt}`}
                className={cn("outline outline-1", activeIndex === i ? "outline-ink" : "outline-ink/10")}
              >
                <TextileStudy seed={img.src} alt={img.alt} aspect="detail" tone={tone} />
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
              {image.alt}
            </span>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="ml-auto text-label uppercase tracking-[0.14em] text-ink"
            >
              Close
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center p-6">
            <div className="w-full max-w-xl">
              <TextileStudy seed={image.src} alt={image.alt} aspect="portrait" tone={tone} showStitching />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
