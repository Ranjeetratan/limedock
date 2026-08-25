import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./preview.css";

/**
 * Preview shell.
 *
 * Follows the same convention as the Mirage Manor preview: its own fonts, its
 * own scoped stylesheet, and noindex. These pages are documents about someone
 * else's business, so they must never be indexed or inherit LimeDock's own
 * light marketing system.
 */

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-lp-sans",
  display: "swap",
});

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`lp-root ${sans.variable}`}>{children}</div>;
}
