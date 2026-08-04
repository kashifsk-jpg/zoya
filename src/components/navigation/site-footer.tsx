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
import { WHATSAPP_HREF } from "@/lib/constants";

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
  { label: "Instagram", href: "https://instagram.com", Glyph: InstagramGlyph },
  { label: "TikTok", href: "https://tiktok.com", Glyph: TikTokGlyph },
  { label: "Pinterest", href: "https://pinterest.com", Glyph: PinterestGlyph },
  { label: "Facebook", href: "https://facebook.com", Glyph: FacebookGlyph },
  { label: "Snapchat", href: "https://snapchat.com", Glyph: SnapchatGlyph },
  { label: "WhatsApp", href: WHATSAPP_HREF, Glyph: WhatsAppGlyph },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-warm-ivory text-ink">
      <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-serif text-h3">Zoya Fashion</p>
            <p className="mt-1 font-serif text-caption italic text-gold">Modest Style, Timeless Elegance</p>
            <p className="mt-3 max-w-xs text-body text-stone">
              Contemporary abayas composed through fabric, form and craftsmanship.
            </p>
            <NewsletterForm />
            <p className="mt-2 max-w-xs text-caption text-stone">
              Considered releases, atelier notes and private appointment invitations. No noise.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.heading}>
              <p className="text-label uppercase tracking-[0.14em] text-stone">{column.heading}</p>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-body hover:text-stone">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-ink/10 pt-6 md:flex-row md:items-center">
          <p className="text-caption text-stone">
            © {new Date().getFullYear()} Zoya Fashion. Educational visualization project — not a live storefront.
          </p>
          <ul className="flex flex-wrap gap-3">
            {SOCIAL.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-stone transition-colors hover:border-ink/30 hover:text-ink"
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
