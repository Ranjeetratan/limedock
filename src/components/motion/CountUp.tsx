"use client";

import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  /** Final numeric value. */
  to: number;
  /** Pre/post-fix text appended to the number. */
  suffix?: string;
  /** Decimal places to format. */
  decimals?: number;
  /** Milliseconds for the spring to settle (approximate). */
  duration?: number;
  className?: string;
};

/**
 * Counts from 0 → `to` once the element scrolls into view.
 * Drives a spring for an organic curve, then formats with `toLocaleString`.
 */
export default function CountUp({
  to,
  suffix = "",
  decimals = 0,
  duration = 1400,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, {
    stiffness: 80,
    damping: 22,
    mass: 1,
    duration,
  });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (inView) motionVal.set(to);
  }, [inView, motionVal, to]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      const v = Number(latest.toFixed(decimals));
      setDisplay(v.toLocaleString("en-US", { maximumFractionDigits: decimals }));
    });
    return () => unsubscribe();
  }, [spring, decimals]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
