import { describe, expect, it } from "vitest";
import { hashSeed, seededRandom } from "./seeded-random";

describe("seededRandom", () => {
  it("produces the same sequence for the same seed", () => {
    const a = seededRandom("zoya-hero-body");
    const b = seededRandom("zoya-hero-body");
    const sequenceA = [a(), a(), a()];
    const sequenceB = [b(), b(), b()];
    expect(sequenceA).toEqual(sequenceB);
  });

  it("produces different sequences for different seeds", () => {
    const a = seededRandom("fabric-satin");
    const b = seededRandom("fabric-lace");
    expect(a()).not.toBe(b());
  });

  it("stays within the [0, 1) range", () => {
    const rand = seededRandom("range-check");
    for (let i = 0; i < 50; i++) {
      const value = rand();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });
});

describe("hashSeed", () => {
  it("is deterministic for the same input", () => {
    expect(hashSeed("abaya-01")).toBe(hashSeed("abaya-01"));
  });
});
