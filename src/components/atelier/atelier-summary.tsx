"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { atelierSteps, findOption } from "@/lib/atelier-options";
import { computeAtelierPrice, useAtelierStore } from "@/store/atelier-store";
import { useBagStore } from "@/store/bag-store";
import { formatPrice } from "@/lib/utils";
import { generateId } from "@/lib/id";
import { WHATSAPP_HREF } from "@/lib/constants";

export function AtelierSummary() {
  const selections = useAtelierStore((s) => s.selections);
  const history = useAtelierStore((s) => s.history);
  const undo = useAtelierStore((s) => s.undo);
  const reset = useAtelierStore((s) => s.reset);
  const saveDesign = useAtelierStore((s) => s.saveDesign);
  const addItem = useBagStore((s) => s.addItem);
  const [saved, setSaved] = useState(false);
  const [addedToBag, setAddedToBag] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const price = computeAtelierPrice(selections);
  const colourOption = findOption("colour", selections.colour);
  const silhouetteOption = findOption("silhouette", selections.silhouette);
  const fabricOption = findOption("fabric", selections.fabric);

  function shareLink() {
    const params = new URLSearchParams(selections).toString();
    const url = `${window.location.origin}/atelier?${params}`;
    navigator.clipboard?.writeText(url);
    setShareCopied(true);
    window.setTimeout(() => setShareCopied(false), 2000);
  }

  function addConfiguredToBag() {
    const label = `${silhouetteOption?.label} · ${fabricOption?.label} · ${colourOption?.label}`;
    addItem({
      productId: generateId("atelier-custom"),
      productSlug: "atelier-custom",
      productName: "Atelier Composition",
      variantLabel: label,
      variantColorHex: colourOption?.colorHex ?? "#0d0d0d",
      size: "Made to Measure",
      length: findOption("length", selections.length)?.label ?? "Standard",
      quantity: 1,
      unitPrice: price,
      atelierDesignId: generateId("atelier"),
    });
    setAddedToBag(true);
    window.setTimeout(() => setAddedToBag(false), 2400);
  }

  const consultationMessage = encodeURIComponent(
    `Hello, I'd like to discuss an Atelier composition: ${silhouetteOption?.label}, ${fabricOption?.label}, ${colourOption?.label}. Estimated price ${formatPrice(price)}.`,
  );

  return (
    <div className="border-t border-ink/10 pt-6 lg:border-t-0 lg:pt-0">
      <p className="text-label uppercase tracking-[0.14em] text-stone">Your Composition</p>
      <dl className="mt-3 space-y-1.5 text-caption text-stone">
        {atelierSteps.map((step) => {
          const option = findOption(step.id, selections[step.id]);
          return (
            <div key={step.id} className="flex justify-between gap-4">
              <dt>{step.label}</dt>
              <dd className="text-right text-ink">{option?.label}</dd>
            </div>
          );
        })}
      </dl>

      <p className="mt-4 flex items-baseline justify-between border-t border-ink/10 pt-4 text-h3">
        <span className="text-body text-stone">Estimated Price</span>
        {formatPrice(price)}
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <Button onClick={addConfiguredToBag} className="w-full justify-center">
          {addedToBag ? "Added to Bag" : "Add to Bag"}
        </Button>
        <Button
          variant="secondary"
          className="w-full justify-center"
          onClick={() => {
            saveDesign(`${silhouetteOption?.label} Composition`);
            setSaved(true);
            window.setTimeout(() => setSaved(false), 2000);
          }}
        >
          {saved ? "Design Saved" : "Save Design"}
        </Button>
        <a
          href={`${WHATSAPP_HREF}?text=${consultationMessage}`}
          target="_blank"
          rel="noreferrer"
          className="text-center text-caption uppercase tracking-[0.08em] underline"
        >
          Request Consultation
        </a>
      </div>

      <div className="mt-4 flex items-center justify-between text-caption text-stone">
        <button type="button" onClick={undo} disabled={history.length === 0} className="underline disabled:opacity-30 disabled:no-underline">
          Undo
        </button>
        <button type="button" onClick={reset} className="underline">
          Reset
        </button>
        <button type="button" onClick={shareLink} className="underline">
          {shareCopied ? "Link Copied" : "Share"}
        </button>
      </div>
    </div>
  );
}
