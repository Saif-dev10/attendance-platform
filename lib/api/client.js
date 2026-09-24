const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const API_ROOT_URL = API_BASE_URL.replace('/api/v1', '');

function getXsrfToken() {
  if (typeof document === 'undefined') {
    return null;
  }

  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('XSRF-TOKEN='));

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(cookie.split('=').slice(1).join('='));
}

async function ensureCsrfCookie() {
  await fetch(`${API_ROOT_URL}/sanctum/csrf-cookie`, {
    credentials: 'include',
  });
}

export async function apiRequest(endpoint, options = {}) {
  const method = (options.method || 'GET').toUpperCase();

  if (method !== 'GET' && method !== 'HEAD' && method !== 'OPTIONS') {
    await ensureCsrfCookie();
  }

  const xsrfToken = getXsrfToken();

  const headers = {
    Accept: 'application/json',
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(xsrfToken ? { 'X-XSRF-TOKEN': xsrfToken } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  let data = null;

  try {
    data = await response.json();
  } catch {
    // Response did not contain JSON.
  }

  if (!response.ok) {
    const error = new Error(
      data?.message ||
        data?.error?.message ||
        'Something went wrong with the request.'
    );

    error.status = response.status;
    error.data = data;

    throw error;
  }

  return data;
}