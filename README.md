# Jamo Journey

A full-stack Korean learning app by Sudip Sah, expanding Seoul Signal. Node 24+, no npm dependencies or build step. Run `npm start`; open port 3000. Run `npm test` for learning rules and authentication/streaming integration tests.

## Included

Email/password accounts; cross-device server progress; 21 sequential lessons over seven levels; Hangul with final consonants and challenges; 60 words; eight grammar cards; six common-expression cards; quizzes; scheduled Again/Hard/Good review; a real 60-second matching game; eight six-line dialogues; a seven-place illustrated map; XP garden with streak-based bloom and gentle wilting; saved per-character AI chats; streamed Korean/English/correction responses.

## Deploy

Use the included Dockerfile with a persistent volume mounted at `/data`. Set `DB_PATH=/data/jamo.sqlite`, `NODE_ENV=production` and `PORT=3000`. SQLite stores salted scrypt password hashes, hashed session tokens, individual progress and chats. The application is designed for one server replica with a durable volume. Back up that volume before migrations. Do not run production against an ephemeral filesystem.

GitHub Pages can link to the full-stack app but cannot run account or AI endpoints.

## Emergent tutor configuration

Set `EMERGENT_LLM_KEY` in the hosting service’s secret/environment settings, never in Git or the browser. `LLM_MODEL` defaults to `anthropic/claude-sonnet-5-5`. `LLM_BASE_URL` defaults to the Emergent integration proxy `https://integrations.emergentagent.com/llm`; set it to the proxy base URL provided in your Emergent account if different. `APP_URL` can identify this deployed app.

External proxy use can require a paid Emergent plan and verified/allowlisted server egress. Confirm the model identifier and proxy access in the Emergent Universal API Key settings. Calls use the owner’s Emergent credits; there is a 30-message-per-account daily limit. The app does not fake tutor responses when configuration, model access or credits are unavailable. Integration tests use an explicitly mocked provider, not the paid live model.

## Learning behaviour

- First-time lesson: 50 XP; first-time scene: 30 XP. Repeating does not farm XP.
- Again returns in one minute; Hard in ten minutes; Good starts at one day and doubles to a 90-day cap. Saved words make up the review deck; without saved words, the twelve Everyday words are used. Review awards up to five XP per word per local day.
- Streaks follow the browser’s reported timezone. Garden stages: 0, 30, 150, 500, 1000 XP. A three-day active streak adds bloom; two missed days add a wilted appearance. It never loses its growth stage.
- Study time records visible app intervals. Guest progress stays in localStorage; account progress is separate and does not silently import a shared device’s guest history.
- Browser Korean speech requires a Korean device voice. No microphone recording. Missing voices produce an actionable message.
- Dialogue scene completion is self-reported speaking practice, not speech recognition or pronunciation grading. The city map is illustrative, not geographic navigation.
- Starter content, including Level 7, is not a comprehensive TOPIK syllabus. K-culture cards use common expressions and original notes, not copyrighted lyrics or attributed drama quotations.

## Account scope

Passwords require 10–128 characters. HttpOnly, SameSite cookies; production cookies use Secure. Login attempts and AI calls have server limits. No password recovery or email verification service is configured in this starter; plan those before a broad public launch. Chats contain user-entered content: avoid sensitive information. There are no analytics scripts.

## Files

`public/` contains the learning UI, content and shared learning rules. `server.mjs` serves the app and APIs. `tests/` covers progress, streaks, review scheduling, timing, account isolation, sessions and mocked SSE chat.
