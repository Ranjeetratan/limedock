"use client";

import { useCallback, useEffect, useState } from "react";
import InfiniteCanvas from "./InfiniteCanvas";
import { EXPERIENCE_OPEN_EVENT } from "./StartExperienceButton";

/** Mounted once at the page root. Listens for the open event and
 *  renders the fullscreen canvas overlay. */
export default function ExperienceMount() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(EXPERIENCE_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(EXPERIENCE_OPEN_EVENT, onOpen);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return <InfiniteCanvas open={open} onClose={close} />;
}
