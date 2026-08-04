import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/lib/types";

export function RelatedProducts({ products, title = "You May Also Like" }: { products: Product[]; title?: string }) {
  if (products.length === 0) return null;

  return (
    <section className="border-t border-ink/10 py-16">
      <h2 className="font-serif text-h2">{title}</h2>
      <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
