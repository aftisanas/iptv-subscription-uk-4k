"use client";

import { useRef } from "react";
import { useIdleWhenOffscreen } from "@/hooks/useIdleWhenOffscreen";
import type { ShowcaseItem } from "@/data/showcase";
import styles from "./Marquee.module.css";

type Props = {
  items: ShowcaseItem[];
  /** Direction the artwork travels. */
  direction: "left" | "right";
  /** Seconds for one list-length to pass a fixed point. Sets the speed. */
  duration: number;
  /**
   * Copies of the list laid end to end. Must be enough that the track still
   * spans the viewport after it has slid by one copy, or a gap opens at the
   * trailing edge. Item sizing is viewport-relative, so the ratio between
   * track width and screen width is constant and a fixed count holds
   * everywhere — verified up to 2560px.
   */
  repeats: number;
  variant: "poster" | "chip";
  /** Names the row for assistive tech. */
  label: string;
};

export default function Marquee({
  items,
  direction,
  duration,
  repeats,
  variant,
  label,
}: Props) {
  const rowRef = useRef<HTMLDivElement>(null);

  // Nothing should keep compositing a 4000px-wide track once it is off screen.
  useIdleWhenOffscreen(rowRef);

  // One hop equals exactly one copy of the list, so the loop never shows a seam.
  const shift = `-${(100 / repeats).toFixed(4)}%`;

  return (
    <div
      ref={rowRef}
      className={styles.row}
      data-variant={variant}
      role="group"
      aria-label={label}
    >
      <div
        className={styles.track}
        data-direction={direction}
        style={
          {
            "--shift": shift,
            "--duration": `${duration}s`,
          } as React.CSSProperties
        }
      >
        {Array.from({ length: repeats }, (_, copy) => (
          <ul
            key={copy}
            className={styles.group}
            // Only the first copy is real content; the rest are visual filler.
            aria-hidden={copy > 0 || undefined}
          >
            {items.map((item) => (
              <li key={item.src} className={styles.cell}>
                {/* Plain <img> on purpose. These are pre-encoded WebP at their
                    exact display size, and each row paints the same handful of
                    URLs 5-7 times over; next/image would add a wrapper and a
                    srcset per instance to re-derive a file we already built. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={styles.art}
                  src={item.src}
                  alt={copy === 0 ? item.alt : ""}
                  width={item.w}
                  height={item.h}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
