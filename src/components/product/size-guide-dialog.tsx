"use client";

import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";

const SIZE_TABLE = [
  { letter: "S", size: "52", heightCm: "152 – 154", heightFt: "5' – 5'1\"", sleeve: "26.5", bust: "41" },
  { letter: "M", size: "54", heightCm: "157 – 160", heightFt: "5'2\" – 5'3\"", sleeve: "27", bust: "42" },
  { letter: "L", size: "56", heightCm: "162 – 165", heightFt: "5'4\" – 5'5\"", sleeve: "27.5", bust: "44" },
  { letter: "XL", size: "58", heightCm: "167 – 170", heightFt: "5'6\" – 5'7\"", sleeve: "28", bust: "45" },
  { letter: "XXL", size: "60", heightCm: "172 – 175", heightFt: "5'8\" – 5'9\"", sleeve: "28.5", bust: "47" },
  { letter: "—", size: "62", heightCm: "177 – 180", heightFt: "5'10\" – 5'11\"", sleeve: "29", bust: "48" },
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
              Abaya Size Chart
            </h2>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close size guide" className="text-label uppercase tracking-[0.14em]">
              ✕
            </button>
          </div>
          <p className="mt-2 text-caption text-stone">
            Find your size by height, or by sleeve and bust/chest measurement for a more precise fit.
          </p>
          <table className="mt-6 w-full border-collapse text-body">
            <thead>
              <tr className="border-b border-ink/20 text-left text-label uppercase tracking-[0.08em] text-stone">
                <th className="py-2">Size</th>
                <th className="py-2">Height (cm)</th>
                <th className="py-2">Height (ft)</th>
                <th className="py-2">Sleeve from neck (in)</th>
                <th className="py-2">Bust / Chest (in)</th>
              </tr>
            </thead>
            <tbody>
              {SIZE_TABLE.map((row) => (
                <tr key={row.size} className="border-b border-ink/10">
                  <td className="py-2">
                    {row.letter !== "—" && <span className="mr-1 text-ink">{row.letter}</span>}
                    <span className="text-stone">{row.size}</span>
                  </td>
                  <td className="py-2">{row.heightCm}</td>
                  <td className="py-2">{row.heightFt}</td>
                  <td className="py-2">{row.sleeve}</td>
                  <td className="py-2">{row.bust}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Dialog>
    </>
  );
}
