import { readFile, writeFile, access } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const records = JSON.parse(await readFile(new URL('Faculty_Members/faculty_list.json', root), 'utf8'));
if (records.length !== 22 || new Set(records.map(item => item.id)).size !== 22) throw new Error('Expected 22 unique faculty records.');
const faculty = await Promise.all(records.map(async item => {
  const photo = `Faculty_Members/${item.relative_paths.original_photo}`;
  await access(new URL(photo, root));
  return { id: item.id, name: item.name, role: item.designation.replace('Vice- Principal', 'Vice-Principal').replace('Trainning', 'Training').replace('FIC-placement', 'FIC-Placement'), email: item.email, photo };
}));
await writeFile(new URL('data/faculty.js', root), `/* Generated from Faculty_Members/faculty_list.json. Run npm run sync:faculty to update. */\nwindow.TEJAS_FACULTY = ${JSON.stringify(faculty, null, 2)};\n`);
console.log(`Synced ${faculty.length} faculty profiles.`);
