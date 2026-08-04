import type { Product } from "./types";

export interface ProductFilters {
  fabric?: string;
  occasion?: string;
  availability?: string;
  sort?: string;
}

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
] as const;

export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  return products.filter((p) => {
    if (filters.fabric && p.fabricId !== filters.fabric) return false;
    if (filters.occasion && !p.occasion.includes(filters.occasion as Product["occasion"][number])) return false;
    if (filters.availability && p.availability !== filters.availability) return false;
    return true;
  });
}

export function sortProducts(products: Product[], sort?: string): Product[] {
  const list = [...products];
  switch (sort) {
    case "newest":
      return list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    default:
      return list.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
  }
}
