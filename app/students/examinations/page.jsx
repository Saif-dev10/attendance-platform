"use client";

import Sidebar, { studentSections } from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import ExaminationTranscript from "@/components/examinations/ExaminationTranscript";
import ExaminationAllocation from "@/components/examinations/ExaminationAllocation";

export default function ExaminationsPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Sidebar sections={studentSections} dashboardHref="/dashboard" />
      <MobileBottomNav active="academic" />

      <Topbar title="Examinations" subtitle="Transcript & Allocation" />

      <main className="pt-[72px] pb-28 md:pb-12 md:pl-[280px]">
        <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 md:px-8 md:py-8">
          <ExaminationTranscript />
          <ExaminationAllocation />
        </div>
      </main>
    </div>
  );
}