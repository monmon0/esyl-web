"use client";

/**
 * Tracks whether the current page's hero content has finished loading, so
 * chrome that lives outside the page (the hamburger menu, mounted once in
 * the root layout) can stay hidden until there's something worth navigating
 * away from. Pages with no hero to wait on just leave this at its default
 * (loaded).
 */

import { usePathname } from "next/navigation";
import { createContext, useContext, useState, type ReactNode } from "react";

const GATED_PATHS = new Set(["/", "/settings"]);

type LoadingContextValue = {
  loaded: boolean;
  setLoaded: (loaded: boolean) => void;
};

const LoadingContext = createContext<LoadingContextValue | null>(null);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [loaded, setLoaded] = useState(() => !GATED_PATHS.has(pathname));

  return (
    <LoadingContext.Provider value={{ loaded, setLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
