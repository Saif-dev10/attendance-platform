// Frontend service contract for the authenticated student's profile.
// Replace mock responses with API calls when profile services are available.

import { studentDocuments, studentProfile } from '@/lib/mock/profile';

export function getStudentProfile() {
  return studentProfile;
}

export function getStudentDocuments() {
  return studentDocuments;
}
