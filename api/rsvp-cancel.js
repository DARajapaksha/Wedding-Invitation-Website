import { cancelRSVP, hasSupabaseConfig } from '../lib/server/supabase.js';

function json(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json').json(body);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { error: 'Method not allowed.' });
  }

  const token = typeof req.body?.token === 'string' ? req.body.token.trim() : '';
  if (!token || token.length > 200) {
    return json(res, 422, { error: 'A valid cancellation token is required.' });
  }

  if (!hasSupabaseConfig()) {
    return json(res, 503, { error: 'RSVP database is not configured.' });
  }

  try {
    await cancelRSVP(token);
    return json(res, 200, { ok: true });
  } catch (error) {
    console.error('RSVP cancellation failed', error);
    return json(res, 500, { error: 'Could not cancel the RSVP.' });
  }
}
