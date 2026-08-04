"use client";

import { atelierSteps } from "@/lib/atelier-options";
import { useAtelierStore } from "@/store/atelier-store";
import { cn, formatPrice } from "@/lib/utils";

export function AtelierStepPanel() {
  const stepIndex = useAtelierStore((s) => s.stepIndex);
  const selections = useAtelierStore((s) => s.selections);
  const setOption = useAtelierStore((s) => s.setOption);
  const step = atelierSteps[stepIndex];

  if (!step) return null;

  return (
    <div>
      <h2 className="font-serif text-h2">{step.label}</h2>
      <p className="mt-2 max-w-md text-body text-stone">{step.helper}</p>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {step.options.map((option) => {
          const active = selections[step.id] === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setOption(step.id, option.id)}
              aria-pressed={active}
              className={cn(
                "flex items-start gap-3 border p-4 text-left transition-colors",
                active ? "border-ink bg-ink text-alabaster" : "border-ink/15 hover:border-ink/40",
              )}
            >
              {option.colorHex && (
                <span
                  className="mt-0.5 h-6 w-6 shrink-0 rounded-full border border-current/20"
                  style={{ backgroundColor: option.colorHex }}
                  aria-hidden="true"
                />
              )}
              <span className="flex-1">
                <span className="block text-body">{option.label}</span>
                <span className={cn("mt-0.5 block text-caption", active ? "text-alabaster/70" : "text-stone")}>
                  {option.description}
                </span>
              </span>
              <span className={cn("shrink-0 text-caption", active ? "text-alabaster/70" : "text-stone")}>
                {option.priceDelta > 0 ? `+${formatPrice(option.priceDelta)}` : "Included"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
