"use client";

import { atelierSteps } from "@/lib/atelier-options";
import { useAtelierStore } from "@/store/atelier-store";
import { cn } from "@/lib/utils";

export function AtelierStepNav() {
  const stepIndex = useAtelierStore((s) => s.stepIndex);
  const goToStep = useAtelierStore((s) => s.goToStep);

  const items = [...atelierSteps.map((s) => s.label), "Review"];

  return (
    <nav aria-label="Atelier steps" className="flex flex-wrap gap-x-4 gap-y-2 overflow-x-auto pb-1">
      {items.map((label, i) => (
        <button
          key={label}
          type="button"
          onClick={() => goToStep(i)}
          aria-current={stepIndex === i ? "step" : undefined}
          className={cn(
            "whitespace-nowrap text-caption uppercase tracking-[0.08em] transition-colors",
            stepIndex === i ? "text-ink underline" : stepIndex > i ? "text-stone" : "text-stone/50",
          )}
        >
          {String(i + 1).padStart(2, "0")} {label}
        </button>
      ))}
    </nav>
  );
}
