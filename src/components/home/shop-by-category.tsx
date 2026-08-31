import Image from "next/image";
import Link from "next/link";

// Placeholder tile images pulled from the existing catalog (one representative
// product per category) — swap the `image` field here once real category
// photography is supplied.
const CATEGORIES = [
  { title: "Abayas", href: "/collections/abayas", image: "/images/products/black-floral-pink-front/1.jpeg" },
  { title: "Three-Piece Sets", href: "/collections/three-piece-sets", image: "/images/products/elegant-three-piece-abaya-set-beige/1.jpeg" },
  { title: "Jewelry", href: "/collections/jewelry", image: "/noon/pear-cut-sapphire-ring/model-closeup.jpg" },
  { title: "Prayer Dresses", href: "/collections/prayer-dresses", image: "/images/products/monochrome-polka-dot-prayer-dress/Main.jpg" },
  { title: "Hijab Caps", href: "/collections/hijab-caps", image: "/images/products/pleated-hijab-cap/1.png" },
  { title: "Scarves", href: "/collections/scarves", image: "/images/products/shimmering-champagne-gold-scarf/1.png" },
] as const;

export function ShopByCategory() {
  return (
    <section className="bg-alabaster py-20">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="text-center">
          <span className="text-label uppercase tracking-[0.14em] text-stone">Shop</span>
          <h2 className="mt-3 font-serif text-display-l">Shop By Category</h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-6">
          {CATEGORIES.map((c) => (
            <Link key={c.title} href={c.href} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden rounded-full bg-warm-ivory">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(min-width: 1024px) 16vw, 45vw"
                  className="rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-3 text-center text-label uppercase tracking-[0.1em] text-ink">{c.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
