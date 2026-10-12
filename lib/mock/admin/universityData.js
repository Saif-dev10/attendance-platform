// SAMPLE data for the inferred university sections. Names are fictional. Nothing here is live.
import { PROGRAMMES } from "./students";

const NOW = Date.now();
const DAY = 86400000;
const MIN = 60000;

export const DEPARTMENTS = [
  { code: "CSC", name: "Computer Science", faculty: "Faculty of Computing" },
  { code: "IFT", name: "Information Technology", faculty: "Faculty of Computing" },
  { code: "ENG", name: "Mechanical Engineering", faculty: "Faculty of Engineering" },
  { code: "ACC", name: "Accounting", faculty: "Faculty of Management Sciences" },
  { code: "MBA", name: "Business Administration", faculty: "Faculty of Management Sciences" },
  { code: "BCH", name: "Biochemistry", faculty: "Faculty of Life Sciences" },
  { code: "PHY", name: "Physics", faculty: "Faculty of Physical Sciences" },
  { code: "MTH", name: "Mathematics", faculty: "Faculty of Physical Sciences" },
  { code: "LAW", name: "Law", faculty: "Faculty of Law" },
  { code: "EDU", name: "Education", faculty: "Faculty of Education" },
];
export const deptByCode = Object.fromEntries(DEPARTMENTS.map((d) => [d.code, d]));

/* ---------- Lecturers ---------- */
const FIRST = ["Amina", "Bashir", "Chioma", "Danladi", "Esther", "Farouk", "Grace", "Hadiza", "Ibrahim", "Jamila", "Kabiru", "Lami", "Musa", "Ngozi", "Olufemi", "Patience", "Qasim", "Rukayya", "Sani", "Tunde"];
const LAST = ["Sani", "Lawal", "Eze", "Garba", "Okafor", "Bello", "Adeyemi", "Mohammed", "Danjuma", "Umar", "Yakubu", "Idris"];
const RANKS = ["Professor", "Associate Professor", "Senior Lecturer", "Lecturer I", "Lecturer II", "Assistant Lecturer"];

export const lecturers = Array.from({ length: 30 }, (_, i) => {
  const dept = DEPARTMENTS[i % 10];
  const first = FIRST[i % 20];
  const last = LAST[(i * 5) % 12];
  const rank = RANKS[i % 6];
  const prefix = rank === "Professor" || rank === "Associate Professor" ? "Prof. " : rank === "Senior Lecturer" ? "Dr. " : "";
  return {
    id: `lec_${i + 1}`,
    staffId: `STF${1001 + i}`,
    name: `${prefix}${first} ${last}`,
    email: `${first}.${last}`.toLowerCase() + "@buk.edu.ng",
    dept: dept.code,
    rank,
    status: i % 11 === 10 ? "on_leave" : "active",
  };
});

/* ---------- Courses and offerings ---------- */
const TITLES = {
  CSC: ["Data Structures", "Operating Systems", "Software Engineering"],
  IFT: ["Web Technologies", "Network Fundamentals", "Information Security"],
  ENG: ["Thermodynamics", "Fluid Mechanics", "Engineering Design"],
  ACC: ["Financial Accounting", "Cost Accounting", "Auditing"],
  MBA: ["Strategic Management", "Corporate Finance", "Marketing Analytics"],
  BCH: ["Enzymology", "Metabolism", "Molecular Biology"],
  PHY: ["Classical Mechanics", "Electromagnetism", "Quantum Physics"],
  MTH: ["Real Analysis", "Abstract Algebra", "Numerical Methods"],
  LAW: ["Constitutional Law", "Contract Law", "Criminal Law"],
  EDU: ["Curriculum Studies", "Educational Psychology", "School Administration"],
};

export const courses = DEPARTMENTS.flatMap((d, di) =>
  TITLES[d.code].map((title, k) => {
    const level = [200, 300, 400][k];
    return {
      id: `crs_${d.code.toLowerCase()}${k + 1}`,
      code: `${d.code} ${level / 100}0${k + 1}`,
      title,
      dept: d.code,
      level,
      credits: [2, 3, 4][(di + k) % 3],
      semester: (k % 2) + 1,
      lecturerId: lecturers[di + 10 * k].id, // lecturer i belongs to DEPARTMENTS[i % 10], so this is the same department
    };
  })
);

export const offerings = courses.map((c, i) => {
  const capacity = [60, 120, 200, 300][i % 4];
  return {
    id: `off_${c.id}`,
    courseId: c.id,
    session: "2024/2025",
    semester: c.semester,
    capacity,
    enrolled: Math.round(capacity * (0.55 + ((i * 7) % 40) / 100)),
    venue: ["LT 1", "LT 2", "Lab A", "Hall B", "Room 204"][i % 5],
  };
});

/* ---------- Timetable ---------- */
export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
export const TIME_BANDS = ["08:00 – 10:00", "10:00 – 12:00", "12:00 – 14:00", "14:00 – 16:00"];

export const timetableSlots = courses.flatMap((c) => {
  const di = DEPARTMENTS.findIndex((d) => d.code === c.dept);
  const k = Number(c.id.slice(-1)) - 1;
  const venue = offerings.find((o) => o.courseId === c.id).venue;
  return [0, 1].map((s) => ({ id: `${c.id}_s${s}`, courseId: c.id, dept: c.dept, day: (k * 2 + s) % 5, band: (di + k) % 4, venue }));
});

// Mutable in-memory publish state. CSC starts published, matching the University Overview reference.
export const timetableStore = { published: { CSC: { at: NOW - 120 * MIN } } };

/* ---------- Attendance control ---------- */
export const attendanceByDept = DEPARTMENTS.map((d, i) => {
  const avg = 76 + ((i * 7) % 20);
  const students = 800 + i * 120;
  return { dept: d.code, avg, students, below: Math.round(((students * (100 - avg)) / 100) * 0.35), sessions: 140 + i * 9 };
});

/* ---------- Assignments ---------- */
export const assignments = courses.slice(0, 18).map((c, i) => {
  const total = offerings.find((o) => o.courseId === c.id).enrolled;
  const dueAt = NOW + ((i % 6) - 3) * 5 * DAY;
  const past = dueAt <= NOW;
  const submitted = past ? Math.round(total * (0.8 + (i % 4) * 0.05)) : Math.round(total * (0.1 + (i % 5) * 0.08));
  const closed = past && i % 2 === 0;
  return {
    id: `asg_${i + 1}`,
    title: `Assignment ${(i % 3) + 1}: ${c.title}`,
    courseCode: c.code,
    lecturerId: c.lecturerId,
    dueAt,
    total,
    submitted,
    status: dueAt > NOW ? "open" : closed ? "closed" : "overdue",
  };
});

/* ---------- Calendar (session 2024/2025, semester 1) ---------- */
export const calendarEvents = [
  { id: "cal_1", title: "Course registration", start: "2024-09-23", end: "2024-10-04", type: "registration" },
  { id: "cal_2", title: "Lectures begin", start: "2024-10-07", end: "2024-10-07", type: "lectures" },
  { id: "cal_3", title: "Late registration closes", start: "2024-10-25", end: "2024-10-25", type: "registration" },
  { id: "cal_4", title: "Mid-semester break", start: "2024-11-18", end: "2024-11-22", type: "break" },
  { id: "cal_5", title: "Lectures end", start: "2025-01-17", end: "2025-01-17", type: "lectures" },
  { id: "cal_6", title: "First semester examinations", start: "2025-01-27", end: "2025-02-14", type: "exams" },
  { id: "cal_7", title: "Second semester begins", start: "2025-03-03", end: "2025-03-03", type: "lectures" },
];

/* ---------- Academic structure ---------- */
export { PROGRAMMES };