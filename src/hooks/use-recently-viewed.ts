"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "zoya-recently-viewed";
const MAX_ITEMS = 6;

export function useRecentlyViewed(currentSlug?: string) {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    const raw = window.localStorage.getItem(KEY);
    const stored: string[] = raw ? JSON.parse(raw) : [];
    if (currentSlug) {
      const next = [currentSlug, ...stored.filter((s) => s !== currentSlug)].slice(0, MAX_ITEMS);
      window.localStorage.setItem(KEY, JSON.stringify(next));
      // Persisting the visit is the actual effect; syncing the returned list
      // afterwards is a necessary side effect of that write, not derived state.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSlugs(next.filter((s) => s !== currentSlug));
    } else {
      setSlugs(stored);
    }
  }, [currentSlug]);

  const clear = useCallback(() => {
    window.localStorage.removeItem(KEY);
    setSlugs([]);
  }, []);

  return { slugs, clear };
}
