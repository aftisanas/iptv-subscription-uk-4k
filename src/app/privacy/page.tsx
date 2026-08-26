import type { Metadata } from "next";
import {
  SITE_NAME,
  CONTACT_EMAIL,
  SITE_LOGO_URL,
  SITE_URL,
} from "@/lib/constants";

const title = "Privacy Policy";
const description = `Privacy policy for ${SITE_NAME}. Learn how we collect, use, and protect your personal data.`;
const url = `${SITE_URL}/privacy`;

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

export default function PrivacyPage() {
  return (
    <div className="pt-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
        <div className="space-y-6 text-sm text-muted leading-relaxed">
          <p className="text-muted">Last updated: 1 April 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Information We Collect</h2>
            <p>We collect what you send us directly: your email address, and the content of your WhatsApp or email messages when you contact us or buy a subscription. Payment is arranged over WhatsApp through your own payment provider — <strong className="text-foreground">no card number or payment credential is entered on this website, and none is stored by us</strong>.</p>
            <p className="mt-3">This website runs no analytics, advertising or tracking scripts. We do not build a profile of your browsing, and we do not collect viewing preferences through this site.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
            <p>Your information is used to activate your subscription, answer enquiries, provide support and handle refund requests. We do not sell your personal data to third parties, and we do not use it for advertising or profiling.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. Data Protection</h2>
            <p>This site is served over HTTPS. Because no payment is taken on the website, there is no card data for us to hold or to lose. What we do hold — your email address and your correspondence with us — is kept only as long as it is needed to support your subscription and to meet our record-keeping obligations. We comply with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Your Rights</h2>
            <p>Under UK GDPR, you have the right to access, rectify, erase, restrict processing, and port your personal data. You may also object to processing and withdraw consent at any time. To exercise these rights, contact us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">5. Cookies</h2>
            <p>This website sets no analytics, advertising or tracking cookies. Any cookie present is strictly necessary for the page to work. Because we do not track visitors, there is no profile to opt out of — though you can clear or block cookies through your browser settings at any time.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">6. Contact</h2>
            <p>For privacy-related enquiries, contact our Data Protection Officer at <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
