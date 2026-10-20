import site from '../data/site.json';
const paths = ['/', '/about-jack-flaherty', '/keynote-speaker/executive-decision-making-keynote', '/keynote-speaker/fear-is-not-a-control', '/keynote-speaker/the-decision-switch', '/keynote-speaker/fear-is-not-a-control-healthcare', '/keynote-speaker/fear-is-not-a-control-professional-services', '/keynote-speaker/board-advisor-ai-governance', '/industries/healthcare-providers', '/industries/professional-services-accounting-consulting', '/industries/industry-associations', '/industries/ai-emerging-technology', '/decision-making-toolkit', '/insights', '/press-media', '/books/the-decision-switch', '/book-jack', '/kit', '/privacy', '/blogs/the-ai-atrophy', '/blogs/2-am-anxiety-test', '/blogs/lost-role-of-trusted-advisors', '/blogs/the-integration-era', '/blogs/fear-is-not-a-control', '/blogs/treat-new-technology-like-a-new-hire', '/blogs/the-tool-that-showed-up-on-the-unit', '/blogs/go-slow-to-go-fast'];
export function GET() {
  const today = new Date().toISOString().slice(0, 10);
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    paths.map(p => `  <url><loc>${site.url}${p === '/' ? '/' : p}</loc><lastmod>${today}</lastmod></url>`).join('\n') + `\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
