import { apiRequest } from '@/lib/api/client';

const AUTH_TOKEN_KEY = 'skul_auth_token';


/**
 * 1. CSRF Handshake
 * Fetches CSRF token from Laravel Sanctum and stores it in browser cookie.
 */
export async function getCsrfCookie() {
  return await apiRequest('/sanctum/csrf-cookie', {
    method: 'GET',
  });
}

/**
 * 2. Login User
 * Calls CSRF cookie first, then posts credentials.
 * Laravel sets the HttpOnly session cookie automatically on success.
 */
export async function login(matricNumber, password) {
  // Step 1: Initialize CSRF protection
  await getCsrfCookie();

  // Step 2: Perform login
  const response = await apiRequest('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      matric_id: matricNumber,
      password,
    }),
  });

  return response.data;
}

/**
 * 3. Fetch Current Authenticated User
 * Browser automatically attaches the laravel_session HttpOnly cookie.
 */
export async function getCurrentUser() {
  const response = await apiRequest('/api/v1/auth/me', {
    method: 'GET',
  });

  console.log('Current User Response:', response.data);
  return response.data;
}

/**
 * 4. Logout User
 */
export async function logout() {
  return await apiRequest('/api/v1/auth/logout', {
    method: 'POST',
  });
}

export async function getStudentProfile() {
  const response = await apiRequest('/api/v1/student/profile');
  console.log(response);
  return response.data;
}

export async function getAccount() {
  const response = await apiRequest('/api/v1/me');
  return response.data;
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