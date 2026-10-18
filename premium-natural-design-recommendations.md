# DESIGN STRATEGY & SPECIFICATION: TEJAS 2026 — THE FRESH BLOOM
## Transforming the Digital Invitation into a Premium, Brand-Driven & Event-Specific Experience

**Event**: TEJAS 2026 — The Fresh Bloom  
**Institution**: Srusti Academy of Management & Technology, Bhubaneswar  
**Department**: Department of Computer Applications (MCA)  
**Target Audience**: Principal (Dr. Umakanta Dash), Chairman (Er. Saroj K. Sahoo), Vice-Principal (Dr. Pragyan Parimita Sarangi), Department HODs, Faculty Members, Incoming MCA Batch (2026–2028), and Honoured Guests  
**Design Leadership**: Senior Creative Director, Brand Identity Designer, UX Strategist, Motion Specialist & Frontend Architect  
**Document**: `premium-natural-design-recommendations.md` (Revised Master Plan)  

---

## 1. Executive Summary & Strategic Reset

This document supersedes all previous advisory iterations, establishing a definitive, high-ambition design strategy for the **TEJAS 2026 — The Fresh Bloom** digital invitation platform. 

### Why the Current Direction Scored ~6/10
An honest assessment of the current website reveals why it feels like an early 6/10 rather than a memorable institutional keepsake:
1. **Lack of a Distinctive Brand Identity**: The moniker *"TEJAS 2026 — The Fresh Bloom"* currently looks like any template-generated college event. It lacks a proprietary symbol, a disciplined lockup, and a cohesive motif. It borrowed French decorative flourishes (`❦`, `❧`) and generic floral asterisks (`❀`, `✦`) that have no connection to Srusti Academy, Bhubaneswar, or the MCA Department.
2. **Hidden and Incomplete Event Information**: Crucial event logistics—specifically the **Poster Reveal (28 October 2026, 4:00 PM)**, the **Main Event (30 October 2026, 12:00 PM onwards)**, the **Lunch Schedule (12:30 PM)**, and the **Venue (JRD Tata Hall)**—were previously absent or buried in generic paragraphs due to past test constraints. A real invitation must present these details with immediate clarity and architectural elegance.
3. **Severe Brand-Presentation Failure in the Footer**: The True Inspire branding asset (`true-inspire.jpeg`) is a complete 1024×1024 brand lockup containing a star-crested "TI" monogram, wordmark, and Devanagari slogan. By scaling this full poster down to a tiny 22×22px circle inside an off-white pill badge against a matching cream background, the typography and slogan became illegible micro-noise, the image borders dissolved, and the design credit lost all distinction.
4. **Typographic Incoherence**: Pairing classical academic *Cormorant Garamond* with the casual digital brush script *Alex Brush* gave the website the aesthetic of an entry-level wedding invitation, eroding institutional dignity.
5. **Interactive Double-Gating**: The split-door entrance with a glowing sci-fi seam cut, followed immediately by a blocking name-entry dialog, forced users through two barriers before they could even understand the event context.

### The Strategic Vision
We will **not** arbitrarily change the established background palette (`#fff7ed` / `#fffaf4`) or introduce gaudy effects to manufacture false luxury. Instead, we elevate the website through **high-craftsmanship editorial art direction, authentic tactile stationery physics, prominent event-schedule architecture, and a dedicated, high-contrast True Inspire signature block**.

---

## 2. Event Information Architecture & Schedule Integration

The website must communicate real, verified event details with unambiguous hierarchy. The schedule is structured across two distinct days:

```text
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                           TEJAS 2026 OFFICIAL EVENT SCHEDULE ARCHITECTURE                       │
├────────────────────────────────┬────────────────────────────────────────────────────────────────┤
│ MILESTONE 01: THE PRELUDE      │ MILESTONE 02: THE MAIN CELEBRATION                             │
│ The Official Poster Reveal     │ Freshers' Welcome, Formal Convocations & Cultural Events        │
├────────────────────────────────┼────────────────────────────────────────────────────────────────┤
│ 📅 Wednesday, 28 October 2026  │ 📅 Friday, 30 October 2026                                     │
│ ⏰ 4:00 PM                     │ ⏰ 12:00 PM Onwards                                            │
│ 📍 Campus / Digital Unveiling  │ 🍽️ 12:30 PM — Celebratory Lunch                                │
│                                │ 📍 JRD Tata Hall, Srusti Academy                               │
└────────────────────────────────┴────────────────────────────────────────────────────────────────┘
```

### UX Design Requirements for the Schedule
1. **Zero Ambiguity Between Dates**: The Poster Reveal (28 October) must be visually distinguished from the Main Event (30 October). It must not be confused as the start of the cultural celebration.
2. **Lunch Distinction**: The lunch timing (**12:30 PM**) must be clearly identified as part of the Friday main event, beginning 30 minutes after the 12:00 PM opening, rather than confusing faculty that the celebration begins with lunch or starts at 12:30 PM.
3. **Editorial Schedule Plaque (Not a SaaS Grid)**: Instead of generic software dashboard cards, the schedule will be integrated into the Hero and Agenda sections as an **Architectural Invitation Plaque**—resembling an engraved brass or hot-stamped stationery itinerary with fine dual rules and tracked uppercase labels.

---

## 3. TEJAS 2026 Brand Identity: Evaluation & Direction

To establish a memorable, cohesive identity that does not rely on cliché stock flowers, we evaluate two viable, custom design directions:

### Direction 1: "The Radiant Bloom" (Architectural Kalinga & Petal Crest)
- **Concept**: Translates *"TEJAS"* (Sanskrit for *radiance, brilliance, vital energy*) and *"The Fresh Bloom"* into an abstract geometric crest inspired by the **Mukteshvara Torana arch** and the **blooming lotus capitals** of classical Odia stone carving.
- **Visual Motif**: A stylized octagonal star enclosing a blooming lotus geometry constructed entirely from crisp 1px gold hairlines. No soft organic watercolor petals; pure mathematical, architectural precision.
- **Typographic Treatment**:
  - `TEJAS`: Cormorant Garamond, all-caps, with generous letter-spacing (`letter-spacing: 0.12em`), where the letter `'A'` features a distinctive unbroken apex.
  - `’26`: Superscripted or offset in architectural gold (`#bd882b`).
  - `THE FRESH BLOOM`: Cormorant Garamond Italic, tracked with diamond mid-dots (`✦`).
- **Strengths**: Deeply rooted in Bhubaneswar's cultural heritage, exceptionally dignified for senior professors, completely avoids the wedding-card trap.
- **Weaknesses**: Requires custom SVG vector construction; leans heavily classical.

### Direction 2: "The Modern Luminary" (Contemporary Academic Monograph)
- **Concept**: An editorial, publication-led identity inspired by prestigious university press convocations (Oxford, Harvard, RISD). Relies on stark typographic contrast, expansive whitespace, and refined gold foil rules.
- **Visual Motif**: A minimal Roman numeral and celestial quadrant emblem (`✦ IV ✦`), focusing on the transition of the new MCA batch into the academic guild.
- **Typographic Treatment**: High-contrast modern serif display with ultra-clean sans-serif metadata.
- **Strengths**: Extremely modern, crisp, and authoritative.
- **Weaknesses**: Can feel slightly cool or corporate if not balanced with warm hospitality.

### Recommended Brand Direction: Direction 1 ("The Radiant Bloom — Kalinga Architectural")
**Rationale**: TEJAS is a celebration of warmth, youth, and mentorship in Bhubaneswar. Direction 1 bridges the cultural dignity of Odisha with the celebration of incoming students. It provides a proprietary geometric crest that can be consistently applied across the entrance doors, the wax seal, the invitation canvas, the schedule plaque, and the footer.

```text
               ┌────────────────────────────────────────────────────────┐
               │    RECOMMENDED TEJAS 2026 BRAND IDENTITY SYSTEM        │
               └────────────────────────────────────────────────────────┘
                                           │
         ┌─────────────────────────────────┴─────────────────────────────────┐
         ▼                                                                   ▼
   THE PRIMARY LOGOMARK                                                THE TYPOGRAPHIC LOCKUP
   • Geometric Kalinga Lotus Star                                      • "TEJAS" — Cormorant Garamond (Caps)
   • Central 'T' Monogram with Diamond Apex                            • "’26" — Architectural Gold Foil
   • Dual Gold Hairlines (0.75px)                                      • "THE FRESH BLOOM" — Classical Italic
   • Applicable as Wax Stamp & Page Watermark                          • "MCA BATCH 2026–2028" — Tracked Sans
```

---

## 4. True Inspire Footer Overhaul & Brand Presentation

### Deep Asset Audit of `true-inspire.jpeg`
Inspection of the actual asset in `Teacher-Invitation/assets/images/true-inspire.jpeg` reveals:
- **Dimensions & Format**: 1024×1024 square JPEG image.
- **Background**: Soft off-white / light cream vignette (`#fbf8f2` to `#f7f1e6`).
- **Artwork Elements**:
  1. A four-pointed golden star at the upper apex.
  2. A stylized dual-stroke monogram (`TI` / `TJ`) featuring deep espresso charcoal with a warm gold-leaf inner gradient.
  3. Bold uppercase wordmark: **`TRUE INSPIRE`** in high-contrast charcoal.
  4. Slogan in Devanagari flanked by gold hairlines: **`यथा कल्पना तथा रचना`** (*"As the imagination, so the creation"*).

### The Root Cause of Footer Failure
When this 1024×1024 asset was previously inserted at `22×22px` or `28×28px`:
- The wordmark and Devanagari slogan collapsed into unrecognizable pixel mud.
- The off-white background of the JPEG bled into the page's cream background (`#fffaf4`), destroying the asset's border definition and making it look like a dirty smudge.
- The text beside it (`Design & Developed by True Inspire`) was rendered in a weak 10px gray font, lacking contrast and professional presence.

### The Architectural Footer Redesign Specification
We replace the flimsy pill badge with a **Dedicated Dual-Zone Architectural Footer**:

```text
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    SITE FOOTER (SECTION CONTAINER)                              │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [ZONE A: EVENT & INSTITUTIONAL JURISDICTION]                                                    │
│                                                                                                 │
│   TEJAS ’26                               DEPARTMENT OF COMPUTER APPLICATIONS                   │
│   The Fresh Bloom                         Srusti Academy of Management & Technology             │
│   30 October 2026 · JRD Tata Hall         Bhubaneswar, Odisha                                   │
│                                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [ZONE B: THE TRUE INSPIRE ATELIER SIGNATURE PLAQUE]                                             │
│                                                                                                 │
│       ┌─────────────────────────────────────────────────────────────────────────────────┐       │
│       │   [ 56×56px True Inspire Emblem ]                                               │       │
│       │   TRUE INSPIRE                                                                  │       │
│       │   यथा कल्पना तथा रचना                                                           │       │
│       │   ───────────────────────────────────────────────────────────────────────────   │       │
│       │   DESIGN & DEVELOPED BY TRUE INSPIRE                                            │       │
│       └─────────────────────────────────────────────────────────────────────────────────┘       │
│                                                                                                 │
│   [Back to Top ↑]                                                                               │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

#### Exact Implementation Specifications for Zone B
1. **The Plaque Surface (`.atelier-plaque`)**:
   - An intentional, elevated stationery card: `background: #ffffff;` with a crisp `border: 1px solid #d5b494;` and a delicate secondary inner border: `outline: 1px solid #ead7b2; outline-offset: -4px;`.
   - Subtle tactile elevation: `box-shadow: 0 4px 18px rgba(67, 7, 25, 0.05);`.
   - Max width: `380px`, centered, with `padding: 16px 24px; border-radius: 6px;`.
2. **The Logo Image (`.plaque-logo`)**:
   - Displayed at `width: 64px; height: 64px;` (preserving the 1:1 square aspect ratio).
   - Crisp rendering on retina screens with rounded corners (`border-radius: 4px;`) matching the inner frame.
   - Contrast isolation: The white background of the plaque ensures the logo's cream vignette blends seamlessly into the card, while the card itself stands out crisply against the site's warm `#fffaf4` background.
3. **The Credit Typography (`.plaque-credit`)**:
   - Exact mandated wording: **`Design & Developed by True Inspire`**
   - Font: `DM Sans`, uppercase, `font-size: 11px; font-weight: 600; letter-spacing: 0.14em; color: #430719;`.
   - Visual separation: Positioned beneath a subtle 0.5px gold hairline divider (`#c8a77366`).
   - *Grammatical Note*: In official documentation, "Designed & Developed" is standard past-participle English; however, the UI strictly preserves the exact client-requested wording `Design & Developed by True Inspire`.
4. **Mobile Responsiveness**:
   - Below 560px, the plaque scales gracefully to `width: calc(100% - 32px); max-width: 340px; padding: 14px 18px;`.
   - The logo scales to `52×52px`, and the credit text remains completely legible at `10px`.

---

## 5. Background, Palette & Surface Treatment

The user correctly noted that the current background color (`#fffaf4` / `#fff7ed`) is acceptable and should **not** be arbitrarily changed. We retain the warm ivory/cream foundation and enhance it through **tactile materiality and subtle tonal depth**.

### Audit of Existing Project Tokens ([assets/css/styles.css](file:///c:/Users/HP/OneDrive/Desktop/teacher%20card/Teacher-Invitation/assets/css/styles.css))
- Current Base Background: `--paper: #fffaf4;` (Warm ivory)
- Current Surface Background: `--cream: #fff7ed;` (Rich cream)
- Current Primary Brand: `--maroon: #650c28;` (Deep imperial wine)
- Current Secondary Brand: `--wine: #430719;` (Dark burgundy)
- Current Gold Accent: `--gold: #bd882b;` / `--gold-light: #ffe4a6;`
- Current Text Primary: `--ink: #341d26;` (Warm charcoal)
- Current Text Secondary: `--muted: #735c60;` (Muted plum-gray)
- Current Borders: `--line: #d5b494;` (Soft ochre rule)

### The Refinement Strategy: "Subtle Tonal Micro-Layers"
We do not replace these colors. We introduce three refined surface layers:
1. **Paper Grain Noise Overlay (`body::before`)**:
   - A non-blocking, zero-download SVG `feTurbulence` procedural noise layer applied at `opacity: 0.025` with `pointer-events: none`.
   - This transforms flat digital CSS colors into the organic texture of 300gsm heavy cotton vellum.
2. **Atmospheric Radial Lighting (`.hero` & `.schedule`)**:
   - A soft, warm light pool (`radial-gradient(ellipse at 50% 20%, rgba(255, 253, 247, 0.8) 0%, rgba(255, 250, 244, 0) 70%)`) that gives sections depth without harsh shadows.
3. **Contrast-Enforced Rules**:
   - Fine dual hairlines (`border-top: 1px solid #d5b494; border-bottom: 1px solid #e8d5be;`) for section transitions, reminiscent of classical bookbinding.

---

## 6. Signature Envelope & Personal Invitation Craftsmanship

The envelope on [invitation.html](file:///c:/Users/HP/OneDrive/Desktop/teacher%20card/Teacher-Invitation/invitation.html) is the centerpiece of the teacher experience.

```text
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                SIGNATURE ENVELOPE SPECIFICATION                                │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                 │
│                                    /\  <- 3D Folding Triangular Flap                            │
│                                   /  \    (Deep Wine #5a0d24 with 1px Gold Foil Edge)           │
│                                  /    \                                                         │
│                           ┌─────/──────\─────┐                                                  │
│                           │    /  (TI)  \    │ <- Vermilion Wax Seal with Gold 'T 26' Crest     │
│                           │   /          \   │                                                  │
│                           │  /            \  │                                                  │
│                           │ /  THE CARDS   \ │                                                  │
│                           │/    EMERGES     \│                                                  │
│                           │==================│ <- Blind-Embossed Pocket with Kalinga Filigree    │
│                           │                  │                                                  │
│                           │  RECIPIENT NAME  │                                                  │
│                           │                  │                                                  │
│                           └──────────────────┘                                                  │
│                                                                                                 │
│                        [ ↺ Re-seal Envelope / Open Invitation ]                                 │
│                                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Key Engineering & Visual Enhancements
1. **Flap Geometry & Origami Construction**:
   - The triangular flap (`clip-path: polygon(0 0, 100% 0, 50% 100%)`) features a 1.5px gold border and a subtle inner shadow simulating thick vellum paper.
   - When opened, the flap rotates on its top axis (`transform: rotateX(175deg)`) with damped cubic-bezier easing (`cubic-bezier(0.34, 1.3, 0.64, 1)`), revealing an interior lining with an ultra-subtle gold starburst watermark.
2. **Tactile Vermilion Wax Seal**:
   - Sized at `88×88px`, radial gradient from vermilion `#b2374e` to deep lac `#480818`.
   - Crisp monogram: `'T '26'` in Cormorant Garamond with a four-pointed star and laurel flourish.
   - Interactive Prompt: A high-contrast pill button beneath the seal: `✦ UNSEAL INVITATION ↗`.
3. **Card Emergence & Elevation**:
   - Upon unsealing, the 1500×2100 keepsake card glides upward out of the pocket by `200px` (`@keyframes card-emerge`) with soft perspective deceleration.
   - The card features the teacher's authentic portrait framed in a Roman arch, their official designation, confirmed schedule, and sincere blessings appeal.
4. **Interactive State Management**:
   - The `#toggle-envelope-btn` enables seamless re-sealing (`↺ Re-seal envelope`) and re-opening at any time.
   - Full accessibility: If `prefers-reduced-motion` is active, the envelope renders open by default with zero animation delays.
5. **Print & PDF Perfection**:
   - `@media print` cleanly suppresses the envelope pocket, flap, toolbar, and background soundtrack widgets, outputting an unclipped A4 presentation keepsake card.

---

## 7. Component-by-Component Implementation Plan

### 1. Entrance Doors & Welcome Sequence ([index.html](file:///c:/Users/HP/OneDrive/Desktop/teacher%20card/Teacher-Invitation/index.html), [assets/js/entrance.js](file:///c:/Users/HP/OneDrive/Desktop/teacher%20card/Teacher-Invitation/assets/js/entrance.js), [assets/css/entrance.css](file:///c:/Users/HP/OneDrive/Desktop/teacher%20card/Teacher-Invitation/assets/css/entrance.css))
- **Remove**: The glowing laser seam animation (`entrance-cut`).
- **Remove**: Re-crop `hero-engraving.webp` to highlight the classical Odissi dancer and remove Western mortarboard graduation caps.
- **Handoff Overhaul**: When doors open, eliminate the mandatory blocking `#welcome-intro` dialog. Allow faculty to land smoothly on the hero page. Place a refined top banner: *"A Personal Welcome for Our Respected Faculty · [Identify Yourself for Your Keepsake ↗]"*.

### 2. Hero Section & Event Schedule Plaque ([index.html](file:///c:/Users/HP/OneDrive/Desktop/teacher%20card/Teacher-Invitation/index.html), [assets/css/styles.css](file:///c:/Users/HP/OneDrive/Desktop/teacher%20card/Teacher-Invitation/assets/css/styles.css))
- **Title Block**: Set `TEJAS` in Cormorant Garamond display capitals with architectural gold `’26`.
- **Integrated Schedule Plaque**: Directly beneath the hero, introduce an elegant three-part schedule plaque:
  - **Part 1 (Poster Reveal)**: `Wednesday, 28 October 2026 · 4:00 PM`
  - **Part 2 (Main Celebration)**: `Friday, 30 October 2026 · 12:00 PM Onwards`
  - **Part 3 (Celebratory Lunch & Venue)**: `12:30 PM Lunch · JRD Tata Hall`
- **Tribute Quote**: *"In your classrooms, our aspirations take root. With your blessings, our journey begins."* Set in Cormorant Garamond Italic.

### 3. Faculty Stage Photo Centerpiece ([index.html](file:///c:/Users/HP/OneDrive/Desktop/teacher%20card/Teacher-Invitation/index.html), [assets/css/styles.css](file:///c:/Users/HP/OneDrive/Desktop/teacher%20card/Teacher-Invitation/assets/css/styles.css))
- **Elevation**: Frame the uncropped 4:3 photograph (`FacultyGroup/IMG_20261009_180145572_HDR.jpg.jpeg`) in a museum-grade archival matting with gold hairline trim.
- **Caption**: *"The Faculty of Srusti Academy of Management & Technology assembled on stage at JRD Tata Hall."*

### 4. Faculty Carousel & Directory ([assets/js/app.js](file:///c:/Users/HP/OneDrive/Desktop/teacher%20card/Teacher-Invitation/assets/js/app.js), [assets/css/styles.css](file:///c:/Users/HP/OneDrive/Desktop/teacher%20card/Teacher-Invitation/assets/css/styles.css))
- **Refinement**: Replace the floating 3D arc on desktop with a flat, beautifully framed horizontal gallery reel.
- **Stationary Focus**: Maintain stationary focus when an identified teacher is selected; zero auto-rotation hijacking.

### 5. Event Agenda Timeline ([data/event.js](file:///c:/Users/HP/OneDrive/Desktop/teacher%20card/Teacher-Invitation/data/event.js), [assets/css/styles.css](file:///c:/Users/HP/OneDrive/Desktop/teacher%20card/Teacher-Invitation/assets/css/styles.css))
- **Format**: Format the 11 items as a single-column **programme monograph**. Each item receives a two-digit numeral (`01` through `11`), category tag, and concise description.
- **Timing Clarification**: Reflect that the cultural activities proceed from 12:00 PM onwards, following the 12:30 PM lunch.

### 6. Personal Invitation Engine ([assets/js/invitation-renderer.js](file:///c:/Users/HP/OneDrive/Desktop/teacher%20card/Teacher-Invitation/assets/js/invitation-renderer.js))
- **Purge `Alex Brush`**: Replace all cursive lines with Cormorant Garamond Italic and authentic quotes (`“` and `”`).
- **Schedule Embedding**: Embed the confirmed timings (`Friday, 30 October 2026 · 12:00 PM Onwards · Lunch at 12:30 PM · JRD Tata Hall`) into the two-column gold detail box.

### 7. Dual-Zone Footer ([index.html](file:///c:/Users/HP/OneDrive/Desktop/teacher%20card/Teacher-Invitation/index.html), [invitation.html](file:///c:/Users/HP/OneDrive/Desktop/teacher%20card/Teacher-Invitation/invitation.html))
- **Zone A**: Srusti Academy department and event metadata.
- **Zone B**: The True Inspire Atelier Signature Plaque with 64×64px logo and exact text: **`Design & Developed by True Inspire`**.

---

## 8. Prioritized Implementation Checklist

```text
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                  IMPLEMENTATION ACTION MATRIX                                   │
├────┬──────┬─────────────────────────────┬───────────────────────────────────────┬───────────────┤
│ ID │ Tier │ Component / File            │ Action Required                       │ Status        │
├────┼──────┼─────────────────────────────┼───────────────────────────────────────┼───────────────┤
│ 01 │  P1  │ Footer Redesign             │ Implement Zone B True Inspire Plaque  │ Ready for Dev │
│    │      │ index.html & invitation.html│ with 64px logo & high-contrast surface│               │
│ 02 │  P1  │ Event Schedule Integration  │ Add Poster Reveal (28 Oct, 4 PM),     │ Ready for Dev │
│    │      │ index.html & invitation.html│ Main Event (30 Oct, 12 PM), Lunch     │               │
│    │      │                             │ (12:30 PM) & JRD Tata Hall            │               │
│ 03 │  P1  │ Typography Overhaul         │ Purge Alex Brush; standardize display │ Ready for Dev │
│    │      │ styles.css & renderer.js    │ on Cormorant Garamond & DM Sans       │               │
│ 04 │  P1  │ Envelope Damping & Texture  │ Add subtle vellum grain, 175deg flap  │ Ready for Dev │
│    │      │ invitation.css              │ fold damping, and card emergence rise │               │
│ 05 │  P2  │ Entrance Handoff Refactor   │ Remove blocking modal; smooth landing │ Ready for Dev │
│    │      │ entrance.js & app.js        │ on framed hero page                   │               │
│ 06 │  P2  │ Re-crop Hero Engraving      │ Remove graduation caps; focus on      │ Ready for Dev │
│    │      │ assets/images/              │ Odissi dancer & architectural arch    │               │
│ 07 │  P2  │ Single-Column Timeline      │ Harmonize all 11 agenda items with    │ Ready for Dev │
│    │      │ styles.css & data/event.js  │ 01-11 numerals and uniform dignity    │               │
│ 08 │  P2  │ Test Suite Schedule Update  │ Update tests/project.test.mjs to test │ Ready for Dev │
│    │      │ tests/project.test.mjs      │ and enforce verified event timings    │               │
│ 09 │  P3  │ Micro-Interactions          │ Letterpress active states and gold    │ Ready for Dev │
│    │      │ styles.css                  │ foil hover shimmer on primary CTAs    │               │
└────┴──────┴─────────────────────────────┴───────────────────────────────────────┴───────────────┘
```

---

## 9. Acceptance Criteria & Verification Plan

1. **Brand Identity & Typography**:
   - Zero occurrences of `Alex Brush` in CSS stylesheets or Canvas rendering scripts.
   - Distinctive TEJAS 2026 lockup rendered with Cormorant Garamond caps and gold foil `’26`.
2. **Schedule Precision & Clarity**:
   - The Poster Reveal is unambiguously displayed as **Wednesday, 28 October 2026 at 4:00 PM**.
   - The Main Celebration is clearly stated as **Friday, 30 October 2026 from 12:00 PM onwards**.
   - The Celebratory Lunch is clearly designated at **12:30 PM** on 30 October at **JRD Tata Hall**.
   - Zero confusion between the two dates.
3. **True Inspire Brand Visibility**:
   - The True Inspire logo is displayed at a minimum of `64×64px` on desktop and `52×52px` on mobile.
   - The wordmark "TRUE INSPIRE" and Devanagari slogan "यथा कल्पना तथा रचना" within the logo are sharp and legible.
   - The credit text strictly displays the exact requested wording: **`Design & Developed by True Inspire`**.
   - High visual contrast against an elevated stationery plaque.
4. **Envelope & Invitation Performance**:
   - Wax seal unseals smoothly without visual stuttering across Chrome, Firefox, Safari, and Edge.
   - Re-seal button toggles envelope state reliably.
   - Card exports cleanly at 1500×2100 PNG with the teacher's original portrait.
5. **Automated QA & Regression Suite**:
   - `npm run check` passes 10/10 tests cleanly.
   - Updated test assertions confirm that verified event timings are present and match exact schedule requirements.
