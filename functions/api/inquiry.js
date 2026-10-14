// Cloudflare Pages Function: receives the Book Jack inquiry form and the newsletter form,
// forwards the fields to a Make webhook (MAKE_WEBHOOK_URL env var), then redirects to the thank-you page.
export async function onRequestPost({ request, env }) {
  const form = await request.formData();
  const data = Object.fromEntries(form.entries());
  if (data.website) return Response.redirect(new URL('/thank-you-jack-flaherty', request.url), 303); // honeypot
  data.received_at = new Date().toISOString();
  data.user_agent = request.headers.get('user-agent') || '';
  data.ip_country = request.headers.get('cf-ipcountry') || '';
  if (env.MAKE_WEBHOOK_URL) {
    try {
      await fetch(env.MAKE_WEBHOOK_URL, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) });
    } catch (e) { /* never block the visitor on a webhook failure */ }
  }
  const dest = data.source === 'newsletter' ? '/thank-you-jack-flaherty?from=newsletter' : '/thank-you-jack-flaherty';
  return Response.redirect(new URL(dest, request.url), 303);
}
export async function onRequestGet({ request }) {
  return Response.redirect(new URL('/book-jack', request.url), 302);
}
