"use client";
import DirectoryPage from "@/components/admin/university/DirectoryPage";
import Tag from "@/components/admin/university/Tag";
import ProgressBar from "@/components/admin/shared/ProgressBar";
import { listOfferings, DEPT_OPTIONS } from "@/lib/services/admin/universityService";

const columns = [
  {
    key: "course",
    header: "Course",
    render: (o) => (
      <div>
        <p className="font-semibold text-[#0b1a30]">{o.course.title}</p>
        <p className="font-mono text-[11.5px] text-[#6b7587]">{o.course.code}</p>
      </div>
    ),
  },
  { key: "lecturer", header: "Lecturer", render: (o) => o.course.lecturer?.name || "Unassigned" },
  { key: "semester", header: "Session", render: (o) => <span className="text-[13px]">{o.session} · Semester {o.semester}</span> },
  { key: "venue", header: "Venue", render: (o) => o.venue },
  {
    key: "enrolment",
    header: "Enrolment",
    width: 230,
    render: (o) => {
      const pct = Math.round((o.enrolled / o.capacity) * 100);
      return (
        <div>
          <div className="mb-1 flex items-center justify-between text-[12px]">
            <span className="text-[#6b7587]">{o.enrolled} / {o.capacity}</span>
            {pct >= 90 && <Tag tone="amber" icon="alert">Nearly full</Tag>}
          </div>
          <ProgressBar value={pct} tone={pct >= 90 ? "amber" : "green"} label={`${o.course.code} enrolment`} />
        </div>
      );
    },
  },
];

export default function CourseOfferingsPage() {
  return (
    <DirectoryPage
      breadcrumb={[{ label: "Operations" }, { label: "Course Offerings" }]}
      title="Course Offerings"
      searchPlaceholder="Search by course or lecturer..."
      filter={{ label: "Department", options: DEPT_OPTIONS }}
      load={listOfferings}
      columns={columns}
      noun="offerings"
      emptyIcon="layers"
      rowHref={(o) => `/admin/university/courses/${o.courseId}`}
    />
  );
}