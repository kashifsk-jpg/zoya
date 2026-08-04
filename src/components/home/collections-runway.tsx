import Link from "next/link";
import { TextileStudy, type TextileTone } from "@/components/editorial/textile-study";
import { getFeaturedProducts } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

const TONES: TextileTone[] = ["obsidian", "burgundy", "stone", "gold", "sand"];

export function CollectionsRunway() {
  const runway = getFeaturedProducts();

  return (
    <section className="bg-alabaster py-24">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <span className="text-label uppercase tracking-[0.14em] text-stone">The Runway</span>
        <h2 className="mt-4 max-w-lg font-serif text-display-l">Five silhouettes, five constructions.</h2>
      </div>

      <div className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 md:px-10 [scrollbar-width:thin]">
        {runway.map((product, i) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group relative w-[70vw] shrink-0 snap-start sm:w-[40vw] lg:w-[24vw]"
            style={{ marginTop: `${(i % 3) * 12}px` }}
          >
            <TextileStudy
              seed={product.images[0].src}
              alt={product.images[0].alt}
              aspect="portrait"
              tone={TONES[i % TONES.length]}
              showStitching={product.embroideryType !== "None"}
              className="transition-opacity duration-500 group-hover:opacity-90"
            />
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-body">{product.name}</span>
              <span className="text-meta text-stone">{formatPrice(product.price)}</span>
            </div>
            <p className="text-caption text-stone">{product.constructionDetails[0]}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
