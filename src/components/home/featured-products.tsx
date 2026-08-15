import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import { getFeaturedProducts } from "@/lib/products";

export function FeaturedProducts() {
  const products = getFeaturedProducts().slice(0, 6);

  return (
    <section className="bg-warm-ivory py-24">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-label uppercase tracking-[0.14em] text-stone">Featured</span>
            <h2 className="mt-4 font-serif text-display-l">Considered pieces, this season.</h2>
          </div>
          <Link href="/collections" className="hidden text-label uppercase tracking-[0.14em] underline decoration-1 underline-offset-4 md:inline">
            View all
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-5 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ProductCard product={products[0]} aspectOverride="portrait" priority />
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:col-span-5 lg:grid-cols-1">
            {products.slice(1, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4">
            {products.slice(3, 6).map((product) => (
              <ProductCard key={product.id} product={product} aspectOverride="landscape" />
            ))}
          </div>
        </div>

        <Link
          href="/collections"
          className="mt-10 inline-block text-label uppercase tracking-[0.14em] underline decoration-1 underline-offset-4 md:hidden"
        >
          View all products
        </Link>
      </div>
    </section>
  );
}
