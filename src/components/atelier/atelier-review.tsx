"use client";

import { atelierSteps, findOption } from "@/lib/atelier-options";
import { useAtelierStore } from "@/store/atelier-store";

export function AtelierReview() {
  const selections = useAtelierStore((s) => s.selections);
  const goToStep = useAtelierStore((s) => s.goToStep);

  return (
    <div>
      <h2 className="font-serif text-h2">Review Your Composition</h2>
      <p className="mt-2 max-w-md text-body text-stone">
        Every choice below can still be adjusted before you save it or add it to your bag.
      </p>

      <dl className="mt-8 divide-y divide-ink/10 border-t border-ink/10">
        {atelierSteps.map((step, i) => {
          const option = findOption(step.id, selections[step.id]);
          return (
            <div key={step.id} className="flex items-center justify-between py-4">
              <div>
                <dt className="text-label uppercase tracking-[0.14em] text-stone">{step.label}</dt>
                <dd className="mt-1 text-body">{option?.label}</dd>
              </div>
              <button type="button" onClick={() => goToStep(i)} className="text-caption uppercase tracking-[0.08em] underline">
                Edit
              </button>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
