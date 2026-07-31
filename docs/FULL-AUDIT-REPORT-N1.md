SEO Audit — iptv-subscription-uk-4k.com                                                                                                   
                                                                                                                                            
  Audited: 2026-07-17 · Type detected: Digital-service subscription (single-product landing + blog) · Pages in sitemap: 12 · Live status:   
  200, TTFB 585ms, HSTS on, Cloudflare edge (HIT)                                                                                         
                                             
  SEO Health Score: 72 / 100                                                                                                                
                                                  
  ┌──────────────────────────┬───────┬────────┬───────────────────────────────────────────────────────────────────────────────┐               │         Category         │ Score │ Weight │                                     Notes                                     │           
  ├──────────────────────────┼───────┼────────┼───────────────────────────────────────────────────────────────────────────────┤               │ Technical SEO            │ 68    │ 22%    │ Duplicate CF headers, missing 301s for deleted URLs, no CSP                   │             
  ├──────────────────────────┼───────┼────────┼───────────────────────────────────────────────────────────────────────────────┤             
  │ Content Quality          │ 74    │ 23%    │ 3 excellent Sprint-N1 posts; 2 legacy thin posts drag average                 │             
  ├──────────────────────────┼───────┼────────┼───────────────────────────────────────────────────────────────────────────────┤             
  │ On-Page SEO              │ 82    │ 20%    │ Strong titles, canonical, hreflang; nav missing /blog + /contact              │             
  ├──────────────────────────┼───────┼────────┼───────────────────────────────────────────────────────────────────────────────┤             
  │ Schema / Structured Data │ 78    │ 10%    │ Rich homepage graph; blog Article schema minimal; FAQ opportunity missed      │             
  ├──────────────────────────┼───────┼────────┼───────────────────────────────────────────────────────────────────────────────┤             
  │ Performance (CWV)        │ ~70*  │ 10%    │ *PSI quota exhausted — estimated from HAR (framer-motion + particles on hero) │             
  ├──────────────────────────┼───────┼────────┼───────────────────────────────────────────────────────────────────────────────┤             
  │ AI Search Readiness      │ 76    │ 10%    │ llms.txt present, honest positioning, good headings                           │             
  ├──────────────────────────┼───────┼────────┼───────────────────────────────────────────────────────────────────────────────┤             
  │ Images                   │ 65    │ 5%     │ Only 1 image asset, no dedicated OG image, logo undersized for social         │             
  └──────────────────────────┴───────┴────────┴───────────────────────────────────────────────────────────────────────────────┘             
                                                                                                                                            
  Rationale for the composite is walked through PERCEIVE → ANALYZE → VALIDATE → ACT below.                                                  

  ---
  Executive Summary

  The site is well-built (Next.js SSR, security headers, honest schema post-N0 fixes) but has one live regression and two legacy
  thin-content pages that undermine the recent authority work. Sprint N1's 3 new long-form posts are genuinely strong — the framework issue
  is architectural, not editorial.

  Top 5 Critical / High:
  1. [Critical] Commit 50765ad promises 301s for /blog/iptv-vs-sky-comparison, /iptv-free-trial and the deleted sports blogs. Live server
  returns 404. No redirects() block exists in next.config.ts:23, no middleware.ts, no vercel.json.
  2. [High] blog/best-iptv-uk-guide-2026 = 601 words, advertises "12 min read". blog/how-to-setup-iptv-firestick ≈ 350 words, advertises "6
  min read". These are thin-content flags on a subscription site and directly contradict their own metadata.
  3. [High] Duplicate + conflicting security headers on live response — X-Frame-Options: DENY (Next) AND SAMEORIGIN (Cloudflare);
  Referrer-Policy: strict-origin-when-cross-origin AND same-origin. Cloudflare is layering its defaults on top of yours.
  4. [High] /blog and /contact are not in NAV_LINKS (src/lib/constants.ts:25-30). The blog is invisible from the header — a
  topical-authority ceiling and a discoverability tax on your best new content.
  5. [High] Contact email in JSON-LD Organization = contact@buy-iptv-uk.com — a different domain than the site. The on-page email link is
  also Cloudflare email-obfuscated, so schema and page state diverge. E-E-A-T signal weakness for a paid-service site.

  Top 5 Quick Wins:
  1. Add redirects() array to next.config.ts for the DMCA-deleted URLs → 301 to /blog and /#pricing.
  2. Add Blog + Contact to NAV_LINKS; add Contact to footer.
  3. Either rewrite the two thin blog posts to match their readTime (~2,000 and ~900 words) or delete them and 301 to the strongest new
  post.
  4. Add FAQPage schema to the 3 new Sprint-N1 blog posts (each has 5–6 QA pairs already in the content).
  5. Ship a proper 1200×630 OG image (currently the site logo .webp is used and won't render cleanly on Twitter/LinkedIn cards).

  ---
  Findings by Category

  1. Technical SEO

  Working well: HTTPS + HSTS preload; robots.ts clean; sitemap.ts correctly excludes deleted routes; x-nextjs-cache: HIT (edge cache warm);
  cache-control: s-maxage=31536000 on prerender; Google-bot directives explicit.

  Issues:
  - Duplicate headers (High). Cloudflare is injecting SAMEORIGIN, Referrer-Policy: same-origin, x-xss-protection,
  x-permitted-cross-domain-policies on top of your next.config.ts:5-21 set. Browsers pick the strictest per header, so security isn't
  degraded, but scanners flag it and it makes your config non-authoritative. Fix in Cloudflare dashboard → Rules → Transform Rules →
  Response Header Modification, or Configuration Rules → disable "Managed Response Headers".
  - Missing 301s (Critical). No redirects() in next.config.ts. Add:
  async redirects() {
    return [
      { source: '/blog/iptv-vs-sky-comparison', destination: '/blog', permanent: true },
      { source: '/iptv-free-trial', destination: '/#pricing', permanent: true },
      // + any other sports/trademark blogs deleted in 50765ad
    ];
  }
  - Why this matters: external backlinks + Google's cached index still point at these URLs. 404 loses the equity; 301 preserves it.
  Falsifiability: curl -sI /blog/iptv-vs-sky-comparison should return HTTP/2 301.
  - No CSP header (Medium). Add a Content-Security-Policy (start with Report-Only mode) — you already control all first-party assets and
  have exactly two external touch points (Cloudflare email, WhatsApp URL).
  - Cloudflare email obfuscation (Medium). The mailto is rewritten to /cdn-cgi/l/email-protection#…. Contradicts your JSON-LD
  contactPoint.email. Either disable Email Address Obfuscation in Cloudflare → Scrape Shield, or use the WhatsApp/contact form as the sole
  exposed channel and drop the mailto.

  2. Content Quality (E-E-A-T)

  Strong: The 3 Sprint-N1 posts (how-to-buy-iptv-subscription-uk, whats-included-in-iptv-subscription-uk,
  iptv-subscription-renewal-cancellation-refund-uk) are the strongest content on the site — 3,500+ words each, cite legislation.gov.uk,
  transparent "this service is the publisher" sections, real cross-linking. Genuinely citable by LLMs.

  Weak:
  - Thin posts (High). best-iptv-uk-guide-2026 = 601 words on live; how-to-setup-iptv-firestick ≈ 350. Both live in
  src/app/blog/[slug]/page.tsx:11-90. They also mismatch their own readTime — that's a self-inflicted trust signal ("readTime lies").
  Decision needed: rewrite to full length OR delete + 301 to the equivalent new post.
  - Homepage description discrepancy. layout.tsx:29-30 and page.tsx:22 use the same description, but OG/Twitter (page.tsx:36-38) mention
  £5.85/month — homepage <meta description> doesn't. Align them; the OG variant is stronger.

  3. On-Page SEO

  - Title: "IPTV Subscription UK | 37,000 Channels in 4K UHD" (55 chars) — clean, keyword-primary, brand-secondary. Good.
  - H1: "IPTV Subscription UK — 37,000 Channels in 4K UHD" — matches title conceptually, one H1. Good.
  - H2 hierarchy checks out (7 H2s on homepage, all keyword-aligned).
  - Canonical present, hreflang="en-GB" self-reference present.
  - Navigation gaps (High). NAV_LINKS in src/lib/constants.ts:25-30:
  Home · Why Us · Pricing · FAQ
  - Missing /blog (5 posts, ~15k words of content) and /contact (the page exists at src/app/contact/). These are your topical-authority +
  trust anchors — hiding them is throwing away recent work.
  - Keywords meta stuffing (Low). layout.tsx:31-47 has 15 keywords, many overlapping variants (iptv subscription uk, uk iptv subscription,
  iptv subscription, iptv uk 4k). Google ignores this tag, but Bing / Yandex / some AI scrapers penalize duplication. Trim to 8 unique or
  delete entirely.

  4. Schema / Structured Data

  Present on homepage (page.tsx:79-198): Organization, WebSite, WebPage, BreadcrumbList, Product (with 4 Offers), FAQPage. Well-linked via
  @id.

  - FAQPage on commercial site (Info). Google restricted rich-result eligibility to gov/health domains in Aug 2023. Keep for AI/LLM citation   benefit (still valuable) but don't expect Google FAQ rich snippets. Not a bug — a mismatched expectation.
  - Blog Article schema is minimal (Medium). blog/[slug]/page.tsx:137-157 sets headline, description, dates, author, publisher,
  mainEntityOfPage — missing image (using site logo would satisfy), wordCount, articleSection, keywords, and about. Author is Organization —   consider adding a lightweight Person for the 3 new posts (E-E-A-T Experience signal).
  - Missing FAQPage on blog posts (High opportunity). Each Sprint-N1 post contains a real FAQ section (5–6 Q&A pairs) rendered as plain
  text. Wrap those in FAQPage JSON-LD on the individual blog page. This is the single highest ROI schema addition.
  - Product aggregateRating absent (correct). Per commit 50765ad honesty pass — good, don't re-add unless you have real reviews.

  5. Performance (CWV)

  PSI daily quota was exhausted during audit — no live field data pulled. Lab-informed reading from HAR:
  - Payload: 182 KB HTML on first load, decent.
  - JS risk: framer-motion imported in 8 components including HeroSection, Navbar, HeroMotion, MotionReveal, MotionFadeIn,
  ParticleBackground (canvas). Hero is above-the-fold with 5 animated aurora blobs + particle canvas + motion H1.
  experimental.optimizePackageImports for framer-motion in next.config.ts:32-34 helps tree-shake but doesn't eliminate the runtime cost.
  - Font strategy: Inter preloaded (good), Outfit preload: false (good).
  - Image strategy: Hero logo fetchPriority="high" + full responsive srcset for a small icon (sizes="(min-width: 1024px) 56px, 48px") — the
  3840w variant is being generated for a 56px slot. Waste, not a bug. Actual LCP element is likely a text node in hero — should be fine.
  - Action: Re-run curl -sS "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=..." tomorrow when quota resets. If LCP > 2.5s
  mobile, consider dropping ParticleBackground or lazy-mounting after requestIdleCallback.

  6. AI Search Readiness (GEO)

  - llms.txt present, honest, matches on-page claims (verified via WebFetch).
  - Semantic HTML clean; H1/H2 hierarchy is scannable by LLM extractors.
  - Sprint-N1 posts cite legislation.gov.uk — real authority anchors for AI citations.
  - Miss: No Person author on blog posts (LLMs prefer named authors for citation).
  - Miss: No WebPage.speakable on FAQ answers.

  7. Images

  - Only asset: iptv-subscription.webp (site logo, small).
  - No dedicated 1200×630 og:image — Twitter/LinkedIn cards will crop/scale the logo poorly.
  - Action: Ship /og-cover.png (1200×630, brand + "IPTV Subscription UK — 4K UHD From £5.85/month") and reference in layout.tsx metadata +
  per-page overrides.

  ---
  Action Plan (Prioritized)

  Each recommendation includes THINK (why), CONNECT (depends on / unblocks), ACCEPT (how to know it failed), GROW (leading indicator).

  Critical — this week

  C1. Add 301 redirects for deleted DMCA/trademark URLs
  - THINK: External backlinks and Google's index still point at these URLs; a 404 loses the equity that the deletion was already OK to lose
  content-wise but not authority-wise.
  - CONNECT: Unblocks Sprint N1 blog authority growth (redirected equity flows into /blog).
  - ACCEPT: curl -sI https://iptv-subscription-uk-4k.com/blog/iptv-vs-sky-comparison should return HTTP/2 301 with location: /blog. Also
  check GSC → Coverage → Excluded (Not found 404) — those URLs should move to "Page with redirect" within 2 weeks.
  - GROW: Watch GSC "Not found (404)" count trend; should decline weekly.

  C2. Kill or grow the two thin blog posts
  - THINK: best-iptv-uk-guide-2026 (601 words vs 12-min-read claim) and how-to-setup-iptv-firestick (350 words vs 6-min claim) create a
  self-contradiction visible to any reader and Google's helpful-content classifier.
  - CONNECT: Blocks C4 (schema improvements are wasted on thin pages).
  - Options: (a) rewrite each to 2,000+ words in the Sprint-N1 register (recommended for best-iptv-uk-guide-2026 — the topic is your primary   keyword); (b) 301 how-to-setup-iptv-firestick → /blog/how-to-buy-iptv-subscription-uk (setup is a subset of buying).
  - ACCEPT: Live word count > 1,800 for retained posts; readTime matches ± 20%.
  - GROW: Time-on-page for these URLs in GA4.

  High — this sprint

  H1. Add /blog and /contact to Navbar
  - Edit src/lib/constants.ts:25-30:
  export const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/contact" },
  ];
  - Consider dropping "Why Us" (it's a /#features anchor already reachable via scroll).
  - ACCEPT: Blog impressions in GSC increase within 30 days of the change.

  H2. Resolve duplicate Cloudflare headers
  - CF Dashboard → the domain → Rules → Configuration Rules → disable "Managed Response Headers" for this zone (or set exceptions).
  Alternative: remove your Next.js securityHeaders for the duplicated keys and let CF handle them (but Next config is more portable — prefer   keeping Next as source of truth).
  - ACCEPT: curl -I shows exactly one instance of each security header.

  H3. Fix contact-email domain mismatch
  - Two options: (a) buy contact@iptv-subscription-uk-4k.com, update CONTACT_EMAIL in src/lib/constants.ts:5, add SPF/DKIM/DMARC to the
  primary domain; (b) drop the email entirely and route everything through WhatsApp (already the primary channel per checkout copy).
  - WHY: Cross-domain contact email on a paid-service site is a documented E-E-A-T weakness; either resolve it or remove it.

  H4. Add FAQPage schema to the 3 Sprint-N1 blog posts
  - Extract the FAQ arrays into the blogContent structure (add a faqs: [{q, a}] field per post), then in
  src/app/blog/[slug]/page.tsx:159-167 conditionally emit a second JSON-LD <script> with FAQPage schema.
  - ACCEPT: curl <post> | grep FAQPage returns matches; validate with schema.org validator.
  - GROW: LLM citation frequency (test in Perplexity / ChatGPT web search weekly for the target queries).

  Medium — this month

  - M1. Ship dedicated /og-cover.png (1200×630), reference in layout.tsx and per-page metadata.
  - M2. Trim keywords meta in layout.tsx:31-47 from 15 → 6–8 unique terms; or delete the field entirely.
  - M3. Align homepage <meta description> to include £5.85/month (mirror the OG description) — layout.tsx:29-30 and page.tsx:22.
  - M4. Enrich blog Article schema with image, wordCount, keywords, articleSection. For Sprint-N1 posts, add a named Person author.
  - M5. Add CSP header (start Report-Only).
  - M6. Add an RSS/Atom feed at /blog/feed.xml and link it via <link rel="alternate"> in layout.tsx — cheap AI-crawler food.
  - M7. Add Contact page link to LEGAL_LINKS or a new footer "Support" column in src/lib/constants.ts:32-37.

  Low — backlog

  - Consider moving BlogPostContent and PricingSection to Server Components where framer-motion isn't animating on scroll (payload savings
  on blog reads).
  - Drop ParticleBackground on mobile viewport (or gate behind prefers-reduced-motion — worth checking if you already do).
  - Robots.txt disallow /admin/ — path doesn't exist; harmless but noise.

  ---
  What I could not verify (be honest about it)

  - Live CWV field data (LCP / INP / CLS): PSI quota was exhausted mid-audit. Re-run tomorrow: curl
  "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https%3A%2F%2Fiptv-subscription-uk-4k.com%2F&strategy=mobile".
  - Backlink profile: no Ahrefs/DataForSEO API call attempted (would consume credits). Recommend running /seo backlinks separately if you
  want DA/PA + toxic link check.
  - Actual GSC data: you have Ahrefs GSC MCP tools available — if you connect the property, I can pull real query/CTR/position data in a
  follow-up.

  Offer

  Want me to (a) ship the fixes for C1 + H1 + H4 as a single PR now, or (b) generate a full PDF audit via scripts/google_report.py --type
  full? Either is a one-shot from here.

  Good luck!