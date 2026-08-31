import { WHATSAPP_HREF } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import type { CheckoutLineItem, CheckoutSession, CommerceAdapter, CustomerDetails, PaymentMethod } from "./types";

/**
 * Real order-intake adapter, no payment gateway required. Builds an order
 * summary and hands it to Zoya's team over WhatsApp (WHATSAPP_HREF) — the
 * customer sends the pre-filled message, the team confirms the order there,
 * and for Bank Transfer shares account details privately per order rather
 * than publishing them on the site. Cash on Delivery needs no further step.
 */
function paymentLabel(method: PaymentMethod) {
  return method === "cod" ? "Cash on Delivery" : "Bank Transfer";
}

function buildOrderMessage(orderId: string, lines: CheckoutLineItem[], customer: CustomerDetails, paymentMethod: PaymentMethod, subtotal: number) {
  const itemLines = lines
    .map((l) => `• ${l.productName} (${l.variantLabel}, ${l.size}, ${l.length}) x${l.quantity} — ${formatPrice(l.unitPrice * l.quantity)}`)
    .join("\n");

  return [
    `New order ${orderId} — Zoya Fashion website`,
    "",
    itemLines,
    "",
    `Subtotal: ${formatPrice(subtotal)}`,
    `Payment method: ${paymentLabel(paymentMethod)}`,
    "",
    `Name: ${customer.fullName}`,
    `Phone: ${customer.phone}`,
    customer.email ? `Email: ${customer.email}` : undefined,
    `Emirate: ${customer.emirate}`,
    `Address: ${customer.address}`,
    customer.notes ? `Notes: ${customer.notes}` : undefined,
  ]
    .filter(Boolean)
    .join("\n");
}

export const whatsappCommerceAdapter: CommerceAdapter = {
  async createCheckoutSession(lines: CheckoutLineItem[], customer: CustomerDetails, paymentMethod: PaymentMethod): Promise<CheckoutSession> {
    const subtotal = lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
    const id = `ZY-${Date.now().toString(36).toUpperCase()}`;
    const message = buildOrderMessage(id, lines, customer, paymentMethod, subtotal);
    const redirectUrl = `${WHATSAPP_HREF}?text=${encodeURIComponent(message)}`;

    return {
      id,
      status: "whatsapp",
      subtotal,
      currency: "AED",
      estimatedDelivery: "1–5 business days, UAE-wide",
      redirectUrl,
    };
  },
};
