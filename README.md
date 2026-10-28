# TEJAS ’26 — The Fresh Bloom

Responsive MCA freshers’ celebration website for Srusti Academy of Management & Technology, based on the supplied cream, maroon, and gold design.

**30 October 2026 · JRD Tata Hall**

## Run

Run the local preview with Node.js 18 or newer:

```sh
npm start
```

Open <http://localhost:5176>. No dependency installation or build step is required. Set the `PORT` environment variable if the default port is occupied. The preview server binds only to the local machine; it is not a production server.

## Maintained project structure

```text
index.html                    Semantic page and accessible native dialogs
invitation.html               Personal invitation preview and download
assets/
  css/styles.css              Design tokens, components, responsive and print styles
  css/invitation.css          Personal invitation and name form
  css/entrance.css            Shared loading screen and split-door animation
  css/soundtrack.css          Responsive music control, including inside dialogs
  js/app.js                   Welcome intro, carousel, directory, dialogs and agenda
  js/invitation.js            Recipient selection, preview and download
  js/invitation-renderer.js   Shared artwork for the preview and downloaded PNG
  js/entrance.js              Asset readiness, door opening and form sequencing
  js/soundtrack.js            Shared looping soundtrack and music preference
  audio/tejas-soundtrack.mp3   Supplied soundtrack, copied without modification
  js/faculty-match.js         Faculty name matching, shared with verification tests
  images/                     Optimized WebP presentation assets
  tejas-2026.ics               Date-only calendar reminder, without event times
  IMAGE_SOURCES.md             Image provenance and generation prompts
data/
  event.js                    Programme data and confirmed event metadata
  faculty.js                  Generated browser data for faculty and leadership
scripts/
  serve.mjs                   Dependency-free local preview server
  sync-faculty.mjs             Generates browser data from the source directory
tests/project.test.mjs        Data accuracy, agenda, calendar and asset checks
Faculty_Members/              Original faculty records and portraits (preserved)
FacultyGroup/                 Original group photographs (preserved)
TEJAS26_Website/index.html    Redirect for the earlier website URL
archive/                     Earlier implementations, retained for recovery
artifacts/                   Local QA screenshots and reports (ignored by Git)
```

The remaining original media under `assets/` is retained as source material. The live page uses `assets/images/`. The root `index.html` is the main event website. `invitation.html` is the personal invitation page; archived prototypes are not part of the live page. The main website can also be viewed as a local file, but photo downloads require the HTTP preview above because browsers restrict exporting images loaded from local files.

## Welcome and personal invitation

The main page starts with a short loading animation while fonts and decorative artwork become ready, then a burgundy seal labelled “Tap to open.” The ivory doors slide fully off screen before the name form appears. Slow assets have a bounded fallback, and reduced-motion preferences skip the sliding animation. Enter and Space activate the seal; Escape also opens the doors when ready.

Entering a teacher's name opens the home page at the top and centres their portrait in the faculty gallery. “Your Invitation” in the navigation and “Open your invitation” below the gallery open a separate invitation for that teacher. Browsing other carousel portraits does not change the invitation recipient. Returning home preserves the recipient without repeating the doors or name form. An explicit `#faculty` link still scrolls to the gallery.

The ivory, burgundy and gold invitation includes the selected teacher's original portrait, name, designation, a message of appreciation and the confirmed event details. The preview and downloaded 1500 × 2100 PNG use exactly the same artwork. “Print / Save PDF” opens the browser's print dialog with an A4 layout; “Save the date” downloads the event calendar file. The header allows changing the recipient, and failed portrait loads show a retry button instead of offering an incomplete download.

Links carry only the faculty record's public numeric ID (`?teacher=16`, for example); names are not stored in browser storage or sent to a registration service. The home URL retains this ID for refresh and return visits within the flow. Guest entry remains available on the home page. Guests choose a faculty recipient before generating a photo invitation. Opening `invitation.html` without a recipient redirects to the main entrance.

## Soundtrack

The supplied `soundtrack..mp3` is preserved at the project root and copied unchanged to `assets/audio/tejas-soundtrack.mp3`. It plays on a loop at a gentle initial volume when the visitor taps the home page's entrance seal. The music control can start or silence it at any time, including inside the name and profile dialogs. It stays silent before the first interaction, and a failed or blocked playback attempt leaves a visible retry/play control without interrupting entry.

Music preference and playback position are kept in this browser tab's session storage where available. Moving between the home and invitation pages attempts to resume at the saved position; browsers that require a fresh interaction show “Play music.” Opening a page directly without a saved playback preference waits for the seal or music button. Muting also pauses the track, so it resumes from the same point.

## Content and accuracy

- Faculty and leadership profiles come from `Faculty_Members/faculty_list.json`. The original records were cross-checked against `22 faculty members shown.docx`. Dr. Susmita Parija (former ID 6) was removed from the active directory at the project owner's request on 16 October 2026. Other profile IDs are preserved; the removed ID is not reused.
- Namrata Sahoo (Deputy Director – Strategy, ID 23) and Er. Saroj K. Sahoo (Chairman, ID 24) were added from the project owner's names, titles and photographs supplied on 16 October 2026. Their photographs are preserved unchanged. No email addresses were supplied, so their profiles omit email links.
- Soumya Ranjan Swain (Assistant Professor, ID 25) was added from the project owner's supplied name, title and photograph on 16 October 2026. His original portrait is preserved and no email address is invented.
- Saurav Kumar Pati (Assistant Professor, ID 28) has his verified original photograph replacing the earlier image. Madhusmita Nayak (Assistant Professor, ID 30), Sahil Satpaty (Assistant Professor, ID 31), and Hemant Pattanaik (Assistant Professor, ID 32) were added on 28 October 2026 with their supplied original portraits.
- Display-only role corrections are `Trainning` → `Training`, `Vice- Principal` → `Vice-Principal`, and `FIC-placement` → `FIC-Placement`. Source records remain unchanged.
- The project owner confirmed **30 October 2026** and supplied the ten-item agenda: introduction of freshers and song, fun games, solo performance, group/duo dance, games, solo performances, games, mimicry, freshers’ title announcement, and vote of thanks. Game names follow the supplied list, with spelling and punctuation tidied.
- Event times and activity durations are intentionally unpublished. The home page, profiles, invitation artwork, accessible invitation description and calendar download omit them. The calendar is a transparent date-only reminder for 30 October; its exclusive end date is 31 October.
- Agenda artwork is decorative; it does not claim to show confirmed performers. The faculty group photograph and faculty portraits are the supplied originals.

Update the canonical JSON and run `npm run sync:faculty` to refresh faculty data. Edit `data/event.js` for the ordered agenda. If the date or venue changes, also update the corresponding page text and calendar file; `npm run check` checks the current confirmed details and absence of published event times.

## Interactions and accessibility

- After the doors open, the welcome screen accepts a teacher’s first or full name, ignoring letter case and honorifics. Ambiguous names offer choices; unknown names never select a different teacher. Guests can continue without entering a name.
- Entering with a matching name centers that teacher’s portrait and displays a personal welcome. Their portrait stays centered for eight seconds before rotation begins. The loading message follows image readiness, with a bounded fallback for slow images. Names are not stored or sent to a server.
- Desktop uses the curved gallery with automatic rotation and no carousel buttons. At 800 pixels and below, the gallery becomes a flat portrait slider with swipe navigation and a play/pause control.
- Left/right arrow keys, Home/End, and horizontal swipes browse every faculty member with wraparound. With the carousel region focused, Space pauses or resumes rotation.
- Select a side portrait to center it, then select the center portrait to open its profile. Profiles include the source email address when supplied.
- Search the faculty directory by name or designation. Native dialogs support Escape, focus containment, focus restoration, and backdrop dismissal.
- Auto-play starts after the intro and pauses while the carousel is hovered, focused, off screen, a dialog is open, or the page is hidden. Reduced-motion settings remove transitions and prevent automatic start; manual navigation still works.
- Visible faculty counts have been removed. Active faculty profiles are available under “Esteemed Teachers.”
- The full faculty group photograph appears between the teacher gallery and the agenda. Its original proportions preserve everyone in the frame on desktop and mobile. The image and “View full-size photo” link open the original photograph in a new tab for closer viewing.
- The agenda presents the ten activities in order, numbered 01–10, with the game names visible. Navigation anchors, direct agenda links, and the date-only calendar download work locally.
- Layouts adapt down to 320 CSS pixels. Semantic headings, visible keyboard focus, and a skip link are provided.

Google Fonts is the only external presentation dependency; local serif, cursive, and sans-serif fallbacks are configured. Page content, photographs, and interactions are local. No analytics, registration backend, or third-party scripts are included.

## Verify

```sh
npm run check
```

Checks validate name matching (including ambiguity and unknown names), all faculty records and photos, the ten agenda items and their order, the date-only calendar, absence of published event times, local assets, and JavaScript syntax. Browser QA covers the intro, personalized centering, automatic rotation, desktop/mobile layouts, faculty navigation, search, profile dialogs, agenda, calendar download, and the home-to-invitation flow. Invitation checks cover actual PNG downloads, every supplied portrait, long names, recipient changes, invalid links, and portrait failure/retry. See local reports under `artifacts/`.

## Earlier versions

`archive/pre-redesign/` preserves the previous root source. `archive/legacy-website/` preserves the earlier standalone prototype, including its demo profiles. They are historical snapshots, not current content. The old `TEJAS26_Website/` entry point redirects to the root website.
