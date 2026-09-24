import { apiRequest } from "@/lib/api/client";

export async function login(matricNumber, password) {
  // Get Laravel's CSRF cookie before starting the session login.
  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL.replace("/api/v1", "")}/sanctum/csrf-cookie`,
    {
      credentials: "include",
    }
  );

  const response = await apiRequest("/auth/web-login", {
    method: "POST",
    body: JSON.stringify({
      matric_id: matricNumber,
      password,
    }),
  });

  return response.data;
}

export async function getCurrentUser() {
  return apiRequest("/auth/me");
}

export async function getStudentProfile() {
  return apiRequest("/student/profile");
}

export async function getAccount() {
  return apiRequest("/me");
}

export async function logout() {
  await apiRequest("/auth/web-logout", {
    method: "POST",
  });
}