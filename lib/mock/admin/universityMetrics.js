const MIN = 60000;
const NOW = Date.now();

export const universityKpis = [
  { id: "students", label: "Total Students", value: "32,450", caption: "+120 from last session", icon: "student" },
  { id: "lecturers", label: "Lecturers", value: "1,240", caption: "Active staff directory", icon: "lecturer" },
  { id: "courses", label: "Total Courses", value: "842", caption: "Catalogue and offerings", icon: "book" },
  { id: "attendance", label: "Attendance %", value: "88.4%", caption: "Above platform average", captionTone: "positive", icon: "qr" },
];

export const ATTENDANCE_RANGES = [
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "semester", label: "This Semester" },
];

// SAMPLE QR scan volumes. The 7-day values follow the reference chart.
export const attendanceSeries = {
  "7d": { labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], values: [12400, 15200, 14800, 16100, 13900, 2100, 400] },
  "30d": { labels: ["Wk 1", "Wk 2", "Wk 3", "Wk 4"], values: [71200, 76800, 69400, 74100] },
  semester: { labels: ["Sep", "Oct", "Nov", "Dec", "Jan"], values: [58000, 302000, 289000, 241000, 112000] },
};

export const universityStore = {
  recent: [
    { id: "ua_1", title: "Timetable Published", detail: "Session 24/25 · Dept. Computer Sci.", at: NOW - 120 * MIN, tone: "navy" },
    { id: "ua_2", title: "Enrolment Import", detail: "842 students successfully imported.", at: NOW - 300 * MIN, tone: "yellow" },
    { id: "ua_3", title: "Lecturer Account Created", detail: "Dr. A. Sani added to Dept. Physics.", at: NOW - 1560 * MIN, tone: "navy" },
    { id: "ua_4", title: "Attendance Alert Sent", detail: "62 students below the 70% threshold.", at: NOW - 1800 * MIN, tone: "yellow" },
  ],
};

export function addUniversityActivity({ title, detail, tone = "navy" }) {
  universityStore.recent.unshift({ id: `ua_${Date.now()}`, title, detail, tone, at: Date.now() });
  universityStore.recent = universityStore.recent.slice(0, 20);
}