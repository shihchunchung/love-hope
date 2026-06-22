/* ============================================================
   Love Hope Foundation — shared chrome behaviour
   Loaded on every page (via base.njk) AFTER the chrome markup.
   Back-to-top button + mobile drawer. Page-specific JS stays in
   each page's own {% block scripts %}.
   ============================================================ */

// ============ BACK TO TOP ============
(function () {
  const btn = document.getElementById('cdTop');
  if (!btn) return;
  btn.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      btn.classList.toggle('on', window.scrollY > 600);
      ticking = false;
    });
  });
})();

// ============ MOBILE DRAWER ============
(function () {
  const toggle   = document.getElementById('navToggle');
  const drawer   = document.getElementById('drawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const close    = document.getElementById('drawerClose');
  if (!toggle || !drawer || !backdrop) return;

  function open() {
    drawer.classList.add('on');
    backdrop.classList.add('on');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function shut() {
    drawer.classList.remove('on');
    backdrop.classList.remove('on');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', open);
  close && close.addEventListener('click', shut);
  backdrop.addEventListener('click', shut);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer.classList.contains('on')) shut();
  });
  drawer.querySelectorAll('.drawer-nav a').forEach(a => {
    a.addEventListener('click', shut);
  });
})();

// ============ COOKIE CONSENT ============
// 僅初次到訪顯示；按「同意並關閉」後存 localStorage，往後（重整／換頁／再訪）都不再出現。
(function () {
  const banner = document.getElementById('cookieBanner');
  if (!banner) return;
  const KEY = 'lhf-cookie-consent';
  let agreed = false;
  try { agreed = localStorage.getItem(KEY) === '1'; } catch (e) {}
  if (agreed) return;                 // 已同意 → 維持隱藏
  banner.hidden = false;              // 初次到訪 → 顯示
  const btn = document.getElementById('cookieAccept');
  btn && btn.addEventListener('click', () => {
    try { localStorage.setItem(KEY, '1'); } catch (e) {}
    banner.hidden = true;
  });
})();
