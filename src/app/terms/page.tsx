import type { Metadata } from "next";
import {
  SITE_NAME,
  CONTACT_EMAIL,
  SITE_LOGO_URL,
  SITE_URL,
} from "@/lib/constants";

const title = "Terms of Service";
const description = `Terms and conditions for using ${SITE_NAME} IPTV services.`;
const url = `${SITE_URL}/terms`;

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

export default function TermsPage() {
  return (
    <div className="pt-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
        <div className="space-y-6 text-sm text-muted leading-relaxed">
          <p className="text-muted">Last updated: 1 April 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using {SITE_NAME} (&ldquo;the Service&rdquo;), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our Service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. Service Description</h2>
            <p>{SITE_NAME} provides Internet Protocol Television (IPTV) streaming services, delivering live television channels and video-on-demand content over the internet to subscribers in the United Kingdom and internationally.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. Subscriptions & Payments</h2>
            <p>A subscription is a single payment for a fixed term — 3, 6, 12 or 24 months — chosen at the time of purchase. All prices are displayed in British Pounds (GBP). Payment is arranged over WhatsApp and taken once. No card number or payment credential is entered on this website or stored by us, and there is no recurring billing of any kind.</p>
            <p className="mt-3">Your access runs for the term you bought and ends when that term expires. <strong className="text-foreground">It does not renew automatically</strong>, no further payment is ever taken, and there is no cancellation step to remember — if you want another term, you buy one deliberately.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Refund Policy</h2>
            <p>We offer a 30-day money-back guarantee on your first purchase of a subscription term. If you are not satisfied with our service within the first 30 days, contact us for a full refund. Requests are processed within 24–48 hours of receipt, and the money may take a further 5–10 business days to appear in your account depending on the payment method used.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">5. Acceptable Use</h2>
            <p>You agree not to redistribute, resell, or share your subscription credentials with unauthorised parties. Each subscription is for personal, non-commercial use only. We reserve the right to suspend or terminate accounts that violate these terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">6. Service Availability</h2>
            <p>We aim to provide reliable, uninterrupted access to the Service but do not guarantee it. Scheduled maintenance, technical issues, or circumstances beyond our control may occasionally affect availability. We will endeavour to notify users of planned maintenance in advance.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">7. Contact</h2>
            <p>For questions about these Terms of Service, please contact us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
