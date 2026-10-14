// Generates responsive WebP variants of every photo in public/images into public/images/r/
// and writes src/data/images.json (original width/height and the widths produced).
// Runs before `astro build` (see package.json). Output is not committed.
import sharp from 'sharp';
import { readdir, mkdir, stat, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'public/images';
const OUT = 'public/images/r';
const WIDTHS = [480, 800, 1200, 1600, 2400];
const SKIP = /favicon|signature-logo|teaching-cutout/;

await mkdir(OUT, { recursive: true });
const manifest = {};
const files = (await readdir(SRC)).filter(f => /\.(jpe?g|png)$/i.test(f) && !SKIP.test(f));

for (const f of files) {
  const src = path.join(SRC, f);
  const base = f.replace(/\.(jpe?g|png)$/i, '');
  const meta = await sharp(src).metadata();
  const widths = WIDTHS.filter(w => w < meta.width);
  if (!widths.length || widths[widths.length - 1] !== meta.width) widths.push(meta.width);
  manifest[f] = { w: meta.width, h: meta.height, widths };
  for (const w of widths) {
    const out = path.join(OUT, `${base}-${w}.webp`);
    try { const s = await stat(out); const o = await stat(src); if (s.mtimeMs > o.mtimeMs) continue; } catch {}
    await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: w >= 1600 ? 72 : 76, effort: 5 }).toFile(out);
  }
}

const dest = 'src/data/images.json';
const next = JSON.stringify(manifest, null, 1);
let prev = ''; try { prev = await readFile(dest, 'utf8'); } catch {}
if (prev !== next) await writeFile(dest, next);
console.log(`images: ${files.length} sources, variants in ${OUT}`);
