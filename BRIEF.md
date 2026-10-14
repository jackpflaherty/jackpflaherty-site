# Page conversion brief (jackpflaherty.com rebuild in Astro)

You are converting draft pages from a FlexiFunnels export into Astro pages in this project. The copy is final and approved; port it VERBATIM. Do not rewrite, shorten, embellish or add claims. The only text changes allowed are the punctuation rules below.

## Where things are
- Source fragments (clean HTML of each page body, nav and footer already stripped): `src/fragments/<name>.html`. Custom-code blocks are already decoded inline (`div.cc`). Ignore FlexiFunnels classes (gjs-*, ft*, ftparagraph etc.); read them for structure and copy only.
- Page metadata (title, description, keywords, existing JSON-LD): `src/data/meta.json` keyed by fragment name. Use title/description/keywords as given. Keep description at or under 160 characters (trim at a sentence boundary if longer).
- Reference page already converted: `src/pages/index.astro` (home). Match its patterns exactly.
- Layout: `src/layouts/Base.astro` props: title, description, keywords, path (the URL path, e.g. `/about-jack-flaherty`), image (optional og image path), noindex (bool), schema (array of JSON-LD objects; Person schema is added automatically, do not add another Person), type ('article' for essays).
- Components: `Hero.astro` (props image, mobileImage?, alt, pos, posMobile, short) with slot for kicker/h1/p/buttons; `Faq.astro` (items [{q,a}], heading); `Cta.astro` (text, primary {label,href}, secondary?); `src/lib/faq.ts` exports `faqSchema(items)`.
- CSS classes available (global.css): `.wrap`, `.narrow`, `section`, `section.tight`, `.dark` (dark-brown section), `.lede`, `.kicker`, `.btn`, `.btn.alt`, `.btn.light` (on dark), `.btns`, `.grid.c2/.c3/.c4`, `.card`, `.card.accent`, `.split`, `.split.rev`, `ul.checks`, `.faq`, `.cta-band`, `.prose` (essay body, 38rem measure), `.prose .callout`, `.byline`, `.meta`, `.quote` (figure with blockquote + figcaption), `.video-wide`, `.form`, `.form .row`, `.notice`, `.logos`. Do not write new global CSS. If a page needs something unusual, use a `<style>` block inside the page, scoped, minimal.
- Images are in `public/images/`. Use ONLY these files (never img.flexifunnels.com URLs):
  - jack-p-flaherty-keynote-speaker-hero.jpg (2400x1138) and -hero-mobile.jpg (1200x900): home only.
  - jack-p-flaherty-portrait-about.jpg (1200x1500, 4:5), jack-p-flaherty-portrait-square.jpg (800x800), jack-p-flaherty-portrait-pier.jpg (1200x1499, 4:5).
  - jack-p-flaherty-keynote-stage-wide.jpg (2400x1347, dark stage, text sits on the left third: use as Hero on the keynote hub and the two keynote pages with pos="70% 50%"), jack-p-flaherty-keynote-stage.jpg (1600x900), jack-p-flaherty-keynote-stage-blue.jpg (1600x1066), jack-p-flaherty-decision-switch-stage-bw.jpg (1500x1124, black and white: The Decision Switch section only).
  - jack-p-flaherty-advisory-conversation.jpg (1600x876), jack-p-flaherty-board-advisory-sepia.jpg (1600x900), jack-p-flaherty-office-discussion.jpg (1600x1083), jack-p-flaherty-workshop-table.jpg (1600x1199), jack-p-flaherty-interview.jpg (1600x862).
  - jack-p-flaherty-whiteboard-objective-constraints-obstacles.jpg (1600x893), jack-p-flaherty-teaching-whiteboard.jpg (1600x900), jack-p-flaherty-writing-at-desk.jpg (1600x900), jack-p-flaherty-teaching-cutout.png (900x1042, transparent).
  - jack-p-flaherty-speaker-reel-poster.jpg (1280x720), the-decision-switch-book-stack.jpg (673x775, white background), the-decision-switch-book-stack-brown.jpg (1600x900).
  - podcast-chats-with-jason.jpg, podcast-evergreen-business-growth.jpg, podcast-humor-in-the-c-suite.jpg, podcast-lifeology-radio.jpg, podcast-mentors-collective.jpg, podcast-profit-with-law.jpg, podcast-sinjun-ai-projects.jpg, podcast-thrive-radio.jpg (800x450 each).
  Every img gets alt text (under 125 characters, include "Jack P. Flaherty" when he is in the picture), width, height, and loading="lazy" except the hero.
- Site data: `src/data/site.json` (calendly, reel (YouTube), amazon, assessment, phone, email, position line). Import it and use the values rather than hard-coding URLs.

## Rules (from the client's writing standard; non-negotiable)
- No em dashes or en dashes anywhere. Replace with a comma, a colon, a full stop, or "to" for ranges ("0 to 100"). No semicolons. No arrow characters ("→"). No "·" separators (use a comma or a full stop).
- Straight quotes are fine. Keep the ™ where the source has it on "Clear Confidence Assessment™" the first time on a page, drop it elsewhere.
- One H1 per page, and it must be the page's main headline from the fragment. Footer or newsletter H1s from the old site do not exist here.
- Reply-time promise is always "within one business day". No speaking fees or dollar fee ranges anywhere. If a fragment contains a fee, drop that sentence.
- Links: internal links are root-relative (`/book-jack`, `/keynote-speaker/...`). Keep every link that exists in the fragment, pointed at the same path. "Book a discovery call" goes to site.calendly. Never link to img.flexifunnels.com or app.flexifunnels.com. Old blog URLs `/blogs/the-yes-trap-mental-health`, `/blogs/the-burn-out-trap`, `/blogs/executive-tool-kit`, `/blogs/consulting-career-path` do not exist; if referenced, link to `/insights` instead.
- Forms: the inquiry form on Book Jack posts to `/api/inquiry` (method="post") with fields name, email, organization, role, event_date, audience, message, and a hidden `source` field with the page path. Keep labels visible. Use the `.form` classes.
- FAQ sections: use `<Faq items={faqs} />` and pass `faqSchema(faqs)` in the Base `schema` prop. Answers are plain text or minimal inline HTML.
- Existing JSON-LD in meta.json (FAQPage, CollectionPage, Article etc.): reproduce the same information through the schema prop (rebuild it as an object, update any absolute URLs to https://www.jackpflaherty.com paths, drop any Person duplicates).
- Headings: do not add eyebrow labels in all caps. The `.kicker` class is sentence case and only where the fragment has a kicker/eyebrow line.
- Do not invent copy for empty states. Do not add testimonials, stats, logos or claims that are not in the fragment.
- Output file paths map to URLs: `src/pages/about-jack-flaherty.astro` → /about-jack-flaherty; `src/pages/keynote-speaker/executive-decision-making-keynote.astro` → /keynote-speaker/executive-decision-making-keynote; `src/pages/blogs/the-ai-atrophy.astro` → /blogs/the-ai-atrophy, etc. Fragment names use `__` for `/`.
- After writing your pages, run `npx astro build` from /home/claude/site and fix any error in your own files. Then run `node tools/shot.mjs <path> [<path>...]` for each page you built and look at `/home/claude/assets/proofs/<name>-d.png` and `-m.png` (open with the Read tool after shrinking with PIL if large) to check layout at desktop and phone width. Fix what is broken. Fonts are blocked in this sandbox, so system fallbacks are expected.
- Report back: the list of files written, any copy in the fragment you could not place (quote it), any rule conflicts you found (quote them), and anything you changed beyond punctuation.
