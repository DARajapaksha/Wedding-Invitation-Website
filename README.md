# Nimesha & Kasun — Wedding Invitation

A responsive digital wedding invitation built with **React + JavaScript + Vite + Tailwind CSS**, prepared for **Vercel** deployment.

## Wedding details already configured

- Couple: **Nimesha & Kasun**
- Date: **20 December 2026**
- Time: **9:30 AM** (change one line in `src/config/wedding.js` if this should be PM)
- Venue: **Hilton Colombo**
- Address: **2 Sir Chittampalam A Gardiner Mawatha, Colombo 00200**
- Map: your supplied Google Maps link
- Theme: **Burgundy + Gold + Cream**
- Envelope opening: **enabled**
- Background music control: **enabled**
- Gallery: **6 local photo slots**
- Countdown: **enabled**
- Love story: **enabled with clearly marked editable placeholder copy**
- RSVP + admin dashboard: **included**
- Supabase RSVP storage: **included**

## Why this stack

React + Vite + Tailwind is a good fit for this project. Vite produces a static production bundle, and Vercel detects Vite projects when deploying from Git. Tailwind's current Vite integration uses the dedicated `@tailwindcss/vite` plugin and `@import "tailwindcss"` in the CSS entry file.

The project uses Node.js **24.x** in `package.json` because Vercel is deprecating Node.js 20 for new builds and functions from October 1, 2026.

## Start in VS Code

Open this folder in VS Code, then run:

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

For a production build:

```bash
npm run build
npm run preview
```

For local testing of Vercel Functions:

```bash
npm install -g vercel
vercel dev
```

## 1. Add the wedding photos

Put your six photographs inside:

```text
public/images/
```

Use these filenames:

```text
photo-01.jpg
photo-02.jpg
photo-03.jpg
photo-04.jpg
photo-05.jpg
photo-06.jpg
```

The gallery already points to these local paths.

## 2. Add the wedding music

Put a music file you are allowed to use at:

```text
public/audio/wedding-music.mp3
```

The browser will not be forced to autoplay it. Guests open the invitation first, then use the Music button to start or pause playback.

## 3. Edit your love story

Open:

```text
src/config/wedding.js
```

Then replace the four `story` entries with your real story. This keeps the content in one easy-to-edit configuration file.

## 4. RSVP database with Supabase

Create a Supabase project and open **SQL Editor**.

Run:

```text
supabase/schema.sql
```

Then add these Vercel environment variables:

```text
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
ADMIN_PASSWORD
```

Never put the Supabase service-role key in a `VITE_` variable. It belongs only in Vercel's server-side environment variables.

### What the RSVP system does

Guests can submit:

- name
- email
- phone
- attendance
- guest count
- meal preference
- message

After submission they receive a private cancellation/manage link. The `/api/rsvp-*` Vercel Functions store and retrieve RSVP data through Supabase.

The admin page is available at:

```text
#/admin
```

For example:

```text
https://your-domain.vercel.app/#/admin
```

Use the `ADMIN_PASSWORD` value you set in Vercel.

## 5. Deploy to Vercel

Push the project to GitHub, then import the repository into Vercel.

Vercel can detect Vite automatically. The project is configured to use:

```text
Build command: npm run build
Output directory: dist
Node.js: 24.x
```

No extra SPA rewrite is needed because the private routes use hash routing.

## Main customization file

Most future content changes belong here:

```text
src/config/wedding.js
```

That includes names, date, venue, music path, gallery paths, story text, and schedule.

## Notes

The project intentionally avoids remote image URLs for the gallery. Local image files are easier to control and reduce third-party loading dependencies.

The starter contains decorative SVG assets, so it renders even before the real photos and music are added.
