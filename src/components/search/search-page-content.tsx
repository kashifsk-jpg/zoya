"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product/product-card";
import { products } from "@/lib/products";

export function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.collectionSlug.includes(q) ||
        p.fabricId.includes(q) ||
        p.cut.toLowerCase().includes(q) ||
        p.occasion.some((o) => o.toLowerCase().includes(q)),
    );
  }, [query]);

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:px-10">
      <h1 className="font-serif text-display-l">Search</h1>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/search?q=${encodeURIComponent(query)}`, { scroll: false });
        }}
        className="mt-8"
      >
        <label htmlFor="search-input" className="sr-only">
          Search products, fabrics, occasions
        </label>
        <input
          id="search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products, fabrics, occasions…"
          className="w-full border-b border-ink/20 bg-transparent py-4 font-serif text-h2 outline-none placeholder:text-stone/60"
        />
      </form>

      <p className="mt-6 text-caption text-stone">
        {query ? `${results.length} result${results.length === 1 ? "" : "s"} for "${query}"` : "Try a fabric, collection, cut or occasion."}
      </p>

      <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3">
        {results.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
