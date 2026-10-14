# jackpflaherty.com

Static site built with Astro, hosted on Cloudflare Pages.

- Build command: `npm run build`
- Output directory: `dist`
- Node version: 22
- Environment variable (Pages → Settings → Variables): `MAKE_WEBHOOK_URL` = the Make webhook that receives Book Jack inquiries and newsletter sign-ups (JSON POST). Without it the forms still redirect to the thank-you page; nothing is recorded.
- Redirects for retired URLs: `public/_redirects`.
- Images: `public/images/` (web-ready, renamed per the A4 image rule).
- Copy rules: no em dashes, no semicolons, one H1 per page, reply time "within one business day", no fees. Every fact comes from the Facts Ledger.

Local preview: `npm install && npm run dev`.
