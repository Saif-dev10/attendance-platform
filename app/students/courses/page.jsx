"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import Button from "@/components/ui/Button";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Search,
  SlidersHorizontal,
  Users,
  X,
} from "lucide-react";

/*
 * Temporary frontend data.
 *
 * This will be replaced with the real courses API once the backend
 * endpoint is available. Keep the same object shape where possible.
 */
const COURSES = [
  {
    id: "CSC301",
    code: "CSC301",
    title: "Advanced Algorithms",
    units: 3,
    semester: "2nd Semester",
    level: "300 Level",
    instructor: "Dr. Yusuf Muhammad",
    instructorRole: "Senior Lecturer, Computer Science",
    schedule: "Tuesday, 10:00 AM – 12:00 PM",
    venue: "Main Auditorium, Hall B-04",
    attendance: 87,
    materials: 12,
    assignments: 2,
    status: "Active",
    description:
      "Advanced data structures and algorithms, including complexity analysis, dynamic programming, greedy algorithms, and graph theory.",
  },
  {
    id: "CSC305",
    code: "CSC305",
    title: "Operating Systems",
    units: 3,
    semester: "2nd Semester",
    level: "300 Level",
    instructor: "Dr. Ibrahim Musa",
    instructorRole: "Lecturer, Computer Science",
    schedule: "Monday, 12:00 PM – 2:00 PM",
    venue: "Computer Science Lecture Hall",
    attendance: 92,
    materials: 9,
    assignments: 1,
    status: "Active",
    description:
      "Core operating system concepts covering processes, memory management, scheduling, file systems, and system security.",
  },
  {
    id: "CSC307",
    code: "CSC307",
    title: "Database Management Systems",
    units: 3,
    semester: "2nd Semester",
    level: "300 Level",
    instructor: "Dr. Aisha Bello",
    instructorRole: "Lecturer, Computer Science",
    schedule: "Wednesday, 8:00 AM – 10:00 AM",
    venue: "ICT Lecture Theatre",
    attendance: 84,
    materials: 14,
    assignments: 3,
    status: "Active",
    description:
      "Database design, relational models, SQL, normalization, transactions, indexing, and practical database management.",
  },
  {
    id: "CSC309",
    code: "CSC309",
    title: "Computer Networks",
    units: 3,
    semester: "2nd Semester",
    level: "300 Level",
    instructor: "Prof. Ahmad Sani",
    instructorRole: "Professor, Computer Science",
    schedule: "Thursday, 10:00 AM – 12:00 PM",
    venue: "Networking Laboratory",
    attendance: 89,
    materials: 11,
    assignments: 2,
    status: "Active",
    description:
      "Network architectures, protocols, routing, addressing, transport services, network security, and practical networking.",
  },
  {
    id: "GST302",
    code: "GST302",
    title: "Entrepreneurship Studies",
    units: 2,
    semester: "2nd Semester",
    level: "300 Level",
    instructor: "Dr. Maryam Abdullahi",
    instructorRole: "Lecturer",
    schedule: "Friday, 10:00 AM – 12:00 PM",
    venue: "New Lecture Theatre",
    attendance: 95,
    materials: 7,
    assignments: 1,
    status: "Active",
    description:
      "Introduction to entrepreneurship, business planning, opportunity identification, innovation, and venture development.",
  },
];

const SEMESTERS = ["All Semesters", "2nd Semester", "1st Semester"];
const LEVELS = ["All Levels", "300 Level", "200 Level", "400 Level"];

export default function MyCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [semester, setSemester] = useState("All Semesters");
  const [level, setLevel] = useState("All Levels");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return COURSES.filter((course) => {
      const matchesSearch =
        !query ||
        course.code.toLowerCase().includes(query) ||
        course.title.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query);

      const matchesSemester =
        semester === "All Semesters" || course.semester === semester;

      const matchesLevel =
        level === "All Levels" || course.level === level;

      return matchesSearch && matchesSemester && matchesLevel;
    });
  }, [searchQuery, semester, level]);

  const hasFilters =
    searchQuery || semester !== "All Semesters" || level !== "All Levels";

  function clearFilters() {
    setSearchQuery("");
    setSemester("All Semesters");
    setLevel("All Levels");
  }

  return (
    <div className="min-h-screen bg-paper text-charcoal">
      <Sidebar />

      <Topbar
        title="My Courses"
        subtitle="View your enrolled courses, materials and academic progress."
      />

      <main className="min-h-screen overflow-y-auto bg-paper pb-[calc(84px+1.5rem)] pt-[72px] md:ml-[280px] md:pb-0">
        <div className="mx-auto max-w-[1500px] px-3 py-5 sm:px-6 sm:py-7 lg:px-8">

          {/* Course Overview */}
          <section className="mb-7">
            <div className="relative overflow-hidden rounded-2xl border border-line bg-white">
              {/* Subtle decorative structure */}
              <div className="absolute right-0 top-0 h-full w-1/3 overflow-hidden pointer-events-none">
                <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full border border-bronze-deep/10" />
                <div className="absolute -right-10 -top-14 h-44 w-44 rounded-full border border-bronze-deep/10" />
              </div>

              <div className="relative z-10 p-5 sm:p-6 lg:p-7">
                <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
                  {/* Intro */}
                  <div className="max-w-xl">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-bronze-deep" />

                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-graphite-soft">
                        2025/2026 · 2nd Semester
                      </span>
                    </div>

                    <h2 className="text-xl font-bold tracking-tight text-charcoal sm:text-2xl">
                      Your semester, in one place.
                    </h2>

                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-graphite-soft">
                      Keep track of the courses you are taking this semester and
                      quickly get to your materials, assignments, attendance and grades.
                    </p>
                  </div>

                  {/* Course summary */}
                  <div className="grid grid-cols-3 divide-x divide-line rounded-xl border border-line bg-cream/60">
                    <div className="min-w-[90px] px-4 py-4 sm:min-w-[105px] sm:px-5">
                      <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-graphite-soft">
                        Courses
                      </p>

                      <p className="mt-1 text-xl font-bold tracking-tight text-charcoal">
                        {COURSES.length}
                      </p>

                      <p className="mt-0.5 text-[10px] text-graphite-soft">
                        enrolled
                      </p>
                    </div>

                    <div className="min-w-[90px] px-4 py-4 sm:min-w-[105px] sm:px-5">
                      <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-graphite-soft">
                        Units
                      </p>

                      <p className="mt-1 text-xl font-bold tracking-tight text-charcoal">
                        {COURSES.reduce((total, course) => total + course.units, 0)}
                      </p>

                      <p className="mt-0.5 text-[10px] text-graphite-soft">
                        credit units
                      </p>
                    </div>

                    <div className="min-w-[90px] px-4 py-4 sm:min-w-[105px] sm:px-5">
                      <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-graphite-soft">
                        Status
                      </p>

                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />

                        <span className="text-xs font-bold text-charcoal">
                          Active
                        </span>
                      </div>

                      <p className="mt-0.5 text-[10px] text-graphite-soft">
                        current semester
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick context row */}
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-graphite-soft">
                      Level
                    </span>

                    <span className="text-xs font-bold text-charcoal">
                      300 Level
                    </span>
                  </div>

                  <span className="hidden h-3 w-px bg-line sm:block" />

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-graphite-soft">
                      Semester
                    </span>

                    <span className="text-xs font-bold text-charcoal">
                      2nd Semester
                    </span>
                  </div>

                  <span className="hidden h-3 w-px bg-line sm:block" />

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-graphite-soft">
                      Programme
                    </span>

                    <span className="text-xs font-bold text-charcoal">
                      Computer Science
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Search and filters */}
          <section className="mb-7 rounded-2xl border border-line bg-white p-3 sm:p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-graphite-soft"
                />

                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search by course code, course name or instructor..."
                  className="h-12 w-full rounded-xl border border-line bg-cream pl-11 pr-10 text-sm text-charcoal outline-none transition focus:border-bronze-deep focus:ring-2 focus:ring-bronze-deep/10"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-graphite-soft transition hover:bg-paper hover:text-charcoal"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              <Button
                type="button"
                onClick={() => setFiltersOpen((value) => !value)}
                className={`flex h-12 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-bold transition ${
                  filtersOpen || hasFilters
                    ? "border-bronze-deep bg-bronze-deep text-cream"
                    : "border-line !bg-white !text-charcoal hover:!bg-cream"
                }`}
              >
                <SlidersHorizontal size={16} />
                Filters
                {hasFilters && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-cream px-1.5 text-[10px] font-bold text-bronze-deep">
                    {(semester !== "All Semesters" ? 1 : 0) +
                      (level !== "All Levels" ? 1 : 0)}
                  </span>
                )}
              </Button>
            </div>

            {filtersOpen && (
              <div className="mt-3 grid grid-cols-1 gap-3 border-t border-line pt-3 sm:grid-cols-2">
                <FilterSelect
                  label="Semester"
                  value={semester}
                  options={SEMESTERS}
                  onChange={setSemester}
                />

                <FilterSelect
                  label="Level"
                  value={level}
                  options={LEVELS}
                  onChange={setLevel}
                />
              </div>
            )}

            {hasFilters && (
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3">
                <p className="text-xs text-graphite-soft">
                  Showing{" "}
                  <span className="font-bold text-charcoal">
                    {filteredCourses.length}
                  </span>{" "}
                  of {COURSES.length} courses
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-bold text-bronze-deep hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </section>

          {/* Course grid */}
          {filteredCourses.length > 0 ? (
            <section>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-charcoal">
                    Enrolled Courses
                  </h2>
                  <p className="mt-1 text-xs text-graphite-soft">
                    Select a course to view its academic details.
                  </p>
                </div>

                <span className="text-xs font-bold text-graphite-soft">
                  {filteredCourses.length}{" "}
                  {filteredCourses.length === 1 ? "course" : "courses"}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </section>
          ) : (
            <EmptyState onClear={clearFilters} />
          )}
        </div>
      </main>

      <MobileBottomNav active="academic" />
    </div>
  );
}

function CourseCard({ course }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-line bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-bronze-deep/30 hover:shadow-lg hover:shadow-charcoal/5">
      {/* Course header */}
      <div className="border-b border-line p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-charcoal px-2.5 py-1 text-[10px] font-bold tracking-wider text-cream">
                {course.code}
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                <CheckCircle2 size={11} />
                {course.status}
              </span>
            </div>

            <h3 className="text-lg font-bold tracking-tight text-charcoal sm:text-xl">
              {course.title}
            </h3>

            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-graphite-soft">
              {course.description}
            </p>
          </div>

          <div className="hidden shrink-0 text-right sm:block">
            <p className="text-[10px] font-bold uppercase tracking-wider text-graphite-soft">
              Credit
            </p>
            <p className="mt-1 text-xl font-bold text-charcoal">
              {course.units}
            </p>
          </div>
        </div>
      </div>

      {/* Course information */}
      <div className="grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <div className="space-y-4 p-5 sm:p-6">
          <InfoRow
            icon={GraduationCap}
            label="Instructor"
            value={course.instructor}
          />

          <InfoRow
            icon={CalendarDays}
            label="Schedule"
            value={course.schedule}
          />

          <InfoRow
            icon={Clock3}
            label="Venue"
            value={course.venue}
          />
        </div>

        <div className="p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-graphite-soft">
                Attendance
              </p>
              <p className="mt-1 text-2xl font-bold text-charcoal">
                {course.attendance}%
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cream text-bronze-deep">
              <Users size={19} />
            </div>
          </div>

          <div className="mb-5">
            <div className="mb-2 flex items-center justify-between text-[10px] font-bold">
              <span className="text-graphite-soft">Attendance rate</span>
              <span className="text-charcoal">{course.attendance}%</span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-cream">
              <div
                className="h-full rounded-full bg-bronze-deep transition-all"
                style={{ width: `${course.attendance}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <MiniStat label="Materials" value={course.materials} />
            <MiniStat label="Assignments" value={course.assignments} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 border-t border-line bg-cream/50 px-5 py-4 sm:px-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-graphite-soft">
            {course.semester}
          </p>
          <p className="mt-0.5 text-xs font-bold text-charcoal">
            {course.level} · {course.units} Credit Units
          </p>
        </div>

        <Link href={`/students/courses/${course.id}`}>
          <Button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-charcoal px-4 py-2.5 text-xs font-bold text-cream transition-all hover:bg-bronze-deep active:opacity-80"
          >
            View Course
            <ArrowRight size={14} />
          </Button>
        </Link>
      </div>
    </article>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cream text-graphite-soft">
        <Icon size={15} />
      </div>

      <div className="min-w-0">
        <p className="text-[9px] font-bold uppercase tracking-wider text-graphite-soft">
          {label}
        </p>
        <p className="mt-1 truncate text-xs font-bold text-charcoal">
          {value}
        </p>
      </div>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-xl border border-line bg-paper px-3 py-2.5">
      <p className="text-[9px] font-bold uppercase tracking-wider text-graphite-soft">
        {label}
      </p>
      <p className="mt-1 text-sm font-bold text-charcoal">{value}</p>
    </div>
  );
}

function FilterSelect({ label, value, options, onChange }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-graphite-soft">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-xl border border-line bg-cream px-3 text-sm font-medium text-charcoal outline-none transition focus:border-bronze-deep focus:ring-2 focus:ring-bronze-deep/10"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function EmptyState({ onClear }) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-white px-5 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cream text-graphite-soft">
        <Search size={22} />
      </div>

      <h3 className="mt-5 text-base font-bold text-charcoal">
        No courses found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-graphite-soft">
        We couldn't find any courses matching your search or selected filters.
        Try a different course name, code or instructor.
      </p>

      <Button
        type="button"
        onClick={onClear}
        className="mt-5 rounded-xl bg-charcoal px-5 py-2.5 text-xs font-bold text-cream hover:bg-bronze-deep"
      >
        Clear Search & Filters
      </Button>
    </div>
  );
}