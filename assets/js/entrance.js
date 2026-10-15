/* Shared loading and split-door entrance. The next screen opens only after both doors finish. */
(() => {
  'use strict';
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let active = false;

  function play(onOpened) {
    if (active) return;
    active = true;
    const screen = document.createElement('dialog');
    screen.className = 'entrance-screen';
    screen.id = 'entrance-screen';
    screen.dataset.phase = 'loading';
    screen.setAttribute('aria-label', 'Welcome to TEJAS 2026');
    screen.innerHTML = `
      <div class="entrance-light" aria-hidden="true"></div>
      <div class="entrance-door entrance-door-left" aria-hidden="true"><span></span></div>
      <div class="entrance-door entrance-door-right" aria-hidden="true"><span></span></div>
      <div class="entrance-seam" aria-hidden="true"></div>
      <div class="entrance-content">
        <p class="entrance-institution">SRUSTI ACADEMY OF MANAGEMENT &amp; TECHNOLOGY</p>
        <p class="entrance-department">Department of Computer Applications</p>
        <div class="entrance-title"><p class="entrance-eyebrow">A NEW CHAPTER AWAITS</p><h1>TEJAS <span>’26</span></h1><p class="entrance-script">The Fresh Bloom</p><p class="entrance-dedication">A heartfelt welcome to our esteemed teachers.</p></div>
        <div class="entrance-control">
          <div class="entrance-loader" id="entrance-loader"><span class="entrance-loading-mark" aria-hidden="true">T</span><span class="entrance-loading-line" aria-hidden="true"></span></div>
          <button class="entrance-open" id="entrance-open" type="button" hidden><span class="entrance-seal" aria-hidden="true"><span>✦</span><strong>T</strong><small>’26</small><span>❦</span></span><span class="entrance-tap">Tap to open <span aria-hidden="true">↗</span></span></button>
          <p class="entrance-status" id="entrance-status" role="status">Preparing your welcome…</p>
        </div>
        <p class="entrance-date">30 OCTOBER 2026 <span aria-hidden="true">✦</span> JRD TATA HALL</p>
      </div>`;
    document.body.append(screen);
    document.body.classList.add('entrance-active');
    screen.showModal();
    document.documentElement.classList.remove('entrance-pending');
    const button = screen.querySelector('#entrance-open');
    const status = screen.querySelector('#entrance-status');
    let completed = false;
    let fallback;

    function finish() {
      if (completed || screen.dataset.phase !== 'opening') return;
      completed = true;
      clearTimeout(fallback);
      motion.removeEventListener('change', onMotionChange);
      screen.close();
      screen.remove();
      document.body.classList.remove('entrance-active');
      active = false;
      onOpened();
    }
    function onMotionChange() { if (motion.matches) finish(); }
    function openDoors() {
      if (screen.dataset.phase !== 'ready') return;
      window.TEJAS_SOUNDTRACK.start();
      screen.dataset.phase = 'opening';
      button.disabled = true;
      status.textContent = 'Opening the doors…';
      if (motion.matches) return finish();
      // Transition completion owns the handoff; the timeout is a background-tab fallback.
      fallback = setTimeout(finish, 2200);
    }
    screen.querySelector('.entrance-door-right').addEventListener('transitionend', event => {
      if (event.propertyName === 'transform' && event.target.classList.contains('entrance-door-right')) finish();
    });
    button.addEventListener('click', openDoors);
    screen.addEventListener('cancel', event => { event.preventDefault(); openDoors(); });
    motion.addEventListener('change', onMotionChange);

    const artwork = new Image();
    artwork.src = 'assets/images/hero-engraving.webp';
    let assetTimeout;
    const ready = Promise.race([
      Promise.allSettled([artwork.decode(), document.fonts.ready]),
      new Promise(resolve => { assetTimeout = setTimeout(resolve, 1800); })
    ]);
    Promise.all([ready, new Promise(resolve => setTimeout(resolve, motion.matches ? 0 : 650))]).then(() => {
      clearTimeout(assetTimeout);
      screen.dataset.phase = 'ready';
      screen.querySelector('#entrance-loader').hidden = true;
      button.hidden = false;
      status.textContent = 'Your invitation awaits.';
      button.focus({ preventScroll: true });
    });
  }
  window.TEJAS_ENTRANCE = { play };
})();
