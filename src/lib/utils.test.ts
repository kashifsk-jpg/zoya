import { describe, expect, it } from "vitest";
import { formatPrice } from "./utils";

// Intl.NumberFormat separates the currency code from the amount with a
// non-breaking space (U+00A0), not a regular space.
const NBSP = " ";

describe("formatPrice", () => {
  it("formats whole AED amounts without decimals", () => {
    expect(formatPrice(1450)).toBe(`AED${NBSP}1,450`);
  });

  it("rounds fractional amounts to the nearest whole currency unit", () => {
    expect(formatPrice(1450.4)).toBe(`AED${NBSP}1,450`);
  });

  it("supports an explicit currency override", () => {
    expect(formatPrice(100, "USD")).toContain("100");
  });
});
