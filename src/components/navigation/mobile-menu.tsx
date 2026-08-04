"use client";

import Link from "next/link";
import { Dialog } from "@/components/ui/dialog";
import { useLocaleStore, dictionary } from "@/store/locale-store";

const LINKS = [
  { key: "shop", href: "/collections" },
  { key: "atelier", href: "/atelier" },
  { key: "craft", href: "/craft" },
  { key: "journal", href: "/journal" },
] as const;

const SECONDARY = [
  { key: "account", href: "/account" },
  { key: "wishlist", href: "/wishlist" },
  { key: "bag", href: "/bag" },
] as const;

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { locale, toggle } = useLocaleStore();
  const t = dictionary[locale];

  return (
    <Dialog open={open} onClose={onClose} labelledBy="mobile-menu-heading" placement="fullscreen">
      <div className="flex h-full w-full flex-col bg-warm-ivory text-ink">
        <div className="flex items-center justify-between px-5 py-6">
          <span id="mobile-menu-heading" className="font-serif text-lg uppercase tracking-[0.22em]">
            Zoya Fashion
          </span>
          <button type="button" onClick={onClose} aria-label="Close menu" className="text-label uppercase tracking-[0.14em]">
            Close
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-center gap-2 px-5" aria-label="Mobile primary">
          {LINKS.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              onClick={onClose}
              className="border-b border-ink/10 py-4 font-serif text-display-l"
            >
              {t[link.key]}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-4 border-t border-ink/10 px-5 py-6">
          <div className="flex items-center justify-between">
            {SECONDARY.map((link) => (
              <Link key={link.key} href={link.href} onClick={onClose} className="text-label uppercase tracking-[0.14em]">
                {t[link.key]}
              </Link>
            ))}
          </div>
          <button
            type="button"
            onClick={toggle}
            className="self-start text-label uppercase tracking-[0.14em] text-stone"
          >
            {locale === "en" ? "العربية" : "English"}
          </button>
        </div>
      </div>
    </Dialog>
  );
}
