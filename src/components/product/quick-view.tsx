"use client";

import Link from "next/link";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProductVisual } from "@/components/editorial/product-visual";
import { useBagStore } from "@/store/bag-store";
import { formatPrice } from "@/lib/utils";
import { getFabric } from "@/lib/fabrics";
import { SIZE_NUMBER_LABEL } from "@/lib/products";
import type { Product } from "@/lib/types";

export function QuickView({ product, open, onClose }: { product: Product; open: boolean; onClose: () => void }) {
  const [colourId, setColourId] = useState(product.colours[0]?.id);
  const [size, setSize] = useState(product.sizes[2] ?? product.sizes[0]);
  const [added, setAdded] = useState(false);
  const addItem = useBagStore((s) => s.addItem);
  const colour = product.colours.find((c) => c.id === colourId) ?? product.colours[0];
  const fabric = getFabric(product.fabricId);

  return (
    <Dialog open={open} onClose={onClose} labelledBy={`quick-view-${product.id}`} placement="center" className="max-w-3xl">
      <div className="grid max-h-[90vh] w-full grid-cols-1 overflow-y-auto bg-alabaster md:grid-cols-2">
        <ProductVisual
          image={product.images[0]}
          tone={colour?.fabricId === "hand-embroidered" ? "gold" : "obsidian"}
          showStitching={product.embroideryType !== "None"}
          className="h-full min-h-[320px]"
        />
        <div className="flex flex-col p-6">
          <div className="flex items-start justify-between">
            <h2 id={`quick-view-${product.id}`} className="font-serif text-h2">
              {product.name}
            </h2>
            <button type="button" onClick={onClose} aria-label="Close quick view" className="text-label uppercase tracking-[0.14em]">
              ✕
            </button>
          </div>
          <p className="mt-2 text-body text-stone">{formatPrice(product.price)}</p>
          <p className="mt-4 text-body text-stone">{product.description}</p>
          {fabric && (
            <p className="mt-1 text-body text-stone">
              <span className="text-ink">Fabric:</span> {fabric.name}
            </p>
          )}

          <div className="mt-6">
            <p className="text-label uppercase tracking-[0.14em] text-stone">Colour — {colour?.label}</p>
            <div className="mt-2 flex gap-2">
              {product.colours.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColourId(c.id)}
                  aria-label={c.label}
                  aria-pressed={colourId === c.id}
                  className={`h-8 w-8 rounded-full border-2 ${colourId === c.id ? "border-ink" : "border-transparent"}`}
                  style={{ backgroundColor: c.colorHex }}
                />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-label uppercase tracking-[0.14em] text-stone">Size</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((s) => {
                const available = !product.availableSizes || product.availableSizes.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    disabled={!available}
                    onClick={() => available && setSize(s)}
                    aria-pressed={size === s}
                    aria-label={available ? s : `${s}, sold out`}
                    className={`flex min-w-[3rem] flex-col items-center border px-3 py-1.5 text-caption leading-tight ${
                      !available
                        ? "cursor-not-allowed border-ink/10 text-stone/50 line-through"
                        : size === s
                          ? "border-ink bg-ink text-alabaster"
                          : "border-ink/20"
                    }`}
                  >
                    <span>{s}</span>
                    <span className={`text-[10px] tracking-[0.06em] ${size === s && available ? "text-alabaster/70" : "text-stone/70"}`}>
                      {SIZE_NUMBER_LABEL[s] ?? ""}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-8">
            <Button
              onClick={() => {
                addItem({
                  productId: product.id,
                  productSlug: product.slug,
                  productName: product.name,
                  variantLabel: colour?.label ?? "",
                  variantColorHex: colour?.colorHex ?? "#000000",
                  size,
                  length: product.lengths[1] ?? product.lengths[0],
                  quantity: 1,
                  unitPrice: product.price,
                });
                setAdded(true);
              }}
              className="w-full justify-center"
            >
              {added ? "Added to Bag" : "Add to Bag"}
            </Button>
            <Link href={`/products/${product.slug}`} className="text-center text-label uppercase tracking-[0.14em] underline">
              View Full Details
            </Link>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
