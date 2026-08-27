"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  CHECKOUT_COPY,
  CHECKOUT_HUB_URL,
  EXTRA_CONNECTIONS_MAX,
  SITE_NAME,
  SITE_SLUG,
  WHATSAPP_NUMBER,
} from "@/lib/constants";
import {
  exactPerMonth,
  findPlanById,
  planOrderName,
  type PlanWithTier,
} from "@/data/pricing";
import { buildWhatsappMessage, calculateOrderTotal } from "@/lib/whatsapp";
import { callCheckoutHub } from "@/lib/checkout";
import { FOOTER } from "@/data/footer";
import styles from "./Checkout.module.css";

type Availability =
  | { state: "checking" }
  | { state: "available" }
  | { state: "unavailable"; whatsappUrl: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Reserved / non-deliverable TLDs the hub (Shopify) rejects. Kept lowercase;
// compared case-insensitively.
const BLOCKED_TLDS = new Set(["test", "local", "invalid", "example", "exp"]);

function isDeliverableEmail(email: string): boolean {
  if (!EMAIL_RE.test(email)) return false;
  const tld = email.slice(email.lastIndexOf(".") + 1).toLowerCase();
  if (tld.length < 2) return false;
  if (!/^[a-z]+$/.test(tld)) return false;
  if (BLOCKED_TLDS.has(tld)) return false;
  return true;
}

// Deliberately loose. Strip formatting (spaces, dashes, brackets, dots) and
// require an optional leading + followed by 7-15 digits. E.164-ish, not strict.
const PHONE_RE = /^\+?\d{7,15}$/;
const CURRENCY = "£";

// Local wa.me fallback for when the hub is unreachable (network error, non-200,
// unparseable). The click handler appends `?text=…`, so no query string here.
const LOCAL_WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const money = (value: number) => `${CURRENCY}${value.toFixed(2)}`;

export default function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan");

  const found = useMemo<PlanWithTier | null>(() => findPlanById(planId), [planId]);

  // Missing or unknown ?plan= — send them back to the ladder rather than
  // rendering an empty checkout.
  const redirectedRef = useRef(false);
  useEffect(() => {
    if (!found && !redirectedRef.current) {
      redirectedRef.current = true;
      router.replace("/#pricing");
    }
  }, [found, router]);

  if (!found) return null;

  return <CheckoutForPlan key={found.plan.id} entry={found} />;
}

function CheckoutForPlan({ entry }: { entry: PlanWithTier }) {
  const { plan, tier } = entry;
  const planPrice = Number(plan.price);
  const orderName = planOrderName(entry);

  const [availability, setAvailability] = useState<Availability>({ state: "checking" });
  // Premium bundles the proxy, so it starts on and cannot be switched off —
  // there is nothing to opt out of and nothing further to pay.
  const [proxyOn, setProxyOn] = useState(tier.proxyIncluded);
  const [extraConnections, setExtraConnections] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoNotice, setPromoNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const url = `${CHECKOUT_HUB_URL}/api/availability?siteSlug=${SITE_SLUG}&planName=${encodeURIComponent(orderName)}`;

    fetch(url)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Availability check failed (${res.status})`);
        return res.json() as Promise<{ available?: boolean; whatsappUrl?: string }>;
      })
      .then((data) => {
        if (cancelled) return;
        if (data.available) {
          setAvailability({ state: "available" });
        } else {
          setAvailability({
            state: "unavailable",
            whatsappUrl: data.whatsappUrl || LOCAL_WHATSAPP_URL,
          });
        }
      })
      .catch((err) => {
        if (cancelled) return;
        // The hub is not the source of truth for whether WhatsApp works. Fall
        // back to our own number rather than stranding the buyer.
        console.error("[checkout] availability probe failed", err);
        setAvailability({ state: "unavailable", whatsappUrl: LOCAL_WHATSAPP_URL });
      });

    return () => {
      cancelled = true;
    };
  }, [orderName]);

  /* ── Money ──────────────────────────────────────────────────────────────
     Every figure on this page comes from calculateOrderTotal, which is the
     only place that knows Premium's proxy is already paid for. */
  const chargeProxy = proxyOn && !tier.proxyIncluded;
  const proxyLine = chargeProxy ? plan.proxyPrice : 0;
  const extrasLine = extraConnections * plan.extraConnectionPrice;
  const total = calculateOrderTotal({
    planPrice,
    proxyEnabled: proxyOn,
    proxyPrice: plan.proxyPrice,
    proxyIncluded: tier.proxyIncluded,
    extraConnections,
    extraConnectionPrice: plan.extraConnectionPrice,
  });

  // Per-month figures appear only where the term divides the price exactly.
  // Our add-ons are sold per term; a rounded "/mo" would not multiply back.
  const planPerMonth = exactPerMonth(planPrice, plan.months);
  const extraUnitPerMonth = exactPerMonth(plan.extraConnectionPrice, plan.months);
  const totalPerMonth = exactPerMonth(total, plan.months);

  // Screens: the counter adds ON TOP of what the tier already includes, so the
  // next one bought is screen (base + current + 1). On Premium that is the
  // seventh — the sixth is in the bundle at a different effective price, and
  // the two must never read as the same number.
  const includedScreens = tier.baseScreens;
  const totalScreens = includedScreens + extraConnections;
  const nextScreenNumber = totalScreens + 1;

  const trimmedEmail = email.trim();
  const trimmedPhone = phone.trim();
  const name = `${firstName} ${lastName}`.trim();
  const emailValid = isDeliverableEmail(trimmedEmail);
  // Jointly required — either field alone satisfies it, so mononyms work.
  const nameValid = (firstName.trim() + lastName.trim()).length >= 2;
  // Required on this site (the layout marks it required), validated with the
  // reference project's deliberately loose regex.
  const phoneValid = PHONE_RE.test(trimmedPhone.replace(/[\s\-().]/g, ""));
  const formValid = emailValid && nameValid && phoneValid;

  const handleApplyPromo = () => {
    const code = promoCode.trim();
    setPromoNotice(
      code
        ? "That code isn't recognised. Any active discount is already in the price above."
        : "Enter a code first."
    );
  };

  const handleBuyNow = async () => {
    setTouched(true);
    if (availability.state !== "available" || !formValid || submitting) return;

    setSubmitting(true);
    try {
      const response = await callCheckoutHub({
        planName: orderName,
        siteSlug: SITE_SLUG,
        email: trimmedEmail,
        name,
        phone: trimmedPhone || undefined,
        proxyEnabled: proxyOn,
        extraConnections,
      });

      if (response.kind === "shopify") {
        window.location.href = response.checkoutUrl;
        return;
      }

      // Store was claimed between page load and click — switch the UI rather
      // than redirecting somewhere unexpected.
      setAvailability({
        state: "unavailable",
        whatsappUrl: response.whatsappUrl || LOCAL_WHATSAPP_URL,
      });
      setSubmitting(false);
    } catch (err) {
      // Hub down or unreachable. Degrade to WhatsApp on our own number rather
      // than trapping the buyer behind an error.
      console.error("[checkout] callCheckoutHub failed", err);
      setAvailability({ state: "unavailable", whatsappUrl: LOCAL_WHATSAPP_URL });
      setSubmitting(false);
    }
  };

  const handleWhatsappClick = () => {
    if (availability.state !== "unavailable") return;

    const message = buildWhatsappMessage({
      planName: orderName,
      proxyOn,
      proxyIncluded: tier.proxyIncluded,
      extraConnections,
      total,
      currency: CURRENCY,
    });

    const { whatsappUrl } = availability;
    const base = whatsappUrl || LOCAL_WHATSAPP_URL;
    const separator = base.includes("?") ? "&" : "?";
    window.open(
      `${base}${separator}text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const checking = availability.state === "checking";
  const useShopify = availability.state === "available";
  const showErrors = touched && !formValid;

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <a className={styles.back} href="/#pricing">
          <svg viewBox="0 0 16 16" aria-hidden="true" className={styles.backIcon}>
            <path
              d="M10 3 5 8l5 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to plans
        </a>

        <div className={styles.grid}>
          {/* ── LEFT: order summary + promo ─────────────────────────────── */}
          <aside className={styles.aside}>
            <section className={styles.card} aria-labelledby="order-summary-heading">
              <h2 id="order-summary-heading" className={styles.cardTitle}>
                Your order
              </h2>

              <dl className={styles.lines}>
                <div className={styles.line}>
                  <dt className={styles.lineLabel}>
                    {orderName}
                    <span className={styles.lineSub}>
                      {includedScreens} screens · {plan.term.toLowerCase()}
                    </span>
                  </dt>
                  <dd className={styles.lineValue}>
                    {money(planPrice)}
                    {planPerMonth ? (
                      <span className={styles.lineSub}>{money(Number(planPerMonth))}/mo</span>
                    ) : null}
                  </dd>
                </div>

                {proxyOn ? (
                  <div className={styles.line}>
                    <dt className={styles.lineLabel}>Secure Proxy</dt>
                    <dd className={styles.lineValue}>
                      {tier.proxyIncluded ? (
                        <span className={styles.included}>Included</span>
                      ) : (
                        money(proxyLine)
                      )}
                    </dd>
                  </div>
                ) : null}

                {extraConnections > 0 ? (
                  <div className={styles.line}>
                    <dt className={styles.lineLabel}>
                      {extraConnections} extra connection{extraConnections > 1 ? "s" : ""}
                      <span className={styles.lineSub}>
                        {extraConnections} × {money(plan.extraConnectionPrice)}
                      </span>
                    </dt>
                    <dd className={styles.lineValue}>{money(extrasLine)}</dd>
                  </div>
                ) : null}
              </dl>

              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Total</span>
                <span className={styles.totalValue}>
                  {money(total)}
                  {totalPerMonth ? (
                    <span className={styles.lineSub}>{money(Number(totalPerMonth))}/mo</span>
                  ) : null}
                </span>
              </div>

              <p className={styles.totalNote}>
                One payment for the full {plan.term.toLowerCase()}. Nothing renews.
              </p>
            </section>

            <section className={styles.card} aria-labelledby="promo-heading">
              <h2 id="promo-heading" className={styles.cardTitle}>
                Have a promo code?
              </h2>
              <p className={styles.promoHelp}>
                If you have one, apply it here before completing the order.
              </p>
              <div className={styles.promoRow}>
                <label className={styles.srOnly} htmlFor="promo">
                  Promo code
                </label>
                <input
                  id="promo"
                  className={styles.promoInput}
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value);
                    setPromoNotice(null);
                  }}
                  placeholder="Enter code"
                  autoComplete="off"
                  spellCheck={false}
                />
                <button type="button" className={styles.promoApply} onClick={handleApplyPromo}>
                  Apply
                </button>
              </div>
              {promoNotice ? (
                <p className={styles.promoNotice} role="status">
                  {promoNotice}
                </p>
              ) : null}
            </section>
          </aside>

          {/* ── RIGHT: billing details ──────────────────────────────────── */}
          <section className={styles.main} aria-labelledby="billing-heading">
            <h1 id="billing-heading" className={styles.cardTitle}>
              Billing details
            </h1>

            {/* 1. Extra connections — ± counter, not a toggle */}
            <div className={styles.addon} data-active={extraConnections > 0 ? "" : undefined}>
              <div className={styles.stepper} role="group" aria-label="Extra connections">
                <button
                  type="button"
                  className={styles.stepBtn}
                  onClick={() => setExtraConnections((n) => Math.max(0, n - 1))}
                  disabled={extraConnections === 0}
                  aria-label="Remove one extra connection"
                >
                  −
                </button>
                <span className={styles.stepValue} aria-live="polite">
                  {extraConnections}
                </span>
                {/* At zero this is the only thing to do in the row, so it is
                    lit. Once counting it drops back to a peer of the minus. */}
                <button
                  type="button"
                  className={`${styles.stepBtn} ${styles.stepAdd}`}
                  data-invite={extraConnections === 0 ? "" : undefined}
                  onClick={() =>
                    setExtraConnections((n) => Math.min(EXTRA_CONNECTIONS_MAX, n + 1))
                  }
                  disabled={extraConnections >= EXTRA_CONNECTIONS_MAX}
                  aria-label="Add one extra connection"
                >
                  +
                </button>
              </div>

              <div className={styles.addonBody}>
                <p className={styles.addonKicker}>Optional add-on</p>
                <p className={styles.addonTitle}>
                  {CHECKOUT_COPY.extraConnectionsLabel}
                  {extraConnections > 0 ? (
                    <span className={styles.countPill}>
                      {totalScreens} screens
                    </span>
                  ) : null}
                </p>
                <p className={styles.addonHelp}>
                  {extraConnections >= EXTRA_CONNECTIONS_MAX
                    ? `Maximum ${EXTRA_CONNECTIONS_MAX} extra. That is ${totalScreens} screens at once.`
                    : `Your plan includes ${includedScreens}. The next one is screen ${nextScreenNumber}.`}
                </p>
              </div>

              <div className={styles.addonPrice}>
                <span className={styles.addonAmount}>
                  {extraConnections > 0 ? money(extrasLine) : money(plan.extraConnectionPrice)}
                </span>
                <span className={styles.addonUnit}>
                  {extraConnections > 0
                    ? `${extraConnections} × ${money(plan.extraConnectionPrice)}`
                    : "each, for the term"}
                </span>
                {extraUnitPerMonth && extraConnections === 0 ? (
                  <span className={styles.addonUnit}>
                    {money(Number(extraUnitPerMonth))}/mo each
                  </span>
                ) : null}
              </div>
            </div>

            {/* 2. Secure Proxy — locked and free on Premium */}
            <div
              className={styles.addon}
              data-locked={tier.proxyIncluded ? "" : undefined}
              data-active={proxyOn ? "" : undefined}
            >
              <div className={styles.stepper}>
                <button
                  type="button"
                  role="switch"
                  aria-checked={proxyOn}
                  aria-label={
                    tier.proxyIncluded
                      ? "Secure Proxy is included in this plan"
                      : "Add Secure Proxy"
                  }
                  className={styles.toggle}
                  data-on={proxyOn ? "" : undefined}
                  disabled={tier.proxyIncluded}
                  onClick={() => {
                    if (!tier.proxyIncluded) setProxyOn((v) => !v);
                  }}
                >
                  <span className={styles.toggleKnob} aria-hidden="true" />
                </button>
              </div>

              <div className={styles.addonBody}>
                <p className={styles.addonKicker}>
                  {tier.proxyIncluded ? "In your plan" : "Optional add-on"}
                </p>
                <p className={styles.addonTitle}>
                  {CHECKOUT_COPY.proxyLabel}
                  <span className={styles.badge}>Recommended</span>
                </p>
                <p className={styles.addonHelp}>
                  {tier.proxyIncluded
                    ? CHECKOUT_COPY.proxyIncludedHelp
                    : CHECKOUT_COPY.proxyHelp}
                </p>
              </div>

              <div className={styles.addonPrice}>
                {tier.proxyIncluded ? (
                  <span className={styles.included}>Included</span>
                ) : (
                  <>
                    <span className={styles.addonAmount}>{money(plan.proxyPrice)}</span>
                    <span className={styles.addonUnit}>for the term</span>
                  </>
                )}
              </div>
            </div>

            {/* 3-5. Details */}
            <div className={styles.fields}>
              <div className={styles.fieldRow}>
                <Field
                  id="first-name"
                  label="First name"
                  value={firstName}
                  onChange={setFirstName}
                  autoComplete="given-name"
                  invalid={showErrors && !nameValid}
                />
                <Field
                  id="last-name"
                  label="Last name"
                  value={lastName}
                  onChange={setLastName}
                  autoComplete="family-name"
                  invalid={showErrors && !nameValid}
                />
              </div>

              <Field
                id="phone"
                label="Phone number"
                type="tel"
                value={phone}
                onChange={setPhone}
                autoComplete="tel"
                invalid={showErrors && !phoneValid}
                hint="So we can reach you on WhatsApp if there is a problem with delivery."
                error={showErrors && !phoneValid ? "Enter a phone number we can reach you on." : null}
              />

              <Field
                id="email"
                label="Email address"
                type="email"
                value={email}
                onChange={setEmail}
                autoComplete="email"
                invalid={showErrors && !emailValid}
                error={
                  showErrors && !emailValid
                    ? "Your login is emailed here, so it has to be an address that receives mail."
                    : null
                }
              />
            </div>

            {/* 6. Primary action */}
            {useShopify ? (
              <button
                type="button"
                className={styles.primary}
                onClick={handleBuyNow}
                disabled={submitting}
              >
                {submitting ? "Working…" : `${CHECKOUT_COPY.buyNowLabel} · ${money(total)}`}
              </button>
            ) : (
              <button
                type="button"
                className={`${styles.primary} ${styles.primaryWa}`}
                onClick={handleWhatsappClick}
                disabled={checking}
              >
                {checking ? "Checking availability…" : `${CHECKOUT_COPY.whatsappLabel} · ${money(total)}`}
              </button>
            )}

            <p className={styles.actionNote}>
              {checking
                ? "One moment — confirming how this order can be completed."
                : useShopify
                  ? CHECKOUT_COPY.buttonSubtitleShopify
                  : CHECKOUT_COPY.buttonSubtitleWhatsapp}
            </p>

            {showErrors ? (
              <p className={styles.formError} role="alert">
                Please complete the highlighted fields before continuing.
              </p>
            ) : null}

            {/* 7. Trust row */}
            <ul className={styles.trust}>
              <li className={styles.trustItem}>
                <TrustIcon d="M3 7h11v7H3zM14 10h3l3 3v1h-6z M6.5 16.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17 16.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                <span>Instant delivery</span>
                <span className={styles.trustSub}>Login by email, usually minutes</span>
              </li>
              <li className={styles.trustItem}>
                <TrustIcon d="M12 3v18M8.5 7.5h5.2a2.3 2.3 0 0 1 0 4.6H9.8a2.3 2.3 0 0 0 0 4.6h5.7" />
                <span>30-day money back</span>
                <span className={styles.trustSub}>Ask on WhatsApp, no forms</span>
              </li>
              <li className={styles.trustItem}>
                <TrustIcon d="M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6zM9.5 12l1.8 1.8 3.4-3.6" />
                <span>Secure payment</span>
                <span className={styles.trustSub}>No card details on this site</span>
              </li>
            </ul>

            {/* 8. Banner */}
            <p className={styles.banner}>
              Secure payment <span>guaranteed</span>
            </p>

            {/* 9. Payment marks */}
            <ul className={styles.marks} aria-label={FOOTER.payment.label}>
              {FOOTER.payment.marks.map((mark) => (
                <li key={mark.id} className={styles.mark}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/trust/${mark.id}.webp`}
                    alt={mark.name}
                    width={64}
                    height={40}
                    loading="lazy"
                    decoding="async"
                  />
                </li>
              ))}
            </ul>

            <p className={styles.footNote}>{CHECKOUT_COPY.footerNote}</p>
            <p className={styles.srOnly}>{SITE_NAME}</p>
          </section>
        </div>
      </div>
    </div>
  );
}

function TrustIcon({ d }: { d: string }) {
  return (
    <svg
      className={styles.trustIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  invalid,
  hint,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  invalid?: boolean;
  hint?: string;
  error?: string | null;
}) {
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label} <span aria-hidden="true">*</span>
      </label>
      <input
        id={id}
        className={styles.input}
        type={type}
        value={value}
        required
        autoComplete={autoComplete}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy || undefined}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint ? (
        <p id={`${id}-hint`} className={styles.hint}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className={styles.fieldError}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
