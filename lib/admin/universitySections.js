// INFERRED: none of these sections has a reference screenshot, so only a short description
// and a high-level list of what each section would contain are given. No layouts are invented.
export const UNIVERSITY_SECTIONS = {
  "academic-structure": {
    title: "Academic Structure",
    group: "Academic Management",
    description: "Faculties, departments and programmes for this university.",
    planned: ["Faculties and departments", "Programmes and their levels", "Bulk structure import"],
  },
  "academic-calendar": {
    title: "Academic Calendar",
    group: "Academic Management",
    description: "Sessions, semesters and key dates.",
    planned: ["Academic sessions and semesters", "Registration and examination periods", "Public holidays"],
  },
  lecturers: {
    title: "Lecturer Directory",
    group: "Academic Management",
    description: "Lecturer records for this university.",
    planned: ["Searchable lecturer list", "Department and rank", "Course assignments"],
    detailTitle: "Lecturer record",
  },
  courses: {
    title: "Course Catalogue",
    group: "Academic Management",
    description: "The catalogue of courses offered by this university.",
    planned: ["Course codes, titles and credit units", "Department ownership", "Prerequisites"],
    detailTitle: "Course record",
  },
  "course-offerings": {
    title: "Course Offerings",
    group: "Operations",
    description: "Which courses run in the current session and semester.",
    planned: ["Offerings per semester", "Assigned lecturers", "Enrolment limits"],
  },
  timetable: {
    title: "Timetable Admin",
    group: "Operations",
    description: "Lecture timetables and their publication.",
    planned: ["Weekly timetable by department", "Venue and clash checks", "Publish to students and lecturers"],
  },
  attendance: {
    title: "Attendance Control",
    group: "Operations",
    description: "University-level attendance oversight.",
    planned: ["Attendance by department and course", "Low-attendance follow-up", "Session records"],
  },
  assignments: {
    title: "Assignment Monitor",
    group: "Operations",
    description: "Oversight of assignments set by lecturers.",
    planned: ["Assignments by course", "Submission rates", "Overdue items"],
  },
  // Additional routes that exist in the project but are not in the supplied references.
  examinations: { title: "Examinations", group: "Additional", description: "Examination administration.", planned: ["Examination schedule", "Allocation", "Results"] },
  reports: { title: "Reports", group: "Additional", description: "Reports for this university.", planned: ["Enrolment and attendance reports", "Export to CSV"] },
  users: { title: "Users", group: "Additional", description: "Administrator accounts for this university.", planned: ["Administrator list", "Roles and access"] },
  imports: { title: "Imports", group: "Additional", description: "Data imports for this university.", planned: ["Import history", "Student and lecturer imports"] },
  settings: { title: "Settings", group: "Additional", description: "University-level settings.", planned: ["Institution profile", "Notification preferences"] },
};