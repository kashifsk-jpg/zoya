import { CollectionFilters } from "@/components/collections/collection-filters";
import { ProductGrid } from "@/components/collections/product-grid";
import { products as allProducts } from "@/lib/products";
import { filterProducts, sortProducts } from "@/lib/product-filtering";

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const query = await searchParams;

  const filters = {
    fabric: asString(query.fabric),
    occasion: asString(query.occasion),
    availability: asString(query.availability),
  };
  const sort = asString(query.sort);

  const filtered = sortProducts(filterProducts(allProducts, filters), sort);

  return (
    <div className="bg-alabaster pt-28">
      <div className="mx-auto max-w-[1600px] px-5 py-6 md:px-10 md:py-8">
        <span className="text-label uppercase tracking-[0.14em] text-stone">Shop</span>
        <h1 className="mt-2 font-serif text-display-l">All Products</h1>
      </div>

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
