(() => {
  'use strict';
  const faculty = window.TEJAS_FACULTY;
  const event = window.TEJAS_EVENT;
  const byId = id => document.getElementById(id);
  const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const carousel = byId('faculty-carousel');
  const track = byId('faculty-track');
  const playButton = byId('carousel-play');
  const profileDialog = byId('profile-dialog');
  const directoryDialog = byId('directory-dialog');
  const intro = byId('welcome-intro');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobileLayout = window.matchMedia('(max-width: 800px)');
  let currentIndex = 0;
  let playing = false;
  let timer = null;
  let inView = true;
  let hovered = false;
  let swipeStart = null;
  let ignoreClickUntil = 0;
  let nextAdvanceAt = 0;
  let entering = false;
  let entered = false;
  let selectedTeacher = null;

  const cards = faculty.map((person, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'faculty-card';
    button.innerHTML = `<img src="${escapeHTML(person.photo)}" alt="" width="220" height="280" draggable="false" ${index > 4 && index < faculty.length - 4 ? 'loading="lazy"' : ''}><span class="faculty-card-copy"><strong>${escapeHTML(person.name)}</strong><small>${escapeHTML(person.role)}</small><span class="profile-link">View profile ↗</span></span>`;
    button.addEventListener('click', () => {
      if (performance.now() < ignoreClickUntil) return;
      if (index === currentIndex) openProfile(person);
      else { currentIndex = index; deferAdvance(); renderCarousel(); }
    });
    track.append(button);
    return button;
  });

  function renderCarousel() {
    const width = carousel.clientWidth;
    const mobile = mobileLayout.matches;
    const maxVisible = mobile ? 1 : width > 850 ? 4 : 3;
    const radius = width / 2 - 73;
    const cardWidth = cards[0].offsetWidth;
    cards.forEach((card, index) => {
      let offset = (index - currentIndex + faculty.length) % faculty.length;
      if (offset > faculty.length / 2) offset -= faculty.length;
      const distance = Math.abs(offset);
      const visible = distance <= maxVisible;
      const x = mobile ? offset * (cardWidth + 18) : Math.sin(offset * .33) * radius;
      const scale = mobile ? (offset === 0 ? 1 : .94) : offset === 0 ? 1.06 : Math.max(.6, 1 - distance * .085);
      card.style.transform = `translateX(calc(-50% + ${x}px)) translateY(${mobile ? 0 : distance * 5}px) rotateY(${mobile ? 0 : -offset * 11}deg) scale(${scale})`;
      card.style.opacity = visible ? String(mobile && distance ? .6 : 1 - distance * .06) : '0';
      card.style.zIndex = String(20 - distance);
      card.tabIndex = offset === 0 ? 0 : -1;
      card.setAttribute('aria-hidden', String(!visible));
      card.setAttribute('aria-label', `${offset === 0 ? 'View profile: ' : 'Select '}${faculty[index].name}, ${faculty[index].role}`);
      card.classList.toggle('is-active', offset === 0);
    });
    byId('faculty-position').textContent = faculty[currentIndex].name;
  }
  function deferAdvance(delay = 4200) { nextAdvanceAt = performance.now() + delay; }
  function step(delta, manual = true) {
    if (manual) deferAdvance();
    const focusOnCard = cards.includes(document.activeElement);
    currentIndex = (currentIndex + delta + faculty.length) % faculty.length;
    renderCarousel();
    if (focusOnCard) cards[currentIndex].focus({ preventScroll: true });
  }
  function stopAutoplay() {
    playing = false;
    clearInterval(timer);
    timer = null;
    playButton.setAttribute('aria-pressed', 'false');
    playButton.setAttribute('aria-label', 'Start automatic rotation');
    playButton.innerHTML = '<span aria-hidden="true">▷</span> Auto-play';
    byId('faculty-position').setAttribute('aria-live', 'polite');
  }
  function startAutoplay(delay = 4200) {
    clearInterval(timer);
    playing = true;
    deferAdvance(delay);
    playButton.setAttribute('aria-pressed', 'true');
    playButton.setAttribute('aria-label', 'Pause automatic rotation');
    playButton.innerHTML = '<span aria-hidden="true">Ⅱ</span> Pause auto-play';
    byId('faculty-position').setAttribute('aria-live', 'off');
    timer = setInterval(() => {
      if (!entered || document.hidden || !inView || hovered || carousel.contains(document.activeElement) || document.querySelector('dialog[open]')) {
        deferAdvance();
      } else if (performance.now() >= nextAdvanceAt) {
        step(1, false); deferAdvance();
      }
    }, 250);
  }
  playButton.addEventListener('click', () => playing ? stopAutoplay() : startAutoplay());
  carousel.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') hovered = true; });
  carousel.addEventListener('pointerleave', () => { hovered = false; swipeStart = null; });
  carousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); step(event.key === 'ArrowRight' ? 1 : -1);
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault(); deferAdvance(); currentIndex = event.key === 'Home' ? 0 : faculty.length - 1; renderCarousel();
      if (cards.includes(document.activeElement)) cards[currentIndex].focus({ preventScroll: true });
    } else if (event.code === 'Space' && event.target === carousel) {
      event.preventDefault(); playing ? stopAutoplay() : startAutoplay();
    }
  });
  carousel.addEventListener('pointerdown', event => {
    if (event.isPrimary && event.button === 0) swipeStart = { x: event.clientX, y: event.clientY };
  });
  carousel.addEventListener('pointerup', event => {
    if (!swipeStart) return;
    const x = event.clientX - swipeStart.x;
    const y = event.clientY - swipeStart.y;
    if (Math.abs(x) > 40 && Math.abs(x) > Math.abs(y) * 1.3) {
      ignoreClickUntil = performance.now() + 500; step(x < 0 ? 1 : -1);
    }
    swipeStart = null;
  });
  carousel.addEventListener('pointercancel', () => { swipeStart = null; });
  reducedMotion.addEventListener('change', stopAutoplay);
  mobileLayout.addEventListener('change', renderCarousel);
  new ResizeObserver(renderCarousel).observe(carousel);
  new IntersectionObserver(entries => { inView = entries[0].isIntersecting; }).observe(carousel);

  function openDialog(dialog) {
    deferAdvance();
    dialog.showModal();
    document.body.classList.add('dialog-open');
  }
  function openProfile(person) {
    byId('profile-name').textContent = person.name;
    byId('profile-role').textContent = person.role;
    byId('profile-photo').src = person.photo;
    byId('profile-photo').alt = person.name;
    const emailLink = byId('profile-email');
    emailLink.hidden = !person.email;
    emailLink.textContent = person.email || '';
    if (person.email) emailLink.href = `mailto:${person.email}`;
    else emailLink.removeAttribute('href');
    openDialog(profileDialog);
  }
  document.querySelectorAll('dialog:not(#welcome-intro)').forEach(dialog => {
    dialog.querySelector('[data-close-dialog]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => { document.body.classList.toggle('dialog-open', Boolean(document.querySelector('dialog[open]'))); });
  });

  const directoryCards = faculty.map(person => {
    const card = document.createElement('button');
    card.type = 'button'; card.className = 'directory-card';
    card.innerHTML = `<img src="${escapeHTML(person.photo)}" alt="" width="200" height="180" loading="lazy"><strong>${escapeHTML(person.name)}</strong><small>${escapeHTML(person.role)}</small>`;
    card.setAttribute('aria-label', `View profile: ${person.name}`);
    card.addEventListener('click', () => openProfile(person));
    byId('directory-grid').append(card);
    return card;
  });
  function filterDirectory() {
    const query = byId('faculty-search').value.trim().toLocaleLowerCase();
    let count = 0;
    directoryCards.forEach((card, index) => {
      const person = faculty[index];
      const match = `${person.name} ${person.role}`.toLocaleLowerCase().includes(query);
      card.hidden = !match; if (match) count += 1;
    });
    byId('search-count').textContent = query ? (count ? 'Matching teachers' : 'No matching teachers') : 'Our esteemed teachers';
    byId('faculty-empty').hidden = count > 0;
  }
  byId('browse-faculty').addEventListener('click', () => {
    byId('faculty-search').value = ''; filterDirectory(); openDialog(directoryDialog); byId('faculty-search').focus();
  });
  byId('faculty-search').addEventListener('input', filterDirectory);

  /* Welcome entry: a name must resolve to a real faculty record before selection. */
  const nameInput = byId('teacher-name');
  const suggestions = byId('name-suggestions');
  const welcomeForm = byId('welcome-form');
  const errorMessage = byId('intro-error');

  function showNameError(message) {
    errorMessage.textContent = message;
    errorMessage.hidden = false;
    nameInput.setAttribute('aria-invalid', 'true');
    nameInput.focus();
  }
  function renderSuggestions() {
    selectedTeacher = null;
    errorMessage.hidden = true;
    nameInput.removeAttribute('aria-invalid');
    const query = nameInput.value;
    const matches = window.TEJAS_NAMES.findMatches(query, faculty);
    suggestions.replaceChildren();
    suggestions.hidden = !matches.length;
    intro.querySelector('.intro-panel')?.classList.toggle('has-suggestions', matches.length > 0);
    if (!matches.length) return;
    const hint = document.createElement('p');
    hint.textContent = matches.length === 1 ? 'Your faculty profile' : 'Choose your name';
    suggestions.append(hint);
    matches.forEach(person => {
      const choice = document.createElement('button');
      choice.type = 'button'; choice.className = 'name-choice';
      choice.setAttribute('aria-label', `Select ${person.name}, ${person.role}`);
      choice.innerHTML = `<img src="${escapeHTML(person.photo)}" alt="" width="40" height="44" loading="lazy"><span><strong>${escapeHTML(person.name)}</strong><small>${escapeHTML(person.role)}</small></span><span class="choice-tick" aria-hidden="true">↗</span>`;
      // On mobile / Android touch screens, prevent input blur before selection
      choice.addEventListener('pointerdown', event => {
        event.preventDefault();
      });
      choice.addEventListener('click', () => {
        nameInput.value = person.name;
        selectedTeacher = person;
        suggestions.replaceChildren();
        suggestions.hidden = true;
        intro.querySelector('.intro-panel')?.classList.remove('has-suggestions');
        byId('enter-celebration').focus();
      });
      suggestions.append(choice);
    });

    requestAnimationFrame(() => {
      if (!suggestions.hidden) {
        suggestions.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  async function enterCelebration(person) {
    if (entering || entered) return;
    entering = true; selectedTeacher = person;
    const teacherId = person ? String(person.id) : 'guest';
    document.querySelectorAll('[data-invitation-link]').forEach(link => { link.href = `invitation.html?teacher=${teacherId}`; });
    const homeURL = new URL(location.href);
    homeURL.searchParams.set('teacher', teacherId);
    try { history.replaceState(null, '', homeURL); } catch { /* Direct-file navigation remains usable if history changes are restricted. */ }
    welcomeForm.setAttribute('aria-busy', 'true');
    nameInput.disabled = true;
    byId('enter-celebration').disabled = true;
    byId('continue-guest').disabled = true;
    suggestions.querySelectorAll('button').forEach(button => { button.disabled = true; });
    errorMessage.hidden = true;
    byId('intro-loading').hidden = false;
    carousel.classList.add('is-positioning');
    if (person) {
      currentIndex = faculty.findIndex(item => item.id === person.id);
      byId('personal-welcome').textContent = `Welcome, ${person.name}`;
      byId('personal-welcome').hidden = false;
    }
    renderCarousel();
    // Wait for the selected portrait and neighbours, but never trap entry on a slow image.
    const images = [-1, 0, 1].map(offset => cards[(currentIndex + offset + faculty.length) % faculty.length].querySelector('img'));
    let timeout;
    await Promise.race([
      Promise.allSettled(images.map(image => { image.loading = 'eager'; return image.decode(); })),
      new Promise(resolve => { timeout = setTimeout(resolve, 2500); })
    ]);
    clearTimeout(timeout);
    entered = true; entering = false;
    intro.close();
    finishWelcome();
  }

  function finishWelcome() {
    entered = true;
    document.body.classList.remove('dialog-open');
    if (selectedTeacher && location.hash === '#faculty') {
      byId('faculty-heading').focus({ preventScroll: true });
      byId('faculty').scrollIntoView({ behavior: 'instant', block: 'start' });
    } else {
      const destination = byId(location.hash.slice(1));
      byId('hero-title').focus({ preventScroll: true });
      if (destination) destination.scrollIntoView({ behavior: 'instant', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
    }
    if (!reducedMotion.matches && !selectedTeacher) startAutoplay(4200);
    requestAnimationFrame(() => requestAnimationFrame(() => carousel.classList.remove('is-positioning')));
  }
  welcomeForm.addEventListener('submit', formEvent => {
    formEvent.preventDefault();
    if (entering) return;
    if (selectedTeacher && nameInput.value.trim().toLowerCase() === selectedTeacher.name.trim().toLowerCase()) {
      return enterCelebration(selectedTeacher);
    }
    const matches = window.TEJAS_NAMES.findMatches(nameInput.value, faculty);
    if (!nameInput.value.trim()) return showNameError('Please enter your name, or continue as a guest.');
    if (!matches.length) return showNameError('We couldn’t find that name. Try your first or last name, or continue as a guest.');
    if (matches.length > 1) return showNameError('More than one teacher matches. Please choose your name below or enter your full name.');
    enterCelebration(matches[0]);
  });
  nameInput.addEventListener('input', renderSuggestions);
  nameInput.addEventListener('keyup', renderSuggestions);
  nameInput.addEventListener('change', renderSuggestions);
  nameInput.addEventListener('compositionend', renderSuggestions);
  nameInput.addEventListener('focus', () => {
    if (nameInput.value.trim().length >= 2) renderSuggestions();
  });
  byId('continue-guest').addEventListener('click', () => enterCelebration(null));
  intro.addEventListener('cancel', cancelEvent => {
    cancelEvent.preventDefault();
    if (!entering) enterCelebration(null);
  });

  event.programme.forEach((entry, index) => {
    const isRight = index % 2 === 1;
    const row = document.createElement('li');
    row.className = `programme-timeline-item ${isRight ? 'programme-item--right' : 'programme-item--left'}`;
    row.id = entry.id;
    row.setAttribute('aria-labelledby', `${entry.id}-title`);
    const num = entry.number || String(index + 1).padStart(2, '0');
    row.innerHTML = `${isRight ? '<span class="connector-line" aria-hidden="true"><span class="connector-dot"></span></span>' : ''}<div class="programme-card"><div class="card-num-box"><span class="card-num">${escapeHTML(num)}</span></div><div class="card-divider" aria-hidden="true"></div><div class="card-content-box"><h3 class="card-title" id="${entry.id}-title">${escapeHTML(entry.title)}</h3>${entry.subtitle ? `<p class="card-subtitle">${escapeHTML(entry.subtitle)}</p>` : ''}<p class="card-desc">${escapeHTML(entry.description)}</p></div>${entry.category ? `<div class="card-category-badge"><span>${escapeHTML(entry.category)}</span></div>` : ''}</div>`;
    byId('programme-timeline').append(row);
  });
  const navLinks = [...document.querySelectorAll('.main-nav a')];
  const updateNavigation = () => {
    const hash = location.hash || '#welcome';
    navLinks.forEach(link => {
      if (link.hash === hash) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  window.addEventListener('hashchange', updateNavigation);
  renderCarousel(); updateNavigation();
  const welcomeParam = new URLSearchParams(location.search).get('teacher');
  const invitedTeacher = faculty.find(person => String(person.id) === welcomeParam);
  if (invitedTeacher || welcomeParam === 'guest') {
    // A personalised invitation carries only the public directory ID to this page.
    window.TEJAS_SOUNDTRACK.resumeFromInvitation();
    document.documentElement.classList.remove('entrance-pending');
    intro.classList.add('is-handoff');
    intro.showModal();
    document.body.classList.add('dialog-open');
    enterCelebration(invitedTeacher || null);
  } else {
    window.TEJAS_ENTRANCE.play(() => {
      intro.querySelector('.intro-panel').classList.add('entry-form-reveal');
      intro.showModal();
      document.body.classList.add('dialog-open');
      nameInput.focus({ preventScroll: true });
    });
  }
})();
