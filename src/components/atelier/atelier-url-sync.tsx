"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { atelierSteps } from "@/lib/atelier-options";
import { useAtelierStore } from "@/store/atelier-store";

/** Loads a shared composition from the URL (see AtelierSummary's "Share" action) on first mount. */
export function AtelierUrlSync() {
  const searchParams = useSearchParams();
  const setOption = useAtelierStore((s) => s.setOption);
  const applied = useRef(false);

  useEffect(() => {
    if (applied.current) return;
    applied.current = true;
    for (const step of atelierSteps) {
      const value = searchParams.get(step.id);
      if (value && step.options.some((o) => o.id === value)) {
        setOption(step.id, value);
      }
    }
  }, [searchParams, setOption]);

  return null;
}
