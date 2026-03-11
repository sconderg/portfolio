---
title: How We Turned Content Scraping Into a Backlink Strategy
description: Instead of fighting content scrapers, we built a system that made copied content work for us — injecting trackable internal links that turned theft into passive SEO distribution.
date: 2025-02-10
tags: ["seo", "next.js", "graphql", "architecture"]
slug: turning-content-scraping-into-a-backlink-strategy
---

## Introduction

Most engineering problems arrive as complaints. This one arrived as a business concern: competitors were copying our product descriptions word for word and publishing them on their own websites. The SEO implications were real — duplicate content, diluted authority, and traffic we were effectively handing to other domains.

The instinct was to fight it. Block scrapers, add detection logic, file DMCA requests. All reasonable responses. But none of them scale well, and none of them actually recover value from content that's already been copied.

So instead of only playing defense, we asked a different question: what if we made copied content work for us?

---

## The Problem: Content Scraping at Scale

The platform sold physical products — specialty foods, bulk goods, gift items. Each product had a hand-written description, carefully worded for conversion. These descriptions were getting lifted wholesale and republished on competitor sites, reseller pages, and aggregator directories.

Beyond the obvious frustration, the real damage was SEO. Search engines were seeing the same content across multiple domains. In some cases, competitor pages were outranking us for our own product copy. We were doing the writing and someone else was capturing the traffic.

Blocking scrapers was a partial solution at best. Determined scrapers rotate IPs, use headless browsers, and adapt. We needed something more durable.

---

## Turning the Problem Into an Opportunity

The insight was simple: if our content was going to be copied regardless, we should make sure it carries something valuable with it.

Internal links.

If every product description contained anchor tags pointing back to our domain, then any site that copied the content would also be copying those links. Backlinks from external domains — even low-quality ones — still carry some SEO signal. And more importantly, real users landing on those scraped pages might click through.

This reframed the problem entirely. Instead of treating scraped content as pure loss, we designed a system that turned it into a passive distribution channel.

---

## The System Design

The core idea was straightforward: maintain a list of keywords and their corresponding internal URLs, then scan every product description at fetch time and inject anchor tags around matching keywords automatically.

No manual editing of product descriptions. No per-product configuration. The content team defines the keyword-to-URL mapping once, and the injection happens everywhere that keyword appears — across hundreds of product pages — instantly.

The system had three distinct layers:

- **A management interface** for the content team to define and update keyword mappings
- **A GraphQL API layer** handling both the keyword data and the injection logic
- **A click tracking system** to measure which keywords were actually driving engagement

---

## Building the Internal Linking Dashboard

I built the dashboard in Next.js as an internal admin tool — separate from the customer-facing storefront but sharing the same GraphQL API.

The interface was deliberately simple. The content team needed to be able to:

- Add a new keyword with an associated URL
- Edit existing mappings
- Delete keywords that were no longer relevant
- View click analytics per keyword

No developer involvement required after the initial build. This was important — SEO strategy moves fast, and waiting on an engineer to update a keyword mapping would have killed adoption immediately.

The mutations were clean:

- `createKeyword(keyword, url)` — adds a new mapping
- `updateKeyword(id, keyword, url)` — modifies an existing one
- `deleteKeyword(id)` — removes it entirely

The dashboard would query the full keyword list on load and render it in a simple table with inline edit controls. Fast to build, fast to use.

---

## Injecting Links Dynamically with GraphQL

The injection logic lived on the frontend data layer. When a product description was fetched via GraphQL, the response went through a processing function before being rendered.

The function iterated over the keyword list and used regex replacement to find matches in the description text, wrapping them in anchor tags. The keyword's database ID was embedded directly into the link URL as a query parameter:

```typescript
"These premium dates are perfect for gifting."
→
"These <a href='https://example.com/premium-dates?internal-keyword=1'>premium dates</a> are perfect for gifting."
```

The `internal-keyword` query parameter carried the keyword's ID. This was the key design decision that made passive click tracking possible — the ID traveled with the link wherever the content ended up, whether on our own pages or on a site that had scraped the description.

A few rules governed the injection to keep things SEO-safe and avoid breaking the page:

- Only the **first occurrence** of each keyword per description was linked — if "premium dates" appeared three times, only the first was wrapped in an anchor tag, to avoid over-optimization and visual noise
- Keywords found inside **headings (`h1`–`h6`) or HTML attributes** (like image `src` or `alt` values) were skipped entirely — injecting an anchor inside an `img` src would break the image, and linking keywords inside headings is an SEO anti-pattern
- A **maximum of 10 keywords** were linked per description, even if more matches existed — this prevented product pages from becoming walls of hyperlinks, which search engines penalize as over-optimization
- Matches were **case-insensitive** but the original casing was preserved in the rendered output
- The system skipped injection if the keyword was already inside an existing anchor tag to prevent nested links

This ran client-side on the fetched description string, which kept the product content in the database clean and made the keyword mappings the single source of truth for all linking behavior.

---

## Tracking Keyword Clicks

This is where the `internal-keyword` query parameter earned its place in the design.

When a user landed on a destination page — whether by clicking a link on our own site or following a link that had been copied to an external page — the page would read the `internal-keyword` value from the URL and fire a single GraphQL mutation:

```graphql
incrementKeywordClick(id: 1)
```

That's it. No session data, no user identification, no complex event pipeline. The keyword ID in the URL was enough to attribute the click and increment the counter against the right record.

This approach had an important property: it worked regardless of where the click originated. A user clicking through from a scraped competitor page triggered exactly the same mutation as a user clicking on our own storefront. The tracking was link-native, not page-native — which meant it scaled automatically to every surface where the content appeared.

The dashboard surfaced these counts per keyword, giving the content team a clear view of which mappings were driving real engagement and which were sitting idle. That data fed directly back into their keyword strategy — high-performing links got expanded, low-performing ones got revisited.

---

## Technical Challenges

A few things made this harder than it looked on paper.

**Text parsing without breaking HTML.** Product descriptions sometimes contained existing HTML — line breaks, bold text, the occasional existing link. Naive regex replacement on raw HTML strings can corrupt tags or create invalid markup. The solution was to process only text nodes, not the full HTML string, which required parsing the description into a DOM-like structure before applying replacements.

**Keyword ordering and conflict resolution.** If one keyword was a substring of another — say "dates" and "wholesale dates" — naive matching would link the wrong thing. Keywords were sorted by length descending before processing so that longer, more specific matches were applied first.

**Performance at scale.** The keyword list could grow to hundreds of entries. Running every keyword as a separate regex pass over every description on every page load was not viable. The solution was to compile all keywords into a single combined regex at query time, reducing the processing to a single pass per description regardless of keyword count.

**Query parameter persistence.** One edge case worth calling out: if a user clicked a keyword link and then shared that destination URL, the `internal-keyword` parameter would travel with it. This was acceptable — a shared link clicking through still represented genuine interest in that keyword mapping. But it was a conscious decision, not an oversight.

---

## Lessons Learned

The most valuable thing about this project wasn't the technical implementation — it was the product thinking behind it.

The original instinct was purely defensive: stop the scraping. The better question was: what's the best outcome we can realistically achieve given that scraping is happening? That shift in framing opened up a solution space that the defensive approach completely missed.

The `internal-keyword` query parameter design is a good example of thinking at the system level rather than the feature level. The naive approach to click tracking would have been a JavaScript click handler on each injected link — which works fine on our own pages and nowhere else. Embedding the ID in the URL meant the tracking capability was portable. It lived in the content, not in the page.

Internal tooling matters more than engineers often acknowledge. The dashboard was maybe two days of work. But it gave the content team full autonomy over a system that directly impacted SEO — a surface area they understood far better than any developer. Removing that dependency made the system useful in a way it wouldn't have been otherwise.

And finally: small systems can have disproportionate impact. This wasn't a major infrastructure project. It was a keyword table, some regex logic, a simple dashboard, and a query parameter. But it touched every product page on the platform and created a mechanism that kept working passively — whether the team was actively managing it or not.

---

## Conclusion

What started as a content theft problem ended as an SEO feature. The system injected internal links across hundreds of product descriptions automatically, gave the content team a tool to manage keyword strategy without engineering support, and tracked clicks through a URL-native mechanism that worked on any surface where the content appeared — including pages we didn't control.

More importantly, it reframed how the team thought about scraped content — not as a loss to minimize, but as a distribution surface to instrument.

The `internal-keyword` query parameter is a small detail. But it's the kind of detail that separates a feature that works on your own platform from a system that works everywhere. That's usually where the interesting engineering decisions live — not in the architecture diagram, but in the small choices that determine how far your system's reach actually extends.
