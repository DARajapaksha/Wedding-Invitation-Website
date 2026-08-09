# Wedding Invitation Website — Build Plan

## Context

Build a mobile-first wedding invitation website in the existing Vite + React + Tailwind CSS v4 scaffold (`src/App.tsx` entrypoint, `src/index.css` for global styles/fonts/tokens). It needs an envelope reveal animation, an invitation card, an RSVP form that saves to a Google Sheet and redirects to WhatsApp, and a hidden admin panel to search/delete entries. This plan implements the previously accepted design.

## Aesthetic Stance

Warm minimalist — cream base, dusty rose + gold accents, gold hairline dividers. Playfair Display (serif display) + Lato (sans body), loaded via Google Fonts `@import` in `src/index.css`. Generous whitespace, tactile, mobile-first. Will invoke the `aesthetic-stance` skill before writing UI code.

## Files

- `src/index.css` — Google Fonts `@import` (first), Tailwind import, `:root` design tokens, `@font-face`/family defaults.
- `src/config.ts` — `SHEET_URL`, `WHATSAPP_NUMBER`, WhatsApp message template, with documented placeholders + Apps Script deploy instructions in comments.
- `src/App.tsx` — state-based route between main invite and `/admin`.
- `src/components/Envelope.tsx` — closed envelope, flap opens on scroll (IntersectionObserver) or tap; card slides out.
- `src/components/InvitationCard.tsx` — couple names, venue/location, date/time, gold dividers.
- `src/components/RSVPForm.tsx` — controlled form (full name, WhatsApp number, mobile number, attending checkbox, message), POST to Sheets, then WhatsApp redirect.
- `src/components/AdminPanel.tsx` — fetch rows, client-side search by name/mobile, delete button per row.

## Design tokens (src/index.css)

Cream `--background:#faf8f5`, `--foreground:#2c2416`, gold `--primary:#c9a96e`, dusty rose `--secondary:#e8d5cb`, rose accent `--accent:#b76e79`, `--border:#ddd0be`, `--radius:0.5rem`.

## Google Sheets integration

Google Apps Script deployed as a Web App (Execute as Me, access Anyone). Endpoints via query `action`: `submit` (append row), `list` (return rows JSON), `delete` (delete by row index). The full Apps Script source and deploy steps are provided as commented instructions in `src/config.ts`. Client calls `SHEET_URL`.

## WhatsApp integration

After successful submit, open `https://wa.me/{WHATSAPP_NUMBER}?text={encodedMessage}` in a new tab using the configured number + template.

## Envelope animation

`isOpen` state toggled by IntersectionObserver threshold or tap. Flap uses CSS `rotateX(0 → -180deg)` with `transform-origin: top`; card `translateY` slides up after flap opens. Section is `min-h-screen`, centered.

## Verification

1. Preview: envelope opens on scroll/tap; card + details render.
2. RSVP form validates and opens WhatsApp with correct prefilled message.
3. Submit appends a Sheet row (needs user's deployed Apps Script URL).
4. Admin panel searches by name/mobile and deletes a row.
5. At 375px width, layout holds throughout.
