// Frontend service contract for assignments.
// Replace the mock delegation with API calls when the backend is available.

import { getAssignment as getMockAssignment } from '@/lib/assignments';
import {
  dueThisWeek as mockDueThisWeek,
  dueToday as mockDueToday,
  gradedItems as mockGradedItems,
} from '@/lib/mock/assignments';

export function getAssignment(id) {
  return getMockAssignment(id);
}

export function getAssignments() {
  return {
    dueToday: mockDueToday,
    dueThisWeek: mockDueThisWeek,
    gradedItems: mockGradedItems,
  };
}
