import { request, ApiError } from "./_core";
import * as D from "@/lib/mock/admin/universityData";
import { addUniversityActivity } from "@/lib/mock/admin/universityMetrics";

export const DAYS = D.DAYS;
export const TIME_BANDS = D.TIME_BANDS;
export const DEPT_OPTIONS = [{ value: "all", label: "All departments" }, ...D.DEPARTMENTS.map((d) => ({ value: d.code, label: `${d.name} (${d.code})` }))];
export const TIMETABLE_DEPT_OPTIONS = D.DEPARTMENTS.map((d) => ({ value: d.code, label: `${d.name} (${d.code})` }));

const page = (rows, p, s) => ({ items: rows.slice((p - 1) * s, p * s), total: rows.length, page: p, pageSize: s });
const matches = (q, fields) => {
  const n = q.trim().toLowerCase();
  return !n || fields.some((f) => String(f ?? "").toLowerCase().includes(n));
};
const lecturerById = (id) => D.lecturers.find((l) => l.id === id);
const courseView = (c) => ({
  ...c,
  deptName: D.deptByCode[c.dept].name,
  lecturer: lecturerById(c.lecturerId),
  offering: D.offerings.find((o) => o.courseId === c.id),
});
const lecturerView = (l) => ({ ...l, deptName: D.deptByCode[l.dept].name, courseCount: D.courses.filter((c) => c.lecturerId === l.id).length });

/* Every list takes { q, filter, tab, page, pageSize } (filter = department code, tab = status). */

export function listLecturers({ q = "", filter = "all", tab = "all", page: p = 1, pageSize = 10 } = {}) {
  return request({ path: "/university/lecturers", query: { q, filter, tab, page: p, pageSize } }, () => {
    const rows = D.lecturers
      .filter((l) => (filter === "all" || l.dept === filter) && (tab === "all" || l.status === tab) && matches(q, [l.name, l.staffId, l.email]))
      .map(lecturerView);
    return page(rows, p, pageSize);
  });
}

export function getLecturer(id) {
  return request({ path: `/university/lecturers/${id}` }, () => {
    const l = lecturerById(id);
    if (!l) throw new ApiError("Lecturer not found.", { status: 404 });
    return { lecturer: { ...lecturerView(l), courses: D.courses.filter((c) => c.lecturerId === id) } };
  });
}

export function listCourses({ q = "", filter = "all", page: p = 1, pageSize = 10 } = {}) {
  return request({ path: "/university/courses", query: { q, filter, page: p, pageSize } }, () => {
    const rows = D.courses.filter((c) => (filter === "all" || c.dept === filter) && matches(q, [c.code, c.title])).map(courseView);
    return page(rows, p, pageSize);
  });
}

export function getCourse(id) {
  return request({ path: `/university/courses/${id}` }, () => {
    const c = D.courses.find((x) => x.id === id);
    if (!c) throw new ApiError("Course not found.", { status: 404 });
    return { course: courseView(c) };
  });
}

export function listOfferings({ q = "", filter = "all", page: p = 1, pageSize = 10 } = {}) {
  return request({ path: "/university/offerings", query: { q, filter, page: p, pageSize } }, () => {
    const rows = D.offerings
      .map((o) => ({ ...o, course: courseView(D.courses.find((c) => c.id === o.courseId)) }))
      .filter((o) => (filter === "all" || o.course.dept === filter) && matches(q, [o.course.code, o.course.title, o.course.lecturer?.name]));
    return page(rows, p, pageSize);
  });
}

export function getTimetable(dept) {
  return request({ path: "/university/timetable", query: { dept } }, () => {
    if (!D.deptByCode[dept]) throw new ApiError("Unknown department.", { status: 404 });
    const slots = D.timetableSlots
      .filter((s) => s.dept === dept)
      .map((s) => ({ ...s, course: D.courses.find((c) => c.id === s.courseId) }));
    return { dept, deptName: D.deptByCode[dept].name, slots, published: D.timetableStore.published[dept] || null };
  });
}

export function publishTimetable(dept) {
  return request({ path: "/university/timetable/publish", method: "POST", body: { dept } }, () => {
    if (!D.deptByCode[dept]) throw new ApiError("Unknown department.", { status: 404 });
    D.timetableStore.published[dept] = { at: Date.now() };
    addUniversityActivity({ title: "Timetable Published", detail: `Session 24/25 · Dept. ${D.deptByCode[dept].name}`, tone: "navy" });
    return { published: D.timetableStore.published[dept] };
  });
}

export function listAttendanceByDepartment({ q = "", page: p = 1, pageSize = 10 } = {}) {
  return request({ path: "/university/attendance", query: { q, page: p, pageSize } }, () => {
    const rows = D.attendanceByDept
      .map((a) => ({ ...a, id: a.dept, name: D.deptByCode[a.dept].name, faculty: D.deptByCode[a.dept].faculty }))
      .filter((a) => matches(q, [a.name, a.dept, a.faculty]));
    return page(rows, p, pageSize);
  });
}

export function listAssignments({ q = "", tab = "all", filter = "all", page: p = 1, pageSize = 10 } = {}) {
  return request({ path: "/university/assignments", query: { q, tab, filter, page: p, pageSize } }, () => {
    const rows = D.assignments
      .map((a) => ({ ...a, lecturer: lecturerById(a.lecturerId), dept: a.courseCode.split(" ")[0] }))
      .filter((a) => (tab === "all" || a.status === tab) && (filter === "all" || a.dept === filter) && matches(q, [a.title, a.courseCode, a.lecturer?.name]))
      .sort((a, b) => b.dueAt - a.dueAt);
    return page(rows, p, pageSize);
  });
}

export function getCalendar() {
  return request({ path: "/university/calendar" }, () => ({ session: "2024/2025", semester: "Semester 1", events: D.calendarEvents }));
}

export function getStructure() {
  return request({ path: "/university/structure" }, () => {
    const faculties = [...new Set(D.DEPARTMENTS.map((d) => d.faculty))].map((name) => ({
      name,
      departments: D.DEPARTMENTS.filter((d) => d.faculty === name).map((d) => ({
        ...d,
        lecturers: D.lecturers.filter((l) => l.dept === d.code).length,
        courses: D.courses.filter((c) => c.dept === d.code).length,
        programmes: D.PROGRAMMES.filter((p) => p.dept === d.code),
      })),
    }));
    return { faculties };
  });
}