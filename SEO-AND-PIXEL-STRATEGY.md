# StudioNorth — SEO & Pixel Strategy Game Plan

*Written from the perspective of 20+ years in SEO, paid media tracking, and conversion architecture. No fluff, no agency upsell — just what works for a boutique studio launching with zero paid marketing budget.*

---

## Part 1: What's Already Implemented (Technical SEO)

Everything below is already live in the codebase:

### Meta Layer
- **Title tag:** Keyword-rich, under 60 chars visible, includes brand + primary services
- **Meta description:** 155 chars, includes value prop + services + audience qualifier
- **Keywords meta:** Secondary signal — includes long-tail phrases real prospects search
- **Canonical URL:** Self-referencing to prevent duplicate content issues
- **Robots meta:** `index, follow` with `max-image-preview:large` for rich results

### Open Graph (Facebook/Instagram/LinkedIn)
- Full OG tags: type, url, title, description, image (1200x630), site_name, locale
- Image alt text for accessibility crawlers
- **Action needed:** Create the actual `og-image.jpg` — 1200x630px, brand name + tagline on beige background

### Twitter/X Cards
- `summary_large_image` card type (best click-through rates)
- Separate title/description optimized for shorter display
- Twitter site handle placeholder ready

### Structured Data (JSON-LD) — 4 schemas implemented
1. **ProfessionalService** — tells Google you're a real business with services, area served, price range
2. **WebSite** — enables sitelinks and potential search box in SERPs
3. **ItemList (Services)** — each service as a structured item Google can index
4. **FAQPage** — enables FAQ rich results (expandable answers directly in Google search)

### Technical Files
- `robots.txt` — allows all crawling, blocks admin/API, points to sitemap
- `sitemap.xml` — all 6 pages with priority weighting and lastmod dates
- `site.webmanifest` — PWA-ready metadata for mobile installs and Chrome
- Favicon structure — SVG, PNG 16/32, Apple Touch Icon, theme-color

### Semantic HTML
- Skip-to-content link (accessibility + crawler signal)
- `<main>` landmark wrapping all content
- `<nav>`, `<section>`, `<footer>` semantic elements
- `aria-label` and `aria-expanded` attributes on interactive elements
- Proper heading hierarchy (h1 → h2 → h3, no skips)

---

## Part 2: SEO Strategy — Zero Budget, Maximum Impact

### The Reality

With no budget for SEO tools, link building services, or content agencies, StudioNorth's SEO strategy needs to be surgical. Focus on three things:

1. **Own your brand name** — rank #1 for "StudioNorth" and variations
2. **Win local + niche service queries** — "boutique branding studio [city]", "web design for small business"
3. **Build topical authority over time** — through the Insights blog

### Keyword Strategy

#### Tier 1 — Brand (rank immediately)
| Keyword | Target Page |
|---------|-------------|
| StudioNorth | Home |
| StudioNorth Creative Studio | Home |
| studionorth.co | Home |

#### Tier 2 — Service + Qualifier (rank in 3-6 months)
| Keyword | Volume Est. | Target Page |
|---------|-------------|-------------|
| boutique branding studio | Low-Med | Services |
| web design for small business | Medium | Services |
| brand identity design for SMB | Low | Services |
| custom product sourcing for brands | Low | Services |
| brand cohesion design | Very Low (own it) | Home |
| website design for service business | Medium | Services |

#### Tier 3 — Blog / Long-tail (rank in 6-12 months)
| Keyword | Target Page |
|---------|-------------|
| how to make my brand look cohesive | Insights article |
| do I need branding before a website | Insights article (matches FAQ) |
| brand identity checklist for small business | Insights article |
| web design vs template for business | Insights article |
| how to choose a branding agency | Insights article |
| custom branded merchandise for small business | Insights article |

### On-Page SEO Checklist (Per Page)

Every page on the site should have:

- [ ] Unique title tag (under 60 chars, primary keyword + brand)
- [ ] Unique meta description (under 160 chars, includes CTA language)
- [ ] Canonical URL (self-referencing)
- [ ] One H1 only (includes primary keyword naturally)
- [ ] H2s that include secondary keywords
- [ ] Alt text on every image (descriptive, not keyword-stuffed)
- [ ] Internal links to at least 2 other pages
- [ ] External link to 1 authoritative source (optional, builds trust)
- [ ] URL slug is clean and keyword-rich (`/services`, `/work/meridian-wellness`)
- [ ] Page loads in under 3 seconds
- [ ] No orphan pages (every page linked from at least 2 others)

### Content Strategy for SEO (No Budget Required)

**Month 1-2: Foundation articles (4 posts)**
1. "What Brand Cohesion Actually Means (And Why Your Business Needs It)"
2. "Do You Need Branding Before Building a Website? Here's the Truth"
3. "Template vs. Custom Website: What's Actually Worth It for Small Businesses"
4. "What to Expect When Working with a Branding Studio"

**Month 3-4: Service-adjacent (4 posts)**
5. "How to Choose a Branding Agency That Gets Your Business"
6. "The Real Cost of Looking DIY: What Visual Inconsistency Costs Your Brand"
7. "Custom Branded Products: Why Physical Touchpoints Still Matter in 2026"
8. "5 Signs Your Brand Has Outgrown Its Current Identity"

**Month 5-6: Case study + thought leadership (4 posts)**
9. "[Client Name] Brand Transformation: From Scattered to Cohesive" (case study)
10. "Our Design Process: How We Build Brands That Last"
11. "Web Design Trends That Actually Matter in 2026 (Skip the Rest)"
12. "Why Service Businesses Need Different Branding Than Product Businesses"

**Writing guidelines:**
- 1,200-2,000 words per post (Google's sweet spot for informational content)
- Include 1 internal link per 300 words
- Use the FAQ schema on articles with Q&A sections
- Add a CTA at the end of every article ("Ready to build a cohesive brand? Start a project →")
- Publish consistently — 2x/month minimum

### Local SEO (If Applicable)

If StudioNorth operates from a specific location:

1. **Google Business Profile** — create immediately, even for service-area businesses
   - Category: "Graphic Designer" primary, "Web Designer" secondary
   - Add photos, services, business hours
   - Post weekly (reuse blog content)
2. **Apple Business Connect** — register for Apple Maps visibility
3. **Bing Places** — register (takes 5 minutes, free traffic)
4. **NAP Consistency** — Name, Address, Phone must be identical everywhere

### Link Building (Zero Budget)

- **Design directories:** Submit to Awwwards, CSS Design Awards, Dribbble, Behance (free tiers)
- **Business directories:** Clutch.co, DesignRush, GoodFirms (free listings)
- **HARO / Connectively:** Respond to journalist queries about branding/design (free backlinks from high-DA sites)
- **Guest posting:** Write for industry blogs (branding, small business, entrepreneurship)
- **Portfolio links:** Every client website should link back to "Designed by StudioNorth"
- **Social profiles:** Consistent links from Instagram, LinkedIn, X, Threads

---

## Part 3: Meta Pixel Strategy

### What is Meta Pixel

Meta Pixel (formerly Facebook Pixel) is a JavaScript snippet that tracks visitor behavior on your site and sends it back to Meta (Facebook/Instagram). Even if you're not running paid ads right now, **installing the pixel immediately is critical** because:

1. **It starts learning your audience** — the pixel builds a profile of who visits your site
2. **It creates retargeting pools** — when you eventually run ads, you can target people who already visited
3. **Lookalike audiences** — Meta can find people similar to your website visitors
4. **Conversion data compounds** — the longer the pixel runs, the smarter your future ads become

### Setup Steps

#### Step 1: Create Meta Business Suite (Free)
1. Go to business.facebook.com
2. Create a Business Account for StudioNorth
3. Navigate to Events Manager → Connect Data Sources → Web → Meta Pixel
4. Name it "StudioNorth Website Pixel"
5. Copy the Pixel ID (a number like `123456789012345`)

#### Step 2: Install the Pixel
In `index.html`, replace `PIXEL_ID` in the commented-out Meta Pixel code with your actual Pixel ID, then uncomment it. The code is already placed in the correct location (inside `<head>`).

#### Step 3: Configure Standard Events

Add these event triggers to the site. I recommend doing this through the pixel code directly (not GTM) for simplicity:

```javascript
// --- Meta Pixel Event Layer ---
// Add to script.js after the pixel loads

// Track key page sections viewed (custom events)
function trackSectionView(sectionName) {
  if (typeof fbq !== 'undefined') {
    fbq('trackCustom', 'SectionView', { section: sectionName });
  }
}

// Fire when someone scrolls to these sections
// (integrate with existing IntersectionObserver)
// 'ViewContent' — when they see the portfolio
// 'Contact' — when they hit the contact/CTA section

// Track CTA clicks
document.querySelectorAll('a[href="#contact"], .btn-primary').forEach(function(btn) {
  btn.addEventListener('click', function() {
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Lead');
    }
  });
});

// Track portfolio views
document.querySelectorAll('.work-card').forEach(function(card) {
  card.addEventListener('click', function() {
    if (typeof fbq !== 'undefined') {
      fbq('track', 'ViewContent', {
        content_name: card.querySelector('.work-title')?.textContent,
        content_category: 'Portfolio'
      });
    }
  });
});
```

#### Standard Events to Implement

| Event | When It Fires | Why |
|-------|---------------|-----|
| `PageView` | Every page load | Base tracking (already in pixel code) |
| `ViewContent` | Portfolio project click | Shows interest in specific work |
| `Lead` | "Start a Project" CTA click | Primary conversion event |
| `Contact` | Contact form submission | Hard conversion |
| `Schedule` | If/when Calendly is added | Meeting booked |

#### Custom Events Worth Adding

| Event | When | Why |
|-------|------|-----|
| `SectionView:Services` | Scrolls to services | Shows service interest |
| `SectionView:Testimonials` | Scrolls to testimonials | Shows trust-seeking behavior |
| `FAQExpand` | Opens a FAQ item | Shows objection-handling stage |
| `ScrollDepth:75` | 75% page scroll | High-intent signal |

### Audience Building Timeline

**Month 1-3 (Passive collection, no ad spend):**
- Pixel fires on all organic traffic
- Build "All Website Visitors" audience (180-day window)
- Build "CTA Clickers" audience (people who clicked Start a Project)
- Build "Portfolio Viewers" audience

**Month 3-6 (When ready for first ad spend):**
- Create Lookalike Audience from "CTA Clickers" (1% - most similar)
- Create Lookalike from "All Visitors" (1-3%)
- Retarget "All Visitors" who didn't convert with social proof ads
- Retarget "Portfolio Viewers" with case study content

**Minimum viable ad budget when ready:** $10-20/day for retargeting, $20-30/day for prospecting

---

## Part 4: Google Tag Manager (GTM) Strategy

### Why GTM Instead of Hard-Coding Everything

GTM lets you manage all tracking pixels, events, and analytics from one dashboard without touching code. For a growing business, this is essential because:

- Add/remove tracking without developer time
- Test events before they go live
- Manage Meta Pixel, Google Analytics, LinkedIn Insight Tag, and any future pixels in one place
- Built-in debugging tools

### Setup Steps

#### Step 1: Create GTM Account (Free)
1. Go to tagmanager.google.com
2. Create account "StudioNorth"
3. Create container "studionorth.co" (Web)
4. Copy the Container ID (`GTM-XXXXXXX`)

#### Step 2: Install GTM
Replace `GTM-XXXXXXX` in the commented-out code in `index.html` with your actual container ID, then uncomment both the `<head>` and `<body>` snippets.

#### Step 3: Configure Tags Inside GTM

**Tag 1: Google Analytics 4**
- Tag type: Google Analytics: GA4 Configuration
- Measurement ID: `G-XXXXXXXXXX` (create in analytics.google.com)
- Trigger: All Pages

**Tag 2: Meta Pixel (move from hard-code to GTM)**
- Tag type: Custom HTML
- Paste the Meta Pixel base code
- Trigger: All Pages
- *Note: Once in GTM, remove the hard-coded pixel from index.html*

**Tag 3: Meta Pixel - Lead Event**
- Tag type: Custom HTML → `fbq('track', 'Lead');`
- Trigger: Click → CSS selector `.btn-primary[href="#contact"]`

**Tag 4: Meta Pixel - ViewContent**
- Tag type: Custom HTML → `fbq('track', 'ViewContent', { content_category: 'Portfolio' });`
- Trigger: Click → CSS selector `.work-card`

**Tag 5: LinkedIn Insight Tag (optional, when ready)**
- Tag type: LinkedIn Insight Tag
- Partner ID: from LinkedIn Campaign Manager
- Trigger: All Pages

### GTM Data Layer Events

Add this to `script.js` to push structured events GTM can listen for:

```javascript
// Push to GTM dataLayer
window.dataLayer = window.dataLayer || [];

function gtmEvent(eventName, eventData) {
  window.dataLayer.push({
    event: eventName,
    ...eventData
  });
}

// CTA clicks
document.querySelectorAll('.btn-primary').forEach(function(btn) {
  btn.addEventListener('click', function() {
    gtmEvent('cta_click', {
      cta_text: btn.textContent.trim(),
      cta_location: btn.closest('section')?.id || 'unknown'
    });
  });
});

// FAQ interactions
document.querySelectorAll('.faq-question').forEach(function(btn) {
  btn.addEventListener('click', function() {
    gtmEvent('faq_expand', {
      question: btn.querySelector('span')?.textContent
    });
  });
});

// Scroll depth milestones
let scrollMilestones = { 25: false, 50: false, 75: false, 100: false };
window.addEventListener('scroll', function() {
  var scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
  [25, 50, 75, 100].forEach(function(milestone) {
    if (scrollPercent >= milestone && !scrollMilestones[milestone]) {
      scrollMilestones[milestone] = true;
      gtmEvent('scroll_depth', { percent: milestone });
    }
  });
}, { passive: true });
```

---

## Part 5: Google Analytics 4 (GA4) Strategy

### Setup (Free)

1. Go to analytics.google.com
2. Create property "StudioNorth"
3. Create Web data stream for studionorth.co
4. Copy Measurement ID (`G-XXXXXXXXXX`)
5. Add as a tag in GTM (preferred) or direct embed

### Key Events to Track in GA4

| Event | Configuration | Goal |
|-------|--------------|------|
| `page_view` | Automatic | Base traffic |
| `scroll` | Enhanced measurement (auto) | Engagement depth |
| `click` (outbound) | Enhanced measurement (auto) | Where visitors go |
| `cta_click` | Custom (from dataLayer) | Conversion intent |
| `faq_expand` | Custom (from dataLayer) | Objection research |
| `form_submit` | Custom (when contact form added) | Hard conversion |
| `scroll_depth` | Custom (from dataLayer) | Content engagement |

### GA4 Conversions to Mark

Once events flow in, mark these as conversions in GA4:
- `cta_click` (where cta_text = "Start a Project")
- `form_submit`
- `schedule` (when Calendly added)

### Key Reports to Monitor

1. **Acquisition Overview** — where visitors come from (organic, social, direct, referral)
2. **Pages and Screens** — which pages get the most traffic
3. **Events** — which CTAs get clicked, which FAQs get opened
4. **User Flow** — how visitors move through the site
5. **Engagement Rate** — what percentage of visitors are actually engaged (>10 sec, >1 page, or conversion)

---

## Part 6: Additional Pixels & Tracking Worth Adding

### LinkedIn Insight Tag (Free)
**When:** When StudioNorth targets B2B clients or professional services
**Why:** Tracks LinkedIn ad performance + builds retargeting audiences of professionals
**Setup:** Create LinkedIn Campaign Manager account → Install Insight Tag via GTM
**Priority:** Medium — add when considering LinkedIn outreach

### Pinterest Tag (Free)
**When:** If StudioNorth creates visual portfolio content on Pinterest
**Why:** Pinterest is a visual search engine — branding/design content performs well
**Setup:** Create Pinterest Business account → Install tag via GTM
**Priority:** Low — consider in Phase 3+

### Microsoft Clarity (Free)
**When:** Immediately — this is the highest-value free tool available
**Why:** Records real visitor sessions (heatmaps, scroll maps, session replays) so you can see exactly how people interact with the site. No cost, no limit.
**Setup:**
1. Go to clarity.microsoft.com
2. Create project for studionorth.co
3. Copy the tracking code
4. Add as Custom HTML tag in GTM, trigger: All Pages
**Priority:** HIGH — install day one

### Hotjar Free Tier (Alternative to Clarity)
**When:** If you want slightly better UX for session analysis
**Why:** Same concept as Clarity, slightly different interface
**Note:** Clarity is fully free with no session limits. Hotjar free tier caps at 35 sessions/day. Recommend Clarity.

---

## Part 7: Conversion Tracking Architecture

### The Full Picture

```
Visitor arrives
    │
    ├── GA4: page_view (acquisition source tracked)
    ├── Meta Pixel: PageView (audience building starts)
    ├── Clarity: session recording begins
    │
    ▼
Scrolls through homepage
    │
    ├── GA4: scroll_depth events (25%, 50%, 75%, 100%)
    ├── Meta Pixel: SectionView custom events
    │
    ▼
Views portfolio
    │
    ├── GA4: cta_click (content_category: Portfolio)
    ├── Meta Pixel: ViewContent
    │
    ▼
Opens FAQ
    │
    ├── GA4: faq_expand (question text)
    │
    ▼
Clicks "Start a Project"
    │
    ├── GA4: cta_click → marked as CONVERSION
    ├── Meta Pixel: Lead event
    │
    ▼
Submits contact form
    │
    ├── GA4: form_submit → marked as CONVERSION
    ├── Meta Pixel: Contact event (CompleteRegistration)
    │
    ▼
Thank-you page / confirmation
    │
    ├── GA4: page_view (/thank-you)
    ├── Meta Pixel: PageView on /thank-you
```

### Attribution Window Recommendations

| Platform | Click Window | View Window |
|----------|-------------|-------------|
| Meta Pixel | 7 days | 1 day |
| GA4 | 30 days (data-driven) | N/A |
| LinkedIn | 30 days | 7 days |

---

## Part 8: Implementation Timeline

### Week 1 — Foundation (Do Now)
- [x] Technical SEO implemented (meta, OG, structured data)
- [x] robots.txt + sitemap.xml created
- [x] Semantic HTML + accessibility
- [ ] Create og-image.jpg (1200x630)
- [ ] Create favicon files (SVG, PNG 16/32/192/512, Apple Touch Icon)
- [ ] Register Google Business Profile
- [ ] Set up Google Search Console (verify with DNS TXT record)
- [ ] Set up GA4 + install via GTM
- [ ] Create Meta Business Suite + Pixel
- [ ] Install Microsoft Clarity

### Week 2 — Tracking
- [ ] Install GTM container on site
- [ ] Move Meta Pixel into GTM
- [ ] Configure all custom events (CTA clicks, FAQ, scroll depth)
- [ ] Set up GA4 conversions
- [ ] Add dataLayer event pushes to script.js
- [ ] Verify all events in GTM Preview Mode
- [ ] Verify Meta Pixel in Events Manager (test events tool)

### Week 3 — Content SEO
- [ ] Write and publish first blog post
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Submit to 3 design directories (Clutch, DesignRush, Dribbble)
- [ ] Set up Google Business Profile posts (weekly)

### Month 2-3 — Build Authority
- [ ] Publish 2 blog posts per month
- [ ] Respond to 2-3 HARO queries per week
- [ ] Build internal linking between all pages
- [ ] Monitor Search Console for impressions/clicks/position
- [ ] Review Clarity recordings weekly (optimize UX based on real behavior)

### Month 3-6 — Optimize & Scale
- [ ] Review GA4 data — which pages convert, which don't
- [ ] Adjust meta descriptions based on click-through rates in Search Console
- [ ] Add FAQ schema to new blog posts with Q&A sections
- [ ] Consider first $10/day Meta retargeting campaign
- [ ] Build Lookalike audiences from pixel data
- [ ] Add case study pages with project-specific structured data

---

## Part 9: SEO Quick Wins (Things That Cost Nothing and Work Fast)

1. **Google Search Console** — submit sitemap, monitor indexing, fix any crawl errors. Do this day 1.

2. **Image optimization** — every image should be:
   - WebP format (40-50% smaller than JPEG)
   - Lazy-loaded (`loading="lazy"`)
   - Include descriptive alt text
   - Under 200KB for hero images, under 100KB for cards

3. **Page speed** — your static site is already fast. Keep it that way:
   - Preconnect to Google Fonts (done)
   - DNS-prefetch for tracking domains (done)
   - Minify CSS/JS before production deploy
   - Enable gzip/brotli on hosting (most hosts do this automatically)

4. **Internal linking** — every page should link to at least 2 others. Blog posts should link to service pages. Service pages should link to relevant work.

5. **URL structure** — keep it clean and keyword-rich:
   - `/services` not `/our-services-and-offerings`
   - `/work/meridian-wellness` not `/portfolio/project-1`
   - `/insights/brand-cohesion-guide` not `/blog/post-12345`

6. **Title tag formula for all pages:**
   `[Primary Keyword] — StudioNorth | [Secondary Qualifier]`
   Example: `Brand Identity Design — StudioNorth | Boutique Branding Studio`

7. **Review meta descriptions every 90 days** — check Search Console for pages with high impressions but low CTR. Rewrite those descriptions to be more compelling.

---

## Part 10: What NOT to Do

From 20 years of watching businesses waste time on SEO:

1. **Don't buy links.** Google's spam detection in 2026 is sharp. One penalty and you're invisible.

2. **Don't keyword stuff.** "Best branding agency best branding studio best branding design" in a paragraph helps no one. Write for humans.

3. **Don't obsess over rankings for vanity keywords.** "Branding agency" has 100K monthly searches and you'll never rank for it. "Boutique branding studio for service businesses" has 200 searches and you can own it in months.

4. **Don't install 15 WordPress SEO plugins.** You're on a static/custom site. The SEO is in the HTML. That's better.

5. **Don't ignore Google Business Profile.** Even if you don't have a storefront, service-area businesses show up in local results. Free traffic.

6. **Don't create thin content for SEO.** One 1,500-word article that genuinely helps someone beats ten 300-word posts that exist only to rank.

7. **Don't wait to install tracking.** Every day without the Meta Pixel running is audience data you'll never get back. Install it before the site launches publicly.

---

*This document is the complete SEO and tracking infrastructure for StudioNorth. Everything here is free to implement. The only cost is time and consistency.*
