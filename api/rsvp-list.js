import { hasSupabaseConfig, listRSVPs } from '../lib/server/supabase.js';

function json(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json').json(body);
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return json(res, 405, { error: 'Method not allowed.' });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  const provided = req.headers['x-admin-password'];

  if (!adminPassword || provided !== adminPassword) {
    return json(res, 401, { error: 'Unauthorized.' });
  }

  if (!hasSupabaseConfig()) {
    return json(res, 503, { error: 'RSVP database is not configured.' });
  }

  try {
    const rows = await listRSVPs();
    return json(res, 200, { ok: true, rsvps: rows });
  } catch (error) {
    console.error('RSVP list failed', error);
    return json(res, 500, { error: 'Could not load RSVPs.' });
  }
}
