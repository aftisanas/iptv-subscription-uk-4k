"use client";

import { useEffect, useState, useRef, useCallback } from "react";

type Options = {
  /** Target number to count to. */
  end: number;
  /** Duration of the animation in ms. Default 2000. */
  duration?: number;
  /** Decimal places. Default 0. */
  decimals?: number;
  /** Only start when triggered. */
  enabled?: boolean;
};

/**
 * Smoothly animates a number from 0 to `end` using requestAnimationFrame.
 * Uses an ease-out curve for a natural deceleration effect.
 * Returns the current formatted string value.
 */
export function useCountUp({
  end,
  duration = 2000,
  decimals = 0,
  enabled = false,
}: Options): string {
  const [value, setValue] = useState("0");
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const hasRun = useRef(false);

  const formatNumber = useCallback(
    (n: number): string => {
      if (decimals > 0) {
        return n.toFixed(decimals);
      }
      // Format with commas for thousands
      return Math.round(n).toLocaleString("en-US");
    },
    [decimals]
  );

  useEffect(() => {
    if (!enabled || hasRun.current) return;
    hasRun.current = true;

    // Reduced motion — jump straight to the end value.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(formatNumber(end));
      return;
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * end;

      setValue(formatNumber(current));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setValue(formatNumber(end));
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, end, duration, formatNumber]);

  return value;
}
