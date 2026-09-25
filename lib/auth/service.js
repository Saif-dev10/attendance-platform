import { apiRequest } from "@/lib/api/client";

function unwrap(response) {
  return response?.data ?? response;
}

export async function login(matricNumber, password) {
  const response = await apiRequest("/auth/web-login", {
    method: "POST",
    body: JSON.stringify({
      matric_id: matricNumber,
      password,
    }),
  });

  return unwrap(response);
}

export async function getCurrentUser() {
  return unwrap(await apiRequest("/auth/me"));
}

export async function getStudentProfile() {
  return unwrap(await apiRequest("/student/profile"));
}

export async function getAccount() {
  return unwrap(await apiRequest("/me"));
}

export async function logout() {
  await apiRequest("/auth/web-logout", {
    method: "POST",
  });
}
