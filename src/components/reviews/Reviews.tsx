"use client";

import { useRef } from "react";
import { REVIEWS, REVIEWS_CONTENT as C } from "@/data/reviews";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./Reviews.module.css";

/**
 * Trust panels, not testimonials. We publish no ratings, scores or review
 * counts — the screenshots are shown as evidence of support and refunds, on
 * screens that carry on past the bottom of the card rather than being cropped
 * flat, which is what makes them read as real threads instead of tiles.
 *
 * The array is the whole contract: adding a fourth screenshot is one entry in
 * `reviews.ts` and the grid reflows on its own.
 */
export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealed = useScrollReveal(sectionRef, { threshold: 0.08 });

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className={styles.section}
      data-revealed={revealed ? "" : undefined}
      aria-labelledby="reviews-title"
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.inner}>
        <p className={styles.eyebrow}>
          <span className={styles.dash} aria-hidden="true" />
          {C.eyebrow}
        </p>

        <h2 id="reviews-title" className={styles.title}>
          {/* The figure only renders if there is a real one to render — an
              empty span would still take its own line height. */}
          {C.renewRate ? (
            <>
              <span className={styles.figure}>{C.renewRate}</span>{" "}
            </>
          ) : null}
          <span className={styles.tail}>{C.headlineTail}</span>
        </h2>

        <p className={styles.lede}>{C.lede}</p>

        <ul className={styles.grid}>
          {REVIEWS.map((review, index) => (
            <li
              key={review.id}
              className={styles.card}
              style={{ "--i": index } as React.CSSProperties}
            >
              <div className={styles.head}>
                <span className={styles.pulse} aria-hidden="true" />
                <div className={styles.headText}>
                  <span className={styles.label}>{review.label}</span>
                  <span className={styles.caption}>{review.caption}</span>
                </div>
              </div>

              {/* Fixed window with a feathered base — the thread runs past the
                  card instead of being guillotined at a crop line. */}
              <div className={styles.screen}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={styles.shot}
                  src={review.image}
                  alt={`${review.label}: ${review.caption}`}
                  width={720}
                  height={1390}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </li>
          ))}
        </ul>

        <p className={styles.note}>{C.note}</p>
      </div>
    </section>
  );
}
