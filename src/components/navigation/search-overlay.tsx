"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.collectionSlug.includes(q) ||
          p.fabricId.includes(q) ||
          p.occasion.some((o) => o.toLowerCase().includes(q)),
      )
      .slice(0, 8);
  }, [query]);

  return (
    <Dialog open={open} onClose={onClose} labelledBy="search-heading" placement="fullscreen">
      <div className="flex h-full w-full flex-col bg-alabaster text-ink">
        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-5 pt-24">
          <div className="flex items-center justify-between">
            <h2 id="search-heading" className="text-label uppercase tracking-[0.14em] text-stone">
              Search
            </h2>
            <button type="button" onClick={onClose} aria-label="Close search" className="text-label uppercase tracking-[0.14em]">
              Close
            </button>
          </div>
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products, fabrics, occasions…"
            aria-label="Search"
            className="mt-6 w-full border-b border-ink/20 bg-transparent py-4 font-serif text-h2 outline-none placeholder:text-stone/60"
          />
          <ul className="mt-8 flex-1 divide-y divide-ink/10 overflow-y-auto">
            {results.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/products/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between py-4 hover:opacity-70"
                >
                  <span>
                    <span className="block text-body">{product.name}</span>
                    <span className="text-caption text-stone">{product.cut} · {product.occasion.join(", ")}</span>
                  </span>
                  <span className="text-meta">{formatPrice(product.price)}</span>
                </Link>
              </li>
            ))}
            {query && results.length === 0 && (
              <li className="py-8 text-body text-stone">
                No results for &ldquo;{query}&rdquo;. Try a fabric, collection or occasion.
              </li>
            )}
          </ul>
        </div>
      </div>
    </Dialog>
  );
}
