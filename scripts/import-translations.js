/**
 * scripts/import-translations.js
 *
 * Reads data/ui_translations.csv and writes dictionaries/th.json.
 *
 * Usage:
 *   npm run import-translations
 *
 * CSV format (headers: UI_Key, English_Text, Thai_Translation_Here):
 *   nav.services,Services,บริการ
 *   about.bullet1,State-of-the-art medical facilities,สถานพยาบาลที่ทันสมัย
 *
 * Rules:
 *   - Dot-notation keys are split into nested JSON (e.g. "about.bullet1" → { about: { bullet1: "..." } })
 *   - Only rows where Thai_Translation_Here is non-empty are written; missing Thai values remain ""
 *   - papaparse handles RFC 4180 quoted strings — commas inside quoted fields are safe
 *   - The script is idempotent: run it as many times as needed as translations are filled in
 */

const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

// ── Paths ────────────────────────────────────────────────────────────────────

const CSV_PATH = path.resolve(__dirname, '../../data/ui_translations.csv');
const OUT_PATH = path.resolve(__dirname, '../dictionaries/th.json');
const EN_PATH  = path.resolve(__dirname, '../dictionaries/en.json');

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * setNested — writes a value at a dot-notation path into an existing object.
 * e.g. setNested(obj, "about.bullet1", "value") → obj.about.bullet1 = "value"
 */
function setNested(obj, dotKey, value) {
  const keys = dotKey.split('.');
  let cursor = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    if (typeof cursor[k] !== 'object' || cursor[k] === null) {
      cursor[k] = {};
    }
    cursor = cursor[k];
  }
  cursor[keys[keys.length - 1]] = value;
}

// ── Main ──────────────────────────────────────────────────────────────────────

function main() {
  // 1. Verify files exist
  if (!fs.existsSync(CSV_PATH)) {
    console.error(`[import-translations] ERROR: CSV not found at ${CSV_PATH}`);
    process.exit(1);
  }
  if (!fs.existsSync(EN_PATH)) {
    console.error(`[import-translations] ERROR: en.json not found at ${EN_PATH}`);
    process.exit(1);
  }

  // 2. Read and parse CSV
  const csvContent = fs.readFileSync(CSV_PATH, 'utf-8');
  const { data, errors } = Papa.parse(csvContent, {
    header: true,
    skipEmptyLines: true,
  });

  if (errors.length > 0) {
    console.warn('[import-translations] CSV parse warnings:');
    errors.forEach(e => console.warn(`  Row ${e.row}: ${e.message}`));
  }

  // 3. Load the English dictionary as the structural skeleton
  //    We start from en.json and overwrite values where Thai is provided.
  //    This ensures th.json always has the same keys as en.json (just empty where untranslated).
  const enDict = JSON.parse(fs.readFileSync(EN_PATH, 'utf-8'));

  // Build a flat map of key → "" from en.json so th.json has all keys
  const flatEn = {};
  function flatten(obj, prefix) {
    for (const [k, v] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${k}` : k;
      if (typeof v === 'object' && v !== null) {
        flatten(v, fullKey);
      } else {
        flatEn[fullKey] = '';
      }
    }
  }
  flatten(enDict, '');

  // 4. Identify column headers (papaparse uses first row as keys)
  const firstRow = data[0] || {};
  const keyCol = 'UI_Key';
  const thCol  = 'Thai_Translation_Here';

  if (!firstRow.hasOwnProperty(keyCol) || !firstRow.hasOwnProperty(thCol)) {
    console.error(
      `[import-translations] ERROR: Expected columns "${keyCol}" and "${thCol}". Found: ${Object.keys(firstRow).join(', ')}`
    );
    process.exit(1);
  }

  // 5. Apply Thai translations onto the flat skeleton
  let populated = 0;
  let empty = 0;

  for (const row of data) {
    const dotKey = (row[keyCol] || '').trim();
    const thValue = (row[thCol] || '').trim();

    if (!dotKey) continue;

    if (thValue) {
      flatEn[dotKey] = thValue;
      populated++;
    } else {
      empty++;
    }
  }

  // 6. Reconstruct nested JSON from flat map
  const thDict = {};
  for (const [dotKey, value] of Object.entries(flatEn)) {
    setNested(thDict, dotKey, value);
  }

  // 7. Write th.json
  fs.writeFileSync(OUT_PATH, JSON.stringify(thDict, null, 2) + '\n', 'utf-8');

  // 8. Summary
  const total = populated + empty;
  const pct = total > 0 ? Math.round((populated / total) * 100) : 0;
  console.log('');
  console.log('✅ [import-translations] th.json updated successfully.');
  console.log(`   Total keys : ${total}`);
  console.log(`   Translated : ${populated} (${pct}%)`);
  console.log(`   Empty      : ${empty} — awaiting Thai translation`);
  console.log(`   Output     : ${OUT_PATH}`);
  console.log('');
}

main();
