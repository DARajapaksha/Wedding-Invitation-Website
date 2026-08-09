# Wedding Invitation Website — Plan

## Context

Build a mobile-first wedding invitation website in the existing Vite + React + Tailwind CSS v4 project. The site features an envelope reveal animation, RSVP form with Google Sheets integration, WhatsApp message sending, and an admin panel to search/delete RSVP entries from the sheet.

## Aesthetic Stance

**Warm minimalist** — cream base, dusty rose accents, gold hairlines. Old-style serif display font (Playfair Display) paired with clean sans body (Lato). Generous whitespace, tactile feel. Mobile-first throughout.

## Fonts (Google Fonts via @import in src/index.css)

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lato:wght@300;400;700&display=swap');
```

## Pages / Sections (single scrollable page, mobile-first)

1. **Envelope Hero** — full-screen envelope graphic (SVG/CSS). On initial load shows a closed envelope. Scroll down or tap "Open" animates the flap lifting and the card slides out.
2. **Invitation Card** — revealed after envelope opens:
   - Couple names (Groom & Bride) in large serif
   - Date, time, location/venue details
   - Decorative gold dividers
3. **RSVP Form** — below the card:
   - Full Name (text)
   - WhatsApp Number (tel)
   - Mobile Number (tel)
   - Attending ceremony? (checkbox/toggle)
   - Message/Greetings (textarea)
   - Submit → saves to Google Sheet via a Google Apps Script web app URL
   - After submit → opens WhatsApp with pre-filled invitation message to a configured number
4. **Admin Panel** (hidden, accessible via `/admin` route or secret button) — search by name or mobile, list results, delete row from sheet.

## File Structure

- `src/App.tsx` — router shell (React state-based routing between main invite and admin)
- `src/components/Envelope.tsx` — envelope + card reveal animation
- `src/components/InvitationCard.tsx` — couple info, venue, date
- `src/components/RSVPForm.tsx` — controlled form, Sheets API call, WhatsApp redirect
- `src/components/AdminPanel.tsx` — search + delete against Sheets API
- `src/index.css` — Google Fonts @import, Tailwind import, global tokens

## Google Sheets Integration

Use **Google Apps Script** deployed as a Web App. The script handles:

- `POST ?action=submit` — appends a row (name, whatsapp, mobile, attending, message, timestamp)
- `GET ?action=list` — returns all rows as JSON
- `POST ?action=delete&id={rowIndex}` — deletes row by index

The script URL is stored in a constant `SHEET_URL` in `src/config.ts`. Provide a clearly documented placeholder + instructions in a comment so the user can paste their own deployment URL.

## WhatsApp Integration

After successful RSVP form submission, open:
```
https://wa.me/{WHATSAPP_NUMBER}?text={encodedInvitationMessage}
```
`WHATSAPP_NUMBER` and message template are in `src/config.ts`.

## Envelope Animation

- CSS + React state: `isOpen` boolean toggled on scroll past threshold (IntersectionObserver) or tap.
- Envelope flap: CSS `rotateX` transform with `transform-origin: top`, transitions from 0° → -180°.
- Card slides up from envelope body with a `translateY` transition after flap opens.
- Whole section is `min-h-screen`, vertically centered.

## Admin Panel

- Reachable by clicking a small discreet "Admin" link in the footer (or typing `/admin` in URL via state).
- Search input filters fetched rows client-side by name or mobile.
- Each result row has a Delete button → calls `?action=delete`.
- No authentication (simple, as requested) — just hidden placement.

## Tokens (src/index.css theme variables)

```css
:root {
  --background: #faf8f5;
  --foreground: #2c2416;
  --card: #ffffff;
  --card-foreground: #2c2416;
  --primary: #c9a96e;      /* gold */
  --primary-foreground: #ffffff;
  --secondary: #e8d5cb;    /* dusty rose */
  --secondary-foreground: #5a3e35;
  --muted: #f0ebe3;
  --muted-foreground: #8a7560;
  --accent: #b76e79;       /* rose accent */
  --accent-foreground: #ffffff;
  --border: #ddd0be;
  --radius: 0.5rem;
}
```

## Verification

1. Run app in preview — check envelope opens on scroll/tap.
2. Fill RSVP form → verify WhatsApp link opens with correct message.
3. Submit form → check Google Sheet row appended (requires user to deploy Apps Script).
4. Open Admin Panel → search name → delete → verify row removed.
5. Resize to 375px width — confirm mobile layout intact throughout.

## Google Apps Script (to provide inline as instructions)

```javascript
function doPost(e) {
  const params = e.parameter;
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (params.action === 'submit') {
    sheet.appendRow([new Date(), params.name, params.whatsapp, params.mobile, params.attending, params.message]);
    return ContentService.createTextOutput(JSON.stringify({success:true})).setMimeType(ContentService.MimeType.JSON);
  }
  if (params.action === 'delete') {
    sheet.deleteRow(parseInt(params.id));
    return ContentService.createTextOutput(JSON.stringify({success:true})).setMimeType(ContentService.MimeType.JSON);
  }
}
function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
```

User deploys this as "Execute as Me, Anyone (even anonymous)" and pastes the URL in `src/config.ts`.
