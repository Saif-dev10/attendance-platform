"use client";

import Button from "@/components/ui/Button";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import StatusBadge from "../StatusBadge/page";
import { CalendarClock, FileCheck2, FileClock, FileStack } from "lucide-react";

const SUMMARY = [
  { label: "Pending", value: 2, icon: FileClock },
  { label: "Submitted", value: 5, icon: FileStack },
  { label: "Graded", value: 4, icon: FileCheck2 },
];

const STATUS_TONE = {
  "Due Soon": "bronze",
  Submitted: "charcoal",
  Graded: "positive",
  Overdue: "negative",
};

const ASSIGNMENTS = [
  {
    id: "Assignment 2",
    title: "Dynamic Programming Implementation",
    status: "Due Soon",
    due: "Sep 7, 2026",
    countdown: "3 days left",
    weight: "10%",
    format: "PDF or ZIP",
    description:
      "Implement and analyze three dynamic programming solutions covering the knapsack problem, longest common subsequence, and matrix chain multiplication. Include Big-O analysis for each.",
    primary: true,
  },
  {
    id: "Assignment 1",
    title: "Complexity Analysis Report",
    status: "Graded",
    due: "Aug 22, 2026",
    countdown: "Closed",
    weight: "10%",
    format: "PDF",
    description:
      "A written report analyzing the time and space complexity of five classic sorting algorithms, with supporting benchmarks.",
    primary: false,
  },
];

function SummaryStat({ label, value, icon: Icon }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream text-bronze-deep">
        <Icon size={17} strokeWidth={2} />
      </div>
      <div>
        <p className="text-lg font-bold leading-none text-charcoal">{value}</p>
        <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-graphite-soft">
          {label}
        </p>
      </div>
    </div>
  );
}

function AssignmentCard({ assignment }) {
  const tone = STATUS_TONE[assignment.status] ?? "muted";

  return (
    <div
      className={`rounded-2xl border bg-white p-5 sm:p-6 ${
        assignment.primary ? "border-bronze-deep/30" : "border-line"
      }`}
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-graphite-soft">
            {assignment.id}
          </p>
          <h3 className="mt-1 text-base font-bold text-charcoal sm:text-lg">
            {assignment.title}
          </h3>
        </div>
        <StatusBadge label={assignment.status} tone={tone} />
      </div>

      <p className="mb-5 max-w-[640px] text-sm leading-relaxed text-graphite">
        {assignment.description}
      </p>

      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-line bg-cream p-3">
          <div className="mb-1 flex items-center gap-1.5 text-graphite-soft">
            <CalendarClock size={13} />
            <p className="text-[10px] font-bold uppercase">Due</p>
          </div>
          <p className="text-xs font-bold text-charcoal">{assignment.due}</p>
        </div>

        <div className="rounded-xl border border-line bg-cream p-3">
          <p className="mb-1 text-[10px] font-bold uppercase text-graphite-soft">Countdown</p>
          <p className="text-xs font-bold text-charcoal">{assignment.countdown}</p>
        </div>

        <div className="rounded-xl border border-line bg-cream p-3">
          <p className="mb-1 text-[10px] font-bold uppercase text-graphite-soft">Weight</p>
          <p className="text-xs font-bold text-charcoal">{assignment.weight}</p>
        </div>

        <div className="rounded-xl border border-line bg-cream p-3">
          <p className="mb-1 text-[10px] font-bold uppercase text-graphite-soft">Format</p>
          <p className="text-xs font-bold text-charcoal">{assignment.format}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          type="button"
          className="flex-1 rounded-xl border-2 border-charcoal !bg-transparent py-2.5 text-xs font-bold !text-charcoal !shadow-none hover:!bg-cream"
        >
          View Assignment
        </Button>

        {assignment.status !== "Graded" && (
          <Button
            type="button"
            className="flex-1 rounded-xl bg-bronze-deep py-2.5 text-xs font-bold text-cream hover:bg-bronze active:bg-bronze"
          >
            Submit Now
          </Button>
        )}
      </div>
    </div>
  );
}

export default function CourseAssignments() {
  return (
    <>
      <div className="mx-auto max-w-[900px] space-y-8">
        <div>
          <h2 className="text-lg font-bold text-charcoal">Assignments</h2>
          <p className="mt-1 text-sm text-graphite-soft">
            Track what&apos;s due, what you&apos;ve submitted, and what&apos;s been graded for CSC301.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {SUMMARY.map((stat) => (
            <SummaryStat key={stat.label} {...stat} />
          ))}
        </div>

        <div className="space-y-5">
          {ASSIGNMENTS.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </div>
      </div>
      <MobileBottomNav active="academic" />
    </>
  );
}