// Cloudflare Worker in front of the static site.
// Handles the two forms at /api/inquiry; everything else is served from the built assets.
// The Clear Confidence Assessment lives on its own hostname. Legacy paths (from emailed
// report links and the site's buttons) map onto the /assessment/* pages in the build.
const ASSESS_HOST = 'assessment.jackpflaherty.com';
const ASSESS_PATHS = {
  '/': '/assessment',
  '/start-clarity-confidence-assessment': '/assessment/start',
  '/results-clarity-confidence-assessment': '/assessment/results',
  '/report-clarity-confidence-assessment': '/assessment/report',
};
const ASSESS_BACK = Object.fromEntries(Object.entries(ASSESS_PATHS).map(([legacy, built]) => [built, legacy]));

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === 'jackpflaherty.com') { // apex to www, permanent
      url.hostname = 'www.jackpflaherty.com';
      return Response.redirect(url.toString(), 301);
    }
    if (url.pathname === '/api/inquiry') {
      if (request.method === 'POST') return handleInquiry(request, env);
      return Response.redirect(new URL('/book-jack', request.url), 302);
    }
    const path = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, '') : '/';
    if (url.hostname === ASSESS_HOST) {
      if (ASSESS_PATHS[path]) { // serve the built page at the legacy URL, query string intact
        url.pathname = ASSESS_PATHS[path];
        return env.ASSETS.fetch(new Request(url.toString(), request));
      }
      if (/^\/(_astro|images|fonts)\//.test(path) || path === '/favicon.ico') return env.ASSETS.fetch(request);
      url.hostname = 'www.jackpflaherty.com'; // nav, footer and anything else belong to the main site
      return Response.redirect(url.toString(), 301);
    }
    if (url.hostname === 'www.jackpflaherty.com' && ASSESS_BACK[path]) { // /assessment/* on www points at the assessment host (preview hosts keep serving the built pages)
      url.hostname = ASSESS_HOST; url.pathname = ASSESS_BACK[path];
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  }
};

async function handleInquiry(request, env) {
  const form = await request.formData();
  const data = Object.fromEntries(form.entries());
  if (data.website) return Response.redirect(new URL('/thank-you-jack-flaherty', request.url), 303); // honeypot
  data.form = data.source === 'newsletter' ? 'newsletter' : 'inquiry';
  data.inquiry_id = crypto.randomUUID();
  data.received_at = new Date().toISOString();
  data.user_agent = request.headers.get('user-agent') || '';
  data.ip_country = request.headers.get('cf-ipcountry') || '';
  let intake = 'unconfigured';
  if (env.MAKE_WEBHOOK_URL) {
    try {
      const r = await fetch(env.MAKE_WEBHOOK_URL, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) });
      intake = r.ok ? 'sent' : 'failed:' + r.status;
    } catch (e) { intake = 'error'; /* never block the visitor on a webhook failure */ }
  }
  const dest = new URL(data.source === 'newsletter' ? '/thank-you-jack-flaherty?from=newsletter' : '/thank-you-jack-flaherty', request.url);
  if (request.headers.get('x-qa') === '1') dest.searchParams.set('intake', intake); // QA only: never shown to visitors
  return Response.redirect(dest, 303);
}
