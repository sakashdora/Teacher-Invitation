# TEJAS ’26 — The Fresh Bloom

A responsive, premium-themed faculty invitation and programme website for Srusti Academy of Management & Technology, Department of Computer Applications.

## Run the website

Open `index.html` in a modern browser (Chrome, Edge, Firefox or Safari). A local server is optional; for example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Features

- Burgundy, ivory and metallic-gold visual theme inspired by the TEJAS banner
- Infinite CSS 3D cylinder with 22 distinct editable faculty profiles
- Pause / play, next / previous, touch-drag, and keyboard arrow controls
- Editable names, job titles, and portrait images
- Faculty-personalised invitation overlay; copy invitation or print it
- Event schedule with 6 agenda blocks, expanded notes, and expand-all button
- Mobile-friendly navigation, scroll progress, accessible focus states, reduced-motion support
- Fully functional without a JavaScript framework or build pipeline

## Replace the 22 sample faculty profiles

In `script.js` near the top, replace the sample `FACULTY` entries with real faculty names and portraits. Keep a total of **22 objects**. For example:

```javascript
const FACULTY = [
  { name: 'Dr. Actual Name', role: 'Professor & HOD', photo: 'assets/dr-actual-name.jpg' },
  // ... add 21 more faculty objects
];
```

Place the real portraits in the `assets` folder. For best results, use portrait-oriented photos (recommended 3:4 ratio, at least 450 × 600 px). The included `faculty-01.svg` through `faculty-22.svg` are **illustrated demo placeholders and are not actual teacher photographs**.

## Edit event details

Modify the `PROGRAMME` array in `script.js`. The 12:00 PM–12:45 PM slot is intentionally labelled "The Celebration Continues" until the organisers provide its specific activity. The event date is likewise left unannounced rather than guessed.

## Included files

- `index.html` — page structure and printable invitation modal
- `styles.css` — colours, responsive layout, rotating CSS 3D cylinder
- `script.js` — faculty data, carousel controls, invitation interaction, agenda
- `assets/tejas-banner.webp` — TEJAS visual identity
- `assets/faculty-01.svg` to `faculty-22.svg` — synthetic portrait placeholders
- `assets/favicon.svg` — matching tab icon
