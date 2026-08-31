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
    home: "Home",
    abayas: "Abayas",
    jewelry: "Jewelry",
    prayerDresses: "Prayer Dresses",
    hijabCaps: "Hijab Caps",
    scarves: "Scarves",
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
    home: "الرئيسية",
    abayas: "عبايات",
    jewelry: "مجوهرات",
    prayerDresses: "أثواب الصلاة",
    hijabCaps: "كابات الحجاب",
    scarves: "حجابات",
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
