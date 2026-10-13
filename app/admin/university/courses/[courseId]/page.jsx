"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import RecordPage, { Fact } from "@/components/admin/university/RecordPage";
import ProgressBar from "@/components/admin/shared/ProgressBar";
import { getCourse } from "@/lib/services/admin/universityServices";

export default function CourseRecordPage() {
  const { courseId } = useParams();
  return (
    <RecordPage
      load={() => getCourse(courseId)}
      deps={[courseId]}
      title={(d) => d?.course.title || "Course record"}
      breadcrumb={(d) => [{ label: "Academic Management" }, { label: "Course Catalogue", href: "/admin/university/courses" }, { label: d?.course.code || "Course" }]}
      backHref="/admin/university/courses"
      backLabel="Back to catalogue"
    >
      {({ course: c }) => {
        const o = c.offering;
        const pct = Math.round((o.enrolled / o.capacity) * 100);
        return (
          <div className="space-y-5">
            <section className="skul-card p-6">
              <p className="font-mono text-[12.5px] font-bold text-[#6b7587]">{c.code}</p>
              <h2 className="skul-heading mt-1 text-[20px] font-semibold text-[#0b1a30]">{c.title}</h2>
              <dl className="mt-6 grid gap-x-6 gap-y-5 border-t border-[#eef0f4] pt-6 sm:grid-cols-3">
                <Fact label="Department">{c.deptName}</Fact>
                <Fact label="Level">Level {c.level}</Fact>
                <Fact label="Credit units">{c.credits}</Fact>
                <Fact label="Lecturer">
                  {c.lecturer ? <Link href={`/admin/university/lecturers/${c.lecturer.id}`} className="font-semibold hover:underline">{c.lecturer.name}</Link> : "Unassigned"}
                </Fact>
                <Fact label="Semester">Semester {c.semester}</Fact>
                <Fact label="Venue">{o.venue}</Fact>
              </dl>
            </section>

            <section className="skul-card p-6">
              <h3 className="skul-heading text-[15px] font-semibold text-[#0b1a30]">Current offering · {o.session}</h3>
              <p className="mt-1 text-[13px] text-[#6b7587]">{o.enrolled.toLocaleString()} of {o.capacity.toLocaleString()} places filled ({pct}%)</p>
              <ProgressBar className="mt-4" value={pct} tone={pct >= 90 ? "amber" : "green"} height="h-2" label="Enrolment" />
            </section>
          </div>
        );
      }}
    </RecordPage>
  );
}