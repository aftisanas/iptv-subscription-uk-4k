"use client";

import { useRef } from "react";
import { DEVICES, DEVICES_CONTENT as C } from "@/data/devices";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionCta from "@/components/ui/SectionCta";
import styles from "./Devices.module.css";

/**
 * Device support. Twelve wordmarks in the site's glass tiles — the point of
 * the section is "you already own something that works", so the marks are the
 * content and everything around them stays quiet.
 */
export default function Devices() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealed = useScrollReveal(sectionRef, { threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="devices"
      className={styles.section}
      data-revealed={revealed ? "" : undefined}
      aria-labelledby="devices-title"
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.inner}>
        <p className={styles.eyebrow}>
          <span className={styles.dash} aria-hidden="true" />
          {C.eyebrow}
        </p>

        <h2 id="devices-title" className={styles.title}>
          {C.title.lead} <span className={styles.flare}>{C.title.accent}</span>
        </h2>

        <p className={styles.lede}>{C.lede}</p>

        <ul className={styles.grid}>
          {DEVICES.map((device, index) => (
            <li
              key={device.id}
              className={styles.tile}
              style={{ "--i": index } as React.CSSProperties}
            >
              {/* Pre-rendered white silhouettes at exact display size, so the
                  optimiser has nothing left to do for twelve small marks. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={styles.mark}
                src={`/devices/${device.id}.webp`}
                alt={device.name}
                width={300}
                height={115}
                loading="lazy"
                decoding="async"
              />
            </li>
          ))}
        </ul>

        <p className={styles.note}>
          <span className={styles.noteDot} aria-hidden="true" />
          {C.note}
        </p>

        <SectionCta label={C.cta.label} note={C.cta.note} />
      </div>
    </section>
  );
}
