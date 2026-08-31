export interface CheckoutLineItem {
  productSlug: string;
  productName: string;
  variantLabel: string;
  size: string;
  length: string;
  quantity: number;
  unitPrice: number;
}

export type PaymentMethod = "cod" | "bank_transfer";

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email?: string;
  emirate: string;
  address: string;
  notes?: string;
}

export interface CheckoutSession {
  id: string;
  status: "demo" | "redirect" | "whatsapp";
  subtotal: number;
  currency: string;
  estimatedDelivery: string;
  redirectUrl?: string;
}

/**
 * Boundary between Zoya Fashion presentation code and the order-intake
 * backend. `whatsappCommerceAdapter` (see ./whatsapp-adapter.ts) hands
 * orders to Zoya's team over WhatsApp for Cash on Delivery and Bank
 * Transfer — no card gateway required. Swap in a Shopify/Medusa/Ziina
 * adapter here later without touching presentation code.
 */
export interface CommerceAdapter {
  createCheckoutSession(
    lines: CheckoutLineItem[],
    customer: CustomerDetails,
    paymentMethod: PaymentMethod,
  ): Promise<CheckoutSession>;
}
