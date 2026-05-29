"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees. Lower = subtler. */
  max?: number;
  /** Whether to render a soft spotlight that follows the cursor. */
  spotlight?: boolean;
};

/**
 * 3D-tilt wrapper for cards. Tracks pointer to rotate around X/Y axes
 * with spring physics, and optionally paints a radial spotlight
 * the cursor drags across the surface.
 */
export default function TiltCard({
  children,
  className,
  max = 8,
  spotlight = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(0, { stiffness: 160, damping: 16 });
  const rotateY = useSpring(0, { stiffness: 160, damping: 16 });

  const spotlightX = useMotionTemplate`${useSpring(px, { stiffness: 160, damping: 18 })}`;
  const spotlightY = useMotionTemplate`${useSpring(py, { stiffness: 160, damping: 18 })}`;

  // Build a CSS background that follows the cursor
  const background = useMotionTemplate`radial-gradient(280px circle at calc(${spotlightX} * 100%) calc(${spotlightY} * 100%), rgba(255,255,255,0.16), transparent 60%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    px.set(x);
    py.set(y);
    rotateY.set((x - 0.5) * max * 2);
    rotateX.set(-(y - 0.5) * max * 2);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className={`relative will-change-transform ${className ?? ""}`}
    >
      {spotlight && (
        <motion.div
          aria-hidden
          style={{ background }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 hover:opacity-100 group-hover:opacity-100"
        />
      )}
      {children}
    </motion.div>
  );
}
