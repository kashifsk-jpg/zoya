"use client";

import { useState } from "react";
import { ProductGallery } from "@/components/product/product-gallery";
import { PurchasePanel } from "@/components/product/purchase-panel";
import { MobileStickyBar } from "@/components/product/mobile-sticky-bar";
import { useBagStore } from "@/store/bag-store";
import type { TextileTone } from "@/components/editorial/textile-study";
import type { Product } from "@/lib/types";

export function ProductDetailInteractive({ product, tone }: { product: Product; tone: TextileTone }) {
  const [colourId, setColourId] = useState(product.colours[0]?.id ?? "");
  const [size, setSize] = useState(product.sizes[2] ?? product.sizes[0]);
  const [length, setLength] = useState(product.lengths[1] ?? product.lengths[0]);
  const addItem = useBagStore((s) => s.addItem);
  const colour = product.colours.find((c) => c.id === colourId) ?? product.colours[0];

  return (
    <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-5 py-12 md:px-10 lg:grid-cols-2 lg:gap-16">
      <ProductGallery product={product} colorHex={colour?.colorHex ?? "#0d0d0d"} tone={tone} />
      <div className="lg:sticky lg:top-28 lg:self-start">
        <PurchasePanel
          product={product}
          colourId={colourId}
          onColourChange={setColourId}
          size={size}
          onSizeChange={setSize}
          length={length}
          onLengthChange={setLength}
        />
      </div>
      <MobileStickyBar
        product={product}
        onAdd={() =>
          addItem({
            productId: product.id,
            productSlug: product.slug,
            productName: product.name,
            variantLabel: colour?.label ?? "",
            variantColorHex: colour?.colorHex ?? "#000000",
            size,
            length,
            quantity: 1,
            unitPrice: product.price,
          })
        }
      />
    </div>
  );
}
