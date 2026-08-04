"use client";

import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { AtelierSummary } from "@/components/atelier/atelier-summary";
import { computeAtelierPrice, useAtelierStore } from "@/store/atelier-store";
import { formatPrice } from "@/lib/utils";

export function AtelierMobileBar() {
  const [open, setOpen] = useState(false);
  const selections = useAtelierStore((s) => s.selections);
  const price = computeAtelierPrice(selections);

  return (
    <div className="sticky bottom-0 z-20 flex items-center justify-between border-t border-ink/10 bg-alabaster px-5 py-3 lg:hidden">
      <div>
        <p className="text-caption text-stone">Estimated Price</p>
        <p className="text-body">{formatPrice(price)}</p>
      </div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="border border-ink px-5 py-2.5 text-label uppercase tracking-[0.14em]"
      >
        Details
      </button>

      <Dialog open={open} onClose={() => setOpen(false)} labelledBy="atelier-summary-heading" placement="bottom">
        <div className="max-h-[85vh] w-full overflow-y-auto rounded-t-lg bg-alabaster p-6">
          <div className="flex items-center justify-between">
            <h2 id="atelier-summary-heading" className="text-label uppercase tracking-[0.14em]">
              Your Composition
            </h2>
            <button type="button" onClick={() => setOpen(false)} className="text-label uppercase tracking-[0.14em]">
              Close
            </button>
          </div>
          <div className="mt-4">
            <AtelierSummary />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
