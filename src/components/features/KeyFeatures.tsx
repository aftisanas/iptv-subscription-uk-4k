"use client";

import { useRef } from "react";
import Image from "next/image";
import { KEY_FEATURES, KEY_FEATURES_CONTENT as C } from "@/data/features";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import artwork from "@/assets/key-features.webp";
import styles from "./KeyFeatures.module.css";

function Tick({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.4 7.4 5.5 10.5 11.6 3.9" />
    </svg>
  );
}

/**
 * Key features. Two columns, as in the reference structure: the title block
 * holds the left, the readout holds the right. Everything else — the glass,
 * the hairlines, the micro-labels, the flare on one word — comes from the rest
 * of the site rather than from the reference's palette.
 */
export default function KeyFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealed = useScrollReveal(sectionRef, { threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="features"
      className={styles.section}
      data-revealed={revealed ? "" : undefined}
      aria-labelledby="features-title"
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.lede}>
          <p className={styles.eyebrow}>
            <span className={styles.dash} aria-hidden="true" />
            {C.eyebrow}
          </p>

          <h2 id="features-title" className={styles.title}>
            {C.title.lead} <span className={styles.flare}>{C.title.accent}</span>
          </h2>

          <figure className={styles.figure}>
            {/* A pool of the hero's rim light under the set, so the artwork's
                own halo lands on something rather than floating. */}
            <span className={styles.pool} aria-hidden="true" />
            <Image
              className={styles.art}
              src={artwork}
              alt={C.imageAlt}
              sizes="(max-width: 1080px) 92vw, 46vw"
              placeholder="blur"
            />
          </figure>
        </div>

        <ul className={styles.list}>
          {KEY_FEATURES.map((feature, index) => (
            <li
              key={feature.label}
              className={styles.row}
              data-emphasis={feature.emphasis ? "" : undefined}
              style={{ "--i": index } as React.CSSProperties}
            >
              <Tick className={styles.tick} />
              <span>{feature.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
