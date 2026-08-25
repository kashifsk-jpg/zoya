import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/lib/types";

interface HomeCategorySectionProps {
  eyebrow: string;
  title: string;
  viewAllHref: string;
  viewAllLabel: string;
  products: Product[];
}

export function HomeCategorySection({
  eyebrow,
  title,
  viewAllHref,
  viewAllLabel,
  products,
}: HomeCategorySectionProps) {
  if (products.length === 0) return null;

  return (
    <div className="mx-auto max-w-[1600px] px-5 py-10 md:px-10 md:py-14">
      <div className="flex items-end justify-between gap-4 border-b border-ink/10 pb-4">
        <div>
          <span className="text-label uppercase tracking-[0.14em] text-stone">{eyebrow}</span>
          <h2 className="mt-2 font-serif text-display-m">{title}</h2>
        </div>
        <Link
          href={viewAllHref}
          className="shrink-0 text-label uppercase tracking-[0.14em] underline decoration-1 underline-offset-4 opacity-80 hover:opacity-100"
        >
          {viewAllLabel}
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-5 md:grid-cols-4 md:gap-y-12">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
