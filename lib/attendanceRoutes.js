// One place for every attendance URL. If the route root differs from
// /lecturer/attendance, this is the only line to change.
const BASE = "/lecturers/attendance";

export const attendanceRoutes = {
  overview: BASE,
  qr: `${BASE}/qr`,
  history: `${BASE}/sessions`,
  session: (sessionId) => `${BASE}/sessions/${sessionId}`,
  student: (studentId) => `${BASE}/students/${studentId}`,
};