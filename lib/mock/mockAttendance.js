// Temporary sample data. Nothing else in the attendance screens should hardcode
// students, sessions or numbers; everything comes through services/attendanceService.js.
// Times without a "Z" are local wall-clock strings, dates are YYYY-MM-DD.

export const mockCourses = [
  { id: "csc301", code: "CSC301", title: "Advanced Algorithms", level: 300, semester: "2nd Semester", enrolled: 52 },
  { id: "csc305", code: "CSC305", title: "Computer Networks", level: 300, semester: "2nd Semester", enrolled: 48 },
  { id: "csc401", code: "CSC401", title: "Web Technologies", level: 400, semester: "2nd Semester", enrolled: 43 },
];

export const mockRooms = ["LT 1", "LT 2", "LT 3", "Computer Lab 1"];

export const mockStudents = [
  { id: "stu_001", name: "David Okafor", matricNumber: "U2021/12345", level: 300, programme: "B.Sc. Computer Science" },
  { id: "stu_002", name: "Ibrahim Musa", matricNumber: "U2021/12346", level: 300, programme: "B.Sc. Computer Science" },
  { id: "stu_003", name: "Aisha Bello", matricNumber: "U2021/12347", level: 300, programme: "B.Sc. Computer Science" },
  { id: "stu_004", name: "Chinedu Ibe", matricNumber: "U2021/12348", level: 300, programme: "B.Sc. Computer Science" },
  { id: "stu_005", name: "Fatima Yusuf", matricNumber: "U2021/12349", level: 300, programme: "B.Sc. Computer Science" },
  { id: "stu_006", name: "Musa Abdullahi", matricNumber: "U2021/12350", level: 300, programme: "B.Sc. Computer Science" },
  { id: "stu_007", name: "Sadiq Ibrahim", matricNumber: "U2021/12351", level: 300, programme: "B.Sc. Computer Science" },
];

export const mockSessions = [
  {
    id: "ses_001",
    courseId: "csc301",
    courseCode: "CSC301",
    courseTitle: "Advanced Algorithms",
    level: 300,
    room: "LT 3",
    date: "2026-09-20",
    scheduledTime: "10:00 AM – 12:00 PM",
    status: "active",
    totalStudents: 52,
  },
  {
    id: "ses_000",
    courseId: "csc305",
    courseCode: "CSC305",
    courseTitle: "Computer Networks",
    level: 300,
    room: "LT 2",
    date: "2026-09-17",
    scheduledTime: "10:00 AM – 12:00 PM",
    status: "closed",
    totalStudents: 52,
  },
];

// Totals and rates are computed by the server in the real thing; the UI only displays them.
export const mockSessionSummaries = {
  ses_001: { total: 52, present: 38, late: 6, absent: 8, pending: 0, rate: 73.1, rateChange: 6.2 },
  ses_000: { total: 52, present: 46, late: 5, absent: 1, pending: 0, rate: 88.5, rateChange: null },
};

const studentById = Object.fromEntries(mockStudents.map((student) => [student.id, student]));

const makeRecord = (id, studentId, checkInTime, status) => ({
  id,
  studentId,
  studentName: studentById[studentId].name,
  matricNumber: studentById[studentId].matricNumber,
  checkInTime,
  status,
});

// A sample page of rows. The real endpoint will return all 52 (or one page of them).
const liveRecords = [
  makeRecord("rec_001", "stu_001", "2026-09-20T10:04:00", "present"),
  makeRecord("rec_002", "stu_002", "2026-09-20T10:07:00", "present"),
  makeRecord("rec_003", "stu_003", null, "pending"),
  makeRecord("rec_004", "stu_004", "2026-09-20T10:12:00", "present"),
  makeRecord("rec_005", "stu_005", "2026-09-20T10:15:00", "late"),
  makeRecord("rec_006", "stu_006", "2026-09-20T10:18:00", "present"),
  makeRecord("rec_007", "stu_007", null, "pending"),
];

// A closed session has no pending rows, so anyone who never checked in is absent.
const closedRecords = liveRecords.map((record) =>
  record.status === "pending" ? { ...record, status: "absent" } : record
);

export const mockRecordsBySession = {
  ses_001: liveRecords,
  ses_000: closedRecords,
};

export const mockTrend = [
  { label: "13 Sep", rate: 66.0 },
  { label: "15 Sep", rate: 69.5 },
  { label: "17 Sep", rate: 66.9 },
  { label: "20 Sep", rate: 73.1 },
];

export const mockTeachingSummary = {
  classesToday: 1,
  classesScheduledToday: 3,
  totalStudents: 143,
  averageRate: 86.7,
  belowThresholdCount: 4,
};

// type: failed_scan | duplicate_scan | outside_geofence | manual_change
export const mockExceptions = [
  { id: "exc_001", type: "failed_scan", studentName: "Sadiq Ibrahim", matricNumber: "U2021/12351", at: "2026-09-17T10:06:00", detail: "QR token had expired when the scan reached the server" },
  { id: "exc_002", type: "failed_scan", studentName: "Aisha Bello", matricNumber: "U2021/12347", at: "2026-09-17T10:09:00", detail: "Scan rejected: request timed out" },
  { id: "exc_003", type: "duplicate_scan", studentName: "Ibrahim Musa", matricNumber: "U2021/12346", at: "2026-09-17T10:08:00", detail: "Second scan ignored, first check-in kept" },
  { id: "exc_004", type: "outside_geofence", studentName: "Fatima Yusuf", matricNumber: "U2021/12349", at: "2026-09-17T10:15:00", detail: "Scan came from outside the campus geofence" },
  { id: "exc_005", type: "outside_geofence", studentName: "Sadiq Ibrahim", matricNumber: "U2021/12351", at: "2026-09-17T10:16:00", detail: "Scan came from outside the campus geofence" },
  { id: "exc_006", type: "manual_change", studentName: "Aisha Bello", matricNumber: "U2021/12347", at: "2026-09-17T10:18:00", detail: "Absent → Present by Dr. James Okafor" },
];

// Audit entries are append-only. The UI only ever reads them.
export const mockAuditTrail = [
  { id: "aud_002", sessionId: "ses_000", recordId: "rec_003", action: "status_change", from: "absent", to: "present", by: "Dr. James Okafor", byRole: "Lecturer", at: "2026-09-17T10:18:00", reason: "Network issue during check-in" },
  { id: "aud_001", sessionId: "ses_000", recordId: "rec_003", action: "created", from: null, to: "absent", by: "System", byRole: "System", at: "2026-09-17T09:43:00", reason: "Initial status: Absent" },
];

// One sample analytics payload; the service reuses it for any student id.
export const mockStudentAnalytics = {
  overall: { rate: 72.7, present: 40, late: 6, absent: 9 },
  quickStats: { totalCourses: 5, totalSessions: 55, coursesPassed: 2, coursesAtRisk: 3 },
  courses: [
    { code: "CSC301", title: "Advanced Algorithms", level: 300, sessions: 11, present: 9, late: 1, absent: 1, rate: 81.8 },
    { code: "CSC305", title: "Computer Networks", level: 300, sessions: 10, present: 7, late: 1, absent: 2, rate: 70.0 },
    { code: "CSC401", title: "Web Technologies", level: 400, sessions: 9, present: 6, late: 1, absent: 2, rate: 66.7 },
    { code: "CSC405", title: "Database Systems", level: 400, sessions: 12, present: 7, late: 2, absent: 3, rate: 58.3 },
    { code: "MTH201", title: "Discrete Mathematics", level: 200, sessions: 13, present: 11, late: 1, absent: 1, rate: 84.6 },
  ],
  trend: [
    { label: "Week 1", present: 6, late: 1, absent: 2 },
    { label: "Week 2", present: 8, late: 1, absent: 1 },
    { label: "Week 3", present: 9, late: 2, absent: 2 },
    { label: "Week 4", present: 8, late: 1, absent: 2 },
    { label: "Week 5", present: 9, late: 1, absent: 2 },
  ],
  timeline: [
    { id: "tl_1", at: "2026-09-20T10:04:00", courseCode: "CSC301", status: "present" },
    { id: "tl_2", at: "2026-09-17T09:58:00", courseCode: "CSC305", status: "late" },
    { id: "tl_3", at: "2026-09-15T10:02:00", courseCode: "CSC401", status: "present" },
    { id: "tl_4", at: "2026-09-12T10:10:00", courseCode: "CSC301", status: "absent" },
    { id: "tl_5", at: "2026-09-10T09:55:00", courseCode: "CSC405", status: "present" },
  ],
};