import Link from "next/link";
import { TextileStudy } from "@/components/editorial/textile-study";
import { collections } from "@/lib/collections";

export function CollectionStatement() {
  const featured = collections[1]; // Evening Light — seasonal lead

  return (
    <section className="bg-alabaster">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <TextileStudy
          seed={`${featured.slug}-campaign`}
          alt={`${featured.title} campaign visual`}
          aspect="landscape"
          tone="burgundy"
          className="h-[60vh] lg:h-full"
        />
        <div className="flex flex-col justify-center px-6 py-16 md:px-16 lg:py-0">
          <span className="text-label uppercase tracking-[0.14em] text-stone">
            Collection {featured.index} — New
          </span>
          <h2 className="mt-4 font-serif text-display-l">{featured.title}</h2>
          <p className="mt-4 max-w-md text-editorial text-stone">{featured.introduction}</p>
          <Link
            href={`/collections/${featured.slug}`}
            className="group mt-8 inline-flex w-fit items-center gap-2 text-label uppercase tracking-[0.14em]"
          >
            <span className="border-b border-ink pb-0.5">Discover the Collection</span>
            <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
