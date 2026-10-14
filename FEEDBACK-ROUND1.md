# Feedback round 1 (Jack, 2026-10-14). Approved copy and instructions for the edits.

Rules still apply: no em or en dashes, no semicolons, no arrows, one H1, reply time "within one business day", no fees, no "™" on Clear Confidence anywhere (Jack's ruling: it is not a trademark; the footer legal line keeps only "The Decision Switch" as a trademark). "Big 4" is Jack's spelling in the copy he supplied; use it exactly inside his supplied text and leave existing "Big Four" elsewhere.

## GLOBAL (every page)

G1. Header: logo larger (height 3.4rem desktop, 2.6rem phone), nav bar tighter: min-height 4rem, no extra padding above or below the logo. Keep sticky.

G2. Speaking dropdown and footer "Speaking and advisory" list: reorganise into labelled groups, Title Case every word except "and". Dropdown contents (in this order, with small group labels in the dropdown):
  Keynotes: Fear Is Not A Control · The Decision Switch
  Audiences: Health Systems · Professional Services · Associations · AI and Emerging Technology
  Advisory: Board and Executive Advisory
  (Book Jack is NOT in the dropdown; it stays the button.)
  Footer column 2 becomes two short lists under headings "Keynotes" (two items) and "Audiences" (four items), and column 3 keeps the newsletter. Add "Board and Executive Advisory" and "Book Jack" under a third small heading "Advisory and Booking" in column 2.
  Top-level nav labels stay: About, Speaking, Toolkit, Insights, Media, The Book.

G3. Assessment block ("All Pages 1"): replace the short pre-footer band ("Where does your decision-making actually stand?") everywhere it appears with ONE shared component `src/components/Assessment.astro` using this copy, left-aligned text with the bullet list beside it (same layout as the current "You can't fix what you can't see" block):
  H2: Take the Clear Confidence Assessment
  Lede: A three-minute read on how your organization makes decisions with technology. Free. No call required.
  Bullets: Your Clear Confidence Score, 0 to 100 · Which of four decision-making tiers you are in · Your single biggest gap, named · A personalized report, yours to keep
  Button: See where you stand (site.assessment, new tab)
  Use this component on every page that currently has either assessment block (home, hub, keynote pages, toolkit, book page, the two about/insights references if present). Delete the short band version entirely.

G4. FAQ sections ("Questions ... ask"): wider and left-justified. Set `.faq{max-width:58rem}` in global.css and remove any narrow wrapper around Faq on the industry and keynote pages so the block starts at the left edge of `.wrap` like the other sections. Same for any other left-justified block Jack flagged (Associations 6, AI 4, Health Systems 1, Professional Services 4).

G5. Whitespace: section padding on dark/light alternating sections is too generous. Change `section{padding:clamp(2.5rem,5vw,4rem) 0}` and `section.tight{padding:clamp(1.5rem,3vw,2.25rem) 0}`. Hero `.wrap` padding-top/bottom 3rem. Split layouts: align-items:start when the image is shorter than the text, so the image sits near the headline (add a `.split.top` modifier and use it where Jack asked: AI page hero split, Toolkit 2).

G6. Remove "™" from "Clear Confidence Assessment™" wherever it appears (pages, schema, Footer legal line). Footer legal becomes: © {year} Jack P. Flaherty. All rights reserved. "The Decision Switch" is a trademark.

G7. Testimonial attributions from the NCSBN ICRS graduation: never the same attribution three times. Use initials from the sign-up list, varied, e.g. "B.D., nursing regulator, NCSBN ICRS graduation" · "L.S., nursing conference attendee" · "S.M., nursing conference attendee" · "J.S., nursing regulator". Quote-to-initials map: "Great presenter! Clear and concise. Informative." = B.D. · "Inspiring. Provides a framework." = L.S. · "Intriguing. I found the content interesting to help make better informed decisions." = S.M. · "Provides some interesting ways to think about how to make decisions." = J.S. Shola Richards is a fellow speaker, never an attendee: attribute him "Shola Richards, keynote speaker and author, Go Together" and never place him under an "attendees" heading.

## ABOUT (src/pages/about-jack-flaherty.astro)

A1. Reduce the gap between the header and the About section (hero/intro padding-top 2rem). Put "Jack P. Flaherty" on one line: h1 font-size clamp(2.2rem,4.2vw,3rem) and give the text column enough width (split 1.2fr/.8fr).

A2. Replace the intro paragraphs with exactly this (links as marked):
  P1: Jack Flaherty is the trusted advisor who helps boards and executives make decisions with technology.
  P2: For 25 years in risk and advisory, 15 of them at the Big 4, Jack has sat in the rooms where technology decisions were made, defended and paid for. Enterprise systems spanning cybersecurity, finance, blockchain, AI and data governance, medical records, and human resources. He has implemented them and audited them.
  P3: The organization's future rode on those choices. When one failed, he watched capable leaders stumble or stall on calls they were not equipped to make. When one worked, the hard questions got asked first, one person owned the decision, and the team stood behind it. Those organizations moved faster than everyone around them and could show the results.
  P4: The gap between the two is the foundation of Jack's work. [The Decision Switch](/keynote-speaker/executive-decision-making-keynote#the-decision-switch) is the framework and keynote for organizations that want to make decisions faster, so attention can return to the goal. [Fear Is Not A Control](/keynote-speaker/executive-decision-making-keynote) is the keynote for leaders bringing in AI and emerging technology. Most know they need to move. Fewer know which questions to ask before they commit.

A3. "Where he has sat" section: add the photo /images/jack-p-flaherty-seated-advisor.jpg (938x642) on the right in a split; alt "Jack P. Flaherty seated in a high-backed chair with a laptop, advisory setting". Keep the bullet list on the left.

A4. Replace "How he got here" paragraphs with exactly this:
  P1: Jack started on Morgan Stanley's derivatives trading desk in New York. In 2001 he moved to Los Angeles and joined Deloitte's risk advisory practice. Healthcare was years behind financial services in how it used technology, so he moved there. He led large risk programs, implemented and audited enterprise and clinical systems, and ran training for the firm and for the Southern California HIMSS chapter.
  P2: In 2009 he founded Abidance Solutions, his first consulting firm. It answered the question his clients kept asking: how do you deliver a regulator-driven, board-mandated technology program and have it hold? The work pointed to the next problem. Data. He joined Orion Health in 2013 as principal consultant for California's first statewide Health Information Exchange. There he saw how hard it is to move data between organizations that were never built to share it. That pulled him back to the Big 4. In 2015 he joined PwC as a director in healthcare risk and digital assurance.
  P3: He left PwC in 2021 to work with startups in fintech, blockchain and AI as an interim executive and advisor. Startups make the same technology decisions as large companies, but without the governance or structure. One client was hacked. Another had its intellectual property stolen. A third was named in a lawsuit. He wrote [The Decision Switch](/books/the-decision-switch) in 2023 for the capable leaders he had watched make technology decisions without the knowledge or experience, and has spoken, taught, and advised on it since.
  Keep the whiteboard photo beside it if it still fits; otherwise drop it (the seated photo now carries the page).

A5. Speaking and writing card: first bullet becomes "Keynotes: Fear Is Not A Control and The Decision Switch, 45 to 60 minutes." (nothing else in that bullet). Author bullet: "Author of The Decision Switch." (no publisher). In the speaking-history bullet expand NCSBN to "the National Council of State Boards of Nursing (NCSBN)". Credentials card: add as the FIRST bullet "Former Big 4 Executive at Deloitte & PwC". Last bullet reads "Based in Los Angeles, California."

A6 ("Fear Is Not A Control" dark slide with four boxes, currently headed "Treat new technology like a new hire" on the AI page, and the same block wherever it appears as four boxes): rebuild as:
  H2: Fear Is Not A Control
  Lede: Take fear out of your organization by making the goal clear, raising transparency, encouraging curious collaboration, and then stepping back to watch your teams flourish with technology.
  Four cards:
   1. A clear goal. Say what you are trying to accomplish before you pick a tool.
   2. Governance built in. Every technology project carries it from day one, and AI, large language models and agents most of all.
   3. A repeatable framework. One way of developing AI work, so each project strengthens the foundation for the next.
   4. High-quality data. Garbage in, garbage out. Decide what the system is allowed to learn from.
  Then the four questions (new sub-block headed "The four questions a board can ask"):
   1. What is this for, and how will we know it worked?
   2. Who owns it, and what governance did it come with?
   3. Is this the same way we did the last one, or a new way every time?
   4. Where does its data come from, and would we stand behind it?
  Closing line: That is the whole method. It fits on one page, and a board can ask about it in four questions.
  NOTE: the three brand messages are unchanged elsewhere. This rebuild applies to the four-box slide only.

## AI AND EMERGING TECHNOLOGY (src/pages/industries/ai-emerging-technology.astro)

AI1. Hero split: picture fills about 45 percent of the width on the right and sits level with the headline (split.top, columns 1.1fr .9fr, image not cropped to 16:10).
AI2. "Where Jack has sat": expand to this (replace the single paragraph):
  25 years in risk and advisory. 15 years at the Big Four, where he served as a director. Held CISSP, CISA and CGEIT.
  He has implemented and audited enterprise systems spanning cybersecurity, finance, blockchain, AI and data governance, medical records, and human resources. He served as principal consultant for California's first statewide Health Information Exchange, led PwC's healthcare risk and digital assurance work as a director, and has been interim executive and advisor to startups in fintech, blockchain and AI.
  He has sat with boards and audit committees while a new system went live, and he has seen which ones slept.
AI3. "Ways to bring this into the room": keep the general two-item structure. Keynote item: "Keynote: Fear Is Not A Control or The Decision Switch. 45 to 60 minutes, built for health systems, professional services firms or an association audience, with one first move the room takes home." Board item unchanged. The closing line's "discovery call" becomes a link to site.calendly, and add a `.btn` "Book a discovery call" under it.
AI4. Rebuild the four-box slide per A6. FAQ wider per G4.

## ASSOCIATIONS (src/pages/industries/industry-associations.astro)

AS1. Trim hero whitespace (G5) and let the image sit level with the headline.
AS2. "The keynote" section becomes "The keynotes" with two cards: the existing Fear Is Not A Control card, plus:
  The Decision Switch. The original keynote. Seven principles that turn a stalled decision into one the team will stand behind. Built for leadership summits and association conferences. 45 to 60 minutes. Link: /keynote-speaker/executive-decision-making-keynote#the-decision-switch
AS3. "Why associations book Jack": add as the FIRST bullet: "Members leave with what they need to know about technology change, the questions they did not know to ask, and material they enjoy learning. Proven content, built for a conference audience that is living through change and uncertainty." Make the section a split with /images/jack-p-flaherty-interview.jpg on the right (alt "Jack P. Flaherty in conversation at an interview table").
AS4. "What attendees say": apply G7 (three different attributions, Shola's quote moved out of this block or re-captioned as a fellow speaker and kept only if the block is retitled "What audiences and fellow speakers say").
AS5. FAQ wider per G4.

## BOARD AND EXECUTIVE ADVISORY (src/pages/keynote-speaker/board-advisor-ai-governance.astro)

B1. Replace the pull quote with: "Technology changes in ripples, every day, in every tool your people use. The question is whether anyone in your organization is watching, and ready to act on the opportunities those ripples create." Caption stays Jack P. Flaherty. Make the quote and the paragraph section wider (max-width 58rem) and break the paragraph under it into three short paragraphs at the sentence boundaries "...digital-asset companies." / "...responsible for overseeing." / "Which decisions."
B2. "The gap" section: put the three example cards UNDERNEATH the text as a `.grid.c3`, not beside it. Tighten the text into four short paragraphs and add a sub-heading above the cards: "What it looks like in the room".

## BOOK JACK (src/pages/book-jack.astro)

BJ1. Trim top whitespace (intro section padding-top 2rem).
BJ2. First paragraph: remove "a nursing conference," so it reads "Planning a leadership summit, a partner meeting or a board session? ..."
BJ3. "This form is for" bullets: "Keynote inquiries, 45 to 60 minutes" (drop the Fear Is Not A Control restatement).

## HEALTH SYSTEMS (src/pages/industries/healthcare-providers.astro)

H1. FAQ wider per G4. Also add The Decision Switch as a second keynote card in "The keynote" (retitle "The keynotes"), same card copy as AS2 but "Built for leadership summits, nursing conferences and health-system association events."

## MEDIA (src/pages/press-media.astro)

M1. Press photos: thumbnails are cropping Jack's head. Show each at its own aspect ratio (object-fit: contain on a latte background, fixed height 220px) so nothing is cut off.
M2. Second row of quotes: apply G7.

## PROFESSIONAL SERVICES (src/pages/industries/professional-services-accounting-consulting.astro)

PS1. Reduce whitespace (G5) and replace the intro paragraph under the position line with:
  Firms are not short of new technology. They are short of a way to decide what to use, how to use it, and how to keep partners and staff curious instead of defensive. Technology is not the only answer, but used well it serves clients better and frees people for the work that matters. Jack P. Flaherty spent 15 years at the Big Four, where he served as a director, and 25 years in risk and advisory. His keynote gives partners and practice leaders one method for the decision in front of them, and a reason to be enthusiastic about how their role evolves rather than afraid of it.
PS2. "The keynote" becomes "The keynotes" with a second card for The Decision Switch (copy as AS2, "Built for partner meetings, firm retreats and professional association events.").
PS3. Fourth bullet of "Why firms book Jack" becomes: "Delivered keynotes and roundtables at local, regional and national corporate events and industry associations, including more than ten CXO roundtables at the PwC Healthcare Risk Conference."
PS4. FAQ wider per G4.

## THE BOOK (src/pages/books/the-decision-switch.astro)

TB1. Under the Amazon button remove the line "Paperback and Kindle. Opens Amazon in a new tab." Button only.

## KEYNOTE HUB, The Decision Switch section (src/pages/keynote-speaker/executive-decision-making-keynote.astro)

DS1. "Built for" and "Format" cards: bullets, not block text.
  Built for: Executive teams · Leadership offsites · Association conferences · Any room that owns decisions and is tired of carrying them
  Format: 45 to 60 minutes · Live or virtual · Built for the room after a discovery call
DS2. Assessment block per G3 (that is the "straightforward headline" Jack asked for).

## TOOLKIT (src/pages/decision-making-toolkit.astro)

T1. Hero copy, replace the two short lines under the H1 with:
  Lede: Drowning in data? Do decisions still feel like a guess? You do not need more information. You need a cleaner process.
  Then a short block:
  What it is: a three-minute assessment of how your organization makes decisions with technology, built from the framework in The Decision Switch.
  Why it exists: most leaders do not have a decision problem. They have a structure problem, and it shows up at the moment it costs the most.
  What you get: your Clear Confidence Score from 0 to 100, the decision-making tier you are in, your single biggest gap named, and a personalized report sent to your inbox.
  Button: Take the assessment (site.assessment)
T2. Second section (photo and "Most leaders do not have a decision problem"): image level with the headline (split.top), less whitespace.
T3. Third section (Take the Clear Confidence Assessment): reduce whitespace; it may merge into T2 if it now duplicates the hero block (keep one Take-the-assessment button per page below the hero).
T4. "When decisions matter most" dark section: add a subtitle in sienna (`.kicker` style, colour #E3A990 on dark) directly under the H2: "When nobody saw it coming. When the information is incomplete. When the long-term impact is unclear. When the drivers underneath are not understood and the call gets made blind." Swap "method" for "framework" in the paragraph ("They need a framework they can run themselves."). Fix the line break and alignment so the paragraph, the button and the closing line sit in one left-aligned column with the same max-width.
T5. Remove every "™" (G6).

## REPORT BACK
List every file changed, any instruction you could not follow (quote it), and run the build plus screenshots of: /, /about-jack-flaherty, /industries/ai-emerging-technology, /industries/industry-associations, /keynote-speaker/board-advisor-ai-governance, /decision-making-toolkit, /press-media at desktop and phone.
