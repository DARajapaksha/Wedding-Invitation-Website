import { createRSVP, hasSupabaseConfig } from '../lib/server/supabase.js';

function json(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json').json(body);
}

function cleanString(value, max = 500) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

function makeToken() {
  return `${Date.now().toString(36)}-${crypto.randomUUID()}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { error: 'Method not allowed.' });
  }

  const body = req.body || {};
  const honeypot = cleanString(body.website, 100);
  if (honeypot) {
    return json(res, 400, { error: 'Invalid submission.' });
  }

  const name = cleanString(body.name, 120);
  const email = cleanString(body.email, 160);
  const phone = cleanString(body.phone, 60);
  const attendance = body.attendance === 'no' ? 'no' : body.attendance === 'yes' ? 'yes' : '';
  const guests = Math.min(10, Math.max(1, Number.parseInt(body.guests, 10) || 1));
  const meal = cleanString(body.meal, 100);
  const message = cleanString(body.message, 1000);

  if (!name || !attendance) {
    return json(res, 422, { error: 'Please provide your name and attendance.' });
  }

  if (!hasSupabaseConfig()) {
    return json(res, 503, { error: 'RSVP database is not configured.' });
  }

  try {
    const token = makeToken();
    const rows = await createRSVP({
      name,
      email: email || null,
      phone: phone || null,
      attendance,
      guests,
      meal: meal || null,
      message: message || null,
      guest_token: token,
    });

    return json(res, 200, {
      ok: true,
      token,
      rsvp: rows?.[0] ?? null,
    });
  } catch (error) {
    console.error('RSVP create failed', error);
    return json(res, 500, { error: 'Could not save the RSVP. Please try again.' });
  }
}
