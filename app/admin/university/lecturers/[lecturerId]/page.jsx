"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import RecordPage, { Fact } from "@/components/admin/university/RecordPage";
import Tag from "@/components/admin/university/Tag";
import EmptyState from "@/components/admin/shared/EmptyState";
import { getLecturer } from "@/lib/services/admin/universityServices";

export default function LecturerRecordPage() {
  const { lecturerId } = useParams();
  return (
    <RecordPage
      load={() => getLecturer(lecturerId)}
      deps={[lecturerId]}
      title={(d) => d?.lecturer.name || "Lecturer record"}
      breadcrumb={(d) => [{ label: "Academic Management" }, { label: "Lecturer Directory", href: "/admin/university/lecturers" }, { label: d?.lecturer.name || "Lecturer" }]}
      backHref="/admin/university/lecturers"
      backLabel="Back to directory"
    >
      {({ lecturer: l }) => (
        <div className="space-y-5">
          <section className="skul-card p-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="skul-heading text-[20px] font-semibold text-[#0b1a30]">{l.name}</h2>
              {l.status === "active" ? <Tag tone="green">Active</Tag> : <Tag tone="amber" icon="clock">On leave</Tag>}
            </div>
            <p className="mt-1 text-[13px] text-[#6b7587]">{l.email}</p>
            <dl className="mt-6 grid gap-x-6 gap-y-5 border-t border-[#eef0f4] pt-6 sm:grid-cols-3">
              <Fact label="Staff ID"><span className="font-mono text-[13px]">{l.staffId}</span></Fact>
              <Fact label="Department">{l.deptName}</Fact>
              <Fact label="Rank">{l.rank}</Fact>
            </dl>
          </section>

          <section className="skul-card overflow-hidden">
            <div className="border-b border-[#eef0f4] px-6 py-4">
              <h3 className="skul-heading text-[15px] font-semibold text-[#0b1a30]">Assigned courses</h3>
            </div>
            {l.courses.length === 0 ? (
              <EmptyState icon="book" title="No courses assigned" />
            ) : (
              <ul className="divide-y divide-[#eef0f4]">
                {l.courses.map((c) => (
                  <li key={c.id} className="flex items-center justify-between gap-3 px-6 py-3.5">
                    <div>
                      <Link href={`/admin/university/courses/${c.id}`} className="text-[13.5px] font-semibold text-[#0b1a30] hover:underline">{c.title}</Link>
                      <p className="font-mono text-[11.5px] text-[#6b7587]">{c.code}</p>
                    </div>
                    <span className="text-[12px] text-[#6b7587]">{c.credits} credits · Semester {c.semester}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </RecordPage>
  );
}