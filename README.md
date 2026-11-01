# Seoul Signal

An original, buildless Korean learning site by Sudip Sah. Explore six everyday neighbourhoods through 24 phrases, 24 quiz questions, six sentence builders, a Hangul composition studio, flashcards and a personal phrase passport.

## Run

Serve this directory with any static HTTP server. There is no build step, account system or server dependency. Open `index.html` through the server. GitHub Pages can serve the repository root.

## Learning and progress

- Four questions per neighbourhood; at least three correct earns its stamp.
- Each stamp earns 50 points once; a reviewed phrase earns 5 points once; each sentence builder earns 10 points once.
- Stamps, saved phrases, reviewed phrases and progress use localStorage in the current browser. No cross-device sync. Daily tasks use the device's local date.
- Speech uses browser speech synthesis with `ko-KR`; availability and pronunciation depend on installed voices. No microphone or voice recording.
- This is a curated beginner practice collection, not a complete course or TOPIK certification. Romanization is approximate.
- Supports keyboard navigation, reduced motion, narrow screens and local storage failure.

## Files

- `index.html`: accessible structure and original SVG city illustration.
- `style.css`: responsive warm editorial design.
- `app.js`: learning content, interactions and validated local progress.

Google Fonts are optional: system font fallbacks keep the app usable without them. No analytics or third-party scripts.