import type { Metadata } from "next";
import Link from "next/link";
import { TextileStudy, type TextileTone } from "@/components/editorial/textile-study";
import { collections } from "@/lib/collections";

export const metadata: Metadata = {
  title: "Collections",
  description: "Six collections, each built around a single idea in cut, fabric or craftsmanship.",
};

const TONES: TextileTone[] = ["obsidian", "burgundy", "stone", "gold", "sand", "ivory"];

export default function CollectionsPage() {
  return (
    <div className="bg-alabaster pt-28">
      <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10">
        <span className="text-label uppercase tracking-[0.14em] text-stone">Shop</span>
        <h1 className="mt-4 max-w-2xl font-serif text-display-l">Six collections, each built around a single idea.</h1>
        <Link
          href="/collections/all"
          className="mt-6 inline-block text-label uppercase tracking-[0.14em] underline decoration-1 underline-offset-4"
        >
          View all products
        </Link>
      </div>

      <div className="flex flex-col">
        {collections.map((collection, i) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.slug}`}
            className="group grid grid-cols-1 items-center border-t border-ink/10 lg:grid-cols-2"
          >
            <div className={i % 2 === 1 ? "order-1 lg:order-2" : "order-1"}>
              <TextileStudy
                seed={`${collection.slug}-index`}
                alt={`${collection.title} campaign`}
                aspect="landscape"
                tone={TONES[i % TONES.length]}
                className="h-[50vh] transition-opacity duration-500 group-hover:opacity-90"
              />
            </div>
            <div className={`px-5 py-16 md:px-16 ${i % 2 === 1 ? "order-2 lg:order-1" : "order-2"}`}>
              <span className="text-label uppercase tracking-[0.14em] text-stone">{collection.index}</span>
              <h2 className="mt-4 font-serif text-display-l">{collection.title}</h2>
              <p className="mt-4 max-w-md text-editorial text-stone">{collection.statement}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-label uppercase tracking-[0.14em]">
                <span className="border-b border-ink pb-0.5">Discover</span>
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
