"use client";
import DirectoryPage from "@/components/admin/university/DirectoryPage";
import Tag from "@/components/admin/university/Tag";
import ProgressBar from "@/components/admin/shared/ProgressBar";
import { listAssignments, DEPT_OPTIONS } from "@/lib/services/admin/universityService";

const fmt = (ts) => new Date(ts).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

const STATUS = {
  open: <Tag tone="blue" icon="clock">Open</Tag>,
  overdue: <Tag tone="red" icon="alert">Overdue</Tag>,
  closed: <Tag tone="gray" icon="check">Closed</Tag>,
};

const columns = [
  {
    key: "title",
    header: "Assignment",
    render: (a) => (
      <div>
        <p className="font-semibold text-[#0b1a30]">{a.title}</p>
        <p className="font-mono text-[11.5px] text-[#6b7587]">{a.courseCode}</p>
      </div>
    ),
  },
  { key: "lecturer", header: "Lecturer", render: (a) => a.lecturer?.name || "Unassigned" },
  { key: "due", header: "Due", render: (a) => fmt(a.dueAt) },
  {
    key: "submissions",
    header: "Submissions",
    width: 230,
    render: (a) => {
      const pct = Math.round((a.submitted / a.total) * 100);
      return (
        <div>
          <p className="mb-1 text-[12px] text-[#6b7587]">{a.submitted} / {a.total} ({pct}%)</p>
          <ProgressBar value={pct} tone={a.status === "overdue" && pct < 90 ? "amber" : "green"} label={`${a.title} submissions`} />
        </div>
      );
    },
  },
  { key: "status", header: "Status", render: (a) => STATUS[a.status] },
];

const TABS = [
  { value: "all", label: "All" },
  { value: "open", label: "Open" },
  { value: "overdue", label: "Overdue" },
  { value: "closed", label: "Closed" },
];

export default function AssignmentMonitorPage() {
  return (
    <DirectoryPage
      breadcrumb={[{ label: "Operations" }, { label: "Assignment Monitor" }]}
      title="Assignment Monitor"
      searchPlaceholder="Search by assignment, course or lecturer..."
      filter={{ label: "Department", options: DEPT_OPTIONS }}
      tabs={TABS}
      load={listAssignments}
      columns={columns}
      noun="assignments"
      emptyIcon="file"
    />
  );
}