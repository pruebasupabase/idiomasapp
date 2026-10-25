// Actualiza sw.js con la lista de archivos de la app y una versión nueva del caché.
// Corre solo en cada deploy a Vercel (ver vercel.json) o a mano con: node scripts/update-sw.mjs

import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const FOLDERS = ['css', 'js', 'fonts', 'vendor', 'icons'];
const FILES = ['index.html', 'manifest.webmanifest'];

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const assets = [
  './',
  ...FILES.map((f) => `./${f}`),
  ...FOLDERS.flatMap((folder) => walk(join(root, folder)))
    .map((full) => `./${relative(root, full).split(sep).join('/')}`)
    .filter((p) => !p.endsWith('.md') && !p.includes('LICENSE'))
    .sort(),
];

const hash = createHash('sha1');
for (const asset of assets) {
  if (asset === './') continue;
  hash.update(asset).update(readFileSync(join(root, asset)));
}
const version = hash.digest('hex').slice(0, 10);

const swPath = join(root, 'sw.js');
const source = readFileSync(swPath, 'utf8');
const block = `/* BUILD:START */\nconst CACHE = 'cuaderno-${version}';\nconst ASSETS = ${JSON.stringify(assets, null, 2)};\n/* BUILD:END */`;
const next = source.replace(/\/\* BUILD:START \*\/[\s\S]*?\/\* BUILD:END \*\//, block);

if (next === source) console.log('sw.js ya estaba al día.');
else {
  writeFileSync(swPath, next);
  console.log(`sw.js actualizado: ${assets.length} archivos, versión ${version}.`);
}
