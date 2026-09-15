// Frontend service contract for attendance validation and confirmation.
// Replace these delegations with API calls when the backend is available.

import {
  confirmAttendance as confirmMockAttendance,
  validateQRCode as validateMockQRCode,
} from '@/lib/mock/attendance';

export function validateQRCode(rawPayload) {
  return validateMockQRCode(rawPayload);
}

export function confirmAttendance(payload) {
  return confirmMockAttendance(payload);
}
