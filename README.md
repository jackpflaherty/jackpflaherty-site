# jackpflaherty.com

Static site built with Astro, hosted on Cloudflare Workers (static assets plus one small Worker for the forms). Config in `wrangler.jsonc`.

- Build command: `npm run build`
- Output directory: `dist`
- Node version: 22
- Environment variable (Workers & Pages → jackpflaherty-site → Settings → Variables and Secrets): `MAKE_WEBHOOK_URL` = the Make webhook that receives Book Jack inquiries and newsletter sign-ups (JSON POST). Without it the forms still redirect to the thank-you page; nothing is recorded.
- Redirects for retired URLs: `public/_redirects`. Redirects live here only; no Redirect Rules in the Cloudflare dashboard, because a zone rule runs before the Worker and silently overrides this file.
- Hostnames (`routes` in `wrangler.jsonc`): the apex is the Worker's custom domain and 301s to www in `worker/index.js`; www is a proxied CNAME to the apex, served through the `www.jackpflaherty.com/*` route; assessment is a custom domain. The assessment host serves the four built `/assessment/*` pages at their legacy paths and sends every other path to www. The scoring Worker the quiz posts to is separate (`worker-assessment/`, deployed from the dashboard).
- After any deploy that changes `sitemap.xml` or `_redirects`, check the live file with a cache-busting query (`/sitemap.xml?v=1`): the zone has served a stale cached copy before. Purge the URL in the dashboard if the plain URL lags.
- Images: `public/images/` (web-ready, renamed per the A4 image rule).
- Copy rules: no em dashes, no semicolons, one H1 per page, reply time "within one business day", no fees. Every fact comes from the Facts Ledger.

Local preview: `npm install && npm run dev`.
