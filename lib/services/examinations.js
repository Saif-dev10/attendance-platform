// Frontend service contract for examination data.
// Replace these delegations with API calls when the backend is available.

import {
  getExaminationAllocation as getMockExaminationAllocation,
  getExaminationTranscript as getMockExaminationTranscript,
} from '@/lib/mock/examinations';

export function getExaminationTranscript() {
  return getMockExaminationTranscript();
}

export function getExaminationAllocation() {
  return getMockExaminationAllocation();
}
