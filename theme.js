/* TinyUseful — theme toggle (light / dark / auto)
 * Persists user choice in localStorage.
 * Default: follows system (prefers-color-scheme), no localStorage entry.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'tinyuseful-theme';
  var root = document.documentElement;

  // Apply saved theme on first load (before user sees anything)
  function applyStoredTheme() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') {
        root.setAttribute('data-theme', saved);
      } else {
        root.removeAttribute('data-theme');
      }
    } catch (e) { /* localStorage may be blocked */ }
  }

  // Determine current effective theme (for toggle logic)
  function currentTheme() {
    var explicit = root.getAttribute('data-theme');
    if (explicit === 'light' || explicit === 'dark') return explicit;
    // Otherwise follow system
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    if (theme === 'light' || theme === 'dark') {
      root.setAttribute('data-theme', theme);
      try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
    } else {
      root.removeAttribute('data-theme');
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    }
  }

  // Wire up toggle button(s)
  function attachToggle() {
    var buttons = document.querySelectorAll('.theme-toggle');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = currentTheme() === 'dark' ? 'light' : 'dark';
        setTheme(next);
      });
    });
  }

  // Init: apply saved theme, then attach button on DOM ready
  applyStoredTheme();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachToggle);
  } else {
    attachToggle();
  }
})();
