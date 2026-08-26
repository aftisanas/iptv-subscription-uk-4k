"use client";

import { useRef } from "react";
import Showcase from "@/components/showcase/Showcase";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { STATEMENT_CONTENT as C } from "@/data/statement-content";
import styles from "./Statement.module.css";

/**
 * Cinematic statement section — a single bold red headline with a faded
 * ghost/echo line below it (like a shadow reflection), plus body text.
 */
export default function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealed = useScrollReveal(sectionRef, { threshold: 0.18 });

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      data-revealed={revealed ? "" : undefined}
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.content}>
        <h2 className={styles.headline}>{C.headline}</h2>
        <span className={styles.echo} aria-hidden="true">{C.echo}</span>
      </div>

      {/* Sits outside .content so the rows can run edge to edge. */}
      <Showcase />

      <div className={styles.content}>
        <p className={styles.body}>{C.body}</p>
      </div>
    </section>
  );
}
