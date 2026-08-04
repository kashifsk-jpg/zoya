"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { ViewerPreset } from "@/components/three/garment-viewer-scene";
import { useWebglSupported } from "@/hooks/use-webgl-supported";
import { cn } from "@/lib/utils";

const GarmentViewerScene = dynamic(
  () => import("@/components/three/garment-viewer-scene").then((m) => m.GarmentViewerScene),
  { ssr: false, loading: () => <ViewerLoading /> },
);

const PRESETS: { id: ViewerPreset; label: string }[] = [
  { id: "front", label: "Front" },
  { id: "back", label: "Back" },
  { id: "sleeve", label: "Sleeve Detail" },
  { id: "embroidery", label: "Embroidery Detail" },
];

function ViewerLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-warm-ivory">
      <span className="text-caption uppercase tracking-[0.14em] text-stone">Loading 3D view…</span>
    </div>
  );
}

export function ProductViewer3D({
  colorHex,
  seed,
  productName,
}: {
  colorHex: string;
  seed: string;
  productName: string;
}) {
  const [preset, setPreset] = useState<ViewerPreset>("front");
  const [autoRotate, setAutoRotate] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const webglSupported = useWebglSupported();

  if (!webglSupported) {
    return (
      <div className="flex aspect-square w-full items-center justify-center bg-warm-ivory text-center text-caption text-stone">
        3D view isn&rsquo;t available on this device. Product imagery above shows the full garment.
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative aspect-square w-full",
        fullscreen && "fixed inset-0 z-50 aspect-auto bg-warm-ivory",
      )}
      role="group"
      aria-label={`Interactive 3D view of ${productName}. Drag to rotate, scroll to zoom.`}
    >
      <GarmentViewerScene colorHex={colorHex} autoRotate={autoRotate} preset={preset} seed={seed} />

      <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-2 bg-gradient-to-t from-ink/80 to-transparent p-3">
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPreset(p.id)}
              aria-pressed={preset === p.id}
              className={cn(
                "border px-2.5 py-1 text-micro uppercase tracking-[0.08em] text-alabaster",
                preset === p.id ? "border-gold bg-gold/20" : "border-alabaster/25",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setAutoRotate((v) => !v)}
            aria-pressed={autoRotate}
            className={cn(
              "border px-2.5 py-1 text-micro uppercase tracking-[0.08em] text-alabaster",
              autoRotate ? "border-gold bg-gold/20" : "border-alabaster/25",
            )}
          >
            Auto-rotate
          </button>
          <button
            type="button"
            onClick={() => setFullscreen((v) => !v)}
            className="border border-alabaster/25 px-2.5 py-1 text-micro uppercase tracking-[0.08em] text-alabaster"
          >
            {fullscreen ? "Exit Full Screen" : "Full Screen"}
          </button>
        </div>
      </div>
    </div>
  );
}
