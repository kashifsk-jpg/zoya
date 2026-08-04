"use client";

import { ProductCard } from "@/components/product/product-card";
import { TextileStudy } from "@/components/editorial/textile-study";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/store/wishlist-store";
import { useHydrated } from "@/hooks/use-hydrated";
import { products } from "@/lib/products";

export function WishlistContent() {
  const hydrated = useHydrated();
  const productIds = useWishlistStore((s) => s.productIds);
  const items = products.filter((p) => productIds.includes(p.id));

  if (!hydrated) return <div className="min-h-[40vh]" />;

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-5 py-24 text-center">
        <TextileStudy seed="empty-wishlist" alt="An empty study, awaiting your saved pieces" aspect="landscape" tone="stone" className="w-full" />
        <p className="font-serif text-h2">Nothing saved, yet.</p>
        <p className="text-body text-stone">Pieces you save while browsing will appear here.</p>
        <Button href="/collections" className="mt-2">
          Browse the Collection
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] px-5 py-12 md:px-10">
      <h1 className="font-serif text-h1">Wishlist</h1>
      <p className="mt-2 text-body text-stone">{items.length} saved</p>
      <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
