// Script de construction du fichier de données optimisé
// Sources :
//   - Contours simplifiés : francoisburdy/zones-abc-pinel-map (MIT)
//   - Données zonage     : data.gouv.fr / arrêté 5 sept. 2025 (open data officiel)
// Résultat : un seul fichier TopoJSON fusionné, hébergé sur votre propre GitHub
// Exécution : node build-data.mjs

import { topology } from 'topojson-server';
import fs from 'fs';

const GEOJSON_URL =
  'https://raw.githubusercontent.com/francoisburdy/zones-abc-pinel-map/main/data/communes-simplified-geojson.json';

const CSV_URL =
  'https://www.data.gouv.fr/api/1/datasets/r/13f7282b-8a25-43ab-9713-8bb4e476df55';

// ── 1. Téléchargement CSV officiel 2025 ───────────────────────
console.log('📥 Téléchargement du CSV zonage 2025 (data.gouv.fr)...');
const csvRes  = await fetch(CSV_URL);
const csvText = await csvRes.text();

const lines   = csvText.split('\n').filter(l => l.trim());
const sep     = lines[0].includes(';') ? ';' : ',';
const headers = lines[0].split(sep).map(h => h.trim().replace(/^"|"$/g, ''));
console.log('  Colonnes :', headers.join(' | '));

const zoneData = {};
for (let i = 1; i < lines.length; i++) {
  const cols = lines[i].split(sep).map(c => c.trim().replace(/^"|"$/g, ''));
  if (cols.length < 3) continue;

  const idxCode = headers.findIndex(h => h === 'CODGEO');
  const idxZone = headers.findIndex(h => h.startsWith('Zonage'));
  const idxDep  = headers.findIndex(h => h === 'DEP');
  const idxRecl = headers.findIndex(h => h.startsWith('Reclassement'));

  const code = (cols[idxCode] || cols[0] || '').trim();
  const zone = (cols[idxZone] || cols[3] || '').trim();
  const dep  = (cols[idxDep]  || cols[1] || '').trim();
  const recl = (cols[idxRecl] || cols[4] || '').trim();

  if (code && zone) {
    zoneData[code] = {
      z: zone,
      d: dep,
      r: recl === 'Oui' ? 1 : 0,
    };
  }
}
console.log(`  ✅ ${Object.keys(zoneData).length} communes chargées`);

// ── 2. Téléchargement GeoJSON simplifié ───────────────────────
console.log('📥 Téléchargement du GeoJSON simplifié (~56 Mo)...');
const geoRes  = await fetch(GEOJSON_URL);
const geojson = await geoRes.json();
console.log(`  ✅ ${geojson.features.length} features`);

// ── 3. Fusion + réduction des propriétés ──────────────────────
console.log('🔀 Fusion...');
let matched = 0;
for (const f of geojson.features) {
  // Le GeoJSON source (OpenDataSoft) utilise "com_code" et "com_name"
  const code = String(f.properties.com_code || f.properties.com_current_code || '');
  const name = f.properties.com_name || '';
  const zd   = zoneData[code] || {};

  // On ne garde que le strict nécessaire (réduit la taille)
  f.properties = {
    c: code,
    n: name,
    z: zd.z || '',
    d: zd.d || code.slice(0, 2),
    r: zd.r || 0,
  };

  if (zd.z) matched++;
}
console.log(`  ✅ ${matched} / ${geojson.features.length} communes avec zone 2025`);

// ── 4. Conversion TopoJSON (quantization = précision réduite) ─
console.log('🗜  Conversion TopoJSON...');
const topo = topology({ communes: geojson }, 1e5); // quantization 1e5

const outPath = './communes-2025.topo.json';
fs.writeFileSync(outPath, JSON.stringify(topo));

const sizeMB = (fs.statSync(outPath).size / 1024 / 1024).toFixed(1);
console.log(`\n✅ Fichier généré : ${outPath} (${sizeMB} Mo)`);
