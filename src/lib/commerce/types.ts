export interface CheckoutLineItem {
  productSlug: string;
  productName: string;
  variantLabel: string;
  size: string;
  length: string;
  quantity: number;
  unitPrice: number;
}

export interface CheckoutSession {
  id: string;
  status: "demo" | "redirect";
  subtotal: number;
  currency: string;
  estimatedDelivery: string;
  redirectUrl?: string;
}

/**
 * Boundary between Zoya Fashion presentation code and a real commerce backend.
 * Swap `mockCommerceAdapter` in `./index.ts` for a Shopify Storefront API,
 * Shopify Checkout, or Medusa implementation of this interface — no
 * presentation code should need to change.
 */
export interface CommerceAdapter {
  createCheckoutSession(lines: CheckoutLineItem[]): Promise<CheckoutSession>;
}
