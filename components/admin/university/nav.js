// University administration navigation. Separate from the platform nav on purpose.
// Reference screens show different subsets per page (Student Directory shows 4 items, Overview shows 10);
// this is the full set, matching the University Overview reference.
export const UNIVERSITY_NAV = [
  {
    title: "Academic Management",
    items: [
      { label: "Overview", href: "/admin/university", icon: "overview", exact: true },
      { label: "Academic Structure", href: "/admin/university/academic-structure", icon: "structure" },
      { label: "Academic Calendar", href: "/admin/university/academic-calendar", icon: "calendar" },
      { label: "Student Directory", href: "/admin/university/students", icon: "student" },
      { label: "Lecturer Directory", href: "/admin/university/lecturers", icon: "lecturer" },
      { label: "Course Catalogue", href: "/admin/university/courses", icon: "book" },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Course Offerings", href: "/admin/university/course-offerings", icon: "layers" },
      { label: "Timetable Admin", href: "/admin/university/timetable", icon: "clock" },
      { label: "Attendance Control", href: "/admin/university/attendance", icon: "qr" },
      { label: "Assignment Monitor", href: "/admin/university/assignments", icon: "file" },
    ],
  },
];