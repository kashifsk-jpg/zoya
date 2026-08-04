import { create } from "zustand";

export type Locale = "en" | "ar";

interface LocaleState {
  locale: Locale;
  toggle: () => void;
}

export const useLocaleStore = create<LocaleState>()((set) => ({
  locale: "en",
  toggle: () => set((state) => ({ locale: state.locale === "en" ? "ar" : "en" })),
}));

export const dictionary = {
  en: {
    shop: "Shop",
    collections: "Collections",
    atelier: "Atelier",
    craft: "Craft",
    journal: "Journal",
    search: "Search",
    account: "Account",
    wishlist: "Wishlist",
    bag: "Bag",
    locale: "AR",
    scrollToDiscover: "Scroll to discover",
    exploreCollection: "Explore the Collection",
    enterAtelier: "Enter the Atelier",
  },
  ar: {
    shop: "تسوق",
    collections: "المجموعات",
    atelier: "أتيليه",
    craft: "الحرفية",
    journal: "المجلة",
    search: "بحث",
    account: "الحساب",
    wishlist: "المفضلة",
    bag: "الحقيبة",
    locale: "EN",
    scrollToDiscover: "مرري للاكتشاف",
    exploreCollection: "استكشفي المجموعة",
    enterAtelier: "ادخلي الأتيليه",
  },
} as const;
