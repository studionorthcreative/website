# StudioNorth — How to Work With Claude Code

---

## Quick Start: First Thing to Do

When you open Claude Code for the first time in this project, **copy and paste this entire prompt** as your first message:

---

```
I'm taking over the StudioNorth Creative Studio website project. I'm not a developer — I'm the creative lead. I communicate visually and conceptually.

Here's how I want to work with you:

1. I describe what I want in plain language. You build it.
2. If I'm vague, ask me a clarifying question before building.
3. When you make changes, tell me what changed in 1-2 sentences — no code explanations.
4. If I say "I don't like it" without detail, ask me what specifically feels off.
5. Always preserve sections I say I like. Don't touch them unless I ask.
6. When I say "push" or "deploy", commit and push to git so Vercel auto-deploys.
7. If something needs a decision from me (color, layout, copy), give me 2-3 options to pick from.
8. Keep the site premium, minimal, and modern. No cheesy stock-photo energy. No generic startup vibes.
9. Before starting work, read the STUDIONORTH-BLUEPRINT.md for full brand and design context.
10. Before starting work, read the SEO-AND-PIXEL-STRATEGY.md for tracking context.

The site is at localhost:3333 — start the server so I can preview. Walk me through what's currently built.
```

---

Paste that, hit enter, and you're set. Claude will read the project, start the server, and walk you through everything. From there, just talk to it like you'd talk to a designer.

---

Welcome. This guide will teach you how to talk to Claude Code the way a power user does — fast, direct, and in control. You don't need to know how to code. You need to know how to communicate what you want.

---

## What Is Claude Code?

Claude Code is an AI assistant that runs in your terminal (the black window with text). It can:
- Build websites and apps
- Edit files on your computer
- Push code to GitHub
- Deploy to Vercel
- Research anything on the web
- Manage your entire project

Think of it as a senior developer who works for you. You tell it what you want. It builds it.

---

## The #1 Rule

**Be direct. Say what you want, not how to do it.**

Bad: "Could you perhaps consider maybe adding a section to the website that might showcase our services in some kind of grid layout?"

Good: "add a services section with 3 cards in a grid"

Better: "add a services section with 3 cards — brand identity, web design, product sourcing. dark background, white text, minimal."

Best: "add a services section. 3 cards in a grid. dark background. each card has a number (01, 02, 03), title, short description, and a 'learn more' link. match the style of the rest of the site."

The more specific you are, the closer the first result is to what you want.

---

## How to Talk to Claude Code

### Starting a Session

When you open Claude Code in the project folder, it already knows all the files. You can just start talking.

Examples of good first messages:
- "show me what the site looks like right now"
- "what files are in this project?"
- "run the local server so I can preview the site"
- "I want to change the hero headline"

### Giving Instructions

Talk like you're directing a designer. You don't need code words.

| What you want | What to say |
|---------------|-------------|
| Change text on the site | "change the hero headline to 'Build your brand with intention'" |
| Change a color | "make the background of the testimonials section white instead of dark blue" |
| Add a new section | "add a section between the portfolio and testimonials that shows our process in 4 steps" |
| Remove something | "remove the transformation section" |
| Move something | "move the FAQ section above the testimonials" |
| Fix something | "the mobile menu isn't closing when I tap a link" |
| Change fonts | "change the headline font to something more modern and sharp" |
| See the site | "start the local server" or "open localhost" |
| Deploy | "push to git" (Vercel auto-deploys from GitHub) |

### Giving Feedback

After Claude builds something, look at it in your browser (localhost:3333) and give feedback the same way you'd talk to a designer:

- "the spacing between sections is too tight — add more breathing room"
- "the testimonial cards look too boxy, make them feel lighter"
- "I don't like the font, try something with more personality"
- "the hero feels empty on the right side, add something visual there"
- "this is good but the colors feel too cold, warm it up"
- "perfect, don't change anything about this section"

**Say what you feel, not what code to write.** Claude will translate your vision into code.

### When You're Unsure

Just say so. Claude will ask clarifying questions.

- "I want to change the vibe of the site but I'm not sure how"
- "something feels off about this section"
- "what would you recommend for the about page?"
- "show me 2 different approaches for the services layout"

### When You Want Options

- "give me 3 headline options for the hero"
- "suggest 3 different color palettes that feel more premium"
- "what are some ways to make the portfolio section more engaging?"

---

## Power Moves (Things That Make You Faster)

### 1. Stack Instructions
You can give multiple instructions in one message:

"change the hero headline to 'Your brand, reimagined.' — make the subline shorter — change the CTA button text to 'Get Started' — and make the hero background a lighter beige"

Claude will do all of it at once.

### 2. Reference What You See
If something looks wrong in the browser, take a screenshot and describe what you're seeing:

"the text on mobile is too small in the services section and the cards are overlapping"

### 3. Use "Like [Reference]"
If you have a site you like, share the URL:

"I want the portfolio grid to feel more like how [url] does their work section"

### 4. Say "Don't Touch X"
If you like part of the page, protect it:

"redesign the services section but don't touch the hero or testimonials"

### 5. Undo Things
If Claude makes a change you don't like:

"undo that last change" or "revert the hero back to what it was"

### 6. Ask "What Do You Think?"
Claude can give design and strategy opinions:

"do you think we need an about section on the homepage or should it be a separate page?"
"is this headline strong enough?"
"what's missing from this homepage?"

---

## Key Commands You'll Use

| What to type | What it does |
|-------------|--------------|
| `! python3 -m http.server 3333` | Starts local preview at localhost:3333 |
| "push to git" | Saves and deploys your changes |
| "show me the current homepage" | Claude will read the file and explain what's there |
| "what did we change today?" | Shows recent modifications |
| `/clear` | Clears the conversation (fresh start) |

---

## Project Structure (What's Where)

```
KazUka/
├── index.html          ← The homepage (all sections live here)
├── styles.css          ← All the visual styling (colors, fonts, spacing)
├── script.js           ← Interactions (menu, animations, form, tracking)
├── api/
│   └── contact.js      ← Server code that sends form emails via Resend
├── robots.txt          ← Tells Google how to crawl the site
├── sitemap.xml         ← List of all pages for search engines
├── vercel.json         ← Deployment config
├── package.json        ← Dependencies (just Resend)
├── STUDIONORTH-BLUEPRINT.md    ← Full brand + website strategy
├── SEO-AND-PIXEL-STRATEGY.md   ← SEO + tracking game plan
└── .gitignore          ← Files that don't get pushed to GitHub
```

You don't need to memorize this. Just tell Claude what you want and it knows where to make the change.

---

## How to Preview Your Site

1. Tell Claude: "start the local server"
2. Open your browser and go to: **http://localhost:3333**
3. After making changes, refresh the browser to see updates
4. When happy, tell Claude: "push to git" to deploy

---

## How to Deploy Changes

Every time you push to GitHub, Vercel automatically deploys. So:

1. Make your changes with Claude
2. Say: "commit and push"
3. Claude will save everything and push to GitHub
4. Vercel picks it up and deploys within ~60 seconds
5. Your live site updates automatically

---

## Things Still Needed (Setup Checklist)

- [ ] **Vercel login** — run `! vercel login` and sign in with the StudioNorth account
- [ ] **Vercel env vars** — add `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `CONTACT_EMAIL` in Vercel dashboard
- [ ] **Cloudflare Turnstile** — create a widget at dash.cloudflare.com, get site key + secret key
- [ ] **Update Turnstile site key in code** — tell Claude: "update the Turnstile site key to [your key]"
- [ ] **Resend domain verification** — verify sending domain in Resend dashboard
- [ ] **OG image** — create a 1200x630px social preview image
- [ ] **Favicon** — create favicon files from the logo

---

## Conversation Style Cheat Sheet

### Be Specific About Visual Things
- "more whitespace" → "add 40px more padding between sections"
- "make it pop" → "make the headline bigger and bolder, the current size feels weak"
- "I don't like this" → "the dark section feels too heavy, try a lighter background"

### Be Clear About Scope
- "fix the site" → too vague
- "fix the mobile nav — it's not closing when I tap links" → perfect

### Give Context When Relevant
- "my target client is a boutique fitness studio owner who thinks her brand looks DIY — the site needs to feel like the opposite of DIY"

### Trust Your Eye
If something looks wrong to you, it probably is. Say so. You don't need to know the technical term:
- "the text is too close to the edge on mobile"
- "these two sections feel too similar visually"
- "the button doesn't look clickable enough"

### Confirm What You Like
When something looks good, say so — this helps Claude learn your taste:
- "the hero section is exactly right, keep this"
- "I love the testimonials layout"
- "this is the vibe — apply this same energy to the services section"

---

## Common Scenarios

### "I want to add a new page"
"Create an About page with a founder story section, our values, and a CTA at the bottom. Match the style of the homepage."

### "I want to change the brand colors"
"Change the blue to a deeper navy (#0A1628) and make the beige warmer. Update it everywhere."

### "I want to add real portfolio images"
"Replace the placeholder in the first portfolio card with this image: [drag image into terminal or give file path]. Title: 'Meridian Wellness', Tag: 'Wellness · Brand + Web'"

### "I want to test on mobile"
"Start the local server" — then open localhost:3333 on your phone (must be on same WiFi), or use Chrome DevTools mobile preview (right-click → Inspect → toggle device toolbar).

### "Something broke"
"Something looks broken on the site — the testimonials section is overlapping the services. Can you fix it?"

---

## Final Tips

1. **You're the creative director.** Claude is the executor. Direct with confidence.
2. **Iterate fast.** Make a change, look at it, give feedback, repeat. Don't try to get everything perfect in one message.
3. **Screenshots help.** If you can show Claude what you're seeing, do it.
4. **Don't be afraid to undo.** Nothing is permanent until you push to git.
5. **Ask Claude to explain.** If you're curious about why something was done a certain way, just ask.
6. **Keep messages short.** One clear instruction beats a paragraph of vague direction.

You've got a full website, SEO infrastructure, contact form with spam protection, and tracking — all ready to customize. Make it yours.
