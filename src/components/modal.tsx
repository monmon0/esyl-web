"use client";

/**
 * A minimal centered modal: dark glass panel over a blurred backdrop,
 * closable via the × button, backdrop click, or Escape. Portaled to
 * <body> so it sits in true viewport space regardless of any transformed
 * ancestor (same reasoning as screen-ripple.tsx).
 */

import {
  useEffect,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { NARISS_BLACK } from "@/lib/colors";

function subscribeNever() {
  return () => {};
}

function useIsClient() {
  return useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false
  );
}

export function Modal({
  open,
  onClose,
  children,
  aboveContent,
  panelClassName = "max-h-[85vh] w-full max-w-md overflow-y-auto rounded-2xl border p-6 shadow-2xl",
  panelStyle,
  backdropClassName = "absolute inset-0",
  closeButtonClassName = "absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white",
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Rendered above the panel, outside its background/border — for controls that shouldn't sit on the panel's own texture. */
  aboveContent?: ReactNode;
  panelClassName?: string;
  panelStyle?: CSSProperties;
  /** Overrides the backdrop's blur/darkness. Defaults to a bg-black/60 blur-sm scrim. */
  backdropClassName?: string;
  /** Overrides the × button's colors — the default assumes a dark panel. */
  closeButtonClassName?: string;
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
      <div aria-hidden onClick={onClose} className={backdropClassName} />
      <div className="relative z-10 flex flex-col items-center gap-3">
        {aboveContent}
        <div
          role="dialog"
          aria-modal="true"
          className={`relative ${panelClassName}`}
          style={{
            backgroundColor: NARISS_BLACK,
            borderColor: "rgba(255,255,255,0.15)",
            ...panelStyle,
          }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={closeButtonClassName}
          >
            ✕
          </button>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
