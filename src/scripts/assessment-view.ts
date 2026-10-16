// Shared by the results and report pages: reads the URL, fills the score grid,
// shows the matching tier block. URL parameters only; nothing is stored.
import a from '../data/assessment.json';

export type View = {
  score: string; tier: string; name: string; first: string; email: string;
  d: Record<string, number | null>; low: string; role: string; org: string; industry: string; summary: string; sid: string;
};

const dims = a.dims as Record<string, { name: string; max: number }>;
const tiers = a.tiers as Record<string, { rank: number; label: string; line: string }>;

export function read(): View {
  const u = new URLSearchParams(location.search);
  const g = (k: string) => (u.get(k) || '').trim();
  const num = (k: string) => { const n = parseInt(g(k), 10); return Number.isFinite(n) ? n : null; };
  const name = g('name');
  const first = name.split(/\s+/)[0] || '';
  const score = g('score') || '--';
  let tier = g('tier').toLowerCase();
  if (!tiers[tier]) {
    const s = parseInt(score, 10);
    tier = !Number.isFinite(s) ? '' : s >= 80 ? 'architect' : s >= 60 ? 'builder' : s >= 35 ? 'monitor' : 'catalyst';
  }
  const d = { d1: num('d1'), d2: num('d2'), d3: num('d3') };
  let low = g('low').toLowerCase();
  if (!dims[low]) {
    const ranked = Object.keys(dims).filter(k => d[k as 'd1'] !== null).sort((x, y) => (d[x as 'd1']! / dims[x].max) - (d[y as 'd1']! / dims[y].max));
    low = ranked[0] || '';
  }
  return { score, tier, name, first, email: g('email'), d, low, role: g('role'), org: g('org'), industry: g('industry'), summary: g('summary'), sid: g('sid') };
}

export function render(v: View) {
  const q = (s: string) => document.querySelector<HTMLElement>(s);
  for (const k of Object.keys(dims)) {
    const val = v.d[k]; const max = dims[k].max;
    const pct = val === null ? null : Math.round(val / max * 100);
    const p = q(`[data-pct="${k}"]`); if (p) p.textContent = pct === null ? '--' : String(pct);
    const r = q(`[data-raw="${k}"]`); if (r) r.textContent = val === null ? '--' : String(val);
    const b = q(`[data-bar="${k}"]`); if (b && pct !== null) b.style.width = pct + '%';
    const g = q(`[data-gap="${k}"]`); if (g) g.hidden = k !== v.low;
    const card = q(`#dim-${k}`); if (card) card.classList.toggle('gap-on', k === v.low);
  }
  document.querySelectorAll<HTMLElement>('.tier').forEach(t => { t.hidden = t.id !== 'tier-' + v.tier; });
  document.querySelectorAll<HTMLElement>('[data-score]').forEach(e => { e.textContent = v.score; });
  document.querySelectorAll<HTMLElement>('[data-first]').forEach(e => { e.textContent = v.first; });
  document.querySelectorAll<HTMLElement>('[data-name]').forEach(e => { e.textContent = v.name || 'Your name'; });
  document.querySelectorAll<HTMLElement>('[data-email]').forEach(e => { e.textContent = v.email; });
  const t = tiers[v.tier];
  document.querySelectorAll<HTMLElement>('[data-tier-label]').forEach(e => { e.textContent = t ? t.label : ''; });
  const ctx = [v.role, v.org, v.industry].filter(Boolean).join(' · ');
  document.querySelectorAll<HTMLElement>('[data-ctx]').forEach(e => { e.textContent = ctx; e.hidden = !ctx; });
}
