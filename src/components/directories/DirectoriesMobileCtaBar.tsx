"use client";

import { useEffect, useState } from "react";
import BookDemoLink from "./BookDemoLink";

const STORAGE_KEY = "limedock-directories-cta-dismissed";

/**
 * Mobile-only sticky book-demo bar. Dismissible; stays quiet after dismiss.
 */
export default function DirectoriesMobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      // ignore
    }
    setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 md:hidden border-t border-hairline bg-canvas/95 backdrop-blur-md px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="flex items-center gap-3">
        <BookDemoLink
          location="directories_mobile_bar"
          label="Book demo"
          className="btn-primary inline-flex flex-1 !min-h-11 justify-center !px-4"
        />
        <button
          type="button"
          aria-label="Dismiss"
          className="button-icon-circular focus-ring shrink-0"
          onClick={() => {
            setVisible(false);
            try {
              sessionStorage.setItem(STORAGE_KEY, "1");
            } catch {
              // ignore
            }
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 6L18 18M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
