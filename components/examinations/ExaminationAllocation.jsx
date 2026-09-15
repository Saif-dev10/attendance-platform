"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import AllocationCard from "./AllocationCard";
import EmptyState from "./EmptyState";
import { getExaminationAllocation } from "@/lib/mock/examinations";

export default function ExaminationAllocation() {
  const [status, setStatus] = useState("idle"); // idle | loading | result | empty
  const [exams, setExams] = useState([]);

  async function handleRetrieve() {
    if (status === "loading") return;

    setStatus("loading");
    const data = await getExaminationAllocation();

    if (data.length === 0) {
      setStatus("empty");
    } else {
      setExams(data);
      setStatus("result");
    }
  }

  return (
    <Card className="rounded-2xl border border-line bg-white p-5 md:p-7">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-base md:text-lg font-bold text-charcoal">
            Examination Allocation
          </h2>
          <p className="mt-1.5 text-sm text-graphite">
            Find your current examination schedule, hall and assigned seat.
          </p>
        </div>

        {status !== "result" && status !== "empty" && (
          <Button onClick={handleRetrieve} disabled={status === "loading"} className="shrink-0">
            {status === "loading" ? "Retrieving..." : "View Examination Details"}
          </Button>
        )}
      </div>

      <div className="mt-6 border-t border-line pt-6">
        {status === "idle" && (
          <p className="text-sm text-graphite-soft">
            Your examination allocation has not been retrieved yet.
          </p>
        )}

        {status === "loading" && (
          <div className="flex items-center justify-center gap-3 rounded-2xl border border-line bg-paper px-5 py-8">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-line border-t-bronze-deep" />
            <p className="text-sm font-semibold text-graphite">
              Retrieving your examination allocation...
            </p>
          </div>
        )}

        {status === "empty" && <EmptyState onRetry={handleRetrieve} loading={false} />}

        {status === "result" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-charcoal">
                Your current examination details
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-graphite-soft">
                {exams.length} examination{exams.length === 1 ? "" : "s"} assigned
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {exams.map((exam) => (
                <AllocationCard key={exam.code} exam={exam} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}