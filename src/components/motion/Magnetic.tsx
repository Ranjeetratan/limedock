"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  type MotionStyle,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

type MagneticProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
  style?: MotionStyle;
  as?: "div" | "span" | "a";
  href?: string;
  target?: string;
  rel?: string;
};

/**
 * Wrap a CTA in <Magnetic> to make it gently follow the cursor.
 * Subtle, premium — never a circus.
 */
export default function Magnetic({
  children,
  strength = 18,
  className,
  style,
  as = "div",
  href,
  target,
  rel,
}: MagneticProps) {
  const ref = useRef<HTMLElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 180, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 180, damping: 18, mass: 0.4 });

  const handleMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    if (e.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    mx.set((dx / rect.width) * strength);
    my.set((dy / rect.height) * strength);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const MotionTag =
    as === "a"
      ? motion.a
      : as === "span"
        ? motion.span
        : motion.div;

  return (
    <MotionTag
      // @ts-expect-error - ref typing varies between motion.a / motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ x, y, ...style }}
      className={className}
      href={href}
      target={target}
      rel={rel}
    >
      {children}
    </MotionTag>
  );
}
