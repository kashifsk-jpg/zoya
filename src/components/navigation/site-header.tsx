"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";
import { useBagStore, bagCount } from "@/store/bag-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useLocaleStore, dictionary } from "@/store/locale-store";
import { useHydrated } from "@/hooks/use-hydrated";
import { IconButton } from "@/components/ui/icon-button";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { SearchOverlay } from "@/components/navigation/search-overlay";
import { BagDrawer } from "@/components/commerce/bag-drawer";

const NAV_LEFT = [
  { key: "shop", href: "/collections/all" },
  { key: "collections", href: "/collections" },
  { key: "atelier", href: "/atelier" },
  { key: "craft", href: "/craft" },
  { key: "journal", href: "/journal" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const hydrated = useHydrated();

  const { mobileMenuOpen, bagDrawerOpen, searchOpen, setMobileMenu, setBagDrawer, setSearch } = useUIStore();
  const items = useBagStore((s) => s.items);
  const wishlistCount = useWishlistStore((s) => s.productIds.length);
  const { locale, toggle } = useLocaleStore();
  const t = dictionary[locale];

  useEffect(() => {
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
  }, [locale]);

  const count = hydrated ? bagCount(items) : 0;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-10 z-40 border-b border-ink/10 bg-alabaster/95 py-3 text-ink backdrop-blur-sm",
        )}
      >
        <div className="mx-auto grid max-w-[1600px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 px-5 md:px-10">
          <nav
            className="col-start-1 hidden min-w-0 items-center gap-5 overflow-x-auto whitespace-nowrap lg:flex"
            aria-label="Primary"
          >
            {NAV_LEFT.map((item) => {
              const active =
                item.href === "/collections"
                  ? pathname === "/collections" || (pathname.startsWith("/collections/") && pathname !== "/collections/all")
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-label uppercase tracking-[0.14em] underline decoration-1 underline-offset-4 transition-opacity",
                    active ? "opacity-100" : "opacity-80 decoration-transparent hover:opacity-100 hover:decoration-current",
                  )}
                >
                  {t[item.key]}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className="col-start-1 justify-self-start lg:hidden"
            aria-label="Open menu"
            onClick={() => setMobileMenu(true)}
          >
            <span className="text-label uppercase tracking-[0.14em]">Menu</span>
          </button>

          <Link
            href="/"
            className="col-start-2 shrink-0 whitespace-nowrap font-serif text-base tracking-[0.1em] uppercase justify-self-center sm:text-lg sm:tracking-[0.22em]"
          >
            Zoya<span className="hidden sm:inline"> Fashion</span>
          </Link>

          <div className="col-start-3 flex shrink-0 items-center justify-end gap-1">
            <IconButton label={t.search} onClick={() => setSearch(true)}>
              <SearchGlyph />
            </IconButton>
            <button
              type="button"
              onClick={toggle}
              className="hidden shrink-0 px-2 text-label uppercase tracking-[0.1em] lg:inline-flex"
              aria-label={locale === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
            >
              {t.locale}
            </button>
            <Link
              href="/account"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-105"
              aria-label={t.account}
            >
              <AccountGlyph />
            </Link>
            <Link
              href="/wishlist"
              className="relative hidden h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform hover:scale-105 lg:inline-flex"
              aria-label={`${t.wishlist}${hydrated && wishlistCount > 0 ? `, ${wishlistCount} items` : ""}`}
            >
              <HeartGlyph />
              {hydrated && wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] text-alabaster">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <IconButton
              label={`${t.bag}${count > 0 ? `, ${count} items` : ""}`}
              onClick={() => setBagDrawer(true)}
              className="relative"
            >
              <BagGlyph />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] text-alabaster">
                  {count}
                </span>
              )}
            </IconButton>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenu(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearch(false)} />
      <BagDrawer open={bagDrawerOpen} onClose={() => setBagDrawer(false)} />
    </>
  );
}

function SearchGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
function AccountGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3 15.5c1-3 3.5-4.5 6-4.5s5 1.5 6 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
function HeartGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M9 15.5S2.5 11.6 2.5 7.1A3.6 3.6 0 0 1 9 5a3.6 3.6 0 0 1 6.5 2.1c0 4.5-6.5 8.4-6.5 8.4Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function BagGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M5 6.5h8l.6 9.5H4.4L5 6.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M6.5 6.5V5a2.5 2.5 0 0 1 5 0v1.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
