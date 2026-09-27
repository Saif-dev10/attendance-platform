"use client";

import { useMemo, useState } from "react";
import StudentShell from "@/components/students/StudentShell";
import { useStudent } from "@/components/students/StudentContext";
import {
  CourseCard,
  EmptyState,
  ErrorState,
} from "@/components/students/StudentStates";
import { currentTerm, formatLevel, formatTerm, semesterKey } from "@/lib/students/format";

const filters = [
  { id: "all", label: "All" },
  { id: "first", label: "First Semester" },
  { id: "second", label: "Second Semester" },
];

function CoursesContent() {
  const { profile, courses, coursesError, retry } = useStudent();
  const [filter, setFilter] = useState("all");
  const term = currentTerm(courses);

  const visibleCourses = useMemo(() => {
    if (filter === "all") return courses;
    return courses.filter((course) => semesterKey(course.semester) === filter);
  }, [courses, filter]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-charcoal">
          My Courses
        </h1>
        <p className="mt-1 text-sm text-graphite-soft">
          {formatTerm(term) || "Current semester"}
        </p>
      </header>

      <div className="flex gap-2 overflow-x-auto">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold ${
              filter === item.id
                ? "bg-charcoal text-cream"
                : "border border-line bg-white text-graphite"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {coursesError ? (
        <ErrorState
          message="Unable to load your courses. Try again."
          onRetry={retry}
        />
      ) : visibleCourses.length === 0 ? (
        <EmptyState
          title={
            filter === "all"
              ? "No courses enrolled yet."
              : "No courses in this semester."
          }
        />
      ) : (
        <div className="space-y-3">
          {visibleCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              href={`/students/courses/${course.id}`}
              meta={[
                course.unitsLabel,
                course.typeLabel,
                formatLevel(profile.level),
              ]
                .filter(Boolean)
                .join(" • ")}
              actionLabel="Open →"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function StudentCoursesPage() {
  return (
    <StudentShell>
      <CoursesContent />
    </StudentShell>
  );
}
