"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";

const PAGE_SIZE = 9;

export function ProductGrid({ products }: { products: Product[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <p className="font-serif text-h3">No pieces match these filters.</p>
        <p className="max-w-sm text-body text-stone">
          Try clearing a filter, or explore the full collection to see everything available.
        </p>
        <Button href="/collections" variant="secondary" className="mt-2">
          View All Collections
        </Button>
      </div>
    );
  }

  const visible = products.slice(0, visibleCount);

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {visibleCount < products.length && (
        <div className="mt-14 flex justify-center">
          <Button variant="secondary" onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}>
            Load More ({products.length - visibleCount} remaining)
          </Button>
        </div>
      )}
      {products.length > 0 && (
        <p className="mt-4 text-center text-caption text-stone">
          Can&rsquo;t find your fit? <Link href="/atelier" className="underline">Compose one in the Atelier.</Link>
        </p>
      )}
    </div>
  );
}
