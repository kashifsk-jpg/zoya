import { create } from "zustand";

interface UIState {
  mobileMenuOpen: boolean;
  bagDrawerOpen: boolean;
  searchOpen: boolean;
  setMobileMenu: (open: boolean) => void;
  setBagDrawer: (open: boolean) => void;
  setSearch: (open: boolean) => void;
  closeAll: () => void;
}

export const useUIStore = create<UIState>()((set) => ({
  mobileMenuOpen: false,
  bagDrawerOpen: false,
  searchOpen: false,
  setMobileMenu: (open) => set({ mobileMenuOpen: open }),
  setBagDrawer: (open) => set({ bagDrawerOpen: open }),
  setSearch: (open) => set({ searchOpen: open }),
  closeAll: () => set({ mobileMenuOpen: false, bagDrawerOpen: false, searchOpen: false }),
}));
