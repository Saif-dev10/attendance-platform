"use client";

import StudentShell from "@/components/students/StudentShell";
import { EmptyState, StatusBadge } from "@/components/students/StudentStates";

const statusStyles = {
  Pending: "bg-bronze-deep/10 text-bronze-deep",
  Submitted: "bg-moss-soft text-moss",
  Late: "bg-red-50 text-clay",
  Graded: "bg-cream text-graphite",
};

function AssignmentList({ items }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <article
          key={item.id}
          className="rounded-2xl border border-line bg-white px-4 py-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-charcoal">{item.title}</p>
              <p className="mt-1 text-xs text-graphite-soft">
                {[item.course, item.dueDate].filter(Boolean).join(" • ")}
              </p>
            </div>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                statusStyles[item.status] || statusStyles.Pending
              }`}
            >
              {item.status}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}

function AssignmentsContent() {
  const pending = [];
  const completed = [];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-charcoal">
          Assignments
        </h1>
        <p className="mt-1 text-sm text-graphite-soft">
          Work that still needs your attention
        </p>
      </header>

      <section>
        <div className="mb-3 flex items-center gap-2">
          <h2 className="text-sm font-bold uppercase tracking-widest text-charcoal">
            Pending
          </h2>
          <StatusBadge>{pending.length}</StatusBadge>
        </div>
        {pending.length === 0 ? (
          <EmptyState title="No pending assignments." />
        ) : (
          <AssignmentList items={pending} />
        )}
      </section>

      <section>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-charcoal">
          Completed
        </h2>
        {completed.length === 0 ? (
          <EmptyState title="No completed assignments yet." />
        ) : (
          <AssignmentList items={completed} />
        )}
      </section>
    </div>
  );
}

export default function StudentAssignmentsPage() {
  return (
    <StudentShell>
      <AssignmentsContent />
    </StudentShell>
  );
}
