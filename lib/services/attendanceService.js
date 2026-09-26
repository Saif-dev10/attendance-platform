// Every call the attendance screens make to the backend goes through this file.
// For now each function returns mock data. When the API exists, replace the body of
// a function and keep the return shape; hooks and components should not need changes.
//
// PROPOSED API CONTRACT (not implemented; for the backend developer to confirm):
//   GET  /courses                                       -> Course[]
//   GET  /attendance/overview?courseId&level&semester   -> { session, summary, trend, teaching }
//   GET  /attendance/sessions/:sessionId/records        -> AttendanceRecord[]
//   GET  /attendance/sessions/:sessionId                -> { session, summary, records, exceptions }
//   GET  /attendance/sessions/:sessionId/records/:recordId/audit -> AuditEntry[]
//   POST /attendance/sessions                           -> QrSession   (start)
//   POST /attendance/sessions/:sessionId/qr/refresh     -> { qrToken, expiresAt }
//   POST /attendance/sessions/:sessionId/end            -> { sessionId, status, endedAt }
//   PATCH /attendance/sessions/:sessionId/records/:recordId -> { record, auditEntry }
//   GET  /students/:studentId/attendance                -> StudentProfile
//
// Validation, QR validity, geofence checks and audit logging all belong to the server.

import {
  mockAuditTrail,
  mockCourses,
  mockExceptions,
  mockRecordsBySession,
  mockSessionSummaries,
  mockSessions,
  mockStudentAnalytics,
  mockStudents,
  mockTeachingSummary,
  mockTrend,
} from "@/lib/mock/mockAttendance";

// Local wall-clock string in the same format as the mock data.
function nowLocalIso() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
}

// Placeholder token. The real one is issued and signed by the server.
function mockQrToken(rotateEverySeconds = 180) {
  return {
    qrToken: `mock-token-${Date.now()}`,
    expiresAt: new Date(Date.now() + rotateEverySeconds * 1000).toISOString(),
    rotateEverySeconds,
  };
}

export async function getCourses() {
  return mockCourses;
}

export async function getOverview({ courseId }) {
  // Prefer the active session; otherwise fall back to the latest one for that course.
  const sessions = mockSessions.filter((session) => session.courseId === courseId);
  const session = sessions.find((s) => s.status === "active") ?? sessions[0] ?? null;

  return {
    session,
    summary: session ? mockSessionSummaries[session.id] : null,
    trend: mockTrend,
    teaching: mockTeachingSummary,
  };
}

export async function getSessionRecords(sessionId) {
  return mockRecordsBySession[sessionId] ?? [];
}

export async function getSessionRecord(sessionId) {
  const session = mockSessions.find((s) => s.id === sessionId) ?? null;
  if (!session) return null;

  return {
    session,
    summary: mockSessionSummaries[sessionId],
    records: mockRecordsBySession[sessionId] ?? [],
    exceptions: mockExceptions,
  };
}

export async function getAuditTrail(sessionId, recordId) {
  return mockAuditTrail.filter((entry) => entry.sessionId === sessionId && entry.recordId === recordId);
}

export async function startQrSession(setup) {
  const course = mockCourses.find((c) => c.id === setup.courseId);
  if (!course) throw new Error("Course not found");

  return {
    sessionId: "ses_001",
    status: "live",
    courseCode: course.code,
    courseTitle: course.title,
    level: setup.level,
    room: setup.room,
    date: setup.date,
    scheduledTime: setup.scheduledTime,
    sessionCode: "SKUL-8F3A-2D9K",
    ...mockQrToken(),
    geofence: {
      enabled: setup.method === "qr_location" && setup.geofenceEnabled,
      radiusMeters: setup.geofenceRadius,
    },
    // These two would be pushed or polled from the server while the session runs.
    scannedCount: 38,
    totalStudents: course.enrolled,
  };
}

export async function refreshQrToken(sessionId) {
  void sessionId; // the mock ignores it; the real endpoint is scoped to the session
  return mockQrToken();
}

export async function endSession(sessionId) {
  return { sessionId, status: "closed", endedAt: nowLocalIso() };
}

export async function correctRecord(sessionId, recordId, { status, reason }) {
  const record = mockRecordsBySession[sessionId]?.find((r) => r.id === recordId);
  if (!record) throw new Error("Record not found");

  // The client only sends status + reason. The server decides who made the change
  // and when, from the authenticated lecturer and its own clock.
  const auditEntry = {
    id: `aud_${Date.now()}`,
    sessionId,
    recordId,
    action: "status_change",
    from: record.status,
    to: status,
    by: "Dr. James Okafor",
    byRole: "Lecturer",
    at: nowLocalIso(),
    reason,
  };

  return { record: { ...record, status }, auditEntry };
}

export async function getStudentProfile(studentId) {
  const student = mockStudents.find((s) => s.id === studentId) ?? null;
  if (!student) return null;
  return { student, ...mockStudentAnalytics };
}

export async function getSessions({ courseId } = {}) {
  const sessions = courseId ? mockSessions.filter((s) => s.courseId === courseId) : mockSessions;

  return sessions
    .map((session) => ({ ...session, summary: mockSessionSummaries[session.id] }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}