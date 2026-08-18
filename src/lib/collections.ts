import type { CollectionSummary } from "./types";

export const collections: CollectionSummary[] = [
  {
    id: "signature-abayas",
    slug: "signature-abayas",
    index: "01",
    title: "Signature Abayas",
    statement: "Everyday and occasion abayas in nida, lace and crystal-embroidered finishes.",
    introduction:
      "Our core line of single-piece and reversible abayas — floral embroidery, crystal work and lace detailing across nida and premium flowy fabrics, sized for daily wear through to Eid and special occasions.",
    colorTreatment: "obsidian",
  },
  {
    id: "three-piece-sets",
    slug: "three-piece-sets",
    index: "02",
    title: "Three-Piece Sets",
    statement: "Outer abaya, inner dress and matching hijab, styled as one complete look.",
    introduction:
      "Coordinated sets built from an embroidered outer abaya, a matching inner dress and a coordinating scarf or hijab — designed for Eid, weddings and gatherings where a complete look matters.",
    colorTreatment: "gold",
  },
  {
    id: "fine-jewelry",
    slug: "fine-jewelry",
    index: "03",
    title: "Fine Jewelry",
    statement: "Rings and statement pieces to finish a look, from everyday to occasion wear.",
    introduction:
      "A small edit of rings — faceted centre stones with pavé halos in rhodium-plated settings, sized for everyday wear through to Eid and evening occasions.",
    colorTreatment: "burgundy",
  },
  {
    id: "prayer-dresses",
    slug: "prayer-dresses",
    index: "04",
    title: "Prayer Dresses",
    statement: "Lightweight, breathable prayer dresses with attached headscarves.",
    introduction:
      "Soft cotton prayer dresses with elasticated cuffs and an attached matching headscarf, designed for effortless coverage during prayer and Ramadan.",
    colorTreatment: "ivory",
  },
  {
    id: "hijab-caps",
    slug: "hijab-caps",
    index: "05",
    title: "Hijab Caps",
    statement: "Soft, snug-fit inner caps that give the hijab a smooth, well-shaped base.",
    introduction:
      "Soft, snug-fit hijab caps in jersey-cotton, designed to keep hair secured and give the hijab a smooth, well-shaped base for everyday wear.",
    colorTreatment: "stone",
  },
  {
    id: "scarves",
    slug: "scarves",
    index: "06",
    title: "Scarves",
    statement: "Drape scarves and shawls to layer over any look.",
    introduction:
      "Sheer chiffon drapes and woven scarves with metallic sheen or beadwork trim, designed to layer effortlessly over abayas and everyday wear.",
    colorTreatment: "sand",
  },
];

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}
