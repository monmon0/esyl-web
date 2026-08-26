"use client";

/**
 * A minimal centered modal: dark glass panel over a blurred backdrop,
 * closable via the × button, backdrop click, or Escape. Portaled to
 * <body> so it sits in true viewport space regardless of any transformed
 * ancestor (same reasoning as screen-ripple.tsx).
 */

import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { NARISS_BLACK } from "@/lib/colors";

function subscribeNever() {
  return () => {};
}

function useIsClient() {
  return useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );
}

export function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  const isClient = useIsClient();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!isClient || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div
        aria-hidden
        onClick={onClose}
        className="absolute inset-0 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative max-h-[85vh] w-full max-w-md overflow-y-auto rounded-2xl border p-6 shadow-2xl"
        style={{ backgroundColor: `${NARISS_BLACK}`, borderColor: "rgba(255,255,255,0.15)" }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
