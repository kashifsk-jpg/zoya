"use client";

import { useRecentlyViewed } from "@/hooks/use-recently-viewed";
import { RelatedProducts } from "@/components/product/related-products";
import { products } from "@/lib/products";

export function RecentlyViewedSection({ currentSlug }: { currentSlug: string }) {
  const { slugs } = useRecentlyViewed(currentSlug);
  const items = slugs.map((slug) => products.find((p) => p.slug === slug)).filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (items.length === 0) return null;
  return <RelatedProducts products={items} title="Recently Viewed" />;
}
