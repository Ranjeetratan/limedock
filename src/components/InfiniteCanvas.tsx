"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import {
  InfiniteCanvasR3F,
  MEDIA_MANIFEST,
} from "./infinite-canvas-3d";

/**
 * Fullscreen modal that hosts the React Three Fiber infinite canvas.
 * The scene itself is a near-verbatim port of
 *   github.com/edoardolunardi/infinite-canvas
 * adapted to our media library and mounted inside our overlay chrome
 * (hint pill on top, exit pill on bottom).
 */
export default function InfiniteCanvas({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Lock body scroll while open + Esc to close.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="canvas-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          className="fixed inset-0 z-[200] bg-white"
        >
          {/* The Three.js scene — drag/scroll/pinch/keyboard handled
              inside the controller. */}
          <InfiniteCanvasR3F media={MEDIA_MANIFEST} />

          {/* Top hint pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[210] flex items-center gap-2 rounded-full bg-canvas/90 backdrop-blur border border-hairline px-4 py-2 text-caption text-muted shadow-sm pointer-events-none"
          >
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-signature-coral animate-ping" />
              <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-signature-coral" />
            </span>
            Drag to pan · Scroll to zoom · WASD to fly · Infinite
          </motion.div>

          {/* Exit pill */}
          <motion.button
            type="button"
            onClick={onClose}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[210] inline-flex items-center gap-2 rounded-full bg-ink text-canvas px-5 py-3 text-body-md font-medium hover:scale-[1.04] active:scale-100 transition-transform shadow-lg"
            aria-label="Exit experience"
          >
            Exit experience
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 6L18 18M6 18L18 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
