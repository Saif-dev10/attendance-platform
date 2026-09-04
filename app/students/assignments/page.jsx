import MobileBottomNav from "@/components/layout/MobileBottomNav";

export default function AssignmentsPage() {
  return (
    <>
      <main className="min-h-screen bg-paper pb-24 md:pb-0">
        {/**
         * Student assignment overview page.
         * This screen is intentionally lightweight for now and will be expanded to
         * show due work, submission status, and grading progress once the assignment
         * data model is connected to the backend.
         */}
      </main>
      <MobileBottomNav active="academic" />
    </>
  );
}