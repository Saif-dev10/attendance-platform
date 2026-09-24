// Frontend service contract for the authenticated student's profile.

import { apiRequest } from "@/lib/api/client";
import { studentDocuments } from "@/lib/mock/profile";

export async function getStudentProfile() {
  const response = await apiRequest("/student/profile");
  const profile = response.data;

  const fullName = [
    profile.first_name,
    profile.middle_name,
    profile.last_name,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    ...profile,

    // Fields already provided by the backend
    name: fullName,
    studentId: profile.matric_number,

    // Fields not available from the current API yet
    role: "Student",
    programme: null,
    department: null,
    faculty: null,
    cgpa: null,
    attendance: null,
    level: null,
    courses: null,
    session: null,
    semester: null,
    admissionYear: null,
    dateOfBirth: null,
    gender: null,
    email: null,
    phone: null,
    address: null,
    emergencyName: null,
    emergencyRelationship: null,
    emergencyPhone: null,
  };
}

export function getStudentDocuments() {
  return studentDocuments;
}