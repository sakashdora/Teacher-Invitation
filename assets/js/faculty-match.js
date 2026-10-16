/* Name matching is shared by the welcome form and the data verification tests. */
(() => {
  'use strict';
  const normalize = value => String(value)
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLocaleLowerCase('en-IN')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .trim()
    .replace(/^(?:(?:dr|doctor|prof|professor|mr|mrs|ms|er)\s+)+/, '')
    .replace(/\s+/g, ' ');

  function findMatches(query, records) {
    const name = normalize(query);
    if (name.length < 2) return [];
    const exact = records.filter(person => normalize(person.name) === name);
    if (exact.length) return exact;
    const words = name.split(' ');
    return records.filter(person => {
      const candidate = normalize(person.name).split(' ');
      return words.every(word => candidate.some(part => part.startsWith(word)));
    });
  }
  window.TEJAS_NAMES = { findMatches };
})();
