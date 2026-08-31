import type { Metadata } from "next";
import { WHATSAPP_DISPLAY } from "@/lib/constants";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-24 md:px-10">
      <h1 className="font-serif text-h1">Privacy</h1>
      <p className="mt-6 text-body text-stone">
        Zoya Fashion is operated by Zoya Enterprise FZE LLC, a UAE-registered business. When you place an order,
        we collect your name, phone number, delivery address, emirate, and (if provided) email address, along
        with the order details — this information is sent directly to our team via WhatsApp to confirm and
        fulfil your order. We do not collect or store card details: orders are settled by Cash on Delivery or
        Bank Transfer, arranged directly with our team.
      </p>
      <p className="mt-4 text-body text-stone">
        We use your information only to process, deliver, and communicate with you about your order, and to
        respond to enquiries you send us. We do not sell your data. Your information may be shared with our
        delivery courier solely to complete your delivery.
      </p>
      <p className="mt-4 text-body text-stone">
        You can request access to, correction of, or deletion of your personal data at any time by contacting
        us on WhatsApp at {WHATSAPP_DISPLAY}.
      </p>
    </div>
  );
}
