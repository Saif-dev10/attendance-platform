// Frontend service contract for timetable data.
// Replace mock responses with API calls when timetable services are available.

import {
  timetableDays,
  timetableSlots,
  timetableEvents,
  studentExaminationEvents,
  lecturerExaminationEvents,
} from "@/lib/mock/timetable";

export function getStudentTimetable() {
  return {
    days: timetableDays,
    timeSlots: timetableSlots,

    events: timetableEvents
      .filter((event) => event.studentVisible)
      .map((event) => ({
        id: event.id,
        course: event.course,
        title: event.title,
        lecturer: event.lecturer,
        venue: event.venue,
        startTime: event.startTime,
        endTime: event.endTime,
        day: event.day,
        date: event.date,
      })),
  };
}

export function getLecturerTimetable() {
  return {
    days: timetableDays,
    timeSlots: timetableSlots,

    events: timetableEvents
      .filter((event) => event.lecturerVisible)
      .map((event) => ({
        id: event.id,
        course: event.course,
        title: event.title,
        level: event.level,
        venue: event.venue,
        students: event.students,
        startTime: event.startTime,
        endTime: event.endTime,
        day: event.day,
        date: event.date,
      })),
  };
}

export function getStudentExaminationEvents() {
  return studentExaminationEvents;
}

export function getLecturerExaminationEvents() {
  return lecturerExaminationEvents;
}