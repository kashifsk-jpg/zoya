import type { Metadata } from "next";
import { WHATSAPP_DISPLAY } from "@/lib/constants";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-24 md:px-10">
      <h1 className="font-serif text-h1">Terms</h1>
      <p className="mt-6 text-body text-stone">
        This site is operated by Zoya Enterprise FZE LLC, a company registered in the United Arab Emirates. All
        prices are listed in AED. Placing an order via WhatsApp is a request to purchase; we confirm availability,
        pricing, and delivery details with you directly before your order is finalised. We accept Cash on
        Delivery and Bank Transfer, arranged with our team once your order is confirmed.
      </p>
      <p className="mt-4 text-body text-stone">
        We currently ship across the UAE. At this time, all sales are final — if your order arrives damaged,
        defective, or different from what you ordered, contact us within 48 hours of delivery with photos of
        the item and packaging, and we&rsquo;ll work with you to make it right.
      </p>
      <p className="mt-4 text-body text-stone">
        Questions about these Terms can be sent to us on WhatsApp at {WHATSAPP_DISPLAY}.
      </p>
    </div>
  );
}
