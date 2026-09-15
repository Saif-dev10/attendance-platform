"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import TranscriptTable from "./TranscriptTable";
import { getExaminationTranscript } from "@/lib/mock/examinations";

export default function ExaminationTranscript() {
  const [records, setRecords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  async function handleViewTranscript() {
    if (loading) return;

    if (visible) {
      setVisible(false);
      return;
    }

    if (!records) {
      setLoading(true);
      const data = await getExaminationTranscript();
      setRecords(data);
      setLoading(false);
    }

    setVisible(true);
  }

  const activeRecord = records?.[activeIndex];

  return (
    <Card className="rounded-2xl border border-line bg-white p-5 md:p-7">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-base md:text-lg font-bold text-charcoal">
            Examination Transcript
          </h2>
          <p className="mt-1.5 text-sm text-graphite">
            View your examination record, including courses, grades and
            academic performance across semesters.
          </p>
        </div>

        <Button onClick={handleViewTranscript} disabled={loading} className="shrink-0">
          {loading ? "Loading..." : visible ? "Hide Transcript" : "View Transcript"}
        </Button>
      </div>

      {visible && records && (
        <div className="mt-6 space-y-5 border-t border-line pt-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-graphite-soft">
              Academic Session
            </p>

            <div className="relative">
              <select
                value={activeIndex}
                onChange={(event) => setActiveIndex(Number(event.target.value))}
                className="appearance-none rounded-lg border border-line bg-paper py-2 pl-3 pr-9 text-sm font-semibold text-charcoal focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze"
              >
                {records.map((record, index) => (
                  <option key={`${record.session}-${record.semester}`} value={index}>
                    {record.session} — {record.semester}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-graphite-soft"
              />
            </div>
          </div>

          <TranscriptTable record={activeRecord} />
        </div>
      )}
    </Card>
  );
}