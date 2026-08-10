import type { SVGProps } from "react";
import type { AgentCategory } from "@/lib/trending-agents";

type Props = Omit<SVGProps<SVGSVGElement>, "strokeWidth"> & {
  category: AgentCategory;
  size?: number;
};

/**
 * Monoline category glyphs, drawn to the same stroke language as the rest of
 * the site's icon set (1.4px, rounded caps, no fills).
 */
export default function CategoryIcon({ category, size = 22, ...rest }: Props) {
  const base = {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...rest,
  };

  switch (category) {
    case "agent-framework":
      return (
        <svg {...base}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="8.5" y="14" width="7" height="7" rx="1.5" />
          <path d="M10 6.5h4" />
          <path d="M6.5 10v2.5a1.5 1.5 0 0 0 1.5 1.5" />
          <path d="M17.5 10v2.5a1.5 1.5 0 0 1-1.5 1.5" />
        </svg>
      );
    case "agent-skills":
      return (
        <svg {...base}>
          <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H10l2 2h6.5A1.5 1.5 0 0 1 20 7.5v11A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5z" />
          <path d="M9 13.5l2 2 4-4.5" />
        </svg>
      );
    case "coding-agent":
      return (
        <svg {...base}>
          <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
          <path d="M6.5 10l2.5 2-2.5 2" />
          <path d="M11.5 14.5h5" />
          <path d="M2.5 8h19" />
        </svg>
      );
    case "workflow-automation":
      return (
        <svg {...base}>
          <circle cx="5.5" cy="6" r="2.5" />
          <circle cx="18.5" cy="6" r="2.5" />
          <circle cx="12" cy="18" r="2.5" />
          <path d="M8 6h8" />
          <path d="M17 8.2L13.2 15.8" />
          <path d="M7 8.2l3.8 7.6" />
        </svg>
      );
    case "memory-context":
      return (
        <svg {...base}>
          <path d="M12 3.5c-2.2 0-4 1.6-4 3.6 0 .6.1 1.1.4 1.6C7 9.4 6 10.8 6 12.4c0 1.5.9 2.8 2.2 3.4.1 2 1.8 3.6 3.8 3.6s3.7-1.6 3.8-3.6c1.3-.6 2.2-1.9 2.2-3.4 0-1.6-1-3-2.4-3.7.3-.5.4-1 .4-1.6 0-2-1.8-3.6-4-3.6z" />
          <path d="M12 8.5v7" />
          <path d="M9.5 11h5" />
        </svg>
      );
    case "rag-knowledge":
      return (
        <svg {...base}>
          <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h5A2.5 2.5 0 0 1 13 6.5V20a2 2 0 0 0-2-2H4z" />
          <path d="M20 5.5A1.5 1.5 0 0 0 18.5 4h-5A2.5 2.5 0 0 0 11 6.5V20a2 2 0 0 1 2-2h7z" />
        </svg>
      );
    case "browser-data":
      return (
        <svg {...base}>
          <rect x="2.5" y="4" width="19" height="16" rx="2" />
          <path d="M2.5 8.5h19" />
          <circle cx="5.5" cy="6.2" r="0.6" fill="currentColor" stroke="none" />
          <circle cx="7.8" cy="6.2" r="0.6" fill="currentColor" stroke="none" />
          <path d="M8 13h8" />
          <path d="M8 16.5h5" />
        </svg>
      );
    case "llm-gateway":
      return (
        <svg {...base}>
          <path d="M12 3v4" />
          <path d="M12 17v4" />
          <rect x="7.5" y="9" width="9" height="6" rx="1.5" />
          <path d="M3 12h4.5" />
          <path d="M16.5 12H21" />
          <path d="M5 8l2.5 1.5" />
          <path d="M19 8l-2.5 1.5" />
        </svg>
      );
    case "observability-evals":
      return (
        <svg {...base}>
          <path d="M3 17.5l4.5-5 3.5 3 4-6 6 7.5" />
          <path d="M3 20.5h18" />
          <circle cx="7.5" cy="12.5" r="1.2" />
          <circle cx="15" cy="9.5" r="1.2" />
        </svg>
      );
    case "vector-search":
      return (
        <svg {...base}>
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="M20.5 20.5L15.5 15.5" />
          <circle cx="8.5" cy="9" r="0.8" fill="currentColor" stroke="none" />
          <circle cx="12.5" cy="9" r="0.8" fill="currentColor" stroke="none" />
          <circle cx="10.5" cy="13" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      );
    case "vertical-agent":
      return (
        <svg {...base}>
          <path d="M4 20V9.5l8-5.5 8 5.5V20" />
          <path d="M3 20h18" />
          <path d="M9.5 20v-5h5v5" />
        </svg>
      );
    case "learning":
    default:
      return (
        <svg {...base}>
          <path d="M3 7.5L12 3.5l9 4-9 4z" />
          <path d="M6.5 10.5V16c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-5.5" />
          <path d="M21 7.5v6" />
        </svg>
      );
  }
}
