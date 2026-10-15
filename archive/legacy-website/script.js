/*
 * TEJAS '26 · Faculty invitation & programme
 * EDIT HERE: Replace demo names, roles and illustrations with real faculty data.
 * Put portraits in assets/ (for example assets/dr-smita-panda.jpg) and change photo.
 * No third-party scripts or API calls are required for the carousel to work.
 */
const FACULTY = Array.from({ length: 22 }, (_, index) => ({
  name: `Faculty Member ${String(index + 1).padStart(2, '0')}`,
  role: 'Esteemed Faculty · Profile Preview',
  photo: `assets/faculty-${String(index + 1).padStart(2, '0')}.svg`,
}));

/* Example replacement:
FACULTY[0] = {
  name: 'Dr. Actual Faculty Name',
  role: 'Professor, Department of Computer Applications',
  photo: 'assets/actual-faculty-photo.jpg'
};
*/

const PROGRAMME = [
  {
    time: '10:00 AM – 10:30 AM', duration: '30 MIN', tag: 'ACT I', category: 'WELCOME & SEATING',
    title: 'Arrival & Batch Reception', icon: '✉',
    subtitle: 'The beginning of a beautiful day',
    description: 'Doors open at JRD Tata Hall. Badge collection, commemorative welcome kits, guest registration, and hall seating.',
    extras: ['Seating arrangements by batch', 'Door registration & wristbands'],
    notesTitle: 'Reception & seating notes',
    notes: ['Registration volunteers welcome students and faculty at the entrance.', 'Attendees collect badges and welcome kits before moving to their designated batch seating.', 'Please arrive in time for the ceremonial opening at 10:30 AM.']
  },
  {
    time: '10:30 AM – 10:45 AM', duration: '15 MIN', tag: 'ACT I', category: 'SACRED TRADITION', highlighted: true,
    title: 'Inaugural Lamp Lighting & Odissi Dance', icon: '❈',
    subtitle: 'Sacred invocation & classical cultural benediction',
    description: 'Auspicious Mangalacharan lamp lighting led by department dignitaries, followed by a revered classical Odissi performance welcoming new beginnings.',
    extras: ['Classical Odissi invocation recital', 'Dignitary lamp lighting ceremony'],
    notesTitle: 'Venue coordination note',
    notes: ['The traditional Odissi blessing troupe opens the stage.', 'Department dignitaries take part in the ceremonial lamp lighting.', 'All attendees are kindly requested to be seated by 10:25 AM.']
  },
  {
    time: '10:45 AM – 11:15 AM', duration: '30 MIN', tag: 'ACT I', category: 'LEADERSHIP SPEECHES',
    title: 'Welcome Addresses & Faculty Blessings', icon: '✧',
    subtitle: 'Words of wisdom for a new chapter',
    description: 'Inspiring opening addresses and words of wisdom from esteemed MCA faculty heads, management directors, and the senior organising council.',
    extras: ['Senior council presidential address', 'Inspirational faculty keynotes'],
    notesTitle: 'Address sequence',
    notes: ['Welcome address by department representatives.', 'Inspirational remarks and blessings from MCA faculty heads and senior leadership.', 'Programme coordinators guide the transition to the next segment.']
  },
  {
    time: '11:15 AM – 11:45 AM', duration: '30 MIN', tag: 'INTERLUDE', category: 'REFRESHMENT PRELUDE', interlude: true,
    title: 'Stage Reset & Refreshment Prelude', icon: '☕',
    subtitle: 'A moment to refresh and reconnect',
    description: 'A short transition as the stage is prepared for the freshers’ spotlight and guests enjoy a refreshment interval.',
    extras: ['Stage preparations', 'Refreshment interval'],
    notesTitle: 'Transition notes',
    notes: ['Stage coordinators prepare for the incoming batch introductions.', 'Attendees may use the interval to refresh and reconnect.', 'Please return for the 11:45 AM spotlight.']
  },
  {
    time: '11:45 AM – 12:00 PM', duration: '15 MIN', tag: 'ACT II', category: 'BATCH SPOTLIGHT',
    title: 'Introduction of the Freshers', icon: '✦',
    subtitle: 'Welcoming the Incoming MCA Batch (2026–2028)',
    description: 'The spotlight shines on the incoming juniors. First official stage introductions to fellow batchmates, faculty mentors, and senior leaders.',
    extras: ['Official batch welcome cheers', 'Junior cohort stage roll-call'],
    notesTitle: 'Freshers spotlight notes',
    notes: ['Incoming MCA students receive their first collective welcome.', 'Batch representatives and presenters facilitate the stage introductions.', 'Seniors and faculty celebrate the class of 2026–2028.']
  },
  {
    time: '12:00 PM – 12:45 PM', duration: '45 MIN', tag: 'ACT II', category: 'NEXT ON STAGE', pending: true,
    title: 'The Celebration Continues', icon: '☆',
    subtitle: 'More moments await...',
    description: 'This time slot is reserved in the shared programme. The organisers will confirm the activity and stage details.',
    extras: ['Full segment details to be announced'],
    notesTitle: 'Programme update',
    notes: ['The activity scheduled from 12:00 PM to 12:45 PM has not yet been specified.', 'Update this item after the organising team confirms the programme.']
  }
];

/* 3D CSS cylinder: the CSS keyframe animation rotates continuously; JavaScript
   positions the 22 faces, lets visitors seek through animation time and updates
   the featured faculty details. */
const ring = document.getElementById('facultyCylinder');
const stage = document.getElementById('carouselStage');
const nameOutput = document.getElementById('focusName');
const roleOutput = document.getElementById('focusRole');
const numberOutput = document.getElementById('focusNumber');
const pauseButton = document.getElementById('carouselPause');
const duration = 110000; // keep this in sync with CSS animation duration
const fraction = duration / FACULTY.length;
let carouselPaused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let focusedIndex = 0;

function radiusForWidth() {
  return window.innerWidth <= 650 ? 410 : window.innerWidth <= 880 ? 510 : 580;
}
function populateCylinder() {
  FACULTY.forEach((faculty, index) => {
    const card = document.createElement('div');
    card.className = 'teacher-card';
    card.dataset.index = String(index);
    card.setAttribute('aria-label', faculty.name);
    const safeName = document.createElement('div');
    safeName.className = 'teacher-card-name';
    safeName.textContent = faculty.name;
    const safeRole = document.createElement('div');
    safeRole.className = 'teacher-card-role';
    safeRole.textContent = faculty.role.split(' · ')[0];
    const imageWrap = document.createElement('div');
    imageWrap.className = 'teacher-image-wrap';
    const image = document.createElement('img');
    image.className = 'teacher-photo';
    image.src = faculty.photo;
    image.alt = `Illustrated demo portrait for ${faculty.name}`;
    image.loading = 'eager';
    image.onerror = () => { image.onerror = null; image.src = 'assets/faculty-01.svg'; };
    imageWrap.appendChild(image);
    card.append(imageWrap, safeName, safeRole);
    ring.appendChild(card);
  });
  positionCards();
  ring.classList.toggle('is-paused', carouselPaused);
  updatePauseLabel();
}
function positionCards() {
  const radius = radiusForWidth();
  Array.from(ring.children).forEach((card, index) => {
    card.style.transform = `rotateY(${index * 360 / FACULTY.length}deg) translateZ(${radius}px)`;
  });
}
function activeAnimation() { return ring.getAnimations().find(animation => animation.effect); }
function updateFocus(index) {
  const normalised = (index % FACULTY.length + FACULTY.length) % FACULTY.length;
  if (normalised === focusedIndex && nameOutput.textContent === FACULTY[normalised].name) return;
  focusedIndex = normalised;
  nameOutput.textContent = FACULTY[normalised].name;
  roleOutput.textContent = FACULTY[normalised].role;
  numberOutput.textContent = String(normalised + 1).padStart(2, '0');
}
function currentStep() {
  const animation = activeAnimation();
  if (!animation || animation.currentTime == null) return 0;
  const currentTime = Number(animation.currentTime) % duration;
  return Math.round(currentTime / fraction) % FACULTY.length;
}
function setCurrentStep(index) {
  const animation = activeAnimation();
  if (!animation) return;
  const indexWrapped = (index + FACULTY.length) % FACULTY.length;
  animation.currentTime = indexWrapped * fraction;
  updateFocus(indexWrapped);
}
function stepCarousel(delta) { setCurrentStep(currentStep() + delta); }
function updatePauseLabel() {
  pauseButton.setAttribute('aria-pressed', String(carouselPaused));
  pauseButton.setAttribute('aria-label', carouselPaused ? 'Play carousel' : 'Pause carousel');
  pauseButton.innerHTML = carouselPaused ? '▶ <span>Play</span>' : 'Ⅱ <span>Pause</span>';
}
function toggleCarouselPause(force) {
  carouselPaused = typeof force === 'boolean' ? force : !carouselPaused;
  ring.classList.toggle('is-paused', carouselPaused);
  updatePauseLabel();
}
document.getElementById('carouselPrev').addEventListener('click', () => stepCarousel(-1));
document.getElementById('carouselNext').addEventListener('click', () => stepCarousel(1));
pauseButton.addEventListener('click', () => toggleCarouselPause());
stage.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    stepCarousel(event.key === 'ArrowRight' ? 1 : -1);
  }
  if (event.code === 'Space') { event.preventDefault(); toggleCarouselPause(); }
});
let dragStartX = null;
stage.addEventListener('pointerdown', event => {
  if (event.pointerType === 'mouse' && event.button !== 0) return;
  dragStartX = event.clientX;
});
stage.addEventListener('pointerup', event => {
  if (dragStartX === null) return;
  const delta = event.clientX - dragStartX;
  if (Math.abs(delta) > 25) {
    const steps = Math.min(5, Math.max(1, Math.round(Math.abs(delta) / 90)));
    stepCarousel(delta < 0 ? steps : -steps);
  }
  dragStartX = null;
});
stage.addEventListener('pointercancel', () => { dragStartX = null; });
window.addEventListener('resize', positionCards, {passive:true});
setInterval(() => updateFocus(currentStep()), 190);
populateCylinder();

/* Programme accordion */
const timeline = document.getElementById('programmeTimeline');
function buildProgramme() {
  PROGRAMME.forEach((entry, index) => {
    const item = document.createElement('article');
    item.className = `agenda-item${entry.highlighted ? ' is-highlighted' : ''}${entry.interlude ? ' is-interlude' : ''}${entry.pending ? ' is-pending' : ''}`;
    const notesId = `agenda-notes-${index}`;
    item.innerHTML = `
      <div class="agenda-time"><span class="time-icon" aria-hidden="true">◷</span><span class="hours">${entry.time}</span><span class="duration">${entry.duration}</span></div>
      <div class="agenda-tick" aria-hidden="true"></div>
      <div class="agenda-panel">
        <div class="agenda-main">
          <div class="agenda-content">
            <div class="agenda-overline"><span class="act-tag">${entry.tag}</span>${entry.category}</div>
            <h3>${entry.title}</h3><p class="agenda-subtitle">${entry.subtitle}</p>
            <p class="agenda-description">${entry.description}</p>
            <div class="agenda-extra">${entry.extras.map(extra => `<span>+ ${extra}</span>`).join('')}</div>
            <button type="button" class="notes-toggle" aria-controls="${notesId}" aria-expanded="false">View event notes <span aria-hidden="true">⌄</span></button>
          </div>
          <span class="agenda-icon" aria-hidden="true">${entry.icon}</span>
        </div>
        <div class="agenda-notes" id="${notesId}" hidden><strong>${entry.notesTitle.toUpperCase()}</strong><ul>${entry.notes.map(note => `<li>${note}</li>`).join('')}</ul></div>
      </div>`;
    const button = item.querySelector('.notes-toggle');
    const details = item.querySelector('.agenda-notes');
    button.addEventListener('click', () => setNoteExpanded(item, details, button, details.hidden));
    timeline.appendChild(item);
  });
}
function setNoteExpanded(item, details, button, expanded) {
  details.hidden = !expanded;
  item.classList.toggle('is-open', expanded);
  button.setAttribute('aria-expanded', String(expanded));
  button.innerHTML = `${expanded ? 'Hide' : 'View'} event notes <span aria-hidden="true">⌄</span>`;
}
const allNotesButton = document.getElementById('expandAll');
allNotesButton.addEventListener('click', () => {
  const items = [...timeline.querySelectorAll('.agenda-item')];
  const shouldExpand = items.some(item => !item.classList.contains('is-open'));
  items.forEach(item => setNoteExpanded(item, item.querySelector('.agenda-notes'), item.querySelector('.notes-toggle'), shouldExpand));
  allNotesButton.innerHTML = `${shouldExpand ? 'Collapse' : 'Expand'} all notes <span aria-hidden="true">⌄</span>`;
});
buildProgramme();

/* Personalised invitation modal */
const modal = document.getElementById('invitationModal');
const recipient = document.getElementById('modalRecipient');
const feedback = document.getElementById('modalFeedback');
let priorFocus = null;
function openInvitation(personal = false) {
  priorFocus = document.activeElement;
  recipient.textContent = personal ? `To ${FACULTY[focusedIndex].name}` : 'To Our Esteemed Faculty';
  feedback.textContent = '';
  modal.hidden = false;
  document.body.classList.add('modal-open');
  document.querySelector('.modal-close').focus();
}
function closeInvitation() {
  modal.hidden = true;
  document.body.classList.remove('modal-open');
  if (priorFocus && typeof priorFocus.focus === 'function') priorFocus.focus();
}
['navInvite','heroInvite','sectionInvite','mobileInvite'].forEach(id => document.getElementById(id).addEventListener('click', () => openInvitation(false)));
document.getElementById('facultyInvite').addEventListener('click', () => openInvitation(true));
modal.querySelectorAll('[data-close-modal]').forEach(element => element.addEventListener('click', closeInvitation));
document.addEventListener('keydown', event => {
  if (modal.hidden) return;
  if (event.key === 'Escape') closeInvitation();
  if (event.key === 'Tab') {
    const targets = [...modal.querySelectorAll('button:not([disabled])')];
    if (event.shiftKey && document.activeElement === targets[0]) { event.preventDefault(); targets[targets.length-1].focus(); }
    else if (!event.shiftKey && document.activeElement === targets[targets.length-1]) { event.preventDefault(); targets[0].focus(); }
  }
});
function invitationText() {
  return `${recipient.textContent}\n\nTEJAS ’26 — The Fresh Bloom\n\nWith great respect, joy and heartfelt gratitude, the Department of Computer Applications, Srusti Academy of Management & Technology, cordially invites you to join the Freshers’ celebration welcoming the MCA Batch of 2026–2028. Your presence and blessings will make this new beginning truly memorable.\n\nVenue: JRD Tata Hall\nTime: 10:00 AM onwards\nDate: To be announced by the organisers\n\nWarmly,\nThe TEJAS ’26 Organising Team`;
}
document.getElementById('copyInvite').addEventListener('click', async () => {
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(invitationText());
    feedback.textContent = 'Invitation copied to your clipboard.';
  } catch {
    const temp = document.createElement('textarea');
    temp.value = invitationText();temp.style.position='fixed';temp.style.opacity='0';document.body.appendChild(temp);temp.select();
    const succeeded = document.execCommand('copy');temp.remove();
    feedback.textContent = succeeded ? 'Invitation copied to your clipboard.' : 'Select and copy the invitation text manually.';
  }
});
document.getElementById('printInvite').addEventListener('click', () => window.print());

/* Mobile menu, scroll effects */
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
function closeMenu(){mobileNav.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Open menu');}
menuToggle.addEventListener('click', () => {const next=mobileNav.hidden;mobileNav.hidden=!next;menuToggle.setAttribute('aria-expanded',String(next));menuToggle.setAttribute('aria-label',next?'Close menu':'Open menu');});
mobileNav.querySelectorAll('a,button').forEach(element => element.addEventListener('click', closeMenu));
const progress = document.getElementById('scrollProgress');
function updateScroll() {
  const maximum = document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width = `${maximum > 0 ? (window.scrollY/maximum)*100 : 0}%`;
}
window.addEventListener('scroll', updateScroll, {passive:true});updateScroll();
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {if (entry.isIntersecting) {entry.target.classList.add('is-revealed');revealObserver.unobserve(entry.target);}});
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
  const sections = [...document.querySelectorAll('main section[id]')];
  const navObserver = new IntersectionObserver(entries => {
    entries.filter(e=>e.isIntersecting).forEach(entry=>{
      document.querySelectorAll('.nav-link').forEach(link=>link.classList.toggle('is-active',link.getAttribute('href')===`#${entry.target.id}`));
    });
  }, {rootMargin:'-20% 0px -65% 0px'});
  sections.forEach(section=>navObserver.observe(section));
} else document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-revealed'));
