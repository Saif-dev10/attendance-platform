"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import CourseMaterials from "../CourseMaterials/page";
import CourseAssignments from "../CourseAssignments/page";
import CourseAttendance from "../CourseAttendance/page";
import CourseGrades from "../CourseGrades/page";
import { getStudentCourse } from "@/lib/services/courses";
import {
  ArrowLeft,
  Clock3,
  Download,
  GraduationCap,
  Megaphone,
  MessageCircle,
} from "lucide-react";

export default function CourseDetailsPage() {
  const params = useParams();
  const courseId = params?.courseId;

  const [activeTab, setActiveTab] = useState("Overview");
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const tabs = [
    "Overview",
    "Materials",
    "Assignments",
    "Attendance",
    "Grades",
  ];

  useEffect(() => {
    if (!courseId) return;

    let cancelled = false;

    async function loadCourse() {
      try {
        setLoading(true);
        setError("");

        const response = await getStudentCourse(courseId);

        if (cancelled) return;

        const enrollment = response?.data ?? response;

        if (!enrollment?.course) {
          throw new Error("Course information was not returned.");
        }

        setCourse(enrollment);
      } catch (err) {
        if (cancelled) return;

        console.error("Failed to load course:", err);
        setError(
          err?.message ||
            "Unable to load this course. Please try again."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadCourse();

    return () => {
      cancelled = true;
    };
  }, [courseId]);

  const courseData = course?.course;

  const courseCode = courseData?.code || "";
  const courseTitle = courseData?.title || "";
  const courseDescription = courseData?.description || "";
  const creditUnits = Number(courseData?.credit_units || 0);
  const courseType = courseData?.course_type || "";
  const department = courseData?.department?.name || "";
  const semester = course?.semester?.name || "";
  const academicSession = course?.academic_session?.name || "";

  const pageTitle =
    loading && !course
      ? "Loading Course..."
      : courseData
        ? `${courseCode}: ${courseTitle}`
        : "Course Details";

  const pageSubtitle = [
    semester,
    creditUnits ? `${creditUnits} Credit Units` : "",
  ]
    .filter(Boolean)
    .join(" • ");

  return (
    <div className="min-h-screen bg-paper text-charcoal">
      <Sidebar />

      <Topbar
        title={pageTitle}
        subtitle={pageSubtitle || "Course Details"}
        leading={
          <Link
            href="/students/courses"
            aria-label="Back to courses"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line text-graphite-soft transition-all hover:bg-cream hover:text-charcoal"
          >
            <ArrowLeft size={17} />
          </Link>
        }
      >
        <div className="hidden items-center gap-4 sm:flex">
          <div className="flex -space-x-2">
            <Image
              src="/avatar-placeholder.svg"
              alt="Student"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full border-2 border-paper object-cover"
            />

            <Image
              src="/avatar-placeholder.svg"
              alt="Student"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full border-2 border-paper object-cover"
            />

            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-paper bg-cream text-[10px] font-bold text-graphite-soft">
              +318
            </div>
          </div>
        </div>

        <Button
          type="button"
          className="flex items-center gap-2 rounded-xl bg-charcoal px-3 py-2 text-xs font-bold text-cream hover:bg-bronze-deep active:opacity-75 sm:px-4"
        >
          <Download size={14} />
          <span className="hidden sm:inline">Download Syllabus</span>
        </Button>
      </Topbar>

      <main className="min-h-screen overflow-y-auto bg-paper pb-[calc(84px+1.5rem)] pt-[72px] md:ml-[280px] md:pb-0">
        <div className="border-b border-line bg-paper px-3 sm:px-6">
          <div
            className="flex gap-2 overflow-x-auto sm:gap-8"
            role="tablist"
            aria-label="Course sections"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab;

              return (
                <Button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="course-tab-panel"
                  className={`relative rounded-none !bg-transparent px-2 py-4 text-sm font-bold !shadow-none transition-all hover:!bg-transparent ${
                    isActive
                      ? "!text-bronze-deep"
                      : "!text-graphite-soft hover:!text-graphite"
                  }`}
                >
                  {tab}

                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-bronze-deep" />
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        <div
          id="course-tab-panel"
          role="tabpanel"
          className="flex-1 overflow-y-auto px-3 py-5 sm:px-6 sm:py-7"
          aria-label={`${activeTab} content`}
        >
          {loading && (
            <div className="mx-auto max-w-[1400px] rounded-2xl border border-line bg-white p-6">
              <div className="space-y-4 animate-pulse">
                <div className="h-5 w-40 rounded bg-cream" />
                <div className="h-24 w-full rounded-xl bg-cream" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="h-24 rounded-xl bg-cream" />
                  <div className="h-24 rounded-xl bg-cream" />
                </div>
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="mx-auto max-w-[700px] rounded-2xl border border-line bg-white p-8 text-center">
              <h3 className="mb-2 text-lg font-bold text-charcoal">
                Unable to load course
              </h3>

              <p className="text-sm leading-relaxed text-graphite-soft">
                {error}
              </p>

              <Button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-5 rounded-xl bg-charcoal px-5 py-2.5 text-xs font-bold text-cream hover:bg-bronze-deep"
              >
                Try Again
              </Button>
            </div>
          )}

          {!loading && !error && course && activeTab === "Overview" && (
            <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
              <div className="space-y-8 lg:col-span-2">
                <section>
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-charcoal">
                    About Course
                  </h3>

                  <div className="rounded-2xl border border-line bg-white p-4 text-[15px] leading-relaxed text-graphite sm:p-6">
                    <p className="mb-4">
                      {courseDescription ||
                        "No course description is available yet."}
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="rounded-xl border border-line bg-cream p-4">
                        <div className="mb-2 flex items-center gap-2">
                          <GraduationCap
                            size={15}
                            className="text-graphite-soft"
                            strokeWidth={2}
                          />

                          <p className="text-[10px] font-bold uppercase text-graphite-soft">
                            Department
                          </p>
                        </div>

                        <p className="text-sm font-bold text-charcoal">
                          {department || "Not available"}
                        </p>
                      </div>

                      <div className="rounded-xl border border-line bg-cream p-4">
                        <div className="mb-2 flex items-center gap-2">
                          <GraduationCap
                            size={15}
                            className="text-graphite-soft"
                            strokeWidth={2}
                          />

                          <p className="text-[10px] font-bold uppercase text-graphite-soft">
                            Course Type
                          </p>
                        </div>

                        <p className="text-sm font-bold text-charcoal">
                          {courseType || "Not available"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="rounded-xl border border-line bg-cream p-4">
                        <div className="mb-2 flex items-center gap-2">
                          <Clock3
                            size={15}
                            className="text-graphite-soft"
                            strokeWidth={2}
                          />

                          <p className="text-[10px] font-bold uppercase text-graphite-soft">
                            Semester
                          </p>
                        </div>

                        <p className="text-sm font-bold text-charcoal">
                          {semester || "Not available"}
                        </p>
                      </div>

                      <div className="rounded-xl border border-line bg-cream p-4">
                        <div className="mb-2 flex items-center gap-2">
                          <GraduationCap
                            size={15}
                            className="text-graphite-soft"
                            strokeWidth={2}
                          />

                          <p className="text-[10px] font-bold uppercase text-graphite-soft">
                            Academic Session
                          </p>
                        </div>

                        <p className="text-sm font-bold text-charcoal">
                          {academicSession || "Not available"}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-charcoal">
                    Latest Announcements
                  </h3>

                  <div className="space-y-4">
                    <div className="flex gap-4 rounded-2xl border border-line bg-white p-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bronze-deep/10 text-bronze-deep">
                        <Megaphone size={20} strokeWidth={2} />
                      </div>

                      <div className="min-w-0">
                        <h4 className="mb-1 text-sm font-bold text-charcoal">
                          No announcements yet
                        </h4>

                        <p className="mb-2 text-xs leading-relaxed text-graphite">
                          Course anouncements from your instructor will appear here.
                        </p>

                        <p className="text-[10px] font-bold text-graphite-soft">
                          2 Hours ago • Dr. Yusuf Muhammad
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="space-y-8">
                <section>
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-charcoal">
                    Instructor
                  </h3>

                  <div className="rounded-2xl border border-line bg-white p-6 text-center">
                    <Image
                      src="/avatar-placeholder.svg"
                      alt="Instructor"
                      width={80}
                      height={80}
                      className="mx-auto mb-4 h-20 w-20 rounded-2xl object-cover ring-4 ring-slate-50"
                    />

                    <h4 className="font-bold text-charcoal">
                      {/* Dr. Yusuf Muhammad */}
                      Instructor information unavailable
                    </h4>

                    <p className="mb-6 text-xs text-graphite-soft">
                      Senior Lecturer, Computer Science
                    </p>

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        className="flex flex-1 !cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-charcoal !bg-charcoal py-2.5 text-xs font-bold !text-cream transition-all hover:!opacity-90 active:!opacity-75"
                      >
                        <MessageCircle size={14} />
                        Message
                      </Button>

                      <Button
                        type="button"
                        className="flex flex-1 !cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-charcoal !bg-charcoal py-2.5 text-xs font-bold !text-cream transition-all hover:!opacity-90 active:!opacity-75"
                      >
                        <Clock3 size={14} />
                        Office Hours
                      </Button>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-charcoal">
                    Next Deadline
                  </h3>

                  <div className="relative overflow-hidden rounded-2xl bg-charcoal p-6 text-cream shadow-xl shadow-charcoal/20">
                    <Clock3
                      size={100}
                      strokeWidth={1}
                      className="absolute -bottom-4 -right-4 rotate-12 text-white/5"
                    />

                    <div className="relative z-10">
                      <div className="mb-4 flex items-start justify-between gap-4">
                        <span className="rounded border border-white/10 bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest">
                          Upcoming
                        </span>

                        {/* <span className="text-[10px] font-bold text-bronze-soft">
                          No upcoming deadlines
                        </span> */}
                      </div>

                      <h4 className="mb-1 text-lg font-bold">
                        No upcoming deadlines
                      </h4>

                      <p className="mb-6 text-xs italic text-cream/60">
                        Assignment deadlines will appear here when available.
                      </p>

                      <Button
                        type="button"
                        className="w-full rounded-xl bg-bronze-deep py-3 text-xs font-bold text-cream transition-all hover:bg-bronze active:bg-bronze"
                      >
                        No Deadline Available
                      </Button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}

          {!loading && !error && activeTab === "Materials" && (
            <CourseMaterials courseId={courseId} />
          )}

          {!loading && !error && activeTab === "Assignments" && (
            <CourseAssignments />
          )}

          {!loading && !error && activeTab === "Attendance" && (
            <CourseAttendance />
          )}

          {!loading && !error && activeTab === "Grades" && <CourseGrades />}
        </div>
      </main>

      <MobileBottomNav active="academic" />
    </div>
  );
}