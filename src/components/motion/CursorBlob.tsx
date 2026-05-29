"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * A soft glowing blob that follows the cursor on desktop.
 * Doesn't replace the cursor — sits behind interactive elements with
 * mix-blend-mode so the page still feels like a document.
 */
export default function CursorBlob() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 22, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[420px] w-[420px] rounded-full blur-3xl"
    >
      <div className="h-full w-full rounded-full opacity-[0.16] mix-blend-multiply bg-[radial-gradient(circle,_rgba(252,171,121,0.7),_rgba(244,211,94,0.55)_45%,_transparent_70%)]" />
    </motion.div>
  );
}
