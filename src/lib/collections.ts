import type { CollectionSummary } from "./types";

export const collections: CollectionSummary[] = [
  {
    id: "obsidian-edit",
    slug: "the-obsidian-edit",
    index: "01",
    title: "The Obsidian Edit",
    statement: "Architectural black, defined by construction rather than ornament.",
    introduction:
      "Tonal seaming, restrained volume and a single considered line replace surface decoration. Black is treated as a study in construction — the collection reveals itself through cut, not embellishment.",
    colorTreatment: "obsidian",
  },
  {
    id: "evening-light",
    slug: "evening-light",
    index: "02",
    title: "Evening Light",
    statement: "Satin, crystal and metallic thread for occasions that ask for more light.",
    introduction:
      "Liquid satin bases carry fine metallic thread and hand-set crystal along the cuff and front edge. Movement is slow and deliberate, built for rooms with dim, warm light.",
    colorTreatment: "burgundy",
  },
  {
    id: "quiet-structure",
    slug: "quiet-structure",
    index: "03",
    title: "Quiet Structure",
    statement: "Workwear with a clean shoulder line and controlled pleating.",
    introduction:
      "Designed for the long working day: a set shoulder, a controlled box pleat at the back and fabric chosen for recovery over eight hours, not just first impression.",
    colorTreatment: "stone",
  },
  {
    id: "embroidered-atelier",
    slug: "the-embroidered-atelier",
    index: "04",
    title: "The Embroidered Atelier",
    statement: "Hand-guided threadwork, appliqué, pearls and bead detail.",
    introduction:
      "Each piece routes through hand-finishing after the base garment is cut. Thread density, bead placement and appliqué edges are set by hand, piece by piece — no two finish identically.",
    colorTreatment: "gold",
  },
  {
    id: "essential-nida",
    slug: "essential-nida",
    index: "05",
    title: "Essential Nida",
    statement: "Minimal everyday silhouettes built on fabric, drape and proportion alone.",
    introduction:
      "No embroidery, no embellishment — the entire collection is a study in matte Nida, cut to a small number of proportions refined over several seasons.",
    colorTreatment: "sand",
  },
];

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}
