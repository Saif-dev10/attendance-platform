"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import Button from "@/components/ui/Button";
import { getStudentProfile } from "@/lib/services/profile";
import { getStudentCourses } from "@/lib/services/courses";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

export default function MyCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [student, setStudent] = useState(null);

  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingStudent, setLoadingStudent] = useState(true);

  const [coursesError, setCoursesError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [semester, setSemester] = useState("All Semesters");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    async function loadPage() {
      try {
        const [profileResponse, coursesResponse] = await Promise.all([
          getStudentProfile(),
          getStudentCourses(),
        ]);

        /*
         * Profile API
         *
         * Keep the same response handling already used by the
         * existing student profile implementation.
         */
        setStudent(profileResponse?.data ?? profileResponse);

        /*
         * The backend returns student course enrollments.
         *
         * Each enrollment contains:
         * - course
         * - academic_session
         * - semester
         *
         * We convert that backend structure into a simpler
         * object for the UI.
         */
        const enrollments = coursesResponse?.data ?? [];

        const formattedCourses = enrollments
          .map((enrollment) => {
            const course = enrollment?.course;

            if (!course) {
              return null;
            }

            return {
              id: enrollment.course_id,
              code: course.code,
              title: course.title,
              description: course.description,
              units: Number(course.credit_units || 0),
              status: enrollment.status,
              courseType: course.course_type,
              department: course.department?.name || "",
              semester: enrollment.semester?.name || "",
              academicSession:
                enrollment.academic_session?.name || "",
            };
          })
          .filter(Boolean);

        setCourses(formattedCourses);
      } catch (error) {
        console.error("Failed to load student courses:", error);
        setCoursesError(
          "Unable to load your courses right now. Please try again."
        );
      } finally {
        setLoadingCourses(false);
        setLoadingStudent(false);
      }
    }

    loadPage();
  }, []);

  const filteredCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesSearch =
        !query ||
        course.code?.toLowerCase().includes(query) ||
        course.title?.toLowerCase().includes(query) ||
        course.description?.toLowerCase().includes(query);

      const matchesSemester =
        semester === "All Semesters" || course.semester === semester;

      return matchesSearch && matchesSemester;
    });
  }, [courses, searchQuery, semester]);

  const totalUnits = useMemo(() => {
    return courses.reduce(
      (total, course) => total + Number(course.units || 0),
      0
    );
  }, [courses]);

  const currentSemester = useMemo(() => {
    const semesterNames = [
      ...new Set(
        courses
          .map((course) => course.semester)
          .filter(Boolean)
      ),
    ];

    return semesterNames.length === 1
      ? semesterNames[0]
      : semesterNames.join(" / ") || "Current Semester";
  }, [courses]);

  const currentSession = useMemo(() => {
    const sessionNames = courses
      .map((course) => course.academicSession)
      .filter(Boolean);

    return sessionNames[0] || student?.session || "Current Session";
  }, [courses, student]);

  const enrollmentStatus = useMemo(() => {
    if (!courses.length) {
      return "No Enrolment";
    }

    const activeCourses = courses.filter(
      (courses) => course.status === "enrolled"
    );

    return activeCourses.length > 0 ? "Active" : "Inactive";
  }, [courses]);

  const semesterOPtions = useMemo(() => {
    const semesters = courses
    .map((course) => course.semester)
    .filter(Boolean);

    return ["All Semesters", ...new Set(semesters)];
  }, [courses]);

  const hasFilters =
    searchQuery || semester !== "All Semesters";

  function clearFilters() {
    setSearchQuery("");
    setSemester("All Semesters");
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
              <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 overflow-hidden">
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
                        {currentSession}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold tracking-tight text-charcoal sm:text-2xl">
                      Your semester, in one place.
                    </h2>

                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-graphite-soft">
                      Keep track of the courses you are taking this semester
                      and quickly get to your materials, assignments,
                      attendance and grades.
                    </p>
                  </div>

                  {/* Course summary */}
                  <div className="grid grid-cols-3 divide-x divide-line rounded-xl border border-line bg-cream/60">
                    <div className="min-w-[90px] px-4 py-4 sm:min-w-[105px] sm:px-5">
                      <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-graphite-soft">
                        Courses
                      </p>

                      <p className="mt-1 text-xl font-bold tracking-tight text-charcoal">
                        {loadingCourses ? "—" : courses.length}
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
                        {loadingCourses ? "—" : totalUnits}
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
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          enrollmentStatus === "Active"
                            ? "bg-emeraid-600"
                            : "bg-graphite-soft"
                          }`} 
                        />

                        <span className="text-xs font-bold text-charcoal">
                          {enrollmentStatus}
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
                      {student?.level
                        ? `${student.level} Level`
                        : "_"}
                    </span>
                  </div>

                  <span className="hidden h-3 w-px bg-line sm:block" />

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-graphite-soft">
                      Semester
                    </span>

                    <span className="text-xs font-bold text-charcoal">
                      {currentSemester}
                    </span>
                  </div>

                  <span className="hidden h-3 w-px bg-line sm:block" />

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-graphite-soft">
                      Programme
                    </span>

                    <span className="text-xs font-bold text-charcoal">
                      {student?.programme || "_"}
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
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  placeholder="Search by course code or course name..."
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
                onClick={() =>
                  setFiltersOpen((value) => !value)
                }
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
                    {semester !== "All Semesters" ? 1 : 0}
                  </span>
                )}
              </Button>
            </div>

            {filtersOpen && (
              <div className="mt-3 grid grid-cols-1 gap-3 border-t border-line pt-3 sm:grid-cols-2">
                <FilterSelect
                  label="Semester"
                  value={semester}
                  options={semesterOPtions}
                  onChange={setSemester}
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
                  of {courses.length} courses
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

          {/* API Error */}
          {coursesError && (
            <section className="mb-7 rounded-2xl border border-red-200 bg-white p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <BookOpen size={18} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-charcoal">
                    Unable to load courses
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-graphite-soft">
                    {coursesError}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Loading State */}
          {loadingCourses ? (
            <section>
              <div className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-charcoal">
                  Enrolled Courses
                </h2>

                <p className="mt-1 text-xs text-graphite-soft">
                  Loading your enrolled courses...
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                {[1, 2].map((item) => (
                  <CourseCardSkeleton key={item} />
                ))}
              </div>
            </section>
          ) : filteredCourses.length > 0 ? (
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
                  {filteredCourses.length === 1
                    ? "course"
                    : "courses"}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                  />
                ))}
              </div>
            </section>
          ) : (
            <EmptyState
              onClear={clearFilters}
              hasCourses={courses.length > 0}
            />
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

              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold capitalize text-emerald-700">
                <CheckCircle2 size={11} />
                {course.status || "Enrolled"}
              </span>
            </div>

            <h3 className="text-lg font-bold tracking-tight text-charcoal sm:text-xl">
              {course.title}
            </h3>

            {course.description && (
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-graphite-soft">
                {course.description}
              </p>
            )}
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
            label="Department"
            value={course.department || "Not available"}
          />

          <InfoRow
            icon={BookOpen}
            label="Course Type"
            value={course.courseType || "Not specified"}
          />
        </div>

        <div className="p-5 sm:p-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-graphite-soft">
              Academic Session
            </p>

            <p className="mt-1 text-base font-bold text-charcoal">
              {course.academicSession || "Current Session"}
            </p>
          </div>

          <div className="mt-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-graphite-soft">
              Semester
            </p>

            <p className="mt-1 text-sm font-bold text-charcoal">
              {course.semester || "Not specified"}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 border-t border-line bg-cream/50 px-5 py-4 sm:px-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-graphite-soft">
            {course.semester || "Semester"}
          </p>

          <p className="mt-0.5 text-xs font-bold text-charcoal">
            {course.units} Credit{" "}
            {course.units === 1 ? "Unit" : "Units"}
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

function CourseCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="animate-pulse border-b border-line p-5 sm:p-6">
        <div className="h-5 w-20 rounded bg-cream" />
        <div className="mt-4 h-6 w-2/3 rounded bg-cream" />
        <div className="mt-3 h-3 w-full rounded bg-cream" />
        <div className="mt-2 h-3 w-4/5 rounded bg-cream" />
      </div>

      <div className="grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <div className="space-y-5 p-5 sm:p-6">
          <div className="h-10 rounded-lg bg-cream animate-pulse" />
          <div className="h-10 rounded-lg bg-cream animate-pulse" />
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          <div className="h-10 rounded-lg bg-cream animate-pulse" />
          <div className="h-10 rounded-lg bg-cream animate-pulse" />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-line bg-cream/50 px-5 py-4 sm:px-6">
        <div className="h-8 w-24 rounded bg-paper animate-pulse" />
        <div className="h-10 w-28 rounded-xl bg-charcoal/10 animate-pulse" />
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

function EmptyState({ onClear, hasCourses }) {
  const filtered = hasCourses;

  return (
    <div className="rounded-2xl border border-dashed border-line bg-white px-5 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cream text-graphite-soft">
        {filtered ? <Search size={22} /> : <BookOpen size={22} />}
      </div>

      <h3 className="mt-5 text-base font-bold text-charcoal">
        {filtered ? "No courses found" : "No enrolled courses"}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-graphite-soft">
        {filtered
          ? "We couldn't find any courses matching your search or selected semester. Try adjusting your filters."
          : "You currently do not have any enrolled courses available."}
      </p>

      {filtered && (
        <Button
          type="button"
          onClick={onClear}
          className="mt-5 rounded-xl bg-charcoal px-5 py-2.5 text-xs font-bold text-cream hover:bg-bronze-deep"
        >
          Clear Search & Filters
        </Button>
      )}
    </div>
  );
}