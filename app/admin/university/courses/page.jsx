"use client";
import DirectoryPage from "@/components/admin/university/DirectoryPage";
import { listCourses, DEPT_OPTIONS } from "@/lib/services/admin/universityService";

const columns = [
  { key: "code", header: "Code", render: (c) => <span className="rounded bg-[#f3f5f9] px-2 py-1 font-mono text-[11.5px] font-bold text-[#4b5565]">{c.code}</span> },
  { key: "title", header: "Course Title", render: (c) => <span className="font-semibold text-[#0b1a30]">{c.title}</span> },
  { key: "dept", header: "Department", render: (c) => c.deptName },
  { key: "level", header: "Level", render: (c) => <span className="text-[11px] font-bold uppercase tracking-wide text-[#6b7587]">Level {c.level}</span> },
  { key: "credits", header: "Credits", align: "right", render: (c) => c.credits },
  { key: "lecturer", header: "Lecturer", render: (c) => c.lecturer?.name || "Unassigned" },
];

export default function CourseCataloguePage() {
  return (
    <DirectoryPage
      breadcrumb={[{ label: "Academic Management" }, { label: "Course Catalogue" }]}
      title="Course Catalogue"
      searchPlaceholder="Search by course code or title..."
      filter={{ label: "Department", options: DEPT_OPTIONS }}
      load={listCourses}
      columns={columns}
      noun="courses"
      emptyIcon="book"
      rowHref={(c) => `/admin/university/courses/${c.id}`}
    />
  );
}