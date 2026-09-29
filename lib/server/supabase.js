function getConfig() {
  const configuredUrl = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!configuredUrl || !key) {
    return null;
  }
  const url = configuredUrl.replace(/\/+$/, '').replace(/\/rest\/v1$/i, '');
  return { url, key };
}

export function hasSupabaseConfig() {
  return Boolean(getConfig());
}

async function request(path, options = {}) {
  const config = getConfig();
  if (!config) {
    throw new Error('Supabase is not configured.');
  }

  const response = await fetch(`${config.url}${path}`, {
    ...options,
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Supabase request failed (${response.status}).`);
  }

  if (response.status === 204) {
    return null;
  }
  return response.json();
}

export function createRSVP(payload) {
  return request('/rest/v1/rsvps', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function listRSVPs() {
  return request('/rest/v1/rsvps?select=id,name,email,phone,attendance,guests,meal,message,guest_token,created_at&order=created_at.desc');
}

export function cancelRSVP(token) {
  return request(`/rest/v1/rsvps?guest_token=eq.${encodeURIComponent(token)}`, {
    method: 'DELETE',
  });
}
