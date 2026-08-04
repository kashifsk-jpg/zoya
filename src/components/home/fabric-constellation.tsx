"use client";

import { useState } from "react";
import { TextileStudy, type TextileTone } from "@/components/editorial/textile-study";
import { fabrics } from "@/lib/fabrics";
import { cn } from "@/lib/utils";

const TONES: TextileTone[] = ["obsidian", "stone", "sand", "burgundy", "gold", "ivory"];

const FLOAT_OFFSETS = ["md:translate-y-0", "md:translate-y-10", "md:-translate-y-6", "md:translate-y-4", "md:-translate-y-10", "md:translate-y-2"];

export function FabricConstellation() {
  const [activeId, setActiveId] = useState(fabrics[0].id);
  const active = fabrics.find((f) => f.id === activeId) ?? fabrics[0];

  return (
    <section className="bg-warm-ivory py-24 text-ink">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="max-w-xl">
          <span className="text-label uppercase tracking-[0.14em] text-stone">Material Study</span>
          <h2 className="mt-4 font-serif text-display-l">Ten fabrics, ten kinds of movement.</h2>
          <p className="mt-4 text-editorial text-stone">
            Every silhouette begins as a question of cloth. Select a fabric to see how it moves, drapes and
            catches light differently from the rest.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {fabrics.map((fabric, i) => (
            <button
              key={fabric.id}
              type="button"
              onClick={() => setActiveId(fabric.id)}
              onFocus={() => setActiveId(fabric.id)}
              className={cn(
                "group relative text-left transition-transform duration-500",
                FLOAT_OFFSETS[i % FLOAT_OFFSETS.length],
              )}
              aria-pressed={activeId === fabric.id}
            >
              <TextileStudy
                seed={fabric.id}
                alt={`${fabric.name} fabric study`}
                aspect="detail"
                tone={TONES[i % TONES.length]}
                showStitching={fabric.motion === "structural"}
                className={cn(
                  "outline outline-1 outline-ink/10 transition-all duration-300",
                  activeId === fabric.id ? "outline-gold" : "group-hover:outline-ink/30",
                )}
              />
              <p className="mt-2 text-caption uppercase tracking-[0.08em] text-stone">{fabric.name}</p>
            </button>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 border-t border-ink/10 pt-8 md:grid-cols-4">
          <div>
            <p className="text-label uppercase tracking-[0.14em] text-stone">Weight</p>
            <p className="mt-2 text-body">{active.weight}</p>
          </div>
          <div>
            <p className="text-label uppercase tracking-[0.14em] text-stone">Texture</p>
            <p className="mt-2 text-body">{active.texture}</p>
          </div>
          <div>
            <p className="text-label uppercase tracking-[0.14em] text-stone">Drape</p>
            <p className="mt-2 text-body">{active.drape}</p>
          </div>
          <div>
            <p className="text-label uppercase tracking-[0.14em] text-stone">Recommended for</p>
            <p className="mt-2 text-body">{active.recommendedOccasion.join(", ")}</p>
            <p className="mt-3 text-caption text-stone">{active.care}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
