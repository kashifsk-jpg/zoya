import type { CheckoutLineItem, CheckoutSession, CommerceAdapter } from "./types";

/**
 * Demonstration-only adapter. Simulates network latency and returns a
 * "demo" checkout session — no payment is processed. Replace with a real
 * adapter (Shopify Storefront API / Shopify Checkout / Medusa) that
 * implements CommerceAdapter and returns a real redirect session.
 */
export const mockCommerceAdapter: CommerceAdapter = {
  async createCheckoutSession(lines: CheckoutLineItem[]): Promise<CheckoutSession> {
    await new Promise((resolve) => setTimeout(resolve, 650));
    const subtotal = lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
    return {
      id: `demo-${Date.now()}`,
      status: "demo",
      subtotal,
      currency: "AED",
      estimatedDelivery: "3–5 business days, UAE metro",
    };
  },
};
