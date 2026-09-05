import Sidebar from "@/components/layout/Sidebar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import PendingSubmissionView from "../components/PendingSubmissionView";
import GradedView from "../components/GradedView";
import { getAssignment } from "@/lib/assignments";
import { notFound } from "next/navigation";

export default async function AssignmentDetailPage({ params }) {
  const { assignmentsid } = await params;
  const assignment = await getAssignment(assignmentsid);

  if (!assignment) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-paper">
      <Sidebar />

      <main className="md:ml-[280px] pb-[84px] md:pb-0">
        {assignment.status === "graded" ? (
          <GradedView assignment={assignment} />
        ) : (
          <PendingSubmissionView assignment={assignment} />
        )}
      </main>

      <MobileBottomNav active="academic" />
    </div>
  );
}