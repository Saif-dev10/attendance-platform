// Frontend service contract for complaints and support.
// Replace mock delegations with API calls when support services are available.

import {
  complaintCategories,
  complaintCourses,
  complaintSessions,
  initialComplaints,
} from '@/lib/mock/complaints';

export function getComplaintCategories() {
  return complaintCategories;
}

export function getComplaintFormOptions() {
  return { courses: complaintCourses, sessions: complaintSessions };
}

export function getComplaints() {
  return initialComplaints;
}

export async function createComplaint(payload) {
  return { ...payload, status: 'Submitted' };
}
