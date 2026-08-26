import type { Metadata } from "next";
import Link from "next/link";
import {
  SITE_NAME,
  CONTACT_EMAIL,
  SITE_LOGO_URL,
  SITE_URL,
} from "@/lib/constants";

const title = "Editorial Policy";
const description = `How ${SITE_NAME} researches, writes and reviews its guides — and how we handle the conflict of interest in selling into the market we advise on.`;
const url = `${SITE_URL}/editorial-policy`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    type: "website",
    siteName: SITE_NAME,
    locale: "en_GB",
    images: [{ url: SITE_LOGO_URL, alt: `${SITE_NAME} logo` }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [SITE_LOGO_URL],
  },
};

export default function EditorialPolicyPage() {
  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    url,
    name: title,
    description,
    inLanguage: "en-GB",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <div className="pt-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Editorial Policy
        </h1>
        <p className="text-lg text-muted leading-relaxed mb-8">
          How the guides on this site are researched, written, sourced and
          reviewed — and how we handle the obvious conflict of interest in
          publishing buying advice about a market we sell into.
        </p>

        <div className="space-y-8 text-sm text-muted leading-relaxed">
          <p className="text-muted">Last updated: 31 July 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Who writes this content
            </h2>
            <p>
              Articles on this site are researched and written by the{" "}
              {SITE_NAME} editorial team and published under the company name
              rather than an individual byline. We publish under the
              organisation because the work is collaborative and because
              inventing a personal byline for content produced by a team would
              be a misrepresentation. Where an article makes a factual claim,
              the claim is sourced rather than attributed to a persona.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Our conflict of interest, stated plainly
            </h2>
            <p>
              {SITE_NAME} sells IPTV subscriptions. Several of our guides give
              advice on how to evaluate and buy an IPTV subscription. That is a
              conflict of interest, and no editorial policy makes it disappear.
            </p>
            <p className="mt-3">
              What we do about it: any section describing our own service is
              labelled as such within the article, so a reader always knows
              when they have moved from general guidance to a description of
              what we sell. We do not present our own service as the outcome of
              a comparison we ran. We do not publish reviews of named
              competitors. And the evaluation criteria we set out are ones we
              expect to be applied to us as sceptically as to anyone else — our
              guides say so explicitly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Sourcing
            </h2>
            <p>
              Claims about UK consumer rights are linked to the primary source
              on legislation.gov.uk rather than paraphrased from secondary
              coverage. Where we describe how a process typically works —
              chargeback windows, cooling-off periods, escalation routes — we
              say &ldquo;typically&rdquo; because these vary by issuer and
              circumstance, and we point readers to the body that can answer
              for their specific case.
            </p>
            <p className="mt-3">
              Claims about our own service (channel counts, library size,
              included connections, refund window, add-on pricing) come from our
              current product configuration and are updated when it changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              What we do not publish
            </h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Invented statistics. We do not publish subscriber counts,
                average ratings, or uptime percentages we cannot substantiate.
              </li>
              <li>
                Fabricated testimonials or reviews, including stock-photo
                avatars attached to invented quotes.
              </li>
              <li>
                Aggregate rating markup we have no real reviews behind.
              </li>
              <li>
                Comparisons that name competitors or use third-party
                broadcaster and rights-holder trademarks as a selling point.
              </li>
              <li>
                Claims that a feature is included when it is a paid add-on at
                checkout.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Review and updates
            </h2>
            <p>
              Each article carries a published date and a last-updated date. We
              review guides when the underlying facts change — a change to our
              own plans or pricing, or a change to the consumer-protection
              framework we cite. Substantive corrections are made in the article
              itself and the last-updated date is moved; we do not silently
              revise a claim and leave the original date in place.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Legal information is general, not advice
            </h2>
            <p>
              Our guides describe the UK consumer-rights framework in general
              terms. They are not legal advice and cannot account for the facts
              of an individual dispute. For guidance on a specific case, the
              Citizens Advice consumer helpline is a free first point of
              contact, and a qualified legal advisor can advise on the
              particulars.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Corrections and contact
            </h2>
            <p>
              If you believe something on this site is inaccurate, tell us and
              we will check it. Email{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-primary hover:underline"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              or use the{" "}
              <Link href="/contact" className="text-primary hover:underline">
                contact page
              </Link>
              . Where a correction is warranted we make it in the article and
              update the last-updated date.
            </p>
          </section>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />
    </div>
  );
}
