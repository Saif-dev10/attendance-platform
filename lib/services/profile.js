// Frontend service contract for the authenticated student's profile.

import { apiRequest } from "@/lib/api/client";
import { studentDocuments } from "@/lib/mock/profile";

function fullNameFrom(profile) {
  return [profile.first_name, profile.middle_name, profile.last_name]
    .filter(Boolean)
    .join(" ");
}

export async function getStudentProfile() {
  const response = await apiRequest("/student/profile");
  const profile = response.data ?? {};

  return {
    ...profile,
    name: fullNameFrom(profile),
    studentId: profile.matric_number,
    matric_number: profile.matric_number,
    avatarUrl: profile.profile_image || profile.avatarUrl || null,
    role: profile.role || "Student",
    programme: profile.programme ?? null,
    department: profile.department ?? null,
    faculty: profile.faculty ?? null,
    level: profile.level ?? null,
    session: profile.session ?? profile.entry_session ?? null,
    semester: profile.semester ?? null,
    admissionYear: profile.admissionYear ?? profile.entry_session ?? null,
    cgpa: profile.cgpa ?? null,
    attendance: profile.attendance ?? null,
    coursesCount: profile.coursesCount ?? profile.courses ?? null,
    dateOfBirth: profile.dateOfBirth ?? profile.date_of_birth ?? null,
    gender: profile.gender ?? null,
    email: profile.email ?? null,
    phone: profile.phone ?? null,
    address: profile.address ?? null,
    emergencyName: profile.emergencyName ?? profile.emergency_name ?? null,
    emergencyRelationship:
      profile.emergencyRelationship ?? profile.emergency_relationship ?? null,
    emergencyPhone: profile.emergencyPhone ?? profile.emergency_phone ?? null,
  };
}

export function getStudentDocuments() {
  return studentDocuments;
}
