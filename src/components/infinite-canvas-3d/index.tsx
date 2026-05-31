"use client";

import * as React from "react";

// Lazy-load the scene so the Three.js bundle only ships when the user
// actually opens the experience.
const LazyInfiniteCanvasScene = React.lazy(() =>
  import("./scene").then((mod) => ({ default: mod.InfiniteCanvasScene }))
);

export type { MediaItem } from "./types";
export { MEDIA_MANIFEST } from "./media";

export function InfiniteCanvasR3F(
  props: React.ComponentProps<typeof LazyInfiniteCanvasScene>
) {
  return (
    <React.Suspense fallback={null}>
      <LazyInfiniteCanvasScene {...props} />
    </React.Suspense>
  );
}
