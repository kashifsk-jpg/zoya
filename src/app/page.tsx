import { CollectionFilters } from "@/components/collections/collection-filters";
import { ProductGrid } from "@/components/collections/product-grid";
import { HomeHeroBanner } from "@/components/home/home-hero-banner";
import { HomeCategorySection } from "@/components/home/home-category-section";
import { products as allProducts, getProductsByCategoryGroup } from "@/lib/products";
import { filterProducts, sortProducts } from "@/lib/product-filtering";
import { CATEGORY_GROUPS } from "@/lib/collections";

const SECTION_SIZE = 8;

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

  // Pull highlights from the same CATEGORY_GROUPS definition that the
  // /collections/abayas and /collections/jewelry routes use, so the
  // products shown here and the count shown there can never drift apart
  // the way the old hardcoded ABAYA_COLLECTIONS set did.
  const abayaHighlights = getProductsByCategoryGroup(CATEGORY_GROUPS.abayas.collectionSlugs).slice(0, SECTION_SIZE);
  const jewelryHighlights = getProductsByCategoryGroup(CATEGORY_GROUPS.jewelry.collectionSlugs).slice(0, SECTION_SIZE);

  return (
    <div className="bg-alabaster pt-28">
      <HomeHeroBanner />

      <HomeCategorySection
        eyebrow="Shop"
        title="Abayas"
        viewAllHref="/collections/abayas"
        viewAllLabel="View All Abayas"
        products={abayaHighlights}
      />
      <HomeCategorySection
        eyebrow="Shop"
        title="Jewelry"
        viewAllHref="/collections/jewelry"
        viewAllLabel="View All Jewelry"
        products={jewelryHighlights}
      />

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
