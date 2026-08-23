import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TextileStudy, type TextileTone } from "@/components/editorial/textile-study";
import { CollectionFilters } from "@/components/collections/collection-filters";
import { ProductGrid } from "@/components/collections/product-grid";
import { collections, getCollection } from "@/lib/collections";
import { getProductsByCollection, products as allProducts } from "@/lib/products";
import { filterProducts, sortProducts } from "@/lib/product-filtering";

const TONES: Record<string, TextileTone> = {
  "signature-abayas": "obsidian",
  "three-piece-sets": "gold",
  "fine-jewelry": "burgundy",
  "prayer-dresses": "ivory",
  "hijab-caps": "stone",
  scarves: "sand",
};

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateStaticParams() {
  return [...collections.map((c) => ({ slug: c.slug })), { slug: "all" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "all") return { title: "All Products" };
  const collection = getCollection(slug);
  if (!collection) return {};
  return { title: collection.title, description: collection.statement };
}

export default async function CollectionDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = await searchParams;

  const isAll = slug === "all";
  const collection = isAll ? null : getCollection(slug);
  if (!isAll && !collection) notFound();

  const baseProducts = isAll ? allProducts : getProductsByCollection(slug);

  const filters = {
    fabric: asString(query.fabric),
    occasion: asString(query.occasion),
    availability: asString(query.availability),
  };
  const sort = asString(query.sort);

  const filtered = sortProducts(filterProducts(baseProducts, filters), sort);

  return (
    <div className="bg-alabaster pt-28">
      {collection ? (
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 px-5 py-6 md:gap-10 md:px-10 md:py-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <span className="text-label uppercase tracking-[0.14em] text-stone">Collection {collection.index}</span>
            <h1 className="mt-4 font-serif text-display-l">{collection.title}</h1>
            <p className="mt-4 max-w-md text-editorial text-stone">{collection.introduction}</p>
          </div>
          <TextileStudy
            seed={`${collection.slug}-hero`}
            alt={`${collection.title} campaign visual`}
            aspect="landscape"
            tone={TONES[collection.slug] ?? "obsidian"}
            className="h-[40vh] lg:h-[50vh]"
          />
        </div>
      ) : (
        <div className="mx-auto max-w-[1600px] px-5 py-6 md:px-10 md:py-8">
          <span className="text-label uppercase tracking-[0.14em] text-stone">Shop</span>
          <h1 className="mt-2 font-serif text-display-l">All Products</h1>
        </div>
      )}

      <div className="mx-auto max-w-[1600px] px-5 pb-24 md:px-10">
        <CollectionFilters resultCount={filtered.length}>
          <ProductGrid products={filtered} />
        </CollectionFilters>
      </div>
    </div>
  );
}

function asString(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}
