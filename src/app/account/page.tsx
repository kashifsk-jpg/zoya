import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Account" };

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-lg px-5 py-24 text-center md:px-10">
      <h1 className="font-serif text-h1">Account</h1>
      <p className="mt-6 text-body text-stone">
        Accounts aren&rsquo;t part of this demonstration build — there&rsquo;s no sign-in to wire up. Your bag,
        wishlist and saved Atelier designs are already kept for you automatically in this browser.
      </p>
      <p className="mt-4 text-body text-stone">
        A production build would connect this page to a real commerce backend&rsquo;s customer accounts (see{" "}
        <code>src/lib/commerce</code> for the integration boundary).
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/wishlist" variant="secondary">
          View Wishlist
        </Button>
        <Button href="/bag" variant="secondary">
          View Bag
        </Button>
      </div>
    </div>
  );
}
