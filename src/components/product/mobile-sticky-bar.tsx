"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function MobileStickyBar({ product, onAdd }: { product: Product; onAdd: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const panel = document.getElementById("purchase-panel");
    if (!panel) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      rootMargin: "-64px 0px 0px 0px",
    });
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-ink/10 bg-alabaster px-5 py-3 lg:hidden">
      <div>
        <p className="text-caption">{product.name}</p>
        <p className="text-body">{formatPrice(product.price)}</p>
      </div>
      <Button onClick={onAdd} disabled={product.availability === "sold-out"}>
        {product.availability === "sold-out" ? "Sold Out" : "Add to Bag"}
      </Button>
    </div>
  );
}
