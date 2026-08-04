import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { collections } from "@/lib/collections";
import { journalArticles } from "@/lib/journal";

const BASE_URL = "https://zoya-fashion.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/collections",
    "/collections/all",
    "/atelier",
    "/craft",
    "/journal",
    "/about",
    "/search",
    "/bag",
    "/wishlist",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const collectionRoutes = collections.map((c) => ({
    url: `${BASE_URL}/collections/${c.slug}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    lastModified: new Date(),
  }));

  const articleRoutes = journalArticles.map((a) => ({
    url: `${BASE_URL}/journal/${a.slug}`,
    lastModified: new Date(a.publishedAt),
  }));

  return [...staticRoutes, ...collectionRoutes, ...productRoutes, ...articleRoutes];
}
