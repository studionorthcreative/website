import { PERF_THRESHOLDS, PERF_FIX, AI_CRITERIA } from './_config.js';
import { scoreWithAI } from './_ai.js';

// ─── Helpers ────────────────────────────────────────────────────────────────

function unavailable(id, label, max, method = 'deterministic') {
  return { id, label, score: null, max, method, status: 'unavailable', detail: null, fix: null, priority: null };
}

function scored(id, label, score, max, detail, fix, method = 'deterministic') {
  return { id, label, score, max, method, status: 'scored', detail, fix, priority: null };
}

function extractTextContent(dom) {
  const selectors = ['h1', 'h2', 'h3', 'h4', 'p', 'li', 'button', 'a', 'nav', 'header', 'main', 'section', "[class*='hero']", "[class*='cta']"];
  const parts = [];
  for (const sel of selectors) {
    dom.querySelectorAll(sel).forEach(el => {
      const text = el.text.trim();
      if (text) parts.push(text);
    });
  }
  return [...new Set(parts)].join('\n').slice(0, 6000);
}

// ─── SEO checks ─────────────────────────────────────────────────────────────

export async function runSeoChecks(dom, pageUrl) {
  const results = [];

  // seo.title — max 20
  const title = dom.querySelector('head title')?.text?.trim() ?? null;
  if (title === null) {
    results.push(scored('seo.title', 'Meta Title', 0, 20, 'No title tag found.', 'Add a <title> tag to the page head with a descriptive title between 30 and 60 characters.'));
  } else {
    const len = title.length;
    if (len >= 30 && len <= 60) {
      results.push(scored('seo.title', 'Meta Title', 20, 20, `Title is ${len} chars — within the 30–60 char target.`, null));
    } else {
      results.push(scored('seo.title', 'Meta Title', 12, 20,
        `Title is ${len} chars — outside the 30–60 char target.`,
        len < 30 ? 'Expand the title tag to at least 30 characters to include the primary keyword.' : 'Shorten the title tag to 60 characters or fewer to prevent truncation in search results.'));
    }
  }

  // seo.description — max 20
  const desc = dom.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() ?? null;
  if (desc === null) {
    results.push(scored('seo.description', 'Meta Description', 0, 20, 'No meta description found.', 'Add a meta description tag with a compelling 120–160 character summary of the page.'));
  } else {
    const len = desc.length;
    if (len >= 120 && len <= 160) {
      results.push(scored('seo.description', 'Meta Description', 20, 20, `Description is ${len} chars — within the 120–160 char target.`, null));
    } else {
      results.push(scored('seo.description', 'Meta Description', 12, 20,
        `Description is ${len} chars — outside the 120–160 char target.`,
        len < 120 ? 'Expand the meta description to at least 120 characters with a clear, keyword-rich summary.' : 'Shorten the meta description to 160 characters or fewer to prevent truncation.'));
    }
  }

  // seo.h1 — max 15
  const h1s = dom.querySelectorAll('h1');
  if (h1s.length === 0) {
    results.push(scored('seo.h1', 'H1 Tag', 0, 15, 'No H1 tag found on the page.', 'Add a single H1 tag that clearly describes the page topic with the primary keyword.'));
  } else if (h1s.length === 1) {
    results.push(scored('seo.h1', 'H1 Tag', 15, 15, 'One H1 tag found.', null));
  } else {
    results.push(scored('seo.h1', 'H1 Tag', 8, 15, `${h1s.length} H1 tags found — only one is recommended.`, 'Remove duplicate H1 tags and keep only one per page to maintain clear page structure.'));
  }

  // seo.alt — max 15
  const allImgs = dom.querySelectorAll('img');
  if (allImgs.length === 0) {
    results.push(scored('seo.alt', 'Image Alt Coverage', 15, 15, 'No images found on the page.', null));
  } else {
    const withAlt = allImgs.filter(img => img.getAttribute('alt') !== null).length;
    const pct = withAlt / allImgs.length;
    let score, detail, fix;
    if (pct === 1)       { score = 15; detail = `All ${allImgs.length} images have alt attributes.`; fix = null; }
    else if (pct >= 0.8) { score = 11; detail = `${withAlt} of ${allImgs.length} images have alt text (${Math.round(pct * 100)}%).`; fix = `Add descriptive alt text to the ${allImgs.length - withAlt} image(s) missing it.`; }
    else if (pct >= 0.5) { score = 7;  detail = `${withAlt} of ${allImgs.length} images have alt text (${Math.round(pct * 100)}%).`; fix = `Add descriptive alt text to the ${allImgs.length - withAlt} image(s) missing it.`; }
    else if (pct >= 0.25){ score = 3;  detail = `Only ${withAlt} of ${allImgs.length} images have alt text (${Math.round(pct * 100)}%).`; fix = `Add descriptive alt text to all images — ${allImgs.length - withAlt} are missing it.`; }
    else                 { score = 0;  detail = `${allImgs.length - withAlt} of ${allImgs.length} images are missing alt text.`; fix = 'Add descriptive alt text to all images. This is critical for SEO and accessibility.'; }
    results.push(scored('seo.alt', 'Image Alt Coverage', score, 15, detail, fix));
  }

  // seo.sitemap — max 10
  try {
    const base = new URL(pageUrl);
    const res = await fetch(`${base.protocol}//${base.host}/sitemap.xml`, { method: 'HEAD', signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      results.push(scored('seo.sitemap', 'Sitemap.xml', 10, 10, 'sitemap.xml is accessible.', null));
    } else if (res.status === 404) {
      results.push(scored('seo.sitemap', 'Sitemap.xml', 0, 10, 'sitemap.xml returned 404.', 'Create an XML sitemap and submit it to Google Search Console.'));
    } else {
      results.push(scored('seo.sitemap', 'Sitemap.xml', 5, 10, `sitemap.xml returned status ${res.status}.`, 'Investigate why the sitemap is not returning a 200 response.'));
    }
  } catch {
    results.push(unavailable('seo.sitemap', 'Sitemap.xml', 10));
  }

  // seo.robots — max 10
  try {
    const base = new URL(pageUrl);
    const res = await fetch(`${base.protocol}//${base.host}/robots.txt`, { method: 'HEAD', signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      results.push(scored('seo.robots', 'Robots.txt', 10, 10, 'robots.txt is accessible.', null));
    } else {
      results.push(scored('seo.robots', 'Robots.txt', 0, 10, 'robots.txt not found or not accessible.', 'Add a robots.txt file to the root of your site to guide search engine crawlers.'));
    }
  } catch {
    results.push(unavailable('seo.robots', 'Robots.txt', 10));
  }

  // seo.canonical — max 10
  const canonical = dom.querySelector('link[rel="canonical"]');
  if (canonical) {
    results.push(scored('seo.canonical', 'Canonical Tag', 10, 10, 'Canonical tag present.', null));
  } else {
    results.push(scored('seo.canonical', 'Canonical Tag', 0, 10, 'No canonical tag found.', 'Add a canonical link tag to each page to prevent duplicate content issues.'));
  }

  return results;
}

// ─── Performance checks ──────────────────────────────────────────────────────

export function runPerfChecks(psi) {
  function scorePerf(id, label, value, key) {
    const t = PERF_THRESHOLDS[key];
    const fix = PERF_FIX[key];
    if (value === null) {
      return unavailable(id, label, t.fullScore);
    }
    const displayVal = key === 'cls' ? value.toFixed(3)
      : key === 'weight' ? `${(value / 1e6).toFixed(2)} MB`
      : `${Math.round(value)} ms`;
    let score, detail, scoredFix;
    if (value <= t.full)         { score = t.fullScore;    detail = `${label}: ${displayVal} — meets target.`; scoredFix = null; }
    else if (value <= t.partial) { score = t.partialScore; detail = `${label}: ${displayVal} — above target, below critical threshold.`; scoredFix = fix.partial; }
    else                         { score = 0;              detail = `${label}: ${displayVal} — above critical threshold.`; scoredFix = fix.zero; }
    return scored(id, label, score, t.fullScore, detail, scoredFix);
  }

  return [
    scorePerf('perf.lcp',    'Largest Contentful Paint', psi.lcp,    'lcp'),
    scorePerf('perf.cls',    'Cumulative Layout Shift',  psi.cls,    'cls'),
    scorePerf('perf.tbt',    'Total Blocking Time',      psi.tbt,    'tbt'),
    scorePerf('perf.ttfb',   'Time to First Byte',       psi.ttfb,   'ttfb'),
    scorePerf('perf.weight', 'Page Transfer Size',       psi.weight, 'weight'),
  ];
}

// ─── Content checks ──────────────────────────────────────────────────────────

export async function runContentChecks(dom, ctx) {
  const pageContent = extractTextContent(dom);
  const [vp, headline, outcomes, clarity] = await Promise.all([
    scoreWithAI(AI_CRITERIA['content.vp'],       pageContent, ctx),
    scoreWithAI(AI_CRITERIA['content.headline'], pageContent, ctx),
    scoreWithAI(AI_CRITERIA['content.outcomes'], pageContent, ctx),
    scoreWithAI(AI_CRITERIA['content.clarity'],  pageContent, ctx),
  ]);
  return [
    { id: 'content.vp',       label: AI_CRITERIA['content.vp'].label,       score: vp.score,       max: 35, method: 'ai', status: vp.status,       detail: vp.detail,       fix: vp.fix,       priority: null },
    { id: 'content.headline', label: AI_CRITERIA['content.headline'].label, score: headline.score, max: 30, method: 'ai', status: headline.status, detail: headline.detail, fix: headline.fix, priority: null },
    { id: 'content.outcomes', label: AI_CRITERIA['content.outcomes'].label, score: outcomes.score, max: 20, method: 'ai', status: outcomes.status, detail: outcomes.detail, fix: outcomes.fix, priority: null },
    { id: 'content.clarity',  label: AI_CRITERIA['content.clarity'].label,  score: clarity.score,  max: 15, method: 'ai', status: clarity.status,  detail: clarity.detail,  fix: clarity.fix,  priority: null },
  ];
}

// ─── UX checks ───────────────────────────────────────────────────────────────

function checkMobile(dom, psi) {
  const viewport = dom.querySelector('meta[name="viewport"]');
  if (!viewport) {
    return scored('ux.mobile', 'Mobile Responsiveness', 0, 30,
      'No viewport meta tag found — site may not render correctly on mobile.',
      'Add <meta name="viewport" content="width=device-width, initial-scale=1"> to the page head.');
  }
  if (psi.mobileScore === null) {
    return unavailable('ux.mobile', 'Mobile Responsiveness', 30);
  }
  const s = psi.mobileScore;
  let score, detail, fix;
  if (s >= 80)      { score = 30; detail = `Mobile score: ${s}/100 — good mobile performance.`; fix = null; }
  else if (s >= 50) { score = 18; detail = `Mobile score: ${s}/100 — acceptable but has room for improvement.`; fix = 'Review mobile-specific performance issues in PageSpeed Insights and address the top recommendations.'; }
  else              { score = 8;  detail = `Mobile score: ${s}/100 — poor mobile performance.`; fix = 'Run a full mobile audit in PageSpeed Insights — critical issues are degrading the mobile experience.'; }
  return scored('ux.mobile', 'Mobile Responsiveness', score, 30, detail, fix);
}

function checkA11y(dom) {
  const inputs = dom.querySelectorAll("input:not([type='hidden']):not([type='submit']):not([type='button']):not([type='reset']), textarea, select");
  let unlabeled = 0;
  for (const input of inputs) {
    const id = input.getAttribute('id');
    const ariaLabel = input.getAttribute('aria-label');
    const ariaLabelledBy = input.getAttribute('aria-labelledby');
    const hasExplicitLabel = id ? dom.querySelector(`label[for="${id}"]`) !== null : false;
    const hasWrappingLabel = input.closest('label') !== null;
    if (!ariaLabel && !ariaLabelledBy && !hasExplicitLabel && !hasWrappingLabel) unlabeled++;
  }
  let labelScore;
  if (inputs.length === 0 || unlabeled === 0) labelScore = 8;
  else if (unlabeled === 1) labelScore = 4;
  else labelScore = 0;

  const styleContent = dom.querySelectorAll('style').map(s => s.text).join('\n');
  const hasFocusCSS = styleContent.includes(':focus') || styleContent.includes(':focus-visible');
  const hasStylesheet = dom.querySelector('link[rel="stylesheet"]') !== null;
  const focusScore = (hasFocusCSS || hasStylesheet) ? 5 : 0;

  const earned = labelScore + focusScore;
  const score = Math.round((earned / 13) * 25);

  let detail, fix = null;
  if (unlabeled > 0) {
    detail = `${unlabeled} form input(s) missing labels. Color contrast check requires browser rendering.`;
    fix = unlabeled === 1
      ? 'Add a visible label or aria-label to the unlabeled form input.'
      : `Add visible labels or aria-labels to all ${unlabeled} unlabeled form inputs.`;
  } else if (!hasFocusCSS && !hasStylesheet) {
    detail = 'No focus CSS detected. Color contrast check requires browser rendering.';
    fix = 'Add :focus-visible styles to ensure keyboard users can see which element is focused.';
  } else {
    detail = 'Form labels present. Color contrast check requires browser rendering.';
  }
  return scored('ux.a11y', 'Accessibility Baseline', score, 25, detail, fix);
}

export async function runUxChecks(dom, psi, ctx) {
  const pageContent = extractTextContent(dom);
  const [nav, hierarchy] = await Promise.all([
    scoreWithAI(AI_CRITERIA['ux.nav'],       pageContent, ctx),
    scoreWithAI(AI_CRITERIA['ux.hierarchy'], pageContent, ctx),
  ]);
  return [
    checkMobile(dom, psi),
    checkA11y(dom),
    { id: 'ux.nav',       label: AI_CRITERIA['ux.nav'].label,       score: nav.score,       max: 25, method: 'ai', status: nav.status,       detail: nav.detail,       fix: nav.fix,       priority: null },
    { id: 'ux.hierarchy', label: AI_CRITERIA['ux.hierarchy'].label, score: hierarchy.score, max: 20, method: 'ai', status: hierarchy.status, detail: hierarchy.detail, fix: hierarchy.fix, priority: null },
  ];
}

// ─── Conversion checks ───────────────────────────────────────────────────────

function checkContact(dom) {
  const emailRx = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/;
  const phoneRx = /(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/;
  const hasContact = t => emailRx.test(t) || phoneRx.test(t);

  const headerEls = [...dom.querySelectorAll('header'), ...dom.querySelectorAll('nav'), ...dom.querySelectorAll('[role="banner"]'), ...dom.querySelectorAll('[role="navigation"]')];
  for (const el of headerEls) {
    if (hasContact(el.text)) return scored('conv.contact', 'Contact Information Visible', 20, 20, 'Phone number or email found in header or navigation.', null);
  }
  const mainEls = [...dom.querySelectorAll('main'), ...dom.querySelectorAll('article'), ...dom.querySelectorAll('[role="main"]')];
  for (const el of mainEls) {
    if (hasContact(el.text)) return scored('conv.contact', 'Contact Information Visible', 12, 20, 'Contact info found in main content area but not in header or navigation.', 'Move a phone number or email address into the header or navigation for maximum visibility.');
  }
  const footerEls = [...dom.querySelectorAll('footer'), ...dom.querySelectorAll('[role="contentinfo"]')];
  for (const el of footerEls) {
    if (hasContact(el.text)) return scored('conv.contact', 'Contact Information Visible', 6, 20, 'Contact info found only in the footer — not prominent enough for conversion.', 'Add a phone number or email address to the header or navigation so it is visible on every page.');
  }
  const bodyText = dom.querySelector('body')?.text ?? '';
  if (hasContact(bodyText)) return scored('conv.contact', 'Contact Information Visible', 6, 20, 'Contact info found on page but in an unclear location.', 'Move contact details to the header or a clearly visible section of each page.');
  return scored('conv.contact', 'Contact Information Visible', 0, 20, 'No phone number or email address found on the page.', 'Add a phone number or email address to the header so visitors can easily reach you.');
}

function checkCapture(dom) {
  const forms = dom.querySelectorAll('form');
  for (const form of forms) {
    const inputs = form.querySelectorAll("input:not([type='hidden']):not([type='submit']):not([type='button']):not([type='reset']):not([type='image'])");
    const textareas = form.querySelectorAll('textarea');
    const selects = form.querySelectorAll('select');
    const allInputs = [...inputs, ...textareas, ...selects];
    const hasSubmit = form.querySelector('[type="submit"], button[type="submit"], button:not([type])') !== null;
    if (allInputs.length >= 2 && hasSubmit) return scored('conv.capture', 'Lead Capture Mechanism', 15, 15, `Form with ${allInputs.length} fields and a submit button found.`, null);
    if (allInputs.length === 1 && hasSubmit) return scored('conv.capture', 'Lead Capture Mechanism', 8, 15, 'Single-field form found — minimal lead capture.', 'Expand the form to collect at least a name and email to qualify leads more effectively.');
    if (allInputs.length > 0 && !hasSubmit) return scored('conv.capture', 'Lead Capture Mechanism', 0, 15, 'Form found but no submit button detected — form may be broken.', 'Add a visible submit button to the form so visitors can complete the action.');
  }
  return scored('conv.capture', 'Lead Capture Mechanism', 0, 15, 'No lead capture form found on the page.', 'Add a contact form or lead capture form to the page — at minimum a name and email field.');
}

export async function runConversionChecks(dom, ctx) {
  const pageContent = extractTextContent(dom);
  const [cta, trust] = await Promise.all([
    scoreWithAI(AI_CRITERIA['conv.cta'],   pageContent, ctx),
    scoreWithAI(AI_CRITERIA['conv.trust'], pageContent, ctx),
  ]);
  return [
    { id: 'conv.cta',   label: AI_CRITERIA['conv.cta'].label,   score: cta.score,   max: 35, method: 'ai', status: cta.status,   detail: cta.detail,   fix: cta.fix,   priority: null },
    { id: 'conv.trust', label: AI_CRITERIA['conv.trust'].label, score: trust.score, max: 30, method: 'ai', status: trust.status, detail: trust.detail, fix: trust.fix, priority: null },
    checkContact(dom),
    checkCapture(dom),
  ];
}

// ─── Technical checks ────────────────────────────────────────────────────────

function checkHttps(pageData) {
  const isHttps = pageData.finalUrl.startsWith('https://');
  return scored('tech.https', 'HTTPS', isHttps ? 30 : 0, 30,
    isHttps ? 'Site is served over HTTPS.' : 'Site is served over HTTP — no encryption.',
    isHttps ? null : 'Install an SSL certificate and redirect all HTTP traffic to HTTPS.');
}

function checkSecurityHeaders(headers) {
  const targets = ['x-content-type-options', 'x-frame-options', 'content-security-policy', 'strict-transport-security'];
  const present = targets.filter(h => headers[h] !== undefined);
  const missing = targets.filter(h => !headers[h]);
  const count = present.length;
  const score = count >= 4 ? 25 : count === 3 ? 18 : count === 2 ? 10 : count === 1 ? 5 : 0;
  const detail = count === 4 ? 'All four security headers present.' : `${count}/4 security headers present. Missing: ${missing.join(', ')}.`;
  const fix = count >= 4 ? null : `Add the missing security headers to your server or CDN config: ${missing.join(', ')}.`;
  return scored('tech.headers', 'Security Headers', score, 25, detail, fix);
}

function checkStructuredData(dom) {
  const scripts = dom.querySelectorAll('script[type="application/ld+json"]');
  if (scripts.length === 0) {
    const microdata = dom.querySelector('[itemscope]');
    if (microdata) return scored('tech.schema', 'Structured Data', 20, 20, 'Microdata structured data found.', null);
    return scored('tech.schema', 'Structured Data', 0, 20, 'No structured data found.', 'Add JSON-LD schema markup (e.g., LocalBusiness, Organization) to help search engines understand your content.');
  }
  let validCount = 0;
  for (const script of scripts) {
    try { JSON.parse(script.text); validCount++; } catch { /* malformed */ }
  }
  if (validCount === scripts.length) return scored('tech.schema', 'Structured Data', 20, 20, `${validCount} valid JSON-LD schema block(s) found.`, null);
  return scored('tech.schema', 'Structured Data', 8, 20, `${scripts.length - validCount} of ${scripts.length} JSON-LD block(s) has invalid JSON.`, 'Fix the malformed JSON-LD schema blocks — use a JSON validator to identify syntax errors.');
}

async function checkBrokenLinks(dom, pageUrl) {
  let base;
  try { base = new URL(pageUrl); } catch { return unavailable('tech.links', 'Broken Links', 15); }

  const links = dom.querySelectorAll('a[href]')
    .map(a => a.getAttribute('href'))
    .filter(href => {
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
      try { const r = new URL(href, base); return r.hostname === base.hostname; } catch { return false; }
    })
    .map(href => new URL(href, base).toString());

  const unique = [...new Set(links)].slice(0, 10);
  if (unique.length === 0) return scored('tech.links', 'Broken Links', 15, 15, 'No internal links found to check.', null);

  const checks = await Promise.allSettled(
    unique.map(url => fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(5000) }).then(r => ({ url, ok: r.ok })))
  );
  const broken = checks.filter(r => r.status === 'fulfilled' && !r.value.ok).map(r => r.value);

  if (broken.length === 0) return scored('tech.links', 'Broken Links', 15, 15, `${unique.length} internal links checked — none broken.`, null);
  if (broken.length === 1) return scored('tech.links', 'Broken Links', 8, 15, `1 broken link found (${new URL(broken[0].url).pathname}).`, `Fix or remove the broken link at: ${new URL(broken[0].url).pathname}`);
  return scored('tech.links', 'Broken Links', 0, 15, `${broken.length} broken links found in a sample of ${unique.length} internal links.`, `Fix or remove broken internal links. Found issues: ${broken.map(b => new URL(b.url).pathname).join(', ')}.`);
}

function checkRedirects(pageData) {
  if (pageData.statusCode === 200) return scored('tech.redirects', 'Redirect Chains', 10, 10, 'Page loaded successfully with no detected redirect chain issues.', null);
  return scored('tech.redirects', 'Redirect Chains', 0, 10, `Page returned status ${pageData.statusCode} — redirect chain or error.`, 'Audit your redirect configuration to ensure the canonical URL loads with a single 200 response.');
}

export async function runTechnicalChecks(pageData, dom) {
  const brokenLinks = await checkBrokenLinks(dom, pageData.finalUrl);
  return [
    checkHttps(pageData),
    checkSecurityHeaders(pageData.headers),
    checkStructuredData(dom),
    brokenLinks,
    checkRedirects(pageData),
  ];
}
