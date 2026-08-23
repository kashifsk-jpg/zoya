"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

const PAGE_SIZE_OPTIONS = [50, 100] as const;
const DEFAULT_PAGE_SIZE = 50;

export function ProductGrid({ products }: { products: Product[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const perPage = (() => {
    const raw = Number(searchParams.get("perPage"));
    return PAGE_SIZE_OPTIONS.includes(raw as (typeof PAGE_SIZE_OPTIONS)[number]) ? raw : DEFAULT_PAGE_SIZE;
  })();

  const totalPages = Math.max(1, Math.ceil(products.length / perPage));
  const requestedPage = Number(searchParams.get("page")) || 1;
  const currentPage = Math.min(Math.max(1, requestedPage), totalPages);

  function updateParams(next: { page?: number; perPage?: number }) {
    const params = new URLSearchParams(searchParams.toString());
    if (next.perPage !== undefined) params.set("perPage", String(next.perPage));
    if (next.page !== undefined) params.set("page", String(next.page));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  // Keep the URL's page param in sync if filtering shrinks the result set below the current page.
  useEffect(() => {
    if (requestedPage !== currentPage) {
      updateParams({ page: currentPage });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestedPage, currentPage]);

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <p className="font-serif text-h3">No pieces match these filters.</p>
        <p className="max-w-sm text-body text-stone">
          Try clearing a filter, or explore the full collection to see everything available.
        </p>
        <Button href="/collections" variant="secondary" className="mt-2">
          View All Collections
        </Button>
      </div>
    );
  }

  const start = (currentPage - 1) * perPage;
  const visible = products.slice(start, start + perPage);

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-5 md:grid-cols-3 md:gap-y-12">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-14 flex flex-col items-center gap-6">
        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => updateParams({ page })} />
        )}

        <label className="flex items-center gap-2 text-label uppercase tracking-[0.14em] text-stone">
          Show
          <select
            value={perPage}
            onChange={(e) => updateParams({ perPage: Number(e.target.value), page: 1 })}
            className="border-b border-ink/20 bg-transparent py-1 text-body normal-case tracking-normal text-ink"
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </select>
        </label>
      </div>

      {products.length > 0 && (
        <p className="mt-6 text-center text-caption text-stone">
          Can&rsquo;t find your fit? <Link href="/atelier" className="underline">Compose one in the Atelier.</Link>
        </p>
      )}
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav aria-label="Pagination" className="flex items-center gap-1.5">
      <PageButton disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} aria-label="Previous page">
        ←
      </PageButton>
      {pages.map((page, i) =>
        page === "ellipsis" ? (
          <span key={`ellipsis-${i}`} className="px-2 text-caption text-stone">
            …
          </span>
        ) : (
          <PageButton key={page} active={page === currentPage} onClick={() => onPageChange(page)} aria-label={`Page ${page}`}>
            {page}
          </PageButton>
        )
      )}
      <PageButton
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        →
      </PageButton>
    </nav>
  );
}

function PageButton({
  children,
  active,
  disabled,
  onClick,
  "aria-label": ariaLabel,
}: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  "aria-label": string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-current={active ? "page" : undefined}
      aria-label={ariaLabel}
      className={cn(
        "flex h-9 min-w-9 items-center justify-center px-2 text-caption transition-colors",
        active ? "bg-ink text-alabaster" : "text-ink hover:bg-ink/10",
        disabled && "cursor-not-allowed opacity-30 hover:bg-transparent"
      )}
    >
      {children}
    </button>
  );
}

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  const delta = 1;
  const range: (number | "ellipsis")[] = [];
  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  range.push(1);
  if (left > 2) range.push("ellipsis");
  for (let i = left; i <= right; i++) range.push(i);
  if (right < total - 1) range.push("ellipsis");
  if (total > 1) range.push(total);

  return range;
}
