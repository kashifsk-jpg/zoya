import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BagLineItem {
  lineId: string;
  productId: string;
  productSlug: string;
  productName: string;
  variantLabel: string;
  variantColorHex: string;
  size: string;
  length: string;
  quantity: number;
  unitPrice: number;
  atelierDesignId?: string;
}

interface BagState {
  items: BagLineItem[];
  addItem: (item: Omit<BagLineItem, "lineId">) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clear: () => void;
}

export const useBagStore = create<BagState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) =>
              i.productId === item.productId &&
              i.variantLabel === item.variantLabel &&
              i.size === item.size &&
              i.length === item.length &&
              i.atelierDesignId === item.atelierDesignId,
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.lineId === existing.lineId ? { ...i, quantity: i.quantity + item.quantity } : i,
              ),
            };
          }
          const lineId = `${item.productId}-${item.variantLabel}-${item.size}-${item.length}-${Date.now()}`;
          return { items: [...state.items, { ...item, lineId }] };
        }),
      removeItem: (lineId) => set((state) => ({ items: state.items.filter((i) => i.lineId !== lineId) })),
      updateQuantity: (lineId, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.lineId === lineId ? { ...i, quantity } : i))
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "zoya-bag" },
  ),
);

export function bagSubtotal(items: BagLineItem[]) {
  return items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
}

export function bagCount(items: BagLineItem[]) {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}

export function bagItemHref(item: Pick<BagLineItem, "productSlug" | "atelierDesignId">) {
  return item.atelierDesignId ? "/atelier" : `/products/${item.productSlug}`;
}
