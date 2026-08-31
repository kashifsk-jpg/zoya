import Link from "next/link";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import {
  InstagramGlyph,
  TikTokGlyph,
  PinterestGlyph,
  WhatsAppGlyph,
  FacebookGlyph,
  SnapchatGlyph,
} from "@/components/navigation/social-glyphs";
import { WHATSAPP_HREF, WHATSAPP_DISPLAY } from "@/lib/constants";

const COLUMNS = [
  {
    heading: "Shop",
    links: [
      { label: "Collections", href: "/collections" },
      { label: "Atelier", href: "/atelier" },
      { label: "Craft", href: "/craft" },
      { label: "Journal", href: "/journal" },
    ],
  },
  {
    heading: "Client Services",
    links: [
      { label: "Delivery", href: "/craft#delivery" },
      { label: "Returns", href: "/craft#returns" },
      { label: "Size Guide", href: "/craft#size-guide" },
      { label: "Care Guide", href: "/craft#care" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

const SOCIAL = [
  { label: "Instagram", href: "https://instagram.com/zoya.fashion.1990", Glyph: InstagramGlyph },
  { label: "TikTok", href: "https://www.tiktok.com/@kkzwolrd", Glyph: TikTokGlyph },
  { label: "Pinterest", href: "https://www.pinterest.com/cravesave/", Glyph: PinterestGlyph },
  { label: "Facebook", href: "https://www.facebook.com/zaini.khan.308359/", Glyph: FacebookGlyph },
  { label: "Snapchat", href: "https://snapchat.com", Glyph: SnapchatGlyph },
  { label: "WhatsApp", href: WHATSAPP_HREF, Glyph: WhatsAppGlyph },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-alabaster">
      <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-serif text-h3">Zoya Fashion</p>
            <p className="mt-1 font-serif text-caption italic text-gold">Modest Style, Timeless Elegance</p>
            <p className="mt-3 max-w-xs text-body text-alabaster/70">
              Abayas, prayer wear and modest jewelry for the modern UAE woman.
            </p>
            <ul className="mt-4 space-y-1.5 text-caption text-alabaster/70">
              <li>WhatsApp: {WHATSAPP_DISPLAY}</li>
              <li>Email: zufienterprises1990@gmail.com</li>
              <li>Shipping across the UAE · Cash on Delivery</li>
            </ul>
            <div className="mt-4">
              <NewsletterForm />
            </div>
            <p className="mt-2 max-w-xs text-caption text-alabaster/70">
              Considered releases, atelier notes and private appointment invitations. No noise.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.heading}>
              <p className="text-label uppercase tracking-[0.14em] text-alabaster/60">{column.heading}</p>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-body text-alabaster/80 hover:text-alabaster">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-alabaster/10 pt-6 md:flex-row md:items-center">
          <p className="text-caption text-alabaster/60">
            © Zoya Fashion {new Date().getFullYear()}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-3">
            {SOCIAL.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-alabaster/20 text-alabaster/80 transition-colors hover:border-alabaster/50 hover:text-alabaster"
                >
                  <social.Glyph />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
