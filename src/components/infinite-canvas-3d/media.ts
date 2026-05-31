import type { MediaItem } from "./types";

/**
 * Media manifest for the infinite canvas.
 * Width/height are aspect-ratio anchors only — the scene reads them
 * from the manifest (not from the loaded texture) so plane geometry
 * is sized correctly before the image finishes loading.
 */
const MOBILE: MediaItem[] = Array.from({ length: 9 }, (_, i) => ({
  url: `/works-mobile/mobile-${String(i + 1).padStart(2, "0")}.png`,
  width: 780,
  height: 1688,
}));

const LANDSCAPE: MediaItem[] = Array.from({ length: 55 }, (_, i) => ({
  url: `/placeholder-images/${String(i + 1).padStart(2, "0")}.png`,
  width: 3840,
  height: 2160,
}));

export const MEDIA_MANIFEST: MediaItem[] = [...MOBILE, ...LANDSCAPE];
