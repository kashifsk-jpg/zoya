"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SizeGuideDialog } from "@/components/product/size-guide-dialog";
import { useBagStore } from "@/store/bag-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useHydrated } from "@/hooks/use-hydrated";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/lib/types";
import { WHATSAPP_HREF } from "@/lib/constants";
import { getFabric } from "@/lib/fabrics";
import { SIZE_NUMBER_LABEL } from "@/lib/products";

const AVAILABILITY_LABEL: Record<Product["availability"], string> = {
  "in-stock": "In Stock — ships in 1–2 business days",
  "made-to-order": "Made to Order — 3–4 weeks",
  limited: "Limited Availability",
  "sold-out": "Sold Out",
};

interface PurchasePanelProps {
  product: Product;
  colourId: string;
  onColourChange: (id: string) => void;
  size: string;
  onSizeChange: (size: string) => void;
}

export function PurchasePanel({
  product,
  colourId,
  onColourChange,
  size,
  onSizeChange,
}: PurchasePanelProps) {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const hydrated = useHydrated();
  const addItem = useBagStore((s) => s.addItem);
  const isWishlisted = useWishlistStore((s) => s.productIds.includes(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const colour = product.colours.find((c) => c.id === colourId) ?? product.colours[0];
  const length = product.lengths[0] ?? "Standard";
  const soldOut = product.availability === "sold-out";
  const fabric = getFabric(product.fabricId);
  const fabricLabel = product.collectionSlug === "fine-jewelry" ? "Material" : "Fabric";

  return (
    <div id="purchase-panel">
      <p className="text-label uppercase tracking-[0.14em] text-stone">
        {product.collectionSlug.replace(/-/g, " ")}
      </p>
      <h1 className="mt-2 font-serif text-h1">{product.name}</h1>
      {product.nameArabic && <p className="mt-1 text-editorial text-stone">{product.nameArabic}</p>}
      <p className="mt-4 text-h3">
        {product.compareAtPrice && (
          <span className="mr-2 text-body text-stone line-through">{formatPrice(product.compareAtPrice)}</span>
        )}
        <span className={product.compareAtPrice ? "text-burgundy" : undefined}>{formatPrice(product.price)}</span>
      </p>

      <p className="mt-4 max-w-md text-body text-stone">{product.editorialDescription}</p>
      {fabric && (
        <p className="mt-2 max-w-md text-body text-stone">
          <span className="text-ink">{fabricLabel}:</span> {fabric.name}
        </p>
      )}

      <div className="mt-6">
        <p className="text-label uppercase tracking-[0.14em] text-stone">Colour — {colour?.label}</p>
        <div className="mt-2 flex gap-2">
          {product.colours.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => onColourChange(c.id)}
              aria-label={c.label}
              aria-pressed={colourId === c.id}
              className={cn("h-9 w-9 rounded-full border-2", colourId === c.id ? "border-ink" : "border-transparent")}
              style={{ backgroundColor: c.colorHex }}
            />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <p className="text-label uppercase tracking-[0.14em] text-stone">Size</p>
          <SizeGuideDialog />
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.sizes.map((s) => {
            const available = !product.availableSizes || product.availableSizes.includes(s);
            return (
              <button
                key={s}
                type="button"
                disabled={!available}
                onClick={() => available && onSizeChange(s)}
                aria-pressed={size === s}
                aria-label={available ? s : `${s}, sold out`}
                className={cn(
                  "flex min-w-[3.25rem] flex-col items-center border px-3.5 py-2 text-caption leading-tight",
                  !available
                    ? "cursor-not-allowed border-ink/10 text-stone/50 line-through"
                    : size === s
                      ? "border-ink bg-ink text-alabaster"
                      : "border-ink/20",
                )}
              >
                <span>{s}</span>
                <span className={cn("text-[10px] tracking-[0.06em]", size === s && available ? "text-alabaster/70" : "text-stone/70")}>
                  {SIZE_NUMBER_LABEL[s] ?? ""}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-caption text-stone">{AVAILABILITY_LABEL[product.availability]}</p>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex items-center border border-ink/20">
          <button type="button" aria-label="Decrease quantity" className="px-3 py-2" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
            −
          </button>
          <span className="px-3 py-2" aria-live="polite">
            {quantity}
          </span>
          <button type="button" aria-label="Increase quantity" className="px-3 py-2" onClick={() => setQuantity((q) => q + 1)}>
            +
          </button>
        </div>
        <Button
          disabled={soldOut}
          onClick={() => {
            addItem({
              productId: product.id,
              productSlug: product.slug,
              productName: product.name,
              variantLabel: colour?.label ?? "",
              variantColorHex: colour?.colorHex ?? "#000000",
              size,
              length,
              quantity,
              unitPrice: product.price,
            });
            setJustAdded(true);
            window.setTimeout(() => setJustAdded(false), 2200);
          }}
          className="flex-1 justify-center"
        >
          {soldOut ? "Sold Out" : justAdded ? "Added to Bag" : "Add to Bag"}
        </Button>
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={hydrated ? isWishlisted : false}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="flex h-11 w-11 items-center justify-center border border-ink/20"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill={hydrated && isWishlisted ? "currentColor" : "none"} aria-hidden="true">
            <path
              d="M9 15.5S2.5 11.6 2.5 7.1A3.6 3.6 0 0 1 9 5a3.6 3.6 0 0 1 6.5 2.1c0 4.5-6.5 8.4-6.5 8.4Z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-block text-caption uppercase tracking-[0.08em] underline"
      >
        Ask a stylist on WhatsApp
      </a>

      <dl className="mt-8 space-y-2 border-t border-ink/10 pt-6 text-caption text-stone">
        <div className="flex justify-between">
          <dt>Delivery</dt>
          <dd>3–5 business days, UAE metro · GCC and international on request</dd>
        </div>
        <div className="flex justify-between">
          <dt>Returns</dt>
          <dd>14-day return window on unworn, unaltered pieces</dd>
        </div>
      </dl>
    </div>
  );
}
