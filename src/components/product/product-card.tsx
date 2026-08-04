"use client";

import Link from "next/link";
import { useState } from "react";
import { TextileStudy, type TextileTone } from "@/components/editorial/textile-study";
import { QuickView } from "@/components/product/quick-view";
import { useWishlistStore } from "@/store/wishlist-store";
import { useHydrated } from "@/hooks/use-hydrated";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

const COLLECTION_TONE: Record<string, TextileTone> = {
  "the-obsidian-edit": "obsidian",
  "evening-light": "burgundy",
  "quiet-structure": "stone",
  "the-embroidered-atelier": "gold",
  "essential-nida": "sand",
};

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  aspectOverride?: "portrait" | "detail" | "landscape";
}

export function ProductCard({ product, aspectOverride }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const hydrated = useHydrated();
  const isWishlisted = useWishlistStore((s) => s.productIds.includes(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const tone = COLLECTION_TONE[product.collectionSlug] ?? "obsidian";
  const image = hovered && product.images[1] ? product.images[1] : product.images[0];

  return (
    <div
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative">
          <TextileStudy
            seed={image.src}
            alt={image.alt}
            aspect={aspectOverride ?? "portrait"}
            tone={tone}
            showStitching={product.embroideryType !== "None"}
          />
          <div className="absolute left-3 top-3 flex flex-col gap-1">
            {product.isNew && (
              <span className="bg-alabaster px-2 py-1 text-micro uppercase tracking-[0.14em] text-ink">New</span>
            )}
            {product.isLimited && (
              <span className="bg-ink px-2 py-1 text-micro uppercase tracking-[0.14em] text-alabaster">Limited</span>
            )}
          </div>
        </div>
      </Link>
      <button
        type="button"
        onClick={() => toggleWishlist(product.id)}
        aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        aria-pressed={hydrated ? isWishlisted : false}
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-alabaster/90 text-ink transition-transform hover:scale-105"
      >
        <svg width="16" height="16" viewBox="0 0 18 18" fill={hydrated && isWishlisted ? "currentColor" : "none"} aria-hidden="true">
          <path
            d="M9 15.5S2.5 11.6 2.5 7.1A3.6 3.6 0 0 1 9 5a3.6 3.6 0 0 1 6.5 2.1c0 4.5-6.5 8.4-6.5 8.4Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <Link href={`/products/${product.slug}`} className="text-body hover:opacity-70">
            {product.name}
          </Link>
          <p className="mt-0.5 text-caption text-stone">{product.cut} · {product.occasion[0]}</p>
        </div>
        <div className="shrink-0 text-right text-meta">
          <span className={cn(product.compareAtPrice && "text-stone line-through")}>{formatPrice(product.price)}</span>
          {product.compareAtPrice && <span className="ml-1.5 block text-ink">{formatPrice(product.compareAtPrice)}</span>}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex gap-1.5" aria-hidden="true">
          {product.colours.map((c) => (
            <span key={c.id} className="h-3 w-3 rounded-full border border-ink/10" style={{ backgroundColor: c.colorHex }} />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setQuickViewOpen(true)}
          className="text-micro uppercase tracking-[0.1em] text-stone underline decoration-1 underline-offset-2 hover:text-ink"
        >
          Quick View
        </button>
      </div>

      <QuickView product={product} open={quickViewOpen} onClose={() => setQuickViewOpen(false)} />
    </div>
  );
}
