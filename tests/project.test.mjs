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
  assert.equal(window.TEJAS_NAMES.findMatches('Susmita', faculty)[0].name, 'Dr. Susmita Parija');
  assert.equal(window.TEJAS_NAMES.findMatches('Prof. Pragyan Parimita Sarangi', faculty)[0].name, 'Dr. Pragyan Parimita Sarangi');
});

test('Welcome leaves ambiguous and unknown names unresolved instead of guessing', () => {
  assert.equal(window.TEJAS_NAMES.findMatches('Mishra', faculty).length, 3);
  assert.ok(window.TEJAS_NAMES.findMatches('Kumar', faculty).length > 1);
  for (const input of ['', ' ', 'x', 'Not A Faculty Name', '<script>alert(1)</script>']) {
    assert.equal(window.TEJAS_NAMES.findMatches(input, faculty).length, 0);
  }
});
test('All 22 profiles retain source names, emails, roles and portrait paths', async () => {
  const source = JSON.parse(await readFile(new URL('Faculty_Members/faculty_list.json', root), 'utf8'));
  assert.equal(faculty.length, 22);
  assert.equal(new Set(faculty.map(person => person.id)).size, 22);
  for (const person of faculty) {
    const original = source.find(item => item.id === person.id);
    assert.equal(person.name, original.name); assert.equal(person.email, original.email);
    assert.equal(person.role, original.designation.replace('Vice- Principal', 'Vice-Principal').replace('Trainning', 'Training').replace('FIC-placement', 'FIC-Placement'));
    assert.equal(person.photo, `Faculty_Members/${original.relative_paths.original_photo}`);
    await access(new URL(person.photo, root));
  }
});
test('Six programme slots are continuous, with correct durations and local images', async () => {
  const minutes = time => { const [h, m] = time.split(':').map(Number); return h * 60 + m; };
  assert.equal(event.programme.length, 6);
  assert.equal(event.date, '2026-10-30'); assert.equal(event.timezone, 'Asia/Kolkata');
  assert.equal(event.programme[0].start, '10:00'); assert.equal(event.programme.at(-1).end, '12:45');
  for (const [index, entry] of event.programme.entries()) {
    assert.equal(minutes(entry.end) - minutes(entry.start), entry.duration);
    if (index > 0) assert.equal(event.programme[index - 1].end, entry.start);
    await access(new URL(entry.image, root));
  }
  assert.equal(event.programme.reduce((total, entry) => total + entry.duration, 0), 165);
});
test('Calendar download matches the confirmed date, venue and IST time range', async () => {
  const calendar = await readFile(new URL('assets/tejas-2026.ics', root), 'utf8');
  assert.match(calendar, /DTSTART:20261030T043000Z/); assert.match(calendar, /DTEND:20261030T071500Z/);
  assert.match(calendar, /LOCATION:JRD Tata Hall/); assert.match(calendar, /BEGIN:VEVENT/); assert.match(calendar, /END:VCALENDAR/);
});
test('Page local scripts, stylesheet, favicon and downloads exist', async () => {
  const html = await readFile(new URL('index.html', root), 'utf8');
  const urls = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map(match => match[1]).filter(url => !/^(https?:|mailto:)/.test(url));
  for (const url of urls) await access(new URL(url, root));
  assert.doesNotMatch(html, /onclick=|<style>/);
});
