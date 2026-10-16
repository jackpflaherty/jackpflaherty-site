# clearconfidenceassessment (Cloudflare Worker)

Read-only copy of the scoring Worker that the Clear Confidence Assessment quiz posts to
(`https://clearconfidenceassessment.jack-b35.workers.dev`). Captured 2026-10-16 from the
Cloudflare dashboard editor (version 2380b7ab, active). The dashboard is the deployment of
record; this copy exists so the source is in version control. It is not built or deployed
from this repo.

Bindings (set in the dashboard, never in code):
- `MAKE_WEBHOOK_URL` secret: Make hook 2348496 URL
- `WEBHOOK_SECRET` secret: sent as the `x-make-apikey` header
- `TURNSTILE_SECRET` secret: Turnstile widget secret (site key 0x4AAAAAAESHFIDNn9lw6Jm1)
- `RATE` KV namespace: hourly rate-limit counters (5 per IP, 100 global)

Behaviour that the site rebuild depends on:
- Accepts POST only, from Origin `https://assessment.jackpflaherty.com` (hard-coded `ALLOWED_ORIGIN`).
- Scores 15 answers (option index 0 to 3) with the `POINTS` table; dimension maxima 33/36/36; display score = round(total/105*100); tiers at 80/60/35; `scoring_version` 2.
- Returns `{ok, submission_id, d1_score, d2_score, d3_score, total_score, display_score, tier, tier_rank, tier_label, lowest_dimension, lowest_dimension_name, lowest_framework, scoring_version}`.
