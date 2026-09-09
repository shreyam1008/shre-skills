# Catalog usability and discoverability review

The reported broken layout reproduced in the live browser: new markup loaded
with an older stylesheet from the reused `styles.css` URL. Content fingerprints
now give each CSS/JavaScript version a distinct URL.

## Changes

- bunx is the default for the collection and all 21 individual commands.
  The Bun/npm selector updates every command; copying reads the visible command.
- Six labeled category sections provide static navigation, enhanced filtering,
  search, a result count, and a resettable empty state.
- Cards have consistent metadata, descriptive titles, summaries, source links,
  direct Markdown links, and install controls. Commands wrap at narrow widths.
- Static HTML contains every skill and source link. Canonical URL, descriptive
  metadata, social text previews, structured data, robots.txt, and sitemap support
  search discovery. JSON and llms.txt provide complementary agent entry points.

## Verification

- Repository validation, build, and all nine regression tests passed.
- Browser screenshots checked at desktop 1280px and mobile 390px and 320px.
  No horizontal page overflow at those widths.
- Verified default bunx, all 22 commands switching to npx, collection and
  individual copy feedback, category selection, search within a category,
  no results, and Clear restoring all 21 skills.
- Automated checks verify fingerprinted assets match their bytes, each skill
  appears exactly once, JSON/structured data agree with the library, and published
  Markdown matches its source.

Search Console indexing and field Core Web Vitals have not been verified.
llms.txt is supplemental documentation; it is not a search ranking requirement.

References: [Google SEO basics](https://developers.google.com/search/docs/fundamentals/seo-starter-guide),
[JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics),
[Google AI search guidance](https://developers.google.com/search/docs/appearance/ai-features),
and [Bun bunx documentation](https://bun.sh/docs/pm/bunx).
