import { describe, expect, it } from "vitest";
import { bagSubtotal, bagCount, bagItemHref, type BagLineItem } from "./bag-store";

function makeItem(overrides: Partial<BagLineItem> = {}): BagLineItem {
  return {
    lineId: "line-1",
    productId: "p-1",
    productSlug: "dalia-architectural-abaya",
    productName: "Dalia Architectural Abaya",
    variantLabel: "Obsidian",
    variantColorHex: "#0d0d0d",
    size: "M",
    length: 'Standard (56")',
    quantity: 1,
    unitPrice: 1450,
    ...overrides,
  };
}

describe("bagSubtotal", () => {
  it("sums unit price times quantity across lines", () => {
    const items = [makeItem({ unitPrice: 1000, quantity: 2 }), makeItem({ lineId: "line-2", unitPrice: 500, quantity: 1 })];
    expect(bagSubtotal(items)).toBe(2500);
  });

  it("returns 0 for an empty bag", () => {
    expect(bagSubtotal([])).toBe(0);
  });
});

describe("bagCount", () => {
  it("sums quantities across lines, not line count", () => {
    const items = [makeItem({ quantity: 3 }), makeItem({ lineId: "line-2", quantity: 2 })];
    expect(bagCount(items)).toBe(5);
  });
});

describe("bagItemHref", () => {
  it("links to the product page for a catalog item", () => {
    expect(bagItemHref({ productSlug: "dalia-architectural-abaya" })).toBe("/products/dalia-architectural-abaya");
  });

  it("links to the Atelier for a custom composition", () => {
    expect(bagItemHref({ productSlug: "atelier-custom", atelierDesignId: "atelier-123" })).toBe("/atelier");
  });
});
