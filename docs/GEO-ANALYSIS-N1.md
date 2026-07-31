GEO Analysis — iptv-subscription-uk-4k.com                           
                                                                                                                                            
  Framing (per Google's official position): GEO is SEO applied to AI-search surfaces. Findings below build on the full audit; nothing here
  contradicts the traditional SEO recommendations — this is the same substrate viewed through the AI-citation lens.                                                                                                                                                                   
  GEO Readiness Score: 68 / 100                                                                                                                                                                                                                                                       
  ┌────────────────────────┬───────┬────────┬───────────────────────────────────────────────────────────────────────────────────────────┐
  │       Component        │ Score │ Weight │                                           Notes                                           │
  ├────────────────────────┼───────┼────────┼───────────────────────────────────────────────────────────────────────────────────────────┤
  │ Citability             │ 62    │ 25%    │ FAQ passages under-length; body paragraphs strong on Sprint-N1 posts                      │
  ├────────────────────────┼───────┼────────┼───────────────────────────────────────────────────────────────────────────────────────────┤
  │ Structural Readability │ 82    │ 20%    │ Clean H1→H2, question-shaped headings, ordered lists                                      │
  ├────────────────────────┼───────┼────────┼───────────────────────────────────────────────────────────────────────────────────────────┤
  │ Multi-Modal            │ 35    │ 15%    │ Single asset (logo); no charts, tables, video, infographics                               │
  ├────────────────────────┼───────┼────────┼───────────────────────────────────────────────────────────────────────────────────────────┤
  │ Authority / Brand      │ 55    │ 20%    │ Legislation.gov.uk citations strong; no Person author; brand not on                       │
  │                        │       │        │ Wikipedia/Reddit/YouTube                                                                  │
  ├────────────────────────┼───────┼────────┼───────────────────────────────────────────────────────────────────────────────────────────┤
  │ Technical              │ 92    │ 20%    │ Full SSR (x-nextjs-prerender: 1); all AI crawlers permitted; llms.txt present             │
  │ Accessibility          │       │        │                                                                                           │
  └────────────────────────┴───────┴────────┴───────────────────────────────────────────────────────────────────────────────────────────┘

  Platform Breakdown

  ┌─────────────────────┬──────────────────────┬────────────────────────────────────────────────────────────────────────────────────────┐
  │      Platform       │ Estimated visibility │                                          Why                                           │
  ├─────────────────────┼──────────────────────┼────────────────────────────────────────────────────────────────────────────────────────┤
  │ Google AI Overviews │ Moderate             │ SSR + schema + citations = eligible. Blocked by low DR / no external brand mentions.   │
  ├─────────────────────┼──────────────────────┼────────────────────────────────────────────────────────────────────────────────────────┤
  │ ChatGPT web search  │ Low-moderate         │ Wikipedia absence (ChatGPT cites Wikipedia in 47.9% of answers). Legal citations help. │
  ├─────────────────────┼──────────────────────┼────────────────────────────────────────────────────────────────────────────────────────┤
  │ Perplexity          │ Low                  │ Reddit-heavy sourcing (46.7%) — no r/iptv presence.                                    │
  ├─────────────────────┼──────────────────────┼────────────────────────────────────────────────────────────────────────────────────────┤
  │ Bing Copilot        │ Unknown              │ Not verified in Bing Webmaster; recommend registering + IndexNow.                      │
  └─────────────────────┴──────────────────────┴────────────────────────────────────────────────────────────────────────────────────────┘

  ---
  1. AI Crawler Access

  robots.txt allows all user agents. All major AI crawlers can access the site — GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot,
  PerplexityBot, CCBot, anthropic-ai, Bytespider. No blocks. This is the correct posture for a growth-stage site.

  Only excluded paths: /api/, /admin/ — neither contains content.

  2. llms.txt

  Present at /llms.txt, well-formed, matches the emerging spec (title, > blockquote description, sectioned bullet list with descriptions).
  Covers all 5 blog posts, 4 core pages, 4 legal pages.

  Reality check: per the primary-source evidence (Mueller, Illyes, SE Ranking 300k-domain study), llms.txt is not currently a citation lever   for major AI search systems. It costs nothing to maintain and signals intent — keep it, but don't attribute future AI visibility gains to   it.

  One improvement: the description mentions "30-day money-back guarantee" but not the underlying legal framework (Consumer Contracts
  Regulations 2013) that your Sprint-N1 posts anchor to. Adding a line about "written for UK consumer-rights context" would prime AI
  scrapers on the why your content is citable.

  3. Server-Side Rendering (Critical for AI crawlers)

  Fully SSR/prerendered. Response headers include x-nextjs-prerender: 1. AI crawlers (which don't execute JavaScript) receive the complete
  rendered HTML — 182 KB with full text, headings, schema, JSON-LD. No hydration-dependent content anywhere critical. This is your single
  biggest GEO strength.

  Caveat: BlogPostContent is marked "use client" (src/app/blog/[slug]/BlogPostContent.tsx:1), but the content array is rendered
  synchronously on the server-rendered HTML — verified via curl. Client boundary is for the framer-motion wrapper, not the content itself.

  4. Passage-Level Citability

  The optimal AI-citation passage length is 134-167 words. Sample from the FAQ blocks on Sprint-N1 posts:

  ┌────────────────────────────────────────────┬────────────┬───────────────────────────────────────────────────┐
  │                  Passage                   │ Word count │                      Status                       │
  ├────────────────────────────────────────────┼────────────┼───────────────────────────────────────────────────┤
  │ "How do I buy…" (post 1)                   │ 117        │ 17 words short — extend with one specific example │
  ├────────────────────────────────────────────┼────────────┼───────────────────────────────────────────────────┤
  │ "What does UK IPTV include…" (post 2)      │ 52         │ Too short for AI extraction                       │
  ├────────────────────────────────────────────┼────────────┼───────────────────────────────────────────────────┤
  │ "How many channels do you get…" (post 2)   │ 49         │ Too short                                         │
  ├────────────────────────────────────────────┼────────────┼───────────────────────────────────────────────────┤
  │ "What are my rights if I cancel…" (post 3) │ 40         │ Too short                                         │
  ├────────────────────────────────────────────┼────────────┼───────────────────────────────────────────────────┤
  │ "How long is the UK cooling-off…" (post 3) │ 18         │ Way too short — this is a snippet, not a citation │
  └────────────────────────────────────────────┴────────────┴───────────────────────────────────────────────────┘

  The body paragraphs inside these same posts frequently hit 150-250 words (excellent — from the earlier Read, the "Step 1: Verify The
  Operator" section is ~350 words, well-formed for extraction into an AI answer).

  Diagnosis: the FAQ Q&A structure is optimized for scannability and reader UX, not for AI extraction. AI extractors treat FAQ answers as a
  single citable unit — sub-100-word answers get truncated or ignored in favor of longer body passages.

  5. Multi-Modal Gap

  Sites with multi-modal content see 156% higher AI selection rates. Current state:
  - Images: 1 asset (site logo)
  - Tables: 0
  - Charts / infographics: 0
  - Video: 0
  - Interactive elements: 0

  The Sprint-N1 posts are entirely text. For subscription/how-to content, comparison tables are the single easiest lift (pricing comparison
  table, feature-vs-competitor table, refund-window-by-provider table).

  6. Authority & Brand Signals

  Strong:
  - Sprint-N1 posts cite legislation.gov.uk (UK primary source)
  - Transparent "this service publishing this article" disclosure in body
  - Publication + modified dates in Article schema
  - Organization schema with contactPoint

  Weak (all fixable, all high-ROI for AI visibility):
  - No named author. Article schema author = Organization (src/app/blog/[slug]/page.tsx:144). Named Person authors correlate with AI trust
  signals and can be cross-linked to LinkedIn/other properties.
  - No brand presence on Wikipedia, Reddit, YouTube. Ahrefs' 75k-brand study: YouTube mentions correlate ~0.737 with AI citations vs Domain
  Rating at ~0.266. This is the single highest-leverage GEO work you're not doing.
  - Contact email is on a different domain (contact@buy-iptv-uk.com) — noted in the full audit. AI systems that parse contact info as
  authority signal (Perplexity, some ChatGPT flows) will flag this as inconsistency.

  7. Query-Match Structure

  Headings on the Sprint-N1 posts already use question / imperative patterns that match search queries:
  - "How To Buy An IPTV Subscription In The UK"
  - "What's Included In A UK IPTV Subscription"
  - "IPTV Subscription Renewal, Cancellation And Refund Rights In The UK"

  H2s follow the same pattern ("Verify The Operator Before You Pay", "The 14-Day Cooling-Off Period"). This is good — question-shaped
  headings match AI query patterns.

  Legacy posts don't follow the pattern: best-iptv-uk-guide-2026 uses "What Makes an IPTV Service 'The Best' in the UK?" (good) but ships
  with 601 words backing it (bad — flagged as thin content in the full audit).

  8. Schema for AI Discoverability

  Present (homepage): Organization, WebSite, WebPage, BreadcrumbList, Product+4 Offers, FAQPage.
  Present (blog posts): Article (minimal — missing image, wordCount, articleSection, keywords).

  Missing for AI discoverability:
  - Person for authors on blog posts
  - HowTo — do not add (deprecated Sept 2023, no longer surfaced)
  - FAQPage on individual blog posts (each Sprint-N1 post has an inline FAQ — noted in full audit as High priority)
  - Article.about linking to entities (e.g. Wikidata IDs for "IPTV", "Consumer Rights Act 2015")
  - sameAs on Organization (LinkedIn, YouTube, Trustpilot, Facebook — none currently exist as external presences, so this is a project-order   dependency)

  ---
  Top 5 Highest-Impact GEO Changes

  Each carries THINK / ACCEPT / GROW as specified in the methodology.

  G1. Build brand mentions on YouTube + Reddit (High, unblocks 4x AI-citation lift)

  - THINK: YouTube mentions correlate ~0.737 with AI citations (Ahrefs 75k-brand study, Dec 2025) — 3x stronger than any technical SEO
  signal. Reddit correlation is high across Perplexity and ChatGPT.
  - CONNECT: Blocks G4 (sameAs schema needs real external profiles first). Unblocks all of ChatGPT/Perplexity visibility, since Wikipedia
  (top ChatGPT source) requires notability.
  - ACT: (a) Post 2–4 short YouTube reviews / setup walkthroughs on a channel branded to the service; (b) participate in r/iptv,
  r/UKPersonalFinance, r/CordCutters organically — not spam, actual answers referencing your legislation.gov.uk-anchored content when
  relevant.
  - ACCEPT: In 90 days, site:youtube.com "iptv-subscription-uk-4k.com" should return ≥3 results. site:reddit.com similar.
  - GROW: Set up a monthly curl "https://www.perplexity.ai/search?q=best+iptv+uk" snapshot — track when your brand appears in citations.

  G2. Convert FAQ passages to 134-167 word citable blocks (High, fastest win)

  - THINK: Current FAQ answers average 55 words. AI extractors preferentially cite blocks in the 134-167 range. Every current FAQ is either
  a snippet (too short to cite) or borderline.
  - CONNECT: Multiplied by H4 in the full audit (adding FAQPage schema to blog posts). Do these together — you'd be re-touching the same
  file.
  - ACT: Extend every FAQ answer to include (a) the direct answer, (b) one specific example or number, (c) a "this typically applies when…"
  qualifier. Model on the 117-word answer in "how-to-buy" as the shape.
  - ACCEPT: After edit, every FAQ answer word count ≥ 120. Grep for <h4> blocks with <p> word count under 100 → zero results.
  - GROW: Test target queries in Perplexity 2 weeks post-deploy. Passage-level citation is measurable — either your extended answer appears
  verbatim or a competitor's does.

  G3. Add named Person author to Sprint-N1 posts (Medium, E-E-A-T signal for AI)

  - THINK: Anonymous authorship weakens the Experience + Expertise legs of E-E-A-T. AI systems now inspect Article.author and cross-check
  against real profiles (LinkedIn, X, personal domain).
  - CONNECT: Depends on G1 (a named author needs a real profile to link via sameAs — otherwise it looks synthetic).
  - ACT: Create one internal editorial byline (real person on your team, or a named "Editor" role). Add Person schema with name, url →
  /authors/[slug], sameAs: [LinkedIn URL]. Ship an /authors/[slug] page with a 200-word bio + credentials.
  - ACCEPT: Article schema validator shows nested Person with populated sameAs. LinkedIn URL resolves.
  - GROW: ChatGPT queries about author's name / bylined content should return citations within 60 days.

  G4. Add comparison tables to blog posts (Medium, multi-modal lift)

  - THINK: Multi-modal content sees 156% higher AI selection. Tables are the cheapest multi-modal element for text-heavy content and get
  extracted directly by AI systems (Perplexity renders them, ChatGPT summarizes them).
  - CONNECT: Independent — can ship in parallel with G2.
  - ACT: Add at least one table per Sprint-N1 post — e.g. in "what's included": "Marketed feature | Usually genuinely bundled | Usually paid   add-on"; in "renewal-cancellation": "Payment method | Chargeback window | Typical refund route".
  - ACCEPT: Each Sprint-N1 post contains ≥1 <table> in the rendered HTML. Live grep confirms.
  - GROW: Monitor GA4 for scroll-depth on the sections containing tables — if scroll depth increases, engagement is up (proxy for
  AI-selection appeal).

  G5. Enrich blog Article schema + about entity links (Medium, precise AI grounding)

  - THINK: Article.about linking to Wikidata IDs grounds your content in the AI's entity graph. Currently a Sprint-N1 post about "Consumer
  Rights Act 2015" doesn't tell the AI system what that Act is in schema terms — it's just a string.
  - CONNECT: Independent, can ship with G3.
  - ACT: In src/app/blog/[slug]/page.tsx:137-157, extend articleLd with:
  wordCount: computed,
  articleSection: post.category,
  keywords: derived-from-content,
  image: hero-or-og-image,
  about: [
    { "@type": "Thing", name: "IPTV", sameAs: "https://en.wikipedia.org/wiki/Internet_Protocol_television" },
    { "@type": "Legislation", name: "Consumer Rights Act 2015", sameAs: "https://www.legislation.gov.uk/ukpga/2015/15" },
  ]
  - ACCEPT: Validate with schema.org validator + Google Rich Results test. All fields populate.
  - GROW: Track Google Search Console "Discover" impressions — enriched Article schema is a known Discover surface signal.

  ---
  What NOT to do (per Google's primary source)

  - Do NOT add HowTo schema — deprecated Sept 2023, no longer surfaced in Google.
  - Do NOT add new FAQPage schema for Google rich results — restricted to gov/health since Aug 2023. Existing homepage FAQPage stays (LLM
  citation benefit); adding FAQPage to blog posts (H4 in full audit) is for LLM benefit only, not Google.
  - Do NOT rely on llms.txt as a ranking lever — no evidence major AI search systems use it. Keep the file; don't attribute future gains to
  it.
  - Do NOT chunk content aggressively — Google's guidance treats chunking as a myth; write for humans.
  - Do NOT try to pay for AI mentions or use AI-rephrasing farms — Google's guide explicitly rejects both as ineffective and potentially
  spam-flagged.

  ---
  Verification I could not complete

  - DataForSEO ChatGPT scraper — MCP tools listed but not tested in this session; if you want a real snapshot of what ChatGPT web search
  returns today for "best iptv uk", "how to buy iptv uk", etc., re-run with /seo dataforseo explicitly.
  - Wikipedia entity check — no automated call made; recommend a manual site:en.wikipedia.org "iptv subscription uk 4k" check (I'd bet zero
  hits).
  - Bing Webmaster / IndexNow status — not verified.