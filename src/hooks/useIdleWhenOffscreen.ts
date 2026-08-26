"use client";

import { useEffect, type RefObject } from "react";

/**
 * Marks the element `data-idle` whenever it scrolls out of view or the tab is
 * hidden, so CSS can park its animations. The smoke is the most expensive thing
 * on the page; there is no reason for it to keep compositing behind a section
 * the reader has already scrolled past.
 *
 * The attribute is written straight to the DOM rather than held in state — this
 * fires on every scroll boundary and must not re-render the hero.
 */
export function useIdleWhenOffscreen(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let onScreen = true;

    const sync = () => {
      const idle = !onScreen || document.hidden;
      if (idle) el.setAttribute("data-idle", "");
      else el.removeAttribute("data-idle");
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      // Keep it running slightly past the fold so it is already settled by the
      // time it scrolls back into view.
      { rootMargin: "120px" },
    );

    observer.observe(el);
    document.addEventListener("visibilitychange", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      el.removeAttribute("data-idle");
    };
  }, [ref]);
}
