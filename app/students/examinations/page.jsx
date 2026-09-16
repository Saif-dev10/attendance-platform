"use client";

import Link from "next/link";
import Sidebar, { studentSections } from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import ExaminationTranscript from "@/components/examinations/ExaminationTranscript";
import ExaminationAllocation from "@/components/examinations/ExaminationAllocation";
import { ArrowLeft } from "lucide-react";

export default function ExaminationsPage() {
  return (
    <div className="min-h-screen bg-paper text-charcoal">
      <Sidebar sections={studentSections} dashboardHref="/dashboard" />
      <MobileBottomNav active="academic" />

      <Topbar
        title="Examinations"
        subtitle="Transcript & Allocation"
        leading={
          <Link
            href="/dashboard"
            aria-label="Back to dashboard"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line text-graphite-soft transition-all hover:bg-cream hover:text-charcoal"
          >
            <ArrowLeft size={17} />
          </Link>
        }
      />

      <main className="min-h-screen overflow-y-auto bg-paper pb-[calc(84px+1.5rem)] pt-[72px] md:ml-[280px] md:pb-0">
        <div className="mx-auto max-w-5xl space-y-6 px-3 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8">
          <ExaminationTranscript />
          <ExaminationAllocation />
        </div>
      </main>
    </div>
  );
}