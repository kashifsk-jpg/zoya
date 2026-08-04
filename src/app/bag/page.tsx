import type { Metadata } from "next";
import { BagPageContent } from "@/components/commerce/bag-page-content";

export const metadata: Metadata = { title: "Your Bag" };

export default function BagPage() {
  return (
    <div className="bg-alabaster pt-24">
      <BagPageContent />
    </div>
  );
}
