"use client";

import Link from "next/link";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useBagStore, bagSubtotal, bagItemHref } from "@/store/bag-store";
import { useHydrated } from "@/hooks/use-hydrated";
import { formatPrice } from "@/lib/utils";

export function BagDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const hydrated = useHydrated();
  const items = useBagStore((s) => s.items);
  const updateQuantity = useBagStore((s) => s.updateQuantity);
  const removeItem = useBagStore((s) => s.removeItem);
  const subtotal = hydrated ? bagSubtotal(items) : 0;

  return (
    <Dialog open={open} onClose={onClose} labelledBy="bag-drawer-heading" placement="right">
      <div className="flex h-full w-full flex-col bg-alabaster text-ink">
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <h2 id="bag-drawer-heading" className="text-label uppercase tracking-[0.14em]">
            Bag {hydrated && items.length > 0 ? `(${items.length})` : ""}
          </h2>
          <button type="button" onClick={onClose} aria-label="Close bag" className="text-label uppercase tracking-[0.14em]">
            Close
          </button>
        </div>

        {hydrated && items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
            <p className="font-serif text-h3">Your bag is composed of nothing, yet.</p>
            <p className="text-body text-stone">
              Begin with a silhouette in the collection, or compose one from scratch in the Atelier.
            </p>
            <Button href="/collections" variant="secondary" className="mt-4" onClick={onClose}>
              Browse the Collection
            </Button>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto px-6">
            {items.map((item) => (
              <li key={item.lineId} className="flex gap-4 py-5">
                <span
                  className="mt-1 h-16 w-12 shrink-0 border border-ink/10"
                  style={{ backgroundColor: item.variantColorHex }}
                  aria-hidden="true"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <Link href={bagItemHref(item)} onClick={onClose} className="text-body hover:opacity-70">
                      {item.productName}
                    </Link>
                    <span className="text-meta">{formatPrice(item.unitPrice * item.quantity)}</span>
                  </div>
                  <p className="mt-1 text-caption text-stone">
                    {item.variantLabel} · {item.size} · {item.length}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center border border-ink/15">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        className="px-2.5 py-1 text-body"
                        onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="px-2 text-body" aria-live="polite">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        className="px-2.5 py-1 text-body"
                        onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="text-caption uppercase tracking-[0.1em] text-stone hover:text-ink"
                      onClick={() => removeItem(item.lineId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {hydrated && items.length > 0 && (
          <div className="border-t border-ink/10 px-6 py-6">
            <div className="flex items-center justify-between text-body">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-caption text-stone">Delivery calculated at checkout · 3–5 business days, UAE metro</p>
            <div className="mt-5 flex flex-col gap-3">
              <Button href="/bag" onClick={onClose} className="w-full justify-center">
                Checkout
              </Button>
              <Button href="/bag" variant="secondary" onClick={onClose} className="w-full justify-center">
                View Bag
              </Button>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
}
