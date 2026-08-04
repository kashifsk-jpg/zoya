import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchPageContent } from "@/components/search/search-page-content";

export const metadata: Metadata = { title: "Search" };

export default function SearchPage() {
  return (
    <div className="bg-alabaster pt-24">
      <Suspense fallback={null}>
        <SearchPageContent />
      </Suspense>
    </div>
  );
}
