import { describe, expect, it } from "vitest";
import { computeAtelierPrice } from "./atelier-store";
import { ATELIER_BASE_PRICE, atelierSteps } from "@/lib/atelier-options";

function defaultSelections() {
  const selections: Record<string, string> = {};
  for (const step of atelierSteps) selections[step.id] = step.options[0].id;
  return selections;
}

describe("computeAtelierPrice", () => {
  it("equals the base price when every step uses its default (zero-delta) option", () => {
    expect(computeAtelierPrice(defaultSelections())).toBe(ATELIER_BASE_PRICE);
  });

  it("adds the price delta for each non-default selection", () => {
    const selections = defaultSelections();
    selections.silhouette = "a-line"; // +60
    selections.embroidery = "full"; // +1400
    expect(computeAtelierPrice(selections)).toBe(ATELIER_BASE_PRICE + 60 + 1400);
  });

  it("ignores unknown option ids for a step rather than throwing", () => {
    const selections = defaultSelections();
    selections.silhouette = "not-a-real-option";
    expect(computeAtelierPrice(selections)).toBe(ATELIER_BASE_PRICE);
  });
});
