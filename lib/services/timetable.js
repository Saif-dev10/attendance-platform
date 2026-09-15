// Frontend service contract for timetable data.
// Replace mock responses with API calls when timetable services are available.

import {
  examinationEvents,
  timetableDays,
  timetableSlots,
} from '@/lib/mock/timetable';

export function getTimetable() {
  return { days: timetableDays, timeSlots: timetableSlots };
}

export function getExaminationEvents() {
  return examinationEvents;
}
