"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

export const EXPERIENCE_OPEN_EVENT = "limedock:open-experience";

/** Fire the open event from anywhere; the ExperienceMount component
 *  listens on window and toggles the canvas. */
export function openExperience() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(EXPERIENCE_OPEN_EVENT));
}

type Props = {
  /** Visible label override */
  label?: ReactNode;
  /** Style flavour */
  variant?: "primary" | "ghost";
  className?: string;
};

export default function StartExperienceButton({
  label = "View all works",
  variant = "ghost",
  className = "",
}: Props) {
  const base =
    "inline-flex items-center gap-2 rounded-full transition-all duration-300 group";
  const styles =
    variant === "primary"
      ? "bg-ink text-canvas px-5 py-3 text-body-md font-medium hover:scale-[1.03] active:scale-100"
      : "bg-canvas border border-hairline text-ink px-4 py-2 text-body-md hover:border-ink/40";

  return (
    <motion.button
      type="button"
      onClick={openExperience}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${styles} ${className}`}
    >
      <span className="relative inline-flex h-1.5 w-1.5">
        <span className="absolute inset-0 rounded-full bg-signature-coral animate-ping" />
        <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-signature-coral" />
      </span>
      {label}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      >
        <path
          d="M5 12H19M19 12L13 6M19 12L13 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
}
