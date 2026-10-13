"use client";
import DirectoryPage from "@/components/admin/university/DirectoryPage";
import Tag from "@/components/admin/university/Tag";
import { listLecturers, DEPT_OPTIONS } from "@/lib/services/admin/universityServices";

const columns = [
  {
    key: "name",
    header: "Lecturer",
    render: (l) => (
      <div>
        <p className="font-semibold text-[#0b1a30]">{l.name}</p>
        <p className="text-[12px] text-[#6b7587]">{l.email}</p>
      </div>
    ),
  },
  { key: "staffId", header: "Staff ID", render: (l) => <span className="rounded bg-[#f3f5f9] px-2 py-1 font-mono text-[11.5px] font-bold text-[#6b7587]">{l.staffId}</span> },
  { key: "dept", header: "Department", render: (l) => l.deptName },
  { key: "rank", header: "Rank", render: (l) => l.rank },
  { key: "courses", header: "Courses", align: "right", render: (l) => l.courseCount },
  { key: "status", header: "Status", render: (l) => (l.status === "active" ? <Tag tone="green">Active</Tag> : <Tag tone="amber" icon="clock">On leave</Tag>) },
];

const TABS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "on_leave", label: "On leave" },
];

export default function LecturerDirectoryPage() {
  return (
    <DirectoryPage
      breadcrumb={[{ label: "Academic Management" }, { label: "Lecturer Directory" }]}
      title="Lecturer Directory"
      searchPlaceholder="Search by name, staff ID or email..."
      filter={{ label: "Department", options: DEPT_OPTIONS }}
      tabs={TABS}
      load={listLecturers}
      columns={columns}
      noun="lecturers"
      emptyIcon="lecturer"
      rowHref={(l) => `/admin/university/lecturers/${l.id}`}
    />
  );
}