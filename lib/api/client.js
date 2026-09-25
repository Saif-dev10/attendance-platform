const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_ROOT_URL = API_BASE_URL.replace('/api/v1', '');

function getXsrfToken() {
  if (typeof document === 'undefined') return null;

  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('XSRF-TOKEN='));

  return cookie
    ? decodeURIComponent(cookie.split('=').slice(1).join('='))
    : null;
}

async function ensureCsrfCookie() {
  await fetch(`${API_ROOT_URL}/sanctum/csrf-cookie`, {
    credentials: 'include',
  });
}

export async function apiRequest(endpoint, options = {}) {
  const method = (options.method || 'GET').toUpperCase();

  if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    await ensureCsrfCookie();
  }

  const xsrfToken = getXsrfToken();

  const headers = {
    Accept: 'application/json',
    ...(options.body && {
      'Content-Type': 'application/json',
    }),
    ...(xsrfToken && {
      'X-XSRF-TOKEN': xsrfToken,
    }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  const data = await response.json().catch(() => null);

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