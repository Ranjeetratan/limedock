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

/** Build a Microlink screenshot URL that resolves directly to the
 *  cached image (no JSON parsing needed). Microlink renders the page,
 *  takes a screenshot, caches it on their CDN and serves the file
 *  back on subsequent requests — so this is "live" the first time
 *  and instant thereafter. */
function microlinkUrl(target: string) {
  const params = new URLSearchParams({
    url: target,
    screenshot: "true",
    meta: "false",
    embed: "screenshot.url",
    "viewport.width": "1440",
    "viewport.height": "900",
    "viewport.deviceScaleFactor": "1",
    waitFor: "1500",
  });
  return `https://api.microlink.io/?${params.toString()}`;
}

/**
 * Drop-in replacement for the static product screenshot.
 *
 *   <LiveScreenshot
 *     url="https://kingdomofkumar.com"
 *     fallback="/kingdomofkumar.png"
 *     alt="Kingdom of Kumar"
 *   />
 *
 * Fades in once the live image loads. Falls back to the bundled
 * static image if the screenshot service errors out (offline, rate
 * limit, etc.).
 */
export default function LiveScreenshot({
  url,
  alt,
  fallback,
  className,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className ?? ""}`}>
      {/* Skeleton — visible while the live shot is loading. */}
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
        // Using a plain <img> to avoid Next/Image remote-pattern config
        // for the Microlink CDN. Microlink redirects this URL straight
        // to the underlying cached screenshot file.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={microlinkUrl(url)}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      ) : (
        // Fallback path — bundled screenshot from /public
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
