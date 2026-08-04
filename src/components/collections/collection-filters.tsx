"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { fabrics } from "@/lib/fabrics";
import { SORT_OPTIONS } from "@/lib/product-filtering";
import type { Occasion } from "@/lib/types";
import { Dialog } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const OCCASIONS: Occasion[] = ["Everyday", "Work", "Evening", "Wedding", "Ramadan", "Eid", "Travel"];
const AVAILABILITY = [
  { value: "in-stock", label: "In Stock" },
  { value: "made-to-order", label: "Made to Order" },
  { value: "limited", label: "Limited" },
];

const FILTER_KEYS = ["fabric", "occasion", "availability"] as const;

export function CollectionFilters({ resultCount, children }: { resultCount: number; children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeFilters = FILTER_KEYS.map((key) => ({ key, value: searchParams.get(key) })).filter((f) => f.value);

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function clearAll() {
    const params = new URLSearchParams(searchParams.toString());
    for (const key of FILTER_KEYS) params.delete(key);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const controls = (
    <div className="flex flex-col gap-8">
      <FilterGroup label="Fabric">
        {fabrics.map((f) => (
          <FilterOption
            key={f.id}
            label={f.name}
            active={searchParams.get("fabric") === f.id}
            onClick={() => updateParam("fabric", searchParams.get("fabric") === f.id ? null : f.id)}
          />
        ))}
      </FilterGroup>
      <FilterGroup label="Occasion">
        {OCCASIONS.map((o) => (
          <FilterOption
            key={o}
            label={o}
            active={searchParams.get("occasion") === o}
            onClick={() => updateParam("occasion", searchParams.get("occasion") === o ? null : o)}
          />
        ))}
      </FilterGroup>
      <FilterGroup label="Availability">
        {AVAILABILITY.map((a) => (
          <FilterOption
            key={a.value}
            label={a.label}
            active={searchParams.get("availability") === a.value}
            onClick={() => updateParam("availability", searchParams.get("availability") === a.value ? null : a.value)}
          />
        ))}
      </FilterGroup>
    </div>
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-4">
        <p className="text-caption text-stone">{resultCount} pieces</p>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="text-label uppercase tracking-[0.14em] lg:hidden"
          >
            Filter
          </button>
          <label className="hidden items-center gap-2 text-label uppercase tracking-[0.14em] lg:flex">
            Sort
            <select
              value={searchParams.get("sort") ?? "featured"}
              onChange={(e) => updateParam("sort", e.target.value)}
              className="border-b border-ink/20 bg-transparent py-1 text-body normal-case tracking-normal"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {activeFilters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => updateParam(f.key, null)}
              className="flex items-center gap-1.5 border border-ink/20 px-3 py-1 text-caption uppercase tracking-[0.08em]"
            >
              {f.value} <span aria-hidden="true">×</span>
            </button>
          ))}
          <button type="button" onClick={clearAll} className="text-caption uppercase tracking-[0.08em] text-stone underline">
            Clear all
          </button>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[220px_1fr] lg:gap-12">
        <aside className="hidden lg:block">{controls}</aside>
        <div>{children}</div>
      </div>

      <Dialog open={drawerOpen} onClose={() => setDrawerOpen(false)} labelledBy="filter-drawer-heading" placement="bottom">
        <div className="max-h-[85vh] w-full overflow-y-auto rounded-t-lg bg-alabaster p-6">
          <div className="flex items-center justify-between">
            <h2 id="filter-drawer-heading" className="text-label uppercase tracking-[0.14em]">
              Filter
            </h2>
            <button type="button" onClick={() => setDrawerOpen(false)} className="text-label uppercase tracking-[0.14em]">
              Done
            </button>
          </div>
          <div className="mt-6">{controls}</div>
          {activeFilters.length > 0 && (
            <button type="button" onClick={clearAll} className="mt-6 text-caption uppercase tracking-[0.08em] text-stone underline">
              Clear all
            </button>
          )}
        </div>
      </Dialog>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-label uppercase tracking-[0.14em] text-stone">{label}</p>
      <div className="mt-3 flex flex-col gap-2">{children}</div>
    </div>
  );
}

function FilterOption({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn("text-left text-body transition-colors", active ? "text-ink underline" : "text-stone hover:text-ink")}
    >
      {label}
    </button>
  );
}
