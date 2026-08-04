import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-24 md:px-10">
      <h1 className="font-serif text-h1">Terms</h1>
      <p className="mt-6 text-body text-stone">
        Zoya Fashion is a demonstration storefront built for educational and portfolio purposes. Products,
        prices and availability shown are illustrative and not offered for real sale. The checkout flow on
        this site is a demonstration only — no order is fulfilled and no payment is collected.
      </p>
      <p className="mt-4 text-body text-stone">
        A production deployment would replace this page with full terms of sale, covering order acceptance,
        pricing, delivery, returns and dispute resolution.
      </p>
    </div>
  );
}
