"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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
 * WordPress.com mshots returns a homepage screenshot as a PNG with
 * no API key required. URL format:
 *   s.wordpress.com/mshots/v1/<encoded-url>?w=<w>&h=<h>
 *
 * First request may return a loading placeholder while the screenshot
 * warms up — usually ready in ~10s. After that the image is cached on
 * their CDN for every visitor. We poll the image once if the first
 * load returns the placeholder.
 */
function mshots(target: string, w = 1440, h = 900, cacheBust = 0) {
  const base = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(target)}?w=${w}&h=${h}`;
  return cacheBust ? `${base}&v=${cacheBust}` : base;
}

export default function LiveScreenshot({
  url,
  alt,
  fallback,
  className,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const [retry, setRetry] = useState(0);

  // mshots returns a tiny placeholder image while it's warming up the
  // capture. The placeholder is consistently ~400 bytes, while a real
  // screenshot is much larger. We re-request after 4s if the first
  // load comes back so quickly it can't have been a real shot.
  useEffect(() => {
    if (loaded || errored) return;
    const t = setTimeout(() => setRetry((n) => n + 1), 4500);
    return () => clearTimeout(t);
  }, [loaded, errored, retry]);

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
        // Plain <img> sidesteps Next/Image remote-pattern config.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={retry}
          src={mshots(url, 1440, 900, retry)}
          alt={alt}
          onLoad={(e) => {
            const img = e.currentTarget;
            // The mshots warming placeholder is < 50KB and tiny;
            // a real screenshot is much larger. If we suspect we got
            // the placeholder, try again.
            if (img.naturalWidth < 400 && retry < 5) {
              setRetry((n) => n + 1);
              return;
            }
            setLoaded(true);
          }}
          onError={() => {
            if (retry < 3) setRetry((n) => n + 1);
            else setErrored(true);
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          referrerPolicy="no-referrer"
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
