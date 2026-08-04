"use client";

import { Suspense } from "react";
import { ProductViewer3D } from "@/components/product/product-viewer-3d";
import { Button } from "@/components/ui/button";
import { AtelierStepNav } from "@/components/atelier/atelier-step-nav";
import { AtelierStepPanel } from "@/components/atelier/atelier-step-panel";
import { AtelierReview } from "@/components/atelier/atelier-review";
import { AtelierSummary } from "@/components/atelier/atelier-summary";
import { AtelierMobileBar } from "@/components/atelier/atelier-mobile-bar";
import { AtelierUrlSync } from "@/components/atelier/atelier-url-sync";
import { atelierSteps, findOption } from "@/lib/atelier-options";
import { useAtelierStore } from "@/store/atelier-store";

export function AtelierExperience() {
  const stepIndex = useAtelierStore((s) => s.stepIndex);
  const selections = useAtelierStore((s) => s.selections);
  const nextStep = useAtelierStore((s) => s.nextStep);
  const prevStep = useAtelierStore((s) => s.prevStep);
  const isReview = stepIndex === atelierSteps.length;
  const colourOption = findOption("colour", selections.colour);

  return (
    <div className="bg-alabaster pt-20">
      <Suspense fallback={null}>
        <AtelierUrlSync />
      </Suspense>

      <div className="border-b border-ink/10 px-5 py-6 md:px-10">
        <span className="text-label uppercase tracking-[0.14em] text-stone">The Atelier</span>
        <h1 className="mt-2 font-serif text-h1">Compose your abaya.</h1>
      </div>

      <div className="lg:grid lg:grid-cols-[1fr_380px]">
        <div className="lg:sticky lg:top-0 lg:h-[calc(100vh-73px)]">
          <ProductViewer3D colorHex={colourOption?.colorHex ?? "#0d0d0d"} seed="atelier-composition" productName="Your Atelier Composition" />
        </div>

        <div className="hidden border-l border-ink/10 p-8 lg:block lg:overflow-y-auto">
          <AtelierSummary />
        </div>
      </div>

      <div className="px-5 py-12 md:px-10">
        <AtelierStepNav />
        <div className="mt-8">{isReview ? <AtelierReview /> : <AtelierStepPanel />}</div>

        <div className="mt-10 flex items-center justify-between border-t border-ink/10 pt-6">
          <button
            type="button"
            onClick={prevStep}
            disabled={stepIndex === 0}
            className="text-label uppercase tracking-[0.14em] disabled:opacity-30"
          >
            ← Back
          </button>
          {!isReview && (
            <Button onClick={nextStep} showArrow>
              {stepIndex === atelierSteps.length - 1 ? "Review" : "Continue"}
            </Button>
          )}
        </div>
      </div>

      <div className="lg:hidden">
        <AtelierMobileBar />
      </div>
    </div>
  );
}
