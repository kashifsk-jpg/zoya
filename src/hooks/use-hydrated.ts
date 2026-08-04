"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** True only after the client has mounted — guards against SSR/persisted-store mismatches. */
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
