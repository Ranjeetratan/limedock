"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

export const BOOK_DEMO_URL =
  "https://cal.com/limedock-admin-nb05ck/30min";

type Props = {
  label?: string;
  className?: string;
  /** Where the CTA was clicked — sent as gtag event param */
  location: string;
  children?: ReactNode;
};

export default function BookDemoLink({
  label = "Book a workflow call",
  className = "btn-primary inline-flex !min-h-11 !px-5",
  location,
  children,
}: Props) {
  return (
    <a
      href={BOOK_DEMO_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() =>
        trackEvent("directories_book_demo", { location })
      }
    >
      {children ?? label}
    </a>
  );
}
