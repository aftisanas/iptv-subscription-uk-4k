"use client";

import { useEffect, useState } from "react";

export type Remaining = { days: string; hours: string; minutes: string; seconds: string };

const pad = (n: number) => String(Math.max(0, Math.floor(n))).padStart(2, "0");

function split(msLeft: number): Remaining {
  const total = Math.max(0, Math.floor(msLeft / 1000));
  return {
    days: String(Math.floor(total / 86400)),
    hours: pad((total % 86400) / 3600),
    minutes: pad((total % 3600) / 60),
    seconds: pad(total % 60),
  };
}

/**
 * Counts down to `endsAt`. When no deadline is configured it falls back to a
 * rolling window measured from first paint, so the demo always shows something
 * live — set a real date in `OFFER.endsAt` before launch.
 *
 * Returns `null` until mounted, so the server and first client render agree and
 * hydration never mismatches on a value that is different every second.
 */
export function useCountdown(endsAt: string | null, fallbackHours: number): Remaining | null {
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const target = endsAt
      ? new Date(endsAt).getTime()
      : Date.now() + fallbackHours * 3600_000;

    const tick = () => setRemaining(split(target - Date.now()));
    tick();

    // Re-sync on the second boundary rather than drifting by a few ms a tick.
    let interval: number | undefined;
    const align = window.setTimeout(() => {
      tick();
      interval = window.setInterval(tick, 1000);
    }, 1000 - (Date.now() % 1000));

    const onVisible = () => {
      if (!document.hidden) tick();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.clearTimeout(align);
      if (interval) window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [endsAt, fallbackHours]);

  return remaining;
}
