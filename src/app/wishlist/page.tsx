import type { Metadata } from "next";
import { WishlistContent } from "@/components/commerce/wishlist-content";

export const metadata: Metadata = { title: "Wishlist" };

export default function WishlistPage() {
  return (
    <div className="bg-alabaster pt-24">
      <WishlistContent />
    </div>
  );
}
