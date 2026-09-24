// One place for every attendance URL. If the route root differs from
// /lecturer/attendance, this is the only line to change.
const BASE = "/lecturer/attendance";

export const attendanceRoutes = {
  overview: BASE,
  qr: `${BASE}/qr`,
  session: (sessionId) => `${BASE}/sessions/${sessionId}`,
  student: (studentId) => `${BASE}/students/${studentId}`,
};