"use client";

import { useEffect, useState, type RefObject } from "react";

type Options = {
  /** Fraction of the element's height that must be visible (0–1). Default 0.15 */
  threshold?: number;
  /** Once revealed, stay revealed — no re-hiding on scroll-out. Default true */
  once?: boolean;
};

/**
 * Returns `true` once the target element enters the viewport by the given
 * threshold. By default this is a one-shot: once revealed it stays revealed,
 * so the CSS transition plays once and the observer disconnects.
 *
 * Respects reduced-motion by revealing immediately (no scroll dependency).
 */
export function useScrollReveal(
  ref: RefObject<HTMLElement | null>,
  { threshold = 0.15, once = true }: Options = {}
): boolean {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion — reveal immediately, skip the observer.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setRevealed(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, once]);

  return revealed;
}
