"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  /** The site whose homepage we want to screenshot. */
  url: string;
  /** Alt text for accessibility. */
  alt: string;
  /** Static fallback image (shipped in /public) used if the live
   *  screenshot service fails to respond. */
  fallback: string;
  /** Optional className passthrough for the wrapper. */
  className?: string;
};

/**
 * Live homepage screenshot. Hits our own server-side proxy at
 *   /api/screenshot?url=…
 * which fetches the screenshot from Microlink (with mshots fallback)
 * and caches the result on Vercel's edge for 24h. From the client's
 * perspective this is just an <img> with a stable URL — the proxy
 * absorbs all the upstream complexity and CORS/redirect quirks.
 */
export default function LiveScreenshot({
  url,
  alt,
  fallback,
  className,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const src = `/api/screenshot?url=${encodeURIComponent(url)}`;

  return (
    <div className={`relative w-full h-full overflow-hidden ${className ?? ""}`}>
      {/* Skeleton shimmer while the live shot loads */}
      <div
        aria-hidden
        className={`absolute inset-0 transition-opacity duration-700 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
        style={{
          background:
            "linear-gradient(110deg, rgba(0,0,0,0.04) 30%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.04) 70%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.6s linear infinite",
        }}
      />

      {!errored ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.04] ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
        />
      ) : (
        <Image
          src={fallback}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 620px, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
}
