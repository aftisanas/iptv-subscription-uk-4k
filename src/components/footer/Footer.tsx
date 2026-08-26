"use client";

import { useRef } from "react";
import BrandMark from "../icons/BrandMark";
import ArrowUpRight from "../icons/ArrowUpRight";
import { FOOTER as C } from "@/data/footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./Footer.module.css";

function Tick({ className }: { className?: string }) {
  return (
    <svg
      className={className}
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
  );
}

/**
 * Footer. The page ends the way it started — the same mark, the same glass,
 * the same burning rail — with the last decision still on offer rather than a
 * dead wall of links.
 */
export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const revealed = useScrollReveal(footerRef, { threshold: 0.05 });

  return (
    <footer
      ref={footerRef}
      className={styles.footer}
      data-revealed={revealed ? "" : undefined}
    >
      {/* The rail that runs through the whole site, closing it off. */}
      <div className={styles.rail} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <a className={styles.lockup} href="#" aria-label={`${C.brand.name} — top of page`}>
              <BrandMark className={styles.mark} />
              <span className={styles.wordmark}>{C.brand.name}</span>
            </a>
            <p className={styles.brandLine}>{C.brand.line}</p>

            <ul className={styles.assurances}>
              {C.assurances.map((item) => (
                <li key={item.label} className={styles.assurance}>
                  <Tick className={styles.tick} />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          <nav className={styles.columns} aria-label="Footer">
            {C.columns.map((column) => (
              <div key={column.title} className={styles.column}>
                {/* A label, not a heading — four <h2>s of link-group names muddy
                    the page outline for no reader benefit. */}
                <p className={styles.columnTitle} id={`footcol-${column.title}`}>
                  {column.title}
                </p>
                <ul className={styles.columnList}>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a className={styles.link} href={link.href}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className={styles.middle}>
          <div className={styles.payment}>
            <p className={styles.paymentLabel}>
              <span className={styles.lock} aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <rect x="3.2" y="7" width="9.6" height="6.6" rx="1.8" />
                  <path d="M5.6 7V5.2a2.4 2.4 0 0 1 4.8 0V7" strokeLinecap="round" />
                </svg>
              </span>
              {C.payment.label}
            </p>
            <ul className={styles.marks}>
              {C.payment.marks.map((mark) => (
                <li key={mark.id}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className={styles.mkImg}
                    src={`/trust/${mark.id}.webp`}
                    alt={mark.name}
                    height={120}
                    loading="lazy"
                    decoding="async"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.closing}>
            <p className={styles.closingLead}>{C.cta.lead}</p>
            <a className={styles.closingCta} href={C.cta.href}>
              <span>{C.cta.label}</span>
              <ArrowUpRight className={styles.arrow} />
            </a>
          </div>
        </div>

        {/* Policy links run as one compact row rather than a fourth column,
            which frees that column for the guides. */}
        <nav className={styles.legalRow} aria-label="Policies">
          {C.legal.links.map((link) => (
            <a key={link.label} className={styles.legalLink} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.bottom}>
          <p className={styles.copyright}>{C.legal.copyright}</p>
          <p className={styles.disclaimer}>{C.legal.note}</p>
        </div>
      </div>
    </footer>
  );
}
