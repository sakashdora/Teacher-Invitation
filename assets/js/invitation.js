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
  let recipient = faculty.find(person => String(person.id) === teacherId) || null;
  let imageURL = null;
  let renderVersion = 0;

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
    byId('invitation-artwork').hidden = true;
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
      byId('invitation-artwork').hidden = false;
      download.disabled = false; printButton.disabled = false;
      byId('invitation-status').textContent = `Your invitation with ${person.name}'s portrait is ready.`;
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
