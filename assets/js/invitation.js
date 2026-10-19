(() => {
  'use strict';
  const byId = id => document.getElementById(id);
  const faculty = window.TEJAS_FACULTY;
  const teacherId = new URLSearchParams(location.search).get('teacher');
  if (!teacherId) { location.replace('index.html'); return; }
  const dialog = byId('personalize-dialog');
  const nameInput = byId('invitation-name');
  const matchesArea = byId('person-matches');
  const formError = byId('personalize-error');
  const preview = byId('invitation-preview');
  const download = byId('download-invitation');
  const printButton = byId('print-invitation');
  const envelope = byId('envelope');
  const envelopeStage = byId('envelope-stage');
  const envelopeSeal = byId('envelope-seal');
  const envelopeExperience = byId('envelope-experience');
  const toggleEnvelopeBtn = byId('toggle-envelope-btn');
  const toggleEnvelopeText = byId('toggle-envelope-text');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let recipient = faculty.find(person => String(person.id) === teacherId) || null;
  let imageURL = null;
  let renderVersion = 0;
  let isAnimating = false;

  function updateCardDimensions() {
    if (!envelope) return;
    const stageWidth = envelope.getBoundingClientRect().width || 640;
    const isMobile = window.innerWidth <= 560;
    const padding = isMobile ? 20 : 40;
    const cardWidth = Math.max(260, stageWidth - padding);
    const ratio = (preview && preview.naturalHeight && preview.naturalWidth)
      ? (preview.naturalHeight / preview.naturalWidth)
      : 1.4;
    const cardHeight = Math.round(cardWidth * ratio);
    envelope.style.setProperty('--card-height', `${cardHeight}px`);
  }
  window.addEventListener('resize', updateCardDimensions, { passive: true });

  function openEnvelope() {
    if (!envelope || isAnimating || envelope.classList.contains('is-opened')) return;
    updateCardDimensions();
    if (reducedMotion.matches) {
      envelope.classList.add('is-opened');
      envelopeStage?.classList.add('is-opened');
      envelopeSeal.setAttribute('aria-expanded', 'true');
      toggleEnvelopeBtn.hidden = false;
      toggleEnvelopeBtn.setAttribute('aria-expanded', 'true');
      toggleEnvelopeText.textContent = 'Re-seal envelope';
      download.disabled = false;
      printButton.disabled = false;
      byId('invitation-status').textContent = recipient ? `Invitation for ${recipient.name} is open.` : 'Invitation is open.';
      return;
    }
    isAnimating = true;
    envelope.classList.add('is-unsealing');
    envelopeSeal.setAttribute('aria-expanded', 'true');
    setTimeout(() => {
      envelope.classList.remove('is-unsealing');
      envelope.classList.add('is-opened');
      envelopeStage?.classList.add('is-opened');
      toggleEnvelopeBtn.hidden = false;
      toggleEnvelopeBtn.setAttribute('aria-expanded', 'true');
      toggleEnvelopeText.textContent = 'Re-seal envelope';
      download.disabled = false;
      printButton.disabled = false;
      byId('invitation-status').textContent = recipient ? `Invitation for ${recipient.name} is open.` : 'Invitation is open.';
      setTimeout(() => { isAnimating = false; }, 1300);
    }, 120);
  }

  function closeEnvelope() {
    if (!envelope || isAnimating || !envelope.classList.contains('is-opened')) return;
    if (reducedMotion.matches) {
      envelope.classList.remove('is-opened');
      envelopeStage?.classList.remove('is-opened');
      envelopeSeal.setAttribute('aria-expanded', 'false');
      toggleEnvelopeBtn.setAttribute('aria-expanded', 'false');
      toggleEnvelopeText.textContent = 'Open invitation';
      byId('invitation-status').textContent = 'Invitation envelope is sealed.';
      return;
    }
    isAnimating = true;
    envelope.classList.remove('is-opened');
    envelopeStage?.classList.remove('is-opened');
    envelopeSeal.setAttribute('aria-expanded', 'false');
    toggleEnvelopeBtn.setAttribute('aria-expanded', 'false');
    toggleEnvelopeText.textContent = 'Open invitation';
    byId('invitation-status').textContent = 'Invitation envelope is sealed.';
    setTimeout(() => {
      toggleEnvelopeBtn.hidden = true;
      isAnimating = false;
    }, 1100);
  }

  function homeLink(person) { return `index.html?teacher=${person ? person.id : 'guest'}`; }
  function updateLinks() {
    ['back-home', 'invitation-home', 'return-home'].forEach(id => { byId(id).href = homeLink(recipient); });
  }
  function showPersonalization() {
    formError.hidden = true; nameInput.removeAttribute('aria-invalid');
    nameInput.value = recipient?.name || '';
    showMatches(); dialog.showModal();
    document.body.classList.add('personalizing');
    nameInput.focus({preventScroll:true});
  }
  async function prepareInvitation(person) {
    const version = ++renderVersion;
    recipient = person; updateLinks();
    byId('recipient-caption').textContent = `Prepared especially for ${person.name}`;
    envelopeExperience.hidden = true;
    byId('invitation-loading').hidden = false;
    byId('invitation-error').hidden = true;
    byId('retry-invitation').hidden = true;
    download.disabled = true; printButton.disabled = true;
    const nextURL = new URL(location.href); nextURL.searchParams.set('teacher', person.id);
    try { history.replaceState(null, '', nextURL); } catch { /* Local-file previews may restrict history changes. */ }
    document.title = `${person.name} · TEJAS ’26 Invitation`;
    try {
      const result = await window.TEJAS_INVITATION.render(person);
      if (version !== renderVersion) return;
      if (imageURL) URL.revokeObjectURL(imageURL);
      imageURL = URL.createObjectURL(result.blob);
      preview.src = imageURL;
      preview.alt = `TEJAS ’26 invitation for ${person.name}, with their portrait. ${result.date}, ${window.TEJAS_EVENT.venue}.`;
      byId('invitation-description').textContent = `${person.name}, ${person.role}. You are cordially invited to TEJAS ’26 — The Fresh Bloom. ${result.quote} ${result.date}, ${window.TEJAS_EVENT.venue}, Srusti Academy. With warm regards, the TEJAS ’26 Organising Team.`;
      await preview.decode();
      if (version !== renderVersion) return;
      byId('invitation-loading').hidden = true;
      envelopeExperience.hidden = false;
      updateCardDimensions();
      closeEnvelope();
      if (reducedMotion.matches) openEnvelope();
      byId('invitation-status').textContent = `Your personal invitation for ${person.name} is ready. Click or tap the wax seal to open.`;
    } catch (error) {
      if (version !== renderVersion) return;
      byId('invitation-loading').hidden = true;
      byId('invitation-error').textContent = error.message || 'The invitation could not be prepared. Please try again.';
      byId('invitation-error').hidden = false;
      byId('retry-invitation').hidden = false;
    }
  }
  function choose(person) {
    dialog.close(); document.body.classList.remove('personalizing');
    prepareInvitation(person);
    byId('letter-heading').focus({preventScroll:true});
  }
  function showError(message) {
    formError.textContent = message; formError.hidden = false;
    nameInput.setAttribute('aria-invalid', 'true'); nameInput.focus();
  }
  function showMatches() {
    formError.hidden = true; nameInput.removeAttribute('aria-invalid');
    const matches = window.TEJAS_NAMES.findMatches(nameInput.value, faculty);
    matchesArea.replaceChildren(); matchesArea.hidden = !matches.length;
    matches.forEach(person => {
      const button = document.createElement('button');
      button.type = 'button'; button.textContent = person.name;
      button.addEventListener('click', () => choose(person));
      matchesArea.append(button);
    });
  }
  byId('personalize-button').addEventListener('click', showPersonalization);
  byId('close-personalize').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => document.body.classList.remove('personalizing'));
  nameInput.addEventListener('input', showMatches);
  byId('personalize-form').addEventListener('submit', event => {
    event.preventDefault();
    const matches = window.TEJAS_NAMES.findMatches(nameInput.value, faculty);
    if (!matches.length) return showError('We could not find that name. Please try your first or full name.');
    if (matches.length > 1) return showError('Please choose your name from the matching teachers.');
    choose(matches[0]);
  });
  byId('retry-invitation').addEventListener('click', () => { if (recipient) prepareInvitation(recipient); });
  envelopeSeal.addEventListener('click', openEnvelope);
  toggleEnvelopeBtn.addEventListener('click', () => {
    if (envelope.classList.contains('is-opened')) closeEnvelope();
    else openEnvelope();
  });
  download.addEventListener('click', () => {
    if (!imageURL || !recipient || download.disabled) return;
    const link = document.createElement('a');
    link.href = imageURL;
    link.download = `TEJAS-26-Invitation-${recipient.name.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '')}.png`;
    document.body.append(link); link.click(); link.remove();
    byId('invitation-status').textContent = 'Your invitation is ready to save.';
  });
  printButton.addEventListener('click', () => { if (!printButton.disabled) window.print(); });
  updateLinks();
  window.TEJAS_SOUNDTRACK.resumeFromInvitation();
  if (recipient) prepareInvitation(recipient);
  else {
    byId('invitation-loading').hidden = true;
    byId('recipient-caption').textContent = 'Choose your name to prepare an invitation with your portrait.';
    showPersonalization();
    if (teacherId !== 'guest') showError('This invitation link does not match a teacher. Please choose your name.');
  }
})();
