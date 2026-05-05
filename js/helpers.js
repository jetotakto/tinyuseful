/* TinyUseful — shared client-side helpers
   Loaded by all tool pages via <script src="/js/helpers.js"> (synchronous, before inline calculator scripts).
   Phase 50: parseLocaleNumber() — locale-aware number parsing.
   Phase 52: setOut() + copyResultFromButton() — shared result rendering with copy button. */

/* Parse locale-aware number string. Accepts both decimal dot and decimal comma.
   Strips ASCII spaces and non-breaking spaces (CZ/EU thousand separator).
   Returns NaN for empty/invalid input — matches native Number() behavior so existing
   calculator math (Math.max, Math.floor, *0, /n) keeps working unchanged. */
window.parseLocaleNumber = function parseLocaleNumber(raw) {
  if (raw === null || raw === undefined) return NaN;
  const cleaned = String(raw).trim().replace(/[\s ]+/g, '').replace(',', '.');
  if (!cleaned) return NaN;
  return Number(cleaned);
};

/* Render a result block. Replaces local per-page setOut() definitions across 11 tools.
   Always appends a "Copy result" button so it survives every recalculation.
   Uses textContent (not innerHTML) to avoid any HTML injection risk.
   Falls back to innerHTML only when breakdown contains <strong> (percentage calc).
   Default state: if big is null/undefined/'', renders "—" placeholder. */
window.setOut = function setOut(id, label, big, breakdown) {
  const out = document.getElementById(id);
  if (!out) return;
  // Clear and rebuild
  out.textContent = '';
  if (label) {
    const labelEl = document.createElement('span');
    labelEl.className = 'label';
    labelEl.textContent = label;
    out.appendChild(labelEl);
  }
  const bigEl = document.createElement('span');
  bigEl.className = 'big';
  // Phase 51b: defensive guard. Per-calculator validity checks should catch invalid state first
  // and call setOut with '—'. This is the safety net for any case that slips through.
  let bigStr = (big === null || big === undefined || big === '') ? '—' : String(big);
  if (/\bNaN\b|^Invalid|undefined/i.test(bigStr)) bigStr = '—';
  bigEl.textContent = bigStr;
  out.appendChild(bigEl);
  if (breakdown) {
    const breakdownEl = document.createElement('span');
    breakdownEl.className = 'breakdown';
    // Allow <strong> markup in breakdown (developer-controlled strings only — never user input)
    if (typeof breakdown === 'string' && breakdown.includes('<strong>')) {
      breakdownEl.innerHTML = breakdown;
    } else {
      breakdownEl.textContent = breakdown;
    }
    out.appendChild(breakdownEl);
  }
  // Always append the copy button — event delegation handles clicks regardless of when button was created
  const btn = document.createElement('button');
  btn.className = 'copy-btn';
  btn.type = 'button';
  btn.dataset.copyResult = '';
  btn.setAttribute('aria-label', 'Copy result to clipboard');
  btn.textContent = 'Copy result';
  out.appendChild(btn);
};

/* Copy the current result of a given .out element to clipboard.
   Triggered via event delegation on [data-copy-result] buttons (no inline onclick).
   Guards against copying empty/placeholder state ("—"). */
window.copyResultFromButton = function copyResultFromButton(btn) {
  const out = btn.closest('.out');
  if (!out) return;
  const label = (out.querySelector('.label')?.textContent || '').trim();
  const big = (out.querySelector('.big')?.textContent || '').trim();
  const breakdown = (out.querySelector('.breakdown')?.textContent || '').trim();
  const text = (label ? label + ': ' : '') + big + (breakdown ? ' — ' + breakdown : '');
  if (!text.trim() || big === '—') return;
  const original = btn.textContent;
  const revert = () => { btn.textContent = original; };
  if (!navigator.clipboard) {
    btn.textContent = 'Copy unavailable';
    setTimeout(revert, 1500);
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'Copied';
    setTimeout(revert, 1500);
  }).catch(() => {
    btn.textContent = 'Copy failed';
    setTimeout(revert, 1500);
  });
};

/* Event delegation — single listener catches clicks on any [data-copy-result] button,
   even if the button was just rendered by setOut() into a freshly rebuilt .out element. */
document.addEventListener('click', function (e) {
  const btn = e.target.closest('[data-copy-result]');
  if (btn) window.copyResultFromButton(btn);
});

/* Phase 51: live calculation. Wire input/change events on a tool form to a calc function.
   Debounced (default 80ms) so rapid typing produces one calculation per pause.
   Calculate button stays as a fallback for users who expect explicit confirmation,
   for users on assistive tech, or for users with motion preferences.
   No flash, no count-up — result simply updates in place. */
window.attachLiveCalc = function attachLiveCalc(containerSelector, calcFn, wait) {
  const container = document.querySelector(containerSelector);
  if (!container || typeof calcFn !== 'function') return;
  const delay = typeof wait === 'number' ? wait : 80;
  let t;
  const handler = function () {
    clearTimeout(t);
    t = setTimeout(calcFn, delay);
  };
  container.querySelectorAll('input, select').forEach(function (el) {
    el.addEventListener('input', handler);
    el.addEventListener('change', handler);
  });
};

/* Phase 54b: keyboard-aware mobile compact mode.
   When focus enters an input/select inside .tool-form, add body.is-input-mode class.
   Mobile CSS uses this class to compact non-essential vertical space so the result
   stays visible above the on-screen keyboard.
   Also scrolls the result panel into center view 300ms after focus (after keyboard opens).
   Removed if focus leaves .tool-form (with small delay to allow Tab/Next between fields). */
(function () {
  let blurTimer;

  function isInToolForm(el) {
    return !!(el && el.closest && el.closest('.tool-form'));
  }

  document.addEventListener('focusin', function (e) {
    if (!isInToolForm(e.target)) return;
    clearTimeout(blurTimer);
    document.body.classList.add('is-input-mode');
    // After keyboard opens (300ms typical), scroll result into view if it exists
    setTimeout(function () {
      if (!document.body.classList.contains('is-input-mode')) return;
      const out = document.querySelector('.out');
      if (out && typeof out.scrollIntoView === 'function') {
        // block: 'start' — bring top of result (label + big number) to visible area.
        // scroll-margin-top in CSS adds breathing room above.
        out.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  });

  document.addEventListener('focusout', function () {
    clearTimeout(blurTimer);
    blurTimer = setTimeout(function () {
      if (!isInToolForm(document.activeElement)) {
        document.body.classList.remove('is-input-mode');
      }
    }, 150);
  });
})();
