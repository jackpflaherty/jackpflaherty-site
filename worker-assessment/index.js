/**
 * Clear Confidence Assessment — submission proxy
 *
 * Browser sends raw option indices. This Worker scores them, attaches the
 * shared secret, and forwards server-to-server to Make. The Make webhook URL
 * and the secret never reach the browser.
 *
 * Bindings required:
 *   env.MAKE_WEBHOOK_URL   secret   full hook.us2.make.com URL
 *   env.TURNSTILE_SECRET   secret   from Turnstile dashboard
 *   env.RATE               KV       rate-limit counters
 */

const ALLOWED_ORIGIN     = "https://assessment.jackpflaherty.com";
const HOURLY_CAP_PER_IP  = 5;
const HOURLY_CAP_GLOBAL  = 100;
const SCORING_VERSION    = 2;

/* ── SCORING TABLES ─────────────────────────────────────────────────
   Option point values are NOT in ascending order. The browser sends the
   selected index (0–3); values are resolved here and only here.        */

const POINTS = {
   1: { dim: "d1", pts: [4, 0, 6, 2] },
   2: { dim: "d1", pts: [2, 6, 0, 4] },
   3: { dim: "d1", pts: [3, 6, 0, 9] },
   4: { dim: "d1", pts: [2, 0, 4, 6] },
   5: { dim: "d1", pts: [6, 0, 4, 2] },
   6: { dim: "d2", pts: [6, 0, 9, 3] },
   7: { dim: "d2", pts: [4, 6, 0, 2] },
   8: { dim: "d2", pts: [2, 6, 0, 4] },
   9: { dim: "d2", pts: [3, 9, 0, 6] },
  10: { dim: "d2", pts: [2, 0, 6, 4] },
  11: { dim: "d3", pts: [6, 9, 0, 3] },
  12: { dim: "d3", pts: [2, 0, 6, 4] },
  13: { dim: "d3", pts: [2, 6, 0, 4] },
  14: { dim: "d3", pts: [6, 0, 4, 2] },
  15: { dim: "d3", pts: [3, 6, 0, 9] },
};

const DIM_MAX   = { d1: 33, d2: 36, d3: 36 };          // total 105
const DIM_NAME  = { d1: "Decision Architecture", d2: "Signal Intelligence", d3: "Organizational Clarity" };
const DIM_FW    = { d1: "The Decision Switch",   d2: "Spot the Ripple",     d3: "Clear Confidence" };

/* Corrected ladder. `key` values are unchanged so existing Make mappings,
   Airtable records, and results-page routing keep working. `rank` is the
   new canonical ordering field — prefer it over `key` in any new logic. */
const TIERS = [
  { min: 80, rank: 1, key: "architect", label: "Built For Success" },
  { min: 60, rank: 2, key: "builder",   label: "First Responder"   },
  { min: 35, rank: 3, key: "monitor",   label: "Spread Too Thin"   },
  { min:  0, rank: 4, key: "catalyst",  label: "Constant Firedrill" },
];

function score(choices) {
  const D = { d1: 0, d2: 0, d3: 0 };
  let raw = 0;

  for (let q = 1; q <= 15; q++) {
    const idx = choices[q] ?? choices[String(q)];
    if (!Number.isInteger(idx) || idx < 0 || idx > 3) {
      throw new Error(`Invalid answer for question ${q}`);
    }
    const { dim, pts } = POINTS[q];
    raw    += pts[idx];
    D[dim] += pts[idx];
  }

  const disp = Math.round((raw / 105) * 100);
  const band = TIERS.find((t) => disp >= t.min);

  const pct = {
    d1: D.d1 / DIM_MAX.d1,
    d2: D.d2 / DIM_MAX.d2,
    d3: D.d3 / DIM_MAX.d3,
  };

  // Tie-breaking preserved exactly as in the original ccaCalc.
  let low = "d1";
  if      (pct.d2 <  pct.d1 && pct.d2 <= pct.d3) low = "d2";
  else if (pct.d3 <  pct.d1 && pct.d3 <= pct.d2) low = "d3";

  return {
    d1_score: D.d1,
    d2_score: D.d2,
    d3_score: D.d3,
    total_score: raw,
    display_score: disp,
    tier: band.key,
    tier_rank: band.rank,
    tier_label: band.label,
    lowest_dimension: low,
    lowest_dimension_name: DIM_NAME[low],
    lowest_framework: DIM_FW[low],
    scoring_version: SCORING_VERSION,
  };
}

/* ── HTTP PLUMBING ──────────────────────────────────────────────── */

const cors = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });

const clean = (v, n) => String(v ?? "").trim().slice(0, n);

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST")    return json({ error: "Method not allowed" }, 405);
    if (request.headers.get("Origin") !== ALLOWED_ORIGIN)
      return json({ error: "Forbidden" }, 403);

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Malformed request" }, 400);
    }

    /* 1 — bot check */
    const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
    let verify;
    try {
      verify = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            secret: env.TURNSTILE_SECRET,
            response: body.turnstile_token,
            remoteip: ip,
          }),
        }
      ).then((r) => r.json());
    } catch {
      return json({ error: "Verification unavailable" }, 503);
    }
    if (!verify?.success) return json({ error: "Verification failed" }, 403);

    /* 2 — rate limit */
    const hour = new Date().toISOString().slice(0, 13);
    const overCap = async (key, cap) => {
      const n = parseInt((await env.RATE.get(key)) ?? "0", 10);
      if (n >= cap) return true;
      await env.RATE.put(key, String(n + 1), { expirationTtl: 7200 });
      return false;
    };
    if (await overCap(`ip:${ip}:${hour}`, HOURLY_CAP_PER_IP))
      return json({ error: "Too many submissions. Try again shortly." }, 429);
    if (await overCap(`global:${hour}`, HOURLY_CAP_GLOBAL))
      return json({ error: "Temporarily unavailable" }, 429);

    /* 3 — validate */
    const email = clean(body.email, 200).toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return json({ error: "Valid email required" }, 400);

    const first_name = clean(body.first_name, 100);
    if (!first_name) return json({ error: "First name required" }, 400);

    /* 4 — score */
    let scored;
    try {
      scored = score(body.choices ?? {});
    } catch (e) {
      return json({ error: "Incomplete submission" }, 400);
    }

    /* 5 — forward */
    const submission_id = crypto.randomUUID();
const payload = {
      submission_id,
      submitted_at: new Date().toISOString(),
      answers_json: JSON.stringify(body.choices),
      first_name,
      email,
      role:      clean(body.role, 100),
      org_size:  clean(body.org_size, 50),
      industry:  clean(body.industry, 100),
      ...scored,
    };

    let res;
    try {
      res = await fetch(env.MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-make-apikey": env.WEBHOOK_SECRET },
        body: JSON.stringify(payload),
      });
    } catch {
      return json({ error: "Submission failed. Please try again." }, 502);
    }
    if (!res.ok) return json({ error: "Submission failed. Please try again." }, 502);

    /* 6 — return scores for on-page display */
    return json({ ok: true, submission_id, ...scored });
  },
};
