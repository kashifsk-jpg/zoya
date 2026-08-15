export type AccuracyTag = "verified" | "representative" | "conceptual" | "unverified";

export type Occasion =
  | "Everyday"
  | "Work"
  | "Evening"
  | "Wedding"
  | "Ramadan"
  | "Eid"
  | "Travel";

export type FabricId =
  | "matte-nida"
  | "silk-crepe"
  | "satin"
  | "linen-blend"
  | "jacquard"
  | "knitted-trim"
  | "lace"
  | "chiffon-overlay"
  | "plain-unembroidered"
  | "hand-embroidered";

export interface Fabric {
  id: FabricId;
  name: string;
  weight: "Light" | "Medium" | "Heavy";
  texture: string;
  drape: string;
  recommendedOccasion: Occasion[];
  care: string;
  motion: "high-frequency" | "slow-wave" | "subdued" | "structural" | "still";
  accuracyTag: AccuracyTag;
}

export interface CollectionSummary {
  id: string;
  slug: string;
  index: string;
  title: string;
  statement: string;
  introduction: string;
  colorTreatment: string;
}

export interface ProductImage {
  src: string;
  alt: string;
  aspect: "portrait" | "detail" | "landscape";
}

export interface MaterialVariant {
  id: string;
  label: string;
  colorHex: string;
  fabricId: FabricId;
  swatchSrc?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameArabic?: string;
  collectionSlug: string;
  description: string;
  editorialDescription: string;
  price: number;
  compareAtPrice?: number;
  currency: "AED";
  colours: MaterialVariant[];
  sizes: string[];
  lengths: string[];
  fabricId: FabricId;
  cut: string;
  sleeve: string;
  occasion: Occasion[];
  embroideryType: string;
  embellishmentType: string;
  care: string[];
  availability: "in-stock" | "made-to-order" | "limited" | "sold-out";
  images: ProductImage[];
  videos?: string[];
  modelPath?: string;
  isNew?: boolean;
  isLimited?: boolean;
  isFeatured?: boolean;
  relatedProductIds: string[];
  modelMeasurements: string;
  productMeasurements: string;
  constructionDetails: string[];
  accuracyTag: AccuracyTag;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  category: string;
  readingTime: string;
  publishedAt: string;
}
