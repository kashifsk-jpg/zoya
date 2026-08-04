export interface AtelierOption {
  id: string;
  label: string;
  description: string;
  priceDelta: number;
  colorHex?: string;
}

export interface AtelierStep {
  id: string;
  label: string;
  helper: string;
  options: AtelierOption[];
}

export const ATELIER_BASE_PRICE = 1650;

export const atelierSteps: AtelierStep[] = [
  {
    id: "silhouette",
    label: "Silhouette",
    helper: "The foundation cut. Every later choice is composed against this line.",
    options: [
      { id: "straight", label: "Straight", description: "A single clean line from shoulder to hem.", priceDelta: 0 },
      { id: "a-line", label: "A-line", description: "Gentle width added from the waist down.", priceDelta: 60 },
      { id: "butterfly", label: "Butterfly", description: "Fuller volume at the arm, fitted at the wrist.", priceDelta: 120 },
      { id: "bisht", label: "Bisht", description: "An open overlay silhouette worn over a base garment.", priceDelta: 340 },
      { id: "pleated", label: "Pleated", description: "Controlled box pleats for structured movement.", priceDelta: 180 },
      { id: "layered", label: "Layered", description: "An independent overlay panel in a second fabric.", priceDelta: 260 },
    ],
  },
  {
    id: "fabric",
    label: "Fabric",
    helper: "Base cloth determines weight, drape and how later details will sit.",
    options: [
      { id: "matte-nida", label: "Matte Nida", description: "Dense, flat weave. Everyday structure.", priceDelta: 0 },
      { id: "silk-crepe", label: "Silk Crepe", description: "Fine pebbled surface, fluid movement.", priceDelta: 380 },
      { id: "satin", label: "Liquid Satin", description: "High-lustre face, slow dramatic waves.", priceDelta: 420 },
      { id: "linen-blend", label: "Linen Blend", description: "Breathable, faintly textured, casual.", priceDelta: 90 },
      { id: "jacquard", label: "Woven Jacquard", description: "Tonal pattern woven into the cloth.", priceDelta: 460 },
      { id: "chiffon-overlay", label: "Sheer Chiffon Overlay", description: "Lightest layer, worn over a lined base.", priceDelta: 340 },
    ],
  },
  {
    id: "colour",
    label: "Colour",
    helper: "Every colourway is produced from the same dye lot for consistency.",
    options: [
      { id: "obsidian", label: "Obsidian", description: "The house black.", priceDelta: 0, colorHex: "#0d0d0d" },
      { id: "ink", label: "Ink", description: "A softer near-black.", priceDelta: 0, colorHex: "#151515" },
      { id: "stone", label: "Stone", description: "Warm mid grey.", priceDelta: 0, colorHex: "#6e6963" },
      { id: "sand", label: "Desert Sand", description: "Warm neutral beige.", priceDelta: 0, colorHex: "#d4c5b9" },
      { id: "ivory", label: "Warm Ivory", description: "Soft off-white.", priceDelta: 40, colorHex: "#f4f0e9" },
      { id: "burgundy", label: "Deep Burgundy", description: "Editorial accent shade.", priceDelta: 80, colorHex: "#4a1420" },
    ],
  },
  {
    id: "sleeve",
    label: "Sleeve",
    helper: "Sleeve shape sets how the garment moves at the arm.",
    options: [
      { id: "straight", label: "Straight", description: "A clean, fitted line to the wrist.", priceDelta: 0 },
      { id: "flared", label: "Flared", description: "Widens gently from the elbow.", priceDelta: 70 },
      { id: "cuffed", label: "Cuffed", description: "Fitted wrist with a concealed closure.", priceDelta: 60 },
      { id: "pleated", label: "Pleated", description: "Fine pleats set at the shoulder seam.", priceDelta: 90 },
      { id: "layered", label: "Layered", description: "A second sleeve layer beneath the first.", priceDelta: 150 },
      { id: "bell", label: "Bell", description: "Dramatic width at the cuff opening.", priceDelta: 130 },
    ],
  },
  {
    id: "trim",
    label: "Trim",
    helper: "A fine detail at the edge — visible up close, quiet from a distance.",
    options: [
      { id: "none", label: "None", description: "No applied trim.", priceDelta: 0 },
      { id: "knitted", label: "Knitted Trim", description: "Fine-gauge knit at cuff and hem.", priceDelta: 110 },
      { id: "tonal-piping", label: "Tonal Piping", description: "A thin tonal edge along the front.", priceDelta: 90 },
      { id: "lace-edge", label: "Lace Edge", description: "Delicate lace along the hem.", priceDelta: 220 },
    ],
  },
  {
    id: "embroidery",
    label: "Embroidery Placement",
    helper: "Choose where hand or machine embroidery, if any, is placed.",
    options: [
      { id: "none", label: "None", description: "No embroidery.", priceDelta: 0 },
      { id: "cuff", label: "Cuff", description: "A concentrated detail at the wrist.", priceDelta: 260 },
      { id: "sleeve", label: "Sleeve", description: "A line following the sleeve seam.", priceDelta: 340 },
      { id: "shoulder", label: "Shoulder", description: "A detail set at the shoulder yoke.", priceDelta: 320 },
      { id: "front-edge", label: "Front Edge", description: "Following the open front from collar to hem.", priceDelta: 520 },
      { id: "back", label: "Back", description: "A composition set across the upper back.", priceDelta: 480 },
      { id: "hem", label: "Hem", description: "A line following the finished hem.", priceDelta: 380 },
      { id: "full", label: "Full Composition", description: "The most involved option, hand-threaded.", priceDelta: 1400 },
    ],
  },
  {
    id: "embellishment",
    label: "Embellishment",
    helper: "Layered on top of embroidery, or used alone for a lighter effect.",
    options: [
      { id: "none", label: "None", description: "No embellishment.", priceDelta: 0 },
      { id: "metallic-thread", label: "Metallic Thread", description: "Fine reflective thread accents.", priceDelta: 180 },
      { id: "tonal-thread", label: "Tonal Thread", description: "Same-colour thread, texture over contrast.", priceDelta: 120 },
      { id: "crystal", label: "Crystals", description: "Hand-set crystal, placed individually.", priceDelta: 620 },
      { id: "pearl", label: "Pearls", description: "Hand-set pearl beading.", priceDelta: 540 },
      { id: "beads", label: "Beads", description: "Fine glass bead detail.", priceDelta: 380 },
      { id: "applique", label: "Appliqué", description: "Layered fabric motifs, hand-applied.", priceDelta: 460 },
      { id: "lace", label: "Lace", description: "Lace panels set into the base cloth.", priceDelta: 340 },
    ],
  },
  {
    id: "length",
    label: "Length",
    helper: "Measured from shoulder to hem.",
    options: [
      { id: "petite", label: 'Petite (54")', description: "For heights up to 163cm.", priceDelta: 0 },
      { id: "standard", label: 'Standard (56")', description: "For heights 164–172cm.", priceDelta: 0 },
      { id: "tall", label: 'Tall (58")', description: "For heights 173cm and above.", priceDelta: 0 },
      { id: "custom", label: "Custom Length", description: "Measured to your specification.", priceDelta: 150 },
    ],
  },
];

export function findOption(stepId: string, optionId: string) {
  const step = atelierSteps.find((s) => s.id === stepId);
  return step?.options.find((o) => o.id === optionId);
}
