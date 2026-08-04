import { describe, expect, it } from "vitest";
import { filterProducts, sortProducts } from "./product-filtering";
import { products } from "./products";

describe("filterProducts", () => {
  it("returns all products when no filters are set", () => {
    expect(filterProducts(products, {})).toHaveLength(products.length);
  });

  it("filters by fabric", () => {
    const result = filterProducts(products, { fabric: "matte-nida" });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((p) => p.fabricId === "matte-nida")).toBe(true);
  });

  it("filters by occasion", () => {
    const result = filterProducts(products, { occasion: "Wedding" });
    expect(result.every((p) => p.occasion.includes("Wedding"))).toBe(true);
  });

  it("filters by availability", () => {
    const result = filterProducts(products, { availability: "made-to-order" });
    expect(result.every((p) => p.availability === "made-to-order")).toBe(true);
  });

  it("combines multiple filters with AND semantics", () => {
    const result = filterProducts(products, { fabric: "hand-embroidered", occasion: "Wedding" });
    expect(result.every((p) => p.fabricId === "hand-embroidered" && p.occasion.includes("Wedding"))).toBe(true);
  });

  it("returns an empty array when nothing matches", () => {
    const result = filterProducts(products, { fabric: "lace", occasion: "Travel" });
    expect(result).toHaveLength(0);
  });
});

describe("sortProducts", () => {
  it("sorts featured products first by default", () => {
    const result = sortProducts(products);
    const firstNonFeaturedIndex = result.findIndex((p) => !p.isFeatured);
    const lastFeaturedIndex = result.map((p) => p.isFeatured).lastIndexOf(true);
    if (firstNonFeaturedIndex !== -1 && lastFeaturedIndex !== -1) {
      expect(lastFeaturedIndex).toBeLessThan(firstNonFeaturedIndex === -1 ? Infinity : result.length);
    }
  });

  it("sorts by price ascending", () => {
    const result = sortProducts(products, "price-asc");
    for (let i = 1; i < result.length; i++) {
      expect(result[i].price).toBeGreaterThanOrEqual(result[i - 1].price);
    }
  });

  it("sorts by price descending", () => {
    const result = sortProducts(products, "price-desc");
    for (let i = 1; i < result.length; i++) {
      expect(result[i].price).toBeLessThanOrEqual(result[i - 1].price);
    }
  });

  it("does not mutate the input array", () => {
    const copy = [...products];
    sortProducts(products, "price-asc");
    expect(products).toEqual(copy);
  });
});
