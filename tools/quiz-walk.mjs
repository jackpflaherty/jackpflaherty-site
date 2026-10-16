// Walk the built quiz page: context, Q1, Q6 (banner), gate. Screenshots to assets/proofs.
import { chromium } from 'playwright';
import http from 'http'; import fs from 'fs'; import path from 'path';
const root = '/home/claude/site/dist';
const srv = http.createServer((req, res) => { let p = decodeURIComponent(req.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html'; let f = path.join(root, p); if ((!fs.existsSync(f) || fs.statSync(f).isDirectory()) && fs.existsSync(f + '.html')) f += '.html'; if (!fs.existsSync(f)) { res.writeHead(404); return res.end(); } const ext = path.extname(f); const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.jpg': 'image/jpeg', '.png': 'image/png' }; res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res); }).listen(4321);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' });
const out = '/home/claude/assets/proofs/';
for (const [w, h, tag] of [[1440, 900, 'd'], [390, 844, 'm']]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } }); const page = await ctx.newPage();
  await page.route('**/challenges.cloudflare.com/**', r => r.abort());
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  await page.goto('http://localhost:4321/assessment/start', { waitUntil: 'load' });
  await page.selectOption('#cca-cq1', 'CRO / Risk'); await page.selectOption('#cca-cq2', '$250M-$1B'); await page.selectOption('#cca-cq3', 'Healthcare');
  await page.click('#cca-start-btn'); await page.waitForTimeout(400);
  await page.screenshot({ path: out + 'assessment_q1-' + tag + '.png', fullPage: true });
  for (let q = 1; q <= 5; q++) { await page.click(`#cca-qs${q} .opt[data-idx="1"]`); await page.waitForTimeout(350); }
  await page.screenshot({ path: out + 'assessment_q6-' + tag + '.png', fullPage: true });
  for (let q = 6; q <= 15; q++) { await page.click(`#cca-qs${q} .opt[data-idx="2"]`); await page.waitForTimeout(350); }
  await page.screenshot({ path: out + 'assessment_gate-' + tag + '.png', fullPage: true });
  const on = await page.$eval('#cca .cs.on', e => e.id);
  const dl = await page.evaluate(() => window.dataLayer.filter(x => x.event && x.event.startsWith('assessment') || (x.event || '').startsWith('question')).length);
  console.log(tag, 'screen:', on, 'dataLayer events:', dl, 'errors:', errors);
  await ctx.close();
}
await b.close(); srv.close();
