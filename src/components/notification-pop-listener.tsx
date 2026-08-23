"use client";

/**
 * Global click feedback — any <button> or element marked data-pop plays the
 * notification-pop sound and radiates a small ring at the click point.
 */

import { useEffect, useState } from "react";
import { playSound } from "@/lib/sound-engine";
import { notificationPopSound } from "@/lib/notification-pop";
import { NARISS_ACCENT_BLUE } from "@/lib/colors";

interface Pop {
  id: number;
  x: number;
  y: number;
}

let popId = 0;
const POP_DURATION_MS = 500;

export function NotificationPopListener() {
  const [pops, setPops] = useState<Pop[]>([]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest("button, [data-pop]")) return;

      void playSound(notificationPopSound.dataUri, { volume: 0.6 });

      const id = ++popId;
      setPops((prev) => [...prev, { id, x: event.clientX, y: event.clientY }]);
      window.setTimeout(() => {
        setPops((prev) => prev.filter((pop) => pop.id !== id));
      }, POP_DURATION_MS);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      {pops.map((pop) => (
        <span
          key={pop.id}
          className="pointer-events-none fixed z-[999] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full [animation:notification-pop_0.5s_ease-out_forwards]"
          style={{
            left: pop.x,
            top: pop.y,
            border: `2px solid ${NARISS_ACCENT_BLUE}`,
          }}
        />
      ))}
    </>
  );
}
