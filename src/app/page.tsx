import type { Metadata } from "next";

import Hero from "@/components/hero/Hero";
import MetricsStrip from "@/components/metrics/MetricsStrip";
import Statement from "@/components/statement/Statement";
import Pricing from "@/components/pricing/Pricing";
import WhyChooseUs from "@/components/why-choose-us/WhyChooseUs";
import KeyFeatures from "@/components/features/KeyFeatures";
import Comparison from "@/components/comparison/Comparison";
import Devices from "@/components/devices/Devices";
import Reviews from "@/components/reviews/Reviews";
import Overview from "@/components/overview/Overview";
import Manifesto from "@/components/manifesto/Manifesto";
import Faq from "@/components/faq/Faq";
import ClosingCta from "@/components/closing/ClosingCta";

import { FAQ } from "@/data/faq";
import { TIERS, TIER_ORDER } from "@/data/pricing";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL, WHATSAPP_DISPLAY } from "@/lib/constants";

const title = "IPTV Subscriptions UK — No Auto-Billing, 30-Day Refund";
const description =
  "IPTV subscriptions for UK homes — 37,000+ live channels, 198,000+ films in 4K, five screens on one login. Pay once, nothing auto-renews. 30-day refund.";

// Bump when pricing is reviewed. An expired date suppresses the rich result,
// so a stale value is worse than none.
const PRICE_VALID_UNTIL = "2026-12-31";

/**
 * Social and Product artwork.
 *
 * TODO (manual, before deploy): replace with a purpose-built 1200x630
 * og-image.png. This points at the hero device row so that nothing references
 * a 404 — Product.image is required for Product rich results, and a missing
 * file there costs more than an imperfect aspect ratio.
 */
const SHARE_IMAGE_PATH = "/hero/devices-row.webp";
const SHARE_IMAGE_URL = `${SITE_URL}${SHARE_IMAGE_PATH}`;
const SHARE_IMAGE_ALT =
  "An IPTV subscription running on a smart TV, a Fire TV Stick, a tablet and a phone at the same time";

export const metadata: Metadata = {
  // Absolute: the site-name template would push this past 79 characters.
  title: { absolute: title },
  description,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    type: "website",
    siteName: SITE_NAME,
    locale: "en_GB",
    images: [
      { url: SHARE_IMAGE_URL, width: 900, height: 135, alt: SHARE_IMAGE_ALT },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [{ url: SHARE_IMAGE_URL, alt: SHARE_IMAGE_ALT }],
  },
};

export default function HomePage() {
  const organizationId = `${SITE_URL}/#organization`;
  const returnPolicyId = `${SITE_URL}/#returnpolicy`;
  const websiteId = `${SITE_URL}/#website`;
  const webpageId = `${SITE_URL}/#webpage`;
  const productId = `${SITE_URL}/#product`;
  const breadcrumbId = `${SITE_URL}/#breadcrumb`;
  const logoUrl = `${SITE_URL}/logo-512.png`;

  /**
   * Eight offers: both tiers run all four terms. Built from the same arrays the
   * pricing section renders, so a price can never drift between the card and
   * the markup.
   *
   * No `aggregateRating` and no `review` — we have collected none, and the
   * DMCC Act 2024 makes inventing them permanently off the table.
   */
  const offers = TIER_ORDER.flatMap((tierId) =>
    TIERS[tierId].plans.map((plan) => ({
      "@type": "Offer",
      name: `${plan.term} — ${TIERS[tierId].label}`,
      price: plan.price,
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      url: `${SITE_URL}/#pricing`,
      priceValidUntil: PRICE_VALID_UNTIL,
      hasMerchantReturnPolicy: { "@id": returnPolicyId },
    }))
  );

  return (
    <>
      <Hero />
      <MetricsStrip />
      <Statement />
      <Pricing />
      <WhyChooseUs />
      <KeyFeatures />
      <Comparison />
      <Devices />
      <Reviews />
      <Overview />
      <Manifesto />
      <Faq />
      <ClosingCta />

      {/* ── JSON-LD ──────────────────────────────────────────────────────
          Every node below describes something that is actually on THIS page.
          Product, FAQPage and MerchantReturnPolicy stay here rather than in
          the root layout: in the layout they would also render on /terms,
          /privacy and every blog post, describing content those pages do not
          have. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": organizationId,
                name: SITE_NAME,
                alternateName: "IPTV Subscription UK",
                url: SITE_URL,
                logo: {
                  "@type": "ImageObject",
                  url: logoUrl,
                  width: 512,
                  height: 512,
                },
                description:
                  "IPTV subscriptions for UK homes — 37,000+ live channels, 198,000+ films and series in 4K UHD, five simultaneous screens and a 30-day money-back guarantee.",
                areaServed: { "@type": "Country", name: "United Kingdom" },
                publishingPrinciples: `${SITE_URL}/editorial-policy`,
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "customer service",
                  availableLanguage: "English",
                  areaServed: "GB",
                  email: CONTACT_EMAIL,
                  telephone: WHATSAPP_DISPLAY,
                },
                // `sameAs` is deliberately absent rather than empty — an empty
                // array asserts "this entity has no profiles"; an absent key
                // stays silent.
              },
              {
                "@type": "WebSite",
                "@id": websiteId,
                name: SITE_NAME,
                url: SITE_URL,
                inLanguage: "en-GB",
                publisher: { "@id": organizationId },
              },
              {
                "@type": "WebPage",
                "@id": webpageId,
                url: SITE_URL,
                name: title,
                description,
                inLanguage: "en-GB",
                isPartOf: { "@id": websiteId },
                about: { "@id": organizationId },
                breadcrumb: { "@id": breadcrumbId },
              },
              {
                "@type": "MerchantReturnPolicy",
                "@id": returnPolicyId,
                applicableCountry: "GB",
                returnPolicyCategory:
                  "https://schema.org/MerchantReturnFiniteReturnWindow",
                merchantReturnDays: 30,
                returnMethod: "https://schema.org/ReturnByMail",
                returnFees: "https://schema.org/FreeReturn",
                merchantReturnLink: `${SITE_URL}/refund`,
              },
              {
                "@type": "BreadcrumbList",
                "@id": breadcrumbId,
                // Single crumb by design. Position 2 previously pointed at
                // `/#features` — a fragment, not a page, which Google treats as
                // noise rather than a second-level crumb.
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: SITE_URL,
                  },
                ],
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "@id": productId,
            name: "IPTV Subscription UK",
            url: SITE_URL,
            image: [SHARE_IMAGE_URL],
            description:
              "A UK IPTV subscription with 37,000+ live channels, 198,000+ on-demand films and series, native 4K UHD where the broadcast supports it, and five simultaneous screens — from £3.33/month on the 24-month term. One-time payment with no auto-renewal, and a 30-day money-back guarantee.",
            brand: { "@type": "Brand", name: SITE_NAME, "@id": organizationId },
            category: "IPTV subscription",
            offers,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            // Built from the same array the accordion renders, so the answers
            // cannot drift from what is on the page.
            mainEntity: FAQ.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }),
        }}
      />
    </>
  );
}
