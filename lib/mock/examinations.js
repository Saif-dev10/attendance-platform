// Mock service layer for the Examinations feature.
//
// Replace the implementations below with real API calls once the backend
// is ready (e.g. GET /api/students/:id/transcript,
// GET /api/students/:id/examination-allocation). The UI components only
// depend on the shape of the data returned here, so swapping this file
// out is enough — no component changes needed.

const TRANSCRIPT_DATA = [
  {
    session: "2025/2026",
    semester: "First Semester",
    gpa: 4.42,
    cgpa: 4.31,
    courses: [
      { code: "CSC301", title: "Advanced Algorithms", grade: "A", units: 3 },
      { code: "CSC303", title: "Database Systems", grade: "A", units: 3 },
      { code: "IT305", title: "Information Security", grade: "B", units: 3 },
      { code: "MTH301", title: "Numerical Analysis", grade: "B", units: 3 },
      { code: "GST301", title: "Entrepreneurship", grade: "A", units: 2 },
    ],
  },
  {
    session: "2024/2025",
    semester: "Second Semester",
    gpa: 4.18,
    cgpa: 4.24,
    courses: [
      { code: "CSC204", title: "Data Structures", grade: "A", units: 3 },
      { code: "IT202", title: "Web Technologies", grade: "B", units: 3 },
      { code: "MTH202", title: "Statistics II", grade: "B", units: 2 },
      { code: "GST202", title: "Peace and Conflict Resolution", grade: "A", units: 2 },
    ],
  },
];

const ALLOCATION_DATA = [
  {
    code: "CSC301",
    title: "Advanced Algorithms",
    date: "Monday, September 21, 2026",
    time: "10:00 AM",
    hall: "Main Lecture Hall B-04",
    seat: "B04-27",
  },
  {
    code: "CSC303",
    title: "Database Systems",
    date: "Wednesday, September 23, 2026",
    time: "2:00 PM",
    hall: "ICT Examination Hall",
    seat: "ICT-118",
  },
  {
    code: "IT305",
    title: "Information Security",
    date: "Friday, September 25, 2026",
    time: "9:00 AM",
    hall: "Faculty of Computing Hall A",
    seat: "A-062",
  },
];

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Returns the authenticated student's examination transcript, grouped by
 * academic session/semester.
 */
export async function getExaminationTranscript() {
  await delay(400);
  return TRANSCRIPT_DATA;
}

/**
 * Returns the authenticated student's current examination allocation.
 * Returns an empty array when allocation has not yet been published —
 * swap ALLOCATION_DATA for [] below to preview the empty state.
 */
export async function getExaminationAllocation() {
  await delay(900);
  return ALLOCATION_DATA;
}