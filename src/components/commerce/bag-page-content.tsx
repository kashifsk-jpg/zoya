"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { TextileStudy } from "@/components/editorial/textile-study";
import { useBagStore, bagSubtotal, bagItemHref } from "@/store/bag-store";
import { useHydrated } from "@/hooks/use-hydrated";
import { formatPrice } from "@/lib/utils";
import { commerceAdapter, type CheckoutSession } from "@/lib/commerce";
import { products } from "@/lib/products";

export function BagPageContent() {
  const hydrated = useHydrated();
  const items = useBagStore((s) => s.items);
  const updateQuantity = useBagStore((s) => s.updateQuantity);
  const removeItem = useBagStore((s) => s.removeItem);
  const clear = useBagStore((s) => s.clear);
  const [giftMessage, setGiftMessage] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoStatus, setPromoStatus] = useState<"idle" | "invalid" | "applied">("idle");
  const [checkingOut, setCheckingOut] = useState(false);
  const [session, setSession] = useState<CheckoutSession | null>(null);

  const subtotal = hydrated ? bagSubtotal(items) : 0;
  const discount = promoStatus === "applied" ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount;

  const recommended = products.filter((p) => p.isFeatured && !items.some((i) => i.productId === p.id)).slice(0, 4);

  async function handleCheckout() {
    setCheckingOut(true);
    const result = await commerceAdapter.createCheckoutSession(
      items.map((i) => ({
        productSlug: i.productSlug,
        productName: i.productName,
        variantLabel: i.variantLabel,
        size: i.size,
        length: i.length,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
      })),
    );
    setSession(result);
    setCheckingOut(false);
  }

  if (session) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <p className="text-label uppercase tracking-[0.14em] text-stone">Checkout Demonstration</p>
        <h1 className="mt-4 font-serif text-h2">Thank you — this is a demonstration.</h1>
        <p className="mt-4 text-body text-stone">
          Order <span className="text-ink">{session.id}</span> for {formatPrice(session.subtotal)} was recorded by
          the demo commerce adapter. No payment was processed. Estimated delivery: {session.estimatedDelivery}.
        </p>
        <p className="mt-4 text-caption text-stone">
          Connect a real checkout by implementing <code>CommerceAdapter</code> (see{" "}
          <code>src/lib/commerce/types.ts</code>) against Shopify Storefront API, Shopify Checkout or Medusa.
        </p>
        <Button
          href="/collections"
          className="mt-8"
          onClick={() => {
            clear();
          }}
        >
          Continue Shopping
        </Button>
      </div>
    );
  }

  if (hydrated && items.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-5 py-24 text-center">
        <TextileStudy seed="empty-bag" alt="An empty study, awaiting your first composition" aspect="landscape" tone="sand" className="w-full" />
        <p className="font-serif text-h2">Your bag is composed of nothing, yet.</p>
        <p className="text-body text-stone">Begin with a piece from the collection, or compose one from scratch in the Atelier.</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Button href="/collections">Browse the Collection</Button>
          <Button href="/atelier" variant="secondary">
            Enter the Atelier
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-12 md:px-10">
      <h1 className="font-serif text-h1">Your Bag</h1>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
        <ul className="divide-y divide-ink/10 border-y border-ink/10">
          {items.map((item) => (
            <li key={item.lineId} className="flex gap-5 py-6">
              <span className="h-28 w-20 shrink-0 border border-ink/10" style={{ backgroundColor: item.variantColorHex }} aria-hidden="true" />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link href={bagItemHref(item)} className="text-body hover:opacity-70">
                      {item.productName}
                    </Link>
                    <p className="mt-1 text-caption text-stone">
                      {item.variantLabel} · {item.size} · {item.length}
                    </p>
                  </div>
                  <span className="text-body">{formatPrice(item.unitPrice * item.quantity)}</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center border border-ink/15">
                    <button type="button" aria-label="Decrease quantity" className="px-3 py-1.5" onClick={() => updateQuantity(item.lineId, item.quantity - 1)}>
                      −
                    </button>
                    <span className="px-3 py-1.5" aria-live="polite">
                      {item.quantity}
                    </span>
                    <button type="button" aria-label="Increase quantity" className="px-3 py-1.5" onClick={() => updateQuantity(item.lineId, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                  <button type="button" onClick={() => removeItem(item.lineId)} className="text-caption uppercase tracking-[0.08em] text-stone underline">
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div>
          <label className="block text-label uppercase tracking-[0.14em] text-stone" htmlFor="gift-message">
            Gift Message (optional)
          </label>
          <textarea
            id="gift-message"
            value={giftMessage}
            onChange={(e) => setGiftMessage(e.target.value)}
            rows={3}
            className="mt-2 w-full border border-ink/20 bg-transparent p-3 text-body outline-none"
            placeholder="Add a note to include with your order"
          />

          <div className="mt-6">
            <label className="block text-label uppercase tracking-[0.14em] text-stone" htmlFor="promo-code">
              Promo Code
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="promo-code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 border border-ink/20 bg-transparent px-3 py-2 text-body outline-none"
                placeholder="Enter code"
              />
              <button
                type="button"
                onClick={() => setPromoStatus(promoCode.trim().toUpperCase() === "ZOYA10" ? "applied" : "invalid")}
                className="border border-ink px-4 py-2 text-caption uppercase tracking-[0.08em]"
              >
                Apply
              </button>
            </div>
            {promoStatus === "invalid" && <p className="mt-2 text-caption text-burgundy">That code isn&rsquo;t valid.</p>}
            {promoStatus === "applied" && <p className="mt-2 text-caption text-stone">ZOYA10 applied — 10% off.</p>}
          </div>

          <dl className="mt-8 space-y-2 border-t border-ink/10 pt-6 text-body">
            <div className="flex justify-between">
              <dt className="text-stone">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            {discount > 0 && (
              <div className="flex justify-between">
                <dt className="text-stone">Discount</dt>
                <dd>−{formatPrice(discount)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-stone">Delivery</dt>
              <dd className="text-caption text-stone">Calculated at checkout</dd>
            </div>
            <div className="flex justify-between border-t border-ink/10 pt-2 text-h3">
              <dt>Estimated Total</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>

          <Button onClick={handleCheckout} disabled={checkingOut} className="mt-6 w-full justify-center">
            {checkingOut ? "Processing…" : "Checkout"}
          </Button>
          <p className="mt-3 text-caption text-stone">
            This is a demonstration checkout. No payment is collected — see{" "}
            <code>src/lib/commerce</code> for the real-checkout integration boundary.
          </p>
        </div>
      </div>

      {recommended.length > 0 && (
        <section className="mt-20 border-t border-ink/10 pt-12">
          <h2 className="font-serif text-h2">You Might Also Like</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
            {recommended.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
