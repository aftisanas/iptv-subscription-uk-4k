"use client";

import { useRef, useState } from "react";
import Atmosphere from "./Atmosphere";
import OfferCard from "./OfferCard";
import SequenceRail from "./SequenceRail";
import { HERO_CONTENT as C } from "@/data/hero-content";
import { useIdleWhenOffscreen } from "@/hooks/useIdleWhenOffscreen";
import styles from "./Hero.module.css";

/**
 * The hero sells the subscription. The claim leads at the top left, the offer
 * sits low on the right so it never competes with the h1 for the first look,
 * and the poster wall carries the picture on its own — the figure and the
 * smoke field are gone, and with them every per-frame cost in the section.
 */
export default function Hero() {
  const stageRef = useRef<HTMLElement>(null);

  /**
   * The lede is the first-100-words passage, so every word of it ships in the
   * HTML on every breakpoint. On a phone it is eleven lines of body copy above
   * the offer, so it renders clamped with a control to open it — the text is
   * always in the DOM and always crawlable, it just is not a wall by default.
   */
  const [ledeOpen, setLedeOpen] = useState(false);

  useIdleWhenOffscreen(stageRef);

  return (
    <section ref={stageRef} className={styles.hero}>
      <Atmosphere />

      <div className={styles.frame}>
        <div className={styles.meta}>
          <span className={styles.metaLabel}>{C.rail.left}</span>
          <span className={`${styles.metaLabel} ${styles.metaAccent}`}>
            {C.rail.right}
          </span>
        </div>

        {/* Claim first, in the document and on the screen. */}
        <div className={styles.copy}>
          <h1 className={styles.headline}>
            <span className={styles.line}>{C.headline.lead}</span>{" "}
            <span className={styles.line}>
              {C.headline.tail}
              <span className={styles.flare}>{C.headline.accent}</span>
            </span>
          </h1>

          {/* Bound to the h1 by the accent rule rather than floated off on its
              own — the two read as one block of argument. */}
          <div className={styles.ledeWrap}>
            <span className={styles.ledeRule} aria-hidden="true" />
            <div className={styles.ledeBody}>
              <p
                id="hero-lede"
                className={styles.lede}
                data-open={ledeOpen ? "" : undefined}
              >
                {C.lede}
              </p>
              <button
                type="button"
                className={styles.ledeMore}
                aria-expanded={ledeOpen}
                aria-controls="hero-lede"
                onClick={() => setLedeOpen((v) => !v)}
              >
                {ledeOpen ? "Show less" : "Read more"}
              </button>
            </div>
          </div>

        </div>

        {/* A slot of its own, so a phone can put the offer above it and a
            desktop can leave it where the copy ends. Text, not card logos:
            nothing is charged on this site, so payment marks here would
            advertise a checkout that does not exist. */}
        <div className={styles.trust}>
          <span className={styles.trustLabel}>{C.offer.trustLabel}</span>

          <ul className={styles.marks}>
            {C.offer.marks.map((mark) => (
              <li key={mark} className={styles.mark}>
                <svg
                  className={styles.markTick}
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M2.4 7.4 5.5 10.5 11.6 3.9" />
                </svg>
                {mark}
              </li>
            ))}
          </ul>
        </div>

        {/* Closes the copy column: it sits a fixed gap below the trust list,
            which is what carries the whole block down to the foot of the
            frame. Answers "does it work on my TV" before the first scroll. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.devices}
          src={C.devices.src}
          alt={C.devices.alt}
          width={C.devices.width}
          height={C.devices.height}
          loading="eager"
          decoding="async"
        />

        {/* The offer is taken out of the flow on desktop so the copy column can
            drop past it instead of being propped up by the card's height. */}
        <div className={styles.aside}>
          <div className={styles.offer}>
            <OfferCard />
          </div>
        </div>

        <SequenceRail duration={0} cycle={0} />
      </div>
    </section>
  );
}
