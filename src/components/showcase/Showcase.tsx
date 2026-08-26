"use client";

import { useRef } from "react";
import Marquee from "./Marquee";
import { MOVIES, CHANNELS } from "@/data/showcase";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./Showcase.module.css";

/**
 * The catalogue proof: poster art drifting one way, channel tiles the other.
 * Full-bleed on purpose — the rows should run off both edges so the library
 * reads as larger than the screen.
 */
export default function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const revealed = useScrollReveal(ref, { threshold: 0.12 });

  return (
    <div
      ref={ref}
      className={styles.showcase}
      data-revealed={revealed ? "" : undefined}
    >
      <div className={styles.rail}>
        <Marquee
          items={MOVIES}
          direction="right"
          duration={42}
          repeats={5}
          variant="poster"
          label="Films and series in the library"
        />
      </div>

      <div className={styles.rail}>
        <Marquee
          items={CHANNELS}
          direction="left"
          duration={34}
          repeats={7}
          variant="chip"
          label="Live channels included"
        />
      </div>
    </div>
  );
}
