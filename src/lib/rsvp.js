const STORAGE_KEY = 'wedding-invitation-rsvps-v1';

function createToken() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getLocalRows() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveLocalRows(rows) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
}

export async function submitRSVP(values) {
  try {
    const response = await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    if (response.ok) return response.json();
    if (!import.meta.env.DEV) {
      const body = await response.json().catch(() => ({}));
      throw new Error(body.error || 'The RSVP service is unavailable. Please try again later.');
    }
  } catch (error) {
    if (!import.meta.env.DEV) throw error;
    // Vite dev mode has no /api runtime, so continue into demo mode.
  }

  const token = createToken();
  const row = {
    id: token,
    ...values,
    guest_token: token,
    created_at: new Date().toISOString(),
  };
  const rows = [row, ...getLocalRows()];
  saveLocalRows(rows);
  return { ok: true, demo: true, token, rsvp: row };
}

export async function cancelRSVP(token) {
  try {
    const response = await fetch('/api/rsvp-cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    if (response.ok) return response.json();
    if (!import.meta.env.DEV) {
      const body = await response.json().catch(() => ({}));
      throw new Error(body.error || 'The RSVP service is unavailable. Please try again later.');
    }
  } catch (error) {
    if (!import.meta.env.DEV) throw error;
    // Continue to local mode below.
  }

  const rows = getLocalRows();
  const nextRows = rows.filter((row) => row.guest_token !== token);
  saveLocalRows(nextRows);
  return { ok: rows.length !== nextRows.length, demo: true };
}

export async function loadRSVPs(adminPassword) {
  try {
    const response = await fetch('/api/rsvp-list', {
      headers: { 'x-admin-password': adminPassword },
    });
    if (response.ok) return response.json();
    if (!import.meta.env.DEV) {
      const body = await response.json().catch(() => ({}));
      throw new Error(body.error || 'Could not load RSVPs.');
    }
  } catch (error) {
    if (!import.meta.env.DEV) throw error;
    // Fall back to local mode in Vite development.
  }

  return { ok: true, demo: true, rsvps: getLocalRows() };
}

export function makeCancelLink(token) {
  return `${window.location.origin}${window.location.pathname}#/cancel?token=${encodeURIComponent(token)}`;
}

export function downloadCSV(rows) {
  const headers = ['Name', 'Email', 'Phone', 'Attendance', 'Guests', 'Meal', 'Message', 'Created At'];
  const csv = [
    headers,
    ...rows.map((row) => [
      row.name,
      row.email || '',
      row.phone || '',
      row.attendance,
      row.guests,
      row.meal || '',
      row.message || '',
      row.created_at,
    ]),
  ]
    .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'wedding-rsvps.csv';
  anchor.click();
  URL.revokeObjectURL(url);
}
