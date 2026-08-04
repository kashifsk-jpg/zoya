"use client";

import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";

const SIZE_TABLE = [
  { size: "XS", bust: "104", waist: "88", hip: "112" },
  { size: "S", bust: "112", waist: "96", hip: "120" },
  { size: "M", bust: "120", waist: "104", hip: "128" },
  { size: "L", bust: "128", waist: "112", hip: "136" },
  { size: "XL", bust: "136", waist: "120", hip: "144" },
  { size: "XXL", bust: "144", waist: "128", hip: "152" },
];

export function SizeGuideDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="text-caption uppercase tracking-[0.08em] underline">
        Size Guide
      </button>
      <Dialog open={open} onClose={() => setOpen(false)} labelledBy="size-guide-heading" placement="center" className="max-w-lg">
        <div className="max-h-[85vh] w-full overflow-y-auto bg-alabaster p-6">
          <div className="flex items-center justify-between">
            <h2 id="size-guide-heading" className="font-serif text-h3">
              Size Guide
            </h2>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close size guide" className="text-label uppercase tracking-[0.14em]">
              ✕
            </button>
          </div>
          <p className="mt-2 text-caption text-stone">
            Measurements in centimeters, representative across the current collection. Individual pieces may vary
            by ±1.5cm — see the product page for garment-specific measurements.
          </p>
          <table className="mt-6 w-full border-collapse text-body">
            <thead>
              <tr className="border-b border-ink/20 text-left text-label uppercase tracking-[0.08em] text-stone">
                <th className="py-2">Size</th>
                <th className="py-2">Bust</th>
                <th className="py-2">Waist</th>
                <th className="py-2">Hip</th>
              </tr>
            </thead>
            <tbody>
              {SIZE_TABLE.map((row) => (
                <tr key={row.size} className="border-b border-ink/10">
                  <td className="py-2">{row.size}</td>
                  <td className="py-2">{row.bust}</td>
                  <td className="py-2">{row.waist}</td>
                  <td className="py-2">{row.hip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Dialog>
    </>
  );
}
