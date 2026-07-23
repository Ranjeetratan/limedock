/**
 * Monoline icon set. Deliberately drawn to match the flowchart stroke
 * language (1.5px stroke, rounded caps, no fills) so icons feel like
 * they came from the same engineering notebook as the diagrams.
 */

import type { SVGProps } from "react";

type Props = Omit<SVGProps<SVGSVGElement>, "strokeWidth"> & { size?: number; strokeWidth?: number };

function baseProps({
  size = 20,
  strokeWidth,
  ...rest
}: Props & { strokeWidth?: number }) {
  return {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: strokeWidth ?? 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...rest,
  };
}

export function IconMerge(props: Props) {
  return (
    <svg {...baseProps(props)}>
      <path d="M4 4v3a5 5 0 0 0 5 5h6a5 5 0 0 1 5 5v3" />
      <path d="M17 17l3 3-3 3" />
      <path d="M8 5l-4 4" />
      <path d="M4 5l4 4" />
    </svg>
  );
}

export function IconClock(props: Props) {
  return (
    <svg {...baseProps(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function IconCalendar(props: Props) {
  return (
    <svg {...baseProps(props)}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 3v4M16 3v4" />
      <circle cx="8.5" cy="15.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconKey(props: Props) {
  return (
    <svg {...baseProps(props)}>
      <circle cx="7" cy="15" r="3.5" />
      <path d="M10 13l10-10" />
      <path d="M16 7l3 3" />
      <path d="M13 10l2 2" />
    </svg>
  );
}

export function IconLock(props: Props) {
  return (
    <svg {...baseProps(props)}>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconSlack(props: Props) {
  return (
    <svg {...baseProps(props)}>
      <rect x="5" y="10" width="6" height="2" rx="1" />
      <rect x="13" y="10" width="6" height="2" rx="1" />
      <rect x="10" y="5" width="2" height="6" rx="1" />
      <rect x="10" y="13" width="2" height="6" rx="1" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

export function IconTerminal(props: Props) {
  return (
    <svg {...baseProps(props)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 10l3 2-3 2" />
      <path d="M12 14h5" />
    </svg>
  );
}

export function IconArrowRight(props: Props) {
  return (
    <svg {...baseProps(props)}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconSpark(props: Props) {
  return (
    <svg {...baseProps(props)}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M6.5 6.5l2.8 2.8M14.7 14.7l2.8 2.8M6.5 17.5l2.8-2.8M14.7 9.3l2.8-2.8" />
    </svg>
  );
}

export function IconWorkflow(props: Props) {
  return (
    <svg {...baseProps(props)}>
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="3" width="6" height="6" rx="1" />
      <rect x="9" y="15" width="6" height="6" rx="1" />
      <path d="M9 6h6" />
      <path d="M12 9v4a2 2 0 0 0 2 2h-2" />
      <path d="M12 9v4a2 2 0 0 1-2 2h2" />
    </svg>
  );
}

export function IconStackReplace(props: Props) {
  return (
    <svg {...baseProps(props)}>
      <path d="M4 8l4-3 4 3-4 3z" />
      <path d="M4 12l4 3 4-3" />
      <path d="M4 16l4 3 4-3" />
      <rect x="15" y="7" width="6" height="10" rx="1" />
      <path d="M18 10v4M16 12h4" />
    </svg>
  );
}

export function IconInfra(props: Props) {
  return (
    <svg {...baseProps(props)}>
      <rect x="3" y="5" width="18" height="4" rx="1" />
      <rect x="3" y="15" width="18" height="4" rx="1" />
      <circle cx="7" cy="7" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="7" cy="17" r="0.7" fill="currentColor" stroke="none" />
      <path d="M8 9v6" />
      <path d="M16 9v6" />
    </svg>
  );
}
