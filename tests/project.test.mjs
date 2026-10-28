import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import vm from 'node:vm';
const root = new URL('../', import.meta.url);
const window = {};
const context = vm.createContext({ window });
for (const name of ['faculty', 'event']) vm.runInContext(await readFile(new URL(`data/${name}.js`, root), 'utf8'), context);
const faculty = window.TEJAS_FACULTY;
const event = window.TEJAS_EVENT;
vm.runInContext(await readFile(new URL('assets/js/faculty-match.js', root), 'utf8'), context);

test('Welcome resolves every full faculty name, ignoring titles and letter case', () => {
  for (const person of faculty) {
    const matches = window.TEJAS_NAMES.findMatches(person.name, faculty);
    assert.equal(matches.length, 1);
    assert.equal(matches[0].id, person.id);
  }
  assert.equal(window.TEJAS_NAMES.findMatches('  ANURADHA   MISHRA ', faculty)[0].name, 'Dr. Anuradha Mishra');
  assert.equal(window.TEJAS_NAMES.findMatches('Prof. Pragyan Parimita Sarangi', faculty)[0].name, 'Dr. Pragyan Parimita Sarangi');
});

test('Welcome leaves ambiguous and unknown names unresolved instead of guessing', () => {
  assert.equal(window.TEJAS_NAMES.findMatches('Mishra', faculty).length, 3);
  assert.ok(window.TEJAS_NAMES.findMatches('Kumar', faculty).length > 1);
  for (const input of ['', ' ', 'x', 'Not A Faculty Name', '<script>alert(1)</script>']) {
    assert.equal(window.TEJAS_NAMES.findMatches(input, faculty).length, 0);
  }
});
test('All profiles retain source names, emails, roles and portrait paths', async () => {
  const source = JSON.parse(await readFile(new URL('Faculty_Members/faculty_list.json', root), 'utf8'));
  assert.equal(faculty.length, source.length);
  assert.deepEqual(Array.from(faculty.filter(person => person.id >= 1 && person.id <= 22), person => person.id), Array.from({length:22}, (_, index) => index + 1).filter(id => id !== 6));
  assert.equal(new Set(faculty.map(person => person.id)).size, faculty.length);
  for (const person of faculty) {
    const original = source.find(item => item.id === person.id);
    assert.equal(person.name, original.name); assert.equal(person.email, original.email);
    assert.equal(person.role, original.designation.replace('Vice- Principal', 'Vice-Principal').replace('Trainning', 'Training').replace('FIC-placement', 'FIC-Placement'));
    assert.equal(person.photo, `Faculty_Members/${original.relative_paths.original_photo}`);
    await access(new URL(person.photo, root));
  }
});
test('Removed teacher cannot be found or selected by the former profile ID', async () => {
  assert.equal(faculty.some(person => person.id === 6), false);
  for (const query of ['Susmita Parija', 'Dr. Susmita Parija', 'Dr.Susmita Parijha', 'Parija']) {
    assert.equal(window.TEJAS_NAMES.findMatches(query, faculty).length, 0);
  }
  const csv = await readFile(new URL('Faculty_Members/faculty_list.csv', root), 'utf8');
  assert.doesNotMatch(csv, /Parija|drsusmita|^6,/im);
});
test('Newly added and updated teachers (Monalisa Chakrabarty, Sashikanta Sethi, Saurav Kumar Pati, Susmita Barala, Madhusmita Nayak, Sahil Satpaty) resolve unambiguously', () => {
  for (const query of ['Dr. Monalisa Chakrabarty', 'Monalisa Chakrabarty', 'Monalisa', 'Chakrabarty']) {
    const matches = window.TEJAS_NAMES.findMatches(query, faculty);
    assert.equal(matches.length, 1);
    assert.equal(matches[0].id, 26);
  }
  for (const query of ['Mr. Sashikanta Sethi', 'Sashikanta Sethi', 'Sashikanta', 'Sethi']) {
    const matches = window.TEJAS_NAMES.findMatches(query, faculty);
    assert.equal(matches.length, 1);
    assert.equal(matches[0].id, 27);
  }
  for (const query of ['Saurav Kumar Pati', 'Saurav Pati', 'Saurav Sir', 'Mr. Saurav', 'Saurav', 'Pati']) {
    const matches = window.TEJAS_NAMES.findMatches(query, faculty);
    assert.equal(matches.length, 1);
    assert.equal(matches[0].id, 28);
  }
  for (const query of ['Mrs. Susmita Barala', 'Susmita Barala', 'Susmita Baral', 'Barala', 'Baral']) {
    const matches = window.TEJAS_NAMES.findMatches(query, faculty);
    assert.equal(matches.length, 1);
    assert.equal(matches[0].id, 29);
  }
  for (const query of ['Madhusmita Nayak', 'Madhusmita', 'Nayak', 'Ms. Madhusmita Nayak', 'Madhusmita Ma’am']) {
    const matches = window.TEJAS_NAMES.findMatches(query, faculty);
    assert.equal(matches.length, 1);
    assert.equal(matches[0].id, 30);
  }
  for (const query of ['Sahil Satpaty', 'Sahil', 'Satpaty', 'Sahil Satpathy', 'Satpathy', 'Mr. Sahil Satpaty']) {
    const matches = window.TEJAS_NAMES.findMatches(query, faculty);
    assert.equal(matches.length, 1);
    assert.equal(matches[0].id, 31);
  }
});
test('Leadership names resolve unambiguously and retain the supplied titles without invented emails', () => {
  const namrata = window.TEJAS_NAMES.findMatches('Namrata Sahoo', faculty);
  assert.equal(namrata.length, 1);
  assert.equal(namrata[0].id, 23);
  assert.equal(namrata[0].role, 'Deputy Director – Strategy');
  assert.equal(namrata[0].email, '');
  for (const query of ['Er. Saroj K. Sahoo', 'Saroj', 'Saroj K Sahoo', 'ER SAROJ K SAHOO']) {
    const chairman = window.TEJAS_NAMES.findMatches(query, faculty);
    assert.equal(chairman.length, 1);
    assert.equal(chairman[0].id, 24);
    assert.equal(chairman[0].name, 'Er. Saroj K. Sahoo');
    assert.equal(chairman[0].role, 'Chairman');
    assert.equal(chairman[0].email, '');
  }
  assert.equal(window.TEJAS_NAMES.findMatches('Sahoo', faculty).length, 2);
  assert.equal(window.TEJAS_NAMES.findMatches('Er.', faculty).length, 0);
});
test('Soumya Ranjan Swain resolves to the supplied Assistant Professor profile', () => {
  for (const query of ['Soumya', 'Soumya Ranjan Swain', 'SOUMYA RANJAN SWAIN', 'Mr. Soumya Ranjan Swain']) {
    const matches = window.TEJAS_NAMES.findMatches(query, faculty);
    assert.equal(matches.length, 1);
    assert.equal(matches[0].id, 25);
    assert.equal(matches[0].name, 'Soumya Ranjan Swain');
    assert.equal(matches[0].role, 'Assistant Professor');
    assert.equal(matches[0].email, '');
  }
  assert.equal(window.TEJAS_NAMES.findMatches('Swain', faculty).length, 2);
});
test('The ten agenda items follow the confirmed celebration programme design without times or durations', async () => {
  assert.deepEqual(Array.from(event.programme, entry => entry.title), [
    'Welcome', 'Fun Games', 'Solo Performance', 'Group / Duo Performance',
    'Games', 'Solo Performance', 'Games', 'Mimicry', 'Freshers’ Title Announcement', 'Vote of Thanks'
  ]);
  assert.equal(new Set(event.programme.map(entry => entry.id)).size, 10);
  assert.equal(event.date, '2026-10-30'); assert.equal(event.timezone, 'Asia/Kolkata');
  assert.equal(event.programme[0].subtitle, 'Introduction of Freshers & Song');
  for (const entry of event.programme) {
    for (const field of ['time', 'timeStart', 'timeEnd', 'start', 'end', 'duration']) {
      assert.equal(Object.hasOwn(entry, field), false);
    }
  }
});
test('Calendar saves only the confirmed date and venue without a timed appointment', async () => {
  const calendar = await readFile(new URL('assets/tejas-2026.ics', root), 'utf8');
  assert.match(calendar, /DTSTART;VALUE=DATE:20261030/); assert.match(calendar, /DTEND;VALUE=DATE:20261031/);
  assert.doesNotMatch(calendar, /(?:DTSTART|DTEND)[^\r\n]*T\d{6}/);
  assert.match(calendar, /TRANSP:TRANSPARENT/);
  assert.match(calendar, /LOCATION:JRD Tata Hall/); assert.match(calendar, /BEGIN:VEVENT/); assert.match(calendar, /END:VCALENDAR/);
});
test('Live pages and invitation artwork contain confirmed event schedule without stale morning instructions', async () => {
  for (const path of ['index.html', 'invitation.html', 'data/event.js', 'assets/js/invitation.js', 'assets/js/invitation-renderer.js', 'assets/tejas-2026.ics']) {
    const content = await readFile(new URL(path, root), 'utf8');
    assert.doesNotMatch(content, /\b(?:morning|be seated by)\b|THE TIME|\b(?:9|10)[:.]\d{2}\s*(?:AM|PM)\b/i, path);
  }
  assert.equal(event.mainEventTime, '12:00 PM onwards');
  assert.equal(event.lunchTime, '12:30 PM');
  assert.equal(event.posterRevealDate, '2026-10-28');
  assert.equal(event.posterRevealTime, '4:00 PM');
});
test('Page local scripts, stylesheet, favicon and downloads exist', async () => {
  const html = await readFile(new URL('index.html', root), 'utf8');
  const urls = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map(match => match[1]).filter(url => !/^(https?:|mailto:)/.test(url));
  for (const url of urls) await access(new URL(url, root));
  assert.doesNotMatch(html, /onclick=|<style>/);
});

test('True Inspire atelier plaque links to official portfolio URL', async () => {
  for (const path of ['index.html', 'invitation.html']) {
    const html = await readFile(new URL(path, root), 'utf8');
    assert.match(html, /<a\s+class="atelier-plaque"[^>]*href="https:\/\/true-inspires\.vercel\.app\/"/);
    assert.match(html, /Design &amp; Developed by True Inspire/);
  }
});
