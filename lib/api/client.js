const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiRequest(endpoint, options = {}) {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('skul_auth_token')
      : null;

  const headers = {
    Accept: 'application/json',
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  let data = null;

  try {
    data = await response.json();
  } catch {
    // Response did not contain JSON.
  }

  if (!response.ok) {
    const error = new Error(
      data?.message || 'Something went wrong with the request.'
    );

    error.status = response.status;
    error.data = data;

    throw error;
  }

  return data;
}