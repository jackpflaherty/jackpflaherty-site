// Cloudflare Worker in front of the static site.
// Handles the two forms at /api/inquiry; everything else is served from the built assets.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/inquiry') {
      if (request.method === 'POST') return handleInquiry(request, env);
      return Response.redirect(new URL('/book-jack', request.url), 302);
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
