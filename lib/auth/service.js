import { apiRequest } from '@/lib/api/client';

const AUTH_TOKEN_KEY = 'skul_auth_token';

export async function login(matricNumber, password) {
  const response = await apiRequest('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      matric_id: matricNumber,
      password,
    }),
  });

  const token = response?.data?.token;

  if (!token) {
    throw new Error('Login succeeded, but no authentication token was returned.');
  }

  localStorage.setItem(AUTH_TOKEN_KEY, token);

  return response.data;
}

export async function getCurrentUser() {
  return apiRequest('api/v1/auth/me');
}

export async function getStudentProfile() {
  return apiRequest('api/v1/student/profile');
}

export async function getAccount() {
  return apiRequest('api/v1/me');
}

export async function logout() {
  try {
    await apiRequest('api/v1/auth/logout');
  } finally {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}

export function getStoredToken() {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function clearStoredToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}