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
  audio.src = 'assets/audio/new_song.mp3';
  audio.preload = 'auto';
  audio.loop = true;
  audio.volume = .35;
  audio.hidden = true;
  audio.setAttribute('playsinline', 'true');
  audio.setAttribute('webkit-playsinline', 'true');
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

  const speaker = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M11 4 6 8H3v8h3l5 4V4Z"/><path class="soundtrack-waves" d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/><path class="soundtrack-slash" d="m15 9 6 6m0-6-6 6"/></svg>';

  function render() {
    const playing = !audio.paused && !failed;
    const active = playing || pending;
    button.innerHTML = `${speaker}<span>${failed ? 'Retry music' : pending ? 'Music loading…' : playing ? 'Music on' : 'Music off'}</span>`;
    button.dataset.playing = String(active);
    button.setAttribute('aria-pressed', String(active));
    button.setAttribute('aria-label', active ? 'Mute soundtrack' : 'Play soundtrack');
    button.title = active ? 'Turn background music off (Mute)' : 'Turn background music on (Play)';
  }

  function save() {
    try { sessionStorage.setItem(storageKey, JSON.stringify({ enabled, time: audio.currentTime, savedAt: Date.now() })); } catch { /* Storage is optional. */ }
  }

  function pause() {
    attempt += 1;
    enabled = false;
    pending = false;
    audio.pause();
    save();
    render();
  }

  async function start(force = false) {
    if (!force && !enabled) return;
    if (!audio.paused && !audio.ended) return;
    if (pending && !force) return;
    enabled = true;
    audio.muted = false;
    const thisAttempt = ++attempt;
    pending = true;
    if (audio.error || audio.readyState === 0) {
      audio.load();
    }
    failed = false;
    render();

    // Mobile AudioContext unlock for iOS Safari and Chromium
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        if (!window.__tejasAudioCtx) window.__tejasAudioCtx = new AudioCtx();
        if (window.__tejasAudioCtx.state === 'suspended') window.__tejasAudioCtx.resume();
      }
    } catch { /* AudioContext optional enhancement */ }

    try {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        await playPromise;
      }
      if (thisAttempt !== attempt) return;
      pending = false;
      save();
      render();
    } catch (error) {
      if (thisAttempt !== attempt) return;
      pending = false;
      failed = error.name !== 'NotAllowedError' && error.name !== 'AbortError';
      render();
    }
  }

  button.addEventListener('click', (event) => {
    event.stopPropagation();
    if (pending || !audio.paused) {
      pause();
    } else {
      start(true);
    }
  });

  // User gesture unlock for modern mobile browser autoplay policies
  function unlockOnUserGesture(event) {
    if (button.contains(event.target)) return;
    if (enabled && audio.paused) {
      start(true);
    }
  }

  const unlockEvents = ['pointerup', 'touchend', 'click', 'keydown'];
  unlockEvents.forEach(evt => {
    window.addEventListener(evt, unlockOnUserGesture, { capture: true, passive: true });
  });

  audio.addEventListener('loadedmetadata', () => {
    if (saved && Number.isFinite(saved.time) && Number.isFinite(audio.duration) && audio.duration > 0) {
      audio.currentTime = Math.max(0, saved.time) % audio.duration;
      saved = null;
    }
  });

  audio.addEventListener('error', () => {
    if (audio.src && !audio.src.includes('tejas-soundtrack.mp3')) {
      audio.src = 'assets/audio/tejas-soundtrack.mp3';
      audio.load();
      if (enabled) audio.play().catch(() => {});
      return;
    }
    failed = true;
    pending = false;
    render();
  });

  audio.addEventListener('playing', () => {
    pending = false;
    failed = false;
    unlockEvents.forEach(evt => {
      window.removeEventListener(evt, unlockOnUserGesture, { capture: true, passive: true });
    });
    render();
  });
  audio.addEventListener('pause', render);
  window.addEventListener('pagehide', () => { save(); audio.pause(); });
  window.addEventListener('pageshow', event => { if (event.persisted && enabled) start(); });

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
      widget.dataset.dock = 'dialog';
      dialog.append(widget);
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
    pause,
    resumeFromInvitation() {
      if (enabled) start();
    }
  };
})();
