/* One soundtrack and one accessible control, shared by both pages and their dialogs. */
(() => {
  'use strict';
  const storageKey = 'tejas-soundtrack';
  let saved = null;
  try { saved = JSON.parse(sessionStorage.getItem(storageKey)); } catch { /* Storage may be unavailable in a local-file preview. */ }
  let enabled = saved?.enabled !== false;
  let pending = false;
  let attempt = 0;
  let failed = false;
  const audio = document.createElement('audio');
  audio.id = 'page-soundtrack';
  audio.src = 'assets/audio/tejas-soundtrack.mp3';
  audio.preload = 'none';
  audio.loop = true;
  audio.volume = .35;
  audio.hidden = true;
  document.body.append(audio);

  const widget = document.createElement('div');
  widget.className = 'soundtrack-widget';
  widget.dataset.dock = 'floating';
  const button = document.createElement('button');
  button.id = 'soundtrack-toggle';
  button.className = 'soundtrack-toggle';
  button.type = 'button';
  widget.append(button);
  document.body.append(widget);
  const speaker = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M11 4 6 8H3v8h3l5 4V4Z"/><path class="soundtrack-waves" d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/><path class="soundtrack-slash" d="m15 9 6 6m0-6-6 6"/></svg>';
  function render() {
    const playing = !audio.paused && !failed;
    const active = playing || pending;
    button.innerHTML = `${speaker}<span>${failed ? 'Retry music' : pending ? 'Music loading' : playing ? 'Music on' : enabled ? 'Play music' : 'Music off'}</span>`;
    button.dataset.playing = String(active);
    button.setAttribute('aria-pressed', String(active));
    button.setAttribute('aria-label', active ? 'Mute soundtrack' : 'Play soundtrack');
    button.title = active ? 'Turn background music off' : 'Turn background music on';
  }
  function save() {
    try { sessionStorage.setItem(storageKey, JSON.stringify({ enabled, time: audio.currentTime, savedAt: Date.now() })); } catch { /* The control also works without storage. */ }
  }
  function pause() {
    attempt += 1;
    enabled = false;
    pending = false;
    audio.pause();
    save(); render();
  }
  async function start(force = false) {
    if (!force && !enabled) return;
    if (pending || !audio.paused) return;
    enabled = true;
    const thisAttempt = ++attempt;
    pending = true;
    if (audio.error) audio.load();
    failed = false;
    render();
    try {
      // Called directly by the seal or music button, while the user gesture is active.
      await audio.play();
      if (thisAttempt !== attempt) return;
      pending = false;
      save(); render();
    } catch (error) {
      if (thisAttempt !== attempt) return;
      pending = false;
      failed = error.name !== 'NotAllowedError' && error.name !== 'AbortError';
      render();
    }
  }
  button.addEventListener('click', () => pending || !audio.paused ? pause() : start(true));
  audio.addEventListener('loadedmetadata', () => {
    if (saved && Number.isFinite(saved.time) && Number.isFinite(audio.duration) && audio.duration > 0) {
      audio.currentTime = Math.max(0, saved.time) % audio.duration;
      saved = null;
    }
  });
  audio.addEventListener('error', () => { failed = true; pending = false; render(); });
  audio.addEventListener('playing', () => { pending = false; failed = false; render(); });
  audio.addEventListener('pause', render);
  window.addEventListener('pagehide', () => { save(); audio.pause(); });
  window.addEventListener('pageshow', event => { if (event.persisted && enabled) start(); });

  // A control outside a modal is inert. Move this same control into the active dialog.
  let dialogs = [];
  function dock() {
    dialogs = dialogs.filter(dialog => dialog.open && dialog.isConnected);
    const dialog = dialogs.at(-1);
    if (!dialog) {
      widget.dataset.dock = 'floating';
      document.body.append(widget);
    } else if (dialog.id === 'entrance-screen') {
      widget.dataset.dock = 'entrance';
      dialog.append(widget);
    } else {
      widget.dataset.dock = 'inline';
      const panel = dialog.querySelector('.intro-panel, .profile-copy');
      if (panel) panel.append(widget);
      else dialog.prepend(widget);
    }
  }
  new MutationObserver(records => {
    records.forEach(({ target }) => {
      if (target.tagName !== 'DIALOG') return;
      dialogs = dialogs.filter(dialog => dialog !== target);
      if (target.open) dialogs.push(target);
    });
    dock();
  }).observe(document.body, { subtree: true, attributes: true, attributeFilter: ['open'] });
  render();
  window.TEJAS_SOUNDTRACK = {
    start,
    resumeFromInvitation() {
      if (enabled && saved && Date.now() - saved.savedAt < 300000) start();
    }
  };
})();
