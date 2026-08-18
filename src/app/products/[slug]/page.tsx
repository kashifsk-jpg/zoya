import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailInteractive } from "@/components/product/product-detail-interactive";
import { ProductDetailsAccordion } from "@/components/product/product-details-accordion";
import { RelatedProducts } from "@/components/product/related-products";
import { RecentlyViewedSection } from "@/components/product/recently-viewed-section";
import type { TextileTone } from "@/components/editorial/textile-study";
import { JsonLd } from "@/components/seo/json-ld";
import { getProduct, getRelatedProducts, products } from "@/lib/products";
import { getCollection } from "@/lib/collections";

const SCHEMA_AVAILABILITY: Record<string, string> = {
  "in-stock": "https://schema.org/InStock",
  "made-to-order": "https://schema.org/PreOrder",
  limited: "https://schema.org/LimitedAvailability",
  "sold-out": "https://schema.org/OutOfStock",
};

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
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: { title: product.name, description: product.description },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const tone = TONES[product.collectionSlug] ?? "obsidian";
  const collection = getCollection(product.collectionSlug);

  return (
    <div className="bg-alabaster pb-24 pt-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description,
          category: product.collectionSlug,
          offers: {
            "@type": "Offer",
            priceCurrency: product.currency,
            price: product.price,
            availability: SCHEMA_AVAILABILITY[product.availability],
            url: `https://zoya-fashion.example/products/${product.slug}`,
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Collections", item: "https://zoya-fashion.example/collections" },
            {
              "@type": "ListItem",
              position: 2,
              name: collection?.title ?? product.collectionSlug,
              item: `https://zoya-fashion.example/collections/${product.collectionSlug}`,
            },
            { "@type": "ListItem", position: 3, name: product.name, item: `https://zoya-fashion.example/products/${product.slug}` },
          ],
        }}
      />
      <ProductDetailInteractive product={product} tone={tone} />

      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          <div />
          <ProductDetailsAccordion product={product} />
        </div>

        <RelatedProducts products={related} />
        <RecentlyViewedSection currentSlug={product.slug} />
      </div>
    </div>
  );
}
