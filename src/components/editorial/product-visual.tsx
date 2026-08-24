"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent, type TouchEvent } from "react";
import { TextileStudy, type TextileTone } from "./textile-study";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/lib/types";

const ASPECT_CLASSES: Record<string, string> = {
  portrait: "aspect-[3/4]",
  detail: "aspect-square",
  landscape: "aspect-[16/9]",
};

const CLICK_ZOOM_SCALE = 2.2;
const HOVER_LENS_SCALE = 1.9;
const MIN_PINCH_SCALE = 1;
const MAX_PINCH_SCALE = 3;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function relativePercent(clientX: number, clientY: number, rect: DOMRect) {
  return {
    x: clamp(((clientX - rect.left) / rect.width) * 100, 0, 100),
    y: clamp(((clientY - rect.top) / rect.height) * 100, 0, 100),
  };
}

// Real product photos live under /public/images/products/ or /public/noon/
// (noon marketplace model shots) once sourced from the supplier/catalog or
// generated; anything else is treated as a TextileStudy seed (procedural
// placeholder). This lets products.ts mix real and placeholder imagery without
// every call site needing to know which is which.
function isRealImage(src: string) {
  return (
    src.startsWith("/images/") ||
    src.startsWith("/noon/") ||
    src.startsWith("http://") ||
    src.startsWith("https://")
  );
}

interface ProductVisualProps {
  image: ProductImage;
  tone?: TextileTone;
  showStitching?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** Card grids: plain CSS scale on hover (no cursor tracking). */
  hoverZoom?: boolean;
  /** Desktop product gallery: magnifies and follows the cursor on hover — no click needed. Skipped on touch devices. */
  hoverLens?: boolean;
  /**
   * Lightbox: click toggles a 2.2x zoom centred on the cursor. On touch devices this
   * also enables real pinch-to-zoom (two-finger) and drag-to-look-around while zoomed,
   * plus a reset control once zoomed past 1x.
   */
  zoomOnClick?: boolean;
}

export function ProductVisual({
  image,
  tone = "obsidian",
  showStitching,
  className,
  priority,
  sizes,
  hoverZoom,
  hoverLens,
  zoomOnClick,
}: ProductVisualProps) {
  const [scale, setScale] = useState(1);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [canHover, setCanHover] = useState(false);
  const pinch = useRef<{ startDist: number; startScale: number } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  if (isRealImage(image.src)) {
    const interactive = Boolean(zoomOnClick || (hoverLens && canHover));
    const zoomed = scale > 1.02;

    const handleClick = () => {
      if (!zoomOnClick) return;
      setScale((s) => (s > 1 ? 1 : CLICK_ZOOM_SCALE));
    };

    const handleMouseEnter = () => {
      if (hoverLens && canHover) setScale(HOVER_LENS_SCALE);
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
      if (!interactive) return;
      if (zoomOnClick && !zoomed) return;
      const rect = e.currentTarget.getBoundingClientRect();
      setOrigin(relativePercent(e.clientX, e.clientY, rect));
    };

    const handleMouseLeave = () => {
      if (hoverLens) setScale(1);
      else if (zoomOnClick) setScale(1);
      pinch.current = null;
    };

    const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
      if (!zoomOnClick) return;
      if (e.touches.length === 2) {
        const [t1, t2] = [e.touches[0], e.touches[1]];
        pinch.current = {
          startDist: Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY),
          startScale: scale,
        };
      }
    };

    const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
      if (!zoomOnClick) return;
      const rect = e.currentTarget.getBoundingClientRect();
      if (e.touches.length === 2 && pinch.current) {
        const [t1, t2] = [e.touches[0], e.touches[1]];
        const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        const next = clamp((dist / pinch.current.startDist) * pinch.current.startScale, MIN_PINCH_SCALE, MAX_PINCH_SCALE);
        setScale(next);
        setOrigin(relativePercent((t1.clientX + t2.clientX) / 2, (t1.clientY + t2.clientY) / 2, rect));
      } else if (e.touches.length === 1 && scale > 1) {
        const t = e.touches[0];
        setOrigin(relativePercent(t.clientX, t.clientY, rect));
      }
    };

    const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
      if (e.touches.length < 2) pinch.current = null;
    };

    return (
      <div
        className={cn(
          "relative w-full overflow-hidden bg-ink",
          ASPECT_CLASSES[image.aspect],
          zoomOnClick && (zoomed ? "cursor-zoom-out touch-none" : "cursor-zoom-in"),
          hoverLens && canHover && "cursor-crosshair",
          className
        )}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes={sizes ?? "(min-width: 1024px) 25vw, 50vw"}
          style={
            zoomed ? { transformOrigin: `${origin.x}% ${origin.y}%`, transform: `scale(${scale})` } : undefined
          }
          className={cn(
            "object-cover object-top",
            interactive && "transition-transform duration-200 ease-out",
            hoverZoom && "transition-transform duration-500 ease-out group-hover:scale-110"
          )}
        />
        {zoomOnClick && zoomed && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setScale(1);
            }}
            className="absolute bottom-3 right-3 z-10 rounded-full bg-alabaster/90 px-3 py-1.5 text-micro uppercase tracking-[0.1em] text-ink shadow-sm"
          >
            Reset zoom
          </button>
        )}
      </div>
    );
  }

  return (
    <TextileStudy
      seed={image.src}
      alt={image.alt}
      aspect={image.aspect}
      tone={tone}
      showStitching={showStitching}
      className={className}
    />
  );
}
