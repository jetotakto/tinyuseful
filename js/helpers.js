/* TinyUseful — shared client-side helpers
   Loaded by all tool pages via <script src="/js/helpers.js" defer>.
   Phase 50: locale-aware number parsing (accept decimal comma + thousand spaces). */

// Parse locale-aware number string. Accepts both decimal dot and decimal comma.
// Strips ASCII spaces and non-breaking spaces (CZ/EU thousand separator).
// Returns NaN for empty/invalid input — matches native Number() behavior so existing
// calculator math (Math.max, Math.floor, *0, /n) keeps working unchanged.
function parseLocaleNumber(raw) {
  if (raw === null || raw === undefined) return NaN;
  const cleaned = String(raw).trim().replace(/[\s ]+/g, '').replace(',', '.');
  if (!cleaned) return NaN;
  return Number(cleaned);
}
