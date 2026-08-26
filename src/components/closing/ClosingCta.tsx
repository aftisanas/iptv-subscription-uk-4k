"use client";

import { useRef } from "react";
import ArrowUpRight from "../icons/ArrowUpRight";
import { CLOSING_CTA as C } from "@/data/closing-cta";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./ClosingCta.module.css";

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
      <path d="M4.4 2.6a.6.6 0 0 1 .92-.5l5.6 4.4a.6.6 0 0 1 0 1l-5.6 4.4a.6.6 0 0 1-.92-.5z" />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M13.6 9.2a1.9 1.9 0 0 1-1.9 1.9H5.4L2.4 14V4.1a1.9 1.9 0 0 1 1.9-1.9h7.4a1.9 1.9 0 0 1 1.9 1.9z" />
    </svg>
  );
}

/**
 * The last decision, made easy: one line of proof, one hot button, one quiet
 * alternative. Built from the same parts as the rest — the glass pill, the
 * flare on the tail of the title, the accent picking out the load-bearing
 * phrases in the paragraph.
 */
export default function ClosingCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealed = useScrollReveal(sectionRef, { threshold: 0.12 });

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      data-revealed={revealed ? "" : undefined}
      aria-labelledby="closing-title"
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.inner}>
        <p className={styles.badge}>
          <span className={styles.spark} aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 1.6l1.3 3.6 3.6 1.3-3.6 1.3L8 11.4 6.7 7.8 3.1 6.5l3.6-1.3z" />
              <path d="M12.6 10.4l.65 1.8 1.8.65-1.8.65-.65 1.8-.65-1.8-1.8-.65 1.8-.65z" opacity="0.7" />
            </svg>
          </span>
          {C.badge}
        </p>

        <h2 id="closing-title" className={styles.title}>
          {C.title.lead} <span className={styles.flare}>{C.title.accent}</span>
        </h2>

        <p className={styles.body}>
          {C.body.map((part, i) =>
            part.accent ? (
              <strong key={i} className={styles.mark}>
                {part.text}
              </strong>
            ) : (
              <span key={i}>{part.text}</span>
            ),
          )}
        </p>

        <div className={styles.actions}>
          <a className={styles.primary} href={C.primary.href}>
            <PlayIcon className={styles.play} />
            <span>{C.primary.label}</span>
            <ArrowUpRight className={styles.arrow} />
          </a>

          <a className={styles.secondary} href={C.secondary.href}>
            <ChatIcon className={styles.chat} />
            <span>{C.secondary.label}</span>
          </a>
        </div>

        <p className={styles.note}>{C.note}</p>
      </div>
    </section>
  );
}
